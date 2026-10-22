import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';

export default function Footer({ onExplore }) {
  return (
    <footer className="pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto w-full border-t border-black/[0.06] mt-16">
      
      {/* Big CTA Section matching Image 1 bottom */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111116]">
          Build Your <br />
          <span className="text-gradient-sun">Creator Future</span>
        </h2>
        
        <p className="text-sm text-[#626270]">
          Connect campaigns with our 467 verified Indonesian creator pool.
        </p>

        {/* Email Pill Input matching reference */}
        <div className="pt-4 max-w-md mx-auto">
          <form 
            onSubmit={(e) => { e.preventDefault(); alert("Welcome to CreatorHub Beta! Your access link has been sent."); }}
            className="flex items-center rounded-full bg-white p-1.5 border border-black/[0.08] shadow-soft focus-within:ring-2 focus-within:ring-[#FF2E7E]/30 transition-all"
          >
            <input
              type="email"
              required
              placeholder="Enter your corporate email..."
              className="flex-1 pl-4 pr-2 text-xs text-[#121217] placeholder:text-[#9898a4] focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#121217] text-white text-xs font-semibold hover:bg-black transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-black/[0.04] text-xs font-mono-tabular text-[#888894]">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#121217]">CreatorHub</span>
          <span>·</span>
          <span>Consolidated KOL & Media Suite</span>
        </div>

        <div>
          © 2026 CreatorHub. Built with hospitality & creator excellence.
        </div>
      </div>

    </footer>
  );
}
