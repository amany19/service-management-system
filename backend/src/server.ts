import http from "http";
import { Server } from "socket.io";
import app from "./app";
import prisma from "./config/prisma";
import { createRoutes } from "./routes";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {   origin: "http://localhost:5173", // your frontend
  methods: ["GET","POST","PATCH","DELETE","OPTIONS"],
  credentials: true},
});

// inject io into routes
app.use("/api", createRoutes(io));

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("disconnect", () => console.log("Client disconnected:", socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

prisma.$connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err: Error) => console.error("Database connection failed:", err));
