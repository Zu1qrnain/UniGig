import { useState, useEffect } from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import GigCard from '../../components/gigs/GigCard'
import GigSearchBar from '../../components/gigs/GigSearchBar'
import GigFilters from '../../components/gigs/GigFilters'
import Loader from '../../components/common/Loader'
import ErrorMessage from '../../components/common/ErrorMessage'
import { getAllGigsAPI } from '../../api/gig.api'

const GigListingPage = () => {
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    min_price: '',
    max_price: '',
    sort: ''
  })

  const fetchGigs = async (params, page = 1) => {
    setLoading(true)
    setError('')
    try {
      const res = await getAllGigsAPI({ ...params, page, limit: 12 })
      if (res.success) {
        setGigs(res.data.gigs)
        setTotalPages(res.data.totalPages)
        setCurrentPage(res.data.currentPage)
      } else {
        setError(res.message)
      }
    } catch (err) {
      setError('Failed to fetch gigs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGigs(filters, 1)
  }, [filters])

  const handleSearch = (query) => {
    setFilters({ ...filters, search: query })
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div>
      <Navbar />

      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
        padding: '48px 24px'
      }}>
        <div className='container'>
          <h1 style={{ fontSize: '36px', marginBottom: '8px' }}>
            Browse Gigs
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '16px',
            marginBottom: '24px'
          }}>
            Find the perfect service for your project
          </p>
          <GigSearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Filters + Results */}
      <section style={{ padding: '40px 24px' }}>
        <div className='container'>

          {/* Filters */}
          <div style={{ marginBottom: '24px' }}>
            <GigFilters filters={filters} onFilterChange={handleFilterChange} />
          </div>

          {/* Results Count */}
          {!loading && (
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px' }}>
              {gigs.length} gig{gigs.length !== 1 ? 's' : ''} found
            </p>
          )}

          {/* Error */}
          <ErrorMessage message={error} />

          {/* Loader */}
          {loading && <Loader />}

          {/* Gigs Grid */}
          {!loading && !error && gigs.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {gigs.map(gig => (
                <GigCard key={gig.id} gig={gig} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '40px' }}>
              <button
                className='btn btn-primary'
                onClick={() => fetchGigs(filters, currentPage - 1)}
                disabled={currentPage === 1}
              >
                ← Prev
              </button>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className='btn btn-primary'
                onClick={() => fetchGigs(filters, currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && gigs.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '80px 24px',
              color: 'var(--text-muted)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>
                No gigs found
              </h3>
              <p style={{ fontSize: '14px' }}>
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default GigListingPage