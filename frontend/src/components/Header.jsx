import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Bot, 
  BarChart3, 
  ShieldAlert, 
  Sparkles, 
  LayoutDashboard, 
  SlidersHorizontal,
  Lightbulb,
  MessageSquare,
  Users,
  ShoppingBag,
  Store,
  ArrowRight
} from 'lucide-react';

export const Header = () => {
  const { activeTab, setActiveTab, activePersona, setActivePersona, escalations } = useContext(AppContext);
  const activeEscalationCount = escalations ? escalations.filter(e => e.escalated).length : 2;

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand Name */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActiveTab('store')}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 group-hover:shadow-cyan-500/40 transition-all duration-300">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900 animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900"></span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-2xl tracking-tight text-white flex items-center">
                  Senti<span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">AI</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/80 font-bold uppercase tracking-wider">
                  Retail CX
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Intelligent Retail Sentiment & Recovery Platform</p>
            </div>
          </div>

          {/* Persona-Aware Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
            {/* Customer Side Nav Items */}
            <button
              onClick={() => { setActiveTab('store'); setActivePersona('customer'); }}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === 'store' 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Store & Products</span>
            </button>

            <button
              onClick={() => { setActiveTab('chat'); setActivePersona('customer'); }}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === 'chat' 
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              <span>SentiAI Chatbot</span>
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1"></div>

            {/* Retailer Admin Nav Items */}
            <button
              onClick={() => { setActiveTab('dashboard'); setActivePersona('retailer'); }}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === 'dashboard' 
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
              <span>Retailer Dashboard</span>
            </button>

            <button
              onClick={() => { setActiveTab('escalations'); setActivePersona('retailer'); }}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 relative ${
                activeTab === 'escalations' 
                  ? 'bg-gradient-to-r from-rose-500/20 to-orange-500/20 text-rose-300 border border-rose-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Angry Complaints</span>
              {activeEscalationCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-black animate-pulse">
                  {activeEscalationCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('simulation'); setActivePersona('retailer'); }}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === 'simulation' 
                  ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
              <span>What-If Simulator</span>
            </button>

            <button
              onClick={() => { setActiveTab('insights'); setActivePersona('retailer'); }}
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === 'insights' 
                  ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/40 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
              <span>AI Insights</span>
            </button>
          </nav>

          {/* Persona Switcher Quick Pill */}
          <div className="flex items-center space-x-2">
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center space-x-1 shadow-inner">
              <button
                onClick={() => {
                  setActivePersona('customer');
                  setActiveTab('store');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activePersona === 'customer'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Customer Store</span>
              </button>
              <button
                onClick={() => {
                  setActivePersona('retailer');
                  setActiveTab('dashboard');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activePersona === 'retailer'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Retailer Admin</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
