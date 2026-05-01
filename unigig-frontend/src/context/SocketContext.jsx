import { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { getToken } from '../utils/token.utils'

export const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)
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
      return
    }

    const newSocket = io('http://localhost:8000', {
      auth: { token }
    })

    newSocket.on('connect', () => {
      console.log('✅ Socket connected:', newSocket.id)
    })

    newSocket.on('connect_error', (err) => {
      if (err.message.includes('Authentication error')) {
        console.warn('Socket auth failed — stale token cleared')
        setToken(null)
      }
    })

    newSocket.on('disconnect', () => {
      console.log('❌ Socket disconnected')
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [token])

  return (
    <SocketContext.Provider value={{ socket, setToken }}>
      {children}
    </SocketContext.Provider>
  )
}