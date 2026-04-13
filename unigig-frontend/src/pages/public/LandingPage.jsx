import { Link } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'

const CATEGORIES = [
  { icon: '💻', label: 'Web Development' },
  { icon: '🎨', label: 'Graphic Design' },
  { icon: '✍️', label: 'Content Writing' },
  { icon: '🎬', label: 'Video Editing' },
  { icon: '📱', label: 'Mobile Development' },
  { icon: '📊', label: 'Data Entry' }
]

const STEPS = [
  { step: '01', title: 'Post a Gig', desc: 'Freelancers create service listings with price and delivery time.' },
  { step: '02', title: 'Place an Order', desc: 'Clients browse gigs and place orders with their requirements.' },
  { step: '03', title: 'Collaborate', desc: 'Chat in real-time and deliver the work within the deadline.' },
  { step: '04', title: 'Review & Rate', desc: 'Clients leave reviews to build freelancer reputation.' }
]

const STATS = [
  { value: '500+', label: 'Students' },
  { value: '1,200+', label: 'Gigs Posted' },
  { value: '3,400+', label: 'Orders Completed' },
  { value: '4.8★', label: 'Avg Rating' }
]

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f0fdf4 100%)',
        padding: '100px 24px',
        textAlign: 'center'
      }}>
        <div className='container'>
          <div className='fade-in'>
            <span className='badge' style={{
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              marginBottom: '20px',
              fontSize: '13px'
            }}>
              🎓 Built for University Students
            </span>

            <h1 style={{
              fontSize: 'clamp(36px, 6vw, 64px)',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '24px',
              color: 'var(--secondary)'
            }}>
              Find Student Talent.<br />
              <span style={{ color: 'var(--primary)' }}>Get Your Work Done.</span>
            </h1>

            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              maxWidth: '560px',
              margin: '0 auto 40px',
              lineHeight: '1.7'
            }}>
              UniGig connects students with skills to students with needs.
              Post gigs, place orders, and grow together.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to='/gigs' className='btn btn-primary' style={{ padding: '14px 28px', fontSize: '15px' }}>
                Browse Gigs →
              </Link>
              <Link to='/register' className='btn btn-outline' style={{ padding: '14px 28px', fontSize: '15px' }}>
                Start Freelancing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        background: 'var(--secondary)',
        padding: '48px 24px'
      }}>
        <div className='container'>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '24px',
            textAlign: 'center'
          }}>
            {STATS.map(stat => (
              <div key={stat.label}>
                <p style={{ fontSize: '32px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: '14px', color: '#94a3b8' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div className='container'>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '12px' }}>
              Browse by Category
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Find the right service for your project
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px'
          }}>
            {CATEGORIES.map(cat => (
              <Link
                key={cat.label}
                to={`/gigs?category=${cat.label.toLowerCase().replace(' ', '_')}`}
                className='card'
                style={{
                  padding: '28px 20px',
                  textAlign: 'center',
                  textDecoration: 'none'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>{cat.icon}</div>
                <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-primary)' }}>
                  {cat.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '80px 24px', background: 'var(--bg-secondary)' }}>
        <div className='container'>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '36px', marginBottom: '12px' }}>
              How It Works
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
              Simple steps to get started
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px'
          }}>
            {STEPS.map(step => (
              <div key={step.step} className='card' style={{ padding: '28px' }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '700',
                  color: 'var(--primary)',
                  marginBottom: '12px',
                  letterSpacing: '1px'
                }}>
                  STEP {step.step}
                </div>
                <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '80px 24px',
        background: 'var(--primary)',
        textAlign: 'center'
      }}>
        <div className='container'>
          <h2 style={{ fontSize: '36px', color: 'white', marginBottom: '16px' }}>
            Ready to Get Started?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '32px' }}>
            Join hundreds of students already using UniGig
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to='/register' className='btn' style={{
              background: 'white',
              color: 'var(--primary)',
              padding: '14px 28px',
              fontSize: '15px',
              fontWeight: '600'
            }}>
              Create Account →
            </Link>
            <Link to='/gigs' className='btn' style={{
              background: 'transparent',
              color: 'white',
              border: '2px solid rgba(255,255,255,0.5)',
              padding: '14px 28px',
              fontSize: '15px'
            }}>
              Browse Gigs
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default LandingPage