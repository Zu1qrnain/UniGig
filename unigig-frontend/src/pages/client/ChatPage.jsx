import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/common/Navbar'
import ChatBubble from '../../components/chat/ChatBubble'
import Loader from '../../components/common/Loader'
import { getChatHistoryAPI } from '../../api/chat.api'
import { getOrderByIdAPI } from '../../api/order.api'
import useAuth from '../../hooks/useAuth'
import useSocket from '../../hooks/useSocket'

const ChatPage = () => {
  const { orderId } = useParams()
  const { user } = useAuth()
  const { socket, connected } = useSocket()
  const [messages, setMessages] = useState([])
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, chatRes] = await Promise.all([
          getOrderByIdAPI(orderId),
          getChatHistoryAPI(orderId)
        ])
        if (orderRes.success) setOrder(orderRes.data)
        if (chatRes.success) setMessages(chatRes.data || [])
      } catch {
        console.error('Failed to load chat')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [orderId])

  useEffect(() => {
    if (!socket) return
    socket.emit('join_room', orderId)

    socket.on('receive_message', (msg) => {
      setMessages(prev => [...prev, msg])
    })

    socket.on('message_sent', (msg) => {
      setMessages(prev => [...prev, msg])
    })

    return () => {
      socket.off('receive_message')
      socket.off('message_sent')
    }
  }, [socket, orderId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || !socket || !connected) return

    socket.emit('send_message', {
      orderId,
      senderId: user.id,
      content: input.trim()
    })

    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />

      {/* Chat Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: '600' }}>
            {order?.gig?.title || 'Order Chat'}
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Order #{orderId}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        background: 'var(--bg-secondary)'
      }}>
        {loading && <Loader />}

        {!loading && messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            marginTop: '60px'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>💬</div>
            <p style={{ fontSize: '14px' }}>
              No messages yet. Start the conversation!
            </p>
          </div>
        )}

        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Socket error banner */}
      {!connected && (
        <div style={{
          padding: '10px 24px',
          background: '#fff3cd',
          borderTop: '1px solid #ffc107',
          color: '#856404',
          fontSize: '13px',
          textAlign: 'center'
        }}>
          {socket ? 'Connecting to chat server...' : 'Chat unavailable — not signed in or session expired. Please refresh.'}
        </div>
      )}

      {/* Input */}
      <div style={{
        padding: '16px 24px',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg)',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-end'
      }}>
        <textarea
          className='input'
          placeholder={connected ? 'Type a message... (Enter to send)' : 'Chat unavailable'}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={!connected}
          style={{
            flex: 1,
            resize: 'none',
            maxHeight: '120px',
            overflowY: 'auto'
          }}
        />
        <button
          onClick={handleSend}
          className='btn btn-primary'
          style={{ padding: '10px 20px', whiteSpace: 'nowrap' }}
          disabled={!input.trim() || !connected}
        >
          Send →
        </button>
      </div>
    </div>
  )
}

export default ChatPage