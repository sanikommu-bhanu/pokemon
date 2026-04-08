import React from 'react'
import './Hero.css'
import { motion } from 'framer-motion'

const heroMons = [
  { file: 'hero1.png', name: 'Pikachu' },
  { file: 'hero2.png', name: 'Charizard' },
  { file: 'hero3.png', name: 'Mewtwo' },
  { file: 'hero4.png', name: 'Bulbasaur' },
  { file: 'hero5.png', name: 'Squirtle' },
  { file: 'hero6.png', name: 'Eevee' },
]

const repeated = [...heroMons, ...heroMons, ...heroMons]

const Hero = () => {
  return (
    <section className="hero" id="home">
      {/* Decorative pokeballs */}
      <div className="pokeball-bg pb1" />
      <div className="pokeball-bg pb2" />
      <div className="pokeball-bg pb3" />

      <div className="hero-content">
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        >
          ✦ The Ultimate Trainer Hub ✦
        </motion.div>
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        >
          Gotta Catch<br />'Em All
        </motion.h1>
        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        >
          Explore every Pokémon, master every type, become a legendary trainer.
        </motion.p>
        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
        >
          <button className="cta-primary" onClick={() => document.getElementById('pokedex')?.scrollIntoView({ behavior: 'smooth' })}>
            Open Pokédex
          </button>
          <button className="cta-ghost" onClick={() => document.getElementById('types')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Types
          </button>
        </motion.div>
      </div>

      <motion.div
        className="hero-strip-wrap"
        drag="x"
        dragConstraints={{ left: -1800, right: 0 }}
        whileDrag={{ cursor: 'grabbing' }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {repeated.map((mon, i) => (
          <motion.div key={i} className="hero-mon-card" whileHover={{ y: -12, scale: 1.06 }}>
            <img src={`/assets/hero/${mon.file}`} alt={mon.name} draggable={false} />
            <span className="mon-name">{mon.name}</span>
          </motion.div>
        ))}
      </motion.div>

      <div className="hero-scroll-hint">
        <span className="scroll-dot" /> Scroll to explore
      </div>
    </section>
  )
}

export default Hero
