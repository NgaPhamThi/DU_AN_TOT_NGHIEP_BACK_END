import Order from "../models/orders";
import { OrdersSchema } from "../schemas/orders";

export const createOrder = async (req, res) => {
  try {
    const { error } = OrdersSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: error.details.map((err) => err.message),
      });
    }
    const newOrders = new Order(req.body);
    await newOrders.save();
    res.status(200).json({
      message: "Order Thanh cong",
      newOrders,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
export const getAllOrder = async (req, res) => {
  try {
    const Orders = await Order.find();
    res.json(Orders);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
export const getOrdersByUserId = async (req, res) => {
  try {
    const Oders = await Order.find({ userId: req.params.id });
    return res.status(200).json({
      Oders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Lỗi",
      error: error.message,
    });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const updateOrdersStatus = await Order.findById(req.params.id);
    if (!updateOrdersStatus) {
      return res.status(400).json({
        error: "Order khong ton tai",
      });
    }
    if (updateOrdersStatus.status === "chờ duyệt") {
      const updateStatus = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      );

      res.json(updateStatus);
    }else{
        return res.status(400).json({
            error: "Không thể hủy đơn hàng ở trạng thái này"
        });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
