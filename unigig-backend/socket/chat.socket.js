const initSocket = (io) => {
    io.on('connection', (socket) => {
      console.log(`✅ User connected: ${socket.id}`)
  
      // Join a room per order
      socket.on('join_room', (orderId) => {
        socket.join(`order_${orderId}`)
        console.log(`User joined room: order_${orderId}`)
      })
  
      // Send and receive messages
      socket.on('send_message', (data) => {
        // data = { orderId, senderId, content }
        io.to(`order_${data.orderId}`).emit('receive_message', {
          senderId: data.senderId,
          content: data.content,
          createdAt: new Date()
        })
      })
  
      // Disconnect
      socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`)
      })
    })
  }
  
  module.exports = { initSocket }