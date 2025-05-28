import { Colors, pxl } from "../../constants/ThemeConstants";

export const FoodSizeSmall = () => {
  return (
    <div
      className="h-1/3"
      style={{ width: pxl * 75, backgroundColor: Colors.p1 }}
    />
  );
};

export const FoodSizeMedium = () => {
  return (
    <div
      className="h-2/3"
      style={{ width: pxl * 75, backgroundColor: Colors.p1 }}
    />
  );
};

export const FoodSizeLarge = () => {
  return (
    <div
      className="h-full"
      style={{ width: pxl * 75, backgroundColor: Colors.p1 }}
    />
  );
};
