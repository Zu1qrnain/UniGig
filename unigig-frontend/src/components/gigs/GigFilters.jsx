const CATEGORIES = [
    { value: '', label: 'All Categories' },
    { value: 'web_development', label: 'Web Development' },
    { value: 'graphic_design', label: 'Graphic Design' },
    { value: 'content_writing', label: 'Content Writing' },
    { value: 'video_editing', label: 'Video Editing' },
    { value: 'mobile_development', label: 'Mobile Development' },
    { value: 'data_entry', label: 'Data Entry' },
    { value: 'other', label: 'Other' }
  ]
  
  const SORT_OPTIONS = [
    { value: '', label: 'Latest' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' }
  ]
  
  const GigFilters = ({ filters, onFilterChange }) => {
    const handleChange = (key, value) => {
      onFilterChange({ ...filters, [key]: value })
    }
  
    return (
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Category */}
        <select
          className='input'
          style={{ width: 'auto', minWidth: '180px' }}
          value={filters.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
        >
          {CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
  
        {/* Min Price */}
        <input
          type='number'
          className='input'
          placeholder='Min Price'
          style={{ width: '120px' }}
          value={filters.min_price || ''}
          onChange={(e) => handleChange('min_price', e.target.value)}
        />
  
        {/* Max Price */}
        <input
          type='number'
          className='input'
          placeholder='Max Price'
          style={{ width: '120px' }}
          value={filters.max_price || ''}
          onChange={(e) => handleChange('max_price', e.target.value)}
        />
  
        {/* Sort */}
        <select
          className='input'
          style={{ width: 'auto', minWidth: '180px' }}
          value={filters.sort || ''}
          onChange={(e) => handleChange('sort', e.target.value)}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  export default GigFilters