# 🚀 ResumeR – The Adversarial Algorithm Gauntlet

![ResumeR Hero](docs/images/1.png)

<p align="center">
  <b>Don't just build a resume—build a machine that beats ATS algorithms.</b><br/>
  Powered by <b>Groq (Llama 3)</b> ⚡ + <b>Google Gemini 2.0</b> 🧠
</p>

<p align="center">
  <a href="#features"><strong>Explore Features</strong></a> •
  <a href="#getting-started"><strong>Quick Start</strong></a> •
  <a href="#templates"><strong>View Frames</strong></a> •
  <a href="#deployment"><strong>Deploy</strong></a>
</p>

---

## ✨ Overview

**ResumeR** is an adversarial, AI-powered platform designed to revolutionize how job seekers interact with **Applicant Tracking Systems (ATS)**. While traditional builders focus on aesthetics, ResumeR focuses on **passability**. We use a multi-agent AI committee to audit your CV, identify vulnerabilities, and inject the exact semantic markers needed to bypass automated filters.

### 🧠 Adversarial AI Architecture

- ⚡ **Groq (Llama 3)** → Real-time adversarial auditing, scoring, and keyword injection.
- 🤖 **Google Gemini 2.0** → Vision-based parsing and semantic content optimization.

### 🎯 What Makes ResumeR Different

- **Adversarial Audit**: 4 AI agents (Recruiter, Ghostwriter, ATS Attacker, Benchmark) ruthlessly critique your CV.
- **Vision Extraction**: Drop a PDF or PNG and let our Vision LLM deconstruct your experience instantly.
- **Algorithm-Certified Frames**: Templates pre-vetted against Workday, Greenhouse, and Lever parsers.
- **Real-time Gauntlet**: Instant ATS scoring with pinpointed vulnerability logs.
- **Modern UI/UX**: High-performance, reactive interface designed for rapid iteration.

---

## 🚀 Features

### 🤖 AI-Powered Intelligence

- **Adversarial Scoring**: Get your resume scored against raw ATS heuristics in real-time.
- **Vulnerability Mapping**: Identify exactly where the bots will reject you.
- **Semantic Injection**: AI-powered bullet point enhancement and keyword placement.
- **Vision Parsing**: OCR-free, vision-based parsing for complex layouts.
- **Contextual Committee**: Ask the AI committee for specific strategy advice on any role.

### 🎨 Algorithm-Certified Frames

- **Workday-Optimized**: High-hierarchy structure for Workday's picky parser.
- **Greenhouse-Ready**: Skills-first layout designed for Greenhouse's structured data.
- **Lever-Compatible**: Minimalist, single-column design for maximum Lever reliability.
- **Executive**: Sophisticated design for senior-level and C-suite positions.
- **Minimalist**: Simple, elegant format that focuses purely on content.
- **Bold**: Confident design that makes a strong first impression.

### 🛠️ Advanced Builder Features

- **Live Gauntlet Preview**: Real-time score updates as you edit.
- **Split-screen Audit**: View audit logs and edit simultaneously.
- **Vision-to-Form**: Auto-fill your entire profile from an existing resume image.
- **Deployment Badges**: Export with a "Certified" seal of approval for specific ATS engines.

---

## 🛠️ Environment Setup

To run urCV.ai locally, you need to configure your environment variables:

1. **Clone the repo** and install dependencies:
   ```bash
   npm install
   cd src/api && npm install && cd ../..
   ```
2. **Create a `.env` file** in the root directory (use `.env.example` as a template).
3. **Add your API Keys**:
   - **Groq API Key**: Get it at [console.groq.com](https://console.groq.com/).
   - **Gemini API Key**: Get it at [ai.google.dev](https://ai.google.dev/).
4. **Start the servers**:
   - Backend: `npm run server`
   - Frontend: `npm run dev`

For detailed instructions and troubleshooting, see the **[Developer Setup Guide (SETUP.md)](SETUP.md)**.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express, Groq SDK, Google Generative AI
- **UI Components**: Shadcn UI (Radix UI)
- **Deployment**: Vercel

---

## ⬇️ Export & Sharing

- **High-Quality PDF**: Crystal-clear PDF export with perfect formatting.
- **ATS-Friendly**: Optimized for Applicant Tracking Systems used by global recruiters.
- **Print-Ready**: Professional print quality output.

---

## ⚖️ License

MIT License. See [CODE_OF_CONDUCT.MD](CODE_OF_CONDUCT.MD) for community guidelines.
