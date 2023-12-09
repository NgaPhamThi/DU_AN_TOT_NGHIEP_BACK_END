import express from "express"
import { create, get, getAll, remove, update } from "../controllers/contact"
const router = express.Router();

router.post('/contact', create);
router.get('/contact', getAll);
router.get('/contact/:id', get);
router.put('/contact/:id', update);
router.delete('/contact/:id', remove);

export default router;