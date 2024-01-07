import mongoose from "mongoose";


const UserSchema =  new mongoose.Schema({
  idUser:{
    type: String,
  },
  username: {
    type: String,
    
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    default: "member",
  },
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/dfftwrlu2/image/upload/v1700585307/IMG_0773_tesnhz.jpg", // Đặt đường dẫn đến ảnh mặc định của bạn
  },
});

export default mongoose.model("User", UserSchema);
