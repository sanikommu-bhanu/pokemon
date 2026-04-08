import React, { useState } from 'react'
import './AuthModal.css'

const AuthModal = ({ mode, onClose, onLogin, onSwitchMode }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const isLogin = mode === 'login'

  const change = e => { setForm({ ...form, [e.target.name]: e.target.value }); setError('') }

  const submit = e => {
    e.preventDefault(); setError('')
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    if (!isLogin && !form.name) { setError('Please enter your trainer name.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const users = JSON.parse(localStorage.getItem('poke_users') || '[]')
      if (isLogin) {
        const found = users.find(u => u.email === form.email && u.password === form.password)
        if (!found) { setError('Invalid email or password.'); return }
        onLogin({ name: found.name, email: found.email })
      } else {
        if (users.find(u => u.email === form.email)) { setError('This email is already registered.'); return }
        const newUser = { name: form.name, email: form.email, password: form.password }
        localStorage.setItem('poke_users', JSON.stringify([...users, newUser]))
        onLogin({ name: form.name, email: form.email })
      }
    }, 650)
  }

  return (
    <div className="am-overlay" onClick={onClose}>
      <div className="am-modal" onClick={e => e.stopPropagation()}>
        <button className="am-close" onClick={onClose}>✕</button>

        <div className="am-pokeball">⊙</div>
        <h2 className="am-title">{isLogin ? 'Welcome Back, Trainer' : 'Start Your Journey'}</h2>
        <p className="am-sub">{isLogin ? 'Sign in to your trainer account' : 'Create your Pokémon trainer account'}</p>

        <form onSubmit={submit} className="am-form" noValidate>
          {!isLogin && (
            <div className="am-field">
              <label>Trainer Name</label>
              <input name="name" type="text" placeholder="Ash Ketchum" value={form.name} onChange={change} autoFocus={!isLogin} />
            </div>
          )}
          <div className="am-field">
            <label>Email</label>
            <input name="email" type="email" placeholder="trainer@pokemon.com" value={form.email} onChange={change} autoFocus={isLogin} />
          </div>
          <div className="am-field">
            <label>Password</label>
            <input name="password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={change} />
          </div>
          {error && <div className="am-error">{error}</div>}
          <button type="submit" className="am-submit" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="am-switch">
          {isLogin ? (<>No account? <button onClick={() => onSwitchMode('signup')}>Sign Up</button></>) : (<>Have an account? <button onClick={() => onSwitchMode('login')}>Sign In</button></>)}
        </div>
      </div>
    </div>
  )
}

export default AuthModal
