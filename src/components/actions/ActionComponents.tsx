import { ReactNode } from "react";
import { ActionSelect } from "../../constants/Actions";
import { Strings } from "../../constants/Strings";
import { SettingsButton } from "../Buttons";
import { ModifiedStat } from "../LabeledStat";
import { RangeContainer, SelectContainer } from "./ActionFormElements";

interface ActionProps {
  children: ReactNode;
  stat: string;
  action: string;
  level: number;
}

interface ActionFormProps {
  name: string;
  type: string;
}

interface RangeFormProps {
  name: string;
}

interface SelectFormProps {
  name: string;
}

export const BaseAction = (props: ActionProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <div
      className="flex-1 flex flex-col"
      style={{ padding: pxl * 70, paddingTop: pxl * 30, gap: pxl * 20 }}
    >
      <div
        className="flex flex-col w-full"
        style={{ paddingRight: pxl * 150, gap: pxl * 5 }}
      >
        <div
          className="flex justify-start leading-none text-gray-400"
          style={{
            height: pxl * 52,
            fontSize: pxl * 48,
            fontFamily: "'pxlLarge', monospace",
          }}
        >
          {Strings[props.action]}
        </div>
        <div
          className="flex justify-start leading-none text-gray-300"
          style={{
            height: pxl * 18,
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
          }}
        >
          {Strings[`${props.action}_desc`]}
        </div>
      </div>
      <div className="flex self-end">
        <ModifiedStat name={props.stat} level={props.level} modifier={0} />
      </div>
      <div
        className="flex-1"
        style={{ marginTop: pxl * 60, marginBottom: pxl * 10 }}
      >
        {props.children}
      </div>
      <div className="flex self-end" style={{ width: pxl * 400 }}>
        <SettingsButton text="complete_action" onClick={() => {}} />
      </div>
    </div>
  );
};

export const ActionForm = (props: ActionFormProps) => {
  const pxl = window.innerWidth / 1920;
  return (
    <div className="w-full flex flex-col" style={{ gap: pxl * 10 }}>
      <div
        className="flex justify-start leading-none text-gray-400"
        style={{
          marginRight: pxl * 80,
          height: pxl * 26,
          fontSize: pxl * 24,
          fontFamily: "'pxlLarge', monospace",
        }}
      >
        {Strings[props.name]}
      </div>
      <div
        className="w-full flex bg-gray-600"
        style={{ height: pxl * 180, padding: pxl * 15 }}
      >
        {props.type === "range" ? (
          <RangeForm name={props.name} />
        ) : props.type === "select" ? (
          <SelectForm name={props.name} />
        ) : null}
      </div>
    </div>
  );
};

export const RangeForm = (props: RangeFormProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <div
      className="flex-1 flex justify-between"
      style={{ paddingTop: pxl * 5, paddingBottom: pxl * 5 }}
    >
      <RangeContainer name={`${props.name}_small`} />
      <div
        className="bg-gray-400"
        style={{ width: pxl * 75, height: pxl * 75, marginTop: pxl * 20 }}
      />
      <RangeContainer name={`${props.name}_medium`} />
      <div
        className="bg-gray-400"
        style={{ width: pxl * 75, height: pxl * 75, marginTop: pxl * 20 }}
      />
      <RangeContainer name={`${props.name}_large`} />
    </div>
  );
};

export const SelectForm = (props: SelectFormProps) => {
  return (
    <div className="flex-1 flex justify-between">
      {ActionSelect[props.name]?.map((option) => (
        <SelectContainer name={option} />
      ))}
    </div>
  );
};
