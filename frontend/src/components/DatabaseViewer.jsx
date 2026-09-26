import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Database, 
  Server, 
  Table, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Hash, 
  Layers, 
  RefreshCw,
  HardDrive,
  FileText,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const DatabaseViewer = () => {
  const { escalations, productData, refreshAnalytics } = useContext(AppContext);
  const [selectedTable, setSelectedTable] = useState('feedbacks');
  const [searchTerm, setSearchTerm] = useState('');
  const [dbInfo, setDbInfo] = useState({
    engine: "SQLite 3",
    dbFileName: "sentiai.db",
    storageType: "Persistent Relational Database",
    location: "backend/src/db/sentiai.db & LocalStorage Persistence"
  });

  const filteredFeedbacks = (escalations || []).filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      (item.customerName && item.customerName.toLowerCase().includes(term)) ||
      (item.product && item.product.toLowerCase().includes(term)) ||
      (item.feedback && item.feedback.toLowerCase().includes(term)) ||
      (item.id && item.id.toLowerCase().includes(term)) ||
      (item.sentiment && item.sentiment.toLowerCase().includes(term))
    );
  });

  const filteredProducts = (productData || []).filter(item => {
    const term = searchTerm.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(term)) ||
      (item.category && item.category.toLowerCase().includes(term)) ||
      (item.id && item.id.toLowerCase().includes(term))
    );
  });

  return (
    <div className="space-y-6">
      
      {/* 1. Database Architecture Summary Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black text-white">SentiAI Database Explorer</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-black uppercase flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>SQL ONLINE</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect raw structured records in the SQLite relational database (<code className="text-cyan-400">sentiai.db</code>).
              </p>
            </div>
          </div>

          {/* Database Specs Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-1.5 text-slate-300">
              <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
              <span>Engine: <strong className="text-white">SQLite 3</strong></span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-1.5 text-slate-300">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>File: <strong className="text-white">sentiai.db</strong></span>
            </div>
            <button
              onClick={refreshAnalytics}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="Refresh database records"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Table Switcher & Record Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setSelectedTable('feedbacks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              selectedTable === 'feedbacks'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Table: feedbacks</span>
            <span className="px-1.5 py-0.5 rounded-md bg-slate-950/80 text-[10px] font-mono text-indigo-200">
              {escalations ? escalations.length : 0}
            </span>
          </button>

          <button
            onClick={() => setSelectedTable('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              selectedTable === 'products'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Table: products</span>
            <span className="px-1.5 py-0.5 rounded-md bg-slate-950/80 text-[10px] font-mono text-indigo-200">
              {productData ? productData.length : 0}
            </span>
          </button>
        </div>

        {/* Search Filter */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={`Search ${selectedTable} records...`}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
        </div>
      </div>

      {/* 3. Live Database Table Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          {selectedTable === 'feedbacks' ? (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">ID / Order</th>
                  <th className="px-4 py-3.5">Customer</th>
                  <th className="px-4 py-3.5">Product & Feedback</th>
                  <th className="px-4 py-3.5">Sentiment / Emotion</th>
                  <th className="px-4 py-3.5">Recovery Score (CRS)</th>
                  <th className="px-4 py-3.5">Status / Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredFeedbacks.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-indigo-400 font-bold block">{row.id}</span>
                      <span className="text-[10px] text-slate-500">{row.orderId || "N/A"}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="font-bold text-white block">{row.customerName || "Sarah Jenkins"}</span>
                      <span className="text-[10px] text-slate-400">{row.customerId || "CUST-9001"}</span>
                    </td>
                    <td className="px-4 py-3.5 max-w-sm">
                      <span className="text-[11px] font-bold text-cyan-400 block">{row.product || "Retail Catalog"}</span>
                      <p className="text-slate-300 line-clamp-2 mt-0.5 italic">"{row.feedback}"</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-block px-2 py-0.5 rounded-md font-bold text-[10px] uppercase ${
                        row.sentiment === 'Positive'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : row.sentiment === 'Negative'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {row.sentiment} ({row.emotion || "Neutral"})
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-1">Intensity: {row.intensity || 85}%</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center space-x-2">
                        <span className={`font-mono font-black text-sm ${
                          (row.recoveryScore || 50) >= 70 ? 'text-emerald-400' : (row.recoveryScore || 50) >= 40 ? 'text-amber-400' : 'text-rose-400'
                        }`}>
                          {row.recoveryScore || 50}/100
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                          row.riskLevel === 'HIGH' ? 'bg-rose-950 text-rose-400' : 'bg-emerald-950 text-emerald-400'
                        }`}>
                          {row.riskLevel || 'LOW'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        row.escalationStatus === 'Resolved'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {row.escalationStatus || 'Pending'}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-1 line-clamp-1">{row.nextBestAction || row.resolution}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">ID / Name</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Price</th>
                  <th className="px-4 py-3.5">Rating & Sentiment</th>
                  <th className="px-4 py-3.5">Latest Live Customer Praise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="font-mono text-cyan-400 font-bold block">{p.id}</span>
                      <span className="font-bold text-white">{p.name}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-semibold">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-white font-mono">
                      ${p.price ? p.price.toFixed(2) : "0.00"}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="text-amber-400 font-bold">★ {p.rating || 4.8}</span>
                      <span className="text-emerald-400 text-[10px] font-bold block mt-0.5">
                        {p.positivePercentage || 95}% Loved ({p.totalReviews || 18} reviews)
                      </span>
                    </td>
                    <td className="px-4 py-3.5 max-w-sm">
                      <p className="text-slate-300 italic text-[11px] line-clamp-2">
                        "{p.latestPraise?.text || p.happyQuotes?.[0] || 'No praise recorded yet'}"
                      </p>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        By: {p.latestPraise?.customer || "Verified Customer"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

    </div>
  );
};
