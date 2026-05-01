import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import ErrorMessage from '../../components/common/ErrorMessage'
import { ROLES } from '../../constants/roles'

const AdminLogin = () => {
  const { login, logout, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    // Pass a no-op navigate so we can gate on role before redirecting
    const res = await login(form, () => {})
    if (!res.success) {
      setError(res.message)
      return
    }
    if (res.data?.user?.role !== ROLES.ADMIN) {
      logout(() => {})
      setError('Access denied. This portal is for admins only.')
      return
    }
    navigate('/admin/dashboard')
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
      padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to='/' style={{
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontSize: '28px',
            fontWeight: '800',
            color: '#fff'
          }}>
            Uni<span style={{ color: '#a5b4fc' }}>Gig</span>
          </Link>
          <p style={{
            marginTop: '8px',
            color: '#c7d2fe',
            fontSize: '15px'
          }}>
            Admin Portal — Restricted Access
          </p>
        </div>

        {/* Card */}
        <div className='card' style={{ padding: '32px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <span style={{
              display: 'inline-block',
              background: '#ede9fe',
              color: '#4f46e5',
              borderRadius: '8px',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: '700',
              letterSpacing: '0.05em'
            }}>
              ADMIN LOGIN
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <ErrorMessage message={error} />

              <div className='form-group'>
                <label>Admin Email</label>
                <input
                  type='email'
                  name='email'
                  className='input'
                  placeholder='admin@unigig.com'
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  name='password'
                  className='input'
                  placeholder='Enter your password'
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type='submit'
                className='btn btn-primary'
                style={{ width: '100%', padding: '12px', fontSize: '15px' }}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Admin Login →'}
              </button>
            </div>
          </form>
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '13px',
          color: '#c7d2fe'
        }}>
          Not an admin?{' '}
          <Link to='/login' style={{ color: '#fff', fontWeight: '600' }}>
            Go to regular login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
