import  express  from "express"
import {  createComment, getCommentsByProductId } from "../controllers/comment";
import { checkPermission } from "../middlewares/checkpermission";
const router = express.Router();
router.get("/comment/:productId",checkPermission,getCommentsByProductId)
router.post("/comment",checkPermission,createComment)
export default router