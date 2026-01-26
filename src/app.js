import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import auth from "./routes/auth.js";
const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // mobile apps send no origin
    if (
      origin.includes("localhost") ||
      origin.includes("127.0.0.1") ||
      origin.includes("192.168.") 
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
app.use("/auth",auth);


app.use(errorHandler);

export default app;
