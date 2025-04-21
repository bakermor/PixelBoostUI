import {
  FoodSizeLarge,
  FoodSizeMedium,
  FoodSizeSmall,
} from "../components/pixel/RangeIcons";

export const ActionComponents: Record<
  string,
  { name: string; type: string; multiple?: boolean; types?: string[] }[]
> = {
  eat_food: [
    { name: "food_quantity", type: "range" },
    { name: "food_quality", type: "select", multiple: true },
  ],
  drink: [
    { name: "drink_type", type: "select" },
    { name: "drink_quantity", type: "input", types: ["input", "range"] },
  ],
  get_clean: [{ name: "clean", type: "select" }],
  do_fun: [
    { name: "fun_quality", type: "range" },
    { name: "fun_length", type: "input" },
  ],
  coffee: [{ name: "coffee_quantity", type: "input" }],
  sleep: [
    { name: "sleep_length", type: "input" },
    { name: "sleep_quality", type: "range" },
  ],
  hangout: [
    { name: "social_hangout", type: "input" },
    { name: "social_quality", type: "range" },
  ],
};

export const ActionComponentStat: Record<string, string> = {
  eat_food: "hunger",
  drink: "thirst",
  get_clean: "hygiene",
  do_fun: "fun",
  coffee: "energy",
  sleep: "energy",
  hangout: "social",
};

export const PickActions: Record<string, string[]> = {
  energy: ["coffee", "sleep"],
  social: ["call", "hangout"],
};

export const ActionRanges: Record<string, Record<string, React.FC>> = {
  food_quantity: {
    small: FoodSizeSmall,
    medium: FoodSizeMedium,
    large: FoodSizeLarge,
  },
  drink_quantity_range: {
    small: FoodSizeSmall,
    medium: FoodSizeMedium,
    large: FoodSizeLarge,
  },
  fun_quality: {
    small: FoodSizeSmall,
    medium: FoodSizeMedium,
    large: FoodSizeLarge,
  },
  sleep_quality: {
    small: FoodSizeSmall,
    medium: FoodSizeMedium,
    large: FoodSizeLarge,
  },
  social_quality: {
    small: FoodSizeSmall,
    medium: FoodSizeMedium,
    large: FoodSizeLarge,
  },
};

export const RangeValues: Record<string, Record<string, number>> = {
  food_quantity: {
    small: 2 * 60 * 60,
    small_medium: 3.5 * 60 * 60,
    medium: 4.5 * 60 * 60,
    medium_large: 6.5 * 60 * 60,
    large: 9 * 60 * 60,
  },
  drink_quantity_range: {
    small: 1.35 * 60 * 60,
    small_medium: 2 * 60 * 60,
    medium: 2.85 * 60 * 60,
    medium_large: 4 * 60 * 60,
    large: 5.65 * 60 * 60,
  },
  fun_quality: {
    small: 1,
    small_medium: 1.75,
    medium: 2.5,
    medium_large: 3.25,
    large: 4,
  },
  sleep_quality: {
    small: 0.75,
    small_medium: 0.85,
    medium: 1,
    medium_large: 1.25,
    large: 1.5,
  },
  social_quality: {
    small: 1,
    small_medium: 1.5,
    medium: 2,
    medium_large: 3.5,
    large: 4.5,
  },
};

export const ActionSelect: Record<string, string[]> = {
  food_quality: ["fruits", "vegetables", "starch", "protein"],
  drink_type: ["water", "milk", "tea", "juice", "soda"],
  clean: ["shower", "wash_hands", "wash_face", "brush_teeth"],
};

export const SelectValues: Record<string, Record<string, number>> = {
  food_quality: {
    fruits: 0.25,
    vegetables: 0.35,
    starch: 0.25,
    protein: 0.5,
  },
  drink_type: {
    water: 1,
    tea: 0.95,
    milk: 0.9,
    juice: 0.8,
    soda: 0.5,
  },
  clean: {
    shower: 16 * 60 * 60,
    wash_hands: 1.5 * 60 * 60,
    wash_face: 5 * 60 * 60,
    brush_teeth: 3 * 60 * 60,
  },
};

// TODO: add pixel art icon components
export const SelectIcons: Record<string, string> = {
  grain: "",
  fruits: "",
  vegetables: "",
  protein: "",
  dairy: "",
};

export const ActionInput: Record<string, string[]> = {
  drink_quantity_input: ["oz"],
  fun_length: ["hours", "minutes"],
  coffee_quantity: ["mg"],
  sleep_length: ["hours", "minutes"],
  social_hangout: ["hours", "minutes"],
};

export const InputValues: Record<string, Record<string, number>> = {
  drink_quantity_input: { oz: 10 * 60 },
  fun_length: { hours: 60 * 60, minutes: 60 },
  coffee_quantity: { mg: 54 },
  sleep_length: { hours: 60 * 60, minutes: 60 },
  social_hangout: { hours: 60 * 60, minutes: 60 },
};
