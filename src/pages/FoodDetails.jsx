import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFood } from '../context/FoodContext'

function FoodDetails() {
  const { foodId } = useParams()
  const { foods, reserveFood } = useFood()
  const food = foods.find((item) => item.id === foodId)
  const [pickupTime, setPickupTime] = useState('')
  const [reserved, setReserved] = useState(false)

  if (!food) {
    return (
      <section className="content-section not-found">
        <span className="eyebrow">THIS PLATE HAS MOVED ON</span>
        <h1>We can’t find<br />that good thing<span className="heading-period">.</span></h1>
        <Link className="button button-dark" to="/browse">Back to all food</Link>
      </section>
    )
  }

  function handleReserve(event) {
    event.preventDefault()
    reserveFood(food.id, pickupTime)
    setReserved(true)
  }

  return (
    <section className="details-page content-section">
      <Link className="back-link" to="/browse"><span aria-hidden="true">←</span> Back to nearby food</Link>
      <div className="details-layout">
        <div className="details-main">
          <div className="details-image-wrap">
            <img src={food.image} alt={food.name} />
            <span className="image-badge">{food.category}</span>
          </div>
          <div className="details-heading">
            <div><span className="eyebrow">A LITTLE SOMETHING NEARBY</span><h1>{food.name}<span className="heading-period">.</span></h1></div>
            <span className="details-distance">{food.distance || 'Nearby'}</span>
          </div>
          <p className="details-description">{food.description || 'A little something shared by a neighbor. Fresh, local, and ready to find a new home.'}</p>
          <div className="details-facts">
            <div><span className="fact-icon" aria-hidden="true">▤</span><span><small>Available</small><strong>{food.quantity}</strong></span></div>
            <div><span className="fact-icon" aria-hidden="true">◎</span><span><small>Pickup in</small><strong>{food.location}</strong></span></div>
            <div><span className="fact-icon" aria-hidden="true">◷</span><span><small>Pickup by</small><strong>{food.pickupUntil}</strong></span></div>
          </div>
          <div className="donor-profile-card">
            <span className="donor-avatar-large">{food.donorInitials}</span>
            <span><small>SHARED WITH CARE BY</small><strong>{food.donorName}</strong><span>{food.donorType || 'Community member'}</span></span>
            <span className="trust-mark" aria-label="Community member">✓</span>
          </div>
        </div>
        <aside className="reservation-card">
          <span className="eyebrow">MAKE IT YOURS</span>
          <h2>Save a plate<span className="heading-period">.</span></h2>
          <p>Choose a pickup time that works for you. Your neighbor will have it ready.</p>
          {food.reserved || reserved ? (
            <div className="reservation-success">
              <span className="success-mark" aria-hidden="true">✓</span>
              <h3>Your plate is saved.</h3>
              <p>Pickup: {food.pickupTime || pickupTime}. You’re all set — thanks for keeping good food in good hands.</p>
              <Link className="text-link" to="/browse">Find another good thing →</Link>
            </div>
          ) : (
            <form onSubmit={handleReserve}>
              <label className="field">Pickup time <span>*</span>
                <select value={pickupTime} onChange={(event) => setPickupTime(event.target.value)} required>
                  <option value="">Choose a pickup time</option>
                  <option value="Today, 4:00–4:30 PM">Today, 4:00–4:30 PM</option>
                  <option value="Today, 5:00–5:30 PM">Today, 5:00–5:30 PM</option>
                  <option value="Today, 6:00–6:30 PM">Today, 6:00–6:30 PM</option>
                </select>
              </label>
              <button className="button button-dark button-full" type="submit">Reserve this food <span aria-hidden="true">↗</span></button>
              <p className="reservation-note"><span aria-hidden="true">♡</span> Free to reserve. Always about community.</p>
            </form>
          )}
        </aside>
      </div>
    </section>
  )
}

export default FoodDetails
