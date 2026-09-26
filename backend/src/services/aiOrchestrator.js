/**
 * Main AI Pipeline Orchestrator for SentiAI
 * Live LLM Gateway (Gemini/OpenAI API Keys) + Fast In-House Engine Fallback + SQLite
 */

const { analyzeSentimentAndEmotion } = require("./sentimentEngine");
const { parseEntitiesAndIntent } = require("./entityParser");
const { calculateRecoveryScore } = require("./scoringEngine");
const { generateEmpatheticResponse } = require("./responseGenerator");
const { getCustomerById, addFeedback } = require("../data/syntheticData");
const { dbOperations } = require("../db/database");
const { analyzeWithLLM } = require("./llmService");

async function processCustomerMessage(userMessage, customerId = "CUST-9001", orderHint = null, apiKey = null, provider = null) {
  // 1. Fetch Customer Profile
  const customer = getCustomerById(customerId);

  let sentimentData, entityData, scoreData, responseData, modelName = "SentiAI In-House NLP Engine";

  // 2. Try Live LLM API Gateway first if API key is provided or present in .env
  try {
    const llmResult = await analyzeWithLLM(userMessage, customer, apiKey, provider);
    if (llmResult) {
      sentimentData = {
        sentiment: llmResult.sentiment || "Neutral",
        sentimentScore: Number(llmResult.sentimentScore) || 0,
        primaryEmotion: llmResult.primaryEmotion || "Neutral",
        intensity: Number(llmResult.intensity) || 75
      };

      entityData = {
        product: llmResult.product || "OmniFit Smartwatch Series 5",
        orderId: llmResult.orderId || orderHint,
        issueCategory: llmResult.issueCategory || "Customer Service",
        severity: llmResult.severity || "Medium",
        urgency: llmResult.severity === "Critical" || llmResult.severity === "High" ? "High" : "Medium"
      };

      scoreData = {
        recoveryScore: Number(llmResult.recoveryScore) || 50,
        riskLevel: llmResult.riskLevel || "MEDIUM",
        nextBestAction: llmResult.nextBestAction || "Review customer inquiry",
        escalated: Boolean(llmResult.escalated)
      };

      responseData = {
        botMessage: llmResult.botMessage,
        followUpQuestion: llmResult.followUpQuestion
      };

      modelName = llmResult.aiModelUsed || "Live LLM API";
    }
  } catch (err) {
    console.warn("⚠️ LLM API call failed, switching smoothly to In-House Engine:", err.message);
  }

  // 3. Fallback to Local Engine if LLM not configured
  if (!sentimentData) {
    sentimentData = analyzeSentimentAndEmotion(userMessage);
    entityData = parseEntitiesAndIntent(userMessage, orderHint);
    scoreData = calculateRecoveryScore(sentimentData, entityData, customer, userMessage);
    responseData = generateEmpatheticResponse(customer, sentimentData, entityData, scoreData, userMessage);
  }

  // 4. Record feedback item in SQLite Database and Live Store
  const newFeedback = {
    id: `FBK-${Date.now().toString().slice(-4)}`,
    customerId: customer.id,
    customerName: customer.name,
    orderId: entityData.orderId,
    product: entityData.product,
    category: entityData.issueCategory || entityData.category || "Delivery",
    feedback: userMessage,
    sentiment: sentimentData.sentiment,
    sentimentScore: sentimentData.sentimentScore,
    emotion: sentimentData.primaryEmotion,
    intensity: sentimentData.intensity,
    severity: entityData.urgency === "High" ? "High" : "Low",
    issueType: entityData.issueType || entityData.issueCategory,
    urgency: entityData.urgency || "Medium",
    recoveryScore: scoreData.recoveryScore,
    riskLevel: scoreData.riskLevel,
    nextBestAction: scoreData.nextBestAction,
    escalated: scoreData.escalated,
    escalationStatus: scoreData.escalated ? "Pending" : "None",
    resolution: scoreData.escalated ? "Escalated to human support queue." : "Automated bot response provided.",
    timestamp: new Date().toISOString()
  };

  addFeedback(newFeedback);

  try {
    await dbOperations.saveFeedback(newFeedback);
    await dbOperations.saveChatLog({
      id: `chat-${Date.now()}`,
      sessionId: `SESSION-${customer.id}`,
      customerId: customer.id,
      sender: 'user',
      text: userMessage,
      followUp: responseData.followUpQuestion,
      sentiment: sentimentData.sentiment,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error("SQLite write notice:", err.message);
  }

  return {
    customer,
    sentimentData,
    entityData,
    scoreData,
    responseData,
    feedbackRecord: newFeedback,
    aiModel: modelName
  };
}

module.exports = {
  processCustomerMessage
};
