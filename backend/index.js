import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
//app
const app = express();

//utlils
import connectDb from "./config/db.js";

dotenv.config();
const port = process.env.PORT || 4000;
//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);

//starting
connectDb(process.env.MONGO_URL);
app.listen(port, () => {
  console.log(`server running on ${port}`);
});
