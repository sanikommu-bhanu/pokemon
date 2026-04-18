import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const assetsRoot = path.resolve('public/assets')

const isPng = (name) => name.toLowerCase().endsWith('.png')

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
      continue
    }
    if (entry.isFile() && isPng(entry.name)) files.push(full)
  }
  return files
}

const pixIndex = (x, y, width) => y * width + x

function isNearBlack(data, index, channels) {
  const offset = index * channels
  const r = data[offset]
  const g = data[offset + 1]
  const b = data[offset + 2]
  const a = data[offset + 3]
  if (a === 0) return false
  return r <= 18 && g <= 18 && b <= 18
}

function clearEdgeConnectedBlack(data, width, height, channels) {
  const size = width * height
  const visited = new Uint8Array(size)
  const queue = new Int32Array(size)
  let head = 0
  let tail = 0

  const enqueue = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return
    const idx = pixIndex(x, y, width)
    if (visited[idx] === 1) return
    if (!isNearBlack(data, idx, channels)) return
    visited[idx] = 1
    queue[tail++] = idx
  }

  for (let x = 0; x < width; x++) {
    enqueue(x, 0)
    enqueue(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    enqueue(0, y)
    enqueue(width - 1, y)
  }

  while (head < tail) {
    const idx = queue[head++]
    const x = idx % width
    const y = Math.floor(idx / width)
    enqueue(x + 1, y)
    enqueue(x - 1, y)
    enqueue(x, y + 1)
    enqueue(x, y - 1)
  }

  for (let i = 0; i < size; i++) {
    if (visited[i] === 1) data[i * channels + 3] = 0
  }

  // Fade dark anti-aliased halo pixels adjacent to transparent pixels.
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = pixIndex(x, y, width)
      const offset = idx * channels
      const alpha = data[offset + 3]
      if (alpha === 0) continue

      const r = data[offset]
      const g = data[offset + 1]
      const b = data[offset + 2]
      if (r > 45 || g > 45 || b > 45) continue

      const n1 = data[pixIndex(x + 1, y, width) * channels + 3] === 0
      const n2 = data[pixIndex(x - 1, y, width) * channels + 3] === 0
      const n3 = data[pixIndex(x, y + 1, width) * channels + 3] === 0
      const n4 = data[pixIndex(x, y - 1, width) * channels + 3] === 0
      if (n1 || n2 || n3 || n4) data[offset + 3] = Math.round(alpha * 0.35)
    }
  }
}

async function processPng(filePath) {
  const { data, info } = await sharp(filePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const output = Buffer.from(data)
  clearEdgeConnectedBlack(output, info.width, info.height, info.channels)

  await sharp(output, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png()
    .toFile(filePath)
}

async function main() {
  const files = await walk(assetsRoot)
  if (files.length === 0) {
    console.log('No PNG files found under public/assets')
    return
  }

  for (const file of files) {
    await processPng(file)
    console.log(`Processed: ${path.relative(process.cwd(), file)}`)
  }

  console.log(`Done. Updated ${files.length} files.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
