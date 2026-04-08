import React, { useState, useEffect } from 'react'
import './Navbar.css'

const Navbar = ({ user, onLoginClick, onSignupClick, onLogout }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => scrollTo('home')}>
        <img src="/assets/ui/logo.png" alt="Pokémon" className="logo-img" />
      </div>

      <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
        <span /><span /><span />
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {['home','pokedex','types','games','about'].map(id => (
          <li key={id} onClick={() => scrollTo(id)}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </li>
        ))}
      </ul>

      <div className="nav-auth">
        {user ? (
          <>
            <span className="trainer-badge">
              <span className="trainer-icon">⊕</span> {user.name}
            </span>
            <button className="btn btn-ghost" onClick={onLogout}>Sign Out</button>
          </>
        ) : (
          <>
            <button className="btn btn-ghost" onClick={onLoginClick}>Login</button>
            <button className="btn btn-primary" onClick={onSignupClick}>Join Now</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
