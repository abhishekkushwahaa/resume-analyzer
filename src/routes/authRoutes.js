import express from "express";
import { LogIn } from "../controllers/authController.js";

export const router = express.Router();

router.post("/login", LogIn);
