import { NavLink, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const NAV_ITEMS = [
  { label: 'Dashboard',     path: '/admin/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'Manage Users',  path: '/admin/users',     icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { label: 'Manage Gigs',   path: '/admin/gigs',      icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { label: 'Manage Orders', path: '/admin/orders',    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
]

const SVGIcon = ({ d }) => (
  <svg width='18' height='18' viewBox='0 0 24 24' fill='none'
    stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d={d} />
  </svg>
)

const AdminLayout = ({ children, title, subtitle }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout(navigate)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>

      {/* Sidebar */}
      <aside style={{
        width: '240px',
        background: '#0f172a',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        overflowY: 'auto',
        zIndex: 100
      }}>
        {/* Brand */}
        <div style={{
          padding: '24px 20px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.07)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'var(--primary)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <svg width='16' height='16' viewBox='0 0 24 24' fill='white'>
                <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' stroke='white' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' fill='none' />
              </svg>
            </div>
            <div>
              <p style={{ color: '#f1f5f9', fontWeight: '700', fontSize: '15px', lineHeight: 1 }}>UniGig</p>
              <p style={{ color: '#64748b', fontSize: '11px', marginTop: '3px' }}>Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px' }}>
          {NAV_ITEMS.map(item => (
            <NavLink key={item.path} to={item.path} style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: '8px',
              marginBottom: '2px',
              fontSize: '13.5px',
              fontWeight: isActive ? '600' : '400',
              color: isActive ? '#fff' : '#94a3b8',
              background: isActive ? 'rgba(37,99,235,0.85)' : 'transparent',
              textDecoration: 'none',
              transition: 'background 0.15s, color 0.15s',
            })}
              onMouseEnter={e => {
                if (!e.currentTarget.style.background.includes('235')) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                  e.currentTarget.style.color = '#e2e8f0'
                }
              }}
              onMouseLeave={e => {
                if (!e.currentTarget.style.background.includes('235')) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = '#94a3b8'
                }
              }}
            >
              <SVGIcon d={item.icon} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '12px 10px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            width: '100%', padding: '10px 12px', borderRadius: '8px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: '#64748b', fontSize: '13.5px', fontWeight: '400',
            transition: 'background 0.15s, color 0.15s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#f87171' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b' }}
          >
            <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9' />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content — offset by sidebar width */}
      <div style={{ marginLeft: '240px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        {(title || subtitle) && (
          <div style={{
            padding: '28px 36px 0',
            marginBottom: '28px'
          }}>
            {title && <h1 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-h)', marginBottom: '4px' }}>{title}</h1>}
            {subtitle && <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{subtitle}</p>}
          </div>
        )}

        <div style={{ flex: 1, padding: title ? '0 36px 36px' : '36px' }}>
          {children}
        </div>
      </div>

    </div>
  )
}

export default AdminLayout
