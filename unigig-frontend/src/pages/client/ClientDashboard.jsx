import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Loader from '../../components/common/Loader'
import ErrorMessage from '../../components/common/ErrorMessage'
import OrderStatusBadge from '../../components/orders/OrderStatusBadge'
import { getMyOrdersAPI } from '../../api/order.api'
import { formatPrice, formatDate } from '../../utils/format.utils'
import useAuth from '../../hooks/useAuth'

const ClientDashboard = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrdersAPI()
        if (res.success) setOrders(res.data)
        else setError(res.message)
      } catch {
        setError('Failed to fetch orders')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    active: orders.filter(o => o.status === 'accepted').length,
    completed: orders.filter(o => o.status === 'completed').length
  }

  return (
    <div>
      <Navbar />

      <div className='container' style={{ padding: '48px 24px' }}>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>
              Welcome back, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Here's an overview of your orders
            </p>
          </div>
          <Link to='/gigs' className='btn btn-primary'>
            Browse Gigs →
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px',
          marginBottom: '40px'
        }}>
          {[
            { label: 'Total Orders', value: stats.total, color: 'var(--primary)' },
            { label: 'Pending', value: stats.pending, color: '#f59e0b' },
            { label: 'Active', value: stats.active, color: '#3b82f6' },
            { label: 'Completed', value: stats.completed, color: '#10b981' }
          ].map(stat => (
            <div key={stat.label} className='card' style={{ padding: '20px' }}>
              <p style={{
                fontSize: '32px',
                fontWeight: '800',
                color: stat.color,
                marginBottom: '4px'
              }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ fontSize: '20px' }}>Recent Orders</h2>
            <Link to='/client/orders' style={{
              fontSize: '14px',
              color: 'var(--primary)',
              fontWeight: '500'
            }}>
              View All →
            </Link>
          </div>

          {loading && <Loader />}
          <ErrorMessage message={error} />

          {!loading && orders.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 24px',
              color: 'var(--text-muted)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
              <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No orders yet</h3>
              <p style={{ fontSize: '14px', marginBottom: '20px' }}>
                Browse gigs and place your first order
              </p>
              <Link to='/gigs' className='btn btn-primary'>
                Browse Gigs
              </Link>
            </div>
          )}

          {!loading && orders.slice(0, 5).map(order => (
            <div key={order.id} className='card' style={{
              padding: '20px',
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <p style={{ fontWeight: '600', marginBottom: '4px', fontSize: '15px' }}>
                  {order.gig?.title}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontWeight: '700', color: 'var(--primary)' }}>
                  {formatPrice(order.price)}
                </span>
                <OrderStatusBadge status={order.status} />
                <Link
                  to={`/client/chat/${order.id}`}
                  className='btn btn-outline'
                  style={{ fontSize: '13px', padding: '6px 12px' }}
                >
                  💬 Chat
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default ClientDashboard