import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "../src/routes/auth.route.js"
import dataRoutes from "../src/routes/data.route.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    })
);

app.use("/api/auth", authRoutes)
app.use("/api/data", dataRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });