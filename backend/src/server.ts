import http from "http";
import { Server } from "socket.io";
import app from "./app";
import prisma from "./config/prisma";

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*", //to be replaced with frontend URL
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
prisma.$connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err:Error) => console.error("Database connection failed:", err));

