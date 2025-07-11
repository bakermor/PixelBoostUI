import { ActionRanges, RangeValues } from "../../constants/ActionConstants";
import { Strings } from "../../constants/Strings";
import { NewInput } from "../Input";

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
    <div className="gap-2 flex flex-col items-center justify-center">
      <button
        className="group flex items-end w-30 h-30 p-3 justify-center cursor-pointer bg-[#752092]"
        name={props.name}
        onClick={props.onClick}
        value={
          RangeValues[props.action] ? RangeValues[props.action][props.name] : 0
        }
      >
        <div
          className={`w-full h-full flex p-2 items-end justify-center ${
            props.focused
              ? "bg-[#752092]"
              : "bg-[#C957BC] group-hover:bg-[#752092]"
          } transition-colors duration-300`}
        >
          {IconComponent ? <IconComponent /> : null}
        </div>
      </button>
      <div className="kameron flex leading-none text-lg text-[#752092]">
        {Strings[`${props.action}_${props.name}`]}
      </div>
    </div>
  );
};

export const MidRangeContainer = (props: RangeContainerProps) => {
  return (
    <button
      className={`"clickable w-24 h-24 mt-4 cursor-pointer ${
        props.focused
          ? "bg-[#752092]"
          : "bg-[#9F3CA7] border-3 border-[#752092] hover:bg-[#752092]"
      } transition-colors duration-300"`}
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
      className={`group max-w-32 min-w-24 flex-1 flex flex-col p-3 gap-1.5 items-center justify-end cursor-pointer ${
        props.focused ? "bg-[#752092]" : "bg-[#C957BC] hover:bg-[#752092]"
      } transition-colors duration-300`}
      name={props.name}
      value={props.value}
      onClick={props.onClick}
    >
      <div className="kameron flex leading-none text-lg text-[#FFFEE0]">
        {Strings[props.name]}
      </div>
      <div
        className={`flex-1 w-full h-full ${
          props.focused
            ? "bg-[#C957BC]"
            : "bg-[#752092] group-hover:bg-[#C957BC]"
        } transition-colors duration-300`}
      />
    </button>
  );
};

export const InputContainer = (props: InputContainerProps) => {
  return (
    <div className="flex-1 flex flex-col max-w-80 gap-3 justify-center">
      <NewInput
        name={props.name}
        type="text"
        value={props.value}
        onChange={props.onChange}
        variant="action"
      />
    </div>
  );
};
