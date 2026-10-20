import React, { useState } from 'react';
import { Ingredient, CategoryType, SelectedItemConfig } from '../types';
import { Search, Plus, Check, ArrowRight, X } from 'lucide-react';

interface IngredientSelectionProps {
  allIngredients: Ingredient[];
  selectedItems: SelectedItemConfig[];
  onToggleIngredient: (ingredient: Ingredient) => void;
  onProceedToCustomise: () => void;
  onAddCustomIngredient: (newIng: Ingredient) => void;
}

export const IngredientSelection: React.FC<IngredientSelectionProps> = ({
  allIngredients,
  selectedItems,
  onToggleIngredient,
  onProceedToCustomise,
  onAddCustomIngredient
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);

  // Form for custom ingredient
  const [customName, setCustomName] = useState('');
  const [customCategory, setCustomCategory] = useState<CategoryType>('proteins');
  const [customTemp, setCustomTemp] = useState(190);
  const [customMins, setCustomMins] = useState(12);

  const selectedIds = new Set(selectedItems.map((s) => s.ingredientId));

  const filtered = allIngredients.filter((ing) => {
    const matchesCategory = activeCategory === 'all' || ing.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      ing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ing.crispingTip.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ing.ukNote && ing.ukNote.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const newId = `custom-${Date.now()}`;
    const newIngredient: Ingredient = {
      id: newId,
      name: customName.trim(),
      category: customCategory,
      defaultTempC: customTemp,
      defaultDurationMins: customMins,
      emoji: customCategory === 'proteins' ? '🥩' : customCategory === 'veggies' ? '🥗' : '🥖',
      safeInternalTempC: customCategory === 'proteins' ? 75 : 70,
      crispingTip: 'Custom item. Check frequently for desired doneness and golden crust.',
      ukNote: 'Custom home cook ingredient.',
      defaultPrepStyleId: 'standard',
      prepStyles: [{ id: 'standard', label: 'Standard portion', timeModifierMins: 0, tempModifierC: 0 }]
    };

    onAddCustomIngredient(newIngredient);
    setShowAddCustomModal(false);
    setCustomName('');
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#ede6dc] rounded-xl self-start overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-white text-[#26221f] shadow-xs'
                : 'text-[#6e6154] hover:text-[#26221f]'
            }`}
          >
            All Ingredients ({allIngredients.length})
          </button>
          <button
            onClick={() => setActiveCategory('proteins')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'proteins'
                ? 'bg-white text-[#26221f] shadow-xs'
                : 'text-[#6e6154] hover:text-[#26221f]'
            }`}
          >
            🍗 Proteins
          </button>
          <button
            onClick={() => setActiveCategory('veggies')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'veggies'
                ? 'bg-white text-[#26221f] shadow-xs'
                : 'text-[#6e6154] hover:text-[#26221f]'
            }`}
          >
            🥦 Vegetables
          </button>
          <button
            onClick={() => setActiveCategory('sides')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === 'sides'
                ? 'bg-white text-[#26221f] shadow-xs'
                : 'text-[#6e6154] hover:text-[#26221f]'
            }`}
          >
            🍟 Sides & Bakery
          </button>
        </div>

        {/* Search Bar + Custom Item Button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-[#8a7d6e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search chicken, chips, broccoli..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-[#ded5c7] rounded-xl text-[#26221f] placeholder-[#96897b] focus:outline-hidden focus:border-[#c25e36] focus:ring-1 focus:ring-[#c25e36]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8a7d6e] hover:text-[#26221f]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowAddCustomModal(true)}
            className="flex items-center gap-1 px-3 py-2 text-xs font-medium text-[#4a3f33] bg-white hover:bg-[#ede5d7] border border-[#ded5c7] rounded-xl transition-colors whitespace-nowrap"
            title="Add your own ingredient"
          >
            <Plus className="w-3.5 h-3.5 text-[#c25e36]" />
            <span className="hidden sm:inline">Add Custom</span>
          </button>
        </div>
      </div>

      {/* Ingredient Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
        {filtered.map((ing) => {
          const isSelected = selectedIds.has(ing.id);

          return (
            <div
              key={ing.id}
              onClick={() => onToggleIngredient(ing)}
              className={`relative flex flex-col justify-between p-4 rounded-xl transition-all cursor-pointer select-none text-left ${
                isSelected
                  ? 'bg-white border-2 border-[#c25e36] shadow-sm'
                  : 'bg-white border border-[#e4dcce] hover:border-[#b8aba0] hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl" role="img" aria-label={ing.name}>
                      {ing.emoji}
                    </span>
                    <h3 className="font-semibold text-sm text-[#26221f] leading-snug">
                      {ing.name}
                    </h3>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-[#c25e36] text-white'
                        : 'border border-[#d2c8b8] bg-[#faf8f5]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                {/* Quiet unboxed metadata */}
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#786c5e] mb-2.5 tabular-nums">
                  <span>{ing.defaultTempC}°C</span>
                  <span aria-hidden="true">·</span>
                  <span>{ing.defaultDurationMins} mins</span>
                  {ing.safeInternalTempC && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#3a704e]">Target {ing.safeInternalTempC}°C</span>
                    </>
                  )}
                </div>

                <p className="text-[11px] text-[#6b5f52] line-clamp-2 leading-relaxed">
                  {ing.crispingTip}
                </p>
              </div>

              {/* UK Note / Cut Styles Hint */}
              <div className="mt-3 pt-2 border-t border-[#f0e9df] flex items-center justify-between text-[11px] text-[#857769]">
                <span className="truncate">
                  {ing.prepStyles.length} cut/prep style{ing.prepStyles.length > 1 ? 's' : ''}
                </span>
                <span className="text-[11px] font-medium text-[#c25e36]">
                  {isSelected ? 'Selected' : '+ Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Action Bar if ingredients are selected */}
      {selectedItems.length > 0 && (
        <div className="sticky bottom-4 z-30 p-4 rounded-2xl bg-[#26221f] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-[#3d3834]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c25e36] flex items-center justify-center text-xs font-bold font-mono">
              {selectedItems.length}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                {selectedItems.length} ingredient{selectedItems.length > 1 ? 's' : ''} ready to cook
              </div>
              <div className="text-xs text-[#b8ada0] truncate max-w-md">
                {selectedItems
                  .map((s) => allIngredients.find((i) => i.id === s.ingredientId)?.name)
                  .filter(Boolean)
                  .join(', ')}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onProceedToCustomise}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#c25e36] hover:bg-[#d66b40] text-white text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Customise & Assign Zones</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Custom Ingredient Modal */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#ded5c7]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-[#26221f]">Add Custom Ingredient</h3>
              <button
                onClick={() => setShowAddCustomModal(false)}
                className="text-[#807264] hover:text-[#26221f]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCustom} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4d4237] mb-1">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pork belly bites, Courgette chips..."
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-[#ded5c7] rounded-lg focus:outline-hidden focus:border-[#c25e36]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4d4237] mb-1">
                  Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['proteins', 'veggies', 'sides'] as CategoryType[]).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCustomCategory(cat)}
                      className={`py-1.5 text-xs font-medium rounded-lg capitalize border ${
                        customCategory === cat
                          ? 'bg-[#c25e36] text-white border-[#c25e36]'
                          : 'bg-[#faf8f5] text-[#594d40] border-[#ded5c7]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4d4237] mb-1">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    min="150"
                    max="220"
                    step="5"
                    value={customTemp}
                    onChange={(e) => setCustomTemp(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono border border-[#ded5c7] rounded-lg focus:outline-hidden focus:border-[#c25e36]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4d4237] mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="60"
                    value={customMins}
                    onChange={(e) => setCustomMins(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono border border-[#ded5c7] rounded-lg focus:outline-hidden focus:border-[#c25e36]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="px-3 py-2 text-xs text-[#706456] hover:text-[#26221f]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#c25e36] hover:bg-[#aa4e28] rounded-lg"
                >
                  Save Ingredient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
