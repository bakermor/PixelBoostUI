import { AvatarSprite } from "./AvatarSprite";

export const AvatarContainer = () => {
  return (
    <div className="h-40 w-full flex flex-col rounded-lg bg-[#FFFEE0] outline-3 outline-[#C957BC]">
      <div className="flex-1 flex justify-evenly items-end px-8">
        <AvatarSprite />
      </div>
      <div className="w-full h-2 bg-[#FFC872]" />
    </div>
  );
};
