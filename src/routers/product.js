import express from "express";
import { create, get, getAll, remove, update } from "../controllers/product";
import { checkPermission } from "../middlewares/checkpermission";


const router = express.Router();

router.get("/products",checkPermission, getAll);
router.get("/products/:id",checkPermission, get);
router.post("/products", checkPermission, create);
router.delete("/products/:id",checkPermission, remove);
router.patch("/products/:id",checkPermission, update);

export default router;

