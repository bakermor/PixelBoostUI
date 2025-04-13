import { useEffect } from "react";
import { STR } from "../constants/Strings";

interface InputBoxProps {
  name: string;
  type: string;
  warning: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement> | undefined;
}

export const InputBox = (props: InputBoxProps) => {
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
      <div
        className="w-full border-gray-500"
        style={{ height: pxl * 70, borderWidth: pxl * 5 }}
      >
        <input
          className="w-full h-full"
          name={props.name}
          type={props.type}
          required
          placeholder={STR.get(`in_${props.name}_desc`)}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          style={{
            padding: 10 * pxl,
            fontSize: pxl * 15.507,
            fontFamily: "'pxlSmall', monospace",
          }}
        ></input>
      </div>
    </div>
  );
};
