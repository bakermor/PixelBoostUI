import { useEffect } from "react";
import { InputBox } from "./pixel/InputBox";
import { STR } from "../constants/Strings";

interface InputProps {
  name: string;
  type: string;
  warning: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
}

export const Input = (props: InputProps) => {
  const pxl = window.innerWidth / 1920;

  useEffect(() => {}, [props]);

  return (
    <div className="flex flex-col" style={{ gap: pxl * 10 }}>
      <div
        className="w-full flex justify-between"
        style={{ height: pxl * 35, gap: pxl * 10 }}
      >
        <div className="h-full flex items-end">
          <div
            className="w-full flex items-end leading-none text-gray-800"
            style={{
              fontSize: pxl * 15.507,
              fontFamily: "'pxlSmall', monospace",
            }}
          >
            {STR.get(`in_${props.name}`)}
          </div>
        </div>
        {props.warning !== "" ? (
          <div className="h-full flex-1 flex">
            <div
              className="w-full flex items-end justify-end leading-none text-end text-gray-500"
              style={{
                fontSize: pxl * 15.507,
                fontFamily: "'pxlSmall', monospace",
              }}
            >
              {props.warning}
            </div>
          </div>
        ) : null}
      </div>
      <div className="w-full" style={{ height: pxl * 70 }}>
        <InputBox>
          <input
            className="flex-1 outline-none"
            name={props.name}
            type={props.type}
            placeholder={STR.get(`in_${props.name}_desc`)}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            style={{
              padding: 10 * pxl,
              fontSize: pxl * 15.507,
              fontFamily: "'pxlSmall', monospace",
            }}
          />
        </InputBox>
      </div>
    </div>
  );
};
