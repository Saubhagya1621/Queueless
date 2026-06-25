import { io } from 'socket.io-client'

const socket = io('https://queueless-backend-05vg.onrender.com', {
  withCredentials: true,
  autoConnect: false
})

export default socket