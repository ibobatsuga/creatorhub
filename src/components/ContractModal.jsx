import React, { useState } from 'react';
import { X, Check, Printer, Copy, FileCheck, Shield, Sparkles } from 'lucide-react';
import { formatRupiah, terbilang } from '../utils/helpers';
import confetti from 'canvas-confetti';

export default function ContractModal({ creator, onClose, onSigned }) {
  const [copied, setCopied] = useState(false);
  const [isSigned, setIsSigned] = useState(false);

  if (!creator) return null;

  const dealValue = creator.dealCost || creator.rateCard || 2500000;
  const dpValue = Math.round(dealValue * 0.5);
  const pelunasanValue = dealValue - dpValue;
  const contractNumber = `CH/AGR/2026/${creator.id || 'HH-001'}`;

  const today = new Date();
  const dateStr = today.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleCopy = () => {
    const text = document.getElementById('contract-body')?.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSign = () => {
    setIsSigned(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    if (onSigned) onSigned(creator.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl border border-black/[0.08] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-black/[0.06] flex items-center justify-between bg-[#fbfbfd]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-sun p-[1px]">
              <div className="w-full h-full bg-white rounded-[11px] flex items-center justify-center">
                <FileCheck className="w-4 h-4 text-[#FF2E7E]" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-sm text-[#121217]">Smart Creator Agreement</h3>
              <p className="font-mono-tabular text-[11px] text-[#787884]">{contractNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-xs font-medium text-[#121217] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>

            <button
              onClick={() => window.print()}
              className="p-2 rounded-full bg-black/[0.04] hover:bg-black/[0.08] text-[#121217] transition-colors cursor-pointer"
              title="Print Contract"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/[0.08] text-[#787884] transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contract Preview Content */}
        <div id="contract-body" className="p-6 md:p-8 overflow-y-auto space-y-6 text-xs text-[#2c2c34] font-sans leading-relaxed">
          
          <div className="text-center pb-4 border-b border-black/[0.06]">
            <span className="text-[10px] font-mono-tabular tracking-widest uppercase text-[#888894] font-bold">
              SURAT PERJANJIAN KERJA SAMA INFLUENCER & MEDIA
            </span>
            <h2 className="font-bold text-base text-[#111116] mt-1">
              CAMPAIGN HOSPITALITY & LIFESTYLE PROMOTION 2026
            </h2>
            <p className="text-[11px] font-mono-tabular text-[#787884]">Nomor: {contractNumber}</p>
          </div>

          <p>
            Pada hari ini, tanggal <strong>{dateStr}</strong>, telah dibuat dan disepakati perjanjian kerja sama endorsement dan publikasi media promosi antara:
          </p>

          {/* Parties */}
          <div className="p-4 rounded-2xl bg-[#f8f8fa] border border-black/[0.04] space-y-3 font-mono-tabular text-[11px]">
            <div>
              <span className="text-[#888894] block text-[10px] uppercase">Pihak Pertama (Agency / Management):</span>
              <strong className="text-[#121217]">CREATORHUB INDONESIA / HOTEL OPERATIONS REGIONAL</strong>
            </div>
            <div className="pt-2 border-t border-black/[0.04]">
              <span className="text-[#888894] block text-[10px] uppercase">Pihak Kedua (Creator / KOL):</span>
              <strong className="text-[#121217]">{creator.name}</strong> ({creator.handle})
              <div className="text-[#626270] mt-0.5">
                Wilayah: {creator.region} · {creator.city} | Platform: {creator.platform} | Tier: {creator.tier}
              </div>
            </div>
          </div>

          {/* Deliverables */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#121217]">Pasal 1: Lingkup Konten & Deliverables</h4>
            <ul className="list-disc pl-5 space-y-1 text-[#484854]">
              <li>1 (satu) Post Feed / Carousel dengan foto estetis promosi unit properti hotel.</li>
              <li>2 (dua) Instagram Stories interaktif dengan penandaan (tagging) akun resmi hotel.</li>
              <li>1 (satu) Video Reels / TikTok berdurasi 30-60 detik dengan audio trending & hook menarik.</li>
              <li>Seluruh draft wajib disetujui (brief approval) sebelum ditayangkan ke publik.</li>
            </ul>
          </div>

          {/* Payment Terms with Indonesian Terbilang */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#121217]">Pasal 2: Nilai Imbalan & Pembayaran</h4>
            <div className="p-4 rounded-2xl bg-[#fdfdfd] border border-black/[0.06] space-y-2">
              <div className="flex justify-between items-center font-bold text-sm text-[#121217]">
                <span>Total Kompensasi Kerja Sama:</span>
                <span className="text-gradient-sun">{formatRupiah(dealValue)}</span>
              </div>
              <p className="text-[11px] italic text-[#626270]">
                Terbilang: <strong>"{terbilang(dealValue)} rupiah"</strong>
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-black/[0.04] text-[11px] font-mono-tabular">
                <div>
                  <span className="text-[#888894] block text-[10px]">UANG MUKA (DP 50%):</span>
                  <strong>{formatRupiah(dpValue)}</strong>
                </div>
                <div>
                  <span className="text-[#888894] block text-[10px]">PELUNASAN (50% POST-LIVE):</span>
                  <strong>{formatRupiah(pelunasanValue)}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1 text-[11px] text-[#787884]">
            <p>Perjanjian ini berlaku sejak tanggal ditandatangani dan dibuat sah secara elektronik sesuai ketentuan hukum Republik Indonesia.</p>
          </div>

        </div>

        {/* Modal Footer with Sign Action */}
        <div className="p-5 border-t border-black/[0.06] bg-[#fbfbfd] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-mono-tabular text-[#626270]">Legal Verified Contract</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-black/[0.08] hover:bg-black/[0.03] text-xs font-semibold text-[#121217] transition-colors cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={handleSign}
              disabled={isSigned}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                isSigned
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#121217] text-white hover:bg-black'
              }`}
            >
              {isSigned ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Contract Signed & Approved
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#FFA834]" /> Approve & Issue Contract
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
