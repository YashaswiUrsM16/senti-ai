import React, { createContext, useState, useEffect } from 'react';
import { initialProducts, initialFeedbacks, clientAnalyzeSentiment } from '../services/clientEngine';

export const AppContext = createContext();

const INITIAL_MESSAGES = [
  {
    id: 'init-1',
    sender: 'bot',
    text: "Hi Sarah! 👋 Welcome to SentiStore. I'm your SentiAI shopping & support assistant. Need help with product recommendations, order tracking, or sharing your experience?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

export const AppProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('store');
  const [activePersona, setActivePersona] = useState('customer');
  const [liveAnalysis, setLiveAnalysis] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const [productData, setProductData] = useState(initialProducts);
  const [escalations, setEscalations] = useState(initialFeedbacks);
  const [dashboardData, setDashboardData] = useState(null);
  const [insights, setInsights] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);

  // Persistent Chat History
  const [chatMessages, setChatMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('sentiai_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error reading chat history from localStorage", e);
    }
    return INITIAL_MESSAGES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('sentiai_chat_history', JSON.stringify(chatMessages));
    } catch (e) {
      console.error("Error saving chat history to localStorage", e);
    }
  }, [chatMessages]);

  const resetChatHistory = () => {
    setChatMessages(INITIAL_MESSAGES);
    setLiveAnalysis(null);
    try {
      localStorage.removeItem('sentiai_chat_history');
    } catch (e) {
      console.error("Error clearing chat history", e);
    }
  };

  // Dual-Action Real-Time Feedback Dispatch
  const processClientFeedback = (feedbackText, analysis) => {
    const { sentimentData, entityData, scoreData, responseData } = analysis;
    setLiveAnalysis(analysis);

    if (sentimentData.sentiment === 'Positive') {
      setProductData(prev => prev.map(p => {
        if (p.name.toLowerCase().includes(entityData.product.toLowerCase()) || p.id === "PROD-102") {
          return {
            ...p,
            rating: Math.min(5.0, Number((p.rating + 0.05).toFixed(1))),
            latestPraise: {
              customer: "Sarah Jenkins (You)",
              text: feedbackText,
              time: "Just now"
            },
            happyQuotes: [feedbackText, ...(p.happyQuotes || [])]
          };
        }
        return p;
      }));
    } else if (sentimentData.sentiment === 'Negative') {
      const newEscalation = {
        id: `FBK-${Date.now().toString().slice(-4)}`,
        customerId: "CUST-9001",
        customerName: "Sarah Jenkins",
        orderId: entityData.orderId || "ORD-8821",
        product: entityData.product || "UltraSound Wireless Headphones",
        category: entityData.category || "Delivery",
        feedback: feedbackText,
        sentiment: "Negative",
        sentimentScore: sentimentData.sentimentScore,
        emotion: sentimentData.primaryEmotion,
        intensity: sentimentData.intensity,
        severity: sentimentData.primaryEmotion === "Angry" ? "Critical" : "High",
        recoveryScore: scoreData.recoveryScore,
        riskLevel: scoreData.riskLevel,
        nextBestAction: scoreData.nextBestAction,
        escalated: true,
        escalationStatus: "Pending",
        resolution: "Immediate AI triage active. Awaiting resolution action.",
        timestamp: new Date().toISOString()
      };
      setEscalations(prev => [newEscalation, ...prev]);
    }
  };

  const refreshAnalytics = () => {
    setLoadingDashboard(true);
    fetch('/api/analytics/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data.kpis) setDashboardData(data);
        setLoadingDashboard(false);
      })
      .catch(() => setLoadingDashboard(false));

    fetch('/api/analytics/products')
      .then(res => res.json())
      .then(data => {
        if (data.products && data.products.length > 0) setProductData(data.products);
      })
      .catch(() => {});

    fetch('/api/escalations')
      .then(res => res.json())
      .then(data => {
        if (data.escalations && data.escalations.length > 0) setEscalations(data.escalations);
      })
      .catch(() => {});

    fetch('/api/insights/executive')
      .then(res => res.json())
      .then(data => {
        if (data.executiveSummary) setInsights(data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    refreshAnalytics();
  }, [activeTab]);

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      activePersona,
      setActivePersona,
      liveAnalysis,
      setLiveAnalysis,
      scenarios,
      dashboardData,
      productData,
      setProductData,
      escalations,
      setEscalations,
      insights,
      loadingDashboard,
      refreshAnalytics,
      chatMessages,
      setChatMessages,
      resetChatHistory,
      processClientFeedback
    }}>
      {children}
    </AppContext.Provider>
  );
};
