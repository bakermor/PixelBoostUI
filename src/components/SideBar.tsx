import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Strings } from "../constants/Strings";
import { User } from "../models/User";
import { UserInfo } from "./UserInfo";
import { DefaultButton } from "./Buttons";

interface Props {
  focused?: string;
  focused_sec?: string;
  variant?: string;

  friends?: User[];
}

export const SideBar = (props: Props) => {
  const navigate = useNavigate();

  const buttons =
    props.variant === "dashboard"
      ? ["settings", "search"]
      : ["dashboard", "settings", "search"];

  const subsections: Record<string, string[]> = {
    settings: ["profile", "stat"],
  };

  const clickButton = (path: string) => {
    navigate(path);
  };

  return (
    <div className="h-full flex flex-col gap-3 items-center w-72 min-w-72 pt-6 bg-linear-to-t from-[#FFC872] to-[#FFF0A6] to-50% outline-3 outline-[#C957BC]">
      <img
        src={logo}
        className={`object-contain p-20 ${
          props.variant === "dashboard" ? "py-7" : "py-4"
        }`}
      />
      <div className="w-full flex flex-col">
        {buttons.map((item, index) =>
          props.focused === item && subsections[item] ? (
            <div className="flex flex-col">
              <DefaultButton
                key={index}
                text={Strings[item]}
                onClick={() => clickButton(`/${item}`)}
                variant={
                  item === props.focused && !props.focused_sec
                    ? "nav_focus"
                    : "nav"
                }
                align="left"
              />
              {subsections[item].map((subitem, subindex) => (
                <DefaultButton
                  key={`${index}_${subindex}`}
                  text={Strings[subitem]}
                  onClick={() => clickButton(`/${item}/${subitem}`)}
                  variant={
                    subitem === props.focused_sec ? "nav_focus" : "nav_sec"
                  }
                  align="left_indent"
                />
              ))}
            </div>
          ) : (
            <DefaultButton
              key={index}
              text={Strings[item]}
              onClick={() => clickButton(`/${item}`)}
              variant={item === props.focused ? "nav_focus" : "nav"}
              align="left"
            />
          )
        )}
      </div>
      <div className="w-68 h-4 bg-[#FFC872]" />
      {props.friends ? (
        <div className="flex flex-col w-full gap-2 items-center overflow-hidden">
          <div className="kameron flex w-full pt-2 justify-center text-2xl text-[#752092]">
            {Strings.friends}
          </div>
          <div className="flex-1 flex flex-col w-full p-1 gap-1 overflow-y-auto scroll-py-2 scrollbar-hide">
            {props.friends.map((u, index) => (
              <UserInfo key={index} user={u} variant="sidebar" />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};
