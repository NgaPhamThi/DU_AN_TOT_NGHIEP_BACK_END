import joi from "joi"

export const contactSchema = joi.object({
    name: joi.string().required().trim(),
    email: joi.string().email().required().trim(),
    phonenumber: joi.string().min(10).required().trim(),
    description: joi.string().min(10).required().trim(),
})