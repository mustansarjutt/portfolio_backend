import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { sendMail } from "../utils/mailer.js"
import { isValidEmail } from "../utils/mailValidator.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { HireMe } from "../models/hireMe.model.js"

const contactForHire = asyncHandler(async (req, res) => {
    const { email, title, projectDetail } = req.body

    if ([email, title, projectDetail].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const isValid = isValidEmail(email)
    if (!isValid) {
        throw new ApiError(400, "Email is invalid")
    }

    const emailText = `
    This email is from the Hire me form
    
    Sender Email is ${email}

    Project details are:
    ${projectDetail}
    `

    const response = await sendMail({
        to: process.env.EMAIL_RECEIVER,
        subject: title,
        text: emailText
    })
    if (response.statusCode >= 300) {
        throw new ApiError(response.statusCode, response.message)
    }

    const hireMeDBRecord = await HireMe.create({
        title,
        email,
        projectDetail
    })
    if (!hireMeDBRecord) {
        throw new ApiError(500, "Something went wrong while saving message")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Your message received we will contact you soon on provided email")
    )
})

export { contactForHire }