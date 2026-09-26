import React, { useContext } from 'react';
import { AppContext } from './context/AppContext';
import { TopPortalBar } from './components/TopPortalBar';
import { CustomerStorefront } from './components/CustomerStorefront';
import { RetailerPortal } from './components/RetailerPortal';

export default function App() {
  const { activePersona } = useContext(AppContext);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
      {/* 1. Global Portal Switcher Header */}
      <TopPortalBar />

      {/* 2. Completely Separate Sites based on Persona */}
      <main className="flex-1">
        {activePersona === 'customer' ? (
          <CustomerStorefront />
        ) : (
          <RetailerPortal />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-3 text-center text-xs text-slate-400">
        SentiAI Intelligent Retail Sentiment & Customer Recovery Platform &copy; 2026 • Dual-Routing Customer Praise & Escalations
      </footer>
    </div>
  );
}
