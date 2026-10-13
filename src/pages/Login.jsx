import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const { user, signIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  function handleSubmit(event) {
    event.preventDefault()
    signIn(email.trim())
    navigate(location.state?.from || '/dashboard', { replace: true })
  }

  return (
    <section className="login-page">
      <div className="login-visual">
        <div className="login-visual-overlay" />
        <Link className="brand login-brand" to="/">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>shareplate<span className="brand-period">.</span></span>
        </Link>
        <div className="login-visual-copy">
          <span className="eyebrow">A LITTLE GOOD GOES A LONG WAY</span>
          <h1>Good food.<br />Good people.<br />Right here.</h1>
          <p>Make a little room for something good in your neighborhood.</p>
        </div>
        <span className="login-photo-credit">A more generous kind of neighborhood.</span>
      </div>
      <div className="login-panel">
        <Link className="login-mobile-brand brand" to="/">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>shareplate<span className="brand-period">.</span></span>
        </Link>
        <div className="login-form-wrap">
          <span className="eyebrow">WELCOME TO THE TABLE</span>
          <h2>Good to have<br />you here<span className="heading-period">.</span></h2>
          <p className="login-subtitle">Sign in to see what’s happening in your community.</p>
          <div className="demo-notice">
            <span aria-hidden="true">✳</span>
            <p><strong>Demo sign-in</strong><br />Use any valid email and a password of 6 or more characters. No account is created.</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label className="field">Email address
              <input autoComplete="email" type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
            </label>
            <label className="field">Password
              <span className="password-field">
                <input autoComplete="current-password" type={showPassword ? 'text' : 'password'} name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 6 characters" minLength={6} required />
                <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </span>
            </label>
            <button className="button button-dark button-full login-submit" type="submit">Continue to your dashboard <span aria-hidden="true">↗</span></button>
          </form>
          <p className="login-back-link">Just looking around? <Link to="/">Explore SharePlate</Link></p>
        </div>
        <span className="login-privacy-note">Your password is not saved. Demo sign-in only.</span>
      </div>
    </section>
  )
}

export default Login
