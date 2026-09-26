/**
 * Customer Recovery Score (CRS) & Escalation Decision Engine for SentiAI
 */

function calculateRecoveryScore(sentimentData, entityData, customerData, rawText) {
  let score = 100;
  const lower = rawText.toLowerCase();

  // 1. Sentiment Penalty
  if (sentimentData.sentiment === "Negative") {
    score -= 30;
  } else if (sentimentData.sentiment === "Neutral") {
    score -= 10;
  }

  // 2. Emotion & Intensity Penalty
  const intensityFactor = sentimentData.intensity / 100;
  if (sentimentData.primaryEmotion === "Angry") {
    score -= Math.round(25 * intensityFactor);
  } else if (sentimentData.primaryEmotion === "Frustrated") {
    score -= Math.round(20 * intensityFactor);
  } else if (sentimentData.primaryEmotion === "Disappointed") {
    score -= Math.round(15 * intensityFactor);
  } else if (sentimentData.primaryEmotion === "Urgent") {
    score -= Math.round(18 * intensityFactor);
  }

  // 3. Issue Severity & Urgency Deduction
  if (entityData.urgency === "High") {
    score -= 20;
  } else if (entityData.urgency === "Medium") {
    score -= 10;
  }

  if (["Damaged Product", "Payment Failure"].includes(entityData.issueType)) {
    score -= 15;
  } else if (["Delivery Delay", "Refund Delay"].includes(entityData.issueType)) {
    score -= 10;
  }

  // 4. Repeat Complaint / Customer History Factor
  const prevComplaints = customerData.previousComplaints || 0;
  score -= Math.min(25, prevComplaints * 8);

  if (lower.includes("third time") || lower.includes("again") || lower.includes("canceling") || lower.includes("lawsuit")) {
    score -= 15;
  }

  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, Math.round(score)));

  // Determine Risk Level
  let riskLevel = "LOW";
  let escalated = false;

  if (score < 45) {
    riskLevel = "HIGH";
    escalated = true;
  } else if (score < 75) {
    riskLevel = "MEDIUM";
    escalated = false;
  } else {
    riskLevel = "LOW";
    escalated = false;
  }

  // Force escalation override for critical triggers
  if (lower.includes("third time") || lower.includes("lawyer") || lower.includes("canceling my account") || entityData.issueType === "Payment Failure" && score < 40) {
    riskLevel = "HIGH";
    escalated = true;
  }

  // Determine Next Best Action
  let nextBestAction = "Provide Standard Assistance";

  if (riskLevel === "HIGH") {
    if (entityData.issueType === "Payment Failure" || entityData.issueType === "Refund Delay") {
      nextBestAction = "Initiate Instant Refund & Route to Finance Senior Lead";
    } else if (entityData.issueType === "Damaged Product" || lower.includes("third time")) {
      nextBestAction = "Escalate to Human Support Lead & Issue Replacement + $25 Compensation";
    } else if (entityData.issueType === "Delivery Delay") {
      nextBestAction = "Prioritize Express Shipping Courier & Grant $20 Store Credit";
    } else {
      nextBestAction = "Trigger Priority Human Agent Callback";
    }
  } else if (riskLevel === "MEDIUM") {
    if (entityData.issueType === "Wrong Item Delivered") {
      nextBestAction = "Generate Pre-paid Express Return Label & Ship Correct Item";
    } else if (entityData.issueType === "Delivery Delay") {
      nextBestAction = "Send Real-time Carrier Tracking & Offer 15% Courtesy Discount";
    } else if (entityData.issueType === "Refund Delay") {
      nextBestAction = "Expedite Refund Audit with Payment Gateway";
    } else {
      nextBestAction = "Offer Priority Customer Care Support & 10% Voucher";
    }
  } else {
    if (sentimentData.sentiment === "Positive") {
      nextBestAction = "Express Gratitude & Award 100 Loyalty Reward Points";
    } else {
      nextBestAction = "Log Feedback & Offer 5% Discount Code";
    }
  }

  return {
    recoveryScore: score,
    riskLevel,
    escalated,
    nextBestAction
  };
}

module.exports = {
  calculateRecoveryScore
};
