/**
 * Main AI Pipeline Orchestrator for SentiAI
 */

const { analyzeSentimentAndEmotion } = require("./sentimentEngine");
const { parseEntitiesAndIntent } = require("./entityParser");
const { calculateRecoveryScore } = require("./scoringEngine");
const { generateEmpatheticResponse } = require("./responseGenerator");
const { getCustomerById, addFeedback } = require("../data/syntheticData");

function processCustomerMessage(userMessage, customerId = "CUST-9001", orderHint = null) {
  // 1. Fetch Customer Profile
  const customer = getCustomerById(customerId);

  // 2. Run Sentiment & Multi-Emotion Engine
  const sentimentData = analyzeSentimentAndEmotion(userMessage);

  // 3. Run Contextual Entity & Intent Parser
  const entityData = parseEntitiesAndIntent(userMessage, orderHint);

  // 4. Run Customer Recovery Score (CRS) & Escalation Risk Matrix
  const scoreData = calculateRecoveryScore(sentimentData, entityData, customer, userMessage);

  // 5. Run Empathetic Response Generator & Explainability Builder
  const responseData = generateEmpatheticResponse(customer, sentimentData, entityData, scoreData, userMessage);

  // 6. Record feedback item in live store for real-time analytics reflection
  const newFeedback = {
    id: `FBK-${Date.now().toString().slice(-4)}`,
    customerId: customer.id,
    customerName: customer.name,
    orderId: entityData.orderId,
    product: entityData.product,
    category: entityData.issueCategory,
    feedback: userMessage,
    sentiment: sentimentData.sentiment,
    sentimentScore: sentimentData.sentimentScore,
    emotion: sentimentData.primaryEmotion,
    intensity: sentimentData.intensity,
    severity: entityData.urgency === "High" ? "High" : entityData.urgency === "Medium" ? "Medium" : "Low",
    issueType: entityData.issueType,
    urgency: entityData.urgency,
    recoveryScore: scoreData.recoveryScore,
    riskLevel: scoreData.riskLevel,
    nextBestAction: scoreData.nextBestAction,
    escalated: scoreData.escalated,
    escalationStatus: scoreData.escalated ? "Pending" : "None",
    resolution: scoreData.escalated ? "Escalated to human support queue." : "Automated bot response provided.",
    timestamp: new Date().toISOString()
  };

  addFeedback(newFeedback);

  return {
    customer,
    sentimentData,
    entityData,
    scoreData,
    responseData,
    feedbackRecord: newFeedback
  };
}

module.exports = {
  processCustomerMessage
};
