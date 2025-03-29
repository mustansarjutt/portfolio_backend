import mongoose, { Schema } from "mongoose"

const hireMeSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    projectDetail: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true})

const HireMe = mongoose.model("HireMe", hireMeSchema)

export { HireMe }