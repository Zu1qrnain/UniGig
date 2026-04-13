import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Loader from '../../components/common/Loader'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getMyGigsAPI, deleteGigAPI } from '../../api/gig.api'
import { formatPrice, formatDelivery, formatCategory } from '../../utils/format.utils'

const MyGigs = () => {
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await getMyGigsAPI()
        if (res.success) setGigs(res.data)
        else setError(res.message)
      } catch {
        setError('Failed to fetch gigs')
      } finally {
        setLoading(false)
      }
    }
    fetchGigs()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gig?')) return
    try {
      const res = await deleteGigAPI(id)
      if (res.success) {
        setGigs(gigs.filter(g => g.id !== id))
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete gig')
    }
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
            <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>My Gigs</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Manage your service listings
            </p>
          </div>
          <Link to='/freelancer/gigs/create' className='btn btn-primary'>
            + Create New Gig
          </Link>
        </div>

        {loading && <Loader />}
        <ErrorMessage message={error} />

        {!loading && gigs.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '80px 24px',
            color: 'var(--text-muted)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>No gigs yet</h3>
            <p style={{ fontSize: '14px', marginBottom: '24px' }}>
              Create your first gig to start getting orders
            </p>
            <Link to='/freelancer/gigs/create' className='btn btn-primary'>
              Create First Gig
            </Link>
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {!loading && gigs.map(gig => (
            <div key={gig.id} className='card' style={{ padding: '20px' }}>

              {/* Status + Category */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span className='badge' style={{
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  fontSize: '11px'
                }}>
                  {formatCategory(gig.category)}
                </span>
                <span className='badge' style={{
                  background: gig.is_active ? '#f0fdf4' : '#fef2f2',
                  color: gig.is_active ? '#10b981' : '#ef4444',
                  fontSize: '11px'
                }}>
                  {gig.is_active ? '● Active' : '● Inactive'}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '15px',
                fontWeight: '600',
                marginBottom: '8px',
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {gig.title}
              </h3>

              {/* Price + Delivery */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <span style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: 'var(--primary)'
                }}>
                  {formatPrice(gig.price)}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  🕐 {formatDelivery(gig.delivery_days)}
                </span>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '8px',
                borderTop: '1px solid var(--border)',
                paddingTop: '16px'
              }}>
                <Link
                  to={`/freelancer/gigs/edit/${gig.id}`}
                  className='btn btn-outline'
                  style={{ flex: 1, fontSize: '13px', padding: '8px' }}
                >
                  ✏️ Edit
                </Link>
                <Link
                  to={`/gigs/${gig.id}`}
                  className='btn btn-outline'
                  style={{ flex: 1, fontSize: '13px', padding: '8px' }}
                >
                  👁️ View
                </Link>
                <button
                  onClick={() => handleDelete(gig.id)}
                  className='btn btn-danger'
                  style={{ flex: 1, fontSize: '13px', padding: '8px' }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default MyGigs