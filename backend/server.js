import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import reportRoutes from "./routes/reportRoutes.js";
dotenv.config();
const app=express();
app.use(express.json());
app.use("/api/reports",reportRoutes);
await connectDB();
app.listen(5000,()=>{
    console.log(`server running on port 5000`);
});