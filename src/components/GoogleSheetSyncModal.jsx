import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, Database, ShieldCheck, Sparkles } from 'lucide-react';

export default function GoogleSheetSyncModal({ isOpen, onClose, onRefresh, isSyncing, totalRows, lastSyncTime }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-black/[0.08] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-black/[0.06] flex items-center justify-between bg-[#fbfbfd]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 p-2 flex items-center justify-center text-emerald-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#121217]">Google Sheets Live Sync</h3>
              <p className="text-[11px] text-[#787884]">Master Database Connection</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/[0.08] text-[#787884] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Status Banner */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs">
              <h4 className="font-bold text-emerald-900">Live Database Connected</h4>
              <p className="text-emerald-700 mt-0.5 leading-relaxed">
                CreatorHub is currently synced with your consolidated master spreadsheet. Total <strong className="font-mono-tabular">{totalRows}</strong> records loaded.
              </p>
            </div>
          </div>

          {/* Details Box */}
          <div className="p-4 rounded-2xl bg-[#f8f8fa] border border-black/[0.04] space-y-3 text-xs font-mono-tabular">
            <div>
              <span className="text-[#888894] block text-[10px] uppercase">Connection Status:</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Live Sync Pipeline
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-black/[0.04]">
              <div>
                <span className="text-[#888894] block text-[10px] uppercase">Data Cluster:</span>
                <span className="font-semibold text-[#121217]">MASTER KOL & MEDIA</span>
              </div>
              <div>
                <span className="text-[#888894] block text-[10px] uppercase">Last Synchronized:</span>
                <span className="font-semibold text-[#121217]">{lastSyncTime || 'Just now'}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-black/[0.04]">
              <span className="text-[#888894] block text-[10px] uppercase">Mapped Columns:</span>
              <span className="text-[#555562] text-[11px]">
                ID, Region, City/Area, Entity Type, Tier, Name, Handle, Category, Platform, Followers, Status
              </span>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-black/[0.06] bg-[#fbfbfd] flex items-center justify-between">
          <span className="text-xs text-[#787884]">Changes in Sheets reflect on refresh</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-black/[0.08] hover:bg-black/[0.03] text-xs font-semibold text-[#121217] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={onRefresh}
              disabled={isSyncing}
              className="px-5 py-2.5 rounded-full bg-[#121217] text-white text-xs font-semibold hover:bg-black flex items-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? 'Refreshing...' : 'Re-sync Sheets Now'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
