import "dotenv/config"
import { app } from "./app.js"
import { connectDatabase } from "./db/connection.js"
import mongoose from "mongoose"


const startServer = async () => {
    try {
        await connectDatabase()
        
        app.on("error", (err) => {
            console.log("Error ", err)
        })

        const port = process.env.PORT || 3000
        const server = app.listen(port, () => {
            console.log(`Server is listening on http://localhost:${port}`)
        })

        const closeConnection = async () => {
            try {
                await mongoose.connection.close()
                server.close(() => {
                    console.log("Server closed")
                    process.exit(0)
                })
            } catch(err) {
                console.log("Error while closing connection ", err)
                process.exit(1)
            }
        }

        process.on("SIGINT", closeConnection)
        process.on("SIGTERM", closeConnection)
    } catch(err) {
        console.log("Connection failed ", err)
    }
}

startServer()