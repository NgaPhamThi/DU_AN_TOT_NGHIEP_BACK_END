import mongoose from "mongoose";

const oderDetailSchema = new mongoose.Schema({
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    // oderId: {
    //     type: mongoose.Types.ObjectId, ref: "Oder"
    // },
    productId: {
        type: mongoose.Types.ObjectId, ref: "Product"
    },
    sizeId: {
        type: mongoose.Types.ObjectId, ref: "Size"
    },
    colorId: {
        type: mongoose.Types.ObjectId, ref: "Color"
    },

}, { timestamps: true, versionKey: false })
export default mongoose.model("OderDetail", oderDetailSchema)