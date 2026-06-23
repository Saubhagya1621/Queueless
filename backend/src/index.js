import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createServer } from 'http'
import { Server } from 'socket.io'
import connectDB from './utils/db.js'
import authRoutes from './routes/auth.routes.js'
import serviceCenterRoutes from './routes/serviceCenter.routes.js'
import operatorRoutes from './routes/operator.routes.js'
import adminRoutes from './routes/admin.routes.js'

dotenv.config()

const app = express()
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

app.use('/api/auth', authRoutes)
app.use('/api/servicecenter', serviceCenterRoutes)
app.use('/api/operator', operatorRoutes)
app.use('/api/admin', adminRoutes)

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join-room', (serviceCenterId) => {
    socket.join(serviceCenterId)
    console.log(`Socket ${socket.id} joined room ${serviceCenterId}`)
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