import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { getDashboardPath } from '../../utils/role.utils'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid var(--border)',
      padding: '0 24px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      {/* Logo */}
      <Link to='/' style={{
        fontFamily: 'Bricolage Grotesque, sans-serif',
        fontSize: '22px',
        fontWeight: '700',
        color: 'var(--primary)'
      }}>
        Uni<span style={{ color: 'var(--secondary)' }}>Gig</span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link to='/gigs' style={{
          padding: '8px 16px',
          borderRadius: 'var(--radius-sm)',
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--text-secondary)',
          transition: 'var(--transition)'
        }}>
          Browse Gigs
        </Link>

        {user ? (
          <>
            <Link
              to={getDashboardPath(user.role)}
              className='btn btn-outline'
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              Dashboard
            </Link>
            <button
              onClick={() => logout(navigate)}
              className='btn btn-primary'
              style={{ padding: '8px 16px', fontSize: '14px' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/login' className='btn btn-outline'
              style={{ padding: '8px 16px', fontSize: '14px' }}>
              Login
            </Link>
            <Link to='/register' className='btn btn-primary'
              style={{ padding: '8px 16px', fontSize: '14px' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar