import './env.js'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import { Server } from 'socket.io'
import connectDB from './utils/db.js'
import authRoutes from './routes/auth.routes.js'
import serviceCenterRoutes from './routes/serviceCenter.routes.js'
import tokenRoutes from './routes/token.routes.js'
import operatorRoutes from './routes/operator.routes.js'
import adminRoutes from './routes/admin.routes.js'



const app = express()
app.set('trust proxy', 1)
const httpServer = createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true
  }
})

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/servicecenter', serviceCenterRoutes)
app.use('/api/v1/token', tokenRoutes)
app.use('/api/v1/operator', operatorRoutes)
app.use('/api/v1/admin', adminRoutes)

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  socket.on('join-room', (roomId) => {
    // 🟩 Extract string ID if object is sent, avoiding [object Object] serialization errors
    const cleanedRoomId = roomId && typeof roomId === 'object' ? (roomId._id || roomId.id) : roomId;
    if (cleanedRoomId) {
      socket.join(cleanedRoomId.toString())
      console.log(`Socket ${socket.id} joined room ${cleanedRoomId}`)
    }
  })
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

app.get('/', (req, res) => {
  res.send('QueueLess API is running')
})

connectDB().then(() => {
  httpServer.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
})