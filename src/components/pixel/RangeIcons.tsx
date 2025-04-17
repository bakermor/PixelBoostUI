export const FoodSizeSmall = () => {
  const pxl = window.innerWidth / 1920;
  return <div className="h-1/3 bg-gray-500" style={{ width: pxl * 75 }} />;
};

export const FoodSizeMedium = () => {
  const pxl = window.innerWidth / 1920;
  return <div className="h-2/3 bg-gray-500" style={{ width: pxl * 75 }} />;
};

export const FoodSizeLarge = () => {
  const pxl = window.innerWidth / 1920;
  return <div className="h-full bg-gray-500" style={{ width: pxl * 75 }} />;
};
