import { useEffect } from "react";
import { STR } from "../constants/Strings";

interface LabeledStatProps {
  name: string;
  level: number;
}

export const LabeledStat = (props: LabeledStatProps) => {
  const pxl = window.innerWidth / 1920;

  useEffect(() => {}, [props.level]);

  return (
    <div className="flex flex-col" style={{ width: pxl * 342, gap: pxl * 5 }}>
      <div className="w-full flex">
        <div
          className="flex leading-none text-gray-500"
          style={{
            height: pxl * 16,
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
          }}
        >
          {STR.get(props.name)}
        </div>
      </div>
      <div
        className="w-full flex bg-gray-600 overflow-clip"
        style={{ height: pxl * 35, padding: pxl * 3 }}
        title={`${props.name}: ${props.level}`}
      >
        <div
          className="bg-gray-500"
          style={{ width: Math.floor((props.level / 100) * (337 * pxl)) }}
        ></div>
        <div className="flex-1 bg-gray-300"></div>
      </div>
    </div>
  );
};
