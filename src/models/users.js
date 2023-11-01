import mongoose from "mongoose";


const UserSchema =  new mongoose.Schema({
  username: String,
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

export default mongoose.model("User", UserSchema);
