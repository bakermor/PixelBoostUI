import { useContext, useState } from "react";
import { updateEquations, updateHealth } from "../../api/HealthApi";
import { statEquations } from "../../constants/StatConstants";
import { Strings } from "../../constants/Strings";
import { AuthContext } from "../../context/AuthProvider";
import { StatUpdateContext } from "../../context/StatUpdateProvider";
import { User } from "../../models/User";
import { createHealthUpdate } from "../../utils/createHealthUpdate";
import { SettingsSection } from "./SettingsSection";

interface Props {
  user: User;
}

interface StatEquationProps {
  stat: string;
  equation: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const StatsSettings = (props: Props) => {
  const { updateAuth } = useContext(AuthContext);
  const { health } = useContext(StatUpdateContext);

  const [equations, setEquations] = useState(
    Object.fromEntries(
      Object.entries(props.user.health).map(([stat, value]) => [
        stat,
        value.equation[0] / statEquations[stat],
      ])
    )
  );

  const handleChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEquations({
      ...equations,
      [e.currentTarget.name]: parseFloat(e.currentTarget.value),
    });
  };

  const handleSubmit = async () => {
    // update health so past levels aren't affected when the equation changes
    const update = await updateHealth(createHealthUpdate(health));

    // update equations if health update succeeds
    if (update.status === 200) {
      const result = await updateEquations({
        energy: equations.energy * statEquations.energy,
        hunger: equations.hunger * statEquations.hunger,
        thirst: equations.thirst * statEquations.thirst,
        fun: equations.fun * statEquations.fun,
        social: equations.social * statEquations.social,
        hygiene: equations.hygiene * statEquations.hygiene,
      });

      // update webpage state
      if (result.status === 200) await updateAuth();
      return result;
    } else return update;
  };

  return (
    <div className="flex-1 flex flex-col gap-10">
      <SettingsSection
        title="edit_decay"
        subtitle={true}
        onSubmit={handleSubmit}
      >
        <div className="kameron flex justify-between mt-3 ml-30 w-75 font-semibold text-xs text-[#752092]">
          <div className="flex justify-start leading-none">
            {Strings.dec_fast}
          </div>
          <div className="flex justify-start leading-none">
            {Strings.dec_slow}
          </div>
        </div>

        <div className="flex flex-col mb-3 gap-4">
          {Object.entries(equations).map(([stat, value]) => (
            <EquationSection
              key={stat}
              stat={stat}
              equation={value}
              onClick={handleChange}
            />
          ))}
        </div>
      </SettingsSection>
    </div>
  );
};

const EquationSection = (props: StatEquationProps) => {
  const equationModifiers = [4, 3, 2, 1, 0.5, 0.3, 0.25];

  return (
    <div className="w-full flex items-center px-2 gap-8.5">
      <div className="sans w-20 flex justify-start leading-none text-[#752092]">
        {Strings[props.stat]}
      </div>
      <div className="flex-1 flex items-end gap-3">
        {equationModifiers.map((value) => (
          <button
            key={value}
            name={props.stat}
            value={value}
            onClick={props.onClick}
            className={`w-8 h-6 cursor-pointer rounded-sm ${
              props.equation === value
                ? "bg-[#C957BC]"
                : "bg-[#FFED93] hover:bg-[#C957BC]"
            } transition-colors duration-300`}
          />
        ))}
      </div>
    </div>
  );
};
