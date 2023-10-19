import comment from "../models/comment";
// import user from '../models/user';

export const createComment = async (req, res) => {
  try {
    const { content, userId, productId } = req.body;
    const currentDateTime = new Date();
    const comments = new comment({
      content,
      userId,
      productId,
      createAt: currentDateTime,
    });
    await comments.save();
    const users = await user.findById(userId);
    return res.status(201).json({
      message: "Bình luận thành công",
      comments,
      commenterName: users ? users.name : "Người dùng không tồn tại",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi",
      error: error.message,
    });
  }
};
export const getCommentsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await comment.find({ productId });
    return res.status(200).json({
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi",
      error: error.message,
    });
  }
};
