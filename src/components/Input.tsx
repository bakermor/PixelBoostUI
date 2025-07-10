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

interface Props {
  name: string;
  type: string;
  warning?: string;
  value: any;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  variant?: "default";
}

export const NewInput = (props: Props) => {
  return (
    <div className="flex flex-col w-full gap-1">
      <div className="w-full flex justify-between gap-2 text-md">
        <div className="sans flex items-end leading-none text-[#752092]">
          {Strings[`in_${props.name}`]}
        </div>
        {props.warning !== "" ? (
          <div className="sans h-full flex-1 flex justify-end leading-none text-[#C957BC]">
            {props.warning}
          </div>
        ) : null}
      </div>
      <div className="w-full flex p-1.5 rounded-lg border-3 border-[#C957BC] hover:border-[#752092] focus-within:!border-[#752092] transition-colors duration-300">
        <input
          className="sans flex-1 outline-none p-1.5 placeholder-[#C957BC] text-[#752092]"
          name={props.name}
          type={props.type}
          placeholder={Strings[`in_${props.name}_desc`]}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </div>
    </div>
  );
};
