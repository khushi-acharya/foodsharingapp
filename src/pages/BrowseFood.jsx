import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFood } from '../context/FoodContext'
import FoodCard from '../components/FoodCard'
import PageIntro from '../components/PageIntro'

const categories = ['All food', 'Meals', 'Produce', 'Bakery']

function BrowseFood() {
  const { foods } = useFood()
  const searchInput = useRef(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All food')
  const [showAvailableOnly, setShowAvailableOnly] = useState(true)

  useEffect(() => {
    function focusSearch(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchInput.current?.focus()
      }
    }
    window.addEventListener('keydown', focusSearch)
    return () => window.removeEventListener('keydown', focusSearch)
  }, [])

  const filteredFoods = useMemo(() => {
    const query = search.trim().toLowerCase()
    return foods.filter((food) => {
      const matchesCategory = category === 'All food' || food.category === category
      const matchesSearch = !query || `${food.name} ${food.location} ${food.donorName} ${food.category}`.toLowerCase().includes(query)
      return matchesCategory && matchesSearch && (!showAvailableOnly || !food.reserved)
    })
  }, [foods, search, category, showAvailableOnly])

  return (
    <section className="browse-page content-section">
      <PageIntro eyebrow="GOOD THINGS ARE CLOSE BY" title={<>Find your next<br />good thing<span className="heading-period">.</span></>} description="Fresh finds from people and places right around the corner." />
      <div className="browse-toolbar">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <span className="visually-hidden">Search food or neighborhood</span>
          <input ref={searchInput} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Try “bread” or “Hayes Valley”" />
          <kbd>⌘ K</kbd>
        </label>
        <button className={`availability-toggle ${showAvailableOnly ? 'is-on' : ''}`} type="button" onClick={() => setShowAvailableOnly((value) => !value)} aria-pressed={showAvailableOnly}>
          <span className="toggle-track"><span /></span> Available now
        </button>
      </div>
      <div className="filter-row" aria-label="Filter by category">
        <div className="category-pills">
          {categories.map((item) => (
            <button key={item} className={`category-pill ${category === item ? 'active' : ''}`} onClick={() => setCategory(item)} type="button">{item}</button>
          ))}
        </div>
        <span className="result-count">{filteredFoods.length} {filteredFoods.length === 1 ? 'good thing' : 'good things'} nearby</span>
      </div>
      {filteredFoods.length ? (
        <div className="food-grid browse-grid">{filteredFoods.map((food) => <FoodCard key={food.id} food={food} />)}</div>
      ) : (
        <div className="empty-state">
          <span className="empty-icon" aria-hidden="true">⌕</span>
          <h3>No plates found just yet.</h3>
          <p>Try another search, or share something for your neighbors to find.</p>
          <Link className="button button-dark" to="/donate">Share food</Link>
        </div>
      )}
    </section>
  )
}

export default BrowseFood
