import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" to="/" aria-label="SharePlate home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>shareplate<span className="brand-period">.</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/browse">Find food</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/profile">My profile</NavLink>
        </nav>
        <div className="topbar-actions">
          <Link className="button button-dark button-small" to="/donate">
            <span aria-hidden="true">+</span> Share food
          </Link>
          {user ? (
            <>
              <button className="sign-out-button" type="button" onClick={signOut}>Sign out</button>
              <Link className="avatar avatar-nav" to="/profile" aria-label="Open your profile">
                {user.email.charAt(0).toUpperCase()}
              </Link>
            </>
          ) : (
            <Link className="sign-in-link" to="/login">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
