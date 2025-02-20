import express from "express";
import { ConnectDB } from "./config/db.js";
import cors from "cors";
import { router as authRoutes } from "./routes/authRoutes.js";

const app = express();
ConnectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
