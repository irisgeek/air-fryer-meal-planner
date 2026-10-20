import React from 'react';
import { POPULAR_UK_MEAL_PRESETS, MealPreset } from '../data/ingredientsData';
import { Sparkles, Zap, Utensils, ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onLoadPreset: (preset: MealPreset) => void;
  onStartCustom: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLoadPreset,
  onStartCustom
}) => {
  return (
    <section className="relative overflow-hidden bg-[#faf7f2] border-b border-[#e7dfd3] pt-6 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Presets */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-[#876648]">
              <span>British Home Cooking Assistant</span>
              <span aria-hidden="true">·</span>
              <span>Ninja & Multi-Zone Sync</span>
              <span aria-hidden="true">·</span>
              <span>UK Standards (°C)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#26221f] text-balance leading-tight">
              Cook entire meals in your air fryer,{' '}
              <span className="text-[#c25e36]">synced to finish together.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#615447] max-w-2xl leading-relaxed">
              No more lukewarm chips while waiting for chicken to roast. Pick your ingredients, 
              customise cuts, and get a synchronised timeline telling you the exact minute to put each item in.
            </p>

            {/* Quick Preset Combos Strip */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#7d7062] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c25e36]" />
                  Popular UK Quick Combos (1-Click Load)
                </span>
                <button
                  onClick={onStartCustom}
                  className="text-xs font-medium text-[#c25e36] hover:text-[#9e4320] flex items-center gap-1 transition-colors"
                >
                  Or build custom <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {POPULAR_UK_MEAL_PRESETS.slice(0, 4).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onLoadPreset(preset)}
                    className="flex flex-col text-left p-3 rounded-xl bg-white border border-[#e4dbce] hover:border-[#c25e36] hover:shadow-sm transition-all group cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-bold text-[#26221f] group-hover:text-[#c25e36] transition-colors truncate">
                        {preset.title}
                      </span>
                      <span className="text-[11px] font-mono text-[#7d7062] tabular-nums shrink-0 ml-2">
                        ~{preset.estimatedTotalMins}m
                      </span>
                    </div>
                    <p className="text-[11px] text-[#786b5e] line-clamp-1">
                      {preset.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#e2d8ca] shadow-md bg-[#ede6dc] aspect-16/10">
              <img
                src="/src/assets/images/air_fryer_kitchen_hero_1792511266917.jpg"
                alt="Modern British kitchen counter with dual zone air fryer and crispy roast meal"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay Badge Card */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-sm border border-white/60 shadow-sm flex items-center justify-between text-xs text-[#26221f]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#c25e36]/15 flex items-center justify-center text-[#c25e36]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-[#26221f]">Energy Saver</div>
                    <div className="text-[11px] text-[#736658]">~58% less power than UK fan oven</div>
                  </div>
                </div>
                <div className="text-right font-mono text-[11px] text-[#736658] tabular-nums">
                  UK Food Std: 75°C
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
