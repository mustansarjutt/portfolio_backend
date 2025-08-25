import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { sendMail } from "../utils/mailSender.js"
import { isValidEmail } from "../utils/mailValidator.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { HireMe } from "../models/hireMe.model.js"
import { generateContactConfirmationHtml } from "../utils/emailHtmlGenerator.js"
import { generateOwnerNotificationHtml } from "../utils/emailHtmlOwner.js"

const contactForHire = asyncHandler(async (req, res) => {
    const { email, title, projectDetail } = req.body

    if ([email, title, projectDetail].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const isValid = isValidEmail(email)
    if (!isValid) {
        throw new ApiError(400, "Email is invalid")
    }

    const html = generateContactConfirmationHtml({
        fullName: email,
        formName: "Hire-Me"
    })
    const response = await sendMail({
        to: email,
        subject: "We've received your message - Mustansar Gill",
        html
    })
    if (!response) {
        throw new ApiError(500, "Something went wrong")
    }

    const ownerHtml = generateOwnerNotificationHtml({
        fullName: email,
        email,
        formName: "Hire-Me",
        subject: title,
        message: projectDetail,
    })
    const ownerResponse = await sendMail({
        to: process.env.OWNER_EMAIL,
        subject: `You receive message from ${email}`,
        html: ownerHtml
    })
    if (!ownerHtml) {
        throw new ApiError(500, "Something went wrong")
    }

    const hireMeDBRecord = await HireMe.create({
        title,
        email,
        projectDetail
    })
    if (!hireMeDBRecord) {
        throw new ApiError(500, "Something went wrong")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, "Your message received we will contact you soon on provided email")
    )
})

export { contactForHire }