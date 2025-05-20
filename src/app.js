import express from "express"
import { ApiError } from "./utils/ApiError.js"
import cors from "cors"
import rateLimit from "express-rate-limit"
import helmet from "helmet"

const app = express()

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 20,
    message: "Too many requests. Try again latter"
})

app.use(limiter)
app.use(helmet())

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit: "10kb"
}))

app.use(express.urlencoded({
    limit: "10kb",
    extended: true
}))

import { sendMessageRouter } from "./routes/contactMe.routes.js"
import { sendHireMeMsgRouter } from "./routes/hireMe.routes.js"

app.use("/api/v1/", sendMessageRouter)
app.use("/api/v1/", sendHireMeMsgRouter)

app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res
        .status(err.statusCode)
        .json({
            message: err.message, 
            success: false
        })
    }
    if (err.status === 429) {
        return res
        .status(429)
        .json({
            message: "Too many requests, please try again later", 
            success: false
        })
    }
    res.status(500).json({
        message: "Internal Server Error", 
        success: false
    })
})

export { app }