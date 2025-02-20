import {
  searchResume,
  textFromPdfResume,
} from "../controllers/resumeController.js";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const router = express.Router();

router.post("/extract", authMiddleware, textFromPdfResume);
router.post("/search", authMiddleware, searchResume);
