const express = require("express");
const router = express.Router();
const { getAllFeedbacks, products } = require("../data/syntheticData");

// GET /api/analytics/dashboard
router.get("/dashboard", (req, res) => {
  try {
    const feedbacks = getAllFeedbacks();

    const totalCount = feedbacks.length;
    let posCount = 0, neuCount = 0, negCount = 0;
    let lowRiskCount = 0, medRiskCount = 0, highRiskCount = 0;
    let sumScore = 0;

    const emotionMap = {};
    const categoryMap = {};
    const riskMap = { LOW: 0, MEDIUM: 0, HIGH: 0 };

    feedbacks.forEach(f => {
      // Sentiment
      if (f.sentiment === "Positive") posCount++;
      else if (f.sentiment === "Neutral") neuCount++;
      else if (f.sentiment === "Negative") negCount++;

      // Emotions
      emotionMap[f.emotion] = (emotionMap[f.emotion] || 0) + 1;

      // Category
      categoryMap[f.category] = (categoryMap[f.category] || 0) + 1;

      // Risk
      if (riskMap[f.riskLevel] !== undefined) {
        riskMap[f.riskLevel]++;
      }

      sumScore += (f.recoveryScore || 50);
    });

    const avgRecoveryScore = totalCount > 0 ? Math.round(sumScore / totalCount) : 75;

    // Emotion distribution array for charts
    const emotionDistribution = Object.keys(emotionMap).map(key => ({
      name: key,
      count: emotionMap[key]
    }));

    // Category distribution array
    const categoryDistribution = Object.keys(categoryMap).map(key => ({
      category: key,
      count: categoryMap[key]
    }));

    // Sentiment trends mock timeline
    const sentimentTrend = [
      { day: "Mon", positive: 65, neutral: 20, negative: 15 },
      { day: "Tue", positive: 60, neutral: 25, negative: 15 },
      { day: "Wed", positive: 58, neutral: 22, negative: 20 },
      { day: "Thu", positive: 55, neutral: 20, negative: 25 },
      { day: "Fri", positive: 52, neutral: 18, negative: 30 },
      { day: "Sat", positive: 68, neutral: 20, negative: 12 },
      { day: "Today", positive: Math.round((posCount / totalCount) * 100), neutral: Math.round((neuCount / totalCount) * 100), negative: Math.round((negCount / totalCount) * 100) }
    ];

    // High risk and escalated items
    const highRiskItems = feedbacks.filter(f => f.riskLevel === "HIGH" || f.escalated);

    return res.json({
      success: true,
      kpis: {
        totalFeedback: totalCount,
        positivePercentage: Math.round((posCount / totalCount) * 100) || 0,
        neutralPercentage: Math.round((neuCount / totalCount) * 100) || 0,
        negativePercentage: Math.round((negCount / totalCount) * 100) || 0,
        avgRecoveryScore,
        totalEscalated: highRiskItems.length
      },
      sentimentDistribution: [
        { name: "Positive", value: posCount, color: "#10B981" },
        { name: "Neutral", value: neuCount, color: "#F59E0B" },
        { name: "Negative", value: negCount, color: "#EF4444" }
      ],
      emotionDistribution,
      categoryDistribution,
      sentimentTrend,
      riskDistribution: [
        { name: "Low Risk", count: riskMap.LOW, color: "#10B981" },
        { name: "Medium Risk", count: riskMap.MEDIUM, color: "#F59E0B" },
        { name: "High Risk", count: riskMap.HIGH, color: "#EF4444" }
      ],
      highRiskFeedbacks: highRiskItems.slice(0, 10),
      recentFeedbacks: feedbacks.slice(0, 8)
    });
  } catch (err) {
    console.error("Error generating analytics:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/analytics/products
router.get("/products", (req, res) => {
  try {
    const feedbacks = getAllFeedbacks();
    
    const productStats = products.map(p => {
      const pFeedbacks = feedbacks.filter(f => f.product === p.name);
      const total = pFeedbacks.length;
      const positives = pFeedbacks.filter(f => f.sentiment === "Positive").length;
      const negatives = pFeedbacks.filter(f => f.sentiment === "Negative").length;
      const avgScore = total > 0 ? Math.round(pFeedbacks.reduce((acc, curr) => acc + (curr.recoveryScore || 50), 0) / total) : 80;

      return {
        id: p.id,
        name: p.name,
        category: p.category,
        price: p.price,
        image: p.image,
        description: p.description,
        rating: p.rating,
        happyQuotes: p.happyQuotes || [],
        latestPraise: p.latestPraise || null,
        totalReviews: total,
        positivePercentage: total > 0 ? Math.round((positives / total) * 100) : 85,
        negativeCount: negatives,
        avgRecoveryScore: avgScore,
        status: avgScore < 45 ? "Critical Alert" : avgScore < 70 ? "Needs Monitoring" : "Healthy"
      };
    });

    return res.json({
      success: true,
      products: productStats
    });
  } catch (err) {
    console.error("Error fetching product analytics:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
