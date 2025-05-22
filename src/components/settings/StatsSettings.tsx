import { ReactNode, useContext, useState } from "react";
import { User } from "../../api/AuthApi";
import { updateEquations, updateHealth } from "../../api/HealthApi";
import { statEquations } from "../../constants/StatConstants";
import { Strings } from "../../constants/Strings";
import { pxl } from "../../constants/ThemeConstants";
import { AuthContext } from "../../context/AuthProvider";
import { StatUpdateContext } from "../../context/StatUpdateProvider";
import { UpdateButton } from "../Buttons";

interface Props {
  user: User;
}

interface SectionProps {
  title: string;
  subtitle?: boolean;
  children?: ReactNode;
  onSubmit: (props?: any) => Promise<Record<string, any>>;
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
    const update = await updateHealth({
      energy: {
        current_level: health.energy,
        last_updated: Date.now() / 1000,
      },
      hunger: {
        current_level: health.hunger,
        last_updated: Date.now() / 1000,
      },
      thirst: {
        current_level: health.thirst,
        last_updated: Date.now() / 1000,
      },
      fun: {
        current_level: health.fun,
        last_updated: Date.now() / 1000,
      },
      social: {
        current_level: health.social,
        last_updated: Date.now() / 1000,
      },
      hygiene: {
        current_level: health.hygiene,
        last_updated: Date.now() / 1000,
      },
    });

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
    <div className="flex-1 flex flex-col" style={{ gap: pxl * 50 }}>
      <SettingsSection
        title="edit_decay"
        subtitle={true}
        onSubmit={handleSubmit}
      >
        <div
          className="flex justify-between"
          style={{
            marginTop: pxl * 10,
            marginLeft: pxl * 150,
            width: pxl * 370,
          }}
        >
          <div
            className="flex justify-start leading-none text-gray-500"
            style={{
              height: pxl * 13,
              fontSize: pxl * 12,
              fontFamily: "'pxlLarge', monospace",
            }}
          >
            {Strings.dec_fast}
          </div>
          <div
            className="flex justify-start leading-none text-gray-500"
            style={{
              height: pxl * 13,
              fontSize: pxl * 12,
              fontFamily: "'pxlLarge', monospace",
            }}
          >
            {Strings.dec_slow}
          </div>
        </div>

        <div className="flex flex-col" style={{ gap: pxl * 10 }}>
          {Object.entries(equations).map(([stat, value]) => (
            <div key={stat} className="flex">
              <EquationSection
                stat={stat}
                equation={value}
                onClick={handleChange}
              />
            </div>
          ))}
        </div>
      </SettingsSection>
    </div>
  );
};

const SettingsSection = (props: SectionProps) => {
  const handleSubmit = async () => {
    const result = await props.onSubmit();
    console.log(result);
  };

  return (
    <div className="w-full flex flex-col" style={{ gap: pxl * 8 }}>
      <div
        className="flex justify-start leading-none text-gray-400"
        style={{
          height: pxl * 26,
          fontSize: pxl * 24,
          fontFamily: "'pxlLarge', monospace",
        }}
      >
        {Strings[props.title]}
      </div>
      {props.subtitle ? (
        <div
          className="flex justify-start leading-none text-gray-400"
          style={{
            marginTop: pxl * 10,
            height: pxl * 18,
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
          }}
        >
          {Strings[`${props.title}_desc`]}
        </div>
      ) : null}

      <div className="w-full bg-gray-300" style={{ height: pxl * 5 }} />
      {props.children}
      <div className="flex" style={{ width: pxl * 180, paddingTop: pxl * 25 }}>
        <UpdateButton text="save" onClick={handleSubmit} />
      </div>
    </div>
  );
};

const EquationSection = (props: StatEquationProps) => {
  const equationModifiers = [4, 3, 2, 1, 0.5, 0.3, 0.25];

  return (
    <div
      className="w-full flex items-center"
      style={{
        paddingLeft: pxl * 20,
        paddingRight: pxl * 20,
        height: pxl * 40,
        gap: pxl * 30,
      }}
    >
      <div
        className="flex justify-start leading-none text-gray-400"
        style={{
          height: pxl * 18,
          width: pxl * 100,
          fontSize: pxl * 16,
          fontFamily: "'pxlSmall', monospace",
        }}
      >
        {Strings[props.stat]}
      </div>
      <div className="flex-1 flex items-end" style={{ gap: pxl * 15 }}>
        {equationModifiers.map((value) => (
          <button
            key={value}
            name={props.stat}
            value={value}
            onClick={props.onClick}
            className={`${
              props.equation === value
                ? "bg-gray-400"
                : "bg-gray-300 hover:bg-gray-400 cursor-pointer"
            }`}
            style={{ height: pxl * 30, width: pxl * 40 }}
          />
        ))}
      </div>
    </div>
  );
};
