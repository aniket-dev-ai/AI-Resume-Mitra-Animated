import express from "express";
const app = express();
import cors from "cors";
import dbConnect from "./database/db.js";
import UserRouter from "./routes/User.route.js";

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/users", UserRouter);

dbConnect();

export default app;
