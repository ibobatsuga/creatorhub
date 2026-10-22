import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Sparkles, Tv, Radio, Newspaper, Globe } from 'lucide-react';
import { InstagramIcon } from './Icons';

export default function Hero({ onExplore, onOpenRoster, totalCreators }) {
  return (
    <section className="pt-12 pb-16 md:py-20 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Headline and Actions */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          
          {/* Subtle Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-soft">
            <span className="w-2 h-2 rounded-full bg-[#FF2E7E] animate-pulse"></span>
            <span className="text-[11px] font-medium text-[#50505c]">
              Google Sheet Connected · <strong className="text-[#121217]">{totalCreators} Real KOLs & Media</strong>
            </span>
          </div>

          {/* Main Title matching Reference Image */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#111116] leading-[1.08]">
            It's ready and <br />
            set <span className="text-gradient-sun">Just create.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[#626270] text-base sm:text-lg max-w-xl leading-relaxed">
            Eliminate messy spreadsheets and manual DM negotiations. Discover verified creators across Indonesian, track live campaign delivery, and execute instant smart contract payouts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExplore}
              className="px-6 py-3 rounded-full bg-[#121217] text-white font-medium text-sm hover:bg-black transition-all shadow-md flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore 467 Creators</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenRoster}
              className="px-5 py-3 rounded-full bg-white text-[#121217] font-medium text-sm border border-black/[0.08] hover:bg-black/[0.03] transition-all cursor-pointer shadow-soft"
            >
              Open Campaign Roster
            </button>
          </div>

          {/* Platform Pills & Trust Badges */}
          <div className="pt-6 flex flex-wrap items-center gap-4">
            <span className="text-xs font-mono-tabular text-[#828290] uppercase tracking-wider font-semibold">
              Supported Channels
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.05] text-xs font-medium text-[#40404c] shadow-soft">
                <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" /> Instagram (405)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.05] text-xs font-medium text-[#40404c] shadow-soft">
                <Tv className="w-3.5 h-3.5 text-[#3B82F6]" /> Broadcast TV (28)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/[0.05] text-xs font-medium text-[#40404c] shadow-soft">
                <Newspaper className="w-3.5 h-3.5 text-[#10B981]" /> Online Media (34)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Layered Floating UI Cards matching Reference Image 5 */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          
          {/* Ambient Glow behind cards */}
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-gradient-to-tr from-[#FF2E7E]/20 via-[#FF6036]/15 to-[#FFA834]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative w-full max-w-md">
            
            {/* Background Card with Glowing Sunset Gradient Border */}
            <div className="relative rounded-3xl p-1 bg-gradient-sun shadow-card-elevated">
              <div className="bg-[#fbfbfd] rounded-[22px] p-6 pb-8 space-y-4">
                
                {/* Header in Back Card */}
                <div className="flex justify-between items-center text-xs text-[#828290] font-mono-tabular">
                  <span>MASTER POOL</span>
                  <span className="px-2 py-0.5 rounded-full bg-black/[0.04] text-[#121217] font-semibold">ID-REGION-ACTIVE</span>
                </div>

                {/* Sub-header mock items */}
                <div className="space-y-2 opacity-60">
                  <div className="h-3 bg-black/[0.06] rounded-full w-3/4"></div>
                  <div className="h-3 bg-black/[0.04] rounded-full w-1/2"></div>
                </div>
              </div>
            </div>

            {/* Foreground Overlapping Card with Notch Cutout (matching reference) */}
            <div className="relative -mt-16 mx-4 rounded-3xl bg-white p-6 shadow-card-elevated border border-black/[0.04]">
              
              {/* Notched Top Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#121217]"></div>
                  <span className="font-mono-tabular font-medium text-xs text-[#121217]">
                    {totalCreators} creators pool
                  </span>
                </div>
                
                {/* Holographic Squircle Logo Badge */}
                <div className="w-8 h-8 rounded-xl bg-gradient-sun p-[1px] shadow-sm">
                  <div className="w-full h-full bg-[#121217] rounded-[11px] flex items-center justify-center p-1.5">
                    <div className="grid grid-cols-2 gap-0.5 w-full h-full">
                      <div className="bg-[#FF2E7E] rounded-[1px]"></div>
                      <div className="bg-[#FFA834] rounded-[1px]"></div>
                      <div className="bg-[#FFA834] rounded-[1px]"></div>
                      <div className="bg-[#FF2E7E] rounded-[1px]"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body Mock Numbers */}
              <div className="mt-6 mb-4">
                <div className="w-8 h-6 bg-[#eaeaf0] rounded-md mb-2 flex items-center justify-center">
                  <div className="w-4 h-3 border border-black/20 rounded-[2px]"></div>
                </div>
                <div className="font-mono-tabular tracking-widest text-[#121217] text-sm font-semibold">
                  **** **** **** 4444
                </div>
              </div>

              {/* Subtle subtext */}
              <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] text-xs font-mono-tabular text-[#787884]">
                <span>CONSOLIDATED HOTEL KOL</span>
                <span className="font-semibold text-emerald-600">+100.00% SYNC</span>
              </div>
            </div>

            {/* Floating Pill Badge 1: Payment Success (matches reference) */}
            <div className="absolute -bottom-6 -right-3 md:-right-6 bg-white px-4 py-3 rounded-2xl shadow-card-elevated border border-black/[0.05] flex items-center gap-3 animate-bounce [animation-duration:5s]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm"></span>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono-tabular text-[#787884] uppercase tracking-wider">Payment success</span>
                <span className="text-sm font-mono-tabular font-bold text-[#121217]">+$3,256.88</span>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-500 ml-1" />
            </div>

            {/* Floating Pill Badge 2: Payment Due (matches reference) */}
            <div className="absolute -top-6 -left-3 md:-left-6 bg-white px-4 py-3 rounded-2xl shadow-card-elevated border border-black/[0.05] flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm animate-pulse"></span>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono-tabular text-[#787884] uppercase tracking-wider">Payment Due</span>
                <span className="text-sm font-mono-tabular font-bold text-[#121217]">+Rp 7.500.000</span>
              </div>
              <Clock className="w-4 h-4 text-amber-500 ml-1" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
