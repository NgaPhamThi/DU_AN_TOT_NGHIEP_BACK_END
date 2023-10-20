import joi from "joi"

export const productSizeSchema = joi.object({
    quantity: joi.number().required(),
    // productId: joi.number().required(),
    // colorId: joi.number().required(),
    // sizeId: joi.number().required(),
})