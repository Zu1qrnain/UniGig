const Message = require('../models/Message')
const jwt = require('jsonwebtoken')

const initSocket = (io) => {
    io.use((socket, next) => {
      const token = socket.handshake.auth?.token
      if (!token) {
        return next(new Error('Authentication error: token missing'))
      }
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        socket.user = decoded
        next()
      } catch (err) {
        next(new Error('Authentication error: invalid token'))
      }
    })

    io.on('connection', (socket) => {
      console.log(`✅ User connected: ${socket.id} (userId: ${socket.user?.id})`)

      // Join a room per order
      socket.on('join_room', (orderId) => {
        socket.join(`order_${orderId}`)
        console.log(`User joined room: order_${orderId}`)
      })

      // Send and receive messages
      socket.on('send_message', async (data) => {
        // data = { orderId, content } — senderId taken from verified JWT, not client
        if (!data?.orderId || !data?.content?.trim()) {
          socket.emit('message_error', { error: 'Missing orderId or content' })
          return
        }

        const senderId = socket.user.id

        try {
          const message = await Message.create({
            content: data.content,
            sender_id: senderId,
            order_id: data.orderId
          })

          const payload = {
            senderId,
            content: data.content,
            createdAt: message.createdAt
          }

          // Broadcast to others in the room (excludes sender to prevent duplicates)
          socket.to(`order_${data.orderId}`).emit('receive_message', payload)
          // Confirm back to sender with server timestamp
          socket.emit('message_sent', payload)
        } catch (err) {
          console.error('send_message error:', err)
          socket.emit('message_error', { error: 'Failed to save message' })
        }
      })
  
      // Disconnect
      socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`)
      })
    })
  }
  
  module.exports = { initSocket }