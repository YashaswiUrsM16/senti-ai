# SentiAI - Intelligent Retail Customer Experience & Recovery Agent
## System Architecture & Technical Blueprint

### 1. Problem Analysis & Value Proposition
Retail enterprises handle thousands of customer feedback touchpoints daily (reviews, live chats, surveys, return notes). Traditional sentiment classifiers classify text into binary or trinary buckets (positive, neutral, negative) but fail to contextually evaluate customer risk, order severity, or emotional intensity. 

**SentiAI** bridges this gap by acting as an **Intelligent CX & Customer Recovery Agent**. It combines real-time NLP entity extraction, multi-dimensional emotion detection, a deterministic safety & escalation matrix, a **Customer Recovery Score (CRS)** engine, and an executive Retail Analytics & What-If Simulation Suite.

---

### 2. Architecture Comparison: Basic Chatbot vs. SentiAI

| Feature | Basic Sentiment Chatbot | SentiAI Intelligent CX & Recovery Agent |
| :--- | :--- | :--- |
| **Sentiment Analysis** | Flat string label (`Negative`) | Multi-dimensional (Sentiment, Emotion, Intensity %, Urgency Level) |
| **Context Understanding** | None / Isolated text matching | Extracts Order ID, Product, Delivery Date, Amount, Complaint Category |
| **Decision Engine** | Blind LLM or static response | Hybrid Engine: Deterministic Safety Rules + LLM Contextual Generation |
| **Escalation Logic** | None or simple keyword trigger | **Customer Recovery Score (0-100)** factoring repeat complaints, order value & severity |
| **Retailer Intelligence** | Basic charts | Interactive Executive Dashboard, Escalation Desk, **What-If Simulation Simulator** |
| **Explainability** | Black-box output | Full breakdown of sentiment drivers, emotion intensity, and decision rationale |

---

### 3. Comprehensive Folder Structure

```
retail-sentiment-agent/
├── backend/
│   ├── src/
│   │   ├── data/
│   │   │   └── syntheticData.js       # Synthetic retail dataset (100+ items) & customer database
│   │   ├── services/
│   │   │   ├── aiOrchestrator.js      # Main AI processing pipeline
│   │   │   ├── sentimentEngine.js     # NLP & Emotion detection engine
│   │   │   ├── entityParser.js        # Entity extraction & Intent classifier
│   │   │   ├── scoringEngine.js       # Customer Recovery Score (CRS) & Escalation Matrix
│   │   │   ├── responseGenerator.js   # LLM / Contextual empathetic response generator
│   │   │   └── simulationEngine.js    # Retailer What-If Simulation Engine
│   │   ├── routes/
│   │   │   ├── chat.js                # Chatbot & live AI inspection endpoints
│   │   │   ├── analytics.js           # Admin dashboard & analytics endpoints
│   │   │   ├── escalations.js         # Escalation management endpoints
│   │   │   └── simulation.js          # What-If scenario simulator endpoints
│   │   └── server.js                  # Express server startup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx             # Top navigation & role switcher
│   │   │   ├── ChatBot.jsx            # Customer Chat UI with scenario presets
│   │   │   ├── AIInspectorSidebar.jsx # Real-time Sentiment, Emotion, CRS & Explainability panel
│   │   │   ├── RetailerDashboard.jsx  # Admin KPIs, Charts, Recent Feedback
│   │   │   ├── FeedbackAnalytics.jsx  # Category & Product-level sentiment heatmaps
│   │   │   ├── EscalationCenter.jsx   # High-risk customer ticket manager & human action tools
│   │   │   ├── WhatIfSimulator.jsx    # "What-If" complaint surge simulation tool
│   │   │   └── AIExecutiveInsights.jsx# AI-generated daily summaries & emerging complaint alerts
│   │   ├── context/
│   │   │   └── AppContext.jsx         # Global state for active persona, live chats, analytics
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```
