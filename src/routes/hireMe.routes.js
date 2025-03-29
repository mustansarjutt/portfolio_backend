import { Router } from "express"
import { contactForHire } from "../controllers/hireMe.controller.js"

const sendHireMeMsgRouter = Router()

sendHireMeMsgRouter.route("/hire-me").post(contactForHire)

export { sendHireMeMsgRouter }