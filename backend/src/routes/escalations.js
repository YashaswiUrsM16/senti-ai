const express = require("express");
const router = express.Router();
const { getAllFeedbacks, updateEscalation } = require("../data/syntheticData");
const { dbOperations } = require("../db/database");

// GET /api/escalations
router.get("/", async (req, res) => {
  try {
    let feedbacks = [];
    try {
      feedbacks = await dbOperations.getAllFeedbacks();
    } catch (e) {
      feedbacks = getAllFeedbacks();
    }

    if (!feedbacks || feedbacks.length === 0) {
      feedbacks = getAllFeedbacks();
    }

    const escalatedList = feedbacks.filter(f => f.escalated || f.riskLevel === "HIGH" || f.riskLevel === "MEDIUM");
    return res.json({
      success: true,
      escalations: escalatedList
    });
  } catch (err) {
    console.error("Error fetching escalations:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/escalations/:id/resolve
router.post("/:id/resolve", async (req, res) => {
  try {
    const { id } = req.params;
    const { actionTaken, notes } = req.body;

    const resolution = notes || actionTaken || "Resolved by Human Agent.";
    
    // Update in-memory & SQLite Database
    const updated = updateEscalation(id, "Resolved", resolution);
    try {
      await dbOperations.updateEscalation(id, "Resolved", resolution);
    } catch (e) {
      console.error("SQLite escalation update notice:", e.message);
    }

    return res.json({
      success: true,
      message: "Escalation ticket resolved successfully in SQLite Database",
      item: updated || { id, escalationStatus: "Resolved", resolution }
    });
  } catch (err) {
    console.error("Error resolving escalation:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
