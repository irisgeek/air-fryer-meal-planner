import React, { useState, useEffect, useRef } from 'react';
import { CookingPlan, TimelineAction, AirFryerSettings } from '../types';
import { soundEffects } from '../utils/audioAlert';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Printer,
  Copy,
  Check,
  Bell,
  Clock,
  Sparkles,
  Flame,
  AlertCircle,
  Share2,
  FastForward
} from 'lucide-react';

interface MealTimelinePlanProps {
  plan: CookingPlan;
  settings: AirFryerSettings;
  onRegenerate: () => void;
  onBackToRecommendations: () => void;
}

export const MealTimelinePlan: React.FC<MealTimelinePlanProps> = ({
  plan,
  settings,
  onRegenerate,
  onBackToRecommendations
}) => {
  // Live Timer State (in total simulated seconds elapsed)
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // 1x, 5x, 15x, 30x, 60x for rapid testing
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedSheet, setCopiedSheet] = useState(false);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const timerRef = useRef<number | null>(null);
  const prevActionTriggeredRef = useRef<Set<string>>(new Set());

  const totalSeconds = plan.totalDurationMins * 60;
  const remainingSeconds = Math.max(0, totalSeconds - elapsedSeconds);
  const progressPercent = totalSeconds > 0 ? Math.min(100, (elapsedSeconds / totalSeconds) * 100) : 0;

  // Sound toggle sync
  useEffect(() => {
    soundEffects.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // Timer loop with speedMultiplier
  useEffect(() => {
    if (isRunning) {
      const intervalMs = 100; // 10 updates per second for smooth rendering
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + (0.1 * speedMultiplier);
          if (next >= totalSeconds) {
            setIsRunning(false);
            soundEffects.playMealComplete();
            return totalSeconds;
          }
          return next;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, speedMultiplier, totalSeconds]);

  // Check for triggered actions and play sound alerts
  useEffect(() => {
    const currentMins = elapsedSeconds / 60;

    plan.actions.forEach((act) => {
      // Trigger when within 0.15 mins of action timestamp and not already triggered
      if (currentMins >= act.timestampMins && !prevActionTriggeredRef.current.has(act.id)) {
        prevActionTriggeredRef.current.add(act.id);
        setCompletedActions((prev) => new Set(prev).add(act.id));

        if (act.type === 'finish') {
          soundEffects.playMealComplete();
        } else if (act.isShake || act.type === 'flip') {
          soundEffects.playChime();
        } else {
          soundEffects.playAlert();
        }
      }
    });
  }, [elapsedSeconds, plan.actions]);

  const handleStartTimer = () => {
    setIsRunning(true);
    soundEffects.playChime();
  };

  const handlePauseTimer = () => {
    setIsRunning(false);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    prevActionTriggeredRef.current.clear();
    setCompletedActions(new Set());
  };

  const formatSeconds = (sec: number) => {
    const totalSec = Math.floor(sec);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Find currently active or upcoming action
  const currentElapsedMins = elapsedSeconds / 60;
  const nextAction = plan.actions.find((act) => act.timestampMins > currentElapsedMins);
  const activeAction = plan.actions
    .slice()
    .reverse()
    .find((act) => currentElapsedMins >= act.timestampMins);

  const secondsUntilNext = nextAction ? Math.max(0, Math.floor(nextAction.timestampMins * 60 - elapsedSeconds)) : 0;

  // Copy kitchen summary sheet to clipboard
  const handleCopyKitchenSheet = () => {
    const text = [
      `🇬🇧 ROAST & SYNC AIR FRYER COOKING PLAN`,
      `Mode: ${plan.mode === 'dual-zone' ? 'Dual Zone Sync Finish' : 'Single Zone Unified'}`,
      `Total Cooking Time: ${plan.totalDurationMins} minutes`,
      plan.mode === 'dual-zone'
        ? `Basket 1: ${plan.zone1TempC}°C | Basket 2: ${plan.zone2TempC}°C`
        : `Unified Oven Temperature: ${plan.zone1TempC}°C`,
      `------------------------------------------`,
      `STEP-BY-STEP TIMELINE:`,
      ...plan.actions.map(
        (a) => `[${a.timestampFormatted}] (${a.zone === 'both' ? 'Both' : `Basket ${a.zone}`}) ${a.title} - ${a.instruction}`
      ),
      `------------------------------------------`,
      `CHEF PRO-TIPS:`,
      ...plan.proTips.map((tip) => `• ${tip}`)
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopiedSheet(true);
    setTimeout(() => setCopiedSheet(false), 2500);
  };

  const handlePrintSheet = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* 1. Header with Re-generate & Summary */}
      <div className="p-6 rounded-2xl bg-white border border-[#e4dcce] shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#876547]">
            <Sparkles className="w-3.5 h-3.5 text-[#c25e36]" />
            <span>Sync Finish Meal Plan Ready</span>
            <span aria-hidden="true">·</span>
            <span>{plan.mode === 'dual-zone' ? 'Dual Zone Mode' : 'Single Zone Mode'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#26221f] mt-1">
            Total Cooking Time: <span className="font-mono text-[#c25e36]">{plan.totalDurationMins} minutes</span>
          </h2>
          <p className="text-xs text-[#706456] mt-0.5">
            Follow the chronological cue cards below or run the Live Timer so all items come out hot together.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            onClick={onRegenerate}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#ded5c7] hover:bg-[#faf8f5] text-xs font-semibold text-[#42372e] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Re-calculate</span>
          </button>

          <button
            onClick={handleCopyKitchenSheet}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#26221f] hover:bg-[#3d3834] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            {copiedSheet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSheet ? 'Copied!' : 'Copy Plan'}</span>
          </button>
        </div>
      </div>

      {/* 2. Visual Sync Bar (Zone 1 vs Zone 2) */}
      <div className="p-6 rounded-2xl bg-white border border-[#e4dcce] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#26221f] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#c25e36]" />
            Synchronised Heat & Insertion Timeline
          </h3>
          <span className="text-xs font-mono text-[#786c5e] tabular-nums">
            00:00 → {String(plan.totalDurationMins).padStart(2, '0')}:00 mins
          </span>
        </div>

        {/* Sync Timeline Diagram */}
        <div className="space-y-3 pt-2">
          {plan.mode === 'dual-zone' ? (
            <>
              {/* Basket 1 Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-[#3b332b]">
                  <span>Basket 1: {settings.basket1Name} ({plan.zone1TempC}°C)</span>
                  <span className="text-[11px] font-mono text-[#786c5e]">
                    {plan.zone1Items.map((i) => `${i.name} (${i.durationMins}m)`).join(', ') || 'Empty'}
                  </span>
                </div>
                <div className="h-8 bg-[#f5ede2] rounded-lg overflow-hidden relative border border-[#e4dcce] flex">
                  {plan.zone1Items.map((item, i) => {
                    const startPct = (item.startAtMins / plan.totalDurationMins) * 100;
                    const widthPct = (item.durationMins / plan.totalDurationMins) * 100;
                    return (
                      <div
                        key={i}
                        style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                        className="absolute top-1 bottom-1 bg-[#c25e36] text-white rounded-md px-2 flex items-center justify-between text-[11px] font-medium shadow-xs truncate"
                      >
                        <span className="truncate">{item.name}</span>
                        <span className="font-mono text-[10px] ml-1 opacity-90">{item.durationMins}m</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Basket 2 Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-semibold text-[#3b332b]">
                  <span>Basket 2: {settings.basket2Name} ({plan.zone2TempC}°C)</span>
                  <span className="text-[11px] font-mono text-[#786c5e]">
                    {plan.zone2Items.map((i) => `${i.name} (${i.durationMins}m)`).join(', ') || 'Empty'}
                  </span>
                </div>
                <div className="h-8 bg-[#f5ede2] rounded-lg overflow-hidden relative border border-[#e4dcce] flex">
                  {plan.zone2Items.map((item, i) => {
                    const startPct = (item.startAtMins / plan.totalDurationMins) * 100;
                    const widthPct = (item.durationMins / plan.totalDurationMins) * 100;
                    return (
                      <div
                        key={i}
                        style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                        className="absolute top-1 bottom-1 bg-[#4a6b57] text-white rounded-md px-2 flex items-center justify-between text-[11px] font-medium shadow-xs truncate"
                      >
                        <span className="truncate">{item.name}</span>
                        <span className="font-mono text-[10px] ml-1 opacity-90">{item.durationMins}m</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            /* Single Zone Bar */
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold text-[#3b332b]">
                <span>Single Basket ({plan.zone1TempC}°C Compromise Temp)</span>
                <span className="text-[11px] font-mono text-[#786c5e]">Staggered additions in one drawer</span>
              </div>
              <div className="h-9 bg-[#f5ede2] rounded-lg overflow-hidden relative border border-[#e4dcce]">
                {plan.zone1Items.map((item, i) => {
                  const startPct = (item.startAtMins / plan.totalDurationMins) * 100;
                  const widthPct = (item.durationMins / plan.totalDurationMins) * 100;
                  return (
                    <div
                      key={i}
                      style={{ left: `${startPct}%`, width: `${widthPct}%` }}
                      className="absolute top-1 bottom-1 bg-[#c25e36] text-white rounded-md px-2 flex items-center justify-between text-[11px] font-medium shadow-xs truncate"
                    >
                      <span className="truncate">{item.name}</span>
                      <span className="font-mono text-[10px] ml-1">{item.durationMins}m</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Time axis markers */}
          <div className="flex justify-between text-[10px] font-mono text-[#8f8274] pt-1 px-1">
            <span>0m (Start)</span>
            <span>{Math.round(plan.totalDurationMins * 0.25)}m</span>
            <span>{Math.round(plan.totalDurationMins * 0.5)}m (Halfway)</span>
            <span>{Math.round(plan.totalDurationMins * 0.75)}m</span>
            <span>{plan.totalDurationMins}m (Sync Finish)</span>
          </div>
        </div>
      </div>

      {/* 3. Interactive Live Cooking Simulator & Digital Kitchen Clock */}
      <div className="p-6 rounded-2xl bg-[#26221f] text-white shadow-lg space-y-6 border border-[#3b3530]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#3b3530]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wide uppercase text-[#c25e36]">
                Interactive Kitchen Assistant
              </span>
              <span className="text-xs text-[#8c8072]">·</span>
              <span className="text-xs text-[#b8aba0]">With Audio Beeps & Alerts</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Live Cooking Mode
            </h3>
          </div>

          {/* Fast-Forward Testing Multipliers (Essential for quick 10-minute testing!) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#1a1715] rounded-xl self-start sm:self-auto border border-[#3b3530]">
            <span className="text-[10px] text-[#8a7e70] font-medium px-2 flex items-center gap-1">
              <FastForward className="w-3 h-3" /> Test Speed:
            </span>
            {[1, 5, 15, 30, 60].map((mult) => (
              <button
                key={mult}
                onClick={() => setSpeedMultiplier(mult)}
                className={`px-2 py-1 text-xs font-mono font-semibold rounded-lg transition-colors cursor-pointer ${
                  speedMultiplier === mult
                    ? 'bg-[#c25e36] text-white'
                    : 'text-[#9c8f82] hover:text-white'
                }`}
                title={`Run clock at ${mult}x speed`}
              >
                {mult}x
              </button>
            ))}
          </div>
        </div>

        {/* Digital Clock & Big Action Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Giant Clock */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#1a1715] border border-[#3b3530]">
            <span className="text-xs uppercase tracking-wider text-[#968a7c] font-semibold mb-1">
              Time Remaining
            </span>
            <div className="text-5xl sm:text-6xl font-mono font-bold tracking-tight text-white tabular-nums my-1">
              {formatSeconds(remainingSeconds)}
            </div>
            <div className="flex items-center gap-3 text-xs text-[#8c8073] mt-2">
              <span>Elapsed: {formatSeconds(elapsedSeconds)}</span>
              <span>·</span>
              <span>Total: {plan.totalDurationMins}:00</span>
            </div>

            {/* Play/Pause/Reset Buttons */}
            <div className="flex items-center gap-3 mt-6">
              {!isRunning ? (
                <button
                  onClick={handleStartTimer}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#c25e36] hover:bg-[#d46a41] text-white text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>{elapsedSeconds > 0 ? 'Resume Timer' : 'Start Live Cook'}</span>
                </button>
              ) : (
                <button
                  onClick={handlePauseTimer}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#4a423b] hover:bg-[#5c534b] text-white text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Timer</span>
                </button>
              )}

              <button
                onClick={handleResetTimer}
                title="Reset timer to 0"
                className="p-2.5 rounded-xl bg-[#2e2924] hover:bg-[#3d3832] text-[#a69a8d] hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                title={soundEnabled ? 'Mute sound alerts' : 'Enable sound alerts'}
                className="p-2.5 rounded-xl bg-[#2e2924] hover:bg-[#3d3832] text-[#a69a8d] hover:text-white transition-colors cursor-pointer"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
              </button>
            </div>
          </div>

          {/* Right: Real-Time Current Cue & Next Action Prompter */}
          <div className="lg:col-span-7 space-y-4">
            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs text-[#a69a8e] mb-1 font-mono">
                <span>Cooking Progress</span>
                <span className="tabular-nums">{Math.round(progressPercent)}%</span>
              </div>
              <div className="w-full h-2.5 bg-[#1a1715] rounded-full overflow-hidden border border-[#3b3530]">
                <div
                  className="h-full bg-gradient-to-r from-[#c25e36] to-[#e07e55] transition-all duration-200"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Current Status Box */}
            <div className="p-4 rounded-xl bg-[#1f1b18] border border-[#3d3630]">
              <div className="flex items-center justify-between text-xs text-[#8c8072] mb-1">
                <span className="uppercase font-semibold tracking-wider text-[#c25e36]">
                  Active Step Now
                </span>
                {activeAction && (
                  <span className="font-mono text-[11px] text-[#b3a79a]">
                    Triggered at {activeAction.timestampFormatted}
                  </span>
                )}
              </div>

              {activeAction ? (
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    {activeAction.isShake ? (
                      <Bell className="w-4 h-4 text-amber-400 animate-bounce" />
                    ) : activeAction.type === 'finish' ? (
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Flame className="w-4 h-4 text-[#c25e36]" />
                    )}
                    {activeAction.title}
                  </h4>
                  <p className="text-xs text-[#b8aca0] mt-1 leading-relaxed">
                    {activeAction.instruction}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-[#968a7c]">
                  Click &quot;Start Live Cook&quot; to begin. Step 1 will trigger immediately at 00:00.
                </p>
              )}
            </div>

            {/* Next Action in Countdown */}
            {nextAction && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#171412] border border-[#332e28] text-xs">
                <span className="text-[#968a7b]">
                  Next action: <strong className="text-white">{nextAction.title}</strong>
                </span>
                <span className="font-mono font-semibold text-[#c25e36] tabular-nums">
                  in {formatSeconds(secondsUntilNext)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Chronological Step-by-Step Cue Card List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#26221f]">
            Step-by-Step Cooking Cue Cards ({plan.actions.length} actions)
          </h3>
          <span className="text-xs text-[#786c5e]">
            Follow in order for simultaneous finish
          </span>
        </div>

        <div className="space-y-3">
          {plan.actions.map((act, idx) => {
            const isCompleted = completedActions.has(act.id);
            const isCurrent = activeAction?.id === act.id;

            return (
              <div
                key={act.id}
                className={`p-4 rounded-2xl transition-all border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-white border-2 border-[#c25e36] shadow-md'
                    : isCompleted
                    ? 'bg-[#f4efe6] border-[#ded5c7] opacity-80'
                    : 'bg-white border-[#e4dcce] hover:border-[#b8aba0]'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Timestamp Box */}
                  <div
                    className={`w-14 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs shrink-0 tabular-nums ${
                      isCurrent
                        ? 'bg-[#c25e36] text-white shadow-xs'
                        : isCompleted
                        ? 'bg-[#557b5f] text-white'
                        : 'bg-[#ede5d8] text-[#4d4236]'
                    }`}
                  >
                    <span>{act.timestampFormatted}</span>
                    <span className="text-[9px] font-normal uppercase opacity-80">min</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-[#26221f]">{act.title}</h4>
                      {act.zone !== 'both' && (
                        <span className="text-[10px] font-semibold text-[#736556] bg-[#f2ebdF] px-2 py-0.5 rounded-md">
                          Basket {act.zone}
                        </span>
                      )}
                      {act.temperatureC && (
                        <span className="text-[10px] font-mono text-[#c25e36] bg-[#fbf0ea] px-1.5 py-0.5 rounded-md font-semibold">
                          {act.temperatureC}°C
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#6e6153] mt-1 leading-relaxed">
                      {act.instruction}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => {
                      setCompletedActions((prev) => {
                        const next = new Set(prev);
                        if (next.has(act.id)) next.delete(act.id);
                        else next.add(act.id);
                        return next;
                      });
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                      isCompleted
                        ? 'bg-[#557b5f] text-white'
                        : 'bg-[#ede5d8] hover:bg-[#ded4c5] text-[#54483c]'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isCompleted ? 'Done' : 'Mark Done'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Chef Pro-Tips & Kitchen Guidelines */}
      {plan.proTips.length > 0 && (
        <div className="p-6 rounded-2xl bg-[#f8f5ef] border border-[#e4dbcc] space-y-3">
          <h4 className="text-sm font-bold text-[#26221f] flex items-center gap-2">
            <span>🇬🇧</span>
            <span>UK Home Cook Crisping & Food Standards Notes</span>
          </h4>
          <ul className="space-y-2 text-xs text-[#615446]">
            {plan.proTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#c25e36] font-bold">·</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#e5dcce]">
        <button
          onClick={onBackToRecommendations}
          className="text-xs font-semibold text-[#6e6154] hover:text-[#26221f]"
        >
          ← Adjust Recommendations & Cuts
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintSheet}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#4d4237] bg-white border border-[#ded5c7] rounded-xl hover:bg-[#ede5d8] transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-[#706456]" />
            <span>Print Sheet</span>
          </button>

          <button
            onClick={handleCopyKitchenSheet}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#c25e36] hover:bg-[#aa4e28] rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            {copiedSheet ? <Check className="w-3.5 h-3.5 text-white" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedSheet ? 'Plan Copied!' : 'Share / Copy Plan'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
