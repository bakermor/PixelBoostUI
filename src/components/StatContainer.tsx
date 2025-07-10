import { useEffect } from "react";
import { allowedStats } from "../constants/StatConstants";
import { HealthLevels } from "../models/User";
import { LabeledStat } from "./LabeledStat";

interface Props {
  health: HealthLevels | undefined;
}

export const StatContainer = (props: Props) => {
  useEffect(() => {}, [props.health]);

  return (
    <div className="w-full flex py-6 px-7 gap-8 justify-center rounded-lg bg-linear-to-t from-[#C957BC] to-[#752092] outline-3 outline-[#752092]">
      <div className="flex-1 flex flex-col justify-evenly gap-3.5">
        {allowedStats.slice(0, 3).map((stat) => (
          <LabeledStat
            key={stat}
            name={stat}
            level={props.health ? props.health[stat as keyof HealthLevels] : 0}
          />
        ))}
      </div>
      <div className="flex-1 flex flex-col justify-evenly gap-3.5">
        {allowedStats.slice(3, 7).map((stat) => (
          <LabeledStat
            key={stat}
            name={stat}
            level={props.health ? props.health[stat as keyof HealthLevels] : 0}
          />
        ))}
      </div>
    </div>
  );
};
