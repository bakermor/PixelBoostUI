import avatar from "../../assets/avatar.png";

export const AvatarSprite = () => {
  return (
    <div>
      <img src={avatar} width={110} style={{ imageRendering: "pixelated" }} />
    </div>
  );
};
