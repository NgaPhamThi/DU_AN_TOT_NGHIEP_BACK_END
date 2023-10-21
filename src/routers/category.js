import express from "express";
import { create, get, getAll, remove, update } from "../controllers/category";
import { checkPermission } from "../middlewares/checkpermission";


const router = express.Router();

router.get("/categories", checkPermission,getAll);
router.get("/categories/:id",checkPermission, get);
router.post("/categories", checkPermission, create);
router.delete("/categories/:id",checkPermission,  remove);
router.patch("/categories/:id",checkPermission,  update);

export default router;
