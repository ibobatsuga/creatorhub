import React from 'react';
import { TrendingUp, Wallet, BarChart3, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';
import { formatRupiah } from '../utils/helpers';

export default function InsightsSection({ totalCreators, totalFollowers, totalBudget, totalSpend }) {
  return (
    <section className="py-6 md:py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Left Side: Dual Stacked Stat Cards with Glowing Node (matching Image 4) */}
        <div className="lg:col-span-6 relative flex flex-col sm:flex-row items-center gap-5 justify-center">
          
          <div className="space-y-3.5 w-full max-w-xs">
            {/* Stat Card 1 */}
            <div className="rounded-3xl bg-white p-4 sm:p-5 border border-black/[0.04] shadow-card-elevated relative overflow-hidden group hover:translate-y-[-2px] transition-transform">
              <div className="flex items-center justify-between text-xs font-mono-tabular text-[#787884]">
                <span>Total Pipeline Payout</span>
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                  <Wallet className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="font-mono-tabular text-xl sm:text-2xl font-bold text-[#121217]">
                  {formatRupiah(totalSpend)}
                </span>
                <span className="text-[11px] font-mono-tabular font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> 4.92%
                </span>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="rounded-3xl bg-white p-4 sm:p-5 border border-black/[0.04] shadow-card-elevated relative overflow-hidden group hover:translate-y-[-2px] transition-transform">
              <div className="flex items-center justify-between text-xs font-mono-tabular text-[#787884]">
                <span>Total Allocated Budget</span>
                <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                  <BarChart3 className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="mt-2.5 flex items-baseline justify-between">
                <span className="font-mono-tabular text-xl sm:text-2xl font-bold text-[#121217]">
                  {formatRupiah(totalBudget)}
                </span>
                <span className="text-[11px] font-mono-tabular font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" /> 12.4%
                </span>
              </div>
            </div>
          </div>

          {/* Glowing Center Node with Holographic Gradient */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-sun p-[2px] shadow-badge flex items-center justify-center animate-pulse">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                  <div className="bg-[#FF2E7E] rounded-[2px]"></div>
                  <div className="bg-[#FF6036] rounded-[2px]"></div>
                  <div className="bg-[#FFA834] rounded-[2px]"></div>
                  <div className="bg-[#FF2E7E] rounded-[2px]"></div>
                </div>
              </div>
            </div>
            {/* Connecting line to headline */}
            <div className="hidden lg:block absolute left-full top-1/2 w-10 border-t-2 border-dashed border-[#FFA834]/40 -translate-y-1/2"></div>
          </div>

        </div>

        {/* Right Side: Headline & Copy matching Reference */}
        <div className="lg:col-span-6 space-y-4">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111116] leading-[1.15]">
            Unlock insights, <strong className="font-extrabold text-[#111116]">boost efficiency,</strong> and drive growth with our <span className="text-gradient-sun">comprehensive sales overview platform.</span>
          </h2>

          <p className="text-[#626270] text-sm leading-relaxed">
            Eliminate vanity metrics. Every creator record from your Google Sheet is enriched with calculated Engagement Rates (ER%), automated Cost Per View (CPV), and historical content tiering.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-soft">
              <span className="text-[11px] font-mono-tabular text-[#828290] uppercase">Audience Reach</span>
              <p className="text-lg font-mono-tabular font-bold text-[#121217] mt-1">{(totalFollowers / 1000000).toFixed(1)}M+</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-soft">
              <span className="text-[11px] font-mono-tabular text-[#828290] uppercase">KOL & Media</span>
              <p className="text-lg font-mono-tabular font-bold text-[#121217] mt-1">{totalCreators}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-black/[0.04] shadow-soft">
              <span className="text-[11px] font-mono-tabular text-[#828290] uppercase">Average ER</span>
              <p className="text-lg font-mono-tabular font-bold text-emerald-600 mt-1">5.84%</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
