/**
 * Multi-Dimensional NLP Sentiment & Emotion Engine for SentiAI
 */

const emotionKeywords = {
  Angry: ["furious", "angry", "outraged", "terrible", "disaster", "lawsuit", "shattered", "canceling", "cancel my account", "lawyer", "scam", "worst", "unacceptable"],
  Frustrated: ["frustrated", "delayed", "promised", "no update", "still haven't", "waiting", "taking so long", "annoyed", "ridiculous", "again", "slow"],
  Disappointed: ["disappointed", "poor quality", "defective", "not as expected", "crumpled", "broken", "cheap", "waste of money", "dissatisfied"],
  Urgent: ["immediately", "asap", "urgent", "race this weekend", "today", "emergency", "bank overdrawn", "double charged", "right now"],
  Satisfied: ["satisfied", "good", "nice", "fine", "received", "decent", "arrived", "thanks", "thank you"],
  Delighted: ["incredible", "amazing", "love it", "excellent", "awesome", "fantastic", "perfect", "seamless", "highly satisfied", "great job", "fast delivery"]
};

function analyzeSentimentAndEmotion(text) {
  const lower = text.toLowerCase();
  
  // Calculate emotion scores
  const emotionScores = {
    Angry: 0,
    Frustrated: 0,
    Disappointed: 0,
    Urgent: 0,
    Satisfied: 0,
    Delighted: 0
  };

  let totalHits = 0;

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        emotionScores[emotion] += 1;
        totalHits += 1;
      }
    }
  }

  // Determine primary emotion
  let primaryEmotion = "Neutral";
  let maxScore = 0;

  for (const [emotion, score] of Object.entries(emotionScores)) {
    if (score > maxScore) {
      maxScore = score;
      primaryEmotion = emotion;
    }
  }

  // Default fallback heuristics based on exclamation marks, capital letters or negative indicators
  if (primaryEmotion === "Neutral") {
    if (lower.includes("not") || lower.includes("delay") || lower.includes("issue") || lower.includes("wrong") || lower.includes("broken")) {
      primaryEmotion = "Frustrated";
    } else if (lower.includes("great") || lower.includes("thanks") || lower.includes("love") || lower.includes("fast")) {
      primaryEmotion = "Delighted";
    }
  }

  // Determine sentiment category & numerical score (-1.0 to +1.0)
  let sentiment = "Neutral";
  let sentimentScore = 0.0;
  let intensity = 50;

  if (["Angry", "Frustrated", "Disappointed"].includes(primaryEmotion)) {
    sentiment = "Negative";
    if (primaryEmotion === "Angry") {
      sentimentScore = -0.90 - Math.min(0.09, maxScore * 0.03);
      intensity = Math.min(98, 85 + maxScore * 4);
    } else if (primaryEmotion === "Frustrated") {
      sentimentScore = -0.75 - Math.min(0.15, maxScore * 0.03);
      intensity = Math.min(92, 70 + maxScore * 5);
    } else {
      sentimentScore = -0.60 - Math.min(0.20, maxScore * 0.03);
      intensity = Math.min(85, 60 + maxScore * 5);
    }
  } else if (["Delighted", "Satisfied"].includes(primaryEmotion)) {
    sentiment = "Positive";
    sentimentScore = primaryEmotion === "Delighted" ? 0.90 : 0.65;
    intensity = primaryEmotion === "Delighted" ? Math.min(95, 80 + maxScore * 5) : 65;
  } else if (primaryEmotion === "Urgent") {
    sentiment = "Negative";
    sentimentScore = -0.70;
    intensity = 82;
  }

  // Text punctuation intensity booster
  if (text.includes("!") || text === text.toUpperCase() && text.length > 10) {
    intensity = Math.min(99, intensity + 8);
  }

  return {
    sentiment,
    sentimentScore: parseFloat(sentimentScore.toFixed(2)),
    primaryEmotion,
    intensity: Math.round(intensity)
  };
}

module.exports = {
  analyzeSentimentAndEmotion
};
