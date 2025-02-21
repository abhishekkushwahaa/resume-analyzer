import {
  searchResume,
  textFromPdfResume,
} from "../controllers/resumeController.js";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import Applicant from "../models/Applicant.js";

export const router = express.Router();

router.post("/extract", authMiddleware, textFromPdfResume);
router.post("/search", authMiddleware, searchResume);

router.get("/", async (req, res) => {
  try {
    const applicants = await Applicant.find();

    if (!applicants.length) {
      return res.status(404).json({ error: "No applicants found" });
    }

    res.status(200).json(applicants);
  } catch (error) {
    console.error("Error in fetching applicants:", error);
    res.status(500).json({ error: error.message });
  }
});
