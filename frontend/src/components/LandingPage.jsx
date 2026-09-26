import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Bot, 
  ShieldAlert, 
  BarChart3, 
  SlidersHorizontal, 
  Award, 
  Sparkles, 
  ArrowRight,
  ShoppingBag,
  Users,
  Zap,
  CheckCircle2,
  Activity,
  HeartHandshake,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const LandingPage = () => {
  const { setActiveTab, setActivePersona } = useContext(AppContext);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Hero Section */}
      <div className="relative text-center space-y-6 max-w-4xl mx-auto pt-6">
        
        {/* Glowing backdrop blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-900/90 text-cyan-300 border border-cyan-500/30 text-xs font-bold tracking-wide shadow-lg shadow-cyan-500/10">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Next-Gen Retail Sentiment AI & Customer Recovery Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          Transform Retail Sentiment into <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Real-Time Customer Recovery
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
          Beyond basic positive/negative classification. <strong className="text-white font-semibold">SentiAI</strong> detects 6 granular emotional states, calculates dynamic <strong className="text-cyan-400 font-semibold">Customer Recovery Scores</strong>, automates empathetic retention, and predicts operational churn.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => { setActiveTab('chat'); setActivePersona('customer'); }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-sm flex items-center justify-center space-x-2.5 transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
          >
            <Bot className="w-5 h-5 text-slate-950" />
            <span>Launch Customer Chatbot</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>

          <button
            onClick={() => { setActiveTab('dashboard'); setActivePersona('retailer'); }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800/90 border border-slate-700/80 text-white font-bold text-sm flex items-center justify-center space-x-2.5 transition-all shadow-xl hover:-translate-y-0.5"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Open Retailer Dashboard</span>
          </button>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 max-w-3xl mx-auto">
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <div className="text-xl font-black text-cyan-400">6</div>
            <div className="text-[11px] text-slate-400 font-medium">Emotion Intensities</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <div className="text-xl font-black text-emerald-400">0 - 100</div>
            <div className="text-[11px] text-slate-400 font-medium">Recovery Score Matrix</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <div className="text-xl font-black text-purple-400">&lt; 150ms</div>
            <div className="text-[11px] text-slate-400 font-medium">Real-Time Telemetry</div>
          </div>
          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
            <div className="text-xl font-black text-amber-400">What-If</div>
            <div className="text-[11px] text-slate-400 font-medium">Logistics Simulation</div>
          </div>
        </div>

      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        <div 
          onClick={() => { setActiveTab('chat'); setActivePersona('customer'); }}
          className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 space-y-4 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-cyan-500/10"
        >
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">
            Empathetic AI & Live Inspector
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Detects user emotions (Angry, Frustrated, Disappointed), extracts Order IDs & product categories, and streams explainable decisions in real-time.
          </p>
          <div className="text-xs font-semibold text-cyan-400 flex items-center space-x-1 pt-2">
            <span>Explore 5 Preset Scenarios</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div 
          onClick={() => { setActiveTab('escalations'); setActivePersona('retailer'); }}
          className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/50 rounded-2xl p-6 space-y-4 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-rose-500/10"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white group-hover:text-rose-400 transition-colors">
            Customer Recovery Score (CRS)
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Algorithmic 0–100 scoring factoring repeated complaints, VIP tier, and severity. Automatically triggers human agent escalation before churn occurs.
          </p>
          <div className="text-xs font-semibold text-rose-400 flex items-center space-x-1 pt-2">
            <span>View Escalation Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div 
          onClick={() => { setActiveTab('simulation'); setActivePersona('retailer'); }}
          className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-6 space-y-4 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-purple-500/10"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
            <SlidersHorizontal className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors">
            What-If Risk Simulation Engine
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Forecast the financial impact of logistics surges (e.g. +20% delivery delays). Project customer segment churn and generate tactical mitigation steps.
          </p>
          <div className="text-xs font-semibold text-purple-400 flex items-center space-x-1 pt-2">
            <span>Run What-If Models</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

    </div>
  );
};
