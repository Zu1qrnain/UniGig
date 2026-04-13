import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import Loader from '../../components/common/Loader'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getStatsAPI } from '../../api/admin.api'

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

  const STAT_CARDS = stats ? [
    { label: 'Total Users', value: stats.totalUsers, color: 'var(--primary)', icon: '👥', link: '/admin/users' },
    { label: 'Total Gigs', value: stats.totalGigs, color: '#10b981', icon: '💼', link: '/admin/gigs' },
    { label: 'Total Orders', value: stats.totalOrders, color: '#f59e0b', icon: '📦', link: '/admin/orders' },
    { label: 'Total Reports', value: stats.totalReports, color: '#ef4444', icon: '🚨', link: '/admin/orders' }
  ] : []

  const QUICK_LINKS = [
    { label: 'Manage Users', desc: 'View, ban or remove users', path: '/admin/users', icon: '👥' },
    { label: 'Manage Gigs', desc: 'Review and remove gigs', path: '/admin/gigs', icon: '💼' },
    { label: 'Manage Orders', desc: 'Monitor all orders', path: '/admin/orders', icon: '📦' }
  ]

  return (
    <div>
      <Navbar />

      <div className='container' style={{ padding: '48px 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>
            Admin Dashboard
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Overview of the UniGig platform
          </p>
        </div>

        {loading && <Loader />}
        <ErrorMessage message={error} />

        {/* Stats */}
        {!loading && stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '40px'
          }}>
            {STAT_CARDS.map(stat => (
              <Link key={stat.label} to={stat.link} style={{ textDecoration: 'none' }}>
                <div className='card' style={{ padding: '24px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '28px' }}>{stat.icon}</span>
                    <span style={{
                      fontSize: '11px',
                      color: 'var(--primary)',
                      fontWeight: '500'
                    }}>
                      View →
                    </span>
                  </div>
                  <p style={{
                    fontSize: '36px',
                    fontWeight: '800',
                    color: stat.color,
                    marginBottom: '4px'
                  }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    {stat.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Quick Links */}
        <h2 style={{ fontSize: '20px', marginBottom: '20px' }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}>
          {QUICK_LINKS.map(link => (
            <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
              <div className='card' style={{ padding: '24px' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>
                  {link.icon}
                </div>
                <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>
                  {link.label}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {link.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default AdminDashboard