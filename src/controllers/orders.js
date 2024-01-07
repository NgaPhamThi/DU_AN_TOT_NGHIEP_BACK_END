import OderDetail from "../models/Oder_detail";
import Order from "../models/orders";
import Product from "../models/product"
import { OrdersSchema } from "../schemas/orders";
import Voucher from "../models/voucher";

// export const createOrder = async (req, res) => {
//   try {
//     const { error } = OrdersSchema.validate(req.body, { abortEarly: false });
//     if (error) {
//       return res.status(400).json({
//         message: error.details.map((err) => err.message),
//       });
//     }
//     const newOrders = await Order.create(req.body);
//     return res.status(200).json({
//       message: "Order Thành Công",
//       newOrders,
//   });
//   } catch (error) {
//     res.status(400).json({
//       error: error.message,
//     });
//   }
// };
export const CreateOrder = async (req, res) => {
  try {
    const { error } = OrdersSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
       message: error.details.map((err) => err.message),
      });
    }
    const { userId, fullname, phonenumber,email, address, orderTotal, orderDetails } = req.body;

    const newOrder = new Order({
      userId,
      fullname,
      email,
      phonenumber,
      address,
      orderTotal,
    });
    await newOrder.save();
    const orderDetailsWithProductInfo = [];
    await Promise.all(orderDetails.map(async (detail) => {
      const orderDetail = new OderDetail({
        orderId: newOrder._id,
        productId: detail.productId,
        quantity: detail.quantity,
        price: detail.price,
        sizeId: detail.sizeId,
        voucherId: detail.voucherId,
        colorId: detail.colorId
      });
      await orderDetail.save();
     const voucher = await Voucher.findById(detail.voucherId)
     if(voucher && voucher.Quantity >0){
      voucher.Quantity -= 1;
      await voucher.save();
     }else {
      // Handle case where voucher is not found or quantity is 0
      console.error('Voucher not found or out of stock:', voucher);
    }
    }));
    

    
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export const CreateOrderNoUserId = async (req, res) => {
  try {
   
    const { fullname, phonenumber,email, address, orderTotal, orderDetails } = req.body;

    const newOrder = new Order({
      fullname,
      email,
      phonenumber,
      address,
      orderTotal,
    });
    await newOrder.save();
    const orderDetailsWithProductInfo = [];
    await Promise.all(orderDetails.map(async (detail) => {
      const orderDetail = new OderDetail({
        orderId: newOrder._id,
        productId: detail.productId,
        quantity: detail.quantity,
        price: detail.price,
        sizeId: detail.sizeId,
        voucherId: detail.voucherId,
        colorId: detail.colorId
      });
      await orderDetail.save();
     const voucher = await Voucher.findById(detail.voucherId)
     if(voucher && voucher.Quantity >0){
      voucher.Quantity -= 1;
      await voucher.save();
     }else {
      // Handle case where voucher is not found or quantity is 0
      console.error('Voucher not found or out of stock:', voucher);
    }
    }));
    

    
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
export const purchase = async (req, res) => {
  try {
    // Fetch all orders from the database
    const userId = req.params.userId 
    const orders = await Order.find({ userId });

    // If there are no orders, return an empty array
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'No orders found.' });
    }

    // Create an array to store the result with order details
    const ordersWithDetails = [];

    // Iterate through each order
    for (const order of orders) {
      // Fetch order details for the current order
      const orderDetails = await OderDetail.find({ orderId: order._id });

      // Create an array to store order details with product information
      const orderDetailsWithProductInfo = [];

      // Iterate through each order detail
      for (const detail of orderDetails) {
        // Fetch product information for the current order detail
        const productInfo = await Product.findById(detail.productId);

        // Combine order detail and product information
        const orderDetailWithProduct = {
          ...detail.toJSON(),
          productInfo: productInfo ? productInfo.toObject() : null,
          sizeId:detail.sizeId,
          colorId:detail.colorId
        };

        // Add the combined information to the array
        orderDetailsWithProductInfo.push(orderDetailWithProduct);
      }

      // Combine order and order details
      const orderWithDetails = {
        ...order.toJSON(),
        orderDetails: orderDetailsWithProductInfo,
      };

      // Add the combined information to the final result array
      ordersWithDetails.push(orderWithDetails);
    }

    // Return the result with order and order details
    res.status(200).json(ordersWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export const getOrderDetailByOrderId = async(req, res) => {
  try {
    // Extract orderId from the request parameters
    const { orderId } = req.params;

    // Fetch the order by orderId
    const order = await Order.findById(orderId);

    // If the order is not found, return a 404 response
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Fetch order details for the current order
    const orderDetails = await OderDetail.find({ orderId });

    // If there are no order details, return an empty array
    if (!orderDetails || orderDetails.length === 0) {
      return res.status(404).json({ message: 'No order details found for the specified order.' });
    }

    // Create an array to store order details with product information
    const orderDetailsWithProductInfo = [];

    // Iterate through each order detail
    for (const detail of orderDetails) {
      // Fetch product information for the current order detail
      const productInfo = await Product.findById(detail.productId);

      // Combine order detail and product information
      const orderDetailWithProduct = {
        ...detail.toJSON(),
        productInfo: productInfo ? productInfo.toObject() : null,
        sizeId: detail.sizeId,
        colorId: detail.colorId,
      };

      // Add the combined information to the array
      orderDetailsWithProductInfo.push(orderDetailWithProduct);
    }

    // Combine order and order details
    const orderWithDetails = {
      ...order.toJSON(),
      orderDetails: orderDetailsWithProductInfo,
    };

    // Return the result with order and order details
    res.status(200).json(orderWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
export const getAllOrder = async (req, res) => {
  try {
    const Orders = await Order.find().populate('userId').exec()
    res.json(Orders);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
export const getOrdersByUserId = async (req, res) => {
  try {
    const Oders = await Order.findById({ userId: req.params.id });
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
    if (updateOrdersStatus.status === "PENDING" || updateOrdersStatus.status === "PROCESSING" || updateOrdersStatus.status === "ONDELIVERY") {
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
