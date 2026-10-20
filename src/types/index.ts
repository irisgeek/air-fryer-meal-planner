export type CategoryType = 'proteins' | 'veggies' | 'sides';

export interface PrepStyle {
  id: string;
  label: string;
  timeModifierMins: number; // e.g. -3 for cubed, 0 for whole
  tempModifierC: number;    // e.g. +5 or 0
}

export interface Ingredient {
  id: string;
  name: string;
  category: CategoryType;
  defaultTempC: number;
  defaultDurationMins: number;
  prepStyles: PrepStyle[];
  defaultPrepStyleId: string;
  safeInternalTempC?: number; // e.g., 75 for poultry, 63 for salmon
  crispingTip: string;
  ukNote?: string;
  emoji: string;
  defaultZone?: 1 | 2;
  supportsFrozen?: boolean;
}

export interface SelectedItemConfig {
  ingredientId: string;
  quantity: number;
  quantityUnit: string;
  prepStyleId: string;
  isFrozen: boolean;
  crispiness: 'standard' | 'extra-crisp' | 'tender';
  zone: 1 | 2;
  customTempC?: number;
  customDurationMins?: number;
}

export interface AirFryerSettings {
  mode: 'single-zone' | 'dual-zone';
  shakeReminder: boolean;
  preheat: boolean;
  oilSprayReminder: boolean;
  basket1Name: string;
  basket2Name: string;
}

export interface TimelineAction {
  id: string;
  timestampMins: number; // minutes from start (0 to totalDuration)
  timestampFormatted: string; // e.g. "00:00" or "07:30"
  type: 'insert' | 'shake' | 'flip' | 'temp-blast' | 'finish';
  zone: 1 | 2 | 'both';
  ingredientNames: string[];
  title: string;
  instruction: string;
  temperatureC?: number;
  isShake?: boolean;
  critical?: boolean;
}

export interface CookingPlan {
  totalDurationMins: number;
  mode: 'single-zone' | 'dual-zone';
  zone1TempC: number;
  zone2TempC?: number;
  singleZoneCompromiseTempC?: number;
  zone1Items: { name: string; durationMins: number; tempC: number; startAtMins: number }[];
  zone2Items: { name: string; durationMins: number; tempC: number; startAtMins: number }[];
  actions: TimelineAction[];
  proTips: string[];
}
