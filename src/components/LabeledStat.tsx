import { useEffect } from "react";
import { Strings } from "../constants/Strings";

interface LabeledStatProps {
  name: string;
  level: number;
}

interface ModifiedStatProps {
  name: string;
  level: number;
  modifier: number;
}

const Stat = (props: LabeledStatProps) => {
  const pxl = window.innerWidth / 1920;
  return (
    <div
      className="w-full flex bg-gray-600 overflow-clip"
      style={{ height: pxl * 35, padding: pxl * 3 }}
      title={`${props.name}: ${props.level}`}
    >
      <div
        className="bg-gray-500"
        style={{ width: Math.floor((props.level / 100) * 337) * pxl }}
      ></div>
      <div className="flex-1 bg-gray-300"></div>
    </div>
  );
};

export const LabeledStat = (props: LabeledStatProps) => {
  const pxl = window.innerWidth / 1920;

  useEffect(() => {}, [props.level]);

  return (
    <div className="flex flex-col" style={{ width: pxl * 342, gap: pxl * 5 }}>
      <div className="w-full flex">
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
      </div>
      <Stat {...props} />
    </div>
  );
};

export const ModifiedStat = (props: ModifiedStatProps) => {
  const pxl = window.innerWidth / 1920;

  useEffect(() => {}, [props.level, props.modifier]);

  return (
    <div className="flex flex-col" style={{ width: pxl * 342, gap: pxl * 5 }}>
      <div className="w-full flex justify-end">
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
      </div>
      <Stat name={props.name} level={props.level + props.modifier} />
    </div>
  );
};
