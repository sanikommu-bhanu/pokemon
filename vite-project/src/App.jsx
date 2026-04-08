import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PokemonSlider from './components/PokemonSlider'
import TypesSection from './components/TypesSection'
import Footer from './components/Footer'
import AuthModal from './components/AuthModal'

function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('poke_user')) } catch { return null }
  })
  const [modalMode, setModalMode] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('poke_user', JSON.stringify(userData))
    setModalMode(null)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('poke_user')
  }

  return (
    <>
      <Navbar
        user={user}
        onLoginClick={() => setModalMode('login')}
        onSignupClick={() => setModalMode('signup')}
        onLogout={handleLogout}
      />
      <Hero />
      <PokemonSlider />
      <TypesSection />
      <Footer />
      {modalMode && (
        <AuthModal
          mode={modalMode}
          onClose={() => setModalMode(null)}
          onLogin={handleLogin}
          onSwitchMode={(m) => setModalMode(m)}
        />
      )}
    </>
  )
}

export default App
