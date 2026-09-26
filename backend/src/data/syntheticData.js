/**
 * Synthetic Retail Dataset for SentiAI Customer Experience & Recovery Agent
 */

const categories = ["Delivery", "Product Quality", "Payment", "Refund", "Damaged Product", "Wrong Item", "Customer Service", "Pricing"];

let products = [
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
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
  { 
    id: "PROD-107", 
    name: "ProPure Water Filtration System", 
    category: "Home Appliances", 
    price: 65.00,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80",
    description: "7-stage alkaline mineralizer filter removing 99.9% of microplastics, chlorine, and heavy metals.",
    happyQuotes: [
      "Water tastes fresh like mountain spring. Easy 5-minute under-sink install."
    ],
    latestPraise: {
      customer: "Sarah Jenkins",
      text: "Water tastes fresh like mountain spring. Easy 5-minute under-sink install.",
      time: "1 week ago"
    }
  }
];

const customers = [
  { id: "CUST-9001", name: "Sarah Jenkins", email: "sarah.j@example.com", tier: "VIP Gold", totalOrders: 18, previousComplaints: 2 },
  { id: "CUST-9002", name: "David Chen", email: "david.c@example.com", tier: "Regular", totalOrders: 5, previousComplaints: 0 },
  { id: "CUST-9003", name: "Marcus Brody", email: "m.brody@example.com", tier: "VIP Platinum", totalOrders: 34, previousComplaints: 4 },
  { id: "CUST-9004", name: "Elena Rostova", email: "elena.r@example.com", tier: "Regular", totalOrders: 3, previousComplaints: 1 },
  { id: "CUST-9005", name: "Robert Taylor", email: "rtaylor@example.com", tier: "New", totalOrders: 1, previousComplaints: 0 },
  { id: "CUST-9006", name: "Aisha Khan", email: "aisha.k@example.com", tier: "VIP Gold", totalOrders: 12, previousComplaints: 1 },
  { id: "CUST-9007", name: "Michael Vance", email: "mvance@example.com", tier: "Regular", totalOrders: 8, previousComplaints: 3 }
];

let syntheticFeedbacks = [
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
  },
  {
    id: "FBK-1004",
    customerId: "CUST-9004",
    customerName: "Elena Rostova",
    orderId: "ORD-9021",
    product: "ErgoComfort Ergonomic Chair",
    category: "Payment",
    feedback: "I was double charged $299.50 for Order ORD-9021 and my bank account shows two pending transactions. Please check immediately.",
    sentiment: "Negative",
    sentimentScore: -0.78,
    emotion: "Disappointed",
    intensity: 82,
    severity: "High",
    issueType: "Payment Failure",
    urgency: "High",
    recoveryScore: 35,
    riskLevel: "HIGH",
    nextBestAction: "Initiate Priority Refund & Send Confirmation Email",
    escalated: true,
    escalationStatus: "Assigned",
    resolution: "Finance team alerted for duplicate charge removal.",
    timestamp: "2026-09-26T08:45:00Z"
  },
  {
    id: "FBK-1005",
    customerId: "CUST-9005",
    customerName: "Robert Taylor",
    orderId: "ORD-4412",
    product: "Organic Blend Silk Duvet",
    category: "Delivery",
    feedback: "My order ORD-4412 arrived fine, but the package box was slightly crumpled. Product inside seems undamaged though.",
    sentiment: "Neutral",
    sentimentScore: 0.10,
    emotion: "Neutral",
    intensity: 40,
    severity: "Low",
    issueType: "Packaging Quality",
    urgency: "Low",
    recoveryScore: 78,
    riskLevel: "LOW",
    nextBestAction: "Provide Packaging Feedback & Offer 5% Discount Code",
    escalated: false,
    escalationStatus: "None",
    resolution: "Feedback logged to warehouse ops.",
    timestamp: "2026-09-26T07:15:00Z"
  }
];

function getAllFeedbacks() {
  return syntheticFeedbacks;
}

function addFeedback(feedback) {
  syntheticFeedbacks.unshift(feedback);

  // CRITICAL DUAL ROUTING LOGIC:
  // 1. If sentiment is POSITIVE -> Reflect directly in Product Showcase & Description!
  if (feedback.sentiment === "Positive") {
    const prod = products.find(p => p.name.toLowerCase() === (feedback.product || "").toLowerCase()) || products[0];
    if (prod) {
      if (!prod.happyQuotes) prod.happyQuotes = [];
      prod.happyQuotes.unshift(feedback.feedback);
      prod.latestPraise = {
        customer: feedback.customerName || "Verified Buyer",
        text: feedback.feedback,
        time: "Just now"
      };
      prod.rating = Math.min(5.0, Number((prod.rating + 0.05).toFixed(1)));
    }
  }

  return feedback;
}

function getCustomerById(id) {
  return customers.find(c => c.id === id) || customers[0];
}

module.exports = {
  categories,
  products,
  customers,
  getAllFeedbacks,
  addFeedback,
  getCustomerById
};
