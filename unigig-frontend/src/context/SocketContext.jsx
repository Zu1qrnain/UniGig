import { createContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { getToken } from '../utils/token.utils'

export const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    const token = getToken()
    if (!token) return

    const newSocket = io('http://localhost:8000', {
      auth: { token }
    })

    newSocket.on('connect', () => {
      console.log('✅ Socket connected:', newSocket.id)
    })

    newSocket.on('disconnect', () => {
      console.log('❌ Socket disconnected')
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}