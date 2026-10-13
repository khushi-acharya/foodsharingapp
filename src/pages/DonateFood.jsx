import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFood } from '../context/FoodContext'
import PageIntro from '../components/PageIntro'

function DonateFood() {
  const { addFood } = useFood()
  const [submitted, setSubmitted] = useState(false)
  const [minimumPickup] = useState(() => {
    const minimum = new Date(Date.now() + 60_000)
    minimum.setMinutes(minimum.getMinutes() - minimum.getTimezoneOffset())
    return minimum.toISOString().slice(0, 16)
  })
  const [form, setForm] = useState({
    name: '',
    donorName: '',
    category: 'Meals',
    quantity: '',
    location: '',
    pickupUntil: '',
    description: '',
  })

  function updateField(event) {
    setForm((currentForm) => ({ ...currentForm, [event.target.name]: event.target.value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const pickupDate = new Date(form.pickupUntil)
    const food = {
      ...form,
      id: `food-${Date.now()}`,
      distance: 'Nearby',
      donorType: 'Community member',
      donorInitials: form.donorName.trim().split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
      pickupUntil: pickupDate.toLocaleString(undefined, { weekday: 'short', hour: 'numeric', minute: '2-digit' }),
      image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
      color: 'sage',
      reserved: false,
      isMine: true,
    }
    addFood(food)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <section className="form-page content-section">
        <div className="success-card">
          <span className="success-mark" aria-hidden="true">✓</span>
          <span className="eyebrow">A LOVELY THING, DONE</span>
          <h1>Your food is out<br />in the world<span className="heading-period">.</span></h1>
          <p>Thanks for sharing, {form.donorName}. Your neighbors can now find your listing.</p>
          <Link className="button button-dark" to="/profile">See your listing <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    )
  }

  return (
    <section className="form-page content-section">
      <PageIntro eyebrow="PASS A PLATE FORWARD" title={<>Share something<br />good<span className="heading-period">.</span></>} description="A few details help the right neighbor find your food and pick it up in time." />
      <form className="donation-form" onSubmit={handleSubmit}>
        <div className="form-section-heading"><span className="form-step">01</span><div><h2>Tell us about the food</h2><p>Give your listing a little personality.</p></div></div>
        <div className="form-grid">
          <label className="field field-wide">What are you sharing? <span>*</span>
            <input name="name" value={form.name} onChange={updateField} placeholder="e.g. A box of fresh garden tomatoes" required maxLength={70} />
          </label>
          <label className="field">Food category <span>*</span>
            <select name="category" value={form.category} onChange={updateField}>
              <option>Meals</option><option>Produce</option><option>Bakery</option><option>Pantry</option><option>Other</option>
            </select>
          </label>
          <label className="field">How much is available? <span>*</span>
            <input name="quantity" value={form.quantity} onChange={updateField} placeholder="e.g. 4 portions" required maxLength={40} />
          </label>
          <label className="field">Pickup neighborhood <span>*</span>
            <input name="location" value={form.location} onChange={updateField} placeholder="e.g. Mission District" required maxLength={70} />
          </label>
          <label className="field">Pickup by <span>*</span>
            <input name="pickupUntil" type="datetime-local" min={minimumPickup} value={form.pickupUntil} onChange={updateField} required />
          </label>
          <label className="field field-wide">A note for your neighbor
            <textarea name="description" value={form.description} onChange={updateField} placeholder="Anything helpful to know about the food?" rows="3" maxLength={240} />
          </label>
        </div>
        <div className="form-section-heading form-section-second"><span className="form-step">02</span><div><h2>Who’s sharing?</h2><p>Let your neighbors know who to look for.</p></div></div>
        <div className="form-grid">
          <label className="field field-wide">Your name or organization <span>*</span>
            <input name="donorName" value={form.donorName} onChange={updateField} placeholder="e.g. Alex or Olive & Rye" required maxLength={60} />
          </label>
        </div>
        <div className="form-actions">
          <p><span aria-hidden="true">♡</span> Thank you for keeping good food in good hands.</p>
          <button className="button button-dark" type="submit">Post my food <span aria-hidden="true">↗</span></button>
        </div>
      </form>
    </section>
  )
}

export default DonateFood
