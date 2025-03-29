import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { sendMail } from "../utils/mailer.js"
import { isValidEmail } from "../utils/mailValidator.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ContactMe } from "../models/contactMe.model.js"

const sendMessage = asyncHandler(async (req, res) => {
    const { name, email, title, message } = req.body

    if ([name, email, title, message].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const isValid = isValidEmail(email)
    if (!isValid) {
        throw new ApiError(400, "Email is invalid")
    }

    const emailText = `
    This email is from the Contact Us form.
    
    Name: ${name}
    Email: ${email}

    Message:
    ${message}
    `
    const response = await sendMail({
        to: process.env.EMAIL_RECEIVER,
        subject: title,
        text: emailText
    })
    if (response.statusCode >= 300) {
        throw new ApiError(response.statusCode, response.message)
    }

    const msgDBRecord = await ContactMe.create({
        name,
        email,
        title,
        message
    })
    if (!msgDBRecord) {
        throw new ApiError(500, "Something went wrong while saving message")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Your message is received. We will contact you on provided email")
    )
})

export { sendMessage }