const Message = require('../models/Message')
const jwt = require('jsonwebtoken')

const initSocket = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token
    if (!token) return next(new Error('Authentication error: token missing'))
    try {
      socket.user = jwt.verify(token, process.env.JWT_SECRET)
      next()
    } catch {
      next(new Error('Authentication error: invalid token'))
    }
  })

  io.on('connection', (socket) => {
    console.log(`✅ Socket connected: ${socket.id} (userId: ${socket.user?.id})`)

    socket.on('join_room', (orderId) => {
      const room = `order_${orderId}`
      socket.join(room)
      console.log(`User ${socket.user?.id} joined ${room}`)
    })

    socket.on('send_message', async (data) => {
      if (!data?.orderId || !data?.content?.trim()) {
        socket.emit('message_error', { error: 'Missing orderId or content' })
        return
      }

      try {
        const message = await Message.create({
          content: data.content.trim(),
          sender_id: socket.user.id,
          order_id: data.orderId
        })

        const payload = {
          senderId: socket.user.id,
          content: message.content,
          createdAt: message.createdAt
        }

        socket.to(`order_${data.orderId}`).emit('receive_message', payload)
        socket.emit('message_sent', payload)
      } catch (err) {
        console.error('send_message error:', err)
        socket.emit('message_error', { error: 'Failed to save message' })
      }
    })

    socket.on('error', (err) => {
      console.error(`Socket error (${socket.id}):`, err.message)
    })

    socket.on('disconnect', (reason) => {
      console.log(`❌ Socket disconnected: ${socket.id} — ${reason}`)
    })
  })
}

module.exports = { initSocket }