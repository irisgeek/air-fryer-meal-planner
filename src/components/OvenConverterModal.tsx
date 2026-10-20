import React, { useState } from 'react';
import { X, Calculator, ArrowRight, Zap, Check } from 'lucide-react';

interface OvenConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OvenConverterModal: React.FC<OvenConverterModalProps> = ({
  isOpen,
  onClose
}) => {
  const [ovenTempType, setOvenTempType] = useState<'fan' | 'conventional'>('fan');
  const [ovenTempC, setOvenTempC] = useState<number>(200);
  const [ovenTimeMins, setOvenTimeMins] = useState<number>(25);

  if (!isOpen) return null;

  // Conversion math:
  // If Fan: air fryer = ovenTempC - 20
  // If Conventional: conventional = Fan + 20, so air fryer = ovenTempC - 30 to -40
  const airFryerTempC = ovenTempType === 'fan' ? Math.max(140, ovenTempC - 20) : Math.max(140, ovenTempC - 35);
  // Air fryer cooks ~20-25% faster
  const airFryerTimeMins = Math.max(2, Math.round(ovenTimeMins * 0.78));
  const timeSavedMins = Math.max(0, ovenTimeMins - airFryerTimeMins);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#ded5c7] space-y-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-[#f0e8dc] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#c25e36]/15 text-[#c25e36] flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-bold text-base text-[#26221f]">
                UK Oven to Air Fryer Converter
              </h3>
              <p className="text-[11px] text-[#786c5e]">
                Convert back-of-the-packet supermarket cooking instructions in seconds.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#96897b] hover:text-[#26221f] p-1 rounded-lg hover:bg-[#ede5d8]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#4a3e32] mb-1.5">
              Oven Type Stated on Packaging
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOvenTempType('fan')}
                className={`py-2 text-xs font-semibold rounded-xl border transition-colors ${
                  ovenTempType === 'fan'
                    ? 'bg-[#c25e36] text-white border-[#c25e36]'
                    : 'bg-[#faf8f5] text-[#635547] border-[#ded5c7]'
                }`}
              >
                Fan Assisted Oven
              </button>
              <button
                type="button"
                onClick={() => setOvenTempType('conventional')}
                className={`py-2 text-xs font-semibold rounded-xl border transition-colors ${
                  ovenTempType === 'conventional'
                    ? 'bg-[#c25e36] text-white border-[#c25e36]'
                    : 'bg-[#faf8f5] text-[#635547] border-[#ded5c7]'
                }`}
              >
                Conventional Oven
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#4a3e32] mb-1.5">
                Packet Temperature (°C)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="10"
                  min="120"
                  max="250"
                  value={ovenTempC}
                  onChange={(e) => setOvenTempC(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-mono border border-[#ded5c7] rounded-xl text-[#26221f]"
                />
                <span className="text-xs font-semibold text-[#706456]">°C</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4a3e32] mb-1.5">
                Packet Cook Time (Mins)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="1"
                  min="3"
                  max="120"
                  value={ovenTimeMins}
                  onChange={(e) => setOvenTimeMins(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-mono border border-[#ded5c7] rounded-xl text-[#26221f]"
                />
                <span className="text-xs font-semibold text-[#706456]">mins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calculated Result Card */}
        <div className="p-4 rounded-xl bg-[#f7f2ea] border border-[#e5dbcc] space-y-3">
          <div className="text-xs font-bold text-[#805e3b] uppercase tracking-wider">
            Air Fryer Recommended Setting
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg border border-[#e0d6c6]">
              <div className="text-[11px] text-[#736555] font-medium">Air Fryer Temperature</div>
              <div className="text-2xl font-bold font-mono text-[#c25e36] tabular-nums">
                {airFryerTempC}°C
              </div>
              <div className="text-[10px] text-[#807263]">
                (-{ovenTempType === 'fan' ? '20' : '35'}°C from packet)
              </div>
            </div>

            <div className="p-3 bg-white rounded-lg border border-[#e0d6c6]">
              <div className="text-[11px] text-[#736555] font-medium">Air Fryer Duration</div>
              <div className="text-2xl font-bold font-mono text-[#26221f] tabular-nums">
                {airFryerTimeMins} mins
              </div>
              <div className="text-[10px] text-[#3d704d] font-semibold">
                Saves ~{timeSavedMins} mins off oven time
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#695d50] leading-relaxed">
            💡 <strong>UK Cook Rule:</strong> Always check your food 4–5 minutes before the timer ends. 
            Because air fryer heating elements are only 2–3 inches above the food, items brown much faster than in a cavernous oven.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#c25e36] hover:bg-[#aa4e28] rounded-xl cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
