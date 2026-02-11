const express = require("express");
const router = express.Router();

// Helper to clean JSON from AI response
const cleanJsonResponse = (response) => {
  let cleaned = response.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }
  cleaned = cleaned.replace(/^`+|`+$/g, "").trim();
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }
  return cleaned;
};

router.post("/parse", async (req, res, next) => {
  const { rawText, isImage } = req.body;
  const groq = req.app.get("groq");

  if (!rawText) return res.status(400).json({ error: "Missing raw text" });

  try {
    const systemPrompt = isImage 
      ? "You are a state-of-the-art Vision-based Resume Parser. You are analyzing text extracted via OCR from a resume image/PDF. Your job is to reconstruct the logical structure and hierarchy of the document with 99.9% accuracy. Identify section headers, company names, and date ranges with extreme precision."
      : "You are a Startup-Grade Resume Parser. You convert messy raw text into highly structured JSON for a career optimization engine. Your parsing logic simulates how Workday and Greenhouse extract entities from plain text. Return valid JSON only.";

    const prompt = `Convert this ${isImage ? "OCR-extracted image" : "raw text"} resume into a high-fidelity ResumeData JSON structure. 
    
    CRITICAL PARSING RULES:
    1. ENTITY EXTRACTION: Identify every unique Company, Role, and Date Range. 
    2. BULLET PRESERVATION: Maintain the exact wording of bullet points. Do not summarize.
    3. SKILLS CATEGORIZATION: Map skills into 'technical', 'languages', and 'certifications' based on context.
    4. ANOMALY DETECTION: If dates are missing or company names are ambiguous, use best-guess logical inference.
    5. DATA INTEGRITY: Ensure 'id' fields are generated as unique strings (e.g., UUIDs or short IDs) for each item in experience and education.
    
    RAW INPUT:
    ${rawText}

    REQUIRED JSON SCHEMA:
    {
      "personalInfo": { 
        "fullName": "string", 
        "email": "string", 
        "phone": "string", 
        "location": "string", 
        "linkedin": "string", 
        "portfolio": "string", 
        "summary": "string",
        "photoUrl": "string"
      },
      "experience": [
        { 
          "id": "string",
          "title": "string",
          "company": "string", 
          "location": "string", 
          "startDate": "string", 
          "endDate": "string", 
          "current": "boolean",
          "description": "string (full bullet points separated by newlines)" 
        }
      ],
      "education": [
        { 
          "id": "string",
          "degree": "string",
          "school": "string", 
          "location": "string", 
          "graduationDate": "string",
          "gpa": "string"
        }
      ],
      "skills": {
        "technical": ["string"],
        "languages": ["string"],
        "certifications": ["string"]
      },
      "hobbies": ["string"],
      "codingProfiles": {
        "github": "string",
        "leetcode": "string",
        "hackerrank": "string",
        "codeforces": "string",
        "kaggle": "string",
        "codechef": "string"
      }
    }

    Return ONLY the raw JSON object. No preamble. No explanation.`;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
    });

    const content = completion.choices[0]?.message?.content;
    const cleaned = cleanJsonResponse(content);
    res.json(JSON.parse(cleaned));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
