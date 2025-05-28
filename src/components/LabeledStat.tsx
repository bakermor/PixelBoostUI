import { useEffect } from "react";
import { Strings } from "../constants/Strings";
import { Colors, pxl } from "../constants/ThemeConstants";

interface StatProps {
  name: string;
  level: number;
}

interface LabeledStatProps extends StatProps {
  color: string;
}

interface ModifiedStatProps extends LabeledStatProps {
  modifier: number;
}

const Stat = (props: StatProps) => {
  return (
    <div
      className="w-full flex overflow-clip"
      style={{
        height: pxl * 35,
        borderWidth: pxl * 3,
        borderColor: Colors.a6,
        backgroundColor: Colors.a1,
      }}
      title={`${props.name}: ${props.level}`}
    >
      <div
        style={{
          width: Math.floor((props.level / 100) * 337) * pxl,
          backgroundColor:
            props.level > 65
              ? Colors.green
              : props.level > 27
              ? Colors.yellow
              : Colors.red,
        }}
      ></div>
    </div>
  );
};

export const LabeledStat = (props: LabeledStatProps) => {
  useEffect(() => {}, [props.level]);

  return (
    <div className="flex flex-col" style={{ width: pxl * 342, gap: pxl * 5 }}>
      <div className="w-full flex">
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
