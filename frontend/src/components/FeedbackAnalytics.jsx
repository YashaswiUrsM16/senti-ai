import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Package, Search, Filter, AlertTriangle, CheckCircle, Flame, Star } from 'lucide-react';

export const FeedbackAnalytics = () => {
  const { productData } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = productData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Product-Level Sentiment Analytics</h1>
          <p className="text-sm text-slate-400 mt-1">Granular evaluation of product sentiment, defect trends & customer recovery health.</p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 w-48 sm:w-64"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Home & Bedding">Home & Bedding</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Apparel">Apparel</option>
          </select>
        </div>
      </div>

      {/* Product Sentiment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((prod) => (
          <div 
            key={prod.id} 
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between"
          >
            <div>
              {/* Product Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">{prod.category}</span>
                  <h3 className="font-extrabold text-base text-slate-100 leading-snug">{prod.name}</h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                  prod.status === 'Healthy' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                  prod.status === 'Needs Monitoring' ? 'bg-amber-950 text-amber-400 border-amber-800' :
                  'bg-red-950 text-red-400 border-red-800 animate-pulse'
                }`}>
                  {prod.status}
                </span>
              </div>

              {/* Price & Review Count */}
              <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                <span>Unit Price: <strong className="text-white">${prod.price}</strong></span>
                <span>Total Feedback: <strong className="text-white">{prod.totalReviews} reviews</strong></span>
              </div>
            </div>

            {/* Metrics */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              
              {/* Positive Sentiment % Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Positive Sentiment</span>
                  <span className="font-bold text-emerald-400">{prod.positivePercentage}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-300"
                    style={{ width: `${prod.positivePercentage}%` }}
                  />
                </div>
              </div>

              {/* Recovery Score */}
              <div className="flex items-center justify-between text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 font-medium">Avg Recovery Score</span>
                <span className="font-mono font-bold text-white text-sm">{prod.avgRecoveryScore} / 100</span>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
