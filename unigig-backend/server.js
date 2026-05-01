require('dotenv').config()
const express = require('express')
const cors = require('cors')
const http = require('http')
const morgan = require('morgan')
const { Server } = require('socket.io')
const { connectDB, sequelize } = require('./config/db')
const { initSocket } = require('./socket/chat.socket')

// Route imports
const authRoutes = require('./routes/v1/auth.routes')
const gigRoutes = require('./routes/v1/gig.routes')
const orderRoutes = require('./routes/v1/order.routes')
const reviewRoutes = require('./routes/v1/review.routes')
const adminRoutes = require('./routes/v1/admin.routes')
const chatRoutes = require('./routes/v1/chat.routes')
// Models (must be imported to sync)
require('./models/index')

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST']
  }
})



// Middleware
app.use(morgan('dev'))
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

// Routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/gigs', gigRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/reviews', reviewRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/messages', chatRoutes)

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'UniGig API is running' })
})

// Socket.io
initSocket(io)

// Start server
const PORT = process.env.PORT || 8000
const startServer = async () => {
  await connectDB()
  await sequelize.sync({ force: false })
  console.log('✅ Database Synced')
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  })
}

startServer()