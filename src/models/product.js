import { number } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    price: Number,
    img: [{
        type: String,
        required: true,
    }],
    quantity:{
        type:Number,
        required: true,
    },
    description: String,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    }
},
{ timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePaginate)

export default mongoose.model("Product", productSchema);
