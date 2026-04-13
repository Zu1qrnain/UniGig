import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Loader from '../../components/common/Loader'
import ErrorMessage from '../../components/common/ErrorMessage'
import OrderStatusBadge from '../../components/orders/OrderStatusBadge'
import { getMyOrdersAPI, updateOrderStatusAPI } from '../../api/order.api'
import { getMyGigsAPI } from '../../api/gig.api'
import { formatPrice, formatDate } from '../../utils/format.utils'
import useAuth from '../../hooks/useAuth'

const FreelancerDashboard = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, gigsRes] = await Promise.all([
          getMyOrdersAPI(),
          getMyGigsAPI()
        ])
        if (ordersRes.success) setOrders(ordersRes.data)
        if (gigsRes.success) setGigs(gigsRes.data)
      } catch {
        setError('Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const res = await updateOrderStatusAPI(orderId, status)
      if (res.success) {
        setOrders(orders.map(o =>
          o.id === orderId ? { ...o, status } : o
        ))
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update')
    }
  }

  const stats = {
    totalGigs: gigs.length,
    activeGigs: gigs.filter(g => g.is_active).length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completed: orders.filter(o => o.status === 'completed').length,
    earnings: orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + parseFloat(o.price), 0)
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
              Welcome, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Here's your freelancer overview
            </p>
          </div>
          <Link to='/freelancer/gigs/create' className='btn btn-primary'>
            + Create New Gig
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
            { label: 'Total Gigs', value: stats.totalGigs, color: 'var(--primary)' },
            { label: 'Active Gigs', value: stats.activeGigs, color: '#10b981' },
            { label: 'Pending Orders', value: stats.pendingOrders, color: '#f59e0b' },
            { label: 'Completed', value: stats.completed, color: '#3b82f6' },
            { label: 'Total Earnings', value: `$${stats.earnings.toFixed(2)}`, color: '#10b981' },
            { label: 'Avg Rating', value: `${user?.avg_rating || '0.0'}⭐`, color: '#f59e0b' }
          ].map(stat => (
            <div key={stat.label} className='card' style={{ padding: '20px' }}>
              <p style={{
                fontSize: '26px',
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

        {loading && <Loader />}
        <ErrorMessage message={error} />

        {!loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px'
          }}>

            {/* Recent Orders */}
            <div>
              <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Recent Orders</h2>

              {orders.length === 0 ? (
                <div className='card' style={{
                  padding: '32px',
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <p>No orders yet</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className='card' style={{ padding: '16px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                      }}>
                        <p style={{ fontWeight: '600', fontSize: '14px' }}>
                          {order.gig?.title}
                        </p>
                        <OrderStatusBadge status={order.status} />
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                        Client: {order.client?.name} • {formatDate(order.createdAt)}
                      </p>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {order.status === 'pending' && (
                          <button
                            onClick={() => handleStatusUpdate(order.id, 'accepted')}
                            className='btn btn-primary'
                            style={{ fontSize: '12px', padding: '6px 12px' }}
                          >
                            ✅ Accept
                          </button>
                        )}
                        {order.status === 'accepted' && (
                          <button
                            onClick={() => handleStatusUpdate(order.id, 'completed')}
                            className='btn btn-primary'
                            style={{ fontSize: '12px', padding: '6px 12px' }}
                          >
                            🏁 Complete
                          </button>
                        )}
                        <Link
                          to={`/chat/${order.id}`}
                          className='btn btn-outline'
                          style={{ fontSize: '12px', padding: '6px 12px' }}
                        >
                          💬 Chat
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* My Gigs */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}>
                <h2 style={{ fontSize: '18px' }}>My Gigs</h2>
                <Link to='/freelancer/gigs' style={{
                  fontSize: '13px',
                  color: 'var(--primary)',
                  fontWeight: '500'
                }}>
                  View All →
                </Link>
              </div>

              {gigs.length === 0 ? (
                <div className='card' style={{
                  padding: '32px',
                  textAlign: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <p style={{ marginBottom: '12px' }}>No gigs yet</p>
                  <Link to='/freelancer/gigs/create' className='btn btn-primary'
                    style={{ fontSize: '13px' }}>
                    Create First Gig
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {gigs.slice(0, 5).map(gig => (
                    <div key={gig.id} className='card' style={{
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <p style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                          {gig.title}
                        </p>
                        <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600' }}>
                          {formatPrice(gig.price)}
                        </p>
                      </div>
                      <Link
                        to={`/freelancer/gigs/edit/${gig.id}`}
                        className='btn btn-outline'
                        style={{ fontSize: '12px', padding: '6px 12px' }}
                      >
                        Edit
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default FreelancerDashboard