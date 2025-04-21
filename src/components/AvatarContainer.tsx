import { AvatarSprite } from "./AvatarSprite";

export const AvatarContainer = () => {
  const pxl = window.innerWidth / 1920;

  return (
    <div className="h-full w-full flex flex-col bg-gray-200">
      <div
        className="flex-1 flex justify-evenly items-end"
        style={{ paddingLeft: pxl * 30, paddingRight: pxl * 30 }}
      >
        <AvatarSprite />
      </div>
      <div className="w-full bg-gray-500" style={{ height: pxl * 10 }} />
    </div>
  );
};
