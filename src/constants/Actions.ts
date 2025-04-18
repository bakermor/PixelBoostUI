import {
  FoodSizeLarge,
  FoodSizeMedium,
  FoodSizeSmall,
} from "../components/pixel/RangeIcons";

export const PickActions: Record<string, string[]> = {
  energy: ["coffee", "sleep"],
  social: ["call", "hangout"],
};

export const ActionRanges: Record<string, React.FC> = {
  food_quantity_small: FoodSizeSmall,
  food_quantity_medium: FoodSizeMedium,
  food_quantity_large: FoodSizeLarge,
  drink_quantity_range_small: FoodSizeSmall,
  drink_quantity_range_medium: FoodSizeMedium,
  drink_quantity_range_large: FoodSizeLarge,
  fun_quality_small: FoodSizeSmall,
  fun_quality_medium: FoodSizeMedium,
  fun_quality_large: FoodSizeLarge,
  sleep_quality_small: FoodSizeSmall,
  sleep_quality_medium: FoodSizeMedium,
  sleep_quality_large: FoodSizeLarge,
  social_quality_small: FoodSizeSmall,
  social_quality_medium: FoodSizeMedium,
  social_quality_large: FoodSizeLarge,
};

export const ActionSelect: Record<string, string[]> = {
  food_quality: ["fruits", "vegetables", "grain", "protein", "dairy"],
  drink_type: ["water", "milk", "tea", "juice", "soda"],
  clean: ["shower", "wash_hands", "wash_face", "brush_teeth"],
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
  drink_quantity_in: ["oz"],
  fun_length: ["hours", "minutes"],
  coffee_quantity: ["mg"],
  sleep_length: ["hours", "minutes"],
  social_hangout: ["hours", "minutes"],
};
