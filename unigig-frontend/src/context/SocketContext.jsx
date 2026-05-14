import { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { getToken } from '../utils/token.utils'

export const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
  const [connected, setConnected] = useState(false)
  const [token, setToken] = useState(getToken)

  // Sync token when it changes in storage (login/logout in same or other tab)
  useEffect(() => {
    const sync = () => setToken(getToken())
    window.addEventListener('storage', sync)
    window.addEventListener('token-change', sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('token-change', sync)
    }
  }, [])

  useEffect(() => {
    if (!token) {
      setSocket(null)
      setConnected(false)
      return
    }

    const newSocket = io('http://localhost:8000', {
      auth: { token }
    })

    newSocket.on('connect', () => {
      console.log('✅ Socket connected:', newSocket.id)
      setConnected(true)
    })

    newSocket.on('connect_error', (err) => {
      setConnected(false)
      if (err.message.includes('Authentication error')) {
        console.warn('Socket auth failed — stale token cleared')
        setToken(null)
      }
    })

    newSocket.on('disconnect', () => {
      console.log('❌ Socket disconnected')
      setConnected(false)
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
      setConnected(false)
    }
  }, [token])

  return (
    <SocketContext.Provider value={{ socket, connected, setToken }}>
      {children}
    </SocketContext.Provider>
  )
}