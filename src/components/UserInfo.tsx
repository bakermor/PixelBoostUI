import { User } from "../models/User";

interface Props {
  user: User;
  navigate: () => void;
  button?: {
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    focused?: boolean;
  };
}

export const UserInfo = (props: Props) => {
  return (
    <div
      className="flex justify-between items-center w-full h-14 gap-3 bg-[#FFFFFC] hover:bg-[#F5F5F5] cursor-pointer p-3 transition-colors duration-300"
      onClick={props.navigate}
    >
      <div className="flex gap-4">
        <div className="h-8 w-8 bg-[#FFFEE0] outline-2 outline-[#752092]" />
        <div className="flex flex-col gap-0.5 justify-center">
          <div className="sans leading-none whitespace-nowrap text-sm text-[#752092]">
            {props.user.name}
          </div>
          <div className="kameron leading-none font-semibold whitespace-nowrap text-xs text-[#C957BC]">
            @{props.user.username}
          </div>
        </div>
      </div>
      {props.button ? <SmallButton {...props.button} /> : null}
    </div>
  );
};

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  focused?: boolean;
}

const SmallButton = (props: ButtonProps) => {
  return (
    <button
      className={`group flex justify-center items-center w-32 h-8 rounded-sm cursor-pointer ${
        props.focused
          ? "bg-[#C957BC] text-[#FFFFFC] hover:bg-[#752092]"
          : "bg-[#FBC0E5] text-[#752092] hover:bg-[#C957BC]"
      }  hover:text-[#FFFFFC] transition-colors duration-300`}
      onClick={props.onClick}
    >
      <div className="sans leading-none text-sm">{props.text}</div>
    </button>
  );
};
