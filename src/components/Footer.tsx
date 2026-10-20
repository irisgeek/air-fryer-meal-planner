import React from 'react';
import { Flame, ShieldCheck, Zap } from 'lucide-react';

interface FooterProps {
  onOpenConverter: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConverter }) => {
  return (
    <footer className="bg-[#f2ebe0] border-t border-[#e2d7c7] text-[#695d50] py-12 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-sm font-bold text-[#26221f]">
              <span className="w-6 h-6 rounded-md bg-[#c25e36] text-white flex items-center justify-center">
                <Flame className="w-3.5 h-3.5" />
              </span>
              <span>Roast & Sync</span>
            </div>
            <p className="text-xs text-[#706456] max-w-sm leading-relaxed">
              Designed for British home cooks using dual-zone and single-basket air fryers. 
              Sync finish technology ensures proteins, roasties, and tender greens plate up piping hot at the exact same minute.
            </p>
            <div className="flex items-center gap-3 text-[11px] text-[#807262]">
              <span>UK Standards (°C)</span>
              <span aria-hidden="true">·</span>
              <span>FSA 75°C Safe Target</span>
              <span aria-hidden="true">·</span>
              <span>Ninja Dual & Multi-Brand Compatible</span>
            </div>
          </div>

          {/* Quick Tools */}
          <div className="space-y-2">
            <div className="font-semibold text-xs text-[#26221f] uppercase tracking-wider">
              Kitchen Utilities
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={onOpenConverter}
                  className="hover:text-[#26221f] transition-colors text-left"
                >
                  Oven to Air Fryer Converter
                </button>
              </li>
              <li>
                <span className="text-[#877969]">Dual-Zone Sync Algorithm</span>
              </li>
              <li>
                <span className="text-[#877969]">Shake & Turn Alert Audio Cues</span>
              </li>
            </ul>
          </div>

          {/* Standards & Energy */}
          <div className="space-y-2">
            <div className="font-semibold text-xs text-[#26221f] uppercase tracking-wider">
              UK Cooking Notes
            </div>
            <p className="text-[11px] text-[#736657] leading-relaxed">
              Based on standard UK electrical tariffs and appliance tests. Average 1800W air fryer consumes ~0.5 kWh per 30-min meal compared to ~1.4 kWh for a standard 3kW built-in fan oven.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#e2d8c8] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8a7d6e]">
          <div>
            © {new Date().getFullYear()} Roast & Sync UK. Built for crisp, effortless British home cooking.
          </div>
          <div className="flex items-center gap-4">
            <span>Always verify poultry internal temperatures with a probe thermometer.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
