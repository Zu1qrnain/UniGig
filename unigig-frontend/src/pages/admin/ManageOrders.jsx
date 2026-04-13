import { useEffect, useState } from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Loader from '../../components/common/Loader'
import ErrorMessage from '../../components/common/ErrorMessage'
import OrderStatusBadge from '../../components/orders/OrderStatusBadge'
import { getAdminOrdersAPI } from '../../api/admin.api'
import { formatPrice, formatDate } from '../../utils/format.utils'
import { ORDER_STATUS } from '../../constants/orderStatus'

const ManageOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAdminOrdersAPI()
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

  const filtered = orders.filter(o => {
    const matchStatus = filter ? o.status === filter : true
    const matchSearch = search
      ? o.gig?.title?.toLowerCase().includes(search.toLowerCase()) ||
        o.client?.name?.toLowerCase().includes(search.toLowerCase()) ||
        o.freelancer?.name?.toLowerCase().includes(search.toLowerCase())
      : true
    return matchStatus && matchSearch
  })

  return (
    <div>
      <Navbar />

      <div className='container' style={{ padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>Manage Orders</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            {orders.length} total orders on the platform
          </p>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}>
          <input
            type='text'
            className='input'
            placeholder='Search by gig, client or freelancer...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
          <select
            className='input'
            style={{ width: 'auto', minWidth: '180px' }}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value=''>All Statuses</option>
            <option value={ORDER_STATUS.PENDING}>Pending</option>
            <option value={ORDER_STATUS.ACCEPTED}>Accepted</option>
            <option value={ORDER_STATUS.COMPLETED}>Completed</option>
            <option value={ORDER_STATUS.CANCELLED}>Cancelled</option>
          </select>
        </div>

        {loading && <Loader />}
        <ErrorMessage message={error} />

        {/* Table */}
        {!loading && (
          <div className='card' style={{ overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-secondary)' }}>
                    {['#', 'Gig', 'Client', 'Freelancer', 'Price', 'Status', 'Date'].map(h => (
                      <th key={h} style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: '600',
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        borderBottom: '1px solid var(--border)'
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order, index) => (
                    <tr key={order.id} style={{
                      borderBottom: index < filtered.length - 1
                        ? '1px solid var(--border)' : 'none'
                    }}>
                      <td style={{
                        padding: '14px 16px',
                        fontSize: '13px',
                        color: 'var(--text-muted)',
                        fontWeight: '600'
                      }}>
                        #{order.id}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <p style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          maxWidth: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {order.gig?.title}
                        </p>
                      </td>
                      <td style={{
                        padding: '14px 16px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)'
                      }}>
                        {order.client?.name}
                      </td>
                      <td style={{
                        padding: '14px 16px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)'
                      }}>
                        {order.freelancer?.name}
                      </td>
                      <td style={{
                        padding: '14px 16px',
                        fontSize: '14px',
                        fontWeight: '700',
                        color: 'var(--primary)'
                      }}>
                        {formatPrice(order.price)}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td style={{
                        padding: '14px 16px',
                        fontSize: '13px',
                        color: 'var(--text-muted)'
                      }}>
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filtered.length === 0 && (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: 'var(--text-muted)',
                  fontSize: '14px'
                }}>
                  No orders found
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

export default ManageOrders