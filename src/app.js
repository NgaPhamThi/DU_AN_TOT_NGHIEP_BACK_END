import express from "express"
import mongoose from "mongoose";
import commentRouter from "./routers/comment"
const app = express();
app.use(express.json())
app.use(cors())
app.use('/api',commentRouter)
mongoose.connect('mongodb://127.0.0.1:27017/DATN_WD55')
export const viteNodeApp = app;