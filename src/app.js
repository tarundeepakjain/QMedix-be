import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";


dotenv.config();

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    name: "qmedix.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "Lax", // None when HTTPS
      secure: false // true when HTTPS
    }
  })
);


app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
app.use("/auth",auth);


app.use(errorHandler);

export default app;
