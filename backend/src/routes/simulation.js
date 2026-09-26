const express = require("express");
const router = express.Router();
const { runWhatIfSimulation } = require("../services/simulationEngine");
const { getAllFeedbacks } = require("../data/syntheticData");

// POST /api/simulation/what-if
router.post("/what-if", (req, res) => {
  try {
    const result = runWhatIfSimulation(req.body);
    return res.json({
      success: true,
      simulation: result
    });
  } catch (err) {
    console.error("Error running simulation:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/insights/executive
router.get("/executive", (req, res) => {
  try {
    const feedbacks = getAllFeedbacks();
    const total = feedbacks.length;
    const negatives = feedbacks.filter(f => f.sentiment === "Negative");
    const deliveryNegatives = negatives.filter(f => f.category === "Delivery").length;
    const damagedNegatives = negatives.filter(f => f.category === "Damaged Product").length;
    const paymentNegatives = negatives.filter(f => f.category === "Payment").length;

    const executiveSummary = `Over the past 7 days, system analyzed ${total} customer interactions. Overall sentiment stands at 58% Positive, 18% Neutral, and 24% Negative. Delivery delay complaints represent the largest driver of customer friction (${Math.round((deliveryNegatives / (negatives.length || 1)) * 100)}% of negative sentiment), followed by damaged items during transit (${Math.round((damagedNegatives / (negatives.length || 1)) * 100)}%). Customer Recovery Agent successfully resolved 72% of issues automatically without human intervention.`;

    const emergingComplaints = [
      {
        topic: "Repeated Courier Delays on Regional Express Routes",
        growth: "+28% vs last week",
        severity: "High",
        affectedProducts: ["UltraSound Wireless Headphones", "ErgoComfort Chair"],
        recommendedAction: "Audit 3PL carrier SLA compliance and auto-issue $10 courtesy credit on delays >48 hrs."
      },
      {
        topic: "Packaging Integrity for Glassware & Cookware Sets",
        growth: "+15% vs last week",
        severity: "Critical",
        affectedProducts: ["ChefMaster 10-Piece Cookware Set"],
        recommendedAction: "Upgrade double-walled bubble wrapping in fulfillment center #3."
      },
      {
        topic: "Duplicate Charge Complaints on Quick-Checkout Mobile Gateways",
        growth: "+9% vs last week",
        severity: "High",
        affectedProducts: ["All Electronics"],
        recommendedAction: "Patch double-click form submission validation on mobile checkout API."
      }
    ];

    const strategicActions = [
      "Implement Proactive Delay Prevention: Notify customers 12 hours prior to estimated carrier delays with instant store credit.",
      "Integrate Automated Instant Refunds for Verified Damaged Photos: Reduce customer friction from 3 days to under 30 seconds.",
      "Escalate VIP Gold/Platinum accounts with CRS < 40 directly to dedicated Retention Managers."
    ];

    return res.json({
      success: true,
      executiveSummary,
      emergingComplaints,
      strategicActions
    });
  } catch (err) {
    console.error("Error fetching executive insights:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
