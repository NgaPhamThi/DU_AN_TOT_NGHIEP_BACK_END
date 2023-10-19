import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import commentRouter from "./routers/comment";
import categoryRouter from "./routers/category";
import voucherRouter from "./routers/voucher";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", commentRouter);
app.use("/api", categoryRouter);
app.use("/api", voucherRouter);
mongoose.connect("mongodb://127.0.0.1:27017/DATN_WD55");
export const viteNodeApp = app;
