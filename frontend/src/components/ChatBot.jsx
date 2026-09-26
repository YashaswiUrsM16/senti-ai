import React, { useState, useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { AIInspectorSidebar } from './AIInspectorSidebar';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  ShoppingBag,
  RotateCcw,
  Zap,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  UserCheck,
  CornerDownRight,
  Flame,
  ThumbsUp,
  Store,
  LayoutDashboard,
  Smile,
  Frown,
  Meh,
  X,
  History
} from 'lucide-react';

export const ChatBot = () => {
  const { 
    setLiveAnalysis, 
    scenarios, 
    refreshAnalytics, 
    setActiveTab, 
    setActivePersona,
    chatMessages,
    setChatMessages,
    resetChatHistory
  } = useContext(AppContext);

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState('CUST-9001');
  const [lastRoutingEvent, setLastRoutingEvent] = useState(null);

  const customerProfiles = [
    { id: 'CUST-9001', name: 'Sarah Jenkins (VIP Gold)', tier: 'VIP Gold', orders: 18, prevComplaints: 2 },
    { id: 'CUST-9002', name: 'Michael Chen (VIP Platinum)', tier: 'VIP Platinum', orders: 24, prevComplaints: 0 },
    { id: 'CUST-9003', name: 'Emma Watson (Frequent Shopper)', tier: 'Silver', orders: 12, prevComplaints: 3 },
    { id: 'CUST-9004', name: 'James Rodriguez (Regular)', tier: 'Bronze', orders: 4, prevComplaints: 1 },
    { id: 'CUST-9005', name: 'David Kim (First-Time Buyer)', tier: 'New', orders: 1, prevComplaints: 0 }
  ];

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, loading]);

  const handleSendMessage = async (textToSend, customCustId = null) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const custId = customCustId || selectedCustomerId;

    // Append user message immediately
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, customerId: custId })
      });

      const resData = await response.json();

      if (resData.success) {
        const { responseData, scoreData, entityData, sentimentData } = resData.data;

        // Set Live Inspector Sidebar Data
        setLiveAnalysis(resData.data);

        // Set Last Routing Event for visual notification
        setLastRoutingEvent({
          sentiment: sentimentData.sentiment,
          emotion: sentimentData.primaryEmotion,
          intensity: sentimentData.intensity,
          product: entityData.product,
          recoveryScore: scoreData.recoveryScore,
          escalated: scoreData.escalated,
          feedbackText: text
        });

        // Append Bot Response Message
        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: responseData.botMessage,
          followUp: responseData.followUpQuestion,
          riskLevel: scoreData.riskLevel,
          escalated: scoreData.escalated,
          emotion: sentimentData.primaryEmotion,
          recoveryScore: scoreData.recoveryScore,
          nextBestAction: scoreData.nextBestAction,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages(prev => [...prev, botMsg]);
        refreshAnalytics();
      }
    } catch (err) {
      console.error("Chat message error:", err);
      setChatMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'bot',
          text: "I apologize, but I am experiencing a temporary connection issue. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleScenarioClick = (scenario) => {
    setSelectedCustomerId(scenario.customerId);
    handleSendMessage(scenario.message, scenario.customerId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Prominent Back/Exit Button Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-3xl shadow-xl">
        <button
          onClick={() => {
            setActivePersona('customer');
            setActiveTab('store');
          }}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 hover:-translate-x-0.5 w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Chat & Return to Storefront</span>
        </button>

        <div className="flex items-center space-x-3 text-xs text-slate-400">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-semibold bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800/80">
            <History className="w-3.5 h-3.5" />
            <span>Chat History Preserved</span>
          </div>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to clear your chat history?")) {
                resetChatHistory();
                setLastRoutingEvent(null);
              }
            }}
            className="hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-800 transition-colors flex items-center space-x-1"
            title="Clear Chat History"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {/* 5 Hackathon Demo Scenario Presets Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white tracking-wide uppercase flex items-center space-x-2">
                <span>Interactive Sentiment & Recovery Scenarios</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
                  1-Click Test
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Click a scenario to witness real-time sentiment detection & intelligent dual-routing!
              </p>
            </div>
          </div>
          
          {/* Customer Profile Switcher */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-medium hidden md:inline">Current Shopper:</span>
            <select
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-cyan-500 font-medium"
            >
              {customerProfiles.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} • {p.orders} orders
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preset Chips */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {scenarios.map((sc) => {
            const badgeColor = 
              sc.id === 1 ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40 hover:border-emerald-400' :
              sc.id === 2 ? 'border-amber-500/40 text-amber-400 bg-amber-950/40 hover:border-amber-400' :
              sc.id === 3 ? 'border-orange-500/40 text-orange-400 bg-orange-950/40 hover:border-orange-400' :
              sc.id === 4 ? 'border-rose-500/40 text-rose-400 bg-rose-950/40 hover:border-rose-400' :
              'border-red-500/60 text-red-400 bg-red-950/50 hover:border-red-400 ring-1 ring-red-500/20';

            return (
              <button
                key={sc.id}
                onClick={() => handleScenarioClick(sc)}
                className={`group text-left p-3.5 rounded-2xl bg-slate-950/80 border ${badgeColor} transition-all duration-200 flex flex-col justify-between space-y-2 hover:-translate-y-0.5 hover:shadow-lg`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-black text-white group-hover:text-cyan-300 transition-colors">
                    {sc.title}
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider bg-slate-900 border border-slate-800">
                    {sc.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                  "{sc.message}"
                </p>
                <div className="text-[10px] text-cyan-400/90 font-bold flex items-center space-x-1 pt-1 group-hover:text-cyan-300">
                  <span>Run Scenario</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* DUAL ROUTING LIVE BANNER */}
      {lastRoutingEvent && (
        <div className="transition-all duration-300">
          {lastRoutingEvent.sentiment === 'Positive' ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950/90 border border-emerald-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-3 text-emerald-200">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 flex-shrink-0 animate-bounce">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-black text-emerald-300 text-sm block">
                    🌟 Happy Reaction Detected ({lastRoutingEvent.emotion})!
                  </span>
                  <span>
                    Your praise was <strong>automatically spotlighted on the {lastRoutingEvent.product} description</strong> in the public store!
                  </span>
                </div>
              </div>
              <button
                onClick={() => { setActiveTab('store'); setActivePersona('customer'); }}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center space-x-1.5 transition-all shadow-lg whitespace-nowrap"
              >
                <Store className="w-3.5 h-3.5" />
                <span>See on Store Product Page →</span>
              </button>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/90 via-slate-900 to-rose-950/90 border border-rose-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-3 text-rose-200">
                <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 flex-shrink-0 animate-pulse">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-black text-rose-300 text-sm block">
                    🚨 Angry/Sad Complaint Detected ({lastRoutingEvent.emotion} • {lastRoutingEvent.intensity}% intensity)!
                  </span>
                  <span>
                    Store catalog shielded • Complaint <strong>routed immediately to Retailer Admin Portal</strong> with Recovery Score: <strong>{lastRoutingEvent.recoveryScore}/100</strong>!
                  </span>
                </div>
              </div>
              <button
                onClick={() => { setActiveTab('escalations'); setActivePersona('retailer'); }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center space-x-1.5 transition-all shadow-lg whitespace-nowrap"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Inspect in Retailer Portal →</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Main 2-Column Grid: Left Chat Area (60%) | Right Real-time Inspector (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Conversational Chat UI */}
        <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl flex flex-col h-[750px] shadow-2xl overflow-hidden backdrop-blur-sm">
          
          {/* Chat Window Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/30">
                  <Bot className="w-6 h-6 text-slate-950" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse"></span>
              </div>
              <div>
                <h3 className="font-black text-white text-sm sm:text-base flex items-center space-x-2">
                  <span>SentiAI Live Assistant</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                    ONLINE
                  </span>
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  Interacting as: {customerProfiles.find(c => c.id === selectedCustomerId)?.name || selectedCustomerId}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => { 
                  setActivePersona('customer');
                  setActiveTab('store'); 
                }}
                className="w-9 h-9 rounded-full bg-rose-500/20 hover:bg-rose-600 border border-rose-500/40 text-rose-300 hover:text-white flex items-center justify-center transition-all shadow-md hover:scale-110 active:scale-95 group"
                title="Exit Chat & Return to Store (History Preserved)"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5 stroke-[2.5] text-rose-400 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                {/* Avatar Icon */}
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white'
                    : 'bg-slate-800 border border-slate-700 text-cyan-400'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble Content */}
                <div className={`max-w-[84%] space-y-2 ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}>
                  <div className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none font-medium'
                      : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}>
                    {/* Bot Risk & Recovery Header Badge if available */}
                    {msg.sender === 'bot' && msg.riskLevel && (
                      <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-slate-800/80 text-[11px]">
                        <span className={`px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                          msg.riskLevel === 'HIGH' ? 'bg-red-950 text-red-400 border border-red-800' :
                          msg.riskLevel === 'MEDIUM' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                          'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        }`}>
                          Risk: {msg.riskLevel}
                        </span>
                        <span className="text-slate-400">Recovery Score: <strong className="text-white">{msg.recoveryScore}/100</strong></span>
                        {msg.escalated && (
                          <span className="text-red-400 font-bold flex items-center space-x-1 animate-pulse">
                            <ShieldAlert className="w-3.5 h-3.5" />
                            <span>Escalated to Human Desk</span>
                          </span>
                        )}
                      </div>
                    )}

                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* Contextual Follow-Up Inquiry Box */}
                    {msg.followUp && (
                      <div className="mt-3 p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 flex items-start space-x-2">
                        <CornerDownRight className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-cyan-300 block mb-0.5">Targeted Clarification:</span>
                          <span>{msg.followUp}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <span className={`text-[10px] text-slate-500 block px-1 ${
                    msg.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Loader */}
            {loading && (
              <div className="flex items-center space-x-3 text-slate-400">
                <div className="w-9 h-9 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-3xl rounded-tl-none flex items-center space-x-2">
                  <span className="text-xs text-slate-300 font-medium">SentiAI analyzing emotion & routing destination</span>
                  <span className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                  </span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Input Suggestions */}
          <div className="px-4 py-2 bg-slate-950/70 border-t border-slate-800/80 flex items-center space-x-2 overflow-x-auto text-[11px]">
            <span className="text-slate-500 font-semibold whitespace-nowrap">Try asking:</span>
            <button 
              onClick={() => handleSendMessage("I received my OmniFit Smartwatch today! Battery life is incredible and 5 stars!")}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 hover:text-white hover:border-emerald-500/40 whitespace-nowrap transition-colors flex items-center space-x-1"
            >
              <Smile className="w-3.5 h-3.5 text-emerald-400" />
              <span>"Smartwatch battery is incredible, 5 stars!"</span>
            </button>
            <button 
              onClick={() => handleSendMessage("Where is order ORD-8821? It is 3 days late and tracking has no updates!")}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-rose-300 hover:text-white hover:border-rose-500/40 whitespace-nowrap transition-colors flex items-center space-x-1"
            >
              <Frown className="w-3.5 h-3.5 text-rose-400" />
              <span>"Order ORD-8821 is 3 days late!"</span>
            </button>
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 bg-slate-950 border-t border-slate-800 flex items-center space-x-3"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type any retail review, order complaint, or question..."
              className="flex-1 bg-slate-900/90 border border-slate-800 rounded-2xl px-4 py-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/20 disabled:hover:bg-cyan-500 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Right Column: Real-time AI Inspector Sidebar */}
        <div className="lg:col-span-5 sticky top-20">
          <AIInspectorSidebar />
        </div>

      </div>

    </div>
  );
};
