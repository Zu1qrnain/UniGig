import { Link } from 'react-router-dom'
import StarRating from '../reviews/StarRating'
import { formatPrice, formatDelivery, formatCategory } from '../../utils/format.utils'

const GigCard = ({ gig }) => {
  return (
    <Link to={`/gigs/${gig.id}`} style={{ textDecoration: 'none' }}>
      <div className='card' style={{ padding: '20px', cursor: 'pointer' }}>

        {/* Category Badge */}
        <span className='badge' style={{
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          marginBottom: '12px',
          fontSize: '11px'
        }}>
          {formatCategory(gig.category)}
        </span>

        {/* Title */}
        <h3 style={{
          fontSize: '15px',
          fontWeight: '600',
          color: 'var(--text-primary)',
          marginBottom: '12px',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {gig.title}
        </h3>

        {/* Freelancer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '12px'
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {gig.freelancer?.name?.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            {gig.freelancer?.name}
          </span>
        </div>

        {/* Rating */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '16px'
        }}>
          <StarRating rating={gig.freelancer?.avg_rating || 0} size={14} />
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            ({gig.freelancer?.avg_rating || '0.0'})
          </span>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid var(--border)',
          paddingTop: '12px'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            🕐 {formatDelivery(gig.delivery_days)}
          </span>
          <span style={{
            fontSize: '16px',
            fontWeight: '700',
            color: 'var(--primary)'
          }}>
            {formatPrice(gig.price)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default GigCard