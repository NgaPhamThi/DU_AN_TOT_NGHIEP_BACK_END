import { number } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const sizeSchema = new mongoose.Schema({
    size: {
      type:String,
    },
    quantity: {
      type: Number,
    },
  });
  
  const colorSchema = new mongoose.Schema({
    color: {
      type: mongoose.Types.ObjectId,
      ref: "Color",
    },
    quantity: {
      type: Number,
      required: true,
    },
  });
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
    totalQuantity: {
        type: Number,
        default: 0,
      },
    description: String,
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
    sizes: {
        type: mongoose.Types.ObjectId,
        ref: "Size",
    },
    colors: {
        type: mongoose.Types.ObjectId,
        ref: "Color",
    },
     sizes: [sizeSchema],
     colors: [colorSchema],
    
},
{ timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePaginate)

export default mongoose.model("Product", productSchema);
