import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import ErrorMessage from '../../components/common/ErrorMessage'
import { ROLES } from '../../constants/roles'

const RegisterPage = () => {
  const { register, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: ROLES.CLIENT
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const res = await register(form, navigate)
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
            Create your account to get started
          </p>
        </div>

        {/* Card */}
        <div className='card' style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

              <ErrorMessage message={error} />

              <div className='form-group'>
                <label>Full Name</label>
                <input
                  type='text'
                  name='name'
                  className='input'
                  placeholder='Ali Hassan'
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

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
                  placeholder='Min 6 characters'
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Role Selector */}
              <div className='form-group'>
                <label>I want to join as</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { value: ROLES.CLIENT, label: '🛒 Client', desc: 'Hire talent' },
                    { value: ROLES.FREELANCER, label: '💼 Freelancer', desc: 'Offer services' }
                  ].map(role => (
                    <div
                      key={role.value}
                      onClick={() => setForm({ ...form, role: role.value })}
                      style={{
                        flex: 1,
                        padding: '14px',
                        borderRadius: 'var(--radius-sm)',
                        border: `2px solid ${form.role === role.value ? 'var(--primary)' : 'var(--border)'}`,
                        background: form.role === role.value ? 'var(--primary-light)' : 'var(--bg)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'var(--transition)'
                      }}
                    >
                      <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                        {role.label}
                      </p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                        {role.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type='submit'
                className='btn btn-primary'
                style={{ width: '100%', padding: '12px', fontSize: '15px' }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account →'}
              </button>
            </div>
          </form>
        </div>

        {/* Login Link */}
        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '14px',
          color: 'var(--text-secondary)'
        }}>
          Already have an account?{' '}
          <Link to='/login' style={{ color: 'var(--primary)', fontWeight: '600' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage