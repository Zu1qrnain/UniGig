const ErrorMessage = ({ message }) => {
    if (!message) return null
  
    return (
      <div style={{
        padding: '12px 16px',
        borderRadius: 'var(--radius-sm)',
        background: '#fef2f2',
        border: '1px solid #fecaca',
        color: 'var(--error)',
        fontSize: '14px',
        fontWeight: '500'
      }}>
        ⚠️ {message}
      </div>
    )
  }
  
  export default ErrorMessage