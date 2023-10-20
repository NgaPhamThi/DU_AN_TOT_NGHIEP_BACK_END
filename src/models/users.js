import mongoose from "mongoose";


const Userschema =  new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
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
});

export default mongoose.model("User", Userschema);
