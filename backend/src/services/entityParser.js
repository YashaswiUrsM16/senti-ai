/**
 * Contextual Entity & Intent Parser for SentiAI
 */

const { products } = require("../data/syntheticData");

function parseEntitiesAndIntent(text, orderHint = null) {
  const lower = text.toLowerCase();

  // 1. Extract Order ID
  let orderId = orderHint;
  const orderRegex = /(ORD-\d{4}|#[A-Z0-9]{4,6}|order\s*#?\s*\d+)/i;
  const matchOrder = text.match(orderRegex);
  if (matchOrder) {
    orderId = matchOrder[1].toUpperCase();
    if (!orderId.startsWith("ORD-") && !orderId.startsWith("#")) {
      const nums = orderId.replace(/\D/g, "");
      if (nums) orderId = `ORD-${nums}`;
    }
  }

  // 2. Extract Product Name
  let matchedProduct = null;
  for (const p of products) {
    const pName = p.name.toLowerCase();
    const keywords = pName.split(" ").filter(w => w.length > 3);
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score >= 2 || lower.includes(pName)) {
      matchedProduct = p.name;
      break;
    }
  }
  if (!matchedProduct) {
    if (lower.includes("headphone") || lower.includes("earphone")) matchedProduct = "UltraSound Wireless Headphones";
    else if (lower.includes("watch") || lower.includes("smartwatch")) matchedProduct = "OmniFit Smartwatch Series 5";
    else if (lower.includes("chair") || lower.includes("seat")) matchedProduct = "ErgoComfort Ergonomic Chair";
    else if (lower.includes("cookware") || lower.includes("pan") || lower.includes("pot")) matchedProduct = "ChefMaster 10-Piece Cookware Set";
    else matchedProduct = "General Retail Item";
  }

  // 3. Extract Amount ($)
  let amount = null;
  const priceMatch = text.match(/\$\s*(\d+(\.\d{2})?)/);
  if (priceMatch) {
    amount = parseFloat(priceMatch[1]);
  }

  // 4. Issue Category & Intent Classification
  let issueCategory = "General Inquiry";
  let issueType = "General Feedback";
  let urgency = "Low";

  if (lower.includes("delay") || lower.includes("tracking") || lower.includes("late") || lower.includes("promised") || lower.includes("shipping")) {
    issueCategory = "Delivery";
    issueType = "Delivery Delay";
    urgency = lower.includes("urgent") || lower.includes("birthday") || lower.includes("asap") ? "High" : "Medium";
  } else if (lower.includes("charge") || lower.includes("double charged") || lower.includes("bank") || lower.includes("card")) {
    issueCategory = "Payment";
    issueType = "Payment Failure";
    urgency = "High";
  } else if (lower.includes("refund") || lower.includes("credited") || lower.includes("money back")) {
    issueCategory = "Refund";
    issueType = "Refund Delay";
    urgency = "High";
  } else if (lower.includes("broken") || lower.includes("shattered") || lower.includes("damaged") || lower.includes("crack")) {
    issueCategory = "Damaged Product";
    issueType = "Damaged Product";
    urgency = "High";
  } else if (lower.includes("wrong size") || lower.includes("wrong item") || lower.includes("instead of")) {
    issueCategory = "Wrong Item";
    issueType = "Wrong Item Delivered";
    urgency = "Medium";
  } else if (lower.includes("quality") || lower.includes("defective") || lower.includes("stop working")) {
    issueCategory = "Product Quality";
    issueType = "Defective Item";
    urgency = "Medium";
  }

  if (lower.includes("third time") || lower.includes("canceling") || lower.includes("lawyer") || lower.includes("dispute")) {
    urgency = "High";
  }

  return {
    orderId: orderId || "ORD-PENDING",
    product: matchedProduct,
    amount,
    issueCategory,
    issueType,
    urgency
  };
}

module.exports = {
  parseEntitiesAndIntent
};
