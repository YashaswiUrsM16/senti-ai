/**
 * Contextual Empathetic Response & Explainability Generator for SentiAI
 */

function generateEmpatheticResponse(customer, sentimentData, entityData, scoreData, rawText) {
  const cName = customer.name.split(" ")[0];
  const { orderId, product, issueType, urgency } = entityData;
  const { sentiment, primaryEmotion, intensity } = sentimentData;
  const { riskLevel, recoveryScore, nextBestAction, escalated } = scoreData;

  let botMessage = "";
  let followUpQuestion = null;

  // 1. High Risk & Escalated Cases
  if (riskLevel === "HIGH") {
    if (issueType === "Delivery Delay") {
      botMessage = `Hello ${cName}, I deeply apologize for the frustrating delay with order ${orderId} (${product}). We understand how critical timely delivery is, especially for important occasions. I have immediately flagged your order for Express Carrier Escalation and issued a $20 courtesy credit to your account.`;
      followUpQuestion = "Would you like me to send live SMS tracking updates directly to your mobile number?";
    } else if (issueType === "Damaged Product") {
      botMessage = `Hi ${cName}, I am truly sorry to hear that your ${product} under order ${orderId} arrived damaged. We hold our product quality to high standards, and this experience is completely unacceptable. I have escalated this directly to our Senior Customer Support Manager, and a free replacement + full refund has been initiated.`;
      followUpQuestion = "Could you confirm if the delivery box itself arrived crushed or if only the inner items were damaged?";
    } else if (issueType === "Payment Failure") {
      botMessage = `Dear ${cName}, I sincerely apologize for the payment discrepancy regarding order ${orderId}. Double charges are handled with maximum urgency. I have immediately alerted our Finance Operations team to reverse the extra charge of $${entityData.amount || '299.50'} back to your account within 1-2 business days.`;
      followUpQuestion = "Do you have the bank reference transaction ID handy for our billing ledger?";
    } else {
      botMessage = `Hello ${cName}, I am so sorry for the ongoing trouble with your recent order ${orderId}. Because your satisfaction is our highest priority, I have escalated your case to a Senior Human Support Specialist who will contact you immediately.`;
      followUpQuestion = "What is the best phone number or email to reach you directly within the next 15 minutes?";
    }
  } 
  // 2. Medium Risk Cases
  else if (riskLevel === "MEDIUM") {
    if (issueType === "Wrong Item Delivered") {
      botMessage = `Hi ${cName}, thank you for letting us know about order ${orderId}. We are so sorry we sent the incorrect item for your ${product}. I have generated a prepaid return shipping label and dispatched the correct size/item via express delivery today!`;
      followUpQuestion = "Would you prefer a courier pickup from your home address or dropping it off at a local parcel point?";
    } else if (issueType === "Refund Delay") {
      botMessage = `Hello ${cName}, I understand your frustration regarding the pending refund for order ${orderId}. I have reviewed your account and requested our accounting team to fast-track your return settlement of $${entityData.amount || '65.00'}.`;
      followUpQuestion = "Did you receive the return receipt email when the item was scanned by the carrier?";
    } else {
      botMessage = `Hi ${cName}, thank you for reaching out regarding order ${orderId}. We apologize for the inconvenience with your ${product}. We are prioritizing your case and applying a 15% discount code (APEX15) to your account for your next purchase.`;
      followUpQuestion = "Is there anything specific about the product setup or functionality we can assist you with right now?";
    }
  }
  // 3. Low Risk / Positive / Mild Cases
  else {
    if (sentiment === "Positive") {
      botMessage = `Hello ${cName}! Fantastic news! We are thrilled to hear you love your ${product} from order ${orderId}. Your positive feedback means the world to our team. We've credited 100 VIP loyalty points to your profile!`;
    } else {
      botMessage = `Hi ${cName}, thanks for sharing your feedback on order ${orderId} (${product}). We appreciate your note regarding the packaging condition and have forwarded it directly to our logistics team to ensure better protection in transit. Here is a 5% off code (APEX5) for your next visit!`;
    }
  }

  // 4. Generate Explainability Reason Breakdown
  const explainability = {
    sentimentSummary: `Sentiment: ${sentiment} (${sentimentData.sentimentScore > 0 ? '+' : ''}${sentimentData.sentimentScore})`,
    emotionBreakdown: `Primary Emotion: ${primaryEmotion} (Intensity: ${intensity}%)`,
    issueClassification: `Issue: ${issueType} | Urgency: ${urgency}`,
    recoveryScoreInfo: `Recovery Score: ${recoveryScore}/100 [Risk Level: ${riskLevel}]`,
    driverReason: getDriverReason(sentiment, primaryEmotion, issueType, rawText, customer),
    nextBestAction,
    escalationTriggered: escalated
  };

  return {
    botMessage,
    followUpQuestion,
    explainability
  };
}

function getDriverReason(sentiment, emotion, issueType, text, customer) {
  const lower = text.toLowerCase();
  if (lower.includes("third time")) {
    return "Customer reported a repeat issue ('third time'), triggering critical escalation protocol.";
  }
  if (lower.includes("double charged") || lower.includes("bank")) {
    return "High financial distress detected due to duplicate billing on recent transaction.";
  }
  if (lower.includes("promised 3 days ago") || lower.includes("birthday")) {
    return "Customer experienced missed promised delivery date with high emotional urgency.";
  }
  if (lower.includes("shattered") || lower.includes("broken")) {
    return "Physical product damage reported upon delivery causing severe dissatisfaction.";
  }
  if (sentiment === "Positive") {
    return "Customer expressed high satisfaction with product quality and fast delivery fulfillment.";
  }
  return `Customer expressed ${emotion.toLowerCase()} feedback regarding ${issueType.toLowerCase()}.`;
}

module.exports = {
  generateEmpatheticResponse
};
