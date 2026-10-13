import { Link } from 'react-router-dom'
import { useFood } from '../context/FoodContext'
import FoodCard from '../components/FoodCard'

function DonorProfile() {
  const { foods } = useFood()
  const myFoods = foods.filter((food) => food.isMine)
  const sharedCount = myFoods.reduce((total, food) => {
    const amount = Number.parseInt(food.quantity, 10)
    return total + (Number.isNaN(amount) ? 1 : amount)
  }, 0)

  return (
    <section className="profile-page content-section">
      <div className="profile-cover">
        <div className="profile-avatar">Y</div>
        <span className="profile-status"><span className="live-dot" /> YOUR COMMUNITY PROFILE</span>
      </div>
      <div className="profile-heading">
        <div><span className="eyebrow">A GOOD NEIGHBOR</span><h1>Your profile<span className="heading-period">.</span></h1><p>Every plate you share makes your neighborhood a little stronger.</p></div>
        <Link className="button button-dark" to="/donate">+ Share more food</Link>
      </div>
      <div className="profile-stats">
        <div><span>YOUR LISTINGS</span><strong>{myFoods.length.toString().padStart(2, '0')}</strong></div>
        <div><span>PORTIONS SHARED</span><strong>{sharedCount.toString().padStart(2, '0')}</strong></div>
        <div><span>COMMUNITY IMPACT</span><strong>{myFoods.length ? '♡' : '—'}</strong></div>
        <div className="profile-stats-note"><span aria-hidden="true">✳</span> Kindness looks<br />good on you.</div>
      </div>
      <div className="section-heading profile-list-heading">
        <div><span className="eyebrow">YOUR LITTLE CONTRIBUTIONS</span><h2>Food you’ve shared<span className="heading-period">.</span></h2></div>
        <Link className="text-link" to="/browse">Browse the neighborhood <span aria-hidden="true">→</span></Link>
      </div>
      {myFoods.length ? (
        <div className="food-grid">{myFoods.map((food) => <FoodCard key={food.id} food={food} />)}</div>
      ) : (
        <div className="empty-state profile-empty">
          <span className="empty-icon" aria-hidden="true">♡</span>
          <h3>Your first share starts here.</h3>
          <p>Have a little extra? List it and give it a chance to make someone’s day.</p>
          <Link className="button button-dark" to="/donate">Share your first food</Link>
        </div>
      )}
    </section>
  )
}

export default DonorProfile
