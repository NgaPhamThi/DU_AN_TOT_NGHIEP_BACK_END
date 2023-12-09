import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    phonenumber: String,
    description: String,

}, { timestamps: true, versionKey: false })
export default mongoose.model("Contact", contactSchema)