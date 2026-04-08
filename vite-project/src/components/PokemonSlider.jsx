import React, { useState } from 'react'
import './PokemonSlider.css'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const pokemon = [
  {
    name: 'Charizard',
    number: '#006',
    type1: 'Fire', type2: 'Flying',
    img: '/assets/slider/card1.png',
    bg: 'radial-gradient(ellipse at 30% 50%, #3d1a00 0%, #1a0a0a 60%, #0a0a1a 100%)',
    accent: '#ff6b35',
    stats: { hp: 78, atk: 84, def: 78, spd: 100 },
    desc: 'A fearsome dragon-like Pokémon that spits fire hot enough to melt boulders. It flies around freely in the sky and breathes fire of such intense heat that it melts anything. Its wings can carry it close to an altitude of 4,600 feet.',
  },
  {
    name: 'Mewtwo',
    number: '#150',
    type1: 'Psychic', type2: null,
    img: '/assets/slider/card2.png',
    bg: 'radial-gradient(ellipse at 30% 50%, #2a0a3a 0%, #1a0a2a 60%, #0a0a1a 100%)',
    accent: '#c77dff',
    stats: { hp: 106, atk: 110, def: 90, spd: 130 },
    desc: 'A Pokémon that was created by genetic manipulation. However, even though the scientific power of humans made its body, they failed to endow Mewtwo with a compassionate heart. The most powerful Pokémon ever discovered.',
  },
  {
    name: 'Gengar',
    number: '#094',
    type1: 'Ghost', type2: 'Poison',
    img: '/assets/slider/card3.png',
    bg: 'radial-gradient(ellipse at 30% 50%, #1a0030 0%, #100020 60%, #0a0a1a 100%)',
    accent: '#7b2d8b',
    stats: { hp: 60, atk: 65, def: 60, spd: 110 },
    desc: 'On the night of a full moon, if shadows move on their own and laugh, it must be Gengar\'s doing. It hides in shadows and waits for its chance to steal the life of an unsuspecting target. It is said to emerge from darkness to steal the lives of those who become lost in mountains.',
  },
  {
    name: 'Blastoise',
    number: '#009',
    type1: 'Water', type2: null,
    img: '/assets/slider/card4.png',
    bg: 'radial-gradient(ellipse at 30% 50%, #001a3d 0%, #00102a 60%, #0a0a1a 100%)',
    accent: '#4ecdc4',
    stats: { hp: 79, atk: 83, def: 100, spd: 78 },
    desc: 'A brutal Pokémon with pressurized water jets on its shell. The pressure of the water cannons it fires can punch holes through thick steel. They are used for high-speed tackles. Even large ships can be knocked away by its water jets.',
  },
  {
    name: 'Umbreon',
    number: '#197',
    type1: 'Dark', type2: null,
    img: '/assets/slider/card5.png',
    bg: 'radial-gradient(ellipse at 30% 50%, #001a10 0%, #00100a 60%, #0a0a1a 100%)',
    accent: '#ffcb05',
    stats: { hp: 95, atk: 65, def: 110, spd: 65 },
    desc: 'When this Pokémon becomes angry, its pores secrete a poisonous sweat, which it sprays at its opponent\'s eyes. Umbreon evolved as a result of exposure to the moon\'s waves. It hides silently in darkness and waits for its foes to make a move.',
  },
  {
    name: 'Lucario',
    number: '#448',
    type1: 'Fighting', type2: 'Steel',
    img: '/assets/slider/card6.png',
    bg: 'radial-gradient(ellipse at 30% 50%, #0a1a2a 0%, #050e1a 60%, #0a0a1a 100%)',
    accent: '#4fc3f7',
    stats: { hp: 70, atk: 110, def: 70, spd: 90 },
    desc: 'It has the ability to sense the Auras of all things. It understands human speech. By reading the auras of all things, it can tell how people and Pokémon are feeling. It trains hard to improve its Aura abilities.',
  },
]

const typeColors = {
  Fire: '#ff6b35', Flying: '#90caf9', Psychic: '#c77dff',
  Ghost: '#7b2d8b', Poison: '#a855f7', Water: '#4ecdc4',
  Dark: '#555', Steel: '#90a4ae', Fighting: '#ef5350',
}

const PokemonSlider = () => {
  const [idx, setIdx] = useState(0)
  const [dir, setDir] = useState('next')

  const prev = () => { setDir('prev'); setIdx(i => (i - 1 + pokemon.length) % pokemon.length) }
  const next = () => { setDir('next'); setIdx(i => (i + 1) % pokemon.length) }

  const mon = pokemon[idx]

  return (
    <section className="pslider" style={{ background: mon.bg }} id="pokedex">
      <div className="pslider-inner">

        {/* Image side */}
        <div className="pslider-img-area">
          {pokemon.map((p, i) => {
            const offset = (i - idx + pokemon.length) % pokemon.length
            let tx = 0, ty = 0, scale = 1, opacity = 1, blur = 'none', z = 1
            if (offset === 0) { tx = 0; ty = 0; scale = 1.3; opacity = 1; blur = 'none'; z = 4 }
            else if (offset === 1) { tx = 180; ty = -60; scale = 0.85; opacity = 0.35; blur = 'blur(4px)'; z = 2 }
            else if (offset === pokemon.length - 1) { tx = -200; ty = 140; scale = 0.6; opacity = 0.3; blur = 'blur(8px)'; z = 2 }
            else { tx = 0; ty = 0; scale = 0.7; opacity = 0; z = 0 }
            return (
              <img key={i} src={p.img} alt={p.name} className="pslider-mon-img"
                style={{ transform: `translate(${tx}px,${ty}px) scale(${scale})`, opacity, filter: blur, zIndex: z }} />
            )
          })}
        </div>

        {/* Info side */}
        <div className="pslider-info-area">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={idx} className="pslider-card"
              custom={dir}
              initial={{ x: dir === 'next' ? 60 : -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir === 'next' ? -60 : 60, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
            >
              <div className="pslider-number">{mon.number}</div>
              <h2 className="pslider-name">{mon.name}</h2>

              <div className="pslider-types">
                <span className="type-badge" style={{ background: typeColors[mon.type1] || '#555' }}>{mon.type1}</span>
                {mon.type2 && <span className="type-badge" style={{ background: typeColors[mon.type2] || '#555' }}>{mon.type2}</span>}
              </div>

              <p className="pslider-desc">{mon.desc}</p>

              <div className="pslider-stats">
                {[['HP', mon.stats.hp], ['ATK', mon.stats.atk], ['DEF', mon.stats.def], ['SPD', mon.stats.spd]].map(([label, val]) => (
                  <div key={label} className="stat-row">
                    <span className="stat-label">{label}</span>
                    <div className="stat-bar-bg">
                      <motion.div className="stat-bar-fill"
                        style={{ background: mon.accent }}
                        initial={{ width: 0 }}
                        animate={{ width: `${(val / 150) * 100}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                      />
                    </div>
                    <span className="stat-val">{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pslider-controls">
            <button className="pctrl-btn" onClick={prev} aria-label="Previous">
              <FaChevronLeft />
            </button>
            <div className="pctrl-dots">
              {pokemon.map((_, i) => (
                <button key={i} className={`pdot ${i === idx ? 'active' : ''}`}
                  onClick={() => { setDir(i > idx ? 'next' : 'prev'); setIdx(i) }}
                  aria-label={`Go to ${pokemon[i].name}`}
                />
              ))}
            </div>
            <button className="pctrl-btn" onClick={next} aria-label="Next">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PokemonSlider
