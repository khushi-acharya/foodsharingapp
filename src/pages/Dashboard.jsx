import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useFood } from '../context/FoodContext'
import FoodCard from '../components/FoodCard'

function Dashboard() {
  const { user } = useAuth()
  const { foods } = useFood()
  const availableFoods = foods.filter((food) => !food.reserved)
  const reservedFoods = foods.filter((food) => food.reserved)
  const myFoods = foods.filter((food) => food.isMine)
  const portionsShared = myFoods.reduce((total, food) => {
    const amount = Number.parseInt(food.quantity, 10)
    return total + (Number.isNaN(amount) ? 1 : amount)
  }, 0)
  const firstName = user.email.split('@')[0].split(/[._-]/)[0]
  const greetingName = firstName.charAt(0).toUpperCase() + firstName.slice(1)

  return (
    <section className="dashboard-page content-section">
      <div className="dashboard-welcome">
        <div>
          <span className="eyebrow"><span className="live-dot" /> YOUR SHAREPLATE DASHBOARD</span>
          <h1>Good to see you, {greetingName}<span className="heading-period">.</span></h1>
          <p>Here’s a little look at the good things happening around your neighborhood.</p>
        </div>
        <Link className="button button-dark" to="/donate"><span aria-hidden="true">+</span> Share some food</Link>
      </div>

      <section className="dashboard-impact" aria-label="Community food sharing impact">
        <div className="dashboard-impact-heading">
          <span className="eyebrow">YOUR COMMUNITY, DOING GOOD</span>
          <h2>Look what we’re<br />doing together<span className="heading-period">.</span></h2>
          <p>Every share brings a little more goodness to the table.</p>
        </div>
        <div className="dashboard-stat-grid">
          <article className="dashboard-stat">
            <span className="dashboard-stat-icon stat-icon-peach" aria-hidden="true">♡</span>
            <strong>{foods.length + 20}</strong>
            <span>meals shared</span>
            <small>and counting</small>
          </article>
          <article className="dashboard-stat">
            <span className="dashboard-stat-icon stat-icon-sage" aria-hidden="true">✳</span>
            <strong>{foods.length + 5}</strong>
            <span>food neighbors</span>
            <small>making a difference</small>
          </article>
          <article className="dashboard-stat">
            <span className="dashboard-stat-icon stat-icon-yellow" aria-hidden="true">↗</span>
            <strong>{foods.length * 2 + 8}<small>kg</small></strong>
            <span>food kept in use</span>
            <small>less waste, more care</small>
          </article>
        </div>
        <span className="dashboard-impact-flower" aria-hidden="true">✳</span>
      </section>

      <div className="dashboard-personal-stats">
        <div><span>YOUR FOOD LISTINGS</span><strong>{myFoods.length.toString().padStart(2, '0')}</strong></div>
        <div><span>PORTIONS YOU’VE SHARED</span><strong>{portionsShared.toString().padStart(2, '0')}</strong></div>
        <div><span>AVAILABLE NEARBY</span><strong>{availableFoods.length.toString().padStart(2, '0')}</strong></div>
        <Link className="dashboard-profile-link" to="/profile">View your profile <span aria-hidden="true">↗</span></Link>
      </div>

      <section className="dashboard-section">
        <div className="section-heading">
          <div><span className="eyebrow">FRESH FROM YOUR NEIGHBORHOOD</span><h2>Good things nearby<span className="heading-period">.</span></h2></div>
          <Link className="text-link" to="/browse">Explore all food <span aria-hidden="true">→</span></Link>
        </div>
        {availableFoods.length ? (
          <div className="food-grid">{availableFoods.slice(0, 3).map((food) => <FoodCard key={food.id} food={food} />)}</div>
        ) : (
          <div className="empty-state"><h3>It’s quiet around here.</h3><p>Share something lovely for a neighbor to find.</p><Link className="button button-dark" to="/donate">Share food</Link></div>
        )}
      </section>

      <section className="dashboard-reservations">
        <div className="section-heading">
          <div><span className="eyebrow">PICKUP PLANS</span><h2>Reserved plates<span className="heading-period">.</span></h2></div>
          <span className="reservation-count">{reservedFoods.length} {reservedFoods.length === 1 ? 'reservation' : 'reservations'}</span>
        </div>
        {reservedFoods.length ? (
          <div className="reservation-list">
            {reservedFoods.map((food) => (
              <article className="reservation-row" key={food.id}>
                <span className="reservation-row-icon" aria-hidden="true">✓</span>
                <div><strong>{food.name}</strong><span>{food.donorName} · {food.location}</span></div>
                <span className="reservation-row-time">{food.pickupTime || food.pickupUntil}</span>
                <Link to={`/food/${food.id}`} aria-label={`View ${food.name} reservation`}>↗</Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="reservation-empty">
            <span className="empty-icon" aria-hidden="true">♡</span>
            <p>No plates reserved just yet. Find a little something nearby to make your day.</p>
            <Link className="text-link" to="/browse">Find food nearby <span aria-hidden="true">→</span></Link>
          </div>
        )}
      </section>
    </section>
  )
}

export default Dashboard
