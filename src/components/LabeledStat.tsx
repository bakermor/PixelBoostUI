import { useEffect } from "react";
import { Strings } from "../constants/Strings";
import { pxl } from "../constants/ThemeConstants";

interface Props {
  name: string;
  level: number;
}

interface ModifiedStatProps extends Props {
  color: string;
  modifier: number;
}

const Stat = (props: Props) => {
  return (
    <div
      className="w-full h-8.5 flex overflow-clip rounded-full bg-[#FFFFFC] border-3 border-[#752092]"
      title={`${props.name}: ${props.level}`}
    >
      <div
        className={
          props.level > 65
            ? "bg-[#CCFE93]"
            : props.level > 27
            ? "bg-[#FFED93]"
            : "bg-[#FF90AA]"
        }
        style={{
          width: `${Math.floor(props.level)}%`,
        }}
      ></div>
    </div>
  );
};

export const LabeledStat = (props: Props) => {
  useEffect(() => {}, [props.level]);

  return (
    <div className="flex flex-col w-full gap-1">
      <div className="kameron flex leading-none text-sm text-[#FFFFFC]">
        {Strings[props.name]}
      </div>
      <Stat {...props} />
    </div>
  );
};

export const ModifiedStat = (props: ModifiedStatProps) => {
  useEffect(() => {}, [props.level, props.modifier]);

  return (
    <div className="flex flex-col" style={{ width: pxl * 342, gap: pxl * 5 }}>
      <div className="w-full flex justify-end">
        <div
          className="flex leading-none"
          style={{
            height: pxl * 18,
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
            color: props.color,
          }}
        >
          {Strings[props.name]}
        </div>
      </div>
      <Stat name={props.name} level={props.level + props.modifier} />
    </div>
  );
};
