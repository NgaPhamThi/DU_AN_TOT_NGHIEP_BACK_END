import { required } from "joi";
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type: String,
        required:true
    },
    userId:{
       type: mongoose.Types.ObjectId,
       required: true
    },
    productId:{
        type: mongoose.Types.ObjectId,
        ref:'product',
        required:true
    },
    createAt:{
        type: Date,
        default: Date.now
    }
})
export default mongoose.model('comment',commentSchema)