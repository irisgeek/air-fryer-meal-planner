import { Ingredient } from '../types';

export const INGREDIENTS_DATABASE: Ingredient[] = [
  // --- PROTEINS ---
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    category: 'proteins',
    defaultTempC: 190,
    defaultDurationMins: 18,
    emoji: '🍗',
    safeInternalTempC: 75,
    supportsFrozen: true,
    defaultZone: 1,
    crispingTip: 'Lightly brush with rapeseed oil. Let rest for 4 mins after cooking so juices redistribute.',
    ukNote: 'UK Food Standards: Ensure piping hot and internal temperature reaches 75°C.',
    defaultPrepStyleId: 'whole',
    prepStyles: [
      { id: 'whole', label: 'Whole Breast (180g–220g)', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'cubed', label: 'Cubed / Diced (Bite-sized)', timeModifierMins: -6, tempModifierC: 5 },
      { id: 'goujons', label: 'Strips / Goujons (Breaded)', timeModifierMins: -5, tempModifierC: 5 },
      { id: 'butterflied', label: 'Butterflied / Thin Cutlet', timeModifierMins: -4, tempModifierC: 0 }
    ]
  },
  {
    id: 'chicken-thighs',
    name: 'Chicken Thighs (Skin-on)',
    category: 'proteins',
    defaultTempC: 200,
    defaultDurationMins: 22,
    emoji: '🍗',
    safeInternalTempC: 75,
    supportsFrozen: true,
    defaultZone: 1,
    crispingTip: 'Start skin-side down for 12 mins, then flip skin-side up for the final 10 mins to blister the skin.',
    ukNote: 'Bone-in thighs take 3–4 mins longer than boneless.',
    defaultPrepStyleId: 'bone-in',
    prepStyles: [
      { id: 'bone-in', label: 'Bone-in & Skin-on', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'boneless', label: 'Boneless & Skinless', timeModifierMins: -5, tempModifierC: -10 },
      { id: 'cubed-skewers', label: 'Diced Tikka / Skewers', timeModifierMins: -8, tempModifierC: 0 }
    ]
  },
  {
    id: 'salmon-fillet',
    name: 'Salmon Fillet',
    category: 'proteins',
    defaultTempC: 180,
    defaultDurationMins: 11,
    emoji: '🐟',
    safeInternalTempC: 63,
    supportsFrozen: true,
    defaultZone: 1,
    crispingTip: 'Place skin-side down on greaseproof liner or crisper tray; do not flip to keep fillet intact.',
    ukNote: 'Fabulous with lemon, dill, and a touch of Maldon sea salt.',
    defaultPrepStyleId: 'whole-fillet',
    prepStyles: [
      { id: 'whole-fillet', label: 'Whole Fillet (Skin-on)', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'cubed-bites', label: 'Honey-Soy Salmon Bites', timeModifierMins: -4, tempModifierC: 10 },
      { id: 'tail-end', label: 'Thinner Tail Fillet', timeModifierMins: -2, tempModifierC: 0 }
    ]
  },
  {
    id: 'cumberland-sausages',
    name: 'Cumberland Sausages',
    category: 'proteins',
    defaultTempC: 180,
    defaultDurationMins: 14,
    emoji: '🌭',
    safeInternalTempC: 75,
    supportsFrozen: true,
    defaultZone: 1,
    crispingTip: 'Pierce skins once or twice. Turn halfway for an even, golden butcher-shop blister.',
    ukNote: 'Great for a classic British mid-week bangers & mash or toad-in-the-hole.',
    defaultPrepStyleId: 'thick-link',
    prepStyles: [
      { id: 'thick-link', label: 'Thick Butcher Link', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'chipolatas', label: 'Thin Chipolatas', timeModifierMins: -4, tempModifierC: 0 },
      { id: 'veggie-bangers', label: 'Vegetarian Bangers (Linda M)', timeModifierMins: -2, tempModifierC: -5 }
    ]
  },
  {
    id: 'halloumi',
    name: 'Halloumi Cheese',
    category: 'proteins',
    defaultTempC: 195,
    defaultDurationMins: 9,
    emoji: '🧀',
    safeInternalTempC: 65,
    supportsFrozen: false,
    defaultZone: 1,
    crispingTip: 'Pat completely dry with kitchen towel before lightly spraying with oil for squeaky golden crust.',
    ukNote: 'Add dried oregano or chilli flakes for a Cypriot touch.',
    defaultPrepStyleId: 'thick-slices',
    prepStyles: [
      { id: 'thick-slices', label: 'Thick Slices (1cm)', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'fries-sticks', label: 'Halloumi Fries / Batons', timeModifierMins: -2, tempModifierC: 5 },
      { id: 'cubes', label: 'Tossed Cubes for Salads', timeModifierMins: -3, tempModifierC: 5 }
    ]
  },
  {
    id: 'tofu-crispy',
    name: 'Extra Firm Tofu',
    category: 'proteins',
    defaultTempC: 200,
    defaultDurationMins: 15,
    emoji: '🧊',
    safeInternalTempC: 70,
    supportsFrozen: false,
    defaultZone: 1,
    crispingTip: 'Toss pressed cubes in 1 tsp cornflour (cornstarch) and soy sauce for maximum glass-like crunch.',
    ukNote: 'Drain with a clean tea towel under a heavy saucepan for 10 mins first.',
    defaultPrepStyleId: 'cubed',
    prepStyles: [
      { id: 'cubed', label: 'Pressed Cubes (2cm)', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'slabs', label: 'Thick Slabs / Steaks', timeModifierMins: 3, tempModifierC: -10 },
      { id: 'panko-strips', label: 'Panko Crusted Fingers', timeModifierMins: -2, tempModifierC: 0 }
    ]
  },
  {
    id: 'cod-fillet',
    name: 'Cod / Haddock Fillet',
    category: 'proteins',
    defaultTempC: 185,
    defaultDurationMins: 10,
    emoji: '🐟',
    safeInternalTempC: 63,
    supportsFrozen: true,
    defaultZone: 1,
    crispingTip: 'If breaded or battered, give a light oil spray so the coating doesn’t look chalky.',
    ukNote: 'The cornerstone of a Friday night British Fish & Chip supper.',
    defaultPrepStyleId: 'battered-breaded',
    prepStyles: [
      { id: 'battered-breaded', label: 'Breaded / Battered Chunky Fillet', timeModifierMins: 2, tempModifierC: 5 },
      { id: 'naked-fillet', label: 'Plain Fillet with Butter & Herbs', timeModifierMins: -1, tempModifierC: -5 },
      { id: 'fish-fingers', label: 'Jumbo Fish Fingers', timeModifierMins: -2, tempModifierC: 5 }
    ]
  },
  {
    id: 'bacon-rashers',
    name: 'Back Bacon Rashers',
    category: 'proteins',
    defaultTempC: 190,
    defaultDurationMins: 7,
    emoji: '🥓',
    safeInternalTempC: 70,
    supportsFrozen: false,
    defaultZone: 1,
    crispingTip: 'Lay flat without overlapping. No added oil needed—fat renders out cleanly beneath the rack.',
    ukNote: 'Traditional British unsmoked or smoked back bacon.',
    defaultPrepStyleId: 'back-bacon',
    prepStyles: [
      { id: 'back-bacon', label: 'Traditional Back Bacon', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'streaky-bacon', label: 'Crispy Streaky Bacon', timeModifierMins: -1, tempModifierC: 10 },
      { id: 'thick-cut', label: 'Butcher Thick Cut', timeModifierMins: 2, tempModifierC: 0 }
    ]
  },

  // --- VEGETABLES ---
  {
    id: 'roast-potatoes',
    name: 'Roast Potatoes',
    category: 'veggies',
    defaultTempC: 200,
    defaultDurationMins: 24,
    emoji: '🥔',
    safeInternalTempC: 90,
    supportsFrozen: true,
    defaultZone: 2,
    crispingTip: 'Parboil Maris Piper potatoes for 7 mins, drain, shake roughly in colander to fluff edges, then air fry with goose fat or olive oil.',
    ukNote: 'The star of any British Sunday Roast.',
    defaultPrepStyleId: 'parboiled-roasties',
    prepStyles: [
      { id: 'parboiled-roasties', label: 'Fluffed Parboiled Roasties', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'raw-chunky-cubes', label: 'Raw Diced Cubes (No boil)', timeModifierMins: -4, tempModifierC: 0 },
      { id: 'baby-hasselback', label: 'Mini Hasselback Potatoes', timeModifierMins: -2, tempModifierC: 0 },
      { id: 'frozen-aunt-bessies', label: 'Aunt Bessie’s Frozen Roasties', timeModifierMins: 2, tempModifierC: 0 }
    ]
  },
  {
    id: 'tenderstem-broccoli',
    name: 'Tenderstem Broccoli',
    category: 'veggies',
    defaultTempC: 185,
    defaultDurationMins: 7,
    emoji: '🥦',
    safeInternalTempC: 75,
    supportsFrozen: false,
    defaultZone: 2,
    crispingTip: 'Toss lightly in oil and lemon zest. Florets char beautifully in under 8 mins—watch closely so heads don’t burn.',
    ukNote: 'Keep stems whole for great presentation.',
    defaultPrepStyleId: 'whole-stems',
    prepStyles: [
      { id: 'whole-stems', label: 'Whole Long Stems', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'regular-florets', label: 'Regular Broccoli Florets', timeModifierMins: 1, tempModifierC: 0 },
      { id: 'chopped-bite', label: 'Chopped Medley Pieces', timeModifierMins: -2, tempModifierC: 0 }
    ]
  },
  {
    id: 'asparagus-spears',
    name: 'Asparagus Spears',
    category: 'veggies',
    defaultTempC: 190,
    defaultDurationMins: 7,
    emoji: '🌱',
    safeInternalTempC: 70,
    supportsFrozen: false,
    defaultZone: 2,
    crispingTip: 'Snap the woody ends off. Season with olive oil, cracked black pepper, and parmesan during last 2 mins.',
    ukNote: 'Best when British asparagus is in season (late April to June).',
    defaultPrepStyleId: 'trimmed-spears',
    prepStyles: [
      { id: 'trimmed-spears', label: 'Trimmed Medium Spears', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'thin-tips', label: 'Slender Asparagus Tips', timeModifierMins: -2, tempModifierC: -5 },
      { id: 'wrapped-pancetta', label: 'Pancetta/Bacon Wrapped', timeModifierMins: 3, tempModifierC: 5 }
    ]
  },
  {
    id: 'carrots-batons',
    name: 'Honey Glazed Carrots',
    category: 'veggies',
    defaultTempC: 190,
    defaultDurationMins: 16,
    emoji: '🥕',
    safeInternalTempC: 85,
    supportsFrozen: false,
    defaultZone: 2,
    crispingTip: 'Cut into even batons. Add a drizzle of honey and thyme for the final 3 mins to avoid burning the sugars.',
    ukNote: 'Classic Chantenay or heritage carrots work brilliantly.',
    defaultPrepStyleId: 'batons',
    prepStyles: [
      { id: 'batons', label: 'Cut into Finger Batons', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'chantenay-whole', label: 'Whole Mini Chantenay', timeModifierMins: 3, tempModifierC: 0 },
      { id: 'thin-coins', label: 'Thin Crinkle Coins', timeModifierMins: -5, tempModifierC: 0 }
    ]
  },
  {
    id: 'sweet-potato-wedges',
    name: 'Sweet Potato Wedges',
    category: 'veggies',
    defaultTempC: 195,
    defaultDurationMins: 18,
    emoji: '🍠',
    safeInternalTempC: 85,
    supportsFrozen: true,
    defaultZone: 2,
    crispingTip: 'Dust with 1/2 tsp cornflour and smoked paprika before oiling. Sweet potatoes caramelise quickly.',
    ukNote: 'Great alternative to standard chips for a midweek dinner.',
    defaultPrepStyleId: 'wedges',
    prepStyles: [
      { id: 'wedges', label: 'Chunky Wedges (Skin-on)', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'cubes', label: 'Diced Cubes (for salad/curry)', timeModifierMins: -4, tempModifierC: 0 },
      { id: 'skinny-fries', label: 'Skinny Cut Sweet Potato Fries', timeModifierMins: -5, tempModifierC: 5 }
    ]
  },
  {
    id: 'corn-on-the-cob',
    name: 'Corn on the Cob',
    category: 'veggies',
    defaultTempC: 190,
    defaultDurationMins: 13,
    emoji: '🌽',
    safeInternalTempC: 75,
    supportsFrozen: true,
    defaultZone: 2,
    crispingTip: 'Slather with salted garlic butter halfway through for juicy charred kernels.',
    ukNote: 'Can fit whole cobs or cut into 3 miniature ribs.',
    defaultPrepStyleId: 'whole-cob',
    prepStyles: [
      { id: 'whole-cob', label: 'Whole Cob', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'mini-ribs', label: 'Corn Ribs (Quartered lengthwise)', timeModifierMins: -4, tempModifierC: 10 },
      { id: 'halved', label: 'Cut into Halves', timeModifierMins: -1, tempModifierC: 0 }
    ]
  },
  {
    id: 'mediterranean-veg',
    name: 'Mediterranean Peppers & Courgettes',
    category: 'veggies',
    defaultTempC: 190,
    defaultDurationMins: 12,
    emoji: '🫑',
    safeInternalTempC: 75,
    supportsFrozen: false,
    defaultZone: 2,
    crispingTip: 'Do not overcrowd; single layer ensures caramelised roasted edges rather than steaming.',
    ukNote: 'Red pepper, courgette, red onion wedges, and cherry vine tomatoes.',
    defaultPrepStyleId: 'chunky-chunks',
    prepStyles: [
      { id: 'chunky-chunks', label: 'Chunky 3cm Roast Chunks', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'thin-strips', label: 'Thin Fajita Slices', timeModifierMins: -4, tempModifierC: 5 }
    ]
  },

  // --- SIDES & BAKERY ---
  {
    id: 'chunky-chips',
    name: 'Chunky Chips / Fries',
    category: 'sides',
    defaultTempC: 200,
    defaultDurationMins: 19,
    emoji: '🍟',
    safeInternalTempC: 85,
    supportsFrozen: true,
    defaultZone: 2,
    crispingTip: 'Vigorous basket shake at the 10-minute mark is essential for uniform crunch.',
    ukNote: 'Whether McCain Triple Cooked or fresh British Maris Piper cut.',
    defaultPrepStyleId: 'frozen-chunky',
    prepStyles: [
      { id: 'frozen-chunky', label: 'Frozen Gastro / Chunky Chips', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'fresh-hand-cut', label: 'Fresh Hand-cut Chips (Soaked)', timeModifierMins: 3, tempModifierC: 0 },
      { id: 'skinny-fries', label: 'French Skinny Fries (Shoestring)', timeModifierMins: -6, tempModifierC: 0 },
      { id: 'crinkle-cut', label: 'Crinkle Cut Fries', timeModifierMins: -3, tempModifierC: 0 }
    ]
  },
  {
    id: 'garlic-bread',
    name: 'Garlic Baguette / Slices',
    category: 'sides',
    defaultTempC: 180,
    defaultDurationMins: 6,
    emoji: '🥖',
    safeInternalTempC: 70,
    supportsFrozen: true,
    defaultZone: 2,
    crispingTip: 'Cooks very quickly! Check at 5 mins so butter melts right through without scorching edges.',
    ukNote: 'Traditional British supermarket foil-wrapped or loose garlic slices.',
    defaultPrepStyleId: 'slices',
    prepStyles: [
      { id: 'slices', label: 'Garlic Baguette Slices (Individual)', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'half-baguette', label: 'Half Baguette Loaf', timeModifierMins: 3, tempModifierC: -10 },
      { id: 'cheesy-flatbread', label: 'Cheesy Garlic Flatbread', timeModifierMins: -1, tempModifierC: 5 }
    ]
  },
  {
    id: 'yorkshire-puddings',
    name: 'Yorkshire Puddings',
    category: 'sides',
    defaultTempC: 190,
    defaultDurationMins: 4,
    emoji: '🥧',
    safeInternalTempC: 75,
    supportsFrozen: true,
    defaultZone: 2,
    crispingTip: 'Cook straight from frozen in the final 4 minutes of meal prep. They puff up piping hot.',
    ukNote: 'Aunt Bessie’s or home-frozen Yorkies.',
    defaultPrepStyleId: 'frozen-cooked',
    prepStyles: [
      { id: 'frozen-cooked', label: 'Frozen Ready-Baked (4–6 pack)', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'giant-yorkie', label: 'Giant Yorkshire Pudding', timeModifierMins: 2, tempModifierC: 0 }
    ]
  },
  {
    id: 'hash-browns',
    name: 'Crispy Hash Browns',
    category: 'sides',
    defaultTempC: 200,
    defaultDurationMins: 13,
    emoji: '🥔',
    safeInternalTempC: 80,
    supportsFrozen: true,
    defaultZone: 2,
    crispingTip: 'No extra oil required. Flip once after 8 minutes for a deep golden crunch.',
    ukNote: 'Essential for a weekend fry-up.',
    defaultPrepStyleId: 'triangular',
    prepStyles: [
      { id: 'triangular', label: 'Frozen Triangular Patties', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'hash-brown-bites', label: 'Mini Hash Brown Bites / Tots', timeModifierMins: -3, tempModifierC: 0 }
    ]
  },
  {
    id: 'mozzarella-sticks',
    name: 'Mozzarella Sticks',
    category: 'sides',
    defaultTempC: 190,
    defaultDurationMins: 6,
    emoji: '🧀',
    safeInternalTempC: 70,
    supportsFrozen: true,
    defaultZone: 2,
    crispingTip: 'Do not overcook or cheese will burst out. Pull out the moment exterior is firm and golden.',
    ukNote: 'Keep frozen until the exact second they go into the basket.',
    defaultPrepStyleId: 'frozen-breaded',
    prepStyles: [
      { id: 'frozen-breaded', label: 'Standard Frozen Breaded', timeModifierMins: 0, tempModifierC: 0 }
    ]
  },
  {
    id: 'onion-rings',
    name: 'Beer Battered Onion Rings',
    category: 'sides',
    defaultTempC: 195,
    defaultDurationMins: 8,
    emoji: '🧅',
    safeInternalTempC: 70,
    supportsFrozen: true,
    defaultZone: 2,
    crispingTip: 'Single layer is best so rings don’t stick together. Give a quick shake after 4 minutes.',
    ukNote: 'Pub-style beer batter or breaded.',
    defaultPrepStyleId: 'battered',
    prepStyles: [
      { id: 'battered', label: 'Frozen Beer Battered Rings', timeModifierMins: 0, tempModifierC: 0 },
      { id: 'breaded-rings', label: 'Crispy Breadcrumb Rings', timeModifierMins: -1, tempModifierC: 0 }
    ]
  }
];

export interface MealPreset {
  id: string;
  title: string;
  description: string;
  ukVibe: string;
  estimatedTotalMins: number;
  items: {
    ingredientId: string;
    prepStyleId: string;
    quantity: number;
    quantityUnit: string;
    isFrozen: boolean;
    zone: 1 | 2;
  }[];
}

export const POPULAR_UK_MEAL_PRESETS: MealPreset[] = [
  {
    id: 'fish-and-chips',
    title: 'Friday Fish & Chips Supper',
    description: 'Crispy battered cod fillet paired with golden gastro chunky chips.',
    ukVibe: 'British Chippy Classic',
    estimatedTotalMins: 19,
    items: [
      { ingredientId: 'cod-fillet', prepStyleId: 'battered-breaded', quantity: 2, quantityUnit: 'fillets', isFrozen: false, zone: 1 },
      { ingredientId: 'chunky-chips', prepStyleId: 'frozen-chunky', quantity: 400, quantityUnit: 'g', isFrozen: true, zone: 2 }
    ]
  },
  {
    id: 'sunday-mini-roast',
    title: 'Sunday Air Fryer Mini-Roast',
    description: 'Crispy skin-on chicken, fluffed roasties, honey carrots & quick Yorkshire puds.',
    ukVibe: 'British Sunday Tradition',
    estimatedTotalMins: 24,
    items: [
      { ingredientId: 'chicken-thighs', prepStyleId: 'bone-in', quantity: 2, quantityUnit: 'thighs', isFrozen: false, zone: 1 },
      { ingredientId: 'roast-potatoes', prepStyleId: 'parboiled-roasties', quantity: 400, quantityUnit: 'g', isFrozen: false, zone: 2 },
      { ingredientId: 'carrots-batons', prepStyleId: 'batons', quantity: 2, quantityUnit: 'carrots', isFrozen: false, zone: 2 },
      { ingredientId: 'yorkshire-puddings', prepStyleId: 'frozen-cooked', quantity: 2, quantityUnit: 'puds', isFrozen: true, zone: 2 }
    ]
  },
  {
    id: 'midweek-salmon-greens',
    title: 'Midweek Salmon & Tenderstem',
    description: 'Flaky herb salmon with charred tenderstem broccoli & sweet potato wedges.',
    ukVibe: 'Healthy 18-Min Dinner',
    estimatedTotalMins: 18,
    items: [
      { ingredientId: 'salmon-fillet', prepStyleId: 'whole-fillet', quantity: 2, quantityUnit: 'fillets', isFrozen: false, zone: 1 },
      { ingredientId: 'sweet-potato-wedges', prepStyleId: 'wedges', quantity: 300, quantityUnit: 'g', isFrozen: false, zone: 2 },
      { ingredientId: 'tenderstem-broccoli', prepStyleId: 'whole-stems', quantity: 150, quantityUnit: 'g', isFrozen: false, zone: 2 }
    ]
  },
  {
    id: 'full-english-airfryer',
    title: 'Full English Brunch',
    description: 'Thick Cumberland bangers, back bacon, and golden crisp hash browns.',
    ukVibe: 'Weekend Morning Fry-Up',
    estimatedTotalMins: 14,
    items: [
      { ingredientId: 'cumberland-sausages', prepStyleId: 'thick-link', quantity: 4, quantityUnit: 'sausages', isFrozen: false, zone: 1 },
      { ingredientId: 'hash-browns', prepStyleId: 'triangular', quantity: 2, quantityUnit: 'patties', isFrozen: true, zone: 2 },
      { ingredientId: 'bacon-rashers', prepStyleId: 'back-bacon', quantity: 4, quantityUnit: 'rashers', isFrozen: false, zone: 1 }
    ]
  },
  {
    id: 'halloumi-roast-bowl',
    title: 'Crispy Halloumi & Mediterranean Veg',
    description: 'Golden halloumi fries with charred peppers, courgettes and garlic bread slices.',
    ukVibe: 'Vibrant Veggie Favorite',
    estimatedTotalMins: 12,
    items: [
      { ingredientId: 'halloumi', prepStyleId: 'fries-sticks', quantity: 200, quantityUnit: 'g', isFrozen: false, zone: 1 },
      { ingredientId: 'mediterranean-veg', prepStyleId: 'chunky-chunks', quantity: 300, quantityUnit: 'g', isFrozen: false, zone: 2 },
      { ingredientId: 'garlic-bread', prepStyleId: 'slices', quantity: 4, quantityUnit: 'slices', isFrozen: false, zone: 2 }
    ]
  }
];
