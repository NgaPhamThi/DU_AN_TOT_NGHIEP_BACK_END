import User from "../models/users";
import bcrypt from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();
import { signinSchema, signupSchema } from "../schemas/users";

export const signup = async (req, res) => {
  try {
    
    const { error } = signupSchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    // kiểm tra tồn tại email

    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({
        message: "Email đã tồn tại",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username:req.body.username,
      email:req.body.email,
      password: hashedPassword,
    });

  
    // tạo token từ server
    const token = jwt.sign({ id: user._id }, "123456",{expiresIn:"1d"});
    user.password = undefined;
    return res.status(201).json({
      message: "Đăng ký thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message:error
    })
  }
};

const userSignin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = signinSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status.json({
        message: "Tài khoản không tồn tại",
      });
    }
    // nó vừa mã hóa và vừa so sánh
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Sai mật khẩu",
      });
    }

    // tạo token từ server
    const token = jwt.sign({ _id: user._id },"1234567",{expiresIn:"1d"});
    user.password = undefined;

    return res.status(201).json({
      message: "Đăng nhập thành công",
      accessToken: token,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message:error
    })
  }
};


export const getUser = async (req, res) => {
  try {
      const data = await User.find()
      return res.send({
          message: "Tìm người dùng thành công",
          data,
      })
  } catch (err) {
      return res.send({
          message: err
      })
  }
}

export const getUserById = async (req, res) => {
  const id = req.params.id
  const data = await User.findById(id)
  if (data) {
      res.send({
          message: "Tìm người dùng thành công",
          data,
      })
  } else {
      res.status(404).send("Không tìm thấy người dùng")
  }
  res.end()
}

export const removeUser = async (req, res) => {
  try {
      const data = await User.findByIdAndDelete(req.params.id);
      return res.status(200).json({
          message: "Người dùng đã được xóa thành công",
          data,
      });
  } catch (error) {
      return res.status(500).json({
          message: error,
      });
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
      });
    }
    return res.status(200).json({
      message: "Người dùng đã được cập nhật thành công",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
