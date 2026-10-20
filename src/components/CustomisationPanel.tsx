import React from 'react';
import { Ingredient, SelectedItemConfig, AirFryerSettings } from '../types';
import { Sliders, Bell, Flame, Droplets, Layers, ArrowRight, Trash2, Snowflake, Sparkles } from 'lucide-react';

interface CustomisationPanelProps {
  selectedItems: SelectedItemConfig[];
  allIngredients: Ingredient[];
  settings: AirFryerSettings;
  onUpdateSettings: (newSettings: Partial<AirFryerSettings>) => void;
  onUpdateItemConfig: (index: number, updates: Partial<SelectedItemConfig>) => void;
  onRemoveItem: (index: number) => void;
  onProceedToRecommendations: () => void;
  onBackToIngredients: () => void;
}

export const CustomisationPanel: React.FC<CustomisationPanelProps> = ({
  selectedItems,
  allIngredients,
  settings,
  onUpdateSettings,
  onUpdateItemConfig,
  onRemoveItem,
  onProceedToRecommendations,
  onBackToIngredients
}) => {
  return (
    <div className="space-y-8">
      {/* 1. Global Air Fryer Hardware & Appliance Settings */}
      <div className="p-6 rounded-2xl bg-white border border-[#e4dcce] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#f0e8dc]">
          <div>
            <h2 className="text-base font-bold text-[#26221f] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#c25e36]" />
              Air Fryer Appliance Setup
            </h2>
            <p className="text-xs text-[#786c5e] mt-0.5">
              Configure your kitchen appliance model to optimise simultaneous drawer timing.
            </p>
          </div>

          {/* Mode Selector Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-[#ede6dc] rounded-xl self-start sm:self-auto">
            <button
              onClick={() => onUpdateSettings({ mode: 'dual-zone' })}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                settings.mode === 'dual-zone'
                  ? 'bg-white text-[#26221f] shadow-xs'
                  : 'text-[#6e6154] hover:text-[#26221f]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#c25e36]" />
              Dual Zone (Sync Finish)
            </button>
            <button
              onClick={() => onUpdateSettings({ mode: 'single-zone' })}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                settings.mode === 'single-zone'
                  ? 'bg-white text-[#26221f] shadow-xs'
                  : 'text-[#6e6154] hover:text-[#26221f]'
              }`}
            >
              <span>Single Zone / Basket</span>
            </button>
          </div>
        </div>

        {/* Feature Toggles Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Shake Reminder Toggle */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-[#ece4d6] hover:bg-[#faf8f5] transition-colors cursor-pointer select-none">
            <input
              type="checkbox"
              checked={settings.shakeReminder}
              onChange={(e) => onUpdateSettings({ shakeReminder: e.target.checked })}
              className="mt-0.5 rounded text-[#c25e36] focus:ring-[#c25e36] w-4 h-4"
            />
            <div>
              <div className="text-xs font-bold text-[#26221f] flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-[#c25e36]" />
                Shake / Flip Reminder
              </div>
              <div className="text-[11px] text-[#786c5e] mt-0.5 leading-snug">
                Audio cue at 50% mark to shake fries or flip proteins for even browning.
              </div>
            </div>
          </label>

          {/* Oil Spray Reminder Toggle */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-[#ece4d6] hover:bg-[#faf8f5] transition-colors cursor-pointer select-none">
            <input
              type="checkbox"
              checked={settings.oilSprayReminder}
              onChange={(e) => onUpdateSettings({ oilSprayReminder: e.target.checked })}
              className="mt-0.5 rounded text-[#c25e36] focus:ring-[#c25e36] w-4 h-4"
            />
            <div>
              <div className="text-xs font-bold text-[#26221f] flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-[#c25e36]" />
                Oil Spray Reminder
              </div>
              <div className="text-[11px] text-[#786c5e] mt-0.5 leading-snug">
                Prompts a 1-second mist of rapeseed oil for glass-like crispy potato & skin crust.
              </div>
            </div>
          </label>

          {/* Preheat Toggle */}
          <label className="flex items-start gap-3 p-3.5 rounded-xl border border-[#ece4d6] hover:bg-[#faf8f5] transition-colors cursor-pointer select-none">
            <input
              type="checkbox"
              checked={settings.preheat}
              onChange={(e) => onUpdateSettings({ preheat: e.target.checked })}
              className="mt-0.5 rounded text-[#c25e36] focus:ring-[#c25e36] w-4 h-4"
            />
            <div>
              <div className="text-xs font-bold text-[#26221f] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#c25e36]" />
                Include 3-Min Preheat
              </div>
              <div className="text-[11px] text-[#786c5e] mt-0.5 leading-snug">
                Modern fryers crisp better when drawers start already hot before food is added.
              </div>
            </div>
          </label>
        </div>

        {settings.mode === 'dual-zone' && (
          <div className="p-3 bg-[#f8f5ee] rounded-xl border border-[#e8dfd2] text-xs text-[#5e5347] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#26221f]">Dual Zone Sync Activated:</span>
              <span>Each drawer runs independent temperature & timer, finishing simultaneously.</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-[11px] font-mono text-[#786c5e]">
              <span>Basket 1: {settings.basket1Name}</span>
              <span>·</span>
              <span>Basket 2: {settings.basket2Name}</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Item-by-Item Customisation Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#26221f]">
            Customise Cuts, Portions & Preparation ({selectedItems.length})
          </h2>
          <button
            onClick={onBackToIngredients}
            className="text-xs font-semibold text-[#c25e36] hover:underline"
          >
            + Add more ingredients
          </button>
        </div>

        {selectedItems.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#e4dcce]">
            <p className="text-sm text-[#786c5e] mb-4">No ingredients selected yet.</p>
            <button
              onClick={onBackToIngredients}
              className="px-4 py-2 rounded-xl bg-[#c25e36] text-white text-xs font-semibold"
            >
              Browse Ingredients
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {selectedItems.map((item, idx) => {
              const ing = allIngredients.find((i) => i.id === item.ingredientId);
              if (!ing) return null;

              return (
                <div
                  key={`${item.ingredientId}-${idx}`}
                  className="p-5 rounded-2xl bg-white border border-[#e4dcce] shadow-xs space-y-4"
                >
                  {/* Item Header */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-label={ing.name}>
                        {ing.emoji}
                      </span>
                      <div>
                        <h3 className="font-bold text-sm text-[#26221f]">{ing.name}</h3>
                        <div className="flex items-center gap-2 text-[11px] text-[#7d7062]">
                          <span>Default: {ing.defaultTempC}°C</span>
                          <span aria-hidden="true">·</span>
                          <span>{ing.defaultDurationMins} mins</span>
                          {ing.safeInternalTempC && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-[#3b7350]">Safe Core: {ing.safeInternalTempC}°C</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(idx)}
                      className="p-1.5 text-[#96897b] hover:text-[#b83828] hover:bg-[#faeee8] rounded-lg transition-colors cursor-pointer"
                      title="Remove from meal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Controls Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-[#f0e8dc]">
                    {/* 1. Preparation Style Selector */}
                    <div>
                      <label className="block text-xs font-semibold text-[#4a3f33] mb-1.5">
                        Cut / Preparation Style
                      </label>
                      <select
                        value={item.prepStyleId}
                        onChange={(e) => onUpdateItemConfig(idx, { prepStyleId: e.target.value })}
                        className="w-full text-xs bg-[#faf8f5] border border-[#ded5c7] rounded-lg px-2.5 py-1.5 text-[#26221f] focus:outline-hidden focus:border-[#c25e36]"
                      >
                        {ing.prepStyles.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.label} {p.timeModifierMins !== 0 ? `(${p.timeModifierMins > 0 ? '+' : ''}${p.timeModifierMins}m)` : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 2. Quantity / Portion */}
                    <div>
                      <label className="block text-xs font-semibold text-[#4a3f33] mb-1.5">
                        Quantity / Portion
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateItemConfig(idx, {
                              quantity: Math.max(1, item.quantity - (item.quantityUnit === 'g' ? 50 : 1))
                            })
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#ede5d8] hover:bg-[#ded4c4] text-xs font-bold text-[#42372d]"
                        >
                          -
                        </button>
                        <span className="font-mono text-xs font-semibold tabular-nums text-[#26221f] min-w-16 text-center">
                          {item.quantity} {item.quantityUnit}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateItemConfig(idx, {
                              quantity: item.quantity + (item.quantityUnit === 'g' ? 50 : 1)
                            })
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#ede5d8] hover:bg-[#ded4c4] text-xs font-bold text-[#42372d]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* 3. Fresh vs Frozen & Crispiness */}
                    <div>
                      <label className="block text-xs font-semibold text-[#4a3f33] mb-1.5">
                        State & Crispiness
                      </label>
                      <div className="flex items-center gap-1.5">
                        {ing.supportsFrozen && (
                          <button
                            type="button"
                            onClick={() => onUpdateItemConfig(idx, { isFrozen: !item.isFrozen })}
                            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                              item.isFrozen
                                ? 'bg-[#e2f1f8] border-[#9bc8dd] text-[#1b5b7a]'
                                : 'bg-[#faf8f5] border-[#ded5c7] text-[#736556]'
                            }`}
                          >
                            <Snowflake className="w-3.5 h-3.5" />
                            <span>{item.isFrozen ? 'Frozen' : 'Fresh'}</span>
                          </button>
                        )}

                        <select
                          value={item.crispiness}
                          onChange={(e) =>
                            onUpdateItemConfig(idx, {
                              crispiness: e.target.value as 'standard' | 'extra-crisp' | 'tender'
                            })
                          }
                          className="text-xs bg-[#faf8f5] border border-[#ded5c7] rounded-lg px-2 py-1.5 text-[#26221f]"
                        >
                          <option value="standard">Standard Crisp</option>
                          <option value="extra-crisp">Extra Crispy (+2m)</option>
                          <option value="tender">Tender / Gentle</option>
                        </select>
                      </div>
                    </div>

                    {/* 4. Basket / Zone Assignment (Dual Zone mode) */}
                    {settings.mode === 'dual-zone' ? (
                      <div>
                        <label className="block text-xs font-semibold text-[#4a3f33] mb-1.5">
                          Assigned Basket
                        </label>
                        <div className="grid grid-cols-2 gap-1.5">
                          <button
                            type="button"
                            onClick={() => onUpdateItemConfig(idx, { zone: 1 })}
                            className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                              item.zone === 1
                                ? 'bg-[#c25e36] text-white border-[#c25e36] shadow-xs'
                                : 'bg-[#faf8f5] text-[#5e5245] border-[#ded5c7] hover:bg-[#ede5d8]'
                            }`}
                          >
                            Basket 1
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateItemConfig(idx, { zone: 2 })}
                            className={`py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                              item.zone === 2
                                ? 'bg-[#c25e36] text-white border-[#c25e36] shadow-xs'
                                : 'bg-[#faf8f5] text-[#5e5245] border-[#ded5c7] hover:bg-[#ede5d8]'
                            }`}
                          >
                            Basket 2
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-center">
                        <span className="text-[11px] font-semibold text-[#7d7062]">Shared Basket</span>
                        <span className="text-[11px] text-[#918373]">
                          Will be cooked with staggered placement in single drawer.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Advance Button Strip */}
      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onBackToIngredients}
          className="px-4 py-2 text-xs font-medium text-[#6e6154] hover:text-[#26221f]"
        >
          ← Back to Ingredients
        </button>

        <button
          disabled={selectedItems.length === 0}
          onClick={onProceedToRecommendations}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#c25e36] hover:bg-[#ad4e29] disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>View Smart Recommendations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
