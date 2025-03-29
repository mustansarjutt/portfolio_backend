import "dotenv/config"
import { app } from "./app.js"
import { connectDatabase } from "./db/connection.js"

const port = process.env.PORT || 3000

connectDatabase()
.then(() => {
    app.on("error", (err) => {
        console.log("Error ", err)
    })
    app.listen(port, () => {
        console.log(`Server is listening on http://localhost:${port}`)
    })
})
.catch((err) => {
    console.log("Connection failed ", err)
})