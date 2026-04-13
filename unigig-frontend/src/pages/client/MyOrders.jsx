import { useEffect, useState } from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Loader from '../../components/common/Loader'
import ErrorMessage from '../../components/common/ErrorMessage'
import OrderCard from '../../components/orders/OrderCard'
import { getMyOrdersAPI, updateOrderStatusAPI } from '../../api/order.api'
import { ORDER_STATUS } from '../../constants/orderStatus'

const TABS = [
  { label: 'All', value: '' },
  { label: 'Pending', value: ORDER_STATUS.PENDING },
  { label: 'Active', value: ORDER_STATUS.ACCEPTED },
  { label: 'Completed', value: ORDER_STATUS.COMPLETED },
  { label: 'Cancelled', value: ORDER_STATUS.CANCELLED }
]

const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('')

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

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const res = await updateOrderStatusAPI(orderId, status)
      if (res.success) {
        setOrders(orders.map(o =>
          o.id === orderId ? { ...o, status } : o
        ))
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status')
    }
  }

  const filtered = activeTab
    ? orders.filter(o => o.status === activeTab)
    : orders

  return (
    <div>
      <Navbar />

      <div className='container' style={{ padding: '48px 24px' }}>

        {/* Header */}
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>My Orders</h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '15px',
          marginBottom: '32px'
        }}>
          Track and manage all your orders
        </p>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '28px',
          flexWrap: 'wrap'
        }}>
          {TABS.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: '500',
                border: `1.5px solid ${activeTab === tab.value ? 'var(--primary)' : 'var(--border)'}`,
                background: activeTab === tab.value ? 'var(--primary)' : 'transparent',
                color: activeTab === tab.value ? 'white' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading && <Loader />}
        <ErrorMessage message={error} />

        {!loading && filtered.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 24px',
            color: 'var(--text-muted)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>No orders found</h3>
            <p style={{ fontSize: '14px' }}>No orders in this category yet</p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!loading && filtered.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default MyOrders