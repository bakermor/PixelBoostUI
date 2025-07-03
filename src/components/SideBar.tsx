import { useNavigate } from "react-router-dom";
import { Strings } from "../constants/Strings";
import { Colors, pxl } from "../constants/ThemeConstants";
import { DefaultButton } from "./Buttons";

export const SideBar = () => {
  const navigate = useNavigate();

  const clickButton = (path: string) => {
    navigate(path);
  };

  return (
    <div
      className="h-full flex flex-col items-center"
      style={{
        width: pxl * 350,
        paddingLeft: pxl * 10,
        paddingRight: pxl * 10,
        gap: pxl * 20,
        backgroundColor: Colors.p4,
      }}
    >
      <div
        style={{
          width: pxl * 200,
          height: pxl * 180,
          marginTop: pxl * 50,
          marginBottom: pxl * 10,
          backgroundColor: Colors.p1,
        }}
      />
      <div className="w-full flex flex-col gap-1">
        <DefaultButton
          text={Strings.settings}
          onClick={() => clickButton("/settings")}
          colors={[Colors.p6, Colors.p5, Colors.p1]}
        />
        <DefaultButton
          text={Strings.find_users}
          onClick={() => clickButton("/search")}
          colors={[Colors.p6, Colors.p5, Colors.p1]}
        />
      </div>
      {/* <div className="h-3/5 flex flex-col" style={{ gap: pxl * 10 }}>
        <div
          className="border-gray-600"
          style={{
            paddingLeft: pxl * 5,
            paddingRight: pxl * 5,
            borderTopWidth: pxl * 5,
            paddingTop: pxl * 15,
          }}
        >
          <div
            className="flex leading-none bg-gray-600 text-gray-600"
            style={{
              height: pxl * 52,
              fontSize: pxl * 48,
              fontFamily: "'pxlLarge', monospace",
            }}
          ></div>
        </div>
        <div
          className="flex-1 flex flex-col bg-gray-600"
          style={{ gap: pxl * 5 }}
        >
          <div className="flex bg-gray-500" style={{ height: pxl * 65 }} />
          <div className="flex bg-gray-500" style={{ height: pxl * 65 }} />
          <div className="flex bg-gray-500" style={{ height: pxl * 65 }} />
        </div>
      </div> */}
    </div>
  );
};

interface Props {
  focused?: string;
}

export const NewSideBar = (props: Props) => {
  const navigate = useNavigate();

  const buttons = ["dashboard", "settings", "search"];

  const clickButton = (path: string) => {
    navigate(path);
  };

  return (
    <div className="h-full flex flex-col gap-3 items-center w-72 bg-linear-to-t from-[#FFC872] to-[#FFF0A6] to-50% outline-3 outline-[#C957BC] pt-48">
      <div className="w-full flex flex-col">
        {buttons.map((item, index) => (
          <Button
            key={index}
            text={Strings[item]}
            onClick={() => clickButton(`/${item}`)}
            focused={item === props.focused}
          />
        ))}
      </div>
      <div className="w-68 h-4 bg-[#FFC872]" />
    </div>
  );
};

interface ButtonProps {
  text: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  focused?: boolean;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`sans text-start px-4 w-full h-11 cursor-pointer ${
        props.focused ? "bg-[#FFD785]" : "bg-[#FFF0A6]"
      } hover:bg-[#FFC872] outline-2 outline-[#FFC872] text-[#752092] transition-colors duration-300`}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
