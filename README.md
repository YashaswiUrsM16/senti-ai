# 🚀 SentiAI: Intelligent Retail Customer Experience & Recovery Agent

[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/React-18.2-blue.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Architecture](https://img.shields.io/badge/Architecture-Hybrid%20NLP%20%2B%20LLM-purple.svg)]()

> **Hackathon Solution for Problem Statement:** "Retail Customer Sentiment Analysis Chatbot"  
> An enterprise-grade AI solution that transforms retail customer feedback from passive sentiment classification into **active real-time customer recovery, risk scoring, and predictive operations**.

---

## 🌟 Why SentiAI is Different from Basic Chatbots

| Dimension | Basic Sentiment Chatbot | SentiAI Intelligent CX & Recovery Agent |
| :--- | :--- | :--- |
| **Sentiment Analysis** | Flat string label (`Negative`) | Multi-dimensional (Sentiment, Emotion, Intensity %, Urgency Level) |
| **Context Understanding** | None / Isolated text matching | Extracts Order ID, Product, Delivery Date, Amount, Complaint Category |
| **Decision Engine** | Blind LLM or static text | Hybrid Engine: Deterministic Safety Rules + LLM Contextual Generation |
| **Escalation Logic** | None or simple keyword trigger | **Customer Recovery Score (0-100)** factoring repeat complaints, order value & severity |
| **Retailer Intelligence** | Basic charts | Interactive Executive Dashboard, Escalation Desk, **What-If Simulation Engine** |
| **Explainability** | Black-box output | Full breakdown of sentiment drivers, emotion intensity, and decision rationale |

---

## 💡 Key Features

### 1. Customer-Facing Conversational Agent
- **Real-time Sentiment & Multi-Emotion Intensity**: Detects primary emotions (*Frustrated, Angry, Disappointed, Urgent, Satisfied, Delighted*) and exact intensity percentage (e.g. *88% Frustration*).
- **Entity & Category Extraction**: Automatically extracts Order IDs (e.g., `ORD-8821`), Product Names, Dollar Amounts, and Issue Categories (*Delivery, Damaged Product, Payment, Refund, Wrong Item, Product Quality*).
- **Empathetic Contextual Responses**: Crafts tailored responses offering courtesy vouchers, express courier dispatches, or senior manager callbacks.
- **Intelligent Follow-ups**: Asks targeted questions when essential details are missing.

### 2. Customer Recovery Score (CRS) Engine
Calculates a dynamic 0–100 score for every interaction using the formula:
$$\text{CRS} = 100 - (\text{Sentiment Penalty} + \text{Emotion Intensity Penalty} + \text{Issue Severity Penalty} + \text{Repeat Complaint Penalty} + \text{VIP Order Value Weight})$$

- **LOW RISK (CRS $\ge$ 75)**: Handled via automated intelligent bot recovery workflow.
- **MEDIUM RISK (45 $\le$ CRS < 75)**: Priority resolution + Proactive courtesy discount code.
- **HIGH RISK (CRS < 45)**: Mandatory routing to human escalation desk.

### 3. Retailer Admin & Executive Suite
- **Executive Dashboard**: Real-time KPIs, Sentiment Donut Charts, 7-Day Sentiment Trend Line, Customer Emotion Distribution, and Complaint Category Volume.
- **Product-Level Sentiment Analytics**: Per-product sentiment ratings, review volume, and health status indicators.
- **Escalation Command Center**: Live priority ticket queue with 1-click human agent actions (*Issue Refund, Expedite Shipping, Send Personal Apology + $25 Voucher, Mark Resolved*).
- **Interactive What-If Simulation Suite**: Simulate complaint surges (e.g., *+20% delivery delays*) to project segment churn risk, product revenue exposure ($), and strategic mitigation actions.
- **AI Executive Insights**: Automated 7-day executive summary, top emerging complaint alerts, and strategic business recommendations.

---

## 🎯 5 Predefined Hackathon Demo Scenarios

The chatbot interface includes 1-click preset buttons to demonstrate each scenario:

1. **Happy Customer (Positive / Low Risk / CRS: 95)**
   > *"I received my OmniFit Smartwatch Series 5 today! Incredible battery life, crisp display and seamless syncing with my phone. Highly satisfied!"*
2. **Mild Complaint (Neutral / Low-Med Risk / CRS: 78)**
   > *"My order ORD-4412 arrived fine, but the package box was slightly crumpled. Product inside seems undamaged though."*
3. **Angry Delayed Delivery (Negative / High Risk / CRS: 42)**
   > *"Order ORD-8821 was promised 3 days ago for my daughter's birthday! Tracking shows no update. Extremely frustrated with delayed delivery!"*
4. **Refund/Payment Failure (Negative / High Risk / CRS: 35)**
   > *"I was double charged $299.50 for Order ORD-9021 and my bank account shows two pending transactions! Need refund immediately!"*
5. **Severe Repeat Escalation (Critical / Human Escalation / CRS: 18)**
   > *"This is the THIRD TIME order ORD-3310 arrived broken! Glass lid shattered. Terrible service. I am canceling my VIP account and filing a dispute!"*

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Recharts
- **Backend API**: Node.js, Express, REST APIs, Modular AI Pipeline
- **AI Engine**: Hybrid NLP Sentiment & Emotion Engine, Entity/Intent Classifier, Customer Recovery Score Matrix, Empathetic Response Generator, Explainability Module
- **Data Layer**: In-Memory & Synthetic Enterprise Dataset (120+ customer reviews, orders, customer profiles)

```
retail-sentiment-agent/
├── backend/
│   ├── src/
│   │   ├── data/syntheticData.js       # Synthetic retail dataset & customer store
│   │   ├── services/
│   │   │   ├── aiOrchestrator.js      # Main AI pipeline orchestrator
│   │   │   ├── sentimentEngine.js     # Multi-emotion & sentiment detector
│   │   │   ├── entityParser.js        # Entity extraction & intent classifier
│   │   │   ├── scoringEngine.js       # Customer Recovery Score (CRS) engine
│   │   │   ├── responseGenerator.js   # Empathetic LLM response & explainability builder
│   │   │   └── simulationEngine.js    # Retailer What-If Simulation Engine
│   │   ├── routes/
│   │   │   ├── chat.js                # Chatbot message & scenario endpoints
│   │   │   ├── analytics.js           # Dashboard KPI & product analytics
│   │   │   ├── escalations.js         # Escalation queue & human agent resolution
│   │   │   └── simulation.js          # What-If simulator & executive insights
│   │   └── server.js                  # Express API Server
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx             # Top nav & Persona Switcher (Customer vs Retailer)
│   │   │   ├── ChatBot.jsx            # Interactive Chatbot with 5 Scenario Presets
│   │   │   ├── AIInspectorSidebar.jsx # Real-time Sentiment, Emotion, CRS & Explainability panel
│   │   │   ├── RetailerDashboard.jsx  # Admin KPIs, Charts, Live Feedback Log
│   │   │   ├── FeedbackAnalytics.jsx  # Product-level sentiment heatmaps & filters
│   │   │   ├── EscalationCenter.jsx   # High-risk ticket desk & 1-click agent action tools
│   │   │   ├── WhatIfSimulator.jsx    # Complaint surge What-If simulator
│   │   │   ├── AIExecutiveInsights.jsx# AI 7-day executive summary & strategic alerts
│   │   │   └── LandingPage.jsx        # Landing page & quick role entry
│   │   ├── context/AppContext.jsx     # Global state & API sync
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── start.js                           # Unified runner script
└── package.json
```

---

## ⚡ Quick Start

### 1. One-Click Launch (Runs Both Backend & Frontend)
```bash
node start.js
```

### 2. Manual Launch

**Backend Server (Port 5000):**
```bash
cd backend
npm install
npm start
```

**Frontend Application (Port 3000):**
```bash
cd frontend
npm install
npm run dev
```

Open your browser at **`http://localhost:3000`** to access the complete application.
