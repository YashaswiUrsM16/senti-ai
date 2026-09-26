const express = require("express");
const router = express.Router();
const { processCustomerMessage } = require("../services/aiOrchestrator");

// 5 Predefined Hackathon Scenarios
const presetScenarios = [
  {
    id: 1,
    title: "1. Happy Customer",
    badge: "Positive / Low Risk",
    customerId: "CUST-9002",
    message: "I received my OmniFit Smartwatch Series 5 today! Incredible battery life, crisp display and seamless syncing with my phone. Highly satisfied!"
  },
  {
    id: 2,
    title: "2. Mild Complaint",
    badge: "Neutral / Low-Med Risk",
    customerId: "CUST-9005",
    message: "My order ORD-4412 arrived fine, but the package box was slightly crumpled. Product inside seems undamaged though."
  },
  {
    id: 3,
    title: "3. Angry Delayed Delivery",
    badge: "Negative / High Risk",
    customerId: "CUST-9001",
    message: "Order ORD-8821 was promised 3 days ago for my daughter's birthday! Tracking shows no update. Extremely frustrated with delayed delivery!"
  },
  {
    id: 4,
    title: "4. Refund/Payment Failure",
    badge: "Negative / High Risk",
    customerId: "CUST-9004",
    message: "I was double charged $299.50 for Order ORD-9021 and my bank account shows two pending transactions! Need refund immediately!"
  },
  {
    id: 5,
    title: "5. Severe Repeat Escalation",
    badge: "Critical / Human Escalation",
    customerId: "CUST-9003",
    message: "This is the THIRD TIME order ORD-3310 arrived broken! Glass lid shattered. Terrible service. I am canceling my VIP account and filing a dispute!"
  }
];

// POST /api/chat/message
router.post("/message", (req, res) => {
  try {
    const { message, customerId, orderHint } = req.body;
    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message content is required" });
    }

    const result = processCustomerMessage(message, customerId, orderHint);
    return res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: result
    });
  } catch (err) {
    console.error("Error processing chat message:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/chat/scenarios
router.get("/scenarios", (req, res) => {
  return res.json({
    success: true,
    scenarios: presetScenarios
  });
});

module.exports = router;
