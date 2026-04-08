import React from 'react'
import './TypesSection.css'
import { motion } from 'framer-motion'

const types = [
  { name: 'Fire',     emoji: '🔥', color: '#ff6b35', desc: 'Intense and powerful. Burns through defenses.' },
  { name: 'Water',    emoji: '💧', color: '#4ecdc4', desc: 'Fluid and adaptive. Controls the flow of battle.' },
  { name: 'Grass',    emoji: '🌿', color: '#56ab2f', desc: 'Patient and draining. Wears opponents down slowly.' },
  { name: 'Electric', emoji: '⚡', color: '#ffcb05', desc: 'Lightning-fast. Paralyzes foes with raw speed.' },
  { name: 'Psychic',  emoji: '🔮', color: '#c77dff', desc: 'Mysterious and vast. Bends the mind of any rival.' },
  { name: 'Ice',      emoji: '❄️', color: '#90caf9', desc: 'Freezing and precise. Stops opponents cold.' },
  { name: 'Dragon',   emoji: '🐉', color: '#7b4f98', desc: 'Ancient and mighty. The rarest of bloodlines.' },
  { name: 'Dark',     emoji: '🌑', color: '#555e6e', desc: 'Cunning and ruthless. Strikes from the shadows.' },
  { name: 'Fighting', emoji: '🥊', color: '#ef5350', desc: 'Disciplined and direct. Overwhelms with raw force.' },
]

const TypesSection = () => (
  <section className="types-section" id="types">
    <div className="types-header">
      <p className="types-eyebrow">Battle Mastery</p>
      <h2 className="types-title">Pokémon Types</h2>
      <p className="types-sub">Each type carries unique strengths and weaknesses. Knowing the matchups is the key to becoming a champion.</p>
    </div>

    <div className="types-grid">
      {types.map((t, i) => (
        <motion.div
          key={t.name}
          className="type-card"
          style={{ '--accent': t.color }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ delay: i * 0.07, duration: 0.5 }}
          whileHover={{ y: -8 }}
        >
          <div className="type-emoji">{t.emoji}</div>
          <div className="type-name">{t.name}</div>
          <div className="type-desc">{t.desc}</div>
          <div className="type-badge-strip" style={{ background: t.color }} />
        </motion.div>
      ))}
    </div>
  </section>
)

export default TypesSection
