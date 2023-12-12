
import mongoose from "mongoose"

const contactSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phonenumber: {
        type: String
    },
    description: {
        type: String
    },


}, { timestamps: true, versionKey: false })
export default mongoose.model("Contact", contactSchema)