/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StepIndicator } from './components/StepIndicator';
import { IngredientSelection } from './components/IngredientSelection';
import { CustomisationPanel } from './components/CustomisationPanel';
import { SmartRecommendations } from './components/SmartRecommendations';
import { MealTimelinePlan } from './components/MealTimelinePlan';
import { OvenConverterModal } from './components/OvenConverterModal';
import { Footer } from './components/Footer';

import { INGREDIENTS_DATABASE, POPULAR_UK_MEAL_PRESETS, MealPreset } from './data/ingredientsData';
import { Ingredient, SelectedItemConfig, AirFryerSettings } from './types';
import { generateOptimisedPlan } from './utils/timelineEngine';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [allIngredients, setAllIngredients] = useState<Ingredient[]>(INGREDIENTS_DATABASE);
  const [converterOpen, setConverterOpen] = useState<boolean>(false);

  // Default settings
  const [settings, setSettings] = useState<AirFryerSettings>({
    mode: 'dual-zone',
    shakeReminder: true,
    preheat: true,
    oilSprayReminder: true,
    basket1Name: 'Proteins & Mains',
    basket2Name: 'Sides & Veggies'
  });

  // Pre-seed with a delicious British Sunday Mini Roast so the app is instantly rich & testable
  const [selectedItems, setSelectedItems] = useState<SelectedItemConfig[]>([
    {
      ingredientId: 'chicken-thighs',
      quantity: 2,
      quantityUnit: 'thighs',
      prepStyleId: 'bone-in',
      isFrozen: false,
      crispiness: 'standard',
      zone: 1
    },
    {
      ingredientId: 'roast-potatoes',
      quantity: 400,
      quantityUnit: 'g',
      prepStyleId: 'parboiled-roasties',
      isFrozen: false,
      crispiness: 'extra-crisp',
      zone: 2
    },
    {
      ingredientId: 'carrots-batons',
      quantity: 2,
      quantityUnit: 'carrots',
      prepStyleId: 'batons',
      isFrozen: false,
      crispiness: 'standard',
      zone: 2
    },
    {
      ingredientId: 'yorkshire-puddings',
      quantity: 2,
      quantityUnit: 'puds',
      prepStyleId: 'frozen-cooked',
      isFrozen: true,
      crispiness: 'standard',
      zone: 2
    }
  ]);

  // Compute live meal plan based on current items and settings
  const mealPlan = useMemo(() => {
    return generateOptimisedPlan(selectedItems, settings, allIngredients);
  }, [selectedItems, settings, allIngredients]);

  // Handlers
  const handleToggleIngredient = (ing: Ingredient) => {
    const existingIndex = selectedItems.findIndex((s) => s.ingredientId === ing.id);
    if (existingIndex >= 0) {
      setSelectedItems((prev) => prev.filter((_, idx) => idx !== existingIndex));
    } else {
      const defaultPrep = ing.prepStyles[0];
      const newConfig: SelectedItemConfig = {
        ingredientId: ing.id,
        quantity: ing.category === 'sides' || ing.category === 'veggies' ? 300 : 2,
        quantityUnit: ing.category === 'sides' || ing.category === 'veggies' ? 'g' : 'portions',
        prepStyleId: defaultPrep ? defaultPrep.id : 'standard',
        isFrozen: false,
        crispiness: 'standard',
        zone: ing.defaultZone || 1
      };
      setSelectedItems((prev) => [...prev, newConfig]);
    }
  };

  const handleUpdateItemConfig = (index: number, updates: Partial<SelectedItemConfig>) => {
    setSelectedItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleLoadPreset = (preset: MealPreset) => {
    const newItems: SelectedItemConfig[] = preset.items.map((item) => ({
      ingredientId: item.ingredientId,
      quantity: item.quantity,
      quantityUnit: item.quantityUnit,
      prepStyleId: item.prepStyleId,
      isFrozen: item.isFrozen,
      crispiness: 'standard',
      zone: item.zone
    }));
    setSelectedItems(newItems);
    setCurrentStep(2); // Jump straight to customise step to show the loaded preset
  };

  const handleAddCustomIngredient = (newIng: Ingredient) => {
    setAllIngredients((prev) => [newIng, ...prev]);
    const defaultPrep = newIng.prepStyles[0];
    const newConfig: SelectedItemConfig = {
      ingredientId: newIng.id,
      quantity: 2,
      quantityUnit: 'portions',
      prepStyleId: defaultPrep ? defaultPrep.id : 'standard',
      isFrozen: false,
      crispiness: 'standard',
      zone: 1
    };
    setSelectedItems((prev) => [...prev, newConfig]);
  };

  const handleReset = () => {
    setSelectedItems([]);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-[#26221f]">
      {/* Navbar with top bar contract */}
      <Navbar
        currentStep={currentStep}
        onSelectStep={setCurrentStep}
        onOpenConverter={() => setConverterOpen(true)}
        onReset={handleReset}
        selectedCount={selectedItems.length}
      />

      {/* Hero Section */}
      <HeroSection
        onLoadPreset={handleLoadPreset}
        onStartCustom={() => {
          setSelectedItems([]);
          setCurrentStep(1);
        }}
      />

      {/* Step Indicator Navigation */}
      <StepIndicator
        currentStep={currentStep}
        onSelectStep={setCurrentStep}
        selectedCount={selectedItems.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 1 && (
          <IngredientSelection
            allIngredients={allIngredients}
            selectedItems={selectedItems}
            onToggleIngredient={handleToggleIngredient}
            onProceedToCustomise={() => setCurrentStep(2)}
            onAddCustomIngredient={handleAddCustomIngredient}
          />
        )}

        {currentStep === 2 && (
          <CustomisationPanel
            selectedItems={selectedItems}
            allIngredients={allIngredients}
            settings={settings}
            onUpdateSettings={(newSettings) => setSettings((prev) => ({ ...prev, ...newSettings }))}
            onUpdateItemConfig={handleUpdateItemConfig}
            onRemoveItem={handleRemoveItem}
            onProceedToRecommendations={() => setCurrentStep(3)}
            onBackToIngredients={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && (
          <SmartRecommendations
            selectedItems={selectedItems}
            allIngredients={allIngredients}
            settings={settings}
            onUpdateItemConfig={handleUpdateItemConfig}
            onProceedToTimeline={() => setCurrentStep(4)}
            onBackToCustomise={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 4 && (
          <MealTimelinePlan
            plan={mealPlan}
            settings={settings}
            onRegenerate={() => {
              // Trigger a visual refresh or toast
            }}
            onBackToRecommendations={() => setCurrentStep(3)}
          />
        )}
      </main>

      {/* UK Oven to Air Fryer Converter Modal */}
      <OvenConverterModal
        isOpen={converterOpen}
        onClose={() => setConverterOpen(false)}
      />

      {/* Quiet Editorial Footer */}
      <Footer onOpenConverter={() => setConverterOpen(true)} />
    </div>
  );
}
