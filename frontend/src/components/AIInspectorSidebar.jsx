import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Activity, 
  Smile, 
  Frown, 
  Meh, 
  Flame, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Package, 
  Hash, 
  Compass, 
  HelpCircle,
  Sparkles,
  Zap,
  Tag,
  DollarSign,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Clock,
  UserCheck
} from 'lucide-react';

export const AIInspectorSidebar = () => {
  const { liveAnalysis } = useContext(AppContext);

  if (!liveAnalysis) {
    return (
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[550px] shadow-2xl backdrop-blur-sm">
        <div className="relative mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 animate-pulse">
            <Activity className="w-8 h-8" />
          </div>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full border-2 border-slate-900 animate-ping"></span>
        </div>
        <h3 className="text-base font-black text-white mb-2">Real-Time AI Telemetry Console</h3>
        <p className="text-xs text-slate-400 max-w-xs leading-relaxed mb-6 font-normal">
          Click any of the <strong className="text-cyan-400 font-semibold">5 Hackathon Scenarios</strong> above or type a customer message to see live emotion intensity, Customer Recovery Scoring, and explainable AI routing.
        </p>
        <div className="w-full max-w-xs p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 text-left space-y-1.5">
          <div className="flex items-center space-x-2 text-slate-300 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Inspection Engine Ready</span>
          </div>
          <div>• Multi-Emotion Intensity (Angry, Frustrated, etc.)</div>
          <div>• Dynamic Recovery Score Matrix (0-100)</div>
          <div>• Deterministic Safety Escalation Guardrails</div>
        </div>
      </div>
    );
  }

  const { sentimentData, entityData, scoreData, responseData, customer } = liveAnalysis;
  const { sentiment, sentimentScore, primaryEmotion, intensity } = sentimentData;
  const { recoveryScore, riskLevel, nextBestAction, escalated } = scoreData;
  const { explainability } = responseData;

  const getRiskColor = (risk) => {
    if (risk === 'HIGH') return 'bg-red-950/80 text-red-400 border-red-500/40';
    if (risk === 'MEDIUM') return 'bg-amber-950/80 text-amber-400 border-amber-500/40';
    return 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40';
  };

  const getSentimentIcon = (sent) => {
    if (sent === 'Positive') return <Smile className="w-5 h-5 text-emerald-400" />;
    if (sent === 'Negative') return <Frown className="w-5 h-5 text-red-400" />;
    return <Meh className="w-5 h-5 text-amber-400" />;
  };

  const sentimentColor = 
    sentiment === 'Positive' ? 'text-emerald-400' :
    sentiment === 'Negative' ? 'text-rose-400' : 'text-amber-400';

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-5 overflow-y-auto max-h-[85vh] shadow-2xl backdrop-blur-sm">
      
      {/* Header Inspector Title */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></div>
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
            SentiAI Diagnostic Telemetry
          </h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950 text-cyan-400 border border-slate-800 font-mono">
          latency: 42ms
        </span>
      </div>

      {/* Metric Row 1: Sentiment & Emotion Gauges */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Sentiment Card */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Polarity</span>
            {getSentimentIcon(sentiment)}
          </div>
          <div className={`text-lg font-black ${sentimentColor} tracking-tight`}>
            {sentiment}
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>Score Index</span>
              <span className="font-mono text-slate-200">{sentimentScore > 0 ? `+${sentimentScore}` : sentimentScore}</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  sentiment === 'Positive' ? 'bg-emerald-400' :
                  sentiment === 'Negative' ? 'bg-red-400' : 'bg-amber-400'
                }`}
                style={{ width: `${Math.min(100, Math.max(10, (sentimentScore + 1) * 50))}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Emotion Intensity Card */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">Emotion</span>
            <Flame className="w-4 h-4 text-orange-400 animate-pulse" />
          </div>
          <div className="text-lg font-black text-white tracking-tight">
            {primaryEmotion}
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>Intensity</span>
              <span className="font-mono text-orange-400 font-bold">{intensity}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                style={{ width: `${intensity}%` }}
              ></div>
            </div>
          </div>
        </div>

      </div>

      {/* Metric Row 2: Customer Recovery Score (CRS) Engine */}
      <div className={`p-4 rounded-xl border ${getRiskColor(riskLevel)} transition-all shadow-md`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-xs font-black uppercase tracking-wider">
              Customer Recovery Score (CRS)
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest bg-slate-950 border border-current">
            {riskLevel} RISK
          </span>
        </div>

        <div className="flex items-end justify-between my-2">
          <div>
            <div className="text-3xl font-black tracking-tight">{recoveryScore}<span className="text-sm font-normal text-slate-400"> / 100</span></div>
            <span className="text-[11px] opacity-80">
              {recoveryScore >= 75 ? "Automated Resolution Workflow" :
               recoveryScore >= 45 ? "Priority Handling & Courtesy Voucher" :
               "Deterministic Human Escalation Required"}
            </span>
          </div>
          <div className="text-right">
            {escalated ? (
              <span className="inline-flex items-center space-x-1 text-xs font-bold text-red-400 bg-red-950 px-2 py-1 rounded-lg border border-red-800 animate-pulse">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>ESCALATED</span>
              </span>
            ) : (
              <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-1 rounded-lg border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>BOT RESOLVED</span>
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Recovery Score Gauge */}
        <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden mt-3">
          <div 
            className={`h-full transition-all duration-500 ${
              recoveryScore >= 75 ? 'bg-emerald-400' :
              recoveryScore >= 45 ? 'bg-amber-400' : 'bg-red-500'
            }`}
            style={{ width: `${recoveryScore}%` }}
          ></div>
        </div>
      </div>

      {/* Extracted Entities Grid */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/90 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-300 uppercase tracking-wide">
          <Tag className="w-3.5 h-3.5 text-cyan-400" />
          <span>Extracted Entities & Context</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-medium">Order Reference</span>
            <span className="font-mono text-cyan-300 font-bold">{entityData.orderId || "N/A"}</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-medium">Detected Product</span>
            <span className="text-slate-200 font-semibold truncate block" title={entityData.product}>
              {entityData.product || "General Retail Item"}
            </span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-medium">Issue Category</span>
            <span className="text-amber-300 font-semibold">{entityData.issueCategory}</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-medium">Urgency Classification</span>
            <span className={`font-bold ${
              entityData.urgency === 'High' ? 'text-red-400' : 'text-slate-300'
            }`}>
              {entityData.urgency}
            </span>
          </div>
        </div>
      </div>

      {/* Next Best Action Recommendation */}
      <div className="p-4 rounded-xl bg-gradient-to-tr from-cyan-950/40 to-indigo-950/40 border border-cyan-500/30 space-y-2">
        <div className="flex items-center space-x-2 text-xs font-bold text-cyan-300 uppercase tracking-wider">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span>AI Next Best Action (NBA)</span>
        </div>
        <p className="text-xs font-bold text-white leading-relaxed">
          {nextBestAction}
        </p>
      </div>

      {/* Explainability Breakdown */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5 text-xs">
        <div className="flex items-center space-x-2 font-bold text-slate-300 uppercase tracking-wider text-[11px]">
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Explainable Decision Rationale</span>
        </div>
        <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800/80 text-slate-300 text-xs leading-relaxed italic">
          "{explainability.driverReason}"
        </div>
        <div className="text-[11px] text-slate-400 space-y-1 pt-1">
          <div>• Customer: <strong className="text-slate-200">{customer?.name}</strong> ({customer?.tier})</div>
          <div>• History: {customer?.totalOrders} lifetime orders | {customer?.previousComplaints} past complaints</div>
        </div>
      </div>

    </div>
  );
};
