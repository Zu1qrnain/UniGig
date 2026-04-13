import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Loader from '../../components/common/Loader'
import ErrorMessage from '../../components/common/ErrorMessage'
import StarRating from '../../components/reviews/StarRating'
import { getGigByIdAPI } from '../../api/gig.api'
import { placeOrderAPI } from '../../api/order.api'
import { formatPrice, formatDelivery, formatCategory, formatDate } from '../../utils/format.utils'
import useAuth from '../../hooks/useAuth'
import { ROLES } from '../../constants/roles'

const GigDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [gig, setGig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [requirements, setRequirements] = useState('')
  const [ordering, setOrdering] = useState(false)
  const [orderError, setOrderError] = useState('')
  const [orderSuccess, setOrderSuccess] = useState(false)

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await getGigByIdAPI(id)
        if (res.success) setGig(res.data)
        else setError(res.message)
      } catch {
        setError('Failed to fetch gig')
      } finally {
        setLoading(false)
      }
    }
    fetchGig()
  }, [id])

  const handleOrder = async () => {
    if (!user) return navigate('/login')
    if (!requirements.trim()) return setOrderError('Please describe your requirements')

    setOrdering(true)
    setOrderError('')
    try {
      const res = await placeOrderAPI({ gig_id: id, requirements })
      if (res.success) {
        setOrderSuccess(true)
        setTimeout(() => navigate('/client/orders'), 2000)
      } else {
        setOrderError(res.message)
      }
    } catch (err) {
      setOrderError(err.response?.data?.message || 'Failed to place order')
    } finally {
      setOrdering(false)
    }
  }

  if (loading) return <><Navbar /><Loader fullPage /></>
  if (error) return <><Navbar /><div className='container' style={{ padding: '40px 24px' }}><ErrorMessage message={error} /></div></>

  return (
    <div>
      <Navbar />

      <div className='container' style={{ padding: '48px 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 340px',
          gap: '40px',
          alignItems: 'start'
        }}>

          {/* Left — Gig Info */}
          <div>
            {/* Category */}
            <span className='badge' style={{
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              marginBottom: '16px'
            }}>
              {formatCategory(gig.category)}
            </span>

            {/* Title */}
            <h1 style={{ fontSize: '28px', marginBottom: '20px', lineHeight: '1.3' }}>
              {gig.title}
            </h1>

            {/* Freelancer Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px',
              background: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '28px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: '700'
              }}>
                {gig.freelancer?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ fontWeight: '600', marginBottom: '4px' }}>
                  {gig.freelancer?.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <StarRating rating={gig.freelancer?.avg_rating || 0} size={14} />
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    ({gig.freelancer?.avg_rating || '0.0'})
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>About This Gig</h2>
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.8',
                fontSize: '15px'
              }}>
                {gig.description}
              </p>
            </div>

            {/* Freelancer Bio */}
            {gig.freelancer?.bio && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>About the Freelancer</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '15px' }}>
                  {gig.freelancer.bio}
                </p>
              </div>
            )}

            {/* Skills */}
            {gig.freelancer?.skills && (
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '12px' }}>Skills</h2>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {gig.freelancer.skills.split(',').map(skill => (
                    <span key={skill} className='badge' style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)'
                    }}>
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {gig.reviews?.length > 0 && (
              <div>
                <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>
                  Reviews ({gig.reviews.length})
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {gig.reviews.map(review => (
                    <div key={review.id} className='card' style={{ padding: '20px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                      }}>
                        <span style={{ fontWeight: '600', fontSize: '14px' }}>
                          {review.client?.name}
                        </span>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <StarRating rating={review.rating} size={14} />
                      {review.comment && (
                        <p style={{
                          marginTop: '8px',
                          fontSize: '14px',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.6'
                        }}>
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — Order Card */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div className='card' style={{ padding: '24px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary)' }}>
                  {formatPrice(gig.price)}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  🕐 {formatDelivery(gig.delivery_days)}
                </span>
              </div>

              {orderSuccess ? (
                <div style={{
                  padding: '16px',
                  background: '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--success)',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  ✅ Order placed! Redirecting...
                </div>
              ) : user?.role === ROLES.CLIENT ? (
                <>
                  <div className='form-group' style={{ marginBottom: '16px' }}>
                    <label>Your Requirements</label>
                    <textarea
                      className='input'
                      placeholder='Describe what you need...'
                      rows={4}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                  <ErrorMessage message={orderError} />
                  <button
                    onClick={handleOrder}
                    className='btn btn-primary'
                    style={{ width: '100%', padding: '12px', fontSize: '15px', marginTop: '12px' }}
                    disabled={ordering}
                  >
                    {ordering ? 'Placing Order...' : 'Place Order →'}
                  </button>
                </>
              ) : !user ? (
                <Link to='/login' className='btn btn-primary' style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '15px',
                  display: 'block',
                  textAlign: 'center'
                }}>
                  Login to Order
                </Link>
              ) : (
                <p style={{
                  textAlign: 'center',
                  color: 'var(--text-muted)',
                  fontSize: '14px'
                }}>
                  Only clients can place orders
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default GigDetailPage