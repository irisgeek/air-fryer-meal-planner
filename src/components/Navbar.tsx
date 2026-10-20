import React from 'react';
import { Flame, Calculator, Sparkles, RefreshCw } from 'lucide-react';

interface NavbarProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  onOpenConverter: () => void;
  onReset: () => void;
  selectedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  onSelectStep,
  onOpenConverter,
  onReset,
  selectedCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf7f2]/95 backdrop-blur-md border-b border-[#e7dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text wordmark */}
          <button
            onClick={() => onSelectStep(1)}
            className="flex items-center gap-2.5 text-left text-lg font-bold tracking-tight text-[#26221f] whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
          >
            <span className="w-8 h-8 rounded-lg bg-[#c25e36] flex items-center justify-center text-white shadow-sm">
              <Flame className="w-4 h-4" />
            </span>
            <span className="font-semibold text-lg">Roast & Sync</span>
            <span className="hidden sm:inline text-xs font-normal text-[#756a5e] tracking-normal">
              · UK Air Fryer Assistant
            </span>
          </button>

          {/* Zone 2: Concise navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#64594d]">
            <button
              onClick={() => onSelectStep(1)}
              className={`hover:text-[#26221f] transition-colors whitespace-nowrap shrink-0 ${
                currentStep === 1 ? 'text-[#c25e36] font-semibold' : ''
              }`}
            >
              Ingredients {selectedCount > 0 && `(${selectedCount})`}
            </button>
            <button
              onClick={() => onSelectStep(2)}
              className={`hover:text-[#26221f] transition-colors whitespace-nowrap shrink-0 ${
                currentStep === 2 ? 'text-[#c25e36] font-semibold' : ''
              }`}
            >
              Customise & Zones
            </button>
            <button
              onClick={() => onSelectStep(3)}
              className={`hover:text-[#26221f] transition-colors whitespace-nowrap shrink-0 ${
                currentStep === 3 ? 'text-[#c25e36] font-semibold' : ''
              }`}
            >
              Recommendations
            </button>
            <button
              onClick={() => onSelectStep(4)}
              className={`hover:text-[#26221f] transition-colors whitespace-nowrap shrink-0 ${
                currentStep === 4 ? 'text-[#c25e36] font-semibold' : ''
              }`}
            >
              Timeline Plan
            </button>
            <button
              onClick={onOpenConverter}
              className="flex items-center gap-1.5 text-[#64594d] hover:text-[#26221f] transition-colors whitespace-nowrap shrink-0"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Oven Converter</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2.5 shrink-0">
            {selectedCount > 0 && (
              <button
                onClick={onReset}
                title="Clear selected ingredients"
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[#756a5e] hover:text-[#26221f] rounded-lg hover:bg-[#ede5d8] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}

            <button
              onClick={() => onSelectStep(4)}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#c25e36] hover:bg-[#ad4e29] active:scale-[0.98] rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentStep === 4 ? 'Sync Timeline' : 'View Plan'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
