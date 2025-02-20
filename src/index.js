import express from "express";
import { ConnectDB } from "./config/db.js";
import cors from "cors";

const app = express();
ConnectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
