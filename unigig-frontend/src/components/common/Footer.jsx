import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--secondary)',
      color: 'white',
      padding: '48px 24px 24px'
    }}>
      <div className='container'>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          {/* Brand */}
          <div>
            <h3 style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontSize: '22px',
              marginBottom: '12px',
              color: 'white'
            }}>
              Uni<span style={{ color: 'var(--primary)' }}>Gig</span>
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.7' }}>
              A freelancing platform built for university students to connect, collaborate, and grow.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '14px', color: '#cbd5e1' }}>
              Platform
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Browse Gigs', path: '/gigs' },
                { label: 'Login', path: '/login' },
                { label: 'Register', path: '/register' }
              ].map(link => (
                <Link key={link.path} to={link.path} style={{
                  color: '#94a3b8',
                  fontSize: '14px',
                  transition: 'var(--transition)'
                }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ marginBottom: '16px', fontSize: '14px', color: '#cbd5e1' }}>
              Categories
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Web Development',
                'Graphic Design',
                'Content Writing',
                'Video Editing',
                'Mobile Development'
              ].map(cat => (
                <span key={cat} style={{ color: '#94a3b8', fontSize: '14px' }}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <p style={{ color: '#64748b', fontSize: '13px' }}>
            © 2024 UniGig. All rights reserved.
          </p>
          <p style={{ color: '#64748b', fontSize: '13px' }}>
            Built for university students 🎓
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer