import express from "express";
import routes from './routes';
import { errorHandler } from "./middlewares/error.middleware";
const app = express();
app.use(express.json())
app.use('/api', routes);
app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.use(errorHandler);
export default app;
