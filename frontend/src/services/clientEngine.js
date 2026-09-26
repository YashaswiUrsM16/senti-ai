// Client-side NLP & Multi-Emotion Processing Engine for SentiAI
// Ensures 100% real-time interactive demo on standalone Vercel deployments

export const initialProducts = [
  { 
    id: "PROD-101", 
    name: "UltraSound Wireless Headphones", 
    category: "Electronics", 
    price: 149.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    description: "Industry-leading active noise cancellation with 40-hour battery life and spatial audio immersion.",
    happyQuotes: [
      "Incredible sound quality and battery life! The noise cancellation is top notch.",
      "Best headphones I have ever bought, seamless Bluetooth connection."
    ],
    latestPraise: {
      customer: "Elena Rostova",
      text: "Incredible sound quality and battery life! The noise cancellation is top notch.",
      time: "2 hours ago"
    },
    positivePercentage: 95,
    totalReviews: 24,
    status: "Healthy"
  },
  { 
    id: "PROD-102", 
    name: "OmniFit Smartwatch Series 5", 
    category: "Electronics", 
    price: 229.00,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    description: "Advanced health & fitness tracking, AMOLED display, ECG monitor, and 7-day battery stamina.",
    happyQuotes: [
      "Crisp display, ultra-lightweight on the wrist, and tracks my workouts flawlessly!",
      "Received my smartwatch today! Incredible battery life, crisp display and seamless syncing."
    ],
    latestPraise: {
      customer: "David Chen",
      text: "Received my smartwatch today! Incredible battery life, crisp display and seamless syncing.",
      time: "1 hour ago"
    },
    positivePercentage: 98,
    totalReviews: 32,
    status: "Healthy"
  },
  { 
    id: "PROD-103", 
    name: "ErgoComfort Ergonomic Chair", 
    category: "Furniture", 
    price: 299.50,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1580481077195-c2f82630e882?w=600&auto=format&fit=crop&q=80",
    description: "Medical-grade lumbar support, breathable mesh, and customizable 3D armrests for 12-hour work comfort.",
    happyQuotes: [
      "Cured my lower back fatigue after just 2 days. Build quality is solid steel."
    ],
    latestPraise: {
      customer: "Marcus Brody",
      text: "Cured my lower back fatigue after just 2 days. Build quality is solid steel.",
      time: "Yesterday"
    },
    positivePercentage: 88,
    totalReviews: 19,
    status: "Needs Monitoring"
  },
  { 
    id: "PROD-104", 
    name: "Organic Blend Silk Duvet", 
    category: "Home & Bedding", 
    price: 89.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80",
    description: "100% organic mulberry silk filling encased in 400-thread-count breathable cotton weave.",
    happyQuotes: [
      "Softest comforter I have ever owned. Regulates temperature like magic."
    ],
    latestPraise: {
      customer: "Aisha Khan",
      text: "Softest comforter I have ever owned. Regulates temperature like magic.",
      time: "3 days ago"
    },
    positivePercentage: 91,
    totalReviews: 14,
    status: "Healthy"
  },
  { 
    id: "PROD-105", 
    name: "ChefMaster 10-Piece Cookware Set", 
    category: "Kitchen", 
    price: 179.95,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1584990347449-3079b7662d51?w=600&auto=format&fit=crop&q=80",
    description: "Hard-anodized nonstick aluminum with stay-cool riveted silicone handles, oven-safe up to 450°F.",
    happyQuotes: [
      "Food glides right off without oil. Beautiful finish and heats evenly."
    ],
    latestPraise: {
      customer: "Robert Taylor",
      text: "Food glides right off without oil. Beautiful finish and heats evenly.",
      time: "4 days ago"
    },
    positivePercentage: 79,
    totalReviews: 28,
    status: "Critical Alert"
  },
  { 
    id: "PROD-106", 
    name: "AeroGlide Running Shoes", 
    category: "Apparel", 
    price: 119.00,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    description: "Responsive nitrogen-infused foam midsole with engineered knit upper for maximum marathon speed.",
    happyQuotes: [
      "Feels like walking on clouds. Ran 10 miles with zero blisters!"
    ],
    latestPraise: {
      customer: "Michael Vance",
      text: "Feels like walking on clouds. Ran 10 miles with zero blisters!",
      time: "5 days ago"
    },
    positivePercentage: 96,
    totalReviews: 45,
    status: "Healthy"
  }
];

export const initialFeedbacks = [
  {
    id: "FBK-1001",
    customerId: "CUST-9001",
    customerName: "Sarah Jenkins",
    orderId: "ORD-8821",
    product: "UltraSound Wireless Headphones",
    category: "Delivery",
    feedback: "Order ORD-8821 was promised 3 days ago for my daughter's birthday! Tracking shows no update. Extremely frustrated with delayed delivery!",
    sentiment: "Negative",
    sentimentScore: -0.85,
    emotion: "Frustrated",
    intensity: 88,
    severity: "High",
    issueType: "Delivery Delay",
    urgency: "High",
    recoveryScore: 42,
    riskLevel: "HIGH",
    nextBestAction: "Prioritize Shipping & Issue $15 Store Credit",
    escalated: true,
    escalationStatus: "Pending",
    resolution: "Agent assigned, priority express dispatch initiated.",
    timestamp: "2026-09-26T10:14:00Z"
  },
  {
    id: "FBK-1002",
    customerId: "CUST-9003",
    customerName: "Marcus Brody",
    orderId: "ORD-3310",
    product: "ChefMaster 10-Piece Cookware Set",
    category: "Damaged Product",
    feedback: "This is the THIRD TIME order ORD-3310 arrived broken! Glass lid shattered. Terrible service. I am canceling my VIP account!",
    sentiment: "Negative",
    sentimentScore: -0.96,
    emotion: "Angry",
    intensity: 95,
    severity: "Critical",
    issueType: "Damaged Product",
    urgency: "High",
    recoveryScore: 18,
    riskLevel: "HIGH",
    nextBestAction: "Escalate to Human Agent & Issue Full Refund + VIP Credit",
    escalated: true,
    escalationStatus: "Pending",
    resolution: "Awaiting senior agent outreach.",
    timestamp: "2026-09-26T11:05:00Z"
  },
  {
    id: "FBK-1003",
    customerId: "CUST-9002",
    customerName: "David Chen",
    orderId: "ORD-5501",
    product: "OmniFit Smartwatch Series 5",
    category: "Product Quality",
    feedback: "Received my smartwatch today! Incredible battery life, crisp display and seamless syncing with my phone. Highly satisfied!",
    sentiment: "Positive",
    sentimentScore: 0.92,
    emotion: "Delighted",
    intensity: 90,
    severity: "Low",
    issueType: "General Feedback",
    urgency: "Low",
    recoveryScore: 95,
    riskLevel: "LOW",
    nextBestAction: "Express Gratitude & Offer Loyalty Reward Points",
    escalated: false,
    escalationStatus: "None",
    resolution: "Automated Thank-you sent.",
    timestamp: "2026-09-26T09:30:00Z"
  }
];

const emotionKeywords = {
  Angry: ["furious", "angry", "outraged", "terrible", "disaster", "lawsuit", "shattered", "canceling", "cancel my account", "scam", "worst", "unacceptable"],
  Frustrated: ["frustrated", "delayed", "promised", "no update", "still haven't", "waiting", "taking so long", "annoyed", "ridiculous", "again", "slow", "late"],
  Disappointed: ["disappointed", "poor quality", "defective", "not as expected", "crumpled", "broken", "cheap", "waste of money", "dissatisfied"],
  Urgent: ["immediately", "asap", "urgent", "emergency", "bank overdrawn", "double charged", "right now"],
  Satisfied: ["satisfied", "good", "nice", "fine", "received", "decent", "arrived", "thanks", "thank you"],
  Delighted: ["incredible", "amazing", "love it", "excellent", "awesome", "fantastic", "perfect", "seamless", "highly satisfied", "great job", "fast delivery", "5 star", "5 stars", "5★"]
};

export function clientAnalyzeSentiment(text) {
  const lower = text.toLowerCase();
  const emotionScores = { Angry: 0, Frustrated: 0, Disappointed: 0, Urgent: 0, Satisfied: 0, Delighted: 0 };
  let maxScore = 0;
  let primaryEmotion = "Neutral";

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        emotionScores[emotion] += 1;
        if (emotionScores[emotion] > maxScore) {
          maxScore = emotionScores[emotion];
          primaryEmotion = emotion;
        }
      }
    }
  }

  if (primaryEmotion === "Neutral") {
    if (lower.includes("not") || lower.includes("delay") || lower.includes("issue") || lower.includes("wrong") || lower.includes("broken") || lower.includes("late")) {
      primaryEmotion = "Frustrated";
    } else if (lower.includes("great") || lower.includes("thanks") || lower.includes("love") || lower.includes("fast") || lower.includes("good")) {
      primaryEmotion = "Delighted";
    }
  }

  let sentiment = "Neutral";
  let sentimentScore = 0.0;
  let intensity = 50;

  if (["Angry", "Frustrated", "Disappointed"].includes(primaryEmotion)) {
    sentiment = "Negative";
    intensity = primaryEmotion === "Angry" ? 95 : primaryEmotion === "Frustrated" ? 88 : 80;
    sentimentScore = primaryEmotion === "Angry" ? -0.92 : primaryEmotion === "Frustrated" ? -0.78 : -0.65;
  } else if (["Delighted", "Satisfied"].includes(primaryEmotion)) {
    sentiment = "Positive";
    sentimentScore = primaryEmotion === "Delighted" ? 0.92 : 0.65;
    intensity = primaryEmotion === "Delighted" ? 92 : 65;
  }

  // Extract Order ID
  const orderMatch = text.match(/ORD-[\d]{3,5}/i);
  const orderId = orderMatch ? orderMatch[0].toUpperCase() : (sentiment === "Negative" ? "ORD-8821" : null);

  // Extract Product
  let detectedProduct = "OmniFit Smartwatch Series 5";
  if (lower.includes("headphone") || lower.includes("sound")) detectedProduct = "UltraSound Wireless Headphones";
  else if (lower.includes("watch") || lower.includes("smartwatch") || lower.includes("omnifit")) detectedProduct = "OmniFit Smartwatch Series 5";
  else if (lower.includes("chair") || lower.includes("ergonomic")) detectedProduct = "ErgoComfort Ergonomic Chair";
  else if (lower.includes("cookware") || lower.includes("pan") || lower.includes("pot") || lower.includes("lid")) detectedProduct = "ChefMaster 10-Piece Cookware Set";
  else if (lower.includes("duvet") || lower.includes("bedding") || lower.includes("silk")) detectedProduct = "Organic Blend Silk Duvet";
  else if (lower.includes("shoes") || lower.includes("running")) detectedProduct = "AeroGlide Running Shoes";

  // Score Calculation (Customer Recovery Score)
  let recoveryScore = 75;
  let riskLevel = "LOW";
  let nextBestAction = "Provide friendly assistance & product tips";
  let botMessage = "";
  let followUpQuestion = "";

  if (sentiment === "Positive") {
    recoveryScore = 95;
    riskLevel = "LOW";
    nextBestAction = "Express Gratitude & Feature Review on Product Page";
    botMessage = `🌟 Thank you so much for the glowing review for the ${detectedProduct}! Your praise has been featured live on the product card to guide fellow shoppers. We've added 100 VIP loyalty points to your account!`;
    followUpQuestion = "Is there anything else I can assist you with today, Sarah?";
  } else if (sentiment === "Negative") {
    recoveryScore = primaryEmotion === "Angry" ? 22 : 38;
    riskLevel = "HIGH";
    nextBestAction = "Escalate to Senior Dispatch & Issue Priority Store Credit";
    botMessage = `🚨 I deeply apologize for this frustrating experience${orderId ? ` with order ${orderId}` : ''}. I have immediately escalated this to our Senior Resolution Desk with an Urgent priority flag. We are issuing an automatic tracking expediter and $15 instant store credit for the inconvenience.`;
    followUpQuestion = "Would you like me to connect you with our live expedited fulfillment manager?";
  } else {
    recoveryScore = 72;
    riskLevel = "LOW";
    botMessage = `I'd be glad to help you with information about the ${detectedProduct}. It features top-tier durability, verified ratings, and our 30-day money-back guarantee.`;
    followUpQuestion = "Would you like to check available colors or add it to your cart?";
  }

  return {
    sentimentData: { sentiment, sentimentScore, primaryEmotion, intensity },
    entityData: { product: detectedProduct, orderId, category: sentiment === "Negative" ? "Delivery" : "Product Quality" },
    scoreData: { recoveryScore, riskLevel, nextBestAction },
    responseData: { botMessage, followUpQuestion }
  };
}
