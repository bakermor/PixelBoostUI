import {
  FoodSizeLarge,
  FoodSizeMedium,
  FoodSizeSmall,
} from "../components/pixel/RangeIcons";

export const ActionRanges: Record<string, React.FC> = {
  food_quantity_small: FoodSizeSmall,
  food_quantity_medium: FoodSizeMedium,
  food_quantity_large: FoodSizeLarge,
};

export const ActionSelect: Record<string, string[]> = {
  food_quality: ["fruits", "vegetables", "grain", "protein", "dairy"],
};

// TODO: add pixel art icon components
export const SelectIcons: Record<string, string> = {
  grain: "",
  fruits: "",
  vegetables: "",
  protein: "",
  dairy: "",
};
