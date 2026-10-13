import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import { FoodContext } from './context/FoodContext'
import { initialFoods } from './data/foods'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BrowseFood from './pages/BrowseFood'
import DonateFood from './pages/DonateFood'
import FoodDetails from './pages/FoodDetails'
import DonorProfile from './pages/DonorProfile'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './App.css'

function loadUser() {
  try {
    const savedUser = localStorage.getItem('shareplate-user')
    return savedUser ? JSON.parse(savedUser) : null
  } catch (error) {
    console.error('Could not load the saved user:', error)
    return null
  }
}

function loadFoods() {
  try {
    const savedFoods = localStorage.getItem('shareplate-foods')
    return savedFoods ? JSON.parse(savedFoods) : initialFoods
  } catch (error) {
    console.error('Could not load saved food listings:', error)
    return initialFoods
  }
}

function AppContent() {
  const [foods, setFoods] = useState(loadFoods)
  const [user, setUser] = useState(loadUser)
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  useEffect(() => {
    try {
      localStorage.setItem('shareplate-foods', JSON.stringify(foods))
    } catch (error) {
      console.error('Could not save food listings:', error)
    }
  }, [foods])

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('shareplate-user', JSON.stringify(user))
      } else {
        localStorage.removeItem('shareplate-user')
      }
    } catch (error) {
      console.error('Could not save the current user:', error)
    }
  }, [user])

  function addFood(food) {
    setFoods((currentFoods) => [food, ...currentFoods])
  }

  function reserveFood(foodId, pickupTime) {
    setFoods((currentFoods) =>
      currentFoods.map((food) =>
        food.id === foodId ? { ...food, reserved: true, pickupTime } : food,
      ),
    )
  }

  function signIn(email) {
    setUser({ email })
  }

  function signOut() {
    try {
      localStorage.removeItem('shareplate-user')
    } catch (error) {
      console.error('Could not clear the saved user:', error)
    }
    setUser(null)
  }

  return (
    <FoodContext.Provider value={{ foods, addFood, reserveFood }}>
      <AuthContext.Provider value={{ user, signIn, signOut }}>
        <div className="app-shell">
          {!isLoginPage && <Navbar />}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" replace state={{ from: location.pathname }} />} />
              <Route path="/browse" element={<BrowseFood />} />
              <Route path="/donate" element={<DonateFood />} />
              <Route path="/food/:foodId" element={<FoodDetails />} />
              <Route path="/profile" element={<DonorProfile />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          {!isLoginPage && (
            <footer className="site-footer">
              <Link className="brand brand-footer" to="/">
                <span className="brand-mark" aria-hidden="true">S</span>
                <span>shareplate<span className="brand-period">.</span></span>
              </Link>
              <p>Good food deserves a second plate.</p>
              <span>Made for a more generous community.</span>
            </footer>
          )}
        </div>
      </AuthContext.Provider>
    </FoodContext.Provider>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
