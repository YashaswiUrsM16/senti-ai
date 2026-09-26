import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { RetailerDashboard } from './RetailerDashboard';
import { EscalationCenter } from './EscalationCenter';
import { WhatIfSimulator } from './WhatIfSimulator';
import { AIExecutiveInsights } from './AIExecutiveInsights';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  SlidersHorizontal, 
  Lightbulb, 
  RefreshCw, 
  Store, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  DollarSign,
  Users,
  Flame,
  Frown
} from 'lucide-react';

export const RetailerPortal = () => {
  const { escalations, refreshAnalytics, setActiveTab, setActivePersona } = useContext(AppContext);
  const [adminTab, setAdminTab] = useState('escalations'); // 'escalations', 'dashboard', 'simulation', 'insights'

  const activeEscalations = escalations ? escalations.filter(e => e.escalated) : [];
  const criticalCount = activeEscalations.filter(e => e.riskLevel === 'HIGH' || e.severity === 'Critical').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col pb-16">
      
      {/* 1. Retailer Operations Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-12 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-3">
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/30">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-black text-white flex items-center space-x-2">
                  <span>SentiAI Retailer Command Center</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold uppercase">
                    Admin Portal
                  </span>
                </h1>
                <p className="text-xs text-slate-400">
                  Real-time sentiment triage, angry complaint recovery & operational forecasting.
                </p>
              </div>
            </div>

            {/* Quick Action & Switch to Store */}
            <div className="flex items-center space-x-2">
              <button
                onClick={refreshAnalytics}
                className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center space-x-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Refresh Queue</span>
              </button>

              <button
                onClick={() => {
                  setActivePersona('customer');
                  setActiveTab('store');
                }}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black flex items-center space-x-1.5 transition-all shadow-md shadow-cyan-500/20"
              >
                <Store className="w-3.5 h-3.5" />
                <span>View Customer Storefront →</span>
              </button>
            </div>

          </div>

          {/* Admin Navigation Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto border-t border-slate-800/80 pt-2 pb-2 text-xs">
            <button
              onClick={() => setAdminTab('escalations')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap relative ${
                adminTab === 'escalations'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Angry Complaints & Escalations</span>
              {activeEscalations.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-black animate-pulse">
                  {activeEscalations.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setAdminTab('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                adminTab === 'dashboard'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-indigo-400" />
              <span>Sentiment Dashboard & KPIs</span>
            </button>

            <button
              onClick={() => setAdminTab('simulation')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                adminTab === 'simulation'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-purple-400" />
              <span>What-If Logistics Simulator</span>
            </button>

            <button
              onClick={() => setAdminTab('insights')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                adminTab === 'insights'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-850'
              }`}
            >
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>AI Executive Insights</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Urgent Retailer Live Alert Banner (When Angry Customers are detected in chat) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {criticalCount > 0 ? (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/90 via-slate-900 to-rose-950/90 border border-rose-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3 text-rose-200">
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 flex-shrink-0 animate-pulse">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-sm font-black text-rose-300 block mb-0.5">
                  🚨 {criticalCount} High-Risk Customer Complaints Require Immediate Recovery Action!
                </strong>
                <span>
                  Customer chat detected severe negative sentiment. SentiAI has protected the public store description and escalated these tickets for human resolution.
                </span>
              </div>
            </div>

            <button
              onClick={() => setAdminTab('escalations')}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs flex items-center space-x-1.5 transition-all shadow-md whitespace-nowrap"
            >
              <span>Review Priority Queue →</span>
            </button>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center space-x-3 text-xs text-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>
              <strong>Customer Sentiment Stable:</strong> All positive chat reactions are actively streaming into product descriptions, and no critical complaints are unhandled.
            </span>
          </div>
        )}
      </div>

      {/* 3. Main Admin Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {adminTab === 'escalations' && <EscalationCenter />}
        {adminTab === 'dashboard' && <RetailerDashboard />}
        {adminTab === 'simulation' && <WhatIfSimulator />}
        {adminTab === 'insights' && <AIExecutiveInsights />}
      </div>

    </div>
  );
};
