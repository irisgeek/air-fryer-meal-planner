import React from 'react';
import { Check, ShoppingBag, Sliders, Thermometer, CalendarClock } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  selectedCount: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  onSelectStep,
  selectedCount
}) => {
  const steps = [
    {
      id: 1,
      title: '1. Ingredient Selection',
      subtitle: `${selectedCount} item${selectedCount === 1 ? '' : 's'} selected`,
      icon: ShoppingBag
    },
    {
      id: 2,
      title: '2. Customisation & Zones',
      subtitle: 'Cut, portion & dual/single zone',
      icon: Sliders
    },
    {
      id: 3,
      title: '3. Smart Recommendations',
      subtitle: 'Optimal °C, minutes & safe temp',
      icon: Thermometer
    },
    {
      id: 4,
      title: '4. Optimised Meal Timeline',
      subtitle: 'Sync finish & live timer',
      icon: CalendarClock
    }
  ];

  return (
    <div className="bg-[#f4efe6] border-b border-[#e5dcce] py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Progress">
          <ol className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isPast = currentStep > step.id;

              return (
                <li key={step.id}>
                  <button
                    onClick={() => onSelectStep(step.id)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-white shadow-xs border border-[#c25e36]/40 text-[#26221f]'
                        : isPast
                        ? 'bg-[#ece4d6] hover:bg-white/70 text-[#423930]'
                        : 'bg-transparent hover:bg-[#ede5d7] text-[#7a6f62]'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#c25e36] text-white'
                          : isPast
                          ? 'bg-[#557b5f] text-white'
                          : 'bg-[#ddcfbe] text-[#695d50]'
                      }`}
                    >
                      {isPast ? (
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <Icon className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold truncate leading-tight">
                        {step.title}
                      </div>
                      <div className="text-[11px] text-[#786c5e] truncate">
                        {step.subtitle}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
};
