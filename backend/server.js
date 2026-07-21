import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const app=express();
app.use(cors(
    {
         origin: "http://localhost:5173",
          credentials: true,
    }
));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Backend is running");
});
app.use("/api/reports",reportRoutes);
app.use("/api/auth",authRoutes);
await connectDB();
app.listen(5000,()=>{
    console.log(`server running on port 5000`);
});