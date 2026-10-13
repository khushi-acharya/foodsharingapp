import { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { FoodContext } from './context/FoodContext'
import { initialFoods } from './data/foods'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BrowseFood from './pages/BrowseFood'
import DonateFood from './pages/DonateFood'
import FoodDetails from './pages/FoodDetails'
import DonorProfile from './pages/DonorProfile'
import './App.css'

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

  useEffect(() => {
    try {
      localStorage.setItem('shareplate-foods', JSON.stringify(foods))
    } catch (error) {
      console.error('Could not save food listings:', error)
    }
  }, [foods])

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

  return (
    <FoodContext.Provider value={{ foods, addFood, reserveFood }}>
      <div className="app-shell">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<BrowseFood />} />
            <Route path="/donate" element={<DonateFood />} />
            <Route path="/food/:foodId" element={<FoodDetails />} />
            <Route path="/profile" element={<DonorProfile />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <Link className="brand brand-footer" to="/">
            <span className="brand-mark" aria-hidden="true">S</span>
            <span>shareplate<span className="brand-period">.</span></span>
          </Link>
          <p>Good food deserves a second plate.</p>
          <span>Made for a more generous community.</span>
        </footer>
      </div>
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
