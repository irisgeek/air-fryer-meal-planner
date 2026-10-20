import { Ingredient, SelectedItemConfig, AirFryerSettings, CookingPlan, TimelineAction } from '../types';
import { INGREDIENTS_DATABASE } from '../data/ingredientsData';

export interface CalculatedItem {
  id: string;
  name: string;
  category: string;
  zone: 1 | 2;
  tempC: number;
  durationMins: number;
  startAtMins: number; // minutes from overall start
  finishAtMins: number; // overall totalDurationMins
  isFrozen: boolean;
  crispiness: string;
  prepStyleLabel: string;
  quantityStr: string;
  crispingTip: string;
  safeInternalTempC?: number;
}

export function computeItemSpecs(
  itemConfig: SelectedItemConfig,
  database: Ingredient[] = INGREDIENTS_DATABASE
): { tempC: number; durationMins: number; name: string; prepLabel: string; crispingTip: string; safeInternalTempC?: number; category: string } {
  const ing = database.find(i => i.id === itemConfig.ingredientId) || database[0];
  const prep = ing.prepStyles.find(p => p.id === itemConfig.prepStyleId) || ing.prepStyles[0];

  let temp = ing.defaultTempC + (prep?.tempModifierC || 0);
  let duration = ing.defaultDurationMins + (prep?.timeModifierMins || 0);

  // Frozen adjustment
  if (itemConfig.isFrozen) {
    if (ing.id.includes('chips') || ing.id.includes('fries') || ing.id.includes('hash')) {
      // standard chips already default to frozen in UK
      duration += 1;
    } else {
      duration += 4;
      temp = Math.min(205, temp + 5);
    }
  }

  // Crispiness preference
  if (itemConfig.crispiness === 'extra-crisp') {
    duration += 2;
    temp = Math.min(205, temp + 5);
  } else if (itemConfig.crispiness === 'tender') {
    duration = Math.max(3, duration - 1);
    temp = Math.max(160, temp - 5);
  }

  // User manual overrides if provided
  if (itemConfig.customTempC) temp = itemConfig.customTempC;
  if (itemConfig.customDurationMins) duration = itemConfig.customDurationMins;

  return {
    tempC: Math.max(150, Math.min(210, temp)),
    durationMins: Math.max(2, duration),
    name: ing.name,
    prepLabel: prep?.label || 'Standard',
    crispingTip: ing.crispingTip,
    safeInternalTempC: ing.safeInternalTempC,
    category: ing.category
  };
}

function formatMinsToTimestamp(mins: number): string {
  const m = Math.floor(mins);
  const s = Math.round((mins - m) * 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function generateOptimisedPlan(
  selectedItems: SelectedItemConfig[],
  settings: AirFryerSettings,
  database: Ingredient[] = INGREDIENTS_DATABASE
): CookingPlan {
  if (selectedItems.length === 0) {
    return {
      totalDurationMins: 0,
      mode: settings.mode,
      zone1TempC: 190,
      zone2TempC: 190,
      zone1Items: [],
      zone2Items: [],
      actions: [],
      proTips: []
    };
  }

  // Compute calculated specifications for each selected item
  const calculatedItems: CalculatedItem[] = selectedItems.map(cfg => {
    const specs = computeItemSpecs(cfg, database);
    return {
      id: cfg.ingredientId,
      name: specs.name,
      category: specs.category,
      zone: settings.mode === 'single-zone' ? 1 : cfg.zone,
      tempC: specs.tempC,
      durationMins: specs.durationMins,
      startAtMins: 0,
      finishAtMins: 0,
      isFrozen: cfg.isFrozen,
      crispiness: cfg.crispiness,
      prepStyleLabel: specs.prepLabel,
      quantityStr: `${cfg.quantity} ${cfg.quantityUnit}`,
      crispingTip: specs.crispingTip,
      safeInternalTempC: specs.safeInternalTempC
    };
  });

  const totalDurationMins = Math.max(...calculatedItems.map(i => i.durationMins));

  // Determine timing offsets so every item finishes at totalDurationMins
  calculatedItems.forEach(item => {
    item.startAtMins = totalDurationMins - item.durationMins;
    item.finishAtMins = totalDurationMins;
  });

  // Calculate zone temperatures
  let zone1TempC = 190;
  let zone2TempC = 190;
  let singleZoneCompromiseTempC: number | undefined;

  const z1Items = calculatedItems.filter(i => i.zone === 1);
  const z2Items = calculatedItems.filter(i => i.zone === 2);

  if (settings.mode === 'single-zone') {
    // Single basket: compromise temp balancing all items
    const avg = Math.round(calculatedItems.reduce((acc, curr) => acc + curr.tempC, 0) / calculatedItems.length);
    // Snap to neat 5°C interval
    singleZoneCompromiseTempC = Math.round(avg / 5) * 5;
    zone1TempC = singleZoneCompromiseTempC;
  } else {
    // Dual zone: calculate Zone 1 and Zone 2 temps
    if (z1Items.length > 0) {
      const avgZ1 = Math.round(z1Items.reduce((acc, curr) => acc + curr.tempC, 0) / z1Items.length);
      zone1TempC = Math.round(avgZ1 / 5) * 5;
    }
    if (z2Items.length > 0) {
      const avgZ2 = Math.round(z2Items.reduce((acc, curr) => acc + curr.tempC, 0) / z2Items.length);
      zone2TempC = Math.round(avgZ2 / 5) * 5;
    }
  }

  // Generate Chronological Actions
  const rawActions: Array<Omit<TimelineAction, 'id' | 'timestampFormatted'>> = [];

  // 1. Initial insertions at T=0
  const t0Items = calculatedItems.filter(i => i.startAtMins === 0);
  if (t0Items.length > 0) {
    if (settings.mode === 'dual-zone') {
      const t0z1 = t0Items.filter(i => i.zone === 1);
      const t0z2 = t0Items.filter(i => i.zone === 2);

      if (t0z1.length > 0) {
        rawActions.push({
          timestampMins: 0,
          type: 'insert',
          zone: 1,
          ingredientNames: t0z1.map(i => i.name),
          title: `Start Basket 1 (${settings.basket1Name}): Add ${t0z1.map(i => i.name).join(' & ')}`,
          instruction: `Set Basket 1 to ${zone1TempC}°C for ${totalDurationMins} mins. Place ${t0z1.map(i => `${i.name} (${i.prepStyleLabel})`).join(' and ')} inside.`,
          temperatureC: zone1TempC,
          critical: true
        });
      }

      if (t0z2.length > 0) {
        rawActions.push({
          timestampMins: 0,
          type: 'insert',
          zone: 2,
          ingredientNames: t0z2.map(i => i.name),
          title: `Start Basket 2 (${settings.basket2Name}): Add ${t0z2.map(i => i.name).join(' & ')}`,
          instruction: `Set Basket 2 to ${zone2TempC}°C for ${totalDurationMins} mins. Place ${t0z2.map(i => `${i.name} (${i.prepStyleLabel})`).join(' and ')} inside.`,
          temperatureC: zone2TempC,
          critical: true
        });
      }
    } else {
      rawActions.push({
        timestampMins: 0,
        type: 'insert',
        zone: 1,
        ingredientNames: t0Items.map(i => i.name),
        title: `Start Air Fryer: Add ${t0Items.map(i => i.name).join(' & ')}`,
        instruction: `Set air fryer to ${zone1TempC}°C for ${totalDurationMins} mins. Add ${t0Items.map(i => `${i.name} (${i.prepStyleLabel})`).join(' and ')}.`,
        temperatureC: zone1TempC,
        critical: true
      });
    }
  }

  // 2. Delayed insertions (Sync Finish additions)
  const delayedItems = calculatedItems.filter(i => i.startAtMins > 0);
  delayedItems.forEach(item => {
    const zoneLabel = settings.mode === 'dual-zone' ? `Basket ${item.zone}` : 'Basket';
    const tempUsed = item.zone === 1 ? zone1TempC : zone2TempC;
    rawActions.push({
      timestampMins: item.startAtMins,
      type: 'insert',
      zone: item.zone,
      ingredientNames: [item.name],
      title: `Add ${item.name} into ${zoneLabel}`,
      instruction: `Sync Timer reached! Put ${item.name} (${item.prepStyleLabel}, ${item.quantityStr}) into ${zoneLabel}. ${settings.mode === 'dual-zone' ? `Set Basket ${item.zone} to ${tempUsed}°C for remaining ${item.durationMins} mins.` : `Slide basket back in.`}`,
      temperatureC: tempUsed,
      critical: true
    });
  });

  // 3. Shake & Flip Reminders
  if (settings.shakeReminder) {
    calculatedItems.forEach(item => {
      // items that benefit from shake/flip
      const isShakeable =
        item.name.toLowerCase().includes('chip') ||
        item.name.toLowerCase().includes('fries') ||
        item.name.toLowerCase().includes('potato') ||
        item.name.toLowerCase().includes('veg') ||
        item.name.toLowerCase().includes('rings') ||
        item.name.toLowerCase().includes('bites');

      const isFlippable =
        item.name.toLowerCase().includes('chicken') ||
        item.name.toLowerCase().includes('sausage') ||
        item.name.toLowerCase().includes('bacon') ||
        item.name.toLowerCase().includes('halloumi') ||
        item.name.toLowerCase().includes('tofu') ||
        item.name.toLowerCase().includes('hash');

      if (isShakeable || isFlippable) {
        const midPoint = Math.round(item.startAtMins + item.durationMins * 0.5);
        if (midPoint > 0 && midPoint < totalDurationMins) {
          const zoneLabel = settings.mode === 'dual-zone' ? `Basket ${item.zone}` : 'Basket';
          if (isShakeable) {
            rawActions.push({
              timestampMins: midPoint,
              type: 'shake',
              zone: item.zone,
              ingredientNames: [item.name],
              title: `Shake ${item.name} (${zoneLabel})`,
              instruction: `Pull out ${zoneLabel} and give a vigorous 5-second shake for even hot air circulation and crisp edges.`,
              isShake: true
            });
          } else {
            rawActions.push({
              timestampMins: midPoint,
              type: 'flip',
              zone: item.zone,
              ingredientNames: [item.name],
              title: `Turn / Flip ${item.name} (${zoneLabel})`,
              instruction: `Use silicone tongs to flip ${item.name} over in ${zoneLabel} to ensure an even brown crust on both sides.`,
              isShake: false
            });
          }
        }
      }
    });
  }

  // 4. Final finish action
  rawActions.push({
    timestampMins: totalDurationMins,
    type: 'finish',
    zone: 'both',
    ingredientNames: calculatedItems.map(i => i.name),
    title: 'Sync Complete: Serve Everything Hot!',
    instruction: `All items have finished cooking at the exact same moment. Check internal temperatures with a probe thermometer if needed, and rest meat for 2–3 minutes before serving.`,
    critical: true
  });

  // Sort actions chronologically
  rawActions.sort((a, b) => a.timestampMins - b.timestampMins);

  // De-duplicate any closely spaced shake actions for the same zone
  const consolidatedActions: TimelineAction[] = rawActions.map((act, idx) => ({
    ...act,
    id: `action-${idx}-${act.timestampMins}`,
    timestampFormatted: formatMinsToTimestamp(act.timestampMins)
  }));

  // Curate practical chef pro-tips for this meal
  const proTips: string[] = [];
  if (calculatedItems.some(i => i.safeInternalTempC && i.safeInternalTempC >= 75)) {
    proTips.push('Safe Poultry Cooking: In the UK, ensure chicken reaches an internal core temperature of 75°C (or 70°C held for 2 minutes).');
  }
  if (calculatedItems.some(i => i.name.toLowerCase().includes('chip') || i.name.toLowerCase().includes('potato'))) {
    proTips.push('Crispy Potato Tip: Never overcrowd the basket. If chips overlap more than 2 layers, extend the cook time by 2–3 mins.');
  }
  if (settings.oilSprayReminder) {
    proTips.push('Oil Spraying: Use a fine aerosol pump of cold-pressed rapeseed or light vegetable oil. Avoid propellant cooking sprays containing lecithin, which can degrade non-stick baskets.');
  }
  if (settings.mode === 'single-zone') {
    proTips.push(`Single Zone Compromise: Cooking at unified ${zone1TempC}°C. Veggies towards the front of the drawer, meats towards the hotter fan rear.`);
  }

  return {
    totalDurationMins,
    mode: settings.mode,
    zone1TempC,
    zone2TempC: settings.mode === 'dual-zone' ? zone2TempC : undefined,
    singleZoneCompromiseTempC,
    zone1Items: z1Items.map(i => ({ name: i.name, durationMins: i.durationMins, tempC: i.tempC, startAtMins: i.startAtMins })),
    zone2Items: z2Items.map(i => ({ name: i.name, durationMins: i.durationMins, tempC: i.tempC, startAtMins: i.startAtMins })),
    actions: consolidatedActions,
    proTips
  };
}
