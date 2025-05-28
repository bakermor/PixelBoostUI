import { ReactNode } from "react";
import { pxl } from "../../constants/ThemeConstants";

interface InputBoxProps {
  children: ReactNode;
  colors: string[];
}

export const InputBox = (props: InputBoxProps) => {
  return (
    <div className="flex-1 flex flex-col">
      <div
        className="w-full flex"
        style={{
          height: pxl * 5,
        }}
      >
        <div className="flex-1" style={{ backgroundColor: props.colors[0] }} />
      </div>
      <div className="flex-1 flex">
        <div style={{ backgroundColor: props.colors[0], width: pxl * 5 }} />
        <div
          className="flex-1 flex"
          style={{ backgroundColor: props.colors[1], padding: pxl * 5 }}
        >
          {props.children}
        </div>
        <div style={{ backgroundColor: props.colors[0], width: pxl * 5 }} />
      </div>
      <div
        className="w-full flex"
        style={{
          height: pxl * 5,
        }}
      >
        <div className="flex-1" style={{ backgroundColor: props.colors[0] }} />
      </div>
    </div>
  );
};
