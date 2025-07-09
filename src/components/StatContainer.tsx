import { useEffect } from "react";
import { allowedStats } from "../constants/StatConstants";
import { Colors, pxl } from "../constants/ThemeConstants";
import { HealthLevels } from "../models/User";
import { LabeledStat } from "./LabeledStat";

interface StatContainerProps {
  health: HealthLevels | undefined;
}

export const StatContainer = (props: StatContainerProps) => {
  useEffect(() => {}, [props.health]);

  return (
    <div
      className="flex"
      style={{
        height: pxl * 225,
        width: pxl * 715,
        gap: pxl * 10,
        paddingLeft: pxl * 10,
        paddingRight: pxl * 10,
        backgroundColor: Colors.p6,
      }}
    >
      <div className="flex-1 flex flex-col justify-evenly">
        {allowedStats.slice(0, 3).map((stat) => (
          <div key={stat} className="flex">
            <LabeledStat
              name={stat}
              level={
                props.health
                  ? props.health[stat as keyof typeof props.health]
                  : 0
              }
              color={Colors.p1}
            />
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col justify-evenly">
        {allowedStats.slice(3, 7).map((stat) => (
          <div key={stat} className="flex">
            <LabeledStat
              name={stat}
              level={
                props.health
                  ? props.health[stat as keyof typeof props.health]
                  : 0
              }
              color={Colors.p1}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
