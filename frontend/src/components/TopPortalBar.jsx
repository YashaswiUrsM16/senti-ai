import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  Store, 
  ShieldAlert, 
  Sparkles, 
  Key, 
  X, 
  Check, 
  Cpu, 
  ExternalLink,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const TopPortalBar = () => {
  const { activePersona, setActivePersona, setActiveTab, escalations } = useContext(AppContext);
  const activeEscalationsCount = escalations ? escalations.filter(e => e.escalated).length : 0;

  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('sentiai_api_key') || '');
  const [apiProvider, setApiProvider] = useState(() => localStorage.getItem('sentiai_api_provider') || 'gemini');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveKey = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('sentiai_api_key', apiKey.trim());
      localStorage.setItem('sentiai_api_provider', apiProvider);
    } else {
      localStorage.removeItem('sentiai_api_key');
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsKeyModalOpen(false);
    }, 1200);
  };

  const hasCustomKey = Boolean(apiKey.trim());

  return (
    <>
      <div className="bg-slate-950 border-b border-slate-800 text-xs px-4 py-2 sticky top-0 z-50 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-2">
          <span className="font-extrabold text-slate-300 tracking-wide uppercase text-[11px] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SentiAI Retail Dual-Portal System</span>
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          
          {/* Active AI Model Badge */}
          <button
            onClick={() => setIsKeyModalOpen(true)}
            className={`hidden md:flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all border ${
              hasCustomKey
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50 hover:bg-emerald-900'
                : 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40 hover:bg-indigo-900'
            }`}
            title="Click to configure live LLM API Keys (Gemini / OpenAI)"
          >
            <Cpu className="w-3 h-3" />
            <span>AI Mode: {hasCustomKey ? `${apiProvider === 'gemini' ? 'Gemini 1.5' : 'GPT-4o'} (Live Key)` : 'In-House Engine'}</span>
            <Key className="w-2.5 h-2.5 ml-0.5 opacity-70" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {/* API Key Modal Button */}
          <button
            onClick={() => setIsKeyModalOpen(true)}
            className="p-1.5 text-slate-400 hover:text-cyan-400 rounded-lg hover:bg-slate-900 border border-slate-800 transition-colors flex items-center space-x-1 text-xs"
            title="Configure AI API Keys"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline text-[11px] font-bold">API Keys</span>
          </button>

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

      {/* API Key Configuration Modal */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">AI Model & API Key Gateway</h3>
                  <span className="text-[10px] text-slate-400">Google Gemini & OpenAI Integration</span>
                </div>
              </div>
              <button 
                onClick={() => setIsKeyModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              SentiAI supports both <strong>Live LLM API Keys</strong> (Google Gemini / OpenAI) and an <strong>In-House Zero-Latency Engine</strong>. Enter your key below to activate live LLM sentiment extraction & natural empathetic generation:
            </p>

            <form onSubmit={handleSaveKey} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1.5">
                  Select AI Provider:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setApiProvider('gemini')}
                    className={`py-2 px-3 rounded-xl border font-bold text-left transition-all ${
                      apiProvider === 'gemini'
                        ? 'bg-indigo-600/30 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="block text-white font-black">Google Gemini</span>
                    <span className="text-[10px] text-slate-400">Gemini 1.5 Flash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setApiProvider('openai')}
                    className={`py-2 px-3 rounded-xl border font-bold text-left transition-all ${
                      apiProvider === 'openai'
                        ? 'bg-indigo-600/30 border-indigo-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <span className="block text-white font-black">OpenAI</span>
                    <span className="text-[10px] text-slate-400">GPT-4o-mini</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1.5">
                  {apiProvider === 'gemini' ? 'Gemini API Key (starts with AIza...)' : 'OpenAI API Key (starts with sk-...)'}:
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={apiProvider === 'gemini' ? 'AIzaSy...' : 'sk-proj-...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                />
                <span className="text-[10px] text-slate-500 block mt-1">
                  Leave blank to use the built-in O(1) in-house NLP engine.
                </span>
              </div>

              {savedSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>API Key preference saved successfully!</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setApiKey('');
                    localStorage.removeItem('sentiai_api_key');
                    setSavedSuccess(true);
                    setTimeout(() => {
                      setSavedSuccess(false);
                      setIsKeyModalOpen(false);
                    }, 1000);
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
                >
                  Clear Key
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Save & Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
