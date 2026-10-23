import React from 'react';
import { MoreHorizontal, Plus, FileText, CheckCircle2, Clock, ArrowRight, ArrowLeft, Trash2 } from 'lucide-react';
import { formatRupiah, formatNumber } from '../utils/helpers';

export default function CampaignKanban({ roster, onMoveStage, onRemoveFromRoster, onDraftContract }) {
  const STAGES = [
    { id: 'Outreach', label: '1. Outreach', color: 'bg-blue-500' },
    { id: 'Negotiation', label: '2. Negotiation', color: 'bg-amber-500' },
    { id: 'Deal', label: '3. Deal Agreed', color: 'bg-purple-500' },
    { id: 'Content', label: '4. Content Review', color: 'bg-pink-500' },
    { id: 'Live', label: '5. Live & Paid', color: 'bg-emerald-500' },
  ];

  const totalValue = roster.reduce((sum, item) => sum + (item.dealCost || item.rateCard || 0), 0);
  const liveCount = roster.filter(r => r.stage === 'Live').length;

  return (
    <section id="campaigns" className="py-6 md:py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
      
      {/* Campaign Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/[0.06] text-xs font-mono-tabular text-[#555562] mb-1.5 shadow-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Active Campaign Pipeline
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111116] tracking-tight">
            Year-End Hospitality Blitz 2026
          </h2>
          <p className="text-xs sm:text-sm text-[#787884] mt-0.5">
            Tracking creator deliverables, content approval, and milestone payouts across hotel units.
          </p>
        </div>

        {/* Campaign Metrics Pill Summary */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-white border border-black/[0.05] shadow-soft text-right">
            <span className="block text-[10px] font-mono-tabular text-[#888894] uppercase">Roster Value</span>
            <span className="font-mono-tabular font-bold text-sm text-[#121217]">
              {formatRupiah(totalValue)}
            </span>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-white border border-black/[0.05] shadow-soft text-right">
            <span className="block text-[10px] font-mono-tabular text-[#888894] uppercase">Delivered</span>
            <span className="font-mono-tabular font-bold text-sm text-emerald-600">
              {liveCount} / {roster.length} Live
            </span>
          </div>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
        {STAGES.map((stage, idx) => {
          const cards = roster.filter((r) => r.stage === stage.id);
          const stageTotal = cards.reduce((sum, c) => sum + (c.dealCost || c.rateCard || 0), 0);

          return (
            <div
              key={stage.id}
              className="rounded-3xl bg-[#f8f8fa] p-3.5 border border-black/[0.04] flex flex-col min-w-[240px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/[0.04] px-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${stage.color}`}></span>
                  <span className="font-bold text-xs text-[#121217]">{stage.label}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white text-[11px] font-mono-tabular font-semibold text-[#626270] shadow-xs">
                  {cards.length}
                </span>
              </div>

              {/* Subtotal */}
              <div className="text-[10px] font-mono-tabular text-[#888894] px-1 mb-3">
                Total: <strong className="text-[#121217]">{formatRupiah(stageTotal)}</strong>
              </div>

              {/* Cards List */}
              <div className="space-y-3 flex-1">
                {cards.length === 0 ? (
                  <div className="py-8 text-center border-2 border-dashed border-black/[0.06] rounded-2xl text-[11px] text-[#9999a4]">
                    No creators in {stage.id}
                  </div>
                ) : (
                  cards.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-white p-3.5 border border-black/[0.05] shadow-soft hover:shadow-card-elevated transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Top handle and delete */}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-mono-tabular text-[11px] font-bold text-[#FF2E7E]">
                            {item.handle}
                          </span>
                          <button
                            onClick={() => onRemoveFromRoster(item.id)}
                            title="Remove from campaign"
                            className="text-[#aaaaaf] hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        <h4 className="font-semibold text-xs text-[#121217] truncate">{item.name}</h4>
                        <div className="text-[10px] text-[#787884] truncate">{item.city} · {item.category}</div>

                        {/* Deal Cost & Followers */}
                        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-black/[0.03] text-xs font-mono-tabular">
                          <span className="text-[10px] text-[#888894]">{formatNumber(item.followers)} flw</span>
                          <span className="font-bold text-[#121217]">{formatRupiah(item.dealCost || item.rateCard)}</span>
                        </div>
                      </div>

                      {/* Card Bottom: Stage Transitions & Contract Action */}
                      <div className="flex items-center justify-between pt-3 mt-2 border-t border-black/[0.03]">
                        <button
                          disabled={idx === 0}
                          onClick={() => onMoveStage(item.id, STAGES[idx - 1].id)}
                          className="p-1 rounded-lg hover:bg-black/[0.05] disabled:opacity-20 disabled:hover:bg-transparent text-[#626270]"
                          title="Move Back"
                        >
                          <ArrowLeft className="w-3 h-3" />
                        </button>

                        <button
                          onClick={() => onDraftContract(item)}
                          className="px-2 py-1 rounded-lg bg-black/[0.03] hover:bg-black/[0.07] text-[10px] font-semibold text-[#121217] flex items-center gap-1 transition-colors"
                          title="Generate Legal Agreement"
                        >
                          <FileText className="w-3 h-3 text-[#FF6036]" /> Contract
                        </button>

                        <button
                          disabled={idx === STAGES.length - 1}
                          onClick={() => onMoveStage(item.id, STAGES[idx + 1].id)}
                          className="p-1 rounded-lg hover:bg-black/[0.05] disabled:opacity-20 disabled:hover:bg-transparent text-[#626270]"
                          title="Move Forward"
                        >
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
