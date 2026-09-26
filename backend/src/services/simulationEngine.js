/**
 * Retailer What-If Scenario Simulation Engine for SentiAI
 */

const { getAllFeedbacks, products } = require("../data/syntheticData");

function runWhatIfSimulation(params) {
  const deliveryIncreasePct = parseFloat(params.deliveryIncreasePct) || 20;
  const categoryFilter = params.category || "Delivery";
  const simulatedTimeframeDays = params.timeframeDays || 30;

  const feedbacks = getAllFeedbacks();

  // Baseline metrics
  const totalCount = feedbacks.length;
  const categoryFeedbacks = feedbacks.filter(f => f.category === categoryFilter || categoryFilter === "All");
  const baselineNegativeCount = categoryFeedbacks.filter(f => f.sentiment === "Negative").length;

  // Projected surge calculations
  const projectedSurgeCount = Math.round(baselineNegativeCount * (1 + deliveryIncreasePct / 100));
  const additionalNegativeCases = projectedSurgeCount - baselineNegativeCount;

  // Affected customer segments projection
  const segmentImpact = [
    { segment: "VIP Gold / Platinum Customers", baselineRisk: "14%", projectedRisk: `${14 + Math.round(deliveryIncreasePct * 0.45)}%`, churnRiskLevel: "High" },
    { segment: "Regular Repeat Buyers", baselineRisk: "22%", projectedRisk: `${22 + Math.round(deliveryIncreasePct * 0.60)}%`, churnRiskLevel: "Critical" },
    { segment: "First-Time Buyers", baselineRisk: "35%", projectedRisk: `${35 + Math.round(deliveryIncreasePct * 0.75)}%`, churnRiskLevel: "Severe" }
  ];

  // Most affected products
  const productImpact = products.map(p => {
    const count = feedbacks.filter(f => f.product === p.name && f.sentiment === "Negative").length;
    const projectedCount = Math.round(count * (1 + deliveryIncreasePct / 100)) + Math.floor(Math.random() * 3);
    const estimatedLoss = projectedCount * p.price * 1.8; // CLV loss factor
    return {
      productName: p.name,
      category: p.category,
      currentNegatives: count,
      projectedNegatives: projectedCount,
      estimatedRevenueAtRisk: Math.round(estimatedLoss)
    };
  }).sort((a, b) => b.projectedNegatives - a.projectedNegatives).slice(0, 4);

  // Overall financial impact estimate
  const estimatedAnnualRevenueRisk = Math.round(additionalNegativeCases * 450 * 12);

  // AI Strategic Recommendations
  const recommendations = [
    `Deploy regional 3PL logistics backup for ${categoryFilter} routes to buffer peak carrier delays.`,
    `Automate proactive SMS alerts & $10 courtesy vouchers for orders delayed over 24 hours before customer files a complaint.`,
    `Prioritize high-risk VIP Gold/Platinum accounts in customer support triage matrix.`
  ];

  return {
    scenarioTitle: `Surge Simulation: +${deliveryIncreasePct}% Increase in ${categoryFilter} Issues`,
    parameters: {
      deliveryIncreasePct,
      categoryFilter,
      simulatedTimeframeDays
    },
    metrics: {
      currentNegativeCases: baselineNegativeCount,
      projectedNegativeCases: projectedSurgeCount,
      additionalMonthlyCases: additionalNegativeCases,
      estimatedRevenueRisk: `$${estimatedAnnualRevenueRisk.toLocaleString()}`
    },
    segmentImpact,
    productImpact,
    recommendations
  };
}

module.exports = {
  runWhatIfSimulation
};
