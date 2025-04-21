import avatar from "../assets/avatar.png";

export const AvatarSprite = () => {
  const pxl = window.innerWidth / 1920;
  return (
    <div
      className="bg-gray-400"
      style={{ width: pxl * 110, height: pxl * 140 }}
    >
      <img
        src={avatar}
        width={pxl * 108}
        height={pxl * 138}
        style={{ imageRendering: "pixelated", visibility: "hidden" }}
      />
    </div>
  );
};
