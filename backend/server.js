import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import reportRoutes from "./routes/reportRoutes.js";
dotenv.config();
const app=express();
app.use(cors(
    {
         origin: "http://localhost:5173",
    }
));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Backend is running");
});
app.use("/api/reports",reportRoutes);
await connectDB();
app.listen(5000,()=>{
    console.log(`server running on port 5000`);
});