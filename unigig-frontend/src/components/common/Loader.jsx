const Loader = ({ fullPage = false }) => {
    if (fullPage) {
      return (
        <div className='page-loader'>
          <div className='spinner'></div>
        </div>
      )
    }
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <div className='spinner'></div>
      </div>
    )
  }
  
  export default Loader