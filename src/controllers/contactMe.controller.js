import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
// import { sendMail } from "../utils/mailer.js"
import { sendMail } from "../utils/mailSender.js"
import { generateContactConfirmationHtml } from "../utils/emailHtmlGenerator.js"
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

    const html = generateContactConfirmationHtml({ fullName: name, formName: "Contact-Me" })

    const response = await sendMail({ 
        to: email,
        subject: "We've received your message - Mustansar Gill",
        html
    })
    if (!response) {
        throw new ApiError(500, "Something went wrong")
    }

    const msgDBRecord = await ContactMe.create({
        name,
        email,
        title,
        message
    })
    if (!msgDBRecord) {
        throw new ApiError(500, "Something went wrong")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Your message is received. We will contact you on provided email")
    )
})

export { sendMessage }