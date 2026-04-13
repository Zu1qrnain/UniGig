import { Link } from 'react-router-dom'
import OrderStatusBadge from './OrderStatusBadge'
import { formatPrice, formatDate } from '../../utils/format.utils'
import useAuth from '../../hooks/useAuth'
import { ROLES } from '../../constants/roles'

const OrderCard = ({ order, onStatusUpdate }) => {
  const { user } = useAuth()

  return (
    <div className='card' style={{ padding: '20px' }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
      }}>
        <div>
          <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>
            {order.gig?.title}
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            {user.role === ROLES.CLIENT
              ? `Freelancer: ${order.freelancer?.name}`
              : `Client: ${order.client?.name}`
            }
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Details */}
      <div style={{
        display: 'flex',
        gap: '20px',
        marginBottom: '16px',
        flexWrap: 'wrap'
      }}>
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Price</p>
          <p style={{ fontSize: '15px', fontWeight: '600', color: 'var(--primary)' }}>
            {formatPrice(order.price)}
          </p>
        </div>
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Placed On</p>
          <p style={{ fontSize: '14px', fontWeight: '500' }}>
            {formatDate(order.createdAt)}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>

        {/* Chat Button */}
        <Link
          to={`/chat/${order.id}`}
          className='btn btn-outline'
          style={{ fontSize: '13px', padding: '7px 14px' }}
        >
          💬 Chat
        </Link>

        {/* Freelancer Actions */}
        {user.role === ROLES.FREELANCER && order.status === 'pending' && (
          <button
            onClick={() => onStatusUpdate(order.id, 'accepted')}
            className='btn btn-primary'
            style={{ fontSize: '13px', padding: '7px 14px' }}
          >
            ✅ Accept
          </button>
        )}

        {user.role === ROLES.FREELANCER && order.status === 'accepted' && (
          <button
            onClick={() => onStatusUpdate(order.id, 'completed')}
            className='btn btn-primary'
            style={{ fontSize: '13px', padding: '7px 14px' }}
          >
            🏁 Mark Complete
          </button>
        )}

        {/* Client Review */}
        {user.role === ROLES.CLIENT && order.status === 'completed' && !order.review && (
          <Link
            to={`/client/review/${order.id}`}
            className='btn btn-primary'
            style={{ fontSize: '13px', padding: '7px 14px' }}
          >
            ⭐ Leave Review
          </Link>
        )}

        {/* Cancel */}
        {['pending', 'accepted'].includes(order.status) && (
          <button
            onClick={() => onStatusUpdate(order.id, 'cancelled')}
            className='btn btn-danger'
            style={{ fontSize: '13px', padding: '7px 14px' }}
          >
            ✕ Cancel
          </button>
        )}
      </div>
    </div>
  )
}

export default OrderCard