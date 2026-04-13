import { useState } from 'react'

const StarRating = ({ rating = 0, interactive = false, onRate = null, size = 18 }) => {
  const [hovered, setHovered] = useState(0)

  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => interactive && onRate && onRate(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          style={{
            fontSize: `${size}px`,
            cursor: interactive ? 'pointer' : 'default',
            color: star <= (hovered || rating) ? '#f59e0b' : '#e2e8f0',
            transition: 'var(--transition)'
          }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating