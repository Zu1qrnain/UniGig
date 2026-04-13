import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import ErrorMessage from '../../components/common/ErrorMessage'
import Loader from '../../components/common/Loader'
import { createGigAPI, updateGigAPI, getGigByIdAPI } from '../../api/gig.api'

const CATEGORIES = [
  { value: 'web_development', label: 'Web Development' },
  { value: 'graphic_design', label: 'Graphic Design' },
  { value: 'content_writing', label: 'Content Writing' },
  { value: 'video_editing', label: 'Video Editing' },
  { value: 'mobile_development', label: 'Mobile Development' },
  { value: 'data_entry', label: 'Data Entry' },
  { value: 'other', label: 'Other' }
]

const CreateEditGig = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = !!id

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'web_development',
    price: '',
    delivery_days: ''
  })
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isEdit) return
    const fetchGig = async () => {
      try {
        const res = await getGigByIdAPI(id)
        if (res.success) {
          const { title, description, category, price, delivery_days } = res.data
          setForm({ title, description, category, price, delivery_days })
        }
      } catch {
        setError('Failed to load gig')
      } finally {
        setFetching(false)
      }
    }
    fetchGig()
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.title || !form.description || !form.price || !form.delivery_days) {
      return setError('All fields are required')
    }

    setLoading(true)
    try {
      const res = isEdit
        ? await updateGigAPI(id, form)
        : await createGigAPI(form)

      if (res.success) {
        navigate('/freelancer/gigs')
      } else {
        setError(res.message)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) return <><Navbar /><Loader fullPage /></>

  return (
    <div>
      <Navbar />

      <div style={{
        minHeight: '80vh',
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
        padding: '48px 24px',
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{ width: '100%', maxWidth: '600px' }}>

          {/* Header */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>
              {isEdit ? '✏️ Edit Gig' : '🚀 Create New Gig'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              {isEdit
                ? 'Update your service listing'
                : 'Fill in the details to post your service'}
            </p>
          </div>

          <div className='card' style={{ padding: '32px' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                <ErrorMessage message={error} />

                {/* Title */}
                <div className='form-group'>
                  <label>Gig Title</label>
                  <input
                    type='text'
                    name='title'
                    className='input'
                    placeholder='I will build a professional React website...'
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Category */}
                <div className='form-group'>
                  <label>Category</label>
                  <select
                    name='category'
                    className='input'
                    value={form.category}
                    onChange={handleChange}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className='form-group'>
                  <label>Description</label>
                  <textarea
                    name='description'
                    className='input'
                    placeholder='Describe your service in detail...'
                    rows={5}
                    value={form.description}
                    onChange={handleChange}
                    style={{ resize: 'vertical' }}
                    required
                  />
                </div>

                {/* Price + Delivery */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className='form-group'>
                    <label>Price ($)</label>
                    <input
                      type='number'
                      name='price'
                      className='input'
                      placeholder='25'
                      min='1'
                      value={form.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label>Delivery (days)</label>
                    <input
                      type='number'
                      name='delivery_days'
                      className='input'
                      placeholder='3'
                      min='1'
                      value={form.delivery_days}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{ width: '100%', padding: '12px', fontSize: '15px' }}
                  disabled={loading}
                >
                  {loading
                    ? (isEdit ? 'Updating...' : 'Creating...')
                    : (isEdit ? 'Update Gig →' : 'Create Gig →')
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default CreateEditGig