export interface CategoryDefinition {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  note: string;
  panelClass: string;
  spotlightClass?: string;
  textureClass?: string;
  placeholderTone?: string;
  identity: string;
  cardColor?: string;
  fandoms?: string[];
  products?: Product[];
}

export interface ProductGallery {
  label: string;
  caption: string;
  className: string;
  image?: string;
}

export interface Review {
  quote: string;
  author: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number | null;
  image?: string;
  gallery?: ProductGallery[];
  label: string;
  description: string;
  color?: string;
  materials: string[];
  dimensions: string;
  care: string;
  goodFor: string[];
  story: string;
  comparison: string[][];
  releaseDate: string;
  limitedDrop: boolean;
  colors: string[];
  materialOptions: string[];
  textureClass?: string;
  categoryId?: string;
  categoryName?: string;
  categoryIdentity?: string;
  panelClass?: string;
  spotlightClass?: string;
  reviews?: Review[];
}

const categoryDefinitions: CategoryDefinition[] = [
  {
    id: 'fidget-gears',
    name: 'Fidget Gears',
    eyebrow: 'Category 01',
    description: 'Mechanical little distractions for busy hands and overloaded brains.',
    note: 'For people who think better while aggressively rotating something.',
    panelClass: 'bg-[#f2ffb9]',
    spotlightClass: 'bg-[linear-gradient(140deg,rgba(212,255,0,0.38),rgba(255,255,255,0.9))]',
    textureClass: 'texture-lines',
    placeholderTone: 'Chartreuse studio',
    identity:
      'Bright, tactile, and slightly overcaffeinated. This category feels energetic on purpose.',
  },
  {
    id: 'cable-management',
    name: 'Cable Management',
    eyebrow: 'Category 02',
    description: 'Tiny interventions for cables that have forgotten what discipline looks like.',
    note: 'A soft reboot for your desk spaghetti.',
    panelClass: 'bg-[#e7f1ff]',
    spotlightClass: 'bg-[linear-gradient(140deg,rgba(0,87,255,0.12),rgba(255,255,255,0.92))]',
    textureClass: 'texture-grid',
    placeholderTone: 'Cool utility blue',
    identity:
      'Sharper, cleaner, and more systems-minded. Functional design without the corporate sadness.',
  },
  {
    id: 'brutalist-cementware',
    name: 'Brutalist Cementware',
    eyebrow: 'Category 03',
    description: 'Dense, moody, architectural pieces for desks with opinions.',
    note: 'Looks editorial. Feels mildly indestructible.',
    panelClass: 'bg-[#d9d2c9] text-ink',
    spotlightClass: 'bg-[linear-gradient(140deg,rgba(28,28,28,0.22),rgba(255,255,255,0.08))]',
    textureClass: 'texture-concrete',
    placeholderTone: 'Concrete editorial grey',
    identity:
      'Heavier, moodier, and more sculptural. It should feel like architecture landed on a desk.',
  },
  {
    id: 'planters',
    name: 'Planters',
    eyebrow: 'Category 04',
    description: 'Low-maintenance architecture for high-maintenance little plants.',
    note: 'Give your pothos a better personality.',
    panelClass: 'bg-[#dcf7e6]',
    spotlightClass: 'bg-[linear-gradient(140deg,rgba(48,128,84,0.12),rgba(255,255,255,0.92))]',
    textureClass: 'texture-soft',
    placeholderTone: 'Greenhouse daylight',
    identity:
      'Lighter, calmer, and more breathable. A plant category that still feels designed, not rustic.',
  },
  {
    id: 'organisers',
    name: 'Organisers',
    eyebrow: 'Category 05',
    description: 'Orderly objects for people who are trying their best.',
    note: 'Structure, but make it attractive.',
    panelClass: 'bg-[#ffe4ec]',
    spotlightClass: 'bg-[linear-gradient(140deg,rgba(219,42,99,0.12),rgba(255,255,255,0.95))]',
    textureClass: 'texture-grid',
    placeholderTone: 'Studio pink utility',
    identity:
      'Modular, tidy, and slightly more polished. The grown-up part of the brand with better posture.',
  },
  {
    id: 'oddities',
    name: 'Oddities',
    eyebrow: 'Category 06',
    description: 'Small weird objects with no business being this lovable.',
    note: 'The category for items that make guests ask follow-up questions.',
    panelClass: 'bg-[#fff0d8]',
    spotlightClass: 'bg-[linear-gradient(140deg,rgba(255,122,0,0.16),rgba(255,255,255,0.94))]',
    textureClass: 'texture-card',
    placeholderTone: 'Curio warm light',
    identity:
      'Playful, collectible, and a little inexplicable. These are for people who enjoy delightful nonsense.',
  },
];

const rawProducts: Record<string, Partial<Product>[]> = {
  'fidget-gears': [
    {
      id: 1,
      slug: 'focus-fidget-gear',
      name: "The 'Focus' Fidget Gear",
      price: 499,
      label: 'Desk toy',
      description: 'Mechanical satisfaction for people who open twenty tabs and call it research.',
      color: 'from-[#d4ff00] via-[#f4ffb8] to-[#ffffff]',
      materials: ['PLA+', 'steel bearing insert'],
      dimensions: '62 mm x 62 mm x 12 mm',
      care: 'Keep away from direct heat, dust with a dry cloth, and do not leave it inside a car in May.',
      goodFor: ['deep work fidgeting', 'meeting survival', 'giftable desk toy'],
      story:
        'Designed for that exact moment when your brain refuses to lock in unless your hands have a side quest.',
      comparison: [
        ['Feel', 'Heavy click with smooth spin'],
        ['Noise level', 'Low to medium'],
        ['Best use', 'Desk focus and repetitive thumb work'],
      ],
      releaseDate: '2026-08-12T18:00:00+05:30',
      limitedDrop: true,
      colors: ['Acid Lime', 'Soft Stone', 'Signal Blue'],
      materialOptions: ['PLA+', 'PETG upgrade'],
    },
    {
      id: 7,
      slug: 'orbit-thumb-spinner',
      name: 'Orbit Thumb Spinner',
      price: 349,
      label: 'Desk toy',
      description: 'A compact spinny thing for meetings that should have been emails.',
      color: 'from-[#d6ffe7] via-[#effff5] to-[#ffffff]',
      materials: ['PLA+', 'hybrid bearing core'],
      dimensions: '48 mm diameter x 11 mm',
      care: 'Avoid moisture, wipe clean, and spin responsibly around beverages.',
      goodFor: ['pocket carry', 'travel fidget', 'video call survival'],
      story:
        'This one is simpler, lighter, and more portable. Less industrial ritual, more everyday brain pacifier.',
      comparison: [
        ['Feel', 'Fast spin, lighter grip'],
        ['Noise level', 'Quiet'],
        ['Best use', 'Pocket fidget and low-key meetings'],
      ],
      releaseDate: '2026-08-18T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Mint', 'Ink', 'Sand'],
      materialOptions: ['PLA+', 'Silk PLA'],
    },
    {
      id: 8,
      slug: 'hex-click-worry-token',
      name: 'Hex Click Worry Token',
      price: 279,
      label: 'Fidget object',
      description: 'Pocket-sized tactile nonsense with a suspiciously calming click.',
      color: 'from-[#fff0bf] via-[#fff8df] to-[#ffffff]',
      materials: ['PETG', 'snap-fit switch core'],
      dimensions: '54 mm x 47 mm x 9 mm',
      care: 'Do not force the click joints past their stop points. That is not the relationship.',
      goodFor: ['anxious thumbs', 'study sessions', 'small desk gifts'],
      story:
        'Built around the satisfying tiny movement that makes your shoulders drop without asking permission.',
      comparison: [
        ['Feel', 'Clicky and tactile'],
        ['Noise level', 'Medium'],
        ['Best use', 'Restless fingers and short breaks'],
      ],
      releaseDate: '2026-07-22T18:00:00+05:30',
      limitedDrop: true,
      colors: ['Butter', 'Fog', 'Cherry'],
      materialOptions: ['PETG'],
    },
  ],
  'cable-management': [
    {
      id: 2,
      slug: 'cable-management-octopus',
      name: 'Cable Management Octopus',
      price: 299,
      label: 'Organizer',
      description: 'Eight tiny arms. Zero judgment about your charging habits.',
      color: 'from-[#b9d2ff] via-[#dce8ff] to-[#ffffff]',
      materials: ['Flexible TPU', 'desk-safe adhesive pad'],
      dimensions: '78 mm x 64 mm x 18 mm',
      care: 'Peel slowly if repositioning, and clean the surface before sticking it down again.',
      goodFor: ['charging cable control', 'monitor-side routing', 'bedside tables'],
      story:
        'A cable clip that stopped trying to look invisible and instead chose to be useful with personality.',
      comparison: [
        ['Capacity', 'Up to 8 thin cables'],
        ['Mounting', 'Adhesive'],
        ['Best use', 'Messy daily charging setups'],
      ],
      releaseDate: '2026-08-05T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Cloud Blue', 'Smoke', 'Coral'],
      materialOptions: ['TPU'],
    },
    {
      id: 9,
      slug: 'under-desk-cable-saddle',
      name: 'Under-Desk Cable Saddle',
      price: 399,
      label: 'Cable control',
      description: 'Keeps your charger herd from belly-flopping off the desk edge.',
      color: 'from-[#c7e3ff] via-[#ecf5ff] to-[#ffffff]',
      materials: ['PETG', 'double-sided mount strip'],
      dimensions: '112 mm x 46 mm x 28 mm',
      care: 'Best installed on clean matte surfaces. Give the adhesive a few hours before loading it up.',
      goodFor: ['under-desk routing', 'workstation cleanup', 'gaming setups'],
      story:
        'Made for the invisible underside of the desk, where most cable-management promises go to die.',
      comparison: [
        ['Capacity', '4 to 6 thicker cables'],
        ['Mounting', 'Adhesive or screws'],
        ['Best use', 'Permanent desk setups'],
      ],
      releaseDate: '2026-08-28T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Frost', 'Blackout'],
      materialOptions: ['PETG'],
    },
    {
      id: 10,
      slug: 'magnetic-wire-dock',
      name: 'Magnetic Wire Dock',
      price: 459,
      label: 'Organizer',
      description: 'A neat little home for runaway wires and low-grade desk chaos.',
      color: 'from-[#dbe6ff] via-[#f1f5ff] to-[#ffffff]',
      materials: ['PLA+', 'embedded magnets', 'steel keeper tabs'],
      dimensions: '96 mm x 30 mm x 20 mm',
      care: 'Keep away from magnetic stripe cards and wipe magnets dry if dust builds up.',
      goodFor: ['daily charging docks', 'Apple/USB-C setups', 'clean desktop lines'],
      story:
        'The nice version of telling your cables to sit down and stop embarrassing you in front of guests.',
      comparison: [
        ['Capacity', '3 to 5 cables'],
        ['Mounting', 'Desktop placement'],
        ['Best use', 'Visible charging stations'],
      ],
      releaseDate: '2026-07-30T18:00:00+05:30',
      limitedDrop: true,
      colors: ['Graphite', 'Ice', 'Cobalt'],
      materialOptions: ['PLA+', 'Resin top cap'],
    },
  ],
  'brutalist-cementware': [
    {
      id: 3,
      slug: 'brutalist-cement-desk-lamp',
      name: 'Brutalist Cement Desk Lamp',
      price: 1499,
      image: '/images/brutalist-cement-desk-lamp.png',
      label: 'Cementware',
      description: 'A moody block of concrete that also happens to throw flattering light.',
      color: 'from-[#6f6d68] via-[#c6c2ba] to-[#f9f9f7]',
      materials: ['Cast cement', 'felt base', 'lamp hardware'],
      dimensions: '158 mm x 98 mm x 92 mm',
      care: 'Dust gently, avoid soaking, and use only the recommended bulb format.',
      goodFor: ['mood lighting', 'architectural desks', 'dramatic shelf styling'],
      story:
        'Part lamp, part paperweight, part quiet flex. Built to make the rest of the desk behave.',
      comparison: [
        ['Weight', 'Heavy'],
        ['Function', 'Ambient desk lamp'],
        ['Best use', 'Night desk setups and sideboards'],
      ],
      releaseDate: '2026-09-01T18:00:00+05:30',
      limitedDrop: true,
      colors: ['Natural Concrete', 'Charcoal Wash'],
      materialOptions: ['Raw cement', 'sealed matte finish'],
    },
    {
      id: 11,
      slug: 'concrete-catchall-tray',
      name: 'Concrete Catchall Tray',
      price: 799,
      image: '/images/concrete-catchall-tray.png',
      label: 'Cementware',
      description: 'For keys, rings, SD cards, and the illusion that you are organized.',
      color: 'from-[#7d7973] via-[#d4cec5] to-[#f9f9f7]',
      materials: ['Cast cement', 'soft cork pads'],
      dimensions: '168 mm x 126 mm x 22 mm',
      care: 'Do not drag across polished surfaces. Lift it like an adult.',
      goodFor: ['entryway drop trays', 'desk valet', 'accessory staging'],
      story:
        'A tray with enough weight to feel intentional and enough restraint to let the objects on it look good.',
      comparison: [
        ['Weight', 'Medium-heavy'],
        ['Function', 'Desk or entry tray'],
        ['Best use', 'Keys, watches, loose tech bits'],
      ],
      releaseDate: '2026-08-14T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Stone', 'Ash'],
      materialOptions: ['Raw cement', 'Wax-sealed'],
    },
    {
      id: 12,
      slug: 'monolith-incense-block',
      name: 'Monolith Incense Block',
      price: 649,
      image: '/images/monolith-incense-block.png',
      label: 'Decor object',
      description: 'A small slab for smoke, ash, and dramatic inner monologues.',
      color: 'from-[#8a857f] via-[#d3cdc4] to-[#f9f9f7]',
      materials: ['Cast cement', 'heat-safe insert'],
      dimensions: '104 mm x 54 mm x 28 mm',
      care: 'Allow ash to cool fully and never leave burning incense unattended.',
      goodFor: ['reading corners', 'shelf styling', 'calm-down rituals'],
      story:
        'Minimal enough to look calm. Heavy enough to remind you it is still a small block of stone-like material.',
      comparison: [
        ['Weight', 'Medium'],
        ['Function', 'Incense holder'],
        ['Best use', 'Quiet corners and low lighting'],
      ],
      releaseDate: '2026-08-21T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Ash', 'Olive Grey'],
      materialOptions: ['Sealed cement'],
    },
  ],
  planters: [
    {
      id: 4,
      slug: 'low-poly-planter',
      name: 'Low-Poly Planter',
      price: 399,
      image: '/images/low-poly-planter.png',
      label: 'Planter',
      description: 'For plants that deserve architecture, not just a random pot.',
      color: 'from-[#d0f4df] via-[#effcf4] to-[#ffffff]',
      materials: ['PLA+', 'drip tray insert'],
      dimensions: '108 mm x 108 mm x 104 mm',
      care: 'Use with an inner nursery pot or liner for longer life and easier watering.',
      goodFor: ['succulents', 'tiny desk jungles', 'gift plants'],
      story:
        'Angular geometry for people who want their greenery to look curated rather than accidentally alive.',
      comparison: [
        ['Drainage', 'Inner tray compatible'],
        ['Weight', 'Light'],
        ['Best use', 'Indoor desk plants'],
      ],
      releaseDate: '2026-07-25T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Moss', 'Ivory', 'Terracotta'],
      materialOptions: ['PLA+', 'Recycled PLA'],
    },
    {
      id: 13,
      slug: 'ribbed-desk-planter',
      name: 'Ribbed Desk Planter',
      price: 449,
      image: '/images/ribbed-desk-planter.png',
      label: 'Planter',
      description: 'A clean vertical texture for tiny plants with big self-esteem.',
      color: 'from-[#c7f1d7] via-[#eefcf2] to-[#ffffff]',
      materials: ['PLA+', 'removable liner'],
      dimensions: '94 mm diameter x 112 mm',
      care: 'Do not overwater directly into the shell unless using the waterproof liner.',
      goodFor: ['small foliage plants', 'window sills', 'minimal desks'],
      story:
        'Softer than the low-poly planter, more gallery shelf than gaming setup, but still clean enough for both.',
      comparison: [
        ['Drainage', 'Liner included'],
        ['Weight', 'Light'],
        ['Best use', 'Calmer, softer setups'],
      ],
      releaseDate: '2026-08-10T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Sage', 'Mist', 'Clay'],
      materialOptions: ['PLA+', 'Matte PETG'],
    },
    {
      id: 14,
      slug: 'window-sill-herb-pod',
      name: 'Window Sill Herb Pod',
      price: 529,
      label: 'Plant home',
      description: 'Minimal, neat, and optimistic about your basil survival rate.',
      color: 'from-[#d9f7e4] via-[#f3fdf7] to-[#ffffff]',
      materials: ['PETG', 'wick tray'],
      dimensions: '182 mm x 82 mm x 94 mm',
      care: 'Use lighter soil mixes and rinse the wick tray between replanting cycles.',
      goodFor: ['herbs', 'kitchen windows', 'paired plant displays'],
      story:
        'A slightly more functional planter for people who want something between pure decor and full gardening ambition.',
      comparison: [
        ['Drainage', 'Wick tray'],
        ['Weight', 'Light-medium'],
        ['Best use', 'Herbs and twin mini plants'],
      ],
      releaseDate: '2026-08-24T18:00:00+05:30',
      limitedDrop: true,
      colors: ['Pearl', 'Moss', 'Slate'],
      materialOptions: ['PETG'],
    },
  ],
  organisers: [
    {
      id: 6,
      slug: 'modular-pen-stand',
      name: 'Modular Pen Stand',
      price: 599,
      label: 'Desk setup',
      description: 'Snaps together like adult Lego, but somehow less embarrassing.',
      color: 'from-[#ffc7d7] via-[#ffe7ee] to-[#ffffff]',
      materials: ['PLA+', 'snap modules'],
      dimensions: '142 mm x 98 mm x 108 mm',
      care: 'Separate modules gently and keep ink spills from drying inside the seams.',
      goodFor: ['pens and markers', 'art desks', 'study tables'],
      story:
        'A modular organizer for people whose definition of “desk setup” includes micro-optimizing the pen zone.',
      comparison: [
        ['Capacity', '12 to 16 tools'],
        ['Flexibility', 'Modular'],
        ['Best use', 'Creative workstations'],
      ],
      releaseDate: '2026-08-01T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Blush', 'Bone', 'Graphite'],
      materialOptions: ['PLA+', 'Recycled PLA'],
    },
    {
      id: 15,
      slug: 'stackable-tool-caddy',
      name: 'Stackable Tool Caddy',
      price: 699,
      label: 'Desk setup',
      description: 'A home for cutters, markers, rulers, and your false sense of control.',
      color: 'from-[#ffd8e4] via-[#fff0f5] to-[#ffffff]',
      materials: ['PETG', 'locking stack feet'],
      dimensions: '182 mm x 124 mm x 84 mm',
      care: 'Do not overload the top tray with dense tools unless you enjoy chaos.',
      goodFor: ['maker desks', 'craft tools', 'studio storage'],
      story:
        'This is the one for slightly more serious mess. Same visual restraint, more practical ambition.',
      comparison: [
        ['Capacity', 'Large'],
        ['Flexibility', 'Stackable'],
        ['Best use', 'Tools and mixed accessories'],
      ],
      releaseDate: '2026-08-15T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Shell', 'Charcoal', 'Rose Dust'],
      materialOptions: ['PETG'],
    },
    {
      id: 16,
      slug: 'micro-parts-sorter',
      name: 'Micro Parts Sorter',
      price: 549,
      label: 'Organizer',
      description: 'For screws, bits, adapters, and every tiny object that disappears on purpose.',
      color: 'from-[#ffd4cb] via-[#fff0ec] to-[#ffffff]',
      materials: ['PLA+', 'sliding lids'],
      dimensions: '164 mm x 104 mm x 28 mm',
      care: 'Keep lids free of grit and avoid forcing the slide tracks.',
      goodFor: ['tech parts', 'keyboard bits', 'maker accessories'],
      story:
        'A small-parts system for people with niche hobbies, extra adapters, and no tolerance for rummaging.',
      comparison: [
        ['Capacity', '12 compartments'],
        ['Flexibility', 'Sliding access'],
        ['Best use', 'Tiny hardware and adapters'],
      ],
      releaseDate: '2026-07-29T18:00:00+05:30',
      limitedDrop: true,
      colors: ['Ivory', 'Rust', 'Ink'],
      materialOptions: ['PLA+'],
    },
    {
      id: 19,
      slug: 'adjustable-card-display',
      name: 'Adjustable Card Display (1:64)',
      price: null,
      image: '/images/adjustable-card-display.png',
      gallery: [
        {
          label: 'Front view',
          caption: 'Adjustable Card Display (1:64) in matte black.',
          className: 'bg-[#121826] texture-lines',
          image: '/images/adjustable-card-display.png'
        },
        {
          label: 'Detail crop',
          caption: 'Close-up showing the precision-fit sliding slots and matte surface texture.',
          className: 'bg-[#ffffff] texture-lines',
          image: '/images/adjustable-card-display-closeup.jpg'
        }
      ],
      label: 'Organizer',
      description: 'Slide-adjustable display racking to showcase up to 6 carded 1:64 scale diecast models cleanly without packaging wear.',
      color: 'from-[#ffc2f5] via-[#fff0fb] to-[#ffffff]',
      materials: ['PLA', 'PLA+', 'adjustable track sliders'],
      dimensions: '240 mm x 120 mm x 45 mm',
      care: 'Keep away from high direct heat; clear tracks periodically to keep the sliding motion smooth.',
      goodFor: ['Hot Wheels collections', 'Matchbox blisters', 'scale model displays'],
      story:
        'Built for collectors who refuse to unbox their 1:64 scale diecast models but still want a clean, wall-mountable or shelf-standing showcase. The slide tracks adjust smoothly to grip standard cards or thicker premium blisters.',
      comparison: [
        ['Capacity', 'Up to 6 standard cards'],
        ['Flexibility', 'Adjustable width'],
        ['Best use', 'Wall mount or shelf display'],
      ],
      releaseDate: '2026-07-25T18:00:00+05:30',
      limitedDrop: false,
      colors: ['White', 'Black'],
      materialOptions: ['PLA', 'PLA+'],
    },
  ],
  oddities: [
    {
      id: 5,
      slug: 'existential-crisis-paperweight',
      name: 'Existential Crisis Paperweight',
      price: 249,
      image: '/images/existential-crisis-paperweight.png',
      label: 'Paperweight',
      description: 'Tiny emotional support object for documents and deadlines alike.',
      color: 'from-[#ffe2b8] via-[#fff1dc] to-[#ffffff]',
      materials: ['Resin-filled shell', 'weighted core'],
      dimensions: '58 mm x 58 mm x 58 mm',
      care: 'Keep away from enthusiastic toddlers and anyone who tests paperweights by throwing them.',
      goodFor: ['desk personality', 'gifts', 'light paperwork'],
      story:
        'A nonsense object with perfect timing. It exists because sometimes utility alone is spiritually insufficient.',
      comparison: [
        ['Weight', 'Medium'],
        ['Function', 'Desk accent + paperweight'],
        ['Best use', 'Gifts and mood-setting'],
      ],
      releaseDate: '2026-07-19T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Amber', 'Smoke', 'Cream'],
      materialOptions: ['Weighted resin composite'],
    },
    {
      id: 17,
      slug: 'mini-mood-totem',
      name: 'Mini Mood Totem',
      price: 319,
      label: 'Desk oddity',
      description: 'A small sculptural thing that means nothing and somehow improves everything.',
      color: 'from-[#ffd6b5] via-[#fff0e2] to-[#ffffff]',
      materials: ['PLA+', 'sand-finish coat'],
      dimensions: '82 mm x 40 mm x 34 mm',
      care: 'Handle gently if you like it on the same shelf as glass and emotional stability.',
      goodFor: ['shelf styling', 'camera backgrounds', 'gift add-ons'],
      story:
        'Not every object needs to justify itself with productivity. Some are simply here to make the room better.',
      comparison: [
        ['Weight', 'Light'],
        ['Function', 'Pure decor'],
        ['Best use', 'Shelves and desk corners'],
      ],
      releaseDate: '2026-08-03T18:00:00+05:30',
      limitedDrop: true,
      colors: ['Sand', 'Clay Red', 'Soft Black'],
      materialOptions: ['PLA+', 'textured coat'],
    },
    {
      id: 18,
      slug: 'decision-dice-block',
      name: 'Decision Dice Block',
      price: 289,
      label: 'Conversation piece',
      description: 'For choosing between coffee, chaos, nap, and pretending to work.',
      color: 'from-[#ffeac8] via-[#fff5e7] to-[#ffffff]',
      materials: ['PLA+', 'engraved faces'],
      dimensions: '46 mm cube',
      care: 'Roll on forgiving surfaces unless you want your dramatic prop chipped by reality.',
      goodFor: ['desk jokes', 'stream backgrounds', 'small gifts'],
      story:
        'A functional joke, which is honestly a pretty good summary of the brand at its most unserious.',
      comparison: [
        ['Weight', 'Light'],
        ['Function', 'Desk prop + decision gimmick'],
        ['Best use', 'Low-stakes fun'],
      ],
      releaseDate: '2026-08-20T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Bone', 'Solar', 'Midnight'],
      materialOptions: ['PLA+'],
    },
  ],
};

const defaultReviews = [
  {
    quote: 'Actually fixed my messy desk. 10/10.',
    author: 'Rahul, Bangalore',
  },
  {
    quote: 'Looks like a design magazine, ships like a normal store. Bless.',
    author: 'Karan, Delhi',
  },
];

function makeGallery(product: Partial<Product>, category: CategoryDefinition): ProductGallery[] {
  return [
    {
      label: 'Front view',
      caption: `${product.name} in ${category.placeholderTone?.toLowerCase() || 'studio'}.`,
      className: `${product.color} ${category.textureClass}`,
    },
    {
      label: 'Desk setup',
      caption: `How it sits inside a carefully curated, mildly judgmental workspace.`,
      className: `${category.spotlightClass} ${category.textureClass}`,
    },
    {
      label: 'Detail crop',
      caption: `Close-up for surface, layers, edges, and the part your camera would zoom into first.`,
      className: `bg-[#ffffff] ${category.textureClass}`,
    },
  ];
}

function makeProduct(product: Partial<Product>, category: CategoryDefinition): Product {
  return {
    ...(product as Product),
    categoryId: category.id,
    categoryName: category.name,
    categoryIdentity: category.identity,
    panelClass: category.panelClass,
    spotlightClass: category.spotlightClass,
    textureClass: category.textureClass,
    gallery: product.gallery || makeGallery(product, category),
    reviews:
      product.id! % 2 === 0
        ? [
            {
              quote: 'Looks expensive, works well, and has no cringe startup energy.',
              author: 'Aditi, Hyderabad',
            },
            ...defaultReviews,
          ]
        : [
            {
              quote: 'Genuinely useful. Also weirdly photogenic on my desk.',
              author: 'Sarthak, Mumbai',
            },
            ...defaultReviews,
          ],
  };
}

export const productCategories: CategoryDefinition[] = categoryDefinitions.map((category) => ({
  ...category,
  products: (rawProducts[category.id] || []).map((product) => makeProduct(product, category)),
}));


export function getCategoryById(id: string): CategoryDefinition | null {
  return productCategories.find((category) => category.id === id) ?? null;
}

export const fandomCollections: CategoryDefinition[] = [
  {
    id: 'radiant-tactical',
    name: 'Radiant Protocol',
    eyebrow: 'Fandom 01',
    description: 'Clean-lined props, tactical utility, and desk totems inspired by high-stakes defusal and radiant abilities.',
    note: 'Sharp edges and radiant energy.',
    identity: 'Tactical and clean. Built for setups that look like they belong in a futuristic esports cafe, without the RGB noise.',
    fandoms: ['Radiant Protocol'],
    panelClass: 'bg-[#121826] text-paper',
    cardColor: 'from-[#e4ebf5] via-[#eef3fb] to-[#ffffff]',
    products: [
      {
        id: 101,
        slug: "floating-city-cement-coaster",
        name: "Floating City Cement Coaster",
        price: 849,
        label: "Cementware",
        description: "A heavy, brutalist concrete coaster bearing tactical map geometry. Protects your desk with anchor weight.",
        materials: ["Cast cement","cork base"],
        dimensions: "90 mm x 90 mm x 12 mm",
        care: "Wipe with a damp cloth. Do not soak.",
        goodFor: ["gaming desks","drink protection","tactical styling"],
        story: "Engineered for people who need their drink coaster to look like it could withstand a tactical strike.",
        comparison: [["Weight","Heavy"],["Function","Desk protection"],["Best use","Mugs and glasses"]],
        releaseDate: "2026-08-15T18:00:00+05:30",
        limitedDrop: true,
        colors: ["Concrete Grey","Tactical Black"],
        materialOptions: ["Raw cement","Sealed finish"],
        textureClass: "texture-concrete"
      },
      {
        id: 102,
        slug: "radiant-totem",
        name: "3D Printed Radiant Totem",
        price: 899,
        label: "Fan collectible",
        description: "Small-batch PLA+ printed pedestal for your weapon buddies. Clean layer lines, matte finish, zero wobble.",
        materials: ["PLA+","weighted base"],
        dimensions: "60 mm x 60 mm x 120 mm",
        care: "Keep away from direct heat and dust gently.",
        goodFor: ["desk display","weapon buddies","stream backgrounds"],
        story: "A perfect pedestal for the tiny digital companions that watch you throw rounds.",
        comparison: [["Weight","Medium"],["Function","Display pedestal"],["Best use","Figurines and buddies"]],
        releaseDate: "2026-09-01T18:00:00+05:30",
        limitedDrop: false,
        colors: ["Radiant Radium","Matte Black"],
        materialOptions: ["PLA+"],
        textureClass: "texture-lines"
      },
      {
        id: 103,
        slug: "econ-drop-creds-tray",
        name: "Econ Drop Creds Tray",
        price: 1499,
        label: "Desk utility",
        description: "Resin-infused 3D printed tray for your keys and coins, shaped like an in-game economy drop.",
        materials: ["Resin-filled shell"],
        dimensions: "140 mm x 100 mm x 25 mm",
        care: "Do not drag across polished surfaces.",
        goodFor: ["keys","coins","desk valet"],
        story: "For when you need a drop in real life to hold your everyday carry.",
        comparison: [["Weight","Medium-heavy"],["Function","Catchall tray"],["Best use","Entryway or desk"]],
        releaseDate: "2026-08-20T18:00:00+05:30",
        limitedDrop: true,
        colors: ["Creds Gold","Tactical Silver"],
        materialOptions: ["Resin-filled shell"],
        textureClass: "texture-grid"
      },
    ],
  },
  {
    id: 'global-offensive',
    name: 'Global Offensive',
    eyebrow: 'Fandom 02',
    description: 'Utility markers, map geometry references, and objects for people who obsess over spray patterns and rushing B.',
    note: 'Tactical grit and industrial finishes.',
    identity: 'Brutalist, functional, and deeply specific. For players who appreciate the geometry of a good smoke lineup.',
    fandoms: ['Global Offensive'],
    panelClass: 'bg-[#ffb03a] text-ink',
    cardColor: 'from-[#fff3e0] via-[#fff8f0] to-[#ffffff]',
    products: [
      {
        id: 104,
        slug: "smoke-lineup-marker-set",
        name: "Smoke Lineup Marker Set",
        price: 1199,
        label: "3D Printed",
        description: "Precision printed PLA markers for players who enjoy overthinking map geometry. Satisfyingly tactile.",
        materials: ["PLA+"],
        dimensions: "30 mm x 30 mm x 5 mm (each)",
        care: "Keep away from heat.",
        goodFor: ["desk toys","fidgeting","map strategy"],
        story: "Tactile tokens for the player who spends more time in custom servers than actual matches.",
        comparison: [["Weight","Light"],["Function","Desk markers"],["Best use","Tactical planning"]],
        releaseDate: "2026-08-10T18:00:00+05:30",
        limitedDrop: false,
        colors: ["Smoke Grey","Flashbang White"],
        materialOptions: ["PLA+"],
        textureClass: "texture-lines"
      },
      {
        id: 105,
        slug: "bomb-site-a-concrete-block",
        name: "Bomb Site A Concrete Block",
        price: 949,
        label: "Cementware",
        description: "Brutalist concrete paperweight stamped with site markings. Literally feels like a piece of the map.",
        materials: ["Cast cement"],
        dimensions: "70 mm x 70 mm x 70 mm",
        care: "Heavy object. Do not drop on toes or glass desks.",
        goodFor: ["paperweight","bookend","desk menace"],
        story: "A literal piece of concrete geometry for your desk. Defuse kit not included.",
        comparison: [["Weight","Very Heavy"],["Function","Paperweight"],["Best use","Holding down documents"]],
        releaseDate: "2026-09-05T18:00:00+05:30",
        limitedDrop: true,
        colors: ["Dust II Sand","Mirage Clay"],
        materialOptions: ["Raw cement"],
        textureClass: "texture-concrete"
      },
      {
        id: 106,
        slug: "defusal-kit-cable-route",
        name: "Defusal Kit Cable Route",
        price: 799,
        label: "Cable management",
        description: "A flexible TPU-printed cable router to tame the mess behind your monitor without looking corporate.",
        materials: ["Flexible TPU","adhesive back"],
        dimensions: "110 mm x 40 mm x 20 mm",
        care: "Clean desk surface before sticking.",
        goodFor: ["cable routing","clean setups"],
        story: "Tames the chaotic wires behind your rig with a tactical aesthetic.",
        comparison: [["Capacity","4 thick cables"],["Mounting","Adhesive"],["Best use","Monitor routing"]],
        releaseDate: "2026-07-25T18:00:00+05:30",
        limitedDrop: false,
        colors: ["Olive Drab","Stealth Black"],
        materialOptions: ["TPU"],
        textureClass: "texture-grid"
      },
    ],
  },
  {
    id: 'middle-realms',
    name: 'Middle Realms',
    eyebrow: 'Fandom 03',
    description: 'Relics, ruins, and miniature architecture for desks that deserve a little more fantasy and fellowship.',
    note: 'Old-world textures and ancient stone.',
    identity: 'Heavier, earthier, and undeniably epic. Brings the weight of ancient histories right to your bookshelf.',
    fandoms: ['Middle Realms'],
    panelClass: 'bg-[#3b4334] text-paper',
    cardColor: 'from-[#eaf0e6] via-[#f2f7f0] to-[#fafcf9]',
    products: [
      {
        id: 107,
        slug: "halfling-door-desk-relic",
        name: "Halfling Door Desk Relic",
        price: 1399,
        label: "Resin print",
        description: "High-detail resin printed architectural tribute for desks that want to feel like a quiet morning in the shires.",
        materials: ["Resin-filled shell","hand-painted details"],
        dimensions: "120 mm x 120 mm x 40 mm",
        care: "Dust gently with a soft brush.",
        goodFor: ["bookshelf styling","cozy desks"],
        story: "A perfectly round, welcoming door that leads nowhere but reminds you of home.",
        comparison: [["Weight","Medium"],["Function","Display piece"],["Best use","Shelf decor"]],
        releaseDate: "2026-10-01T18:00:00+05:30",
        limitedDrop: true,
        colors: ["Shire Green","Oak Brown"],
        materialOptions: ["Painted Resin"],
        textureClass: "texture-soft"
      },
      {
        id: 108,
        slug: "river-kings-cement-bookends",
        name: "River Kings Cement Bookends",
        price: 4599,
        label: "Cementware",
        description: "Heavy, hand-poured cement bookends that command respect on any bookshelf. Extremely dense.",
        materials: ["Cast cement","cork base"],
        dimensions: "150 mm x 80 mm x 180 mm (each)",
        care: "Do not drag. Lift to reposition.",
        goodFor: ["heavy books","epic shelves"],
        story: "Twin monoliths to guard your fantasy tomes. They shall not pass.",
        comparison: [["Weight","Massive"],["Function","Bookends"],["Best use","Hardcover collections"]],
        releaseDate: "2026-11-15T18:00:00+05:30",
        limitedDrop: true,
        colors: ["Argonath Grey"],
        materialOptions: ["Raw cement"],
        textureClass: "texture-concrete"
      },
      {
        id: 109,
        slug: "elvish-script-token-tray",
        name: "Elvish Script Token Tray",
        price: 1299,
        label: "3D Printed",
        description: "Matte PLA+ catchall tray engraved with ancient script. A safe place to drop your keys and coins.",
        materials: ["PLA+"],
        dimensions: "160 mm x 100 mm x 15 mm",
        care: "Wipe with a dry cloth.",
        goodFor: ["jewelry","keys","dice"],
        story: "The script running along the edge doesn't actually glow, but the vibe is there.",
        comparison: [["Weight","Light"],["Function","Valet tray"],["Best use","Bedside tables"]],
        releaseDate: "2026-08-12T18:00:00+05:30",
        limitedDrop: false,
        colors: ["Moonlight Silver","Forest Green"],
        materialOptions: ["PLA+"],
        textureClass: "texture-lines"
      },
    ],
  },
  {
    id: 'wizarding-halls',
    name: 'Wizarding Halls',
    eyebrow: 'Fandom 04',
    description: 'Magical utility objects and enchanted diorama pieces for the modern scholar of witchcraft and wizardry.',
    note: 'Dark academia and brass accents.',
    identity: 'Mysterious, scholarly, and a bit theatrical. Perfect for turning a regular desk into a proper study.',
    fandoms: ['Wizarding Halls'],
    panelClass: 'bg-[#5c1e1e] text-paper',
    cardColor: 'from-[#f5e4e4] via-[#f9efef] to-[#fdf8f8]',
    products: [
      {
        id: 110,
        slug: "magical-academy-book-nook",
        name: "Magical Academy Book Nook",
        price: 3299,
        label: "Mixed Media",
        description: "3D printed stone-texture walls combined with warm LED lighting. Pure magical drama for your books.",
        materials: ["PLA+","LED wiring","acrylic inserts"],
        dimensions: "220 mm x 100 mm x 240 mm",
        care: "Keep away from moisture. Powered by USB.",
        goodFor: ["bookshelves","ambient lighting"],
        story: "Creates an illusion of a secret cobblestone alleyway hidden right between your novels.",
        comparison: [["Weight","Medium"],["Function","Shelf diorama"],["Best use","Fantasy collections"]],
        releaseDate: "2026-10-31T18:00:00+05:30",
        limitedDrop: true,
        colors: ["Castle Stone"],
        materialOptions: ["Mixed media assembly"],
        textureClass: "texture-card"
      },
      {
        id: 111,
        slug: "wizards-wand-pen-holder",
        name: "Wizard's Wand Pen Holder",
        price: 899,
        label: "3D Printed",
        description: "A dignified PLA+ printed rest for your stylus, pen, or actual wand. Finished to look like polished dark wood.",
        materials: ["PLA+","wood-fill texture"],
        dimensions: "180 mm x 50 mm x 60 mm",
        care: "Wipe with a dry cloth.",
        goodFor: ["fountain pens","Apple Pencils","wands"],
        story: "Elevates your writing instrument to artifact status.",
        comparison: [["Capacity","1 pen"],["Function","Pen rest"],["Best use","Executive desks"]],
        releaseDate: "2026-09-15T18:00:00+05:30",
        limitedDrop: false,
        colors: ["Walnut Finish","Ebony Finish"],
        materialOptions: ["PLA+"],
        textureClass: "texture-lines"
      },
      {
        id: 112,
        slug: "house-crest-cement-tile",
        name: "House Crest Cement Tile",
        price: 1499,
        label: "Cementware",
        description: "A beautifully poured concrete tile bearing a scholarly crest. Heavy, architectural, and completely serious.",
        materials: ["Cast cement","brass hanger"],
        dimensions: "140 mm x 140 mm x 18 mm",
        care: "Hang securely on a masonry wall or display on an easel.",
        goodFor: ["wall decor","leaning art"],
        story: "A brutalist take on school pride. Heavy enough to survive a bludger.",
        comparison: [["Weight","Heavy"],["Function","Wall art"],["Best use","Study rooms"]],
        releaseDate: "2026-08-25T18:00:00+05:30",
        limitedDrop: true,
        colors: ["Crimson Wash","Emerald Wash","Midnight Wash","Amber Wash"],
        materialOptions: ["Cast cement"],
        textureClass: "texture-concrete"
      },
    ],
  },
  {
    id: 'earths-mightiest',
    name: "Earth's Mightiest",
    eyebrow: 'Fandom 05',
    description: 'Cinematic icons and tech-forward desk upgrades for the hero shelf and billionaire playboys.',
    note: 'Glossy finishes and reactor glows.',
    identity: 'Bold, graphic, and highly engineered. It should feel like something a certain tech genius left in the lab.',
    fandoms: ["Earth's Mightiest"],
    panelClass: 'bg-[#e8eefb] text-ink',
    cardColor: 'from-[#e8eefb] via-[#f0f4fd] to-[#fafbff]',
    products: [
      {
        id: 113,
        slug: "billionaires-reactor-core-shell",
        name: "Billionaire's Reactor Core Shell",
        price: 1899,
        label: "3D Printed",
        description: "Multi-part PLA+ enclosure for LED pucks. Designed to make your setup look mildly reactor-powered.",
        materials: ["PLA+","diffuser acrylic"],
        dimensions: "100 mm diameter x 40 mm",
        care: "Fits standard 85mm LED pucks. Do not use heat-generating bulbs.",
        goodFor: ["ambient lighting","hero setups"],
        story: "Proof that Tony had a heart, or at least a really cool desk lamp.",
        comparison: [["Compatibility","85mm LED pucks"],["Function","Lamp housing"],["Best use","Tech desks"]],
        releaseDate: "2026-11-01T18:00:00+05:30",
        limitedDrop: true,
        colors: ["Titanium Silver","Mark III Gold"],
        materialOptions: ["PLA+"],
        textureClass: "texture-lines"
      },
      {
        id: 114,
        slug: "heros-shield-alloy-coaster",
        name: "Hero's Shield Alloy Coaster",
        price: 749,
        label: "Cementware",
        description: "Functional fandom cast in concrete. Absorbs condensation without turning into a convention booth.",
        materials: ["Cast cement","cork base"],
        dimensions: "100 mm diameter x 12 mm",
        care: "Wipe down. Patina will develop over time with coffee rings.",
        goodFor: ["mugs","desk protection"],
        story: "It won't bounce back if you throw it, but it will protect your desk from water rings.",
        comparison: [["Weight","Medium"],["Function","Drink coaster"],["Best use","All beverages"]],
        releaseDate: "2026-07-30T18:00:00+05:30",
        limitedDrop: false,
        colors: ["Vibranium Grey","Patriot Red Wash"],
        materialOptions: ["Cast cement"],
        textureClass: "texture-concrete"
      },
      {
        id: 115,
        slug: "wall-crawler-cable-clip",
        name: "Wall-Crawler Cable Clip",
        price: 599,
        label: "3D Printed",
        description: "A flexible, strong TPU cable clip that anchors to the edge of your desk to save your charging cord.",
        materials: ["Flexible TPU","adhesive back"],
        dimensions: "60 mm x 60 mm x 20 mm",
        care: "Clean desk surface before sticking.",
        goodFor: ["charging cables","edge routing"],
        story: "Hangs onto the edge of your desk like its life depends on it. Saves your cables from falling into the abyss.",
        comparison: [["Capacity","2 cables"],["Function","Edge routing"],["Best use","Phone chargers"]],
        releaseDate: "2026-08-05T18:00:00+05:30",
        limitedDrop: false,
        colors: ["Web White","Suit Red","Symbiote Black"],
        materialOptions: ["TPU"],
        textureClass: "texture-grid"
      },
    ],
  },
];

export const reviews = [
  {
    quote: 'Actually fixed my messy desk. 10/10.',
    author: 'Rahul, Bangalore',
  },
  {
    quote: 'The cement lamp is heavy enough to function as a weapon. I love it.',
    author: 'Priya, Mumbai',
  },
  {
    quote: 'UPI checkout took less time than deciding what color to buy.',
    author: 'Ananya, Pune',
  },
  {
    quote: 'Looks like a design magazine, ships like a normal store. Bless.',
    author: 'Karan, Delhi',
  },
];

export interface FooterPageSection {
  title: string;
  paragraphs: string[];
}

export interface FooterPage {
  note?: string;
  title: string;
  eyebrow: string;
  intro: string;
  sections: FooterPageSection[];
}

export const footerPages: Record<string, FooterPage> = {
  shipping: {
    title: 'Shipping',
    eyebrow: 'Dispatch notes',
    intro:
      'We ship across India, pack carefully, and keep the process transparent from checkout to doorstep.',
    sections: [
      {
        title: 'Processing and dispatch',
        paragraphs: [
          'Ready-to-ship items are generally processed within 2 to 5 working days. Small-batch cement pieces, made-to-order items, custom fandom work, and diorama builds may require additional production time before dispatch.',
          'Where an order contains both ready stock and made-to-order pieces, the order may be shipped together once the full set is ready unless split shipping is specifically offered at checkout or confirmed by support.',
        ],
      },
      {
        title: 'Delivery coverage and timelines',
        paragraphs: [
          'We currently ship within India. Delivery timelines depend on destination, courier serviceability, weather conditions, public holidays, and operational disruptions beyond our control.',
          'Estimated timelines shown on the site are indicative only and do not create a guaranteed delivery commitment unless expressly stated for a specific drop or campaign.',
        ],
      },
      {
        title: 'Address accuracy and failed delivery',
        paragraphs: [
          'Customers are responsible for providing a complete and accurate delivery address, reachable mobile number, and any landmark details required for successful delivery.',
          'If an order is delayed, returned, or marked undeliverable because of incorrect address details, repeated non-availability, or refusal to accept delivery, re-dispatch may be charged at actual cost.',
        ],
      },
      {
        title: 'Packaging, risk, and inspection',
        paragraphs: [
          'Fragile and heavy items such as cementware are packed with additional cushioning. Even so, customers should inspect the package on delivery and photograph any visible external damage before opening whenever possible.',
          'Risk in transit remains with us until delivery is completed, but claims for transit damage are much easier to resolve when reported promptly with clear photos of the outer package, inner packaging, invoice, and affected product.',
        ],
      },
    ],
    note:
      'Nothing on this page limits any non-waivable consumer rights available under applicable Indian law.',
  },
  returns: {
    title: 'Returns',
    eyebrow: 'Regret management',
    intro:
      'If something arrives damaged, incorrect, or materially defective, we want to know quickly and we will work toward a fair resolution.',
    sections: [
      {
        title: 'Eligibility for return, replacement, or refund review',
        paragraphs: [
          'Please contact us within 48 hours of delivery for transit damage, wrong-item delivery, missing items, or products that arrive with a clear manufacturing defect.',
          'To help us review the issue, include your order number and clear photos or video showing the shipping label, packaging, invoice if available, and the product condition.',
        ],
      },
      {
        title: 'Items generally not eligible for routine return',
        paragraphs: [
          'Because many products are produced in small runs, made to order, customized, hand-finished, or sold in limited fandom drops, we generally do not accept returns for change of mind, minor variation in finish, or preference-based reasons after delivery.',
          'Small cosmetic variations, texture differences, pigment shifts, layer lines, and other finish characteristics that are normal to 3D printing, cement casting, and hand-finishing are not treated as defects unless the product is materially unusable or substantially different from its description.',
        ],
      },
      {
        title: 'Approved resolutions',
        paragraphs: [
          'Where a claim is accepted, the remedy may include replacement, repair, store credit, partial refund, or full refund depending on stock availability, severity of issue, and whether the original item must be returned first.',
          'If a return pickup is required, instructions will be shared by support. Returned items should be packed securely with all included parts, inserts, and accessories where applicable.',
        ],
      },
      {
        title: 'Refund timing and payment route',
        paragraphs: [
          'Approved refunds are usually processed back to the original payment method, or by another lawful method where technically required. Bank, card, UPI, wallet, or gateway settlement times may vary after we initiate the refund.',
          'Cash on Delivery charges, shipping fees, convenience charges, and other non-refundable service costs may be withheld where the issue does not arise from our error or a product defect.',
        ],
      },
    ],
    note:
      'This policy is intended to explain process, not to reduce any statutory rights you may have under the Consumer Protection Act, 2019 or other applicable law.',
  },
  contact: {
    title: 'Contact',
    eyebrow: 'Human support',
    intro:
      'For orders, custom builds, fandom concepts, gifting, trade enquiries, or any question that deserves a human answer.',
    sections: [
      {
        title: 'What we can help with',
        paragraphs: [
          'Order support, dispatch status, damaged shipment reports, customization requests, event gifting, retail collaborations, and fandom-inspired commissions all belong here.',
          'If you are enquiring about a diorama, collectible drop, or fandom object, tell us the world, the scale, the budget range, and whether it is meant for display, gifting, or a functional desk setup.',
        ],
      },
      {
        title: 'Response windows',
        paragraphs: [
          'Support requests are generally reviewed on working days and answered in the order they are received, with urgent order issues prioritized where possible.',
          'Messages that include an order number, photos, and a clear description of the issue are much easier to resolve quickly than messages that open with only emotional devastation.',
        ],
      },
      {
        title: 'Business and legal communication',
        paragraphs: [
          'Formal notices relating to orders, consumer complaints, intellectual property concerns, or business verification should include full contact details, a clear subject line, and all relevant references so the matter can be routed properly.',
          'Operational identity details such as billing name, invoice details, and any applicable tax or registration information will be reflected on checkout records, invoices, packaging declarations, or customer communications where required.',
        ],
      },
    ],
    note:
      'For rights-related complaints, customers may also use the grievance and consumer redressal channels available under applicable Indian law.',
  },
  manifesto: {
    title: 'Made with Anxiety and Lots of Caffeine in India',
    eyebrow: 'Tiny manifesto',
    intro:
      'Not a slogan. More of an operating condition. The objects are thoughtful, slightly obsessive, and made by people who care too much in the best possible way.',
    sections: [
      {
        title: 'Why this exists',
        paragraphs: [
          'Modern desks are full of useful things that somehow still manage to feel anonymous. We make objects that work hard but still have a point of view.',
          'That means better textures, sharper forms, more personality, and less mass-produced indifference.',
        ],
      },
      {
        title: 'How things get made',
        paragraphs: [
          'A typical object begins as a sketch, a practical annoyance, or a joke that refuses to stay a joke. It then passes through prototyping, testing, redesigning, cursing, sanding, reprinting, recasting, and finally becoming good enough to leave the studio.',
          'The anxiety keeps the details honest. The caffeine keeps the process moving. India keeps the whole operation grounded, local, and proudly specific.',
        ],
      },
    ],
    note:
      'If a product feels unusually considered for something that lives next to your monitor, that is very much on purpose.',
  },
  faq: {
    title: 'FAQ',
    eyebrow: 'Questions people actually ask',
    intro:
      'A practical guide to the stuff most customers want to know before they click pay now.',
    sections: [
      {
        title: 'Are these handmade or mass-produced?',
        paragraphs: [
          'They are essentially handmade in the sense that they are produced in small batches, finished with hands-on oversight, and not churned out like anonymous factory commodities. 3D printed parts, cast cement pieces, and hand-finished details naturally carry some variation, which is part of the character of the object.',
        ],
      },
      {
        title: 'Do you take custom orders?',
        paragraphs: [
          'Yes, depending on capacity and feasibility. We are open to custom desk objects, gifting runs, studio props, fandom concepts, and certain collectible commissions.',
        ],
      },
      {
        title: 'Will the product look exactly like the photos?',
        paragraphs: [
          'We aim for close visual accuracy, but minor differences in color, texture, print lines, cement finish, and hand-finished surfaces may occur because the products are not factory-identical.',
        ],
      },
      {
        title: 'Do you ship outside India?',
        paragraphs: [
          'Not by default at the moment. If international shipping opens for selected drops or custom commissions, it will be clearly stated on the relevant product page.',
        ],
      },
      {
        title: 'What if a fandom-inspired item raises IP concerns?',
        paragraphs: [
          'We review thematic and fan-inspired work carefully, and we reserve the right to refuse, modify, or remove designs where legal, platform, or rights-holder concerns apply.',
        ],
      },
    ],
    note:
      'If your question is more specific than this page, use the contact page and we will answer like normal humans.',
  },
  privacy: {
    title: 'Privacy',
    eyebrow: 'Data and discretion',
    intro:
      'We collect the information needed to run orders, communicate with customers, prevent abuse, and improve the shopping experience without being weird about it.',
    sections: [
      {
        title: 'What we collect',
        paragraphs: [
          'This may include your name, phone number, email address, delivery address, order details, payment status information, customer support messages, and basic device or usage data generated through the storefront.',
          'Payment instrument details are typically processed by payment service providers and may not be fully stored by us where a third-party gateway handles the transaction.',
        ],
      },
      {
        title: 'Why we use it',
        paragraphs: [
          'We use customer data to process orders, coordinate delivery, provide support, detect fraud or misuse, maintain transaction records, and comply with legal or tax obligations.',
          'We may also use limited contact information to send order updates, service notices, or customer support responses related to your purchase or enquiry.',
        ],
      },
      {
        title: 'Sharing and retention',
        paragraphs: [
          'We may share relevant information with courier partners, payment processors, service providers, advisors, or authorities where reasonably necessary to operate the business or comply with law.',
          'Data is retained only for as long as reasonably necessary for order fulfillment, support, accounting, dispute handling, security, or legal compliance.',
        ],
      },
      {
        title: 'Your choices',
        paragraphs: [
          'You may contact us to request correction of inaccurate account or order information, subject to verification and legal recordkeeping obligations.',
          'Where marketing communication is introduced, opt-out controls will be respected, but operational messages relating to purchases and support may still be sent when necessary.',
        ],
      },
    ],
    note:
      'This page is a customer-facing summary and should be reviewed with legal counsel before any live launch that processes personal data at scale.',
  },
  terms: {
    title: 'Terms of Sale and Use',
    eyebrow: 'Ground rules',
    intro:
      'By using the site or placing an order, customers agree to the terms, policies, pricing, and product information presented at the time of purchase.',
    sections: [
      {
        title: 'Orders and acceptance',
        paragraphs: [
          'Placing an order is a request to purchase. Acceptance occurs when the order is confirmed and processed by us. We reserve the right to refuse, cancel, or limit orders for reasons including pricing error, stock error, suspected fraud, misuse, or legal concerns.',
          'Product listings, prices, availability, shipping estimates, and promotional offers may change without notice, except where already confirmed in a completed order.',
        ],
      },
      {
        title: 'Product representation and variation',
        paragraphs: [
          'We try to describe products accurately, but screens, lighting, and material variation can affect how items appear. Minor visual differences do not automatically amount to a defect or misrepresentation.',
          'Some fandom-inspired or limited-edition items may be retired, revised, or released in small quantities without restock guarantees.',
        ],
      },
      {
        title: 'Use restrictions and intellectual property',
        paragraphs: [
          'All site content, copy, visual layout, branding, and product presentation are protected to the extent allowed by law. Customers may not reproduce, resell, scrape, copy, or commercially exploit site content without permission.',
          'We reserve the right to withdraw, modify, or decline designs where intellectual property, trademark, copyright, publicity, or platform policy issues may apply.',
        ],
      },
      {
        title: 'Liability and governing framework',
        paragraphs: [
          'To the maximum extent permitted by applicable law, our liability for any claim arising out of an order or use of the site will be limited to the amount actually paid for the relevant product, except where a different remedy is required by law.',
          'These terms are intended to operate subject to applicable Indian law, and any mandatory consumer protections or statutory remedies will continue to apply despite anything stated here.',
        ],
      },
    ],
    note:
      'For a production launch, these terms should be reviewed and finalized against your actual entity details, payment setup, and product categories.',
  },
  compliance: {
    title: 'Product Information and Compliance',
    eyebrow: 'Labels, declarations, and materials',
    intro:
      'We aim to give customers clear product information and follow labeling, packaging, and transaction practices that make buying less confusing and more trustworthy.',
    sections: [
      {
        title: 'Product declarations',
        paragraphs: [
          'Where a product is sold as a packaged commodity, declarations such as product name, net quantity where applicable, price information, maker or packer details, customer care details, and other required particulars should appear on packaging, invoices, or product records as applicable.',
          'Country-of-origin, material notes, size references, and care or handling guidance may also be displayed where relevant to the item category and sales channel.',
        ],
      },
      {
        title: 'Materials and safety context',
        paragraphs: [
          '3D printed products, cementware, paints, adhesives, magnets, electronics, lighting parts, and collectibles may each carry different care and use considerations. Product pages should be read carefully before purchase, especially for children, decor lighting, and fragile display pieces.',
          'Because these are small-batch and essentially handmade products, slight finish variation, print texture, cast character, and hand-finished differences should be expected unless a listing specifically states otherwise.',
          'Unless expressly stated, products are not toys for unsupervised young children, not safety equipment, and not certified for specialised industrial or medical use.',
        ],
      },
      {
        title: 'Certificates, licences, and category-specific rules',
        paragraphs: [
          'If a future product category requires a specific licence, declaration, warning, or compliance mark, that information should be provided on the relevant product page, packaging, or invoice flow rather than implied generically across the whole site.',
          'That matters particularly for electronics, lighting components, batteries, chemical finishes, or any officially regulated category that may be added later.',
        ],
      },
    ],
    note:
      'This page is deliberately careful: it signals compliance intent without falsely claiming registrations, certifications, or approvals that are not yet displayed on the storefront.',
  },
};

export const allFandomProducts = fandomCollections.flatMap(collection => 
  collection!.products!.map(product => {
    return {
      ...product,
      categoryId: collection.id,
      categoryName: collection.name,
      categoryIdentity: collection.identity,
      panelClass: collection.panelClass,
      spotlightClass: collection.panelClass,
      textureClass: product.textureClass,
      gallery: [
         { label: 'Front view', caption: product.name + ' sitting ready.', className: collection.cardColor + ' ' + product.textureClass },
         { label: 'Desk setup', caption: 'How it sits in the ' + collection.name + ' universe.', className: 'bg-white ' + product.textureClass },
         { label: 'Detail crop', caption: 'Close-up details.', className: 'bg-white ' + product.textureClass },
      ],
      reviews: []
    };
  })
);

export const allProducts = [
  ...productCategories.flatMap((category) => category.products),
  ...allFandomProducts
];

export const allProductsById = Object.fromEntries(allProducts.map((product) => [product!.id, product]));
export function getAllProducts(): Product[] {
  const coreProducts = productCategories.flatMap((c) => c.products || []);
  const fandomProducts = fandomCollections.flatMap((c) => c.products || []);
  return [...coreProducts, ...fandomProducts];
}

export function getProductById(id: number): Product | null {
  const allProducts = getAllProducts();
  return allProducts.find((p) => p!.id === (id as unknown as number)) || null;
}

export function getProductBySlug(slug: string): Product | null {
  const allProducts = getAllProducts();
  const product = allProducts.find((p) => p?.slug === slug);
  return product || null;
}
