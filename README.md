# Resume Analyzer

A Node.js backend for resume analysis, integrating MongoDB Cloud, Gemini (LLM), JWT authentication, PDF text extraction.

## Features

- **MongoDB Cloud Integration**: Store and manage resumes securely.
- **Gemini (LLM)**: Gemini for resume analysis.
- **JWT Authentication**: Secure user authentication.
- **PDF Text Extraction**: Extract text from PDF resumes.
- **Deployment**: Deployed on Vercel.

## Tech Stack

- Backend: Node.js (Express.js)
- Database: MongoDB (Cloud)
- AI Processing: Gemini API
- Authentication: JWT
- PDF Parsing: pdf-parse
- Deployment: Vercel

## Setup

Certainly! Here's the updated and complete **Setup** section for your **Resume Analyzer** project:

---

1. **Clone the Repository**:
   Clone the project repository from GitHub and navigate to the project directory.

   ```bash
   git clone https://github.com/abhishekkushwahaa/resume-analyzer.git
   cd resume-analyzer
   ```

2. **Install Dependencies**:
   Run the following command to install all required dependencies.

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root of your project directory and add the following environment variables:

   ```plaintext
   PORT=3001
   MONGO_URI=mongodb_url
   JWT_SECRET=jwt_secret_key
   GEMINI_API_KEY=gemini_api_key
   DEPLOYMENT_URL=deployment_url
   ```

   - **MONGO_URI**: Your MongoDB Cloud connection string (from MongoDB Atlas).
   - **JWT_SECRET**: A secure key used to sign and verify JWT tokens.
   - **GEMINI_API_KEY**: Your Gemini API key for interacting with Gemini.
   - **VERCEL_DEPLOYMENT_URL**: The URL provided after deploying the app on Vercel.

4. **Start the Application**:
   After setting up the environment variables, you can start the server locally.

   ```bash
   npm start
   ```

   Your application will now be running at `http://localhost:3001`.

---

Feel free to reach out if you need further adjustments!
