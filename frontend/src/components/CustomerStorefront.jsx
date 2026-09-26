import React, { useContext, useState, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ShoppingBag, 
  Sparkles, 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  ArrowRight, 
  Bot, 
  Truck, 
  Heart,
  CheckCircle2,
  AlertCircle,
  X,
  Send,
  User,
  RotateCcw,
  Search,
  ShoppingCart,
  Smile,
  Frown,
  Meh,
  Flame,
  CornerDownRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Check
} from 'lucide-react';

export const CustomerStorefront = () => {
  const { 
    productData, 
    refreshAnalytics, 
    setActiveTab, 
    setActivePersona,
    chatMessages,
    setChatMessages,
    resetChatHistory
  } = useContext(AppContext);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [happyToast, setHappyToast] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartCount, setCartCount] = useState(2);
  const chatEndRef = useRef(null);

  const categories = ['All', 'Electronics', 'Furniture', 'Kitchen', 'Home & Bedding', 'Apparel'];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, loading]);

  // Pressing Escape closes the chat
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsChatOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

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
        body: JSON.stringify({ message: text, customerId: 'CUST-9001' })
      });

      const resData = await response.json();

      if (resData.success) {
        const { responseData, sentimentData, entityData, scoreData } = resData.data;

        // Check if Happy: Display Praise Toast on the storefront!
        if (sentimentData.sentiment === 'Positive') {
          setHappyToast({
            product: entityData.product || "OmniFit Smartwatch",
            quote: text,
            customer: "Sarah Jenkins"
          });
          // Auto clear toast after 8 seconds
          setTimeout(() => setHappyToast(null), 8000);
        }

        // Add Bot message (Empathetic, helpful customer-facing message)
        const botMsg = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: responseData.botMessage,
          followUp: responseData.followUpQuestion,
          sentiment: sentimentData.sentiment,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages(prev => [...prev, botMsg]);
        refreshAnalytics(); // Refresh product praise & retailer escalations
      }
    } catch (err) {
      console.error("Chat error:", err);
      setChatMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'bot',
          text: "I apologize, but our connection dipped momentarily. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = activeCategory === 'All' 
    ? productData 
    : productData.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative pb-16">
      
      {/* 1. Customer Store Navigation Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 sticky top-12 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Store Brand */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-cyan-500/20">
                <ShoppingBag className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="font-black text-xl text-white tracking-tight flex items-center">
                  Senti<span className="text-cyan-400">Store</span>
                </span>
                <span className="text-[10px] text-slate-400 block -mt-1 font-medium">Verified Customer Retail</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md relative">
              <input
                type="text"
                placeholder="Search products, verified customer reviews..."
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            {/* Cart & Customer Profile */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsChatOpen(true)}
                className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 hover:text-white text-xs font-bold transition-all shadow-sm"
              >
                <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Need Help? Chat with AI</span>
              </button>

              <div className="flex items-center space-x-2 text-xs bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center">
                  SJ
                </div>
                <div className="hidden sm:block text-left pr-2">
                  <div className="font-bold text-white text-[11px]">Sarah Jenkins</div>
                  <div className="text-[10px] text-amber-400 font-medium">VIP Gold Member</div>
                </div>
              </div>

              <div className="relative p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                <ShoppingCart className="w-4 h-4 text-slate-300" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {cartCount}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Happy Customer Praise Floating Notification Toast */}
      {happyToast && (
        <div className="fixed top-20 right-6 z-50 max-w-md bg-emerald-950/95 border border-emerald-500/50 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-fade-in flex items-start space-x-3 text-emerald-200">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 flex-shrink-0">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-black text-white text-xs uppercase tracking-wide">
                🌟 Praise Reflected on Product Card!
              </span>
              <button onClick={() => setHappyToast(null)} className="text-slate-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-emerald-300 mt-1 leading-relaxed">
              Your happy feedback for <strong className="text-white">{happyToast.product}</strong> has been updated live on the product description below!
            </p>
            <div className="text-[11px] text-slate-400 italic mt-1">
              "{happyToast.quote}"
            </div>
          </div>
        </div>
      )}

      {/* 3. Hero Promo Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="relative rounded-3xl p-6 sm:p-10 overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800/80 shadow-xl">
          <div className="max-w-2xl space-y-3 relative z-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/80 text-[11px] font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Customer Satisfaction Guarantee</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Curated Retail Favorites, <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Backed by Verified Shopper Sentiment
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Every review and chat reaction is processed in real time. When you share positive feedback, it directly enriches the product descriptions below!
            </p>
          </div>
        </div>
      </div>

      {/* 4. Category Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Product Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl overflow-hidden shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Product Image */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                <img
                  src={prod.image || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80"}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                  {prod.category}
                </div>

                {/* Positive Sentiment Pill */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-500/50 text-[11px] font-black text-emerald-300 flex items-center space-x-1 shadow-lg">
                  <ThumbsUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{prod.positivePercentage || 95}% Loved</span>
                </div>

                {/* Price */}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-sm font-black text-white">
                  ${prod.price.toFixed(2)}
                </div>
              </div>

              {/* Product Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <div className="flex items-center space-x-1 text-amber-400 font-bold">
                      <Star className="w-4 h-4 fill-amber-400" />
                      <span>{prod.rating || 4.9}</span>
                      <span className="text-slate-500 font-normal">({prod.totalReviews || 18} reviews)</span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-bold bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-800">
                      Verified Stock
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-white group-hover:text-cyan-300 transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                    {prod.description}
                  </p>
                </div>

                {/* CRITICAL: Live Customer Praise Spotlight (Where happy chat reactions reflect!) */}
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/90 space-y-2 relative overflow-hidden">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-400 flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Customer Review Spotlight:</span>
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {prod.latestPraise?.time || "Recent"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 italic leading-relaxed">
                    "{prod.latestPraise?.text || prod.happyQuotes?.[0] || 'Incredible quality, fast delivery, and works like a charm!'}"
                  </p>

                  <div className="text-[10px] text-slate-400 flex items-center space-x-1 pt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Verified Shopper: <strong className="text-slate-300">{prod.latestPraise?.customer || "Sarah Jenkins"}</strong></span>
                  </div>
                </div>

                {/* Action Buttons: Add to Cart & Ask AI */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setCartCount(prev => prev + 1)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md shadow-cyan-500/15"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsChatOpen(true);
                      handleSendMessage(`Tell me more about the ${prod.name}`);
                    }}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center transition-colors border border-slate-700"
                    title="Ask SentiAI Assistant about this product"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Floating Chatbot Trigger Button (Bottom Right) */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
          <div className="hidden sm:block bg-slate-900/90 border border-slate-800 px-3.5 py-2 rounded-2xl shadow-xl text-xs text-slate-200 backdrop-blur-md">
            <span>👋 Need help or want to leave a review?</span>
          </div>
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-slate-950 font-black shadow-2xl shadow-cyan-500/40 hover:scale-105 transition-all group"
          >
            <Bot className="w-7 h-7 text-slate-950 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950 animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950"></span>
          </button>
        </div>
      )}

      {/* 7. Supercool Sliding / Floating SentiAI Chatbot Widget */}
      {isChatOpen && (
        <div 
          className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[420px] max-h-[82vh] h-[520px] bg-slate-900 border-2 border-cyan-500/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-fade-in ring-4 ring-cyan-500/10"
        >
          {/* Chat Window Header (Always pinned at top, shrink-0) */}
          <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-md">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-cyan-500/25">
                  <Bot className="w-5 h-5 text-slate-950" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-slate-950"></span>
              </div>
              <div>
                <h3 className="font-black text-xs sm:text-sm text-white flex items-center space-x-1.5">
                  <span>SentiAI Assistant</span>
                </h3>
                <span className="text-[10px] text-slate-400">Shopping & Support</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear your chat history?")) {
                    resetChatHistory();
                  }
                }}
                className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                title="Clear Chat History"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* UNMISTAKABLE BIG CLOSE BUTTON */}
              <button
                onClick={() => setIsChatOpen(false)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-600/30 transition-all hover:scale-105 active:scale-95"
                title="Close Chat"
              >
                <X className="w-4 h-4 stroke-[3]" />
                <span>CLOSE ✕</span>
              </button>
            </div>
          </div>

          {/* Quick Demo Reaction Chips */}
          <div className="px-3 py-2 bg-slate-950/70 border-b border-slate-800/80 flex items-center space-x-2 overflow-x-auto text-[11px] shrink-0">
            <span className="text-slate-500 font-semibold whitespace-nowrap">Try:</span>
            <button
              onClick={() => handleSendMessage("I received my OmniFit Smartwatch Series 5 today! Incredible battery life and 5 stars!")}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900 whitespace-nowrap transition-colors flex items-center space-x-1"
            >
              <Smile className="w-3 h-3 text-emerald-400" />
              <span>"Smartwatch is amazing! 5★"</span>
            </button>
            <button
              onClick={() => handleSendMessage("Order ORD-8821 was promised 3 days ago! Tracking has no update, very frustrated!")}
              className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 whitespace-nowrap transition-colors flex items-center space-x-1"
            >
              <Frown className="w-3 h-3 text-rose-400" />
              <span>"Order ORD-8821 is late!"</span>
            </button>
          </div>

          {/* Chat Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2.5 ${
                  msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-tr from-cyan-600 to-blue-600 text-white'
                    : 'bg-slate-800 text-cyan-400'
                }`}>
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div className={`max-w-[85%] space-y-1 ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}>
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none font-medium'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                    {msg.followUp && (
                      <div className="mt-2.5 p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-cyan-200 flex items-start space-x-1.5">
                        <CornerDownRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{msg.followUp}</span>
                      </div>
                    )}
                  </div>
                  <span className={`text-[9px] text-slate-500 block px-1 ${
                    msg.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-slate-400 text-xs">
                <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl rounded-tl-none flex items-center space-x-1.5">
                  <span className="text-[11px] text-slate-300">SentiAI typing</span>
                  <span className="flex space-x-1">
                    <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></span>
                  </span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question, share praise, or report an issue..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={loading || !inputText.trim()}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Bottom Bar Close Button */}
          <div className="px-3.5 py-2 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
            <span className="text-[10px] text-slate-500">History saved • Press Esc to close</span>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-rose-400 hover:text-rose-300 font-bold flex items-center space-x-1 px-2 py-0.5 rounded-lg hover:bg-rose-950/40 border border-transparent hover:border-rose-800 transition-colors"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Close Assistant</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
