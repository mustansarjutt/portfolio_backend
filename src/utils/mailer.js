import nodemailer from "nodemailer"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendMail = async ({to, subject, text}) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        }
        const info = await transporter.sendMail(mailOptions)
        if (info.accepted.length > 0) {
            return new ApiResponse(200, {}, "Mail delivered")
        } else {
            return new ApiError(500, "Something went wrong while sending email")
        }
    } catch (error) {
        return new ApiError(500, "Something went wrong while sending email")
    }
}

export { sendMail }