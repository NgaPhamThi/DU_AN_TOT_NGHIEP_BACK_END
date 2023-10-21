import joi from "joi"

export const OrdersSchema = joi.object({
    address: joi.string().required(),
    userId: joi.string().required(),
    orderTotal: joi.number().required(),
})