import { ActionRanges, RangeValues } from "../../constants/ActionConstants";
import { Strings } from "../../constants/Strings";
import { Colors, pxl } from "../../constants/ThemeConstants";

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
  const IconComponent = ActionRanges[props.action]
    ? ActionRanges[props.action][props.name]
    : null;

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ width: 130, gap: pxl * 8 }}
    >
      <button
        className="clickable flex items-end justify-center cursor-pointer"
        style={
          {
            width: `${pxl * 105}px`,
            height: `${pxl * 105}px`,
            padding: `${pxl * 10}px`,
            "--main-color": props.focused ? Colors.p5 : Colors.p3,
            "--hover-color": Colors.p5,
          } as React.CSSProperties & Record<string, string>
        }
        name={props.name}
        onClick={props.onClick}
        value={
          RangeValues[props.action] ? RangeValues[props.action][props.name] : 0
        }
      >
        {IconComponent ? <IconComponent /> : null}
      </button>
      <div
        className="flex justify-start leading-none"
        style={{
          height: pxl * 18,
          fontSize: pxl * 16,
          fontFamily: "'pxlSmall', monospace",
          color: Colors.p1,
        }}
      >
        {Strings[`${props.action}_${props.name}`]}
      </div>
    </div>
  );
};

export const MidRangeContainer = (props: RangeContainerProps) => {
  return (
    <button
      className="clickable cursor-pointer"
      style={
        {
          width: `${pxl * 75}px`,
          height: `${pxl * 75}px`,
          marginTop: `${pxl * 20}px`,
          "--main-color": props.focused ? Colors.p5 : Colors.p4,
          "--hover-color": Colors.p5,
        } as React.CSSProperties & Record<string, string>
      }
      name={props.name}
      onClick={props.onClick}
      value={
        RangeValues[props.action] ? RangeValues[props.action][props.name] : 0
      }
    />
  );
};

export const SelectContainer = (props: SelectContainerProps) => {
  return (
    <button
      className="clickable flex-1 flex flex-col items-center justify-end cursor-pointer"
      style={
        {
          maxWidth: `${pxl * 140}px`,
          padding: `${pxl * 8}px`,
          gap: `${pxl * 5}px`,
          "--main-color": props.focused ? Colors.p5 : Colors.p3,
          "--hover-color": Colors.p5,
        } as React.CSSProperties & Record<string, string>
      }
      name={props.name}
      value={props.value}
      onClick={props.onClick}
    >
      <div
        className="flex leading-none"
        style={{
          height: pxl * 18,
          fontSize: pxl * 16,
          fontFamily: "'pxlSmall', monospace",
          color: Colors.a6,
        }}
      >
        {Strings[props.name]}
      </div>
      <div
        className="flex-1"
        style={{ width: pxl * 95, backgroundColor: Colors.p1 }}
      />
    </button>
  );
};

export const InputContainer = (props: InputContainerProps) => {
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
          color: Colors.p1,
        }}
      >
        {Strings[props.name]}
      </div>
      <div
        className="flex-1 flex"
        style={{ maxHeight: pxl * 60, backgroundColor: Colors.p3 }}
      >
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
            color: Colors.a6,
          }}
        />
      </div>
    </div>
  );
};
