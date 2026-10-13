import { Link } from 'react-router-dom'
import { useFood } from '../context/FoodContext'
import FoodCard from '../components/FoodCard'

function Home() {
  const { foods } = useFood()
  const availableFoods = foods.filter((food) => !food.reserved)

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow"><span className="live-dot" /> GOOD FOOD, SHARED LOCALLY</span>
          <h1>There’s a place<br />at the table<span className="heading-period">.</span></h1>
          <p>Share surplus food with your neighbors. Find something lovely for dinner. It’s a little thing that makes a big difference.</p>
          <div className="hero-actions">
            <Link className="button button-dark" to="/browse">Find food near you <span aria-hidden="true">↗</span></Link>
            <Link className="button button-light" to="/donate">I have food to share</Link>
          </div>
          <div className="community-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span className="avatar avatar-peach">M</span>
              <span className="avatar avatar-blue">J</span>
              <span className="avatar avatar-yellow">A</span>
              <span className="avatar avatar-green">+</span>
            </div>
            <span><strong>Your neighbors</strong> are already sharing</span>
          </div>
        </div>
        <div className="hero-art">
          <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=90" alt="A colorful, fresh meal ready to share" />
          <div className="hero-note">
            <span className="note-icon" aria-hidden="true">✳</span>
            <span><strong>More good, less waste.</strong><br />One plate at a time.</span>
          </div>
          <div className="hero-location"><span aria-hidden="true">◎</span> San Francisco, CA</div>
        </div>
        <div className="hero-scribble" aria-hidden="true">good things grow<br />when we share <span>↗</span></div>
      </section>

      <section className="impact-strip" aria-label="SharePlate impact">
        <div className="impact-intro">
          <span className="eyebrow">SMALL ACTS, BIG IMPACT</span>
          <p>Every shared plate<br />moves us forward.</p>
        </div>
        <div className="impact-stat"><strong>{12 + foods.length * 3}</strong><span>meals shared</span></div>
        <div className="impact-stat"><strong>{5 + foods.length}</strong><span>local food heroes</span></div>
        <div className="impact-stat"><strong>{8 + foods.length * 2}<small>kg</small></strong><span>food saved</span></div>
        <span className="impact-spark" aria-hidden="true">✳</span>
      </section>

      <section className="content-section featured-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FRESH FROM YOUR NEIGHBORHOOD</span>
            <h2>A little something nearby<span className="heading-period">.</span></h2>
          </div>
          <Link className="text-link" to="/browse">Explore all food <span aria-hidden="true">→</span></Link>
        </div>
        {availableFoods.length ? (
          <div className="food-grid">
            {availableFoods.slice(0, 3).map((food) => <FoodCard key={food.id} food={food} />)}
          </div>
        ) : (
          <div className="empty-state"><h3>It’s quiet around here.</h3><p>Be the first to share something with your neighbors.</p><Link className="button button-dark" to="/donate">Share food</Link></div>
        )}
      </section>

      <section className="how-section">
        <div className="how-heading">
          <span className="eyebrow">A GOOD THING, MADE SIMPLE</span>
          <h2>Good food finds<br />good people.</h2>
          <p>Sharing should feel as good as the food tastes.</p>
        </div>
        <div className="how-steps">
          <article className="how-step">
            <span className="step-number">01</span><span className="step-icon step-icon-peach" aria-hidden="true">♡</span>
            <h3>Someone shares</h3><p>Local kitchens and neighbors list their extra, still-lovely food.</p>
          </article>
          <article className="how-step">
            <span className="step-number">02</span><span className="step-icon step-icon-yellow" aria-hidden="true">⌕</span>
            <h3>You find your plate</h3><p>Browse what’s close by and reserve what you’d love to take home.</p>
          </article>
          <article className="how-step">
            <span className="step-number">03</span><span className="step-icon step-icon-green" aria-hidden="true">✳</span>
            <h3>Good things happen</h3><p>Pick it up, meet a neighbor, and keep good food in good hands.</p>
          </article>
        </div>
      </section>
      <section className="closing-cta">
        <div><span className="eyebrow">YOUR NEIGHBORHOOD IS WAITING</span><h2>There’s always room<br />for one more.</h2></div>
        <Link className="button button-dark" to="/browse">Find your next good thing <span aria-hidden="true">↗</span></Link>
        <span className="closing-flower" aria-hidden="true">✳</span>
      </section>
    </>
  )
}

export default Home
