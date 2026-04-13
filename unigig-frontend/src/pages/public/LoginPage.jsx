import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import ErrorMessage from '../../components/common/ErrorMessage'

const LoginPage = () => {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const res = await login(form, navigate)
    if (!res.success) setError(res.message)
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
      padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to='/' style={{
            fontFamily: 'Bricolage Grotesque, sans-serif',
            fontSize: '28px',
            fontWeight: '800',
            color: 'var(--primary)'
          }}>
            Uni<span style={{ color: 'var(--secondary)' }}>Gig</span>
          </Link>
          <p style={{
            marginTop: '8px',
            color: 'var(--text-secondary)',
            fontSize: '15px'
          }}>
            Welcome back! Login to continue
          </p>
        </div>

        {/* Card */}
        <div className='card' style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <ErrorMessage message={error} />

              <div className='form-group'>
                <label>Email Address</label>
                <input
                  type='email'
                  name='email'
                  className='input'
                  placeholder='you@university.edu'
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
                {loading ? 'Logging in...' : 'Login →'}
              </button>
            </div>
          </form>
        </div>

        {/* Register Link */}
        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '14px',
          color: 'var(--text-secondary)'
        }}>
          Don't have an account?{' '}
          <Link to='/register' style={{ color: 'var(--primary)', fontWeight: '600' }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage