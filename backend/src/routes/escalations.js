const express = require("express");
const router = express.Router();
const { getAllFeedbacks, updateEscalation } = require("../data/syntheticData");

// GET /api/escalations
router.get("/", (req, res) => {
  try {
    const feedbacks = getAllFeedbacks();
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
router.post("/:id/resolve", (req, res) => {
  try {
    const { id } = req.params;
    const { actionTaken, notes } = req.body;

    const updated = updateEscalation(id, "Resolved", notes || actionTaken || "Resolved by Human Agent.");
    if (!updated) {
      return res.status(404).json({ error: "Escalation item not found" });
    }

    return res.json({
      success: true,
      message: "Escalation ticket resolved successfully",
      item: updated
    });
  } catch (err) {
    console.error("Error resolving escalation:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
