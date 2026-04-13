import { STATUS_COLORS, STATUS_LABELS } from '../../constants/orderStatus'

const OrderStatusBadge = ({ status }) => {
  return (
    <span className='badge' style={{
      background: `${STATUS_COLORS[status]}20`,
      color: STATUS_COLORS[status],
      border: `1px solid ${STATUS_COLORS[status]}40`
    }}>
      {STATUS_LABELS[status]}
    </span>
  )
}

export default OrderStatusBadge