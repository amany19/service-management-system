import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import cors from "cors";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PATCH","PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(errorHandler);

export default app;
