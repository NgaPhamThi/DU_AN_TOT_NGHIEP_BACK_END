import Contact from "../models/contact"
import { contactSchema } from "../schemas/contact";

export const getAll = async (req, res) => {
    try {
        const contact = await Contact.find();
        return res.json(contact)

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const get = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id)
        return res.json(contact)
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const create = async (req, res) => {
    try {
        const { error } = contactSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                message: error.details.map(err => err.message)
            })
        }
        const contact = await Contact.create(req.body);
        return res.status(201).json(contact)
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const remove = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        return res.json({
            message: "xóa thành công",
            contact,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}
export const update = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.json({
            contact,
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })

    }
}