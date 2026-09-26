const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.resolve(__dirname, 'sentiai.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Failed to connect to SQLite Database:', err.message);
  } else {
    console.log('✅ Connected to SQLite Database (sentiai.db)');
  }
});

// Initialize Tables
db.serialize(() => {
  // 1. Feedbacks Table
  db.run(`
    CREATE TABLE IF NOT EXISTS feedbacks (
      id TEXT PRIMARY KEY,
      customerId TEXT,
      customerName TEXT,
      orderId TEXT,
      product TEXT,
      category TEXT,
      feedback TEXT,
      sentiment TEXT,
      sentimentScore REAL,
      emotion TEXT,
      intensity INTEGER,
      severity TEXT,
      recoveryScore INTEGER,
      riskLevel TEXT,
      nextBestAction TEXT,
      escalated INTEGER,
      escalationStatus TEXT,
      resolution TEXT,
      timestamp TEXT
    )
  `);

  // 2. Products Table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT UNIQUE,
      category TEXT,
      price REAL,
      rating REAL,
      image TEXT,
      description TEXT,
      positivePercentage INTEGER,
      totalReviews INTEGER,
      latestPraiseCustomer TEXT,
      latestPraiseText TEXT,
      latestPraiseTime TEXT,
      happyQuotes TEXT
    )
  `);

  // 3. Chat Logs Table
  db.run(`
    CREATE TABLE IF NOT EXISTS chat_logs (
      id TEXT PRIMARY KEY,
      sessionId TEXT,
      customerId TEXT,
      sender TEXT,
      text TEXT,
      followUp TEXT,
      sentiment TEXT,
      timestamp TEXT
    )
  `);

  // Seed Initial Products if empty
  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (!err && row && row.count === 0) {
      const initialProducts = [
        {
          id: "PROD-101",
          name: "UltraSound Wireless Headphones",
          category: "Electronics",
          price: 149.99,
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
          description: "Industry-leading active noise cancellation with 40-hour battery life and spatial audio immersion.",
          positivePercentage: 95,
          totalReviews: 24,
          latestPraiseCustomer: "Elena Rostova",
          latestPraiseText: "Incredible sound quality and battery life! The noise cancellation is top notch.",
          latestPraiseTime: "2 hours ago",
          happyQuotes: JSON.stringify(["Incredible sound quality and battery life! The noise cancellation is top notch.", "Best headphones I have ever bought, seamless Bluetooth connection."])
        },
        {
          id: "PROD-102",
          name: "OmniFit Smartwatch Series 5",
          category: "Electronics",
          price: 229.00,
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
          description: "Advanced health & fitness tracking, AMOLED display, ECG monitor, and 7-day battery stamina.",
          positivePercentage: 98,
          totalReviews: 32,
          latestPraiseCustomer: "David Chen",
          latestPraiseText: "Received my smartwatch today! Incredible battery life, crisp display and seamless syncing.",
          latestPraiseTime: "1 hour ago",
          happyQuotes: JSON.stringify(["Crisp display, ultra-lightweight on the wrist, and tracks my workouts flawlessly!", "Received my smartwatch today! Incredible battery life, crisp display and seamless syncing."])
        },
        {
          id: "PROD-103",
          name: "ErgoComfort Ergonomic Chair",
          category: "Furniture",
          price: 299.50,
          rating: 4.7,
          image: "https://images.unsplash.com/photo-1580481077195-c2f82630e882?w=600&auto=format&fit=crop&q=80",
          description: "Medical-grade lumbar support, breathable mesh, and customizable 3D armrests for 12-hour work comfort.",
          positivePercentage: 88,
          totalReviews: 19,
          latestPraiseCustomer: "Marcus Brody",
          latestPraiseText: "Cured my lower back fatigue after just 2 days. Build quality is solid steel.",
          latestPraiseTime: "Yesterday",
          happyQuotes: JSON.stringify(["Cured my lower back fatigue after just 2 days. Build quality is solid steel."])
        },
        {
          id: "PROD-104",
          name: "Organic Blend Silk Duvet",
          category: "Home & Bedding",
          price: 89.99,
          rating: 4.6,
          image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&auto=format&fit=crop&q=80",
          description: "100% organic mulberry silk filling encased in 400-thread-count breathable cotton weave.",
          positivePercentage: 91,
          totalReviews: 14,
          latestPraiseCustomer: "Aisha Khan",
          latestPraiseText: "Softest comforter I have ever owned. Regulates temperature like magic.",
          latestPraiseTime: "3 days ago",
          happyQuotes: JSON.stringify(["Softest comforter I have ever owned. Regulates temperature like magic."])
        },
        {
          id: "PROD-105",
          name: "ChefMaster 10-Piece Cookware Set",
          category: "Kitchen",
          price: 179.95,
          rating: 4.5,
          image: "https://images.unsplash.com/photo-1584990347449-3079b7662d51?w=600&auto=format&fit=crop&q=80",
          description: "Hard-anodized nonstick aluminum with stay-cool riveted silicone handles, oven-safe up to 450°F.",
          positivePercentage: 79,
          totalReviews: 28,
          latestPraiseCustomer: "Robert Taylor",
          latestPraiseText: "Food glides right off without oil. Beautiful finish and heats evenly.",
          latestPraiseTime: "4 days ago",
          happyQuotes: JSON.stringify(["Food glides right off without oil. Beautiful finish and heats evenly."])
        },
        {
          id: "PROD-106",
          name: "AeroGlide Running Shoes",
          category: "Apparel",
          price: 119.00,
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
          description: "Responsive nitrogen-infused foam midsole with engineered knit upper for maximum marathon speed.",
          positivePercentage: 96,
          totalReviews: 45,
          latestPraiseCustomer: "Michael Vance",
          latestPraiseText: "Feels like walking on clouds. Ran 10 miles with zero blisters!",
          latestPraiseTime: "5 days ago",
          happyQuotes: JSON.stringify(["Feels like walking on clouds. Ran 10 miles with zero blisters!"])
        }
      ];

      const stmt = db.prepare(`
        INSERT INTO products (id, name, category, price, rating, image, description, positivePercentage, totalReviews, latestPraiseCustomer, latestPraiseText, latestPraiseTime, happyQuotes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      initialProducts.forEach(p => {
        stmt.run(p.id, p.name, p.category, p.price, p.rating, p.image, p.description, p.positivePercentage, p.totalReviews, p.latestPraiseCustomer, p.latestPraiseText, p.latestPraiseTime, p.happyQuotes);
      });
      stmt.finalize();
      console.log('✅ Initialized products table with 6 default catalog items.');
    }
  });

  // Seed Initial Feedbacks if empty
  db.get("SELECT COUNT(*) as count FROM feedbacks", (err, row) => {
    if (!err && row && row.count === 0) {
      const initialFeedbacks = [
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
          recoveryScore: 42,
          riskLevel: "HIGH",
          nextBestAction: "Prioritize Shipping & Issue $15 Store Credit",
          escalated: 1,
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
          recoveryScore: 18,
          riskLevel: "HIGH",
          nextBestAction: "Escalate to Human Agent & Issue Full Refund + VIP Credit",
          escalated: 1,
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
          recoveryScore: 95,
          riskLevel: "LOW",
          nextBestAction: "Express Gratitude & Offer Loyalty Reward Points",
          escalated: 0,
          escalationStatus: "None",
          resolution: "Automated Thank-you sent.",
          timestamp: "2026-09-26T09:30:00Z"
        }
      ];

      const stmt = db.prepare(`
        INSERT INTO feedbacks (id, customerId, customerName, orderId, product, category, feedback, sentiment, sentimentScore, emotion, intensity, severity, recoveryScore, riskLevel, nextBestAction, escalated, escalationStatus, resolution, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      initialFeedbacks.forEach(f => {
        stmt.run(f.id, f.customerId, f.customerName, f.orderId, f.product, f.category, f.feedback, f.sentiment, f.sentimentScore, f.emotion, f.intensity, f.severity, f.recoveryScore, f.riskLevel, f.nextBestAction, f.escalated, f.escalationStatus, f.resolution, f.timestamp);
      });
      stmt.finalize();
      console.log('✅ Initialized feedbacks table with seed data.');
    }
  });
});

// Database Access Methods
const dbOperations = {
  // Insert feedback
  saveFeedback: (item) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO feedbacks (id, customerId, customerName, orderId, product, category, feedback, sentiment, sentimentScore, emotion, intensity, severity, recoveryScore, riskLevel, nextBestAction, escalated, escalationStatus, resolution, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.run(query, [
        item.id,
        item.customerId || 'CUST-9001',
        item.customerName || 'Sarah Jenkins',
        item.orderId || null,
        item.product || 'OmniFit Smartwatch Series 5',
        item.category || 'Customer Service',
        item.feedback,
        item.sentiment,
        item.sentimentScore,
        item.emotion,
        item.intensity,
        item.severity || 'Medium',
        item.recoveryScore,
        item.riskLevel,
        item.nextBestAction,
        item.escalated ? 1 : 0,
        item.escalationStatus || 'Pending',
        item.resolution || null,
        item.timestamp || new Date().toISOString()
      ], function(err) {
        if (err) return reject(err);

        // If positive praise, update product in database
        if (item.sentiment === 'Positive') {
          db.run(`
            UPDATE products 
            SET latestPraiseCustomer = ?, latestPraiseText = ?, latestPraiseTime = 'Just now', rating = MIN(5.0, rating + 0.05), totalReviews = totalReviews + 1
            WHERE name LIKE ? OR id = 'PROD-102'
          `, [item.customerName || 'Sarah Jenkins', item.feedback, `%${item.product}%`]);
        }

        resolve({ id: item.id, ...item });
      });
    });
  },

  // Get all feedbacks
  getAllFeedbacks: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM feedbacks ORDER BY timestamp DESC", [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(r => ({ ...r, escalated: Boolean(r.escalated) })));
      });
    });
  },

  // Get all products
  getAllProducts: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM products", [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows.map(r => ({
          ...r,
          happyQuotes: r.happyQuotes ? JSON.parse(r.happyQuotes) : [],
          latestPraise: r.latestPraiseCustomer ? {
            customer: r.latestPraiseCustomer,
            text: r.latestPraiseText,
            time: r.latestPraiseTime
          } : null
        })));
      });
    });
  },

  // Save Chat Log
  saveChatLog: (log) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO chat_logs (id, sessionId, customerId, sender, text, followUp, sentiment, timestamp)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.run(query, [
        log.id || `log-${Date.now()}`,
        log.sessionId || 'SESSION-1',
        log.customerId || 'CUST-9001',
        log.sender,
        log.text,
        log.followUp || null,
        log.sentiment || null,
        log.timestamp || new Date().toISOString()
      ], function(err) {
        if (err) return reject(err);
        resolve(log);
      });
    });
  },

  // Update escalation status & resolution
  updateEscalation: (id, status, resolution) => {
    return new Promise((resolve, reject) => {
      db.run(
        "UPDATE feedbacks SET escalationStatus = ?, resolution = ? WHERE id = ?",
        [status, resolution, id],
        function(err) {
          if (err) return reject(err);
          resolve({ id, status, resolution, changes: this.changes });
        }
      );
    });
  },

  // Get Database Explorer Statistics
  getDbStats: () => {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT 
          (SELECT COUNT(*) FROM feedbacks) as totalFeedbacks,
          (SELECT COUNT(*) FROM products) as totalProducts,
          (SELECT COUNT(*) FROM chat_logs) as totalChatLogs,
          (SELECT COUNT(*) FROM feedbacks WHERE sentiment = 'Positive') as positiveCount,
          (SELECT COUNT(*) FROM feedbacks WHERE sentiment = 'Negative') as negativeCount,
          (SELECT COUNT(*) FROM feedbacks WHERE escalated = 1) as escalatedCount
      `, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0] || {});
      });
    });
  }
};

module.exports = {
  db,
  dbOperations
};
