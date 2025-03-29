import mongoose, { Schema } from "mongoose"

const contactMeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 1000,
        trim: true
    }
}, {timestamps: true})

const ContactMe = mongoose.model("ContactMe", contactMeSchema)

export { ContactMe }