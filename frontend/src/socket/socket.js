import { io } from "socket.io-client";

const socket = io("https://queueless-backend-05vg.onrender.com", {
  autoConnect: false,
  transports: ["polling", "websocket"], // 🟩 Forces HTTP polling if Render drops WS frames
  withCredentials: true
});

export default socket;