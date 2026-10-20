import React from 'react';
import { Ingredient, SelectedItemConfig, AirFryerSettings } from '../types';
import { computeItemSpecs } from '../utils/timelineEngine';
import { Thermometer, Clock, ShieldCheck, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface SmartRecommendationsProps {
  selectedItems: SelectedItemConfig[];
  allIngredients: Ingredient[];
  settings: AirFryerSettings;
  onUpdateItemConfig: (index: number, updates: Partial<SelectedItemConfig>) => void;
  onProceedToTimeline: () => void;
  onBackToCustomise: () => void;
}

export const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  selectedItems,
  allIngredients,
  settings,
  onUpdateItemConfig,
  onProceedToTimeline,
  onBackToCustomise
}) => {
  return (
    <div className="space-y-6">
      {/* Header Explainer */}
      <div className="p-5 rounded-2xl bg-[#f5ede0] border border-[#e4dbce] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8a5d3b]">
            <Sparkles className="w-3.5 h-3.5 text-[#c25e36]" />
            <span>Algorithm-Optimised UK Air Fryer Settings</span>
          </div>
          <h2 className="text-lg font-bold text-[#26221f] mt-0.5">
            Smart Temperature & Duration Calculations
          </h2>
          <p className="text-xs text-[#6e5f50] mt-1 max-w-2xl">
            Calculated from heat convection models for standard 1500W–2400W UK air fryers (Ninja, Tower, Salter, Philips). 
            Adjustments are applied for cuts, frozen states, and crispiness preferences.
          </p>
        </div>

        <button
          onClick={onProceedToTimeline}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c25e36] hover:bg-[#aa4e28] text-white text-xs font-semibold shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Generate Timeline Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Grid of Recommendation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedItems.map((item, idx) => {
          const ing = allIngredients.find((i) => i.id === item.ingredientId);
          if (!ing) return null;

          const computed = computeItemSpecs(item, allIngredients);
          const isOverridden = item.customTempC !== undefined || item.customDurationMins !== undefined;

          return (
            <div
              key={`${item.ingredientId}-${idx}`}
              className="p-5 rounded-2xl bg-white border border-[#e4dcce] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" role="img" aria-label={ing.name}>
                      {ing.emoji}
                    </span>
                    <div>
                      <h3 className="font-bold text-sm text-[#26221f]">{ing.name}</h3>
                      <div className="text-[11px] text-[#7d7062]">
                        {computed.prepLabel} · {item.quantity} {item.quantityUnit}
                        {item.isFrozen && ' · Frozen'}
                      </div>
                    </div>
                  </div>

                  {settings.mode === 'dual-zone' && (
                    <span className="text-[11px] font-semibold text-[#876e56] bg-[#f5ede2] px-2 py-0.5 rounded-md">
                      Basket {item.zone}
                    </span>
                  )}
                </div>

                {/* Big Metric Display */}
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-[#faf7f2] border border-[#eee4d5] my-3">
                  {/* Temp */}
                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-[#7a6d5f] font-medium mb-1">
                      <Thermometer className="w-3.5 h-3.5 text-[#c25e36]" />
                      <span>Recommended</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold font-mono text-[#26221f] tabular-nums">
                        {computed.tempC}
                      </span>
                      <span className="text-xs font-semibold text-[#7a6d5f]">°C</span>
                    </div>
                  </div>

                  {/* Duration */}
                  <div>
                    <div className="flex items-center gap-1 text-[11px] text-[#7a6d5f] font-medium mb-1">
                      <Clock className="w-3.5 h-3.5 text-[#c25e36]" />
                      <span>Duration</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold font-mono text-[#26221f] tabular-nums">
                        {computed.durationMins}
                      </span>
                      <span className="text-xs font-semibold text-[#7a6d5f]">mins</span>
                    </div>
                  </div>
                </div>

                {/* Pro Tip */}
                <div className="space-y-2">
                  <p className="text-xs text-[#5e5245] leading-relaxed">
                    💡 <strong className="text-[#26221f]">Crisp Tip:</strong> {computed.crispingTip}
                  </p>

                  {computed.safeInternalTempC && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#366848] font-medium pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#366848] shrink-0" />
                      <span>UK Food Safety: Core temp must reach {computed.safeInternalTempC}°C</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Manual Override Accordion / Fine Tuning Stepper */}
              <div className="pt-3 border-t border-[#f0e8dc] text-[11px]">
                <div className="flex items-center justify-between text-[#786b5e] mb-2">
                  <span>Fine-tune (°C & min)</span>
                  {isOverridden && (
                    <button
                      onClick={() =>
                        onUpdateItemConfig(idx, {
                          customTempC: undefined,
                          customDurationMins: undefined
                        })
                      }
                      className="text-[#c25e36] hover:underline flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-between bg-[#f8f5ee] px-2 py-1 rounded-lg border border-[#e4dbcc]">
                    <button
                      onClick={() =>
                        onUpdateItemConfig(idx, {
                          customTempC: Math.max(140, computed.tempC - 5)
                        })
                      }
                      className="text-xs font-bold px-1 hover:text-[#c25e36]"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs tabular-nums">{computed.tempC}°C</span>
                    <button
                      onClick={() =>
                        onUpdateItemConfig(idx, {
                          customTempC: Math.min(220, computed.tempC + 5)
                        })
                      }
                      className="text-xs font-bold px-1 hover:text-[#c25e36]"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-[#f8f5ee] px-2 py-1 rounded-lg border border-[#e4dbcc]">
                    <button
                      onClick={() =>
                        onUpdateItemConfig(idx, {
                          customDurationMins: Math.max(2, computed.durationMins - 1)
                        })
                      }
                      className="text-xs font-bold px-1 hover:text-[#c25e36]"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs tabular-nums">{computed.durationMins}m</span>
                    <button
                      onClick={() =>
                        onUpdateItemConfig(idx, {
                          customDurationMins: computed.durationMins + 1
                        })
                      }
                      className="text-xs font-bold px-1 hover:text-[#c25e36]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Advance / Back Strip */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onBackToCustomise}
          className="px-4 py-2 text-xs font-medium text-[#6e6154] hover:text-[#26221f]"
        >
          ← Back to Customise
        </button>

        <button
          onClick={onProceedToTimeline}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#c25e36] hover:bg-[#aa4e28] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Optimised Cooking Plan</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
