const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Groq = require("groq-sdk");

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

// Attach Groq to app for use in routes
app.set("groq", groq);

// --- STARTUP-GRADE MIDDLEWARE (Security & Scalability) ---
const rateLimit = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10;

const securityMiddleware = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const apiKey = req.headers['x-api-key'];

  // 1. Rate Limiting
  if (!rateLimit[ip]) {
    rateLimit[ip] = { count: 1, startTime: now };
  } else {
    if (now - rateLimit[ip].startTime > RATE_LIMIT_WINDOW) {
      rateLimit[ip] = { count: 1, startTime: now };
    } else {
      rateLimit[ip].count++;
    }
  }

  if (rateLimit[ip].count > MAX_REQUESTS) {
    return res.status(429).json({ 
      error: "Rate limit exceeded", 
      retryAfter: Math.ceil((RATE_LIMIT_WINDOW - (now - rateLimit[ip].startTime)) / 1000) 
    });
  }

  // 2. Simulated API Key Validation (For "Enterprise" feel)
  if (req.path.startsWith('/api/analyze') && !apiKey) {
    // We don't block in hackathon mode, but we log it as a security warning
    console.warn(`[SECURITY] Unauthenticated request from ${ip} to ${req.path}`);
  }

  // 3. Request Logging
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${ip}`);
  
  next();
};

// --- ROUTES ---
const analysisRoutes = require("./routes/analysis");
const parsingRoutes = require("./routes/parsing");

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(securityMiddleware);

app.use("/api", analysisRoutes);
app.use("/api/parsing", parsingRoutes);

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

// --- STRUCTURED ERROR HANDLING ---
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url}:`, err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "An unexpected error occurred",
    type: err.type || "INTERNAL_ERROR",
    timestamp: new Date().toISOString()
  });
};

// --- LEGACY/STUB ENDPOINTS ---
// (These can be modularized later as needed)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
