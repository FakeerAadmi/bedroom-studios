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
    quote: 'The light dispersion through the 3D-printed ridges is so gentle. Perfect for late-night focus.',
    author: 'Aditi, Bengaluru',
  },
  {
    quote: 'Looks like a bespoke collectible. The print quality and tolerances are immaculate.',
    author: 'Sarthak, Mumbai',
  },
  {
    quote: 'Completely transformed the mood of my workspace. Clean design, zero glare.',
    author: 'Vikram, Hyderabad',
  },
];

const categoryDefinitions: CategoryDefinition[] = [
  {
    id: 'desk-lamps',
    name: 'Desk Lamps',
    eyebrow: 'Collection 01',
    description: 'Sculptural lighting, precision-printed shades, and architectural table lamps designed to cast warm, gentle ambient light across your workspace.',
    note: 'Engineered for glare-free focus, low-heat LED fixtures, and distinct shadow geometry.',
    panelClass: 'bg-[#f4efe8]',
    spotlightClass: 'bg-[linear-gradient(140deg,rgba(255,180,90,0.18),rgba(255,255,255,0.92))]',
    textureClass: 'texture-concrete',
    placeholderTone: 'Warm ambient glow',
    identity: 'Architectural, moody, and warm. Lighting fixtures that elevate your desk from setup to sanctuary.',
    cardColor: 'from-[#f5ece1] via-[#faf5ef] to-[#ffffff]',
  },
  {
    id: 'cementware',
    name: 'Cementware',
    eyebrow: 'Collection 02',
    description: 'Hand-cast cement desk objects — raw, tactile, and intentionally heavy. Anchors for your workspace rituals.',
    note: 'Each piece is individually cast and cured. Slight variations in texture and tone are natural.',
    panelClass: 'bg-[#e8e5e0]',
    spotlightClass: 'bg-[linear-gradient(140deg,rgba(180,175,165,0.18),rgba(255,255,255,0.92))]',
    textureClass: 'texture-concrete',
    placeholderTone: 'Raw cement grey',
    identity: 'Brutalist, grounded, and meditative. Desk objects that demand presence.',
    cardColor: 'from-[#e8e3dc] via-[#f0ece7] to-[#ffffff]',
  }
];

const rawProducts: Record<string, Partial<Product>[]> = {
  'desk-lamps': [
    {
      id: 1,
      slug: 'modern-ribbed-led-lamp',
      name: 'Modern Ribbed LED Lamp',
      sku: 'BS-LMP-001',
      family: 'Desk Lamps',
      price: 1499,
      image: '/images/lamps/modern-ribbed-led-lamp.png',
      gallery: [
        {
          label: 'Warm Desk Glow',
          caption: 'Vertical fluted fins transforming direct LED output into a soothing, gentle halo.',
          className: 'bg-[linear-gradient(140deg,rgba(255,214,143,0.22),rgba(255,255,255,0.85))] texture-lines',
          image: '/images/lamps/modern-ribbed-led-lamp.png',
        },
      ],
      label: 'Desk Lamp',
      description: 'A contemporary cylindrical table lamp featuring precision vertical fluted ribs that gently diffuse light from within, creating a warm, focused workspace glow without harsh hotspots.',
      color: 'from-[#fef3dd] via-[#fff9ec] to-[#ffffff]',
      materials: ['Translucent Diffusion PLA', 'Weighted Base Plinth', 'LED Lamp Kit-001 (5V USB)'],
      dimensions: '110 mm diameter × 165 mm height',
      care: 'Powered by a 5V USB LED module (Kit-001). Dust exterior fluted fins with a soft dry cloth. Do not expose to direct moisture.',
      goodFor: ['Desk reading & deep work', 'Bedside ambient glow', 'Minimalist workstations'],
      story: 'Optimized around the Bambu Lab LED Lamp Kit-001, the vertical fluting eliminates harsh point-source glare and casts a soft, rhythmic ambient luminance across the desk.',
      comparison: [
        ['Lighting Source', '5V USB Warm White LED Module'],
        ['Shade Geometry', 'Precision Vertical Fluted Cylinder'],
        ['Best Use', 'Monitor-side focus and nighttime reading'],
      ],
      releaseDate: '2026-09-01T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Soft Warm White', 'Chalk Matte', 'Stone Mist'],
      materialOptions: ['Diffusion PLA', 'Matte PETG'],
      stock: 14,
      adminStatus: 'active',
      reviews: [
        {
          quote: 'The fluted ribs throw the softest, warmest light across my desk. Zero eye strain during late night coding.',
          author: 'Vikram, Bengaluru',
        },
        ...defaultReviews,
      ],
    },
    {
      id: 2,
      slug: 'road-lamp-v1',
      name: 'Road Lamp V1',
      sku: 'BS-LMP-002',
      family: 'Desk Lamps',
      price: 1899,
      image: '/images/lamps/road-lamp-v1.png',
      gallery: [
        {
          label: 'Pendant / Desk Suspension',
          caption: 'Subtle micro-woven textured shade in an organic olive green tone casting ambient downlight.',
          className: 'bg-[linear-gradient(140deg,rgba(139,166,112,0.22),rgba(255,255,255,0.85))] texture-grid',
          image: '/images/lamps/road-lamp-v1.png',
        },
      ],
      label: 'Pendant / Desk Lamp',
      description: 'First edition in the Road Lamp series by 3D Paint Lab. Characterized by a minimalist curved silhouette with a fine woven surface texture that gently scatters light for an intimate, warm atmosphere.',
      color: 'from-[#d9e5cf] via-[#ecf3e6] to-[#ffffff]',
      materials: ['Matte Micro-Woven PLA', 'Braided Textile Cord', 'Standard Low-Heat Socket'],
      dimensions: '180 mm diameter × 130 mm shade height',
      care: 'LED bulbs only (max 8–10W). Wipe clean with a dry microfiber cloth.',
      goodFor: ['Over-desk pendant light', 'Reading nooks', 'Scandinavian & Japandi workstations'],
      story: 'Crafted as a single-piece support-free form, the woven micro-pattern creates organic shadow play and breaks the sterile look of standard industrial lamps.',
      comparison: [
        ['Texture', 'Fine micro-woven knit structure'],
        ['Fitting', 'Pendant cord / desk suspension mount'],
        ['Best Use', 'Above workstation or dining nook'],
      ],
      releaseDate: '2026-09-10T18:00:00+05:30',
      limitedDrop: true,
      colors: ['Olive Green', 'Warm Khaki', 'Nordic White'],
      materialOptions: ['Matte PLA', 'PETG'],
      stock: 8,
      adminStatus: 'active',
      reviews: [
        {
          quote: 'The woven texture looks like high-end fabric until you get close. Outstanding design and warm ambiance.',
          author: 'Kavya, Delhi',
        },
        ...defaultReviews,
      ],
    },
    {
      id: 3,
      slug: 'david-sliced-lamp',
      name: 'David Sliced Lamp',
      sku: 'BS-LMP-003',
      family: 'Desk Lamps',
      price: 2799,
      image: '/images/lamps/david-sliced-lamp.png',
      gallery: [
        {
          label: 'Deconstructed Strata',
          caption: '17 stacked horizontal strata with internal translucent diffuser casting warm horizontal light ribbons.',
          className: 'bg-[linear-gradient(140deg,rgba(255,160,80,0.22),rgba(255,255,255,0.85))] texture-lines',
          image: '/images/lamps/david-sliced-lamp.png',
        },
      ],
      label: 'Sculptural Statement Lamp',
      description: 'A striking architectural deconstruction of Michelangelo’s David bust into 17 precision horizontal sliced strata, allowing warm internal amber light to spill dramatically through every contour gap.',
      color: 'from-[#fae8d4] via-[#fdf4eb] to-[#ffffff]',
      materials: ['Architectural Matte Marble PLA', 'Translucent PETG Core Diffuser', 'Cast Black Base Plinth'],
      dimensions: '190 mm width × 175 mm depth × 240 mm height',
      care: 'E27 LED Bulb ONLY (Max 9W). Never use incandescent or halogen bulbs. Dust gently between slices with a soft brush.',
      goodFor: ['Statement desk centerpiece', 'Design studio ambient lighting', 'Collector shelves'],
      story: 'Designed by Collecticraft. Each layer is individually indexed with internal precision spacers. The light travels through an internal cylindrical translucent shader, casting architectural contours across the room.',
      comparison: [
        ['Construction', '17 horizontal interlocking slices with spacers'],
        ['Light Effect', 'Contour strata amber dispersion'],
        ['Weight & Stability', 'Heavy, stable desk presence'],
      ],
      releaseDate: '2026-08-25T18:00:00+05:30',
      limitedDrop: true,
      colors: ['Classical White', 'Marble Vein', 'Charcoal Noir'],
      materialOptions: ['Marble PLA + Translucent PETG'],
      stock: 5,
      adminStatus: 'active',
      reviews: [
        {
          quote: 'An absolute conversation starter. When lit up at night, the shadows are pure art.',
          author: 'Siddharth, Bengaluru',
        },
        ...defaultReviews,
      ],
    },
    {
      id: 4,
      slug: 'crystal-summit-desk-lamp',
      name: 'Crystal Summit Desk Lamp',
      sku: 'BS-LMP-004',
      family: 'Desk Lamps',
      price: 2199,
      image: '/images/lamps/crystal-summit-lamp.png',
      gallery: [
        {
          label: 'Alpine Glow',
          caption: 'Cinematic mountain ridge sculpture glowing with soft internal alpine lighting.',
          className: 'bg-[linear-gradient(140deg,rgba(180,210,240,0.22),rgba(255,255,255,0.85))] texture-soft',
          image: '/images/lamps/crystal-summit-lamp.png',
        },
      ],
      label: 'Topographic Light Sculpture',
      description: 'A cinematic mountain light sculpture designed by 3D Paint Lab. Jagged crystalline peaks catch and refract internal light like dawn hitting snowy alpine summits, anchored on a smooth stone plinth.',
      color: 'from-[#dbe7f2] via-[#eef4f8] to-[#ffffff]',
      materials: ['Crystalline Translucent PLA', 'Anti-Leak Base Plinth', '5V High-CRI LED Module'],
      dimensions: '200 mm diameter base × 185 mm summit height',
      care: 'Powered via 5V USB LED kit. Wipe exterior facets with a clean lens cloth.',
      goodFor: ['Late night deep work', 'Stream background aesthetics', 'Nature-inspired setups'],
      story: 'Detailed topographic ridges are calibrated at varying shell thicknesses to create natural mountain gradient lighting, glowing brightest at the valleys and tapering softly towards the crisp peaks.',
      comparison: [
        ['Aesthetic', 'Cinematic alpine mountain summit'],
        ['Light Diffusion', 'Topographic gradient back-glow'],
        ['Base', 'Circular dark plinth with zero light leak'],
      ],
      releaseDate: '2026-09-05T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Glacier White', 'Smoky Quartz', 'Midnight Ridge'],
      materialOptions: ['Crystalline PLA'],
      stock: 10,
      adminStatus: 'active',
      reviews: [
        {
          quote: 'Looks like a miniature frozen mountain range glowing on my sideboard. Mesmerizing glow.',
          author: 'Nikhil, Gurgaon',
        },
        ...defaultReviews,
      ],
    },
    {
      id: 5,
      slug: 'aura-lamp-collection',
      name: 'Aura Lamp Collection',
      sku: 'BS-LMP-005',
      family: 'Desk Lamps',
      price: 2499,
      image: '/images/lamps/aura-desk-lamp.png',
      gallery: [
        {
          label: 'Fluted Undulations',
          caption: 'Retro-futuristic optic glass-look silhouettes resting atop an architectural fluted column base.',
          className: 'bg-[linear-gradient(140deg,rgba(235,210,180,0.22),rgba(255,255,255,0.85))] texture-concrete',
          image: '/images/lamps/aura-desk-lamp.png',
        },
      ],
      label: 'Retro-Futuristic Desk Lamp',
      description: 'Designed by Amdy. A retro-futuristic desk lamp featuring an optical translucent fluted shade in rhythmic silhouettes resting upon an architecturally fluted bronze pedestal.',
      color: 'from-[#f1e3d3] via-[#f9f2ea] to-[#ffffff]',
      materials: ['Optical Spiral-Wound PETG Shade', 'Fluted Architecture Base (PLA)', 'Standard E27 Socket'],
      dimensions: '170 mm diameter × 225 mm assembled height',
      care: 'LED Bulb ONLY (E27 standard, max 8-10W warm filament). Do not expose to solvent cleaners.',
      goodFor: ['Mid-century modern & brutalist desks', 'Living room plinth display', 'Warm accent lighting'],
      story: 'Printed in specialized vase-mode PETG to achieve crystal-clear optical ribbing without seam artifacts. The base houses an E27 socket, providing standard bulb swap capability.',
      comparison: [
        ['Shade Style', '3 Undulating Silhouettes (Bulb, Fluted, Wave)'],
        ['Socket', 'Standard E27 screw mount'],
        ['Lighting', 'Warm filament glow with optical lens effect'],
      ],
      releaseDate: '2026-09-15T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Optical Clear / Bronze Base', 'Amber / Charcoal Base', 'Smoke / Raw Concrete'],
      materialOptions: ['Optical PETG + Fluted PLA'],
      stock: 9,
      adminStatus: 'active',
      reviews: [
        {
          quote: 'The optical clarity of the shade looks like Italian fluted glass. Stunning in person.',
          author: 'Meera, Mumbai',
        },
        ...defaultReviews,
      ],
    },
  ],
  'cementware': [
    {
      id: 6,
      slug: 'cement-incense-holder',
      name: 'Cement Incense Holder',
      sku: 'BS-CMT-001',
      family: 'Cementware',
      price: null,
      label: 'Incense Holder',
      description: 'A minimal raw-cement incense stick holder with a single groove channel and integrated ash catch basin. Grounding, heavy, and quietly present.',
      color: 'from-[#e8e3dc] via-[#f0ece7] to-[#ffffff]',
      materials: ['Hand-Cast Portland Cement', 'Fine Sand Aggregate'],
      dimensions: '120 mm × 40 mm × 25 mm',
      care: 'Wipe ash residue with a damp cloth. Avoid prolonged exposure to standing water.',
      goodFor: ['Desk rituals & focus sessions', 'Meditation nooks', 'Minimalist shelves'],
      story: 'Each holder is individually cast in silicone molds and cured over 48 hours, producing unique surface micro-textures.',
      comparison: [
        ['Material', 'Raw Portland Cement'],
        ['Weight', 'Intentionally heavy for stability'],
        ['Finish', 'Natural matte with micro-pore texture'],
      ],
      releaseDate: '2026-10-15T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Raw Grey', 'Charcoal', 'Desert Sand'],
      materialOptions: ['Portland Cement'],
      stock: 0,
      adminStatus: 'draft' as const,
      reviews: [],
    },
    {
      id: 7,
      slug: 'cement-candle-holder',
      name: 'Cement Candle Holder',
      sku: 'BS-CMT-002',
      family: 'Cementware',
      price: null,
      label: 'Candle Holder',
      description: 'A geometric brutalist candle holder with a deep cylindrical recess sized for standard tealights or tapered candles. Anchors candlelight with mass.',
      color: 'from-[#e8e3dc] via-[#f0ece7] to-[#ffffff]',
      materials: ['Hand-Cast Portland Cement', 'Heat-Resistant Core Insert'],
      dimensions: '80 mm diameter × 65 mm height',
      care: 'Remove wax residue with warm water. Heat safe up to 120°C.',
      goodFor: ['Evening desk ambiance', 'Dining table accents', 'Gift sets'],
      story: 'Designed to hold standard tealights flush with the rim, creating a perfectly recessed pool of warm light.',
      comparison: [
        ['Material', 'Cast Cement with heat liner'],
        ['Candle Fit', 'Standard tealight / tapered'],
        ['Finish', 'Smooth interior, raw exterior'],
      ],
      releaseDate: '2026-10-15T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Raw Grey', 'Ash White', 'Charcoal'],
      materialOptions: ['Portland Cement'],
      stock: 0,
      adminStatus: 'draft' as const,
      reviews: [],
    },
    {
      id: 8,
      slug: 'cement-catchall-tray',
      name: 'Cement Catchall Tray',
      sku: 'BS-CMT-003',
      family: 'Cementware',
      price: null,
      label: 'Catchall Tray',
      description: 'A shallow, organically curved desk catchall tray for keys, cards, earbuds, and small EDC. The raw cement surface prevents items from sliding.',
      color: 'from-[#e8e3dc] via-[#f0ece7] to-[#ffffff]',
      materials: ['Hand-Cast Portland Cement', 'Cork Base Pad'],
      dimensions: '160 mm × 110 mm × 20 mm',
      care: 'Wipe with a dry or damp cloth. Cork base protects desk surfaces.',
      goodFor: ['EDC dump zone', 'Entryway key drop', 'Desk organiser'],
      story: 'Designed with a gentle lip and organic asymmetry — every tray is uniquely shaped during the casting process.',
      comparison: [
        ['Material', 'Raw Cement + Cork Underside'],
        ['Capacity', 'Keys, cards, earbuds, coins'],
        ['Finish', 'Organic lip, raw surface texture'],
      ],
      releaseDate: '2026-10-20T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Raw Grey', 'Desert Sand', 'Slate'],
      materialOptions: ['Portland Cement'],
      stock: 0,
      adminStatus: 'draft' as const,
      reviews: [],
    },
    {
      id: 9,
      slug: 'cement-desk-plinth',
      name: 'Cement Desk Plinth',
      sku: 'BS-CMT-004',
      family: 'Cementware',
      price: null,
      label: 'Display Plinth',
      description: 'A solid, architectural display plinth for elevating small sculptures, lamps, or desk objects. A brutalist pedestal that grounds whatever rests on it.',
      color: 'from-[#e8e3dc] via-[#f0ece7] to-[#ffffff]',
      materials: ['High-Density Cast Cement', 'Felt Base Pad'],
      dimensions: '100 mm × 100 mm × 50 mm',
      care: 'Clean with dry cloth. Avoid dragging across surfaces — use the felt base.',
      goodFor: ['Display pedestal for lamps', 'Sculptural desk accent', 'Monitor riser base'],
      story: 'Precision-cast with squared edges and micro-chamfers. Heavy enough to anchor any object placed atop it.',
      comparison: [
        ['Material', 'High-Density Cement'],
        ['Weight', '~600g — intentionally heavy'],
        ['Finish', 'Squared edges, micro-chamfered'],
      ],
      releaseDate: '2026-10-25T18:00:00+05:30',
      limitedDrop: false,
      colors: ['Raw Grey', 'Charcoal', 'Warm Concrete'],
      materialOptions: ['High-Density Cement'],
      stock: 0,
      adminStatus: 'draft' as const,
      reviews: [],
    },
  ],
};

function makeProduct(product: Partial<Product>, category: CategoryDefinition): Product {
  return {
    ...(product as Product),
    categoryId: category.id,
    categoryName: category.name,
    categoryIdentity: category.identity,
    panelClass: category.panelClass,
    spotlightClass: category.spotlightClass,
    textureClass: category.textureClass,
    stock: product.stock ?? 10,
    sku: product.sku ?? `BS-LMP-${product.id}`,
    family: product.family ?? category.name,
    adminStatus: product.adminStatus ?? 'active',
  };
}

export const productCategories: CategoryDefinition[] = categoryDefinitions.map((category) => ({
  ...category,
  products: (rawProducts[category.id] || []).map((product) => makeProduct(product, category)),
}));

export function getCategoryById(id: string): CategoryDefinition | null {
  return productCategories.find((category) => category.id === id) ?? null;
}

export const fandomCollections: CategoryDefinition[] = [];

export const allProducts: Product[] = [
  ...productCategories.flatMap((category) => category.products || []),
];

export const allProductsById = Object.fromEntries(allProducts.map((product) => [product.id, product]));

export function getAllProducts(): Product[] {
  return allProducts;
}

export function getProductById(id: number): Product | null {
  return allProducts.find((product) => product.id === id) || null;
}

export function getProductBySlug(slug: string): Product | null {
  return allProducts.find((product) => product.slug === slug) || null;
}
