import React, { useState, useMemo } from 'react';
import { Search, Filter, Tv, Newspaper, MapPin, UserCheck, Plus, FileText, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { formatNumber, formatRupiah } from '../utils/helpers';

export default function KOLDirectory({ creators, onAddToRoster, onDraftContract, rosterIds }) {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState('All');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedPlatform, setSelectedPlatform] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Extract unique regions & platforms
  const regions = useMemo(() => {
    const list = Array.from(new Set(creators.map(c => c.region))).filter(Boolean).sort();
    return ['All', ...list];
  }, [creators]);

  const tiers = ['All', 'Nano', 'Micro', 'Macro', 'Media Outlet'];

  // Filtered creators
  const filtered = useMemo(() => {
    return creators.filter(c => {
      // Search
      const q = search.toLowerCase();
      const matchSearch = !q || 
        c.name.toLowerCase().includes(q) || 
        c.handle.toLowerCase().includes(q) || 
        c.city.toLowerCase().includes(q) || 
        c.category.toLowerCase().includes(q);

      // Tier
      const matchTier = selectedTier === 'All' || c.tier === selectedTier;

      // Region
      const matchRegion = selectedRegion === 'All' || c.region === selectedRegion;

      // Platform
      const matchPlatform = selectedPlatform === 'All' || 
        (selectedPlatform === 'Instagram' && c.platform === 'Instagram') ||
        (selectedPlatform === 'Broadcast' && (c.platform.includes('TV') || c.platform.includes('Radio'))) ||
        (selectedPlatform === 'Online' && (c.platform.includes('News') || c.platform.includes('Digital')));

      // Type
      const matchType = selectedType === 'All' || c.entityType === selectedType;

      return matchSearch && matchTier && matchRegion && matchPlatform && matchType;
    });
  }, [creators, search, selectedTier, selectedRegion, selectedPlatform, selectedType]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getPlatformIcon = (platform) => {
    if (platform === 'Instagram') return <InstagramIcon className="w-3.5 h-3.5 text-[#E1306C]" />;
    if (platform.includes('TV')) return <Tv className="w-3.5 h-3.5 text-[#3B82F6]" />;
    return <Newspaper className="w-3.5 h-3.5 text-[#10B981]" />;
  };

  return (
    <section id="directory" className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
      
      {/* Header with Title and Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-xs font-mono-tabular text-[#555562] mb-2 shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2E7E]"></span>
            Master Database Explorer
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111116] tracking-tight">
            KOL & Media Directory <span className="text-gradient-sun">({filtered.length})</span>
          </h2>
          <p className="text-sm text-[#787884] mt-1">
            Consolidated registry across operating hotel units, properties, and regional agencies.
          </p>
        </div>

        {/* Search Bar matching sleek pill style */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9898a4]" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search handle, name, city, category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-black/[0.08] shadow-soft text-xs text-[#121217] placeholder:text-[#9898a4] focus:outline-none focus:ring-2 focus:ring-[#FF2E7E]/30 focus:border-[#FF2E7E] transition-all"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#9898a4] hover:text-[#121217]"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="bg-white rounded-3xl p-4 md:p-5 border border-black/[0.05] shadow-soft mb-8 space-y-4">
        
        {/* Tier Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-xs font-semibold text-[#888894] mr-1 whitespace-nowrap">Tier:</span>
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => { setSelectedTier(t); setPage(1); }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedTier === t
                  ? 'bg-[#121217] text-white shadow-sm'
                  : 'bg-black/[0.03] text-[#555562] hover:bg-black/[0.06]'
              }`}
            >
              {t}
            </button>
          ))}

          <div className="h-4 w-[1px] bg-black/[0.1] mx-2 hidden sm:block"></div>

          {/* Entity Type */}
          {['All', 'KOL', 'Media'].map((t) => (
            <button
              key={t}
              onClick={() => { setSelectedType(t); setPage(1); }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedType === t
                  ? 'bg-[#FF2E7E] text-white shadow-sm'
                  : 'bg-black/[0.03] text-[#555562] hover:bg-black/[0.06]'
              }`}
            >
              {t === 'All' ? 'All Types' : t}
            </button>
          ))}
        </div>

        {/* Region & Platform Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-black/[0.04]">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#888894]" />
            <select
              value={selectedRegion}
              onChange={(e) => { setSelectedRegion(e.target.value); setPage(1); }}
              className="text-xs bg-black/[0.03] border border-black/[0.06] rounded-xl px-3 py-1.5 text-[#121217] focus:outline-none focus:ring-1 focus:ring-[#FF2E7E] cursor-pointer"
            >
              {regions.map(r => (
                <option key={r} value={r}>{r === 'All' ? 'All 9 Regions' : r}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#888894]">Channel:</span>
            <select
              value={selectedPlatform}
              onChange={(e) => { setSelectedPlatform(e.target.value); setPage(1); }}
              className="text-xs bg-black/[0.03] border border-black/[0.06] rounded-xl px-3 py-1.5 text-[#121217] focus:outline-none focus:ring-1 focus:ring-[#FF2E7E] cursor-pointer"
            >
              <option value="All">All Channels</option>
              <option value="Instagram">Instagram (405)</option>
              <option value="Broadcast">Broadcast TV / Radio (28)</option>
              <option value="Online">Online Media / News (34)</option>
            </select>
          </div>

          <div className="ml-auto text-xs font-mono-tabular text-[#888894]">
            Showing <strong className="text-[#121217]">{filtered.length}</strong> accounts
          </div>
        </div>

      </div>

      {/* Creator Cards Grid */}
      {paginated.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-black/[0.05] shadow-soft">
          <p className="text-sm text-[#787884]">No creators match your filter query.</p>
          <button 
            onClick={() => { setSearch(''); setSelectedTier('All'); setSelectedRegion('All'); setSelectedPlatform('All'); setSelectedType('All'); }}
            className="mt-3 px-4 py-2 rounded-full bg-[#121217] text-white text-xs font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {paginated.map((creator) => {
            const isAdded = rosterIds.includes(creator.id);

            return (
              <div
                key={creator.id}
                className="rounded-3xl bg-white p-5 border border-black/[0.05] shadow-soft hover:shadow-card-elevated hover:border-black/[0.1] transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Platform & Tier Badges */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/[0.03] text-[11px] font-medium text-[#40404c]">
                      {getPlatformIcon(creator.platform)}
                      {creator.platform}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-tabular font-bold uppercase tracking-wider ${
                      creator.tier === 'Nano' ? 'bg-blue-50 text-blue-700' :
                      creator.tier === 'Micro' ? 'bg-purple-50 text-purple-700' :
                      creator.tier === 'Macro' ? 'bg-amber-50 text-amber-700' :
                      'bg-emerald-50 text-emerald-700'
                    }`}>
                      {creator.tier}
                    </span>
                  </div>

                  {/* Creator Info */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-sun p-[1px] flex-shrink-0">
                      <div className="w-full h-full bg-white rounded-[15px] flex items-center justify-center font-bold text-sm text-[#121217] uppercase">
                        {creator.name.slice(0, 2)}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-sm text-[#121217] truncate leading-tight group-hover:text-[#FF2E7E] transition-colors">
                        {creator.name}
                      </h3>
                      <p className="font-mono-tabular text-xs text-[#787884] truncate mt-0.5">
                        {creator.handle}
                      </p>
                      <span className="inline-block mt-1 text-[11px] font-medium text-[#555562] bg-black/[0.03] px-2 py-0.5 rounded-md truncate max-w-full">
                        {creator.category}
                      </span>
                    </div>
                  </div>

                  {/* Location Tag */}
                  <div className="flex items-center gap-1 text-[11px] text-[#787884] mb-4">
                    <MapPin className="w-3 h-3 text-[#FF6036] flex-shrink-0" />
                    <span className="truncate">{creator.region} · {creator.city}</span>
                  </div>

                  {/* Metrics Box (Followers, ER, Rate Card) */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#f8f8fa] border border-black/[0.03] text-center mb-4">
                    <div>
                      <span className="block text-[10px] font-mono-tabular text-[#888894] uppercase">Followers</span>
                      <span className="font-mono-tabular font-bold text-xs text-[#121217]">
                        {formatNumber(creator.followers)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono-tabular text-[#888894] uppercase">Eng. Rate</span>
                      <span className="font-mono-tabular font-bold text-xs text-emerald-600">
                        {creator.er}%
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono-tabular text-[#888894] uppercase">Est. Rate</span>
                      <span className="font-mono-tabular font-bold text-xs text-[#121217]">
                        {formatRupiah(creator.rateCard)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-black/[0.04]">
                  <button
                    onClick={() => onAddToRoster(creator)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-[#121217] text-white hover:bg-black'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Added to Campaign
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Add to Roster
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onDraftContract(creator)}
                    title="Draft Legal Contract"
                    className="p-2 rounded-xl bg-white border border-black/[0.08] hover:bg-black/[0.04] text-[#121217] transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-[#FF6036]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 pt-4 border-t border-black/[0.06]">
          <span className="text-xs font-mono-tabular text-[#888894]">
            Page {page} of {totalPages} ({filtered.length} total)
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="p-2 rounded-xl bg-white border border-black/[0.08] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/[0.03] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-mono-tabular text-xs font-semibold bg-white border border-black/[0.08] rounded-xl">
              {page}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="p-2 rounded-xl bg-white border border-black/[0.08] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-black/[0.03] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
