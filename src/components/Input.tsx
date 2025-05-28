import { useEffect } from "react";
import { Strings } from "../constants/Strings";
import { pxl } from "../constants/ThemeConstants";
import { InputBox } from "./pixel/InputBox";

interface InputProps {
  name: string;
  type: string;
  warning?: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  colors: string[];
}

export const Input = (props: InputProps) => {
  useEffect(() => {}, [props]);

  return (
    <div className="flex flex-col w-full" style={{ gap: pxl * 5 }}>
      <div
        className="w-full flex justify-between"
        style={{ height: pxl * 35, gap: pxl * 10 }}
      >
        <div className="h-full flex items-end">
          <div
            className="w-full flex leading-none"
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
              color: props.colors[2],
            }}
          >
            {Strings[`in_${props.name}`]}
          </div>
        </div>
        {props.warning !== "" ? (
          <div className="h-full flex-1 flex items-end">
            <div
              className="w-full flex justify-end leading-none text-end"
              style={{
                height: pxl * 18,
                fontSize: pxl * 16,
                fontFamily: "'pxlSmall', monospace",
                color: props.colors[3] ?? props.colors[2],
              }}
            >
              {props.warning}
            </div>
          </div>
        ) : null}
      </div>
      <div className="w-full" style={{ height: pxl * 70 }}>
        <InputBox colors={props.colors}>
          <input
            className="flex-1 outline-none"
            name={props.name}
            type={props.type}
            placeholder={Strings[`in_${props.name}_desc`]}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            style={{
              padding: pxl * 10,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
              color: props.colors[2],
            }}
          />
        </InputBox>
      </div>
    </div>
  );
};
