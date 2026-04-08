import React from 'react'
import './Footer.css'

const Footer = () => (
  <footer className="footer" id="about">
    <div className="footer-inner">
      <div className="footer-brand">
        <img src="/assets/ui/logo.png" alt="Pokémon" className="footer-logo" />
        <p>The ultimate fan hub for Pokémon trainers around the world.</p>
      </div>
      <div className="footer-links">
        <div className="fl-col">
          <h4>Explore</h4>
          <a onClick={() => document.getElementById('home')?.scrollIntoView({behavior:'smooth'})}>Home</a>
          <a onClick={() => document.getElementById('pokedex')?.scrollIntoView({behavior:'smooth'})}>Pokédex</a>
          <a onClick={() => document.getElementById('types')?.scrollIntoView({behavior:'smooth'})}>Types</a>
        </div>
        <div className="fl-col">
          <h4>Universe</h4>
          <a href="#">Games</a>
          <a href="#">Anime</a>
          <a href="#">Trading Cards</a>
        </div>
        <div className="fl-col">
          <h4>Community</h4>
          <a href="#">Forums</a>
          <a href="#">Tournaments</a>
          <a href="#">Discord</a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2025 <span>Pokémon Universe</span>. Fan project — not affiliated with Nintendo or The Pokémon Company.</p>
    </div>
  </footer>
)

export default Footer
