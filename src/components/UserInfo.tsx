import { useNavigate } from "react-router-dom";
import { User } from "../models/User";

interface Props {
  user: User;
  button?: {
    text: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    focused?: boolean;
  };
  variant?: "default" | "sidebar";
}

export const UserInfo = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className={`group flex justify-between items-center w-full h-14 p-2.5 gap-3 cursor-pointer ${
        props.variant === "sidebar"
          ? "bg-[#C957BC] hover:bg-[#FFC872] border-2 border-[#752092] hover:border-[#C957BC] text-[#FFFFFC] hover:text-[#752092]"
          : "bg-[#FFFFFC] hover:bg-[#F5F5F5] text-[#752092]"
      } transition-colors duration-300`}
      onClick={() => navigate(`/${props.user.username}`)}
    >
      <div className="flex gap-4">
        <div className="h-10 w-10 bg-[#FFFEE0] outline-2 outline-[#752092]" />
        <div className="flex flex-col gap-0.5 justify-center">
          <div className="sans leading-none whitespace-nowrap text-sm ">
            {props.user.name}
          </div>
          <div
            className={`kameron leading-none font-semibold whitespace-nowrap text-xs ${
              props.variant == "sidebar"
                ? "text-[#FBC0E5] group-hover:text-[#C957BC]"
                : "text-[#C957BC]"
            } transition-colors duration-300`}
          >
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
