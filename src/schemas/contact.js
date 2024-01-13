import joi from "joi"

export const contactSchema = joi.object({
	userId: joi.string().required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
    phonenumber: joi.string().required(),
    description: joi.string().required(),
})