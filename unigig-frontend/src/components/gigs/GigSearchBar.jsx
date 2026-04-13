import { useState } from 'react'

const GigSearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: '8px',
      width: '100%',
      maxWidth: '560px'
    }}>
      <input
        type='text'
        className='input'
        placeholder='Search for any skill or service...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ flex: 1 }}
      />
      <button type='submit' className='btn btn-primary'>
        Search
      </button>
    </form>
  )
}

export default GigSearchBar