import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfText from "pdf-text";
import fetch from "node-fetch";
import Applicant from "../models/Applicant.js";
import dotenv from "dotenv";
import { decryptData, encryptData } from "../utils/encryption.js";

dotenv.config();

const extractTextFromPDF = (buffer) => {
  return new Promise((resolve, reject) => {
    pdfText(Buffer.from(buffer), (err, data) => {
      if (err) reject(err);
      else resolve(data.join("\n"));
    });
  });
};

export const textFromPdfResume = async (req, res) => {
  try {
    const { url } = req.body;

    const response = await fetch(url);
    if (!response.ok)
      return res
        .status(400)
        .json({ error: "Invalid URL or File not accessible!" });

    const buffer = await response.arrayBuffer();
    console.log("PDF buffer length:", buffer.byteLength);

    const text = await extractTextFromPDF(buffer);
    if (!text)
      return res.status(500).json({ error: "No text extracted from PDF" });

    console.log("Text extracted successfully, sending to Gemini...");

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `Extract name, email, education, experience, skills, and generate a summary from this resume text. 
    Ensure the response is formatted as valid JSON:
    {
      "name": "<name>",
      "email": "<email>",
      "education": {
        "degree": "<degree>",
        "branch": "<branch>",
        "institution": "<institution>",
        "year": "<year>"
      },
      "experience": {
        "job_title": "<job_title>",
        "company": "<company>",
        "start_date": "<start_date>",
        "end_date": "<end_date>"
      },
      "skills": ["<skill_1>", "<skill_2>", ...],
      "summary": "<summary>"
    }
    Resume Text: ${text}`;

    const result = await model.generateContent(prompt);
    const geminiResponse = result.response.candidates[0].content.parts[0].text;
    const cleanJson = geminiResponse.replace(/```json|```/g, "").trim();
    console.log("Gemini Response:", cleanJson);

    let applicantData;
    try {
      applicantData = JSON.parse(cleanJson);
    } catch (error) {
      console.error("Error parsing applicant data:", error);
      return res.status(500).json({ error: "Invalid data format" });
    }

    const applicant = new Applicant({
      name: encryptData(applicantData.name) || "Not available",
      email: encryptData(applicantData.email) || "Not available",
      education: applicantData.education || {
        degree: "Not available",
        branch: "Not available",
        institution: "Not available",
        year: "Not available",
      },
      experience: applicantData.experience || {
        job_title: "Not available",
        company: "Not available",
        start_date: "Not available",
        end_date: "Not available",
      },
      skills: applicantData.skills || ["Not available"],
      summary: applicantData.summary || "No summary available",
    });

    await applicant.save();

    console.log("Applicant saved successfully");
    res.status(200).json(applicant);
  } catch (error) {
    console.error("Error in textFromPdfResume:", error);
    res.status(500).json({ error: error.message });
  }
};

export const searchResume = async (req, res) => {
  try {
    const { name } = req.body;
    const applicants = await Applicant.find();

    const decryptedApplicants = applicants
      .map((applicant) => {
        try {
          const decryptedName = decryptData(applicant.name);

          if (!decryptedName.toLowerCase().includes(name.toLowerCase())) {
            return null;
          }

          return {
            name: decryptedName,
            email: decryptData(applicant.email),
            education: applicant.education,
            experience: applicant.experience,
            skills: applicant.skills,
            summary: applicant.summary,
          };
        } catch (error) {
          console.error("Decryption error:", error);
          return null;
        }
      })
      .filter(Boolean);

    if (!decryptedApplicants.length)
      return res.status(404).json({ error: "No matching records found" });

    res.status(200).json(decryptedApplicants);
  } catch (error) {
    console.error("Error in searchResume:", error);
    res.status(500).json({ error: error.message });
  }
};
