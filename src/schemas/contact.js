import joi from "joi"

export const contactSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    phonenumber: joi.string().required(),
    description: joi.string().required(),
})