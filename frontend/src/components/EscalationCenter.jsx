import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  ShieldAlert, 
  CheckCircle, 
  UserCheck, 
  DollarSign, 
  Truck, 
  Gift, 
  MessageSquare, 
  AlertTriangle,
  Clock
} from 'lucide-react';

export const EscalationCenter = () => {
  const { escalations, refreshAnalytics } = useContext(AppContext);
  const [resolvingId, setResolvingId] = useState(null);
  const [resolutionNote, setResolutionNote] = useState('');
  const [activeItem, setActiveItem] = useState(null);

  const handleResolveTicket = async (id, defaultAction = null) => {
    setResolvingId(id);
    const actionText = defaultAction || resolutionNote || "Resolved by Human Agent.";

    try {
      const response = await fetch(`/api/escalations/${id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionTaken: actionText, notes: actionText })
      });

      const data = await response.json();
      if (data.success) {
        refreshAnalytics();
        setActiveItem(null);
        setResolutionNote('');
      }
    } catch (err) {
      console.error("Error resolving ticket:", err);
    } finally {
      setResolvingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-6 h-6 text-red-400" />
            <h1 className="text-2xl font-extrabold text-white tracking-tight">Escalation Command Center</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">High-risk customer issues automatically flagged by SentiAI AI Recovery Engine.</p>
        </div>

        <span className="text-xs px-3 py-1.5 rounded-xl bg-red-950 text-red-400 border border-red-800 font-bold w-fit">
          {escalations.filter(e => e.escalated).length} Active Priority Tickets
        </span>
      </div>

      {/* Dual Routing Insight Alert */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/70 via-slate-900 to-amber-950/40 border border-rose-500/30 flex items-start space-x-3 text-xs text-slate-300">
        <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 flex-shrink-0 mt-0.5">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <div>
          <strong className="text-sm font-black text-rose-300 block mb-0.5">
            Storefront Protection & High-Priority Retailer Alert
          </strong>
          <span>
            When customer feedback is flagged as <strong className="text-rose-400">Angry, Frustrated, or Critical Severity</strong> in the chatbot, SentiAI automatically shields the public storefront and routes the ticket directly into this queue for immediate human agent intervention.
          </span>
        </div>
      </div>

      {/* Main Grid: Ticket List (7 cols) + Selected Ticket Detail & Action Panel (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Tickets Feed */}
        <div className="lg:col-span-7 space-y-3">
          {escalations.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
              <p className="font-semibold text-slate-200">No active escalations!</p>
              <p className="text-xs">All customer complaints are currently resolved.</p>
            </div>
          ) : (
            escalations.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                  activeItem?.id === item.id 
                    ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-500/10' 
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-100">{item.customerName}</span>
                    <span className="text-xs font-mono text-cyan-400">({item.orderId})</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                    item.riskLevel === 'HIGH' ? 'bg-red-950 text-red-400 border-red-800' : 'bg-amber-950 text-amber-400 border-amber-800'
                  }`}>
                    {item.riskLevel} RISK (CRS: {item.recoveryScore})
                  </span>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
                  "{item.feedback}"
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                  <span>Issue: <strong className="text-slate-200">{item.issueType}</strong></span>
                  <span>Emotion: <strong className="text-orange-400">{item.emotion} ({item.intensity}%)</strong></span>
                  <span className={`font-semibold ${item.escalationStatus === 'Resolved' ? 'text-emerald-400' : 'text-amber-400'}`}>
                    Status: {item.escalationStatus}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Agent Action Suite */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5 h-fit shadow-xl sticky top-20">
          {!activeItem ? (
            <div className="py-16 text-center space-y-2 text-slate-400">
              <UserCheck className="w-10 h-10 text-cyan-400 mx-auto mb-2" />
              <p className="font-bold text-slate-200">Select a Ticket to Manage</p>
              <p className="text-xs max-w-xs mx-auto">Click any customer ticket on the left to inspect history and trigger human agent actions.</p>
            </div>
          ) : (
            <div className="space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="font-extrabold text-base text-white">{activeItem.customerName}</h3>
                  <span className="text-xs text-slate-400 font-mono">Order: {activeItem.orderId} • Product: {activeItem.product}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  activeItem.riskLevel === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  CRS: {activeItem.recoveryScore}/100
                </span>
              </div>

              {/* Raw Feedback Quote */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Raw Customer Complaint</span>
                <p className="text-xs text-slate-200 leading-relaxed italic">"{activeItem.feedback}"</p>
              </div>

              {/* Recommended Action */}
              <div className="bg-cyan-950/40 p-3 rounded-xl border border-cyan-800/50 space-y-1">
                <span className="text-[10px] uppercase text-cyan-400 font-bold tracking-wider">AI Recommended Next Best Action</span>
                <p className="text-xs text-cyan-200 font-semibold">{activeItem.nextBestAction}</p>
              </div>

              {/* Agent Quick One-Click Actions */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-slate-300 block">Trigger Instant Agent Actions</span>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleResolveTicket(activeItem.id, "Initiated Full Instant Refund of Order Amount")}
                    disabled={resolvingId === activeItem.id}
                    className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-emerald-400 transition-colors"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Issue Refund</span>
                  </button>

                  <button
                    onClick={() => handleResolveTicket(activeItem.id, "Initiated Courier Express Dispatch & Tracking Upgrade")}
                    disabled={resolvingId === activeItem.id}
                    className="flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-cyan-400 transition-colors"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Expedite Ship</span>
                  </button>
                </div>

                <button
                  onClick={() => handleResolveTicket(activeItem.id, "Dispatched Executive Personal Apology Letter + $25 Store Credit Voucher")}
                  disabled={resolvingId === activeItem.id}
                  className="w-full flex items-center justify-center space-x-1.5 p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-purple-400 transition-colors"
                >
                  <Gift className="w-4 h-4" />
                  <span>Send Personal Apology & $25 Voucher</span>
                </button>
              </div>

              {/* Custom Resolution Note & Mark Complete */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <textarea
                  rows={2}
                  placeholder="Enter custom resolution notes..."
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => handleResolveTicket(activeItem.id)}
                  disabled={resolvingId === activeItem.id}
                  className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-md shadow-cyan-500/20"
                >
                  {resolvingId === activeItem.id ? "Updating Ticket..." : "Mark Escalation Ticket Resolved"}
                </button>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
