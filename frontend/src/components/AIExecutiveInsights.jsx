import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Lightbulb, TrendingUp, ShieldAlert, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export const AIExecutiveInsights = () => {
  const { insights } = useContext(AppContext);

  if (!insights) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Sparkles className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-200">Generating AI Executive Intelligence...</h3>
      </div>
    );
  }

  const { executiveSummary, emergingComplaints, strategicActions } = insights;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title Bar */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <Lightbulb className="w-6 h-6 text-purple-400" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">AI Executive Intelligence & Strategic Recommendations</h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">Automated NLP synthesis of recurring customer feedback patterns, emerging risk vectors, and recommended executive action plans.</p>
      </div>

      {/* Executive Summary Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-800/40 rounded-2xl p-6 space-y-3 shadow-xl">
        <div className="flex items-center space-x-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>7-Day Automated AI Executive Summary</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-normal">
          {executiveSummary}
        </p>
      </div>

      {/* Top Emerging Complaint Alerts */}
      <div className="space-y-4">
        <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-rose-400" />
          <span>Top Emerging Complaint Trends</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {emergingComplaints.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between shadow-lg hover:border-slate-700 transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-950 text-rose-400 border border-rose-800">
                    {item.growth}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Severity: {item.severity}</span>
                </div>

                <h3 className="font-bold text-sm text-slate-100 leading-snug">{item.topic}</h3>
                
                <div className="text-xs text-slate-400 space-y-1">
                  <span className="block font-medium">Impacted Products:</span>
                  <div className="flex flex-wrap gap-1">
                    {item.affectedProducts.map((p, pIdx) => (
                      <span key={pIdx} className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 text-[10px] font-mono border border-slate-800">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-cyan-400 font-bold block mb-1">Recommended Action:</span>
                "{item.recommendedAction}"
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Actions Plan */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
        <h2 className="text-base font-extrabold text-white flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>Recommended Strategic Business Actions</span>
        </h2>

        <div className="space-y-3">
          {strategicActions.map((action, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start space-x-3 text-xs text-slate-200 leading-relaxed font-medium">
              <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
