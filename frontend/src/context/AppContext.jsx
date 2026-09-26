import React, { createContext, useState, useEffect } from 'react';

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
  const [activeTab, setActiveTab] = useState('store'); // 'store', 'chat', 'dashboard', 'analytics', 'escalations', 'simulation', 'insights'
  const [activePersona, setActivePersona] = useState('customer'); // 'customer' or 'retailer'
  const [liveAnalysis, setLiveAnalysis] = useState(null);
  const [scenarios, setScenarios] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [productData, setProductData] = useState([]);
  const [escalations, setEscalations] = useState([]);
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

  // Save chat messages to localStorage whenever they update
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

  // Fetch initial scenario list
  useEffect(() => {
    fetch('/api/chat/scenarios')
      .then(res => res.json())
      .then(data => {
        if (data.scenarios) setScenarios(data.scenarios);
      })
      .catch(err => console.error("Error fetching scenarios:", err));
  }, []);

  // Fetch Dashboard Analytics whenever active tab changes to dashboard or analytics
  const refreshAnalytics = () => {
    setLoadingDashboard(true);
    fetch('/api/analytics/dashboard')
      .then(res => res.json())
      .then(data => {
        if (data.kpis) setDashboardData(data);
        setLoadingDashboard(false);
      })
      .catch(err => {
        console.error("Error fetching dashboard:", err);
        setLoadingDashboard(false);
      });

    fetch('/api/analytics/products')
      .then(res => res.json())
      .then(data => {
        if (data.products) setProductData(data.products);
      })
      .catch(err => console.error("Error fetching products:", err));

    fetch('/api/escalations')
      .then(res => res.json())
      .then(data => {
        if (data.escalations) setEscalations(data.escalations);
      })
      .catch(err => console.error("Error fetching escalations:", err));

    fetch('/api/insights/executive')
      .then(res => res.json())
      .then(data => {
        if (data.executiveSummary) setInsights(data);
      })
      .catch(err => console.error("Error fetching insights:", err));
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
      escalations,
      insights,
      loadingDashboard,
      refreshAnalytics,
      chatMessages,
      setChatMessages,
      resetChatHistory
    }}>
      {children}
    </AppContext.Provider>
  );
};
