import { Colors, pxl } from "../../constants/ThemeConstants";
import { AvatarSprite } from "./AvatarSprite";

export const AvatarContainer = () => {
  return (
    <div
      className="h-full w-full flex flex-col"
      style={{ backgroundColor: Colors.p2 }}
    >
      <div
        className="flex-1 flex justify-evenly items-end"
        style={{ paddingLeft: pxl * 30, paddingRight: pxl * 30 }}
      >
        <AvatarSprite />
      </div>
      <div
        className="w-full"
        style={{ height: pxl * 10, backgroundColor: Colors.p6 }}
      />
    </div>
  );
};
