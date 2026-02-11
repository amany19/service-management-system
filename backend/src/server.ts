import app from "./app";
import prisma from "./config/prisma";

prisma.$connect()
  .then(() => console.log("Database connected successfully"))
  .catch((err:Error) => console.error("Database connection failed:", err));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
