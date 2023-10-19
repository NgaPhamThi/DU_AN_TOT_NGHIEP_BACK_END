// import express from "express";
// import {
//   createVoucher,
//   deleteVoucher,
//   getAllVouchers,
//   getVoucherById,
//   updateVoucher,
// } from "../controllers/voucher";
// const router = express.Router();
// router.get("/vouchers", getAllVouchers);
// router.get("/vouchers:id", getVoucherById);
// router.post("/vouchers", createVoucher);
// router.delete("/vouchers:id", deleteVoucher);
// router.put("/vouchers:id", updateVoucher);

// export default router;
import express from "express";
import {
  createVoucher,
  getVouchers,
  getVoucherByID,
  updateVoucher,
  deleteVoucher,
} from "../controllers/voucher"; // Import các hàm điều khiển

const router = express.Router();

router.post("/vouchers", createVoucher);

router.get("/vouchers", getVouchers);

router.get("/vouchers/:id", getVoucherByID);

router.put("/vouchers/:id", updateVoucher);

router.delete("/vouchers/:id", deleteVoucher);

export default router;
