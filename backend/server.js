import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import { rateLimit } from 'express-rate-limit'
import path from 'path'

dotenv.config()

const __dirname = path.resolve()

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minutes
	limit: 10, // Limit each IP to 10 requests per `window` (here, per 1 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.

  // Custom response when rate limit is hit
  handler: (req, res, next, options) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests, please try again later.',
    });
  },
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to mongoDB")
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

// to make input as json
app.use(express.json())
app.use(cookieParser())
// app.use(cors({ origin: ["http://localhost:5173"], credentials: true }))



// import routes
import authRouter from "./routes/auth.route.js"
import noteRouter from "./routes/note.route.js"

app.use("/api/auth", limiter, authRouter)
app.use("/api/note", limiter, noteRouter)

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")))
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  })
}

// error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Serer Error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
