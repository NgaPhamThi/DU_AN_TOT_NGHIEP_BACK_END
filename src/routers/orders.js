import  express  from "express"
import { CreateOrder, CreateOrderNoUserId, getAllOrder, getOrderDetailByOrderId, getOrdersByUserId, purchase, updateOrderStatus } from "../controllers/orders";
import { validateOrder } from "../middlewares/orders";
const router = express.Router();
router.get("/order",getAllOrder)
router.get("/purchase/:userId",purchase)
router.get("/order/:orderId",getOrderDetailByOrderId)
router.get("/order/:userId",getOrdersByUserId)
router.post("/order",CreateOrder)
router.post("/orderNoId",CreateOrderNoUserId)
router.put("/order/:id",updateOrderStatus)

export default router