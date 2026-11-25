export type LicensingWork = {
  id: string;
  title: string;
  detail: string;
  alt: string;
  width: number;
  height: number;
  referencePage: number;
};

export type LicensingSeries = {
  id: string;
  title: string;
  credit: string;
  description?: string;
  works: LicensingWork[];
};

export const selection: LicensingSeries[] = [
  {
    id: "eight",
    title: "8",
    credit: "Bård Ionson",
    description: "Stills from the code-based generative series.",
    works: [
      {
        id: "eight-purple",
        title: "8",
        detail: "Generative art · eye composition",
        alt: "Purple eyes and pale forms spiral around a blue center against fine intersecting lines.",
        width: 1200,
        height: 1200,
        referencePage: 7,
      },
      {
        id: "eight-25",
        title: "8 #25",
        detail: "8 · generative art",
        alt: "A yellow ring surrounds a black center, within a blue and red circular composition on black.",
        width: 1200,
        height: 1200,
        referencePage: 8,
      },
    ],
  },
  {
    id: "balloons",
    title: "Balloons In The Sky",
    credit: "Bård Ionson and Jennifer Ionson",
    works: [
      {
        id: "balloons-landscape",
        title: "Balloons In The Sky",
        detail: "Landscape still",
        alt: "A broad multicolored hot-air balloon fills the sky in a landscape composition.",
        width: 960,
        height: 480,
        referencePage: 1,
      },
      {
        id: "fractured-future",
        title: "Fractured Future",
        detail: "Balloons In The Sky",
        alt: "Layered blue, green and yellow hot-air balloons against a vivid blue sky.",
        width: 675,
        height: 1200,
        referencePage: 2,
      },
      {
        id: "walled-city-of-gold",
        title: "Walled City Of Gold",
        detail: "Balloons In The Sky",
        alt: "A single red, gold and blue hot-air balloon suspended in a pale blue sky.",
        width: 675,
        height: 1200,
        referencePage: 3,
      },
      {
        id: "riffle-fading-into-black",
        title: "Riffle Fading Into Black",
        detail: "Balloons In The Sky",
        alt: "Multicolored balloon forms rise through a blue sky in a vertical composition.",
        width: 675,
        height: 1200,
        referencePage: 4,
      },
    ],
  },
  {
    id: "color-magic-planets",
    title: "Color Magic Planets",
    credit: "Bård Ionson; based on artwork by Liza Grace",
    works: [
      {
        id: "color-magic-planets",
        title: "Color Magic Planets",
        detail: "Generative still",
        alt: "A grid of brightly colored circles and geometric shapes on a pale square ground.",
        width: 1200,
        height: 1200,
        referencePage: 5,
      },
      {
        id: "color-magic-planets-94",
        title: "Color Magic Planets #94",
        detail: "Color Magic Planets",
        alt: "Sixteen neon-colored circular compositions arranged in a square grid.",
        width: 1200,
        height: 1200,
        referencePage: 6,
      },
    ],
  },
  {
    id: "smoke-and-shape",
    title: "Smoke And Shape",
    credit: "Bård Ionson",
    works: [
      {
        id: "smoke-and-shape-5501",
        title: "Smoke And Shape (5501)",
        detail: "Animation still",
        alt: "A glowing magenta triangular form with cyan outlines floats against black.",
        width: 1024,
        height: 1024,
        referencePage: 9,
      },
      {
        id: "smoke-and-shape-9612",
        title: "Smoke And Shape (9612)",
        detail: "Animation still",
        alt: "A soft blue triangular form and green rings glow against black.",
        width: 1024,
        height: 1024,
        referencePage: 10,
      },
    ],
  },
  {
    id: "fountain",
    title: "Fountain",
    credit: "Bård Ionson",
    description: "Digital artworks from the Fountain series.",
    works: [
      {
        id: "fountain-405",
        title: "Fountain #405",
        detail: "Digital artwork",
        alt: "A pink toilet-like form emerges from a dark tiled setting.",
        width: 1200,
        height: 1200,
        referencePage: 11,
      },
      {
        id: "fountain-136",
        title: "Fountain #136",
        detail: "Digital artwork",
        alt: "A yellow toilet-like form sits within a warped tiled interior.",
        width: 1200,
        height: 1200,
        referencePage: 12,
      },
    ],
  },
  {
    id: "fire",
    title: "Fire",
    credit: "Bård Ionson",
    works: [
      {
        id: "fuego-cerro-pedernal",
        title: "Fuego Cerro Pedernal",
        detail: "Fire",
        alt: "Warm rose and ochre flowing forms against a softly textured pale background.",
        width: 1200,
        height: 675,
        referencePage: 13,
      },
    ],
  },
  {
    id: "bones",
    title: "Bones In The Sky",
    credit: "Bård Ionson",
    works: [
      {
        id: "floating-network",
        title: "Floating Network",
        detail: "Bones In The Sky Marfa No. 183",
        alt: "Dark bone-like forms and fragments of an American flag against a clouded sky.",
        width: 1024,
        height: 1024,
        referencePage: 14,
      },
    ],
  },
];
