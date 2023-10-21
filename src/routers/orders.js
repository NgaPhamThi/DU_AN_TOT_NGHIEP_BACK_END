import  express  from "express"
import { createOrder, getAllOrder, getOrdersByUserId, updateOrderStatus } from "../controllers/orders";
import { validateOrder } from "../middlewares/orders";
const router = express.Router();
router.get("/order",getAllOrder)
router.get("/order/:id",getOrdersByUserId)
router.post("/order",validateOrder,createOrder)
router.put("/order/:id",updateOrderStatus)
export default router