import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Store, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

export const TopPortalBar = () => {
  const { activePersona, setActivePersona, setActiveTab, escalations } = useContext(AppContext);
  const activeEscalationsCount = escalations ? escalations.filter(e => e.escalated).length : 0;

  return (
    <div className="bg-slate-950 border-b border-slate-800 text-xs px-4 py-2 sticky top-0 z-50 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-2">
        <span className="font-extrabold text-slate-300 tracking-wide uppercase text-[11px] flex items-center space-x-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>SentiAI Retail Dual-Portal System</span>
        </span>
        <span className="text-slate-600 hidden sm:inline">•</span>
        <span className="text-slate-400 hidden sm:inline text-[11px]">
          {activePersona === 'customer' 
            ? 'Customer Site: Happy reactions update product descriptions live' 
            : 'Retailer Site: Angry complaints trigger immediate recovery alerts'}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-[11px] text-slate-400 font-semibold hidden md:inline">Switch Active Site:</span>
        <div className="bg-slate-900 p-0.5 rounded-xl border border-slate-800 flex items-center space-x-1">
          <button
            onClick={() => {
              setActivePersona('customer');
              setActiveTab('store');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all flex items-center space-x-1.5 ${
              activePersona === 'customer'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Customer Store Site</span>
          </button>

          <button
            onClick={() => {
              setActivePersona('retailer');
              setActiveTab('dashboard');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-black transition-all flex items-center space-x-1.5 relative ${
              activePersona === 'retailer'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Retailer Admin Site</span>
            {activeEscalationsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse ml-0.5"></span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
