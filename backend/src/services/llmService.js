/**
 * Live LLM Gateway for SentiAI (Gemini / OpenAI API Integration)
 * Performs deep semantic emotion analysis, CRS scoring, and empathetic response generation
 */

const SYSTEM_PROMPT = `
You are SentiAI, an advanced Retail Customer Experience & Recovery AI.
Analyze the customer's message in the context of an e-commerce retail store and return a strict JSON object with no markdown fences, no backticks, and exactly these fields:

{
  "sentiment": "Positive" | "Neutral" | "Negative",
  "sentimentScore": number between -1.0 and 1.0,
  "primaryEmotion": "Angry" | "Frustrated" | "Disappointed" | "Urgent" | "Satisfied" | "Delighted" | "Neutral",
  "intensity": integer between 0 and 100,
  "product": detected product name or "General Store",
  "orderId": detected order ID (e.g. "ORD-8821") or null,
  "issueCategory": "Delivery" | "Product Quality" | "Payment" | "Refund" | "Damaged Product" | "Customer Service" | "General Feedback",
  "severity": "Critical" | "High" | "Medium" | "Low",
  "recoveryScore": integer between 0 and 100 (Customer Recovery Score: 0-30 critical churn risk, 31-60 high risk, 61-80 moderate, 81-100 high satisfaction),
  "riskLevel": "HIGH" | "MEDIUM" | "LOW",
  "escalated": boolean (true if sentiment is negative/angry/urgent or recoveryScore < 50),
  "nextBestAction": "Clear short operational action recommendation",
  "botMessage": "Empathetic, helpful customer-facing response to the user",
  "followUpQuestion": "A thoughtful follow-up question to help resolve or delight the customer",
  "aiModelUsed": string (model name)
}
`;

async function callGeminiAPI(apiKey, userMessage, customerProfile) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  
  const promptText = `
${SYSTEM_PROMPT}

Customer Profile: Name: ${customerProfile.name}, Tier: ${customerProfile.tier}, Past Orders: ${customerProfile.totalOrders}.
Customer Message: "${userMessage}"
`;

  const payload = {
    contents: [
      {
        parts: [{ text: promptText }]
      }
    ],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json"
    }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gemini API Error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textContent) throw new Error("Empty response from Gemini API");

  const cleanJson = textContent.replace(/```json/g, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(cleanJson);
  parsed.aiModelUsed = "Google Gemini 1.5 Flash (Live API)";
  return parsed;
}

async function callOpenAIAPI(apiKey, userMessage, customerProfile) {
  const url = "https://api.openai.com/v1/chat/completions";
  
  const payload = {
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { 
        role: "user", 
        content: `Customer Profile: Name: ${customerProfile.name}, Tier: ${customerProfile.tier}, Past Orders: ${customerProfile.totalOrders}.\nCustomer Message: "${userMessage}"` 
      }
    ],
    temperature: 0.2,
    response_format: { type: "json_object" }
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`OpenAI API Error (${res.status}): ${errText}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenAI API");

  const parsed = JSON.parse(content);
  parsed.aiModelUsed = "OpenAI GPT-4o-mini (Live API)";
  return parsed;
}

async function analyzeWithLLM(userMessage, customerProfile, customKey = null, provider = null) {
  const geminiKey = customKey || process.env.GEMINI_API_KEY;
  const openAIKey = customKey || process.env.OPENAI_API_KEY;

  if (geminiKey && (provider === 'gemini' || (!provider && geminiKey.startsWith('AIza')))) {
    return await callGeminiAPI(geminiKey, userMessage, customerProfile);
  }

  if (openAIKey && (provider === 'openai' || (!provider && openAIKey.startsWith('sk-')))) {
    return await callOpenAIAPI(openAIKey, userMessage, customerProfile);
  }

  // If geminiKey is available in env
  if (process.env.GEMINI_API_KEY) {
    return await callGeminiAPI(process.env.GEMINI_API_KEY, userMessage, customerProfile);
  }

  // If openAIKey is available in env
  if (process.env.OPENAI_API_KEY) {
    return await callOpenAIAPI(process.env.OPENAI_API_KEY, userMessage, customerProfile);
  }

  return null;
}

module.exports = {
  analyzeWithLLM
};
