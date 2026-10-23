import React from 'react';
import { MapPin, Building2, Users } from 'lucide-react';

export default function PropertiesStrip({ regionStats }) {
  return (
    <section className="py-4 md:py-6 px-4 md:px-8 max-w-7xl mx-auto w-full">
      {/* Timeline rule with hexagonal nodes matching Reference Image */}
      <div className="relative flex items-center justify-center my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-black/[0.08]"></div>
        </div>
        <div className="relative flex items-center gap-6 sm:gap-10 bg-[#f4f4f6] px-4 text-[10px] md:text-[11px] font-mono-tabular text-[#828290] uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rotate-45 border border-black/30 bg-white"></span>
            9 Operating Regional Clusters
          </span>
          <span className="hidden md:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rotate-45 border border-black/30 bg-white"></span>
            Integrated Hotel Units & Properties
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rotate-45 border border-black/30 bg-white"></span>
            467 Verified Listings
          </span>
        </div>
      </div>

      {/* Region Carousel Badges - Clean horizontal scroll with completely hidden scrollbar */}
      <div className="flex items-center gap-3 overflow-x-auto py-2 no-scrollbar scroll-smooth">
        {regionStats.map((item) => (
          <div
            key={item.region}
            className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white border border-black/[0.05] shadow-soft hover:border-black/[0.12] transition-colors"
          >
            <div className="w-6 h-6 rounded-lg bg-black/[0.03] flex items-center justify-center text-[#555562]">
              <MapPin className="w-3.5 h-3.5 text-[#FF6036]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#121217] whitespace-nowrap">{item.region}</span>
              <span className="text-[10px] font-mono-tabular text-[#828290]">{item.count} Accounts</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
