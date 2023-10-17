import express from "express"
import colorRouter from "./routers/color"
import sizeRouter from "./routers/size"
import  cartRouter from "./routers/cart"
import mongoose from "mongoose";
const app = express();

app.use(express.json());

app.use("/api", colorRouter)
app.use("/api", sizeRouter)
app.use("/api", cartRouter)
mongoose.connect('mongodb://127.0.0.1:27017/DU_AN')
export const viteNodeApp = app;