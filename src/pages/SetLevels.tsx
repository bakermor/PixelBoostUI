import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateHealth } from "../api/HealthApi";
import { SettingsButton, SmallRectButton } from "../components/Buttons";
import { SetStat } from "../components/SetStat";
import { allowedStats } from "../constants/StatConstants";
import { Strings } from "../constants/Strings";
import { AuthContext } from "../context/AuthProvider";
import { StatUpdateContext } from "../context/StatUpdateProvider";

const SetLevels = () => {
  const pxl = window.innerWidth / 1920;

  const { health, loading } = useContext(StatUpdateContext);
  const { updateAuth } = useContext(AuthContext);
  const [modifiers, setModifiers] = useState(
    Object.fromEntries(allowedStats.map((stat) => [stat, 0]))
  );

  const navigate = useNavigate();

  const updateMod = (stat: string, value: number) => {
    let updatedLevel =
      health[stat as keyof typeof health] + modifiers[stat] + value;

    // modifier[stat] should not push health[stat] over 100 or under 0
    let newValue =
      updatedLevel > 100
        ? 100 - health[stat as keyof typeof health]
        : updatedLevel < 0
        ? -health[stat as keyof typeof health]
        : modifiers[stat] + value;

    setModifiers({
      ...modifiers,
      [stat]: newValue,
    });
  };

  const fillAll = () => {
    setModifiers(
      Object.fromEntries(
        allowedStats.map((stat) => [
          stat,
          100 - health[stat as keyof typeof health],
        ])
      )
    );
  };

  const handleSubmit = async () => {
    const result = await updateHealth({
      energy: {
        current_level: health.energy + modifiers.energy,
        last_updated: Date.now() / 1000,
      },
      hunger: {
        current_level: health.hunger + modifiers.hunger,
        last_updated: Date.now() / 1000,
      },
      thirst: {
        current_level: health.thirst + modifiers.thirst,
        last_updated: Date.now() / 1000,
      },
      fun: {
        current_level: health.fun + modifiers.fun,
        last_updated: Date.now() / 1000,
      },
      social: {
        current_level: health.social + modifiers.social,
        last_updated: Date.now() / 1000,
      },
      hygiene: {
        current_level: health.hygiene + modifiers.hygiene,
        last_updated: Date.now() / 1000,
      },
    });

    if (result.status === 200) {
      await updateAuth();
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (!loading) console.log(health);
  }, [loading]);

  return (
    <div className="h-screen w-screen flex justify-end bg-gray-200">
      <div
        className="h-full flex flex-col bg-white"
        style={{ width: pxl * 1480, gap: pxl * 30, padding: pxl * 45 }}
      >
        <div className="flex flex-col w-full" style={{ gap: pxl * 5 }}>
          <div
            className="flex justify-start leading-none text-gray-400"
            style={{
              height: pxl * 52,
              fontSize: pxl * 48,
              fontFamily: "'pxlLarge', monospace",
            }}
          >
            {Strings.set_levels}
          </div>
          <div
            className="flex justify-start leading-none text-gray-300"
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
            }}
          >
            {Strings.set_levels_desc}
          </div>
        </div>
        <div
          className="flex-1 flex flex-col"
          style={{
            paddingLeft: pxl * 30,
            paddingRight: pxl * 30,
            gap: pxl * 15,
          }}
        >
          <div
            className="self-end flex"
            style={{ width: pxl * 180, marginRight: pxl * 218 }}
          >
            <SmallRectButton text="fill_all" onClick={fillAll} />
          </div>

          {allowedStats.map((stat) => (
            <div className="flex" key={stat} style={{ paddingBottom: pxl * 5 }}>
              <SetStat
                stat={stat}
                level={
                  health[stat as keyof typeof health]
                    ? Math.min(
                        Math.max(
                          health[stat as keyof typeof health] + modifiers[stat],
                          0
                        ),
                        100
                      )
                    : 0
                }
                onClick={updateMod}
              />
            </div>
          ))}
        </div>
        <div
          className="flex self-end"
          style={{
            width: pxl * 320,
            marginRight: pxl * 70,
            marginBottom: pxl * 40,
          }}
        >
          <SettingsButton text="update" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default SetLevels;
