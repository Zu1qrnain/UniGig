import { formatDate } from '../../utils/format.utils'
import useAuth from '../../hooks/useAuth'

const ChatBubble = ({ message }) => {
  const { user } = useAuth()
  const isMine = message.senderId === user.id || message.sender_id === user.id

  return (
    <div style={{
      display: 'flex',
      justifyContent: isMine ? 'flex-end' : 'flex-start',
      marginBottom: '12px'
    }}>
      <div style={{
        maxWidth: '70%',
        padding: '10px 14px',
        borderRadius: isMine
          ? '16px 16px 4px 16px'
          : '16px 16px 16px 4px',
        background: isMine ? 'var(--primary)' : 'var(--bg-secondary)',
        color: isMine ? 'white' : 'var(--text-primary)',
        border: isMine ? 'none' : '1px solid var(--border)'
      }}>
        <p style={{ fontSize: '14px', lineHeight: '1.5' }}>
          {message.content}
        </p>
        <p style={{
          fontSize: '11px',
          marginTop: '4px',
          opacity: 0.7,
          textAlign: 'right'
        }}>
          {formatDate(message.createdAt)}
        </p>
      </div>
    </div>
  )
}

export default ChatBubble