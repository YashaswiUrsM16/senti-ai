import React, { useState, useEffect } from 'react';
import { 
  SlidersHorizontal, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Users, 
  Package, 
  Lightbulb,
  Play
} from 'lucide-react';

export const WhatIfSimulator = () => {
  const [deliveryIncreasePct, setDeliveryIncreasePct] = useState(20);
  const [category, setCategory] = useState('Delivery');
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runSimulation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/simulation/what-if', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deliveryIncreasePct, category })
      });
      const data = await response.json();
      if (data.success) {
        setSimulationResult(data.simulation);
      }
    } catch (err) {
      console.error("Simulation error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [deliveryIncreasePct, category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-6 h-6 text-indigo-400" />
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Retail What-If Simulation Suite</h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">Predict customer churn, financial exposure & affected product segments before complaints escalate.</p>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Slider (7 cols) */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-200">
                Simulated Complaint Surge: <span className="text-cyan-400 font-mono text-base">+{deliveryIncreasePct}%</span>
              </label>
              <span className="text-xs text-slate-400 font-mono">Range: 5% to 100%</span>
            </div>
            
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={deliveryIncreasePct}
              onChange={(e) => setDeliveryIncreasePct(e.target.value)}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Category Dropdown (5 cols) */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-sm font-bold text-slate-200 block">Target Issue Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Delivery">Delivery Delays & Carrier Logistics</option>
              <option value="Product Quality">Product Quality & Defect Rates</option>
              <option value="Damaged Product">Transit Packaging & Damaged Goods</option>
              <option value="Payment">Payment Gateway & Duplicate Charges</option>
              <option value="All">All Combined Categories</option>
            </select>
          </div>

        </div>
      </div>

      {/* Simulation Results Display */}
      {simulationResult && (
        <div className="space-y-6">
          
          {/* KPI Summary Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">Baseline vs Projected Negative Cases</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-slate-400">{simulationResult.metrics.currentNegativeCases}</span>
                <span className="text-xl font-bold text-cyan-400">&rarr;</span>
                <span className="text-3xl font-black text-red-400 font-mono">{simulationResult.metrics.projectedNegativeCases}</span>
              </div>
              <span className="text-xs text-red-400 font-semibold">+{simulationResult.metrics.additionalMonthlyCases} cases / month</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">Estimated Annual Revenue at Risk</span>
              <div className="text-3xl font-black text-amber-400 font-mono">{simulationResult.metrics.estimatedRevenueRisk}</div>
              <span className="text-xs text-slate-400">Factoring Customer Lifetime Value loss</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">Primary Churn Risk Level</span>
              <div className="text-3xl font-black text-rose-500 font-mono">CRITICAL</div>
              <span className="text-xs text-rose-400">First-time buyers most vulnerable</span>
            </div>

          </div>

          {/* 2 Column Details: Segment Churn Impact + Product Revenue Exposure */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Customer Segment Impact (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Users className="w-5 h-5 text-cyan-400" />
                <h3 className="font-extrabold text-base text-white">Impact on Customer Segments</h3>
              </div>

              <div className="space-y-3">
                {simulationResult.segmentImpact.map((seg, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-200">{seg.segment}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-red-950 text-red-400 border border-red-800">
                        {seg.churnRiskLevel} CHURN
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Baseline Risk: <strong className="text-slate-300">{seg.baselineRisk}</strong></span>
                      <span>Projected Surge Risk: <strong className="text-red-400 font-mono text-sm">{seg.projectedRisk}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Most Affected Products (6 cols) */}
            <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                <Package className="w-5 h-5 text-indigo-400" />
                <h3 className="font-extrabold text-base text-white">Top Impacted Products & Revenue Risk</h3>
              </div>

              <div className="space-y-3">
                {simulationResult.productImpact.map((prod, idx) => (
                  <div key={idx} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-200">{prod.productName}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">Category: {prod.category}</span>
                    </div>

                    <div className="text-right space-y-0.5">
                      <span className="text-xs font-bold text-amber-400 font-mono block">${prod.estimatedRevenueAtRisk.toLocaleString()} at risk</span>
                      <span className="text-[10px] text-slate-400 block">{prod.projectedNegatives} projected negative reviews</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* AI Strategic Mitigation Recommendations */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-800/40 rounded-2xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-6 h-6 text-amber-400" />
              <h3 className="text-base font-extrabold text-white">AI Executive Strategic Mitigation Plan</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {simulationResult.recommendations.map((rec, idx) => (
                <div key={idx} className="bg-slate-950/90 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-medium">
                  <span className="text-cyan-400 font-bold block mb-1">Mitigation Strategy #{idx + 1}</span>
                  "{rec}"
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
