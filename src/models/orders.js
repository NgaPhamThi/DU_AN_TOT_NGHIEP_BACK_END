import mongoose from 'mongoose'
const orderStatus = [
    'chờ duyệt',
    'lấy hàng',
    'đang giao',
    'giao hàng thành công'
  ];
const ordersSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    orderDate:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        required:true,
        enum: orderStatus,
        default: 'chờ duyệt'
    },
    address:{
        type:String,
        required:true
    },
    orderTotal:{
        type:Number,
        required:true
    }
})
export default mongoose.model('Order',ordersSchema)