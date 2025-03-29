import express from "express"
import { ApiError } from "./utils/ApiError.js"
import cors from "cors"

const app = express()

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
        .json(
            {message: err.message, success: false}
        )
    }
})

export { app }