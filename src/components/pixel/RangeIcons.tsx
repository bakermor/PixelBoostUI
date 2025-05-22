import { pxl } from "../../constants/ThemeConstants";

export const FoodSizeSmall = () => {
  return <div className="h-1/3 bg-gray-500" style={{ width: pxl * 75 }} />;
};

export const FoodSizeMedium = () => {
  return <div className="h-2/3 bg-gray-500" style={{ width: pxl * 75 }} />;
};

export const FoodSizeLarge = () => {
  return <div className="h-full bg-gray-500" style={{ width: pxl * 75 }} />;
};
