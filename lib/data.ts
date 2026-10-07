export interface NavLink {
  label: string;
  href: string;
  key: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/", key: "home" },
  { label: "Pets", href: "#pets", key: "pets" },
  { label: "Shop", href: "#shop", key: "shop" },
  { label: "About", href: "#about", key: "about" },
];

export const BRAND = {
  name: "Pet Pals",
  tagline: "Care, play, and love your virtual pets!",
  emoji: "🐾",
} as const;

export type ShopItem = {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  type: "food" | "toy";
  kind: "food" | "toy";
  hungerBoost: number;
  happinessBoost: number;
  description: string;
};

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "kibble",
    name: "Yummy Kibble",
    emoji: "🥩",
    cost: 5,
    type: "food",
    kind: "food",
    hungerBoost: 25,
    happinessBoost: 5,
    description: "A hearty meal for your hungry pet.",
  },
  {
    id: "treat",
    name: "Sweet Treat",
    emoji: "🍬",
    cost: 8,
    type: "food",
    kind: "food",
    hungerBoost: 15,
    happinessBoost: 15,
    description: "A sweet snack that boosts happiness.",
  },
  {
    id: "ball",
    name: "Bouncy Ball",
    emoji: "🎾",
    cost: 10,
    type: "toy",
    kind: "toy",
    hungerBoost: 0,
    happinessBoost: 30,
    description: "A fun ball to play fetch with.",
  },
  {
    id: "plushie",
    name: "Soft Plushie",
    emoji: "🧸",
    cost: 12,
    type: "toy",
    kind: "toy",
    hungerBoost: 0,
    happinessBoost: 35,
    description: "A cuddly plushie your pet will adore.",
  },
];

export type Pet = {
  id: string;
  name: string;
  emoji: string;
  species: string;
  color: string;
};

export const INITIAL_PETS: Pet[] = [
  {
    id: "bunny",
    name: "Biscuit",
    emoji: "🐰",
    species: "Bunny",
    color: "#FFD700",
  },
  {
    id: "cat",
    name: "Mochi",
    emoji: "🐱",
    species: "Cat",
    color: "#FF6B6B",
  },
  {
    id: "dog",
    name: "Peanut",
    emoji: "🐶",
    species: "Dog",
    color: "#6BCB77",
  },
  {
    id: "hamster",
    name: "Nugget",
    emoji: "🐹",
    species: "Hamster",
    color: "#4D96FF",
  },
];
