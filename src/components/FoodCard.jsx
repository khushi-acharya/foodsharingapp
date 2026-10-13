import { Link } from 'react-router-dom'

function FoodCard({ food }) {
  return (
    <article className="food-card">
      <Link className="food-image-link" to={`/food/${food.id}`} aria-label={`View ${food.name}`}>
        <img className="food-image" src={food.image} alt={food.name} />
        <span className="image-badge">{food.category}</span>
        {food.reserved && <span className="reserved-badge">Reserved</span>}
      </Link>
      <div className="food-card-content">
        <div className="food-card-heading">
          <Link to={`/food/${food.id}`} className="food-title">{food.name}</Link>
          <span className="food-distance">{food.distance || 'Nearby'}</span>
        </div>
        <p className="food-donor">
          <span className="donor-mini">{food.donorInitials}</span>
          {food.donorName}
        </p>
        <div className="food-card-meta">
          <span><span aria-hidden="true">◎</span> {food.location}</span>
          <span><span aria-hidden="true">▤</span> {food.quantity}</span>
        </div>
        <div className="food-card-bottom">
          <span className="pickup-time">Pickup by {food.pickupUntil}</span>
          <Link className="arrow-link" to={`/food/${food.id}`} aria-label={`See ${food.name} details`}>↗</Link>
        </div>
      </div>
    </article>
  )
}

export default FoodCard
