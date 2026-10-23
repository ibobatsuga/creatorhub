import React from 'react';
import { Search, Database, Sparkles, ExternalLink, RefreshCw } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, sheetCount, onOpenSync, isSyncing }) {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'directory', label: `Directory (${sheetCount})` },
    { id: 'campaigns', label: 'Campaign Roster' },
    { id: 'contracts', label: 'Smart Contracts' },
  ];

  return (
    <header className="sticky top-2.5 z-40 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-sun p-[1px] shadow-sm transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#ffffff] rounded-[15px] flex items-center justify-center p-2">
              <div className="grid grid-cols-2 gap-1 w-full h-full">
                <div className="bg-[#FF2E7E] rounded-sm"></div>
                <div className="bg-[#FF6036] rounded-sm opacity-90"></div>
                <div className="bg-[#FFA834] rounded-sm opacity-90"></div>
                <div className="bg-[#FF2E7E] rounded-sm"></div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg tracking-tight text-[#111116] flex items-center gap-1.5">
              CreatorHub
              <span className="text-[10px] font-mono-tabular bg-[#111116] text-white px-1.5 py-0.5 rounded-full font-medium">v2.6</span>
            </span>
            <span className="text-[11px] text-[#787884] -mt-1 hidden sm:block">Hospitality & Lifestyle KOL Suite</span>
          </div>
        </div>

        {/* Floating Center Pill Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#ffffff]/90 backdrop-blur-md px-2 py-1.5 rounded-full border border-black/[0.05] shadow-soft">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#121217] text-white shadow-sm'
                    : 'text-[#62626e] hover:text-[#121217] hover:bg-black/[0.03]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Live Sheet Sync Status Pill */}
          <button
            onClick={onOpenSync}
            title="Connected to Google Sheet Database"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-black/[0.06] shadow-soft hover:bg-black/[0.02] transition-colors cursor-pointer text-xs font-medium text-[#444450]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline font-mono-tabular text-[11px]">467 Sheets Synced</span>
            <RefreshCw className={`w-3.5 h-3.5 text-[#888894] ${isSyncing ? 'animate-spin text-[#FF2E7E]' : ''}`} />
          </button>

          {/* Quick CTA Pill Button */}
          <button 
            onClick={() => setActiveTab('directory')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#121217] text-white text-xs font-semibold hover:bg-black transition-all shadow-sm cursor-pointer"
          >
            Launch Database
          </button>
        </div>
      </div>
    </header>
  );
}
