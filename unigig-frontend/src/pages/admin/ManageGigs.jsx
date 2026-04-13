import { useEffect, useState } from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Loader from '../../components/common/Loader'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getAdminGigsAPI, deleteAdminGigAPI } from '../../api/admin.api'
import { formatPrice, formatDelivery, formatCategory, formatDate } from '../../utils/format.utils'

const ManageGigs = () => {
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await getAdminGigsAPI()
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
      const res = await deleteAdminGigAPI(id)
      if (res.success) setGigs(gigs.filter(g => g.id !== id))
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete gig')
    }
  }

  const filtered = gigs.filter(g => {
    const matchSearch = g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.freelancer?.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = filter ? g.category === filter : true
    return matchSearch && matchCategory
  })

  return (
    <div>
      <Navbar />

      <div className='container' style={{ padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>Manage Gigs</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            {gigs.length} total gigs on the platform
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
            placeholder='Search by title or freelancer...'
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
            <option value=''>All Categories</option>
            <option value='web_development'>Web Development</option>
            <option value='graphic_design'>Graphic Design</option>
            <option value='content_writing'>Content Writing</option>
            <option value='video_editing'>Video Editing</option>
            <option value='mobile_development'>Mobile Development</option>
            <option value='data_entry'>Data Entry</option>
            <option value='other'>Other</option>
          </select>
        </div>

        {loading && <Loader />}
        <ErrorMessage message={error} />

        {/* Grid */}
        {!loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {filtered.map(gig => (
              <div key={gig.id} className='card' style={{ padding: '20px' }}>

                {/* Category + Status */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
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

                {/* Freelancer */}
                <p style={{
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                  marginBottom: '12px'
                }}>
                  👤 {gig.freelancer?.name} • {gig.freelancer?.email}
                </p>

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

                {/* Date + Delete */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid var(--border)',
                  paddingTop: '16px'
                }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    {formatDate(gig.createdAt)}
                  </span>
                  <button
                    onClick={() => handleDelete(gig.id)}
                    className='btn btn-danger'
                    style={{ fontSize: '12px', padding: '6px 14px' }}
                  >
                    🗑️ Remove
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '60px',
                color: 'var(--text-muted)'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
                <p>No gigs found</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default ManageGigs