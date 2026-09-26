import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  Legend 
} from 'recharts';
import { 
  MessageSquare, 
  ThumbsUp, 
  ShieldAlert, 
  Award, 
  TrendingUp, 
  Filter, 
  Clock, 
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

export const RetailerDashboard = () => {
  const { dashboardData, loadingDashboard, refreshAnalytics } = useContext(AppContext);

  if (loadingDashboard || !dashboardData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto mb-4" />
        <h3 className="text-lg font-bold text-slate-200">Loading Retailer Analytics...</h3>
      </div>
    );
  }

  const { kpis, sentimentDistribution, emotionDistribution, categoryDistribution, sentimentTrend, recentFeedbacks } = dashboardData;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Dashboard Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Retail Sentiment & Executive Operations</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time customer feedback distribution, emotion intensity & escalation monitoring.</p>
        </div>

        <button
          onClick={refreshAnalytics}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-sm font-semibold text-cyan-400 transition-colors shadow-sm w-fit"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Feedback */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Feedback Interactions</span>
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{kpis.totalFeedback}</div>
          <div className="text-xs text-slate-400 flex items-center space-x-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">+14%</span>
            <span>vs previous week</span>
          </div>
        </div>

        {/* KPI 2: Positive Sentiment Rate */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Positive Sentiment</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <ThumbsUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{kpis.positivePercentage}%</div>
          <div className="text-xs text-slate-400">
            Neutral: {kpis.neutralPercentage}% | Negative: {kpis.negativePercentage}%
          </div>
        </div>

        {/* KPI 3: Avg Customer Recovery Score */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Recovery Score</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{kpis.avgRecoveryScore}<span className="text-sm text-slate-400 font-sans">/100</span></div>
          <div className="text-xs text-slate-400">
            Target benchmark: &gt; 70
          </div>
        </div>

        {/* KPI 4: Total Escalated Cases */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">High Risk Escalations</span>
            <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white font-mono">{kpis.totalEscalated}</div>
          <div className="text-xs text-amber-400 font-medium">
            Requires human agent review
          </div>
        </div>

      </div>

      {/* Row 2 Charts: Sentiment Distribution Donut + 7-Day Sentiment Trend Line */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Sentiment Distribution Donut Chart (4 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wide">Overall Sentiment Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 7-Day Sentiment Trend Line Chart (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wide">Sentiment Trend Over Time (7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentTrend}>
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }} />
                <Legend />
                <Line type="monotone" dataKey="positive" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} name="Positive %" />
                <Line type="monotone" dataKey="neutral" stroke="#F59E0B" strokeWidth={2} dot={{ r: 3 }} name="Neutral %" />
                <Line type="monotone" dataKey="negative" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} name="Negative %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Row 3 Charts: Emotion Breakdown + Issue Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Emotion Distribution Bar Chart */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wide">Customer Emotion Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emotionDistribution}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }} />
                <Bar dataKey="count" fill="#0EA5E9" radius={[6, 6, 0, 0]} name="Occurrences" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Complaint Category Bar Chart */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-extrabold text-slate-200 uppercase tracking-wide">Most Common Complaint Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryDistribution} layout="vertical">
                <XAxis type="number" stroke="#64748b" />
                <YAxis dataKey="category" type="category" stroke="#64748b" fontSize={11} width={110} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', color: '#f8fafc' }} />
                <Bar dataKey="count" fill="#6366F1" radius={[0, 6, 6, 0]} name="Volume" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Recent Feedback Feed Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-100">Live Customer Feedback Log</h3>
          <span className="text-xs text-slate-400">Showing latest customer interactions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Sentiment / Emotion</th>
                <th className="py-3 px-3">CRS Score</th>
                <th className="py-3 px-3">Risk Level</th>
                <th className="py-3 px-3">Next Best Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {recentFeedbacks.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-200">{item.customerName}</td>
                  <td className="py-3 px-3 font-mono text-cyan-400">{item.orderId}</td>
                  <td className="py-3 px-3 truncate max-w-[160px]">{item.product}</td>
                  <td className="py-3 px-3">{item.category}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-block px-2 py-0.5 rounded font-bold mr-1.5 ${
                      item.sentiment === 'Positive' ? 'bg-emerald-950 text-emerald-400' :
                      item.sentiment === 'Negative' ? 'bg-red-950 text-red-400' :
                      'bg-amber-950 text-amber-400'
                    }`}>
                      {item.sentiment}
                    </span>
                    <span className="text-slate-400">{item.emotion} ({item.intensity}%)</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-white">{item.recoveryScore}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      item.riskLevel === 'HIGH' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      item.riskLevel === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {item.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 truncate max-w-[200px]">{item.nextBestAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
