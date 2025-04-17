export const AvatarSprite = () => {
  const pxl = window.innerWidth / 1920;
  return (
    <div
      className="bg-gray-400"
      style={{ width: pxl * 110, height: pxl * 140 }}
    />
  );
};
