import { io as socketIOClient } from "socket.io-client";

const socket = socketIOClient("http://localhost:5000"); // must match your backend URL and port

socket.on("connect", () => {
  console.log("✅ Connected to server, socket id:", socket.id);
});

socket.on("new_request", (data) => {
  console.log("📨 New request received:", data);
});

socket.on("update_request", (updated) => {
  console.log("📨 Received updated_request:", updated);
});

export default socket;
