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
  logoUrl?: string;
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
  stock: number;
  sku: string;
  adminStatus: 'active' | 'draft' | 'experimental';
  family: string;
}

const defaultReviews: Review[] = [
  {
    quote: 'Looks expensive, works well, and has no cringe startup energy.',
    author: 'Aditi, Hyderabad',
  },
  {
    quote: 'Genuinely useful. Also weirdly photogenic on my desk.',
    author: 'Sarthak, Mumbai',
  },
];

const categoryDefinitions: CategoryDefinition[] = [
  {
    id: 'desk-objects',
    name: 'Desk Objects',
    eyebrow: 'Family 01',
    description: 'Printed tools and little systems for cables, screens, stationery, and the everyday mess around a working desk.',
    note: 'For people who want a calmer setup without buying sad office-supply-store plastic.',
    panelClass: 'bg-[#e9f0df]',
    spotlightClass: 'bg-[linear-gradient(140deg,rgba(139,166,112,0.18),rgba(255,255,255,0.92))]',
    textureClass: 'texture-grid',
    placeholderTone: 'Soft utility green',
    identity:
      'Clean, practical, and tactile. These products should solve real desk annoyances without losing personality.',
    cardColor: 'from-[#dbead0] via-[#eef5e7] to-[#ffffff]',
  },
  {
    id: 'rituals',
    name: 'Rituals',
    eyebrow: 'Family 02',
    description: 'Cement pieces and quiet desk objects for candles, incense, notes, and the softer side of the setup.',
    note: 'For coffee, late-night journaling, and pretending your life has better structure than it does.',
    panelClass: 'bg-[#f6e4d6]',
    spotlightClass: 'bg-[linear-gradient(140deg,rgba(176,106,73,0.18),rgba(255,255,255,0.94))]',
    textureClass: 'texture-soft',
    placeholderTone: 'Warm clay light',
    identity:
      'Slower, warmer, and more atmospheric. This family is less about utility theatre and more about desk mood.',
    cardColor: 'from-[#efd0ba] via-[#f7e8db] to-[#fffaf5]',
  },
  {
    id: 'shelf-presence',
    name: 'Shelf Presence',
    eyebrow: 'Family 03',
    description: 'Heavier, quieter objects that anchor a room: lamp bases, trays, and pieces that sit with authority.',
    note: 'The architecture branch of the store.',
    panelClass: 'bg-[#d7d1c9]',
    spotlightClass: 'bg-[linear-gradient(140deg,rgba(28,28,28,0.22),rgba(255,255,255,0.08))]',
    textureClass: 'texture-concrete',
    placeholderTone: 'Concrete editorial grey',
    identity:
      'Broader forms, real weight, and less chatter. The point is calm presence, not decoration for decoration’s sake.',
    cardColor: 'from-[#d8d0c6] via-[#ebe6df] to-[#faf8f5]',
  },
  {
    id: 'hybrid-builds',
    name: 'Hybrid Builds',
    eyebrow: 'Family 04',
    description: 'Products that combine printed precision with cast weight, because some objects are better when both materials do their own jobs.',
    note: 'Where printed parts stop pretending to be concrete and concrete stops pretending to be precision engineering.',
    panelClass: 'bg-[#e7ecfb]',
    spotlightClass: 'bg-[linear-gradient(140deg,rgba(81,102,164,0.18),rgba(255,255,255,0.92))]',
    textureClass: 'texture-lines',
    placeholderTone: 'Blueprint daylight',
    identity:
      'The most “Bedroom Studios” family: practical hybrids where each material is chosen for what it does best.',
    cardColor: 'from-[#d9e0f3] via-[#edf1fa] to-[#ffffff]',
  },
];

const rawProducts: Record<string, Partial<Product>[]> = {
  'desk-objects': [
    {
      id: 1,
      slug: 'cable-routing-block',
      name: 'Cable Routing Block',
      sku: 'BSD-001',
      family: 'Desk Objects',
      stock: 18,
      adminStatus: 'active',
      price: 850,
      label: '3D Printed',
      description: 'A weighted little channel block that stops desk cables from living feral lives.',
      color: 'from-[#c8d8b6] via-[#e9f1de] to-[#ffffff]',
      materials: ['PETG', 'steel shot ballast', 'silicone feet'],
      dimensions: '110 mm x 48 mm x 32 mm',
      care: 'Dust with a dry cloth and keep hot soldering irons away from it.',
      goodFor: ['charging cables', 'monitor-side cleanup', 'giftable utility'],
      story: 'A compact desk tool that keeps power cords, earphones, and charging leads from escaping toward the floor every thirty minutes.',
      comparison: [
        ['Material logic', 'Printed for precision, weighted for stability'],
        ['Best use', 'Daily desk cable control'],
        ['Mood', 'Quiet competence'],
      ],
      releaseDate: '2026-07-28T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Bone', 'Soot', 'Moss'],
      materialOptions: ['PETG', 'PLA+'],
    },
    {
      id: 2,
      slug: 'monitor-dock-mini',
      name: 'Monitor Dock Mini',
      sku: 'BSD-002',
      family: 'Desk Objects',
      stock: 11,
      adminStatus: 'active',
      price: 980,
      label: '3D Printed',
      description: 'A clip-on shelf for sticky notes, SD cards, adapters, and the little things orbiting your screen.',
      color: 'from-[#d5e2c8] via-[#eef4e8] to-[#ffffff]',
      materials: ['PLA+', 'silicone pads'],
      dimensions: '140 mm x 58 mm x 36 mm',
      care: 'Do not overload it with hardware and existential dread at the same time.',
      goodFor: ['under-monitor storage', 'editor desks', 'tiny accessories'],
      story: 'This one absolutely belongs in a printer, not a mould. It needs clips, tolerances, and a shape that can be iterated quickly.',
      comparison: [
        ['Material logic', 'Printed because fit matters'],
        ['Best use', 'Under-monitor storage'],
        ['Mood', 'Clean system energy'],
      ],
      releaseDate: '2026-07-31T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Fog', 'Graphite', 'Moss'],
      materialOptions: ['PLA+'],
    },
    {
      id: 3,
      slug: 'desk-hook-tpu-clip',
      name: 'Desk Hook TPU Clip',
      sku: 'BSD-003',
      family: 'Desk Objects',
      stock: 7,
      adminStatus: 'active',
      price: 420,
      label: 'Flexible TPU',
      description: 'A bendy edge clip for headphone loops, charging cords, and whatever keeps sliding off the desk.',
      color: 'from-[#dce6d8] via-[#f3f7f1] to-[#ffffff]',
      materials: ['Flexible TPU'],
      dimensions: '74 mm x 38 mm x 24 mm',
      care: 'Clean surface before clipping and avoid stretching it like it owes you money.',
      goodFor: ['headphone hangs', 'cord retention', 'soft grip points'],
      story: 'TPU shines when an object needs flex and grip instead of rigidity. This is that case in its purest form.',
      comparison: [
        ['Material logic', 'Flexible by design'],
        ['Best use', 'Hooks and edge grips'],
        ['Mood', 'Tiny useful sidekick'],
      ],
      releaseDate: '2026-08-02T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Charcoal', 'Cloud'],
      materialOptions: ['TPU'],
    },
  ],
  rituals: [
    {
      id: 4,
      slug: 'incense-dock',
      name: 'Incense Dock',
      sku: 'BSR-001',
      family: 'Rituals',
      stock: 10,
      adminStatus: 'active',
      price: 950,
      label: 'Cementware',
      description: 'A narrow cement burner for incense sticks, ash, and five minutes of a better atmosphere.',
      color: 'from-[#e7c7b4] via-[#f5e5d9] to-[#fffaf6]',
      materials: ['Cast cement', 'cork base'],
      dimensions: '205 mm x 42 mm x 20 mm',
      care: 'Brush out ash gently and keep it dry between uses.',
      goodFor: ['desk rituals', 'journal corners', 'gift sets'],
      story: 'A simple form that casts well in silicone, ages nicely, and does not ask cement to perform precision tricks.',
      comparison: [
        ['Material logic', 'Cast because broad shapes suit cement'],
        ['Best use', 'Incense and desk rituals'],
        ['Mood', 'Calm little shrine'],
      ],
      releaseDate: '2026-07-29T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Pale Clay', 'Smoked Sand'],
      materialOptions: ['Cast cement'],
    },
    {
      id: 5,
      slug: 'column-candle-stand',
      name: 'Column Candle Stand',
      sku: 'BSR-002',
      family: 'Rituals',
      stock: 6,
      adminStatus: 'active',
      price: 890,
      label: 'Cementware',
      description: 'A heavy little candle stand that makes even a cheap tealight feel ceremonious.',
      color: 'from-[#ead6cb] via-[#f6ebe4] to-[#fffaf6]',
      materials: ['Cast cement', 'felt underside'],
      dimensions: '78 mm x 78 mm x 44 mm',
      care: 'Let wax cool before removing and avoid dragging on delicate stone.',
      goodFor: ['candles', 'nightstands', 'shelf styling'],
      story: 'This is exactly the kind of product cement is good at: easy to mould, broad in form, tactile, and not dependent on tiny fragile details.',
      comparison: [
        ['Material logic', 'Mould-friendly cement form'],
        ['Best use', 'Tealights and small candles'],
        ['Mood', 'Architectural calm'],
      ],
      releaseDate: '2026-08-07T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Warm Sand', 'Ash Grey', 'Charcoal'],
      materialOptions: ['Cast cement'],
    },
  ],
  'shelf-presence': [
    {
      id: 6,
      slug: 'phone-watch-valet',
      name: 'Phone + Watch Valet',
      sku: 'BSS-001',
      family: 'Shelf Presence',
      stock: 9,
      adminStatus: 'active',
      price: 1350,
      label: 'Cementware',
      description: 'A broad cement tray for phones, watches, keys, rings, and the evidence of your day.',
      color: 'from-[#d7d0c8] via-[#ebe5de] to-[#faf8f5]',
      materials: ['Cast cement', 'micro-seal finish'],
      dimensions: '182 mm x 114 mm x 24 mm',
      care: 'Wipe gently and do not leave soaked metal on it forever.',
      goodFor: ['bedside tables', 'desk landing zones', 'daily carry clutter'],
      story: 'A valet tray is a natural fit for cement: broad footprint, soft geometry, reassuring weight, and easy reproducibility in a silicone mould.',
      comparison: [
        ['Material logic', 'Heavy tray with simple geometry'],
        ['Best use', 'Phone and watch tray'],
        ['Mood', 'Quietly expensive'],
      ],
      releaseDate: '2026-08-10T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Stone', 'Warm Grey'],
      materialOptions: ['Cast cement'],
    },
    {
      id: 7,
      slug: 'cement-coaster-set',
      name: 'Cement Coaster Set',
      sku: 'BSS-002',
      family: 'Shelf Presence',
      stock: 14,
      adminStatus: 'active',
      price: 780,
      label: 'Cementware',
      description: 'A set of broad coasters with enough weight to stay put and enough texture to improve with use.',
      color: 'from-[#cec8c0] via-[#e5dfd7] to-[#f7f4f1]',
      materials: ['Cast cement', 'cork backing'],
      dimensions: '95 mm diameter x 12 mm',
      care: 'Wipe dry after use and let the patina happen slowly.',
      goodFor: ['coffee mugs', 'work desks', 'gifting'],
      story: 'Simple circular forms are kind to silicone moulds and let the surface variation do the work.',
      comparison: [
        ['Material logic', 'Easy cast geometry'],
        ['Best use', 'Drink protection'],
        ['Mood', 'Functional weight'],
      ],
      releaseDate: '2026-07-26T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Natural Grey', 'Smoked Stone'],
      materialOptions: ['Cast cement'],
    },
  ],
  'hybrid-builds': [
    {
      id: 8,
      slug: 'halo-lamp',
      name: 'Halo Lamp',
      sku: 'BSH-001',
      family: 'Hybrid Builds',
      stock: 4,
      adminStatus: 'active',
      price: 1890,
      label: 'Hybrid Build',
      description: 'A small lamp with a cast cement base and 3D printed shade, built for desks that need real mood.',
      image: '/images/brutalist-cement-desk-lamp.png',
      gallery: [
        {
          label: 'Halo Lamp Hero',
          caption: 'Cast cement base with 3D printed shade.',
          className: 'col-span-2 row-span-2',
          image: '/images/brutalist-cement-desk-lamp.png',
        },
      ],
      color: 'from-[#d9dff0] via-[#edf1fb] to-[#ffffff]',
      materials: ['Cast cement base', 'PLA+ shade', 'warm LED module'],
      dimensions: '205 mm x 110 mm x 110 mm',
      care: 'Dust softly and avoid swapping in hot bulbs that melt common sense.',
      goodFor: ['bedside desks', 'late-night builds', 'shelf lighting'],
      story: 'A hybrid product where each material earns its place: cement stabilizes the base, printing handles the shade geometry and fit.',
      comparison: [
        ['Material logic', 'Weight below, precision above'],
        ['Best use', 'Ambient desk light'],
        ['Mood', 'Architectural glow'],
      ],
      releaseDate: '2026-08-14T18:00:00+05:30',
      limitedDrop: true,
      colors: ['Bone Shade', 'Warm Grey Shade'],
      materialOptions: ['Cast cement + PLA+'],
    },
    {
      id: 9,
      slug: 'ritual-tray-system',
      name: 'Ritual Tray System',
      sku: 'BSH-002',
      family: 'Hybrid Builds',
      stock: 3,
      adminStatus: 'active',
      price: 1650,
      label: 'Hybrid Build',
      description: 'A cement tray with a removable printed insert for incense, matches, rings, or a tea light.',
      color: 'from-[#d9dff0] via-[#eef0f7] to-[#fffefb]',
      materials: ['Cast cement shell', 'TPU or PLA insert'],
      dimensions: '190 mm x 120 mm x 26 mm',
      care: 'Remove the insert before deep cleaning and keep open flame sensible.',
      goodFor: ['ritual corners', 'modular styling', 'gift sets'],
      story: 'The shell wants to be cement. The insert wants to be printed. Together they make a tray that can do more than one job without looking overdesigned.',
      comparison: [
        ['Material logic', 'Cast shell, precise insert'],
        ['Best use', 'Modular ritual tray'],
        ['Mood', 'Smart but not sterile'],
      ],
      releaseDate: '2026-08-20T18:00:00+05:30',
      limitedDrop: true,
      colors: ['Stone + Bone', 'Ash + Moss'],
      materialOptions: ['Cast cement + TPU', 'Cast cement + PLA+'],
    },
  ],
};

function makeGallery(product: Partial<Product>, category: CategoryDefinition): ProductGallery[] {
  return [
    {
      label: 'Front view',
      caption: `${product.name} in ${category.placeholderTone?.toLowerCase() || 'studio light'}.`,
      className: `${product.color} ${category.textureClass}`,
    },
    {
      label: 'Desk setup',
      caption: 'How it sits inside a carefully arranged, mildly judgmental workspace.',
      className: `${category.spotlightClass} ${category.textureClass}`,
    },
    {
      label: 'Detail crop',
      caption: 'Close-up for edges, finish, texture, and the material choice doing the heavy lifting.',
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
              quote: 'Feels considered, not mass-produced. That is the whole point.',
              author: 'Ananya, Pune',
            },
            ...defaultReviews,
          ]
        : [
            {
              quote: 'Useful, weirdly calming, and much nicer than generic desk clutter.',
              author: 'Karan, Delhi',
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
    id: 'bedroom-labs-lighting',
    name: 'Bedroom Labs / Lighting',
    eyebrow: 'Experiment 01',
    description: 'Printed shade ideas, cement bases, and strange lamp heads still in the prototype phase.',
    note: 'For forms that may become products later, but are not done behaving yet.',
    identity: 'Experimental, in-progress, and allowed to still be a little messy.',
    fandoms: ['Bedroom Labs'],
    panelClass: 'bg-[#f0e4dc] text-ink',
    cardColor: 'from-[#ebd6cb] via-[#f5ebe5] to-[#fffaf7]',
    products: [
      {
        id: 201,
        slug: 'lab-prism-shade-study',
        name: 'Prism Shade Study',
        sku: 'LAB-001',
        family: 'Bedroom Labs',
        stock: 1,
        adminStatus: 'experimental',
        price: 1290,
        label: 'Prototype',
        description: 'A one-off printed lamp shade study exploring how geometric ribs diffuse warm light.',
        materials: ['PLA+', 'LED test rig'],
        dimensions: '160 mm x 160 mm x 110 mm',
        care: 'Prototype object. Handle like a studio sample.',
        goodFor: ['concept validation', 'lighting tests'],
        story: 'Not a finished product. More of a promising conversation.',
        comparison: [['Status', 'Experimental'], ['Function', 'Shade study'], ['Best use', 'R&D shelf']],
        releaseDate: '2026-09-05T18:00:00+05:30',
        limitedDrop: true,
        colors: ['Bone'],
        materialOptions: ['PLA+'],
        textureClass: 'texture-lines',
      },
    ],
  },
  {
    id: 'bedroom-labs-casting',
    name: 'Bedroom Labs / Casting',
    eyebrow: 'Experiment 02',
    description: 'Mould tests, pigment experiments, and broad cast forms that are still looking for the right finish.',
    note: 'Useful for showing process without cluttering the main catalog.',
    identity: 'Slower, rougher, and more material-first than finished store products.',
    fandoms: ['Bedroom Labs'],
    panelClass: 'bg-[#ddd6ce] text-ink',
    cardColor: 'from-[#d5cec6] via-[#e8e2dc] to-[#faf7f4]',
    products: [
      {
        id: 202,
        slug: 'lab-cast-candle-plinth',
        name: 'Cast Candle Plinth Study',
        sku: 'LAB-002',
        family: 'Bedroom Labs',
        stock: 2,
        adminStatus: 'experimental',
        price: 760,
        label: 'Prototype',
        description: 'A pigment and finish test for future candle stands and ritual objects.',
        materials: ['Cast cement'],
        dimensions: '82 mm x 82 mm x 42 mm',
        care: 'Studio test piece. Finish may vary.',
        goodFor: ['pigment testing', 'mould refinement'],
        story: 'The kind of experiment that helps future products become calmer and cleaner.',
        comparison: [['Status', 'Experimental'], ['Function', 'Form test'], ['Best use', 'Bench review']],
        releaseDate: '2026-09-12T18:00:00+05:30',
        limitedDrop: true,
        colors: ['Clay Wash', 'Ash Grey'],
        materialOptions: ['Cast cement'],
        textureClass: 'texture-concrete',
      },
    ],
  },
  {
    id: 'bedroom-labs-fandom',
    name: 'Bedroom Labs / Fandom Collectibles',
    eyebrow: 'Experiment 03',
    description: 'Display objects, organisers, and props built for collectors, fandom desks, and people whose hobbies have very specific needs.',
    note: 'Because a ₹50 blister pack deserves better than a shoebox.',
    identity: 'Collector-first design. Built for the people who hunt, not just buy.',
    fandoms: ['Bedroom Labs', 'Hot Wheels', 'Diecast'],
    panelClass: 'bg-[#1a1a2e] text-white',
    cardColor: 'from-[#16213e] via-[#0f3460] to-[#533483]',
    products: [
      {
        id: 203,
        slug: 'diecast-card-tower',
        name: 'Diecast Card Tower',
        sku: 'LAB-003',
        family: 'Bedroom Labs',
        stock: 3,
        adminStatus: 'experimental',
        price: null,
        label: 'Arriving Soon',
        image: '/products/hot-wheels-card-rack.jpg',
        description:
          'An adjustable vertical rack for 1:64 blister cards. Holds your Hot Wheels, Matchbox, and Majorette collection in full card-on display without a single wall hole.',
        color: 'from-[#16213e] via-[#0f3460] to-[#533483]',
        materials: ['PLA+', 'PLA+ (matte black)'],
        dimensions: '~120 mm base × 280 mm tall (6-card config) · Adjustable slot spacing',
        care: 'Wipe with a dry cloth. No direct sunlight for extended periods — even the rack gets tired of UV.',
        goodFor: [
          'Hot Wheels / Matchbox / Majorette collectors',
          'desk display without wall damage',
          'fandom setups and content shoots',
          'gifting to the person who owns 200 blister cards and zero display logic',
        ],
        story: `You've hunted the chase card. You've scored the Treasure Hunt at the Tuesday restock. You've explained to three people why the '67 Camaro variant with the redline wheels is worth ₹800. And then you put the whole collection in a cardboard box under the bed.

That ends here.

The Diecast Card Tower is a printed vertical display rack for standard 1:64 blister-pack cards. Adjustable slot spacing means it fits Hot Wheels, Matchbox, Majorette, and most international card sizes without modification. Six cards in a tower. Clean rails. Weighted base. No wobble.

This is a Bedroom Labs prototype — designed in-house and currently in fit and finish testing. The goal is a rack that looks like it belongs on the desk, not in a toy store.

Launching soon. If you collect, you know the vibe.`,
        comparison: [
          ['Fits', 'Hot Wheels, Matchbox, Majorette, most 1:64 blister cards'],
          ['Capacity', '4–6 cards (adjustable rail spacing)'],
          ['Material', 'PLA+ matte black · base weighted for stability'],
          ['Status', 'Bedroom Labs prototype — launching soon'],
          ['Wall damage', 'None. Zero. Your landlord is safe.'],
        ],
        releaseDate: '2026-09-01T18:00:00+05:30',
        limitedDrop: true,
        colors: ['Soot (Matte Black)', 'Bone (Off-White)'],
        materialOptions: ['PLA+ Matte Black', 'PLA+ Bone'],
        textureClass: 'texture-lines',
        gallery: [
          {
            label: 'Full tower view',
            caption: 'Six Hot Wheels cards. One tower. Maximum serotonin.',
            className: 'from-[#16213e] via-[#0f3460] to-[#533483] texture-lines',
            image: '/products/hot-wheels-card-rack.jpg',
          },
          {
            label: 'Desk context',
            caption: 'Sits between your keyboard and your keyboard-related anxiety.',
            className: 'bg-[linear-gradient(140deg,rgba(81,51,131,0.25),rgba(255,255,255,0.06))] texture-lines',
            image: '/products/hot-wheels-card-rack.jpg',
          },
          {
            label: 'Slot detail',
            caption: 'Adjustable rail spacing. Snug enough to hold, loose enough to swap.',
            className: 'bg-[#f4f1ea] texture-lines',
            image: '/products/hot-wheels-card-rack-detail.jpg',
          },
        ],
        reviews: [
          {
            quote: 'Finally. My Hot Wheels collection has left the shoebox era.',
            author: 'Rohan, Bengaluru',
          },
          {
            quote: 'This is the most niche thing I have ever wanted immediately.',
            author: 'Priya, Hyderabad',
          },
          {
            quote: 'Bought it as a gift. My friend cried. Mildly. It counts.',
            author: 'Akshay, Pune',
          },
        ],
      },
    ],
  },
];

export const allProducts = [
  ...productCategories.flatMap((category) => category.products || []),
  ...fandomCollections.flatMap((collection) => collection.products || []),
];

export const allProductsById = Object.fromEntries(allProducts.map((product) => [product.id, product]));

export function getAllProducts() {
  return allProducts;
}

export function getProductById(id: number) {
  return allProducts.find((product) => product.id === id) || null;
}

export function getProductBySlug(slug: string) {
  return allProducts.find((product) => product.slug === slug) || null;
}
