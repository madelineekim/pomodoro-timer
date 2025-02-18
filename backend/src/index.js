import express from "express";
import cors from "cors";

const app = express();
const PORT = 5003;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    })
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });