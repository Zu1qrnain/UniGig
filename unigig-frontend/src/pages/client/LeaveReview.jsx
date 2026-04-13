import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import StarRating from '../../components/reviews/StarRating'
import ErrorMessage from '../../components/common/ErrorMessage'
import { submitReviewAPI } from '../../api/review.api'

const LeaveReview = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return setError('Please select a rating')
    setLoading(true)
    setError('')
    try {
      const res = await submitReviewAPI({
        order_id: orderId,
        rating,
        comment
      })
      if (res.success) {
        setSuccess(true)
        setTimeout(() => navigate('/client/orders'), 2000)
      } else {
        setError(res.message)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />

      <div style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)'
      }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>
          <div className='card' style={{ padding: '40px' }}>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>⭐</div>
              <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>
                Leave a Review
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Order #{orderId} — Share your experience
              </p>
            </div>

            {success ? (
              <div style={{
                padding: '20px',
                background: '#f0fdf4',
                border: '1px solid #86efac',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--success)',
                textAlign: 'center',
                fontSize: '15px',
                fontWeight: '500'
              }}>
                ✅ Review submitted! Redirecting...
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                <ErrorMessage message={error} />

                {/* Star Rating */}
                <div className='form-group' style={{ alignItems: 'center' }}>
                  <label style={{ marginBottom: '12px' }}>
                    Your Rating
                  </label>
                  <StarRating
                    rating={rating}
                    interactive={true}
                    onRate={setRating}
                    size={36}
                  />
                  {rating > 0 && (
                    <p style={{
                      marginTop: '8px',
                      fontSize: '13px',
                      color: 'var(--text-muted)'
                    }}>
                      {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                    </p>
                  )}
                </div>

                {/* Comment */}
                <div className='form-group'>
                  <label>Your Review (Optional)</label>
                  <textarea
                    className='input'
                    placeholder='Share your experience working with this freelancer...'
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className='btn btn-primary'
                  style={{ width: '100%', padding: '12px', fontSize: '15px' }}
                  disabled={loading || rating === 0}
                >
                  {loading ? 'Submitting...' : 'Submit Review →'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LeaveReview