import { sendMessage } from "../controllers/contactMe.controller.js"
import { Router } from "express"

const sendMessageRouter = Router()

sendMessageRouter.route("/send-message").post(sendMessage)

export { sendMessageRouter }