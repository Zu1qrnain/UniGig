import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import Loader from '../../components/common/Loader'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getStatsAPI } from '../../api/admin.api'

const STAT_CONFIG = [
  { key: 'totalUsers',   label: 'Total Users',   icon: '👥', color: '#6366f1', bg: '#eef2ff', link: '/admin/users' },
  { key: 'totalGigs',    label: 'Total Gigs',    icon: '💼', color: '#10b981', bg: '#ecfdf5', link: '/admin/gigs' },
  { key: 'totalOrders',  label: 'Total Orders',  icon: '📦', color: '#f59e0b', bg: '#fffbeb', link: '/admin/orders' },
  { key: 'totalReports', label: 'Total Reports', icon: '🚨', color: '#ef4444', bg: '#fef2f2', link: '/admin/reports' }
]

const QUICK_LINKS = [
  { label: 'Manage Users',  desc: 'View, ban or remove users',  path: '/admin/users',   icon: '👥' },
  { label: 'Manage Gigs',   desc: 'Review and remove gigs',     path: '/admin/gigs',    icon: '💼' },
  { label: 'Manage Orders', desc: 'Monitor all orders',         path: '/admin/orders',  icon: '📦' },
  { label: 'View Reports',  desc: 'Handle platform reports',    path: '/admin/reports', icon: '🚨' }
]

const StatCard = ({ config, value }) => (
  <Link to={config.link} style={{ textDecoration: 'none' }}>
    <div className='card' style={{
      padding: '24px',
      transition: 'transform 0.15s, box-shadow 0.15s',
      cursor: 'pointer'
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '10px',
          background: config.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px'
        }}>
          {config.icon}
        </div>
        <span style={{ fontSize: '11px', color: config.color, fontWeight: '600', letterSpacing: '0.3px' }}>
          VIEW →
        </span>
      </div>
      <p style={{ fontSize: '32px', fontWeight: '800', color: config.color, marginBottom: '4px', lineHeight: 1 }}>
        {value?.toLocaleString() ?? '—'}
      </p>
      <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '500' }}>
        {config.label}
      </p>
    </div>
  </Link>
)

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getStatsAPI()
        if (res.success) setStats(res.data)
        else setError(res.message)
      } catch {
        setError('Failed to fetch stats')
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  return (
    <AdminLayout title='Admin Dashboard' subtitle='Platform overview — UniGig'>
      {loading && <Loader />}
      <ErrorMessage message={error} />

      {!loading && stats && (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '16px',
            marginBottom: '40px'
          }}>
            {STAT_CONFIG.map(cfg => (
              <StatCard key={cfg.key} config={cfg} value={stats[cfg.key]} />
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-h)' }}>Quick Actions</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '14px'
            }}>
              {QUICK_LINKS.map(link => (
                <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
                  <div className='card' style={{
                    padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px',
                    transition: 'transform 0.15s'
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  >
                    <span style={{ fontSize: '24px' }}>{link.icon}</span>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>{link.label}</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{link.desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  )
}

export default AdminDashboard
