import { useEffect } from "react";
import { HealthLevels } from "../context/StatUpdateProvider";
import { LabeledStat } from "./LabeledStat";

interface StatContainerProps {
  health: HealthLevels | undefined;
}

export const StatContainer = (props: StatContainerProps) => {
  const pxl = window.innerWidth / 1920;

  useEffect(() => {}, [props.health]);

  return (
    <div
      className="flex bg-gray-200"
      style={{
        height: pxl * 225,
        width: pxl * 715,
        gap: pxl * 10,
        paddingLeft: pxl * 10,
        paddingRight: pxl * 10,
      }}
    >
      <div className="flex-1 flex flex-col justify-evenly">
        <LabeledStat
          name="energy"
          level={props.health ? props.health.energy : 0}
        />
        <LabeledStat
          name="hunger"
          level={props.health ? props.health.hunger : 0}
        />
        <LabeledStat
          name="thirst"
          level={props.health ? props.health.thirst : 0}
        />
      </div>
      <div className="flex-1 flex flex-col justify-evenly">
        <LabeledStat
          name="hygiene"
          level={props.health ? props.health.hygiene : 0}
        />
        <LabeledStat
          name="social"
          level={props.health ? props.health.social : 0}
        />
        <LabeledStat name="fun" level={props.health ? props.health.fun : 0} />
      </div>
    </div>
  );
};
