import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import adoptionRoutes from "./routes/adoptionRoutes.js";
import adoptionRequestRoutes from "./routes/adoptionRequestRoutes.js";
import adoptionApplicationRoutes from "./routes/adoptionApplicationRoutes.js"
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
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/adoptions", adoptionRoutes);
app.use("/api/adoption-requests", adoptionRequestRoutes);
app.use("/api/adoption-applications", adoptionApplicationRoutes);
await connectDB();
app.listen(5000,()=>{
    console.log(`server running on port 5000`);
});