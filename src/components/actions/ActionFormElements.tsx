import { ActionRanges, RangeValues } from "../../constants/ActionConstants";
import { Strings } from "../../constants/Strings";

interface RangeContainerProps {
  action: string;
  name: string;
  focused: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface SelectContainerProps {
  name: string;
  value: number;
  focused: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface InputContainerProps {
  name: string;
  value: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const RangeContainer = (props: RangeContainerProps) => {
  const pxl = window.innerWidth / 1920;
  const IconComponent = ActionRanges[props.action]
    ? ActionRanges[props.action][props.name]
    : null;

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ width: 130, gap: pxl * 8 }}
    >
      <button
        className={`${
          props.focused ? "bg-gray-400" : "bg-gray-200"
        } flex items-end justify-center cursor-pointer`}
        style={{ width: pxl * 105, height: pxl * 105, padding: pxl * 10 }}
        name={props.name}
        onClick={props.onClick}
        value={
          RangeValues[props.action] ? RangeValues[props.action][props.name] : 0
        }
      >
        {IconComponent ? <IconComponent /> : null}
      </button>
      <div
        className="flex justify-start leading-none text-gray-400"
        style={{
          height: pxl * 18,
          fontSize: pxl * 16,
          fontFamily: "'pxlSmall', monospace",
        }}
      >
        {Strings[`${props.action}_${props.name}`]}
      </div>
    </div>
  );
};

export const MidRangeContainer = (props: RangeContainerProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <button
      className={`${
        props.focused ? "bg-gray-400" : "bg-gray-300"
      } cursor-pointer`}
      style={{ width: pxl * 75, height: pxl * 75, marginTop: pxl * 20 }}
      name={props.name}
      onClick={props.onClick}
      value={
        RangeValues[props.action] ? RangeValues[props.action][props.name] : 0
      }
    />
  );
};

export const SelectContainer = (props: SelectContainerProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <button
      className={`flex-1 flex flex-col items-center justify-end cursor-pointer ${
        props.focused ? "bg-gray-400" : "bg-gray-200"
      }`}
      style={{ maxWidth: pxl * 140, padding: pxl * 8, gap: pxl * 5 }}
      name={props.name}
      value={props.value}
      onClick={props.onClick}
    >
      <div
        className="flex leading-none text-gray-500"
        style={{
          height: pxl * 18,
          fontSize: pxl * 16,
          fontFamily: "'pxlSmall', monospace",
        }}
      >
        {Strings[props.name]}
      </div>
      <div className="flex-1 bg-gray-500" style={{ width: pxl * 95 }} />
    </button>
  );
};

export const InputContainer = (props: InputContainerProps) => {
  const pxl = window.innerWidth / 1920;
  return (
    <div
      className="flex-1 flex flex-col justify-center"
      style={{ maxWidth: pxl * 280, gap: pxl * 10 }}
    >
      <div
        className="flex justify-start leading-none text-gray-300"
        style={{
          height: pxl * 18,
          fontSize: pxl * 16,
          fontFamily: "'pxlSmall', monospace",
        }}
      >
        {Strings[props.name]}
      </div>
      <div className="flex-1 flex bg-gray-200" style={{ maxHeight: pxl * 60 }}>
        <input
          className="flex-1 outline-none"
          name={props.name}
          type="text"
          placeholder={Strings.input_placeholder}
          value={props.value}
          onChange={props.onChange}
          style={{
            padding: pxl * 10,
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
          }}
        />
      </div>
    </div>
  );
};
