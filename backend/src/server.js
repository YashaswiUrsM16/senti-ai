const express = require("express");
const cors = require("cors");
require("dotenv").config();

const chatRoutes = require("./routes/chat");
const analyticsRoutes = require("./routes/analytics");
const escalationRoutes = require("./routes/escalations");
const simulationRoutes = require("./routes/simulation");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    service: "SentiAI Intelligent Retail Customer Experience API",
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use("/api/chat", chatRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/escalations", escalationRoutes);
app.use("/api/simulation", simulationRoutes);
app.use("/api/insights", simulationRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Unhandled Server Error:", err);
  res.status(500).json({ error: "Internal Server Error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🚀 SentiAI Retail AI Backend Server running on port ${PORT}`);
  console.log(`http://localhost:${PORT}/api/health`);
  console.log(`=======================================================`);
});
