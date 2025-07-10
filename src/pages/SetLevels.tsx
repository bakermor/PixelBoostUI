import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateHealth } from "../api/HealthApi";
import { DefaultButton } from "../components/Buttons";
import { SetStat } from "../components/SetStat";
import { allowedStats } from "../constants/StatConstants";
import { Strings } from "../constants/Strings";
import { Colors, pxl } from "../constants/ThemeConstants";
import { AuthContext } from "../context/AuthProvider";
import { StatUpdateContext } from "../context/StatUpdateProvider";
import { HealthLevels } from "../models/User";
import { createHealthUpdate } from "../utils/createHealthUpdate";
import { createEmptyHealthLevels } from "../utils/userFactory";

const SetLevels = () => {
  const { health, loading } = useContext(StatUpdateContext);
  const { updateAuth } = useContext(AuthContext);

  const [modifiers, setModifiers] = useState<HealthLevels>(
    createEmptyHealthLevels()
  );

  const navigate = useNavigate();

  const updateMod = (stat: keyof HealthLevels, value: number) => {
    let updatedLevel = health[stat] + modifiers[stat] + value;

    // modifier[stat] should not push health[stat] over 100 or under 0
    let newValue =
      updatedLevel > 100
        ? 100 - health[stat]
        : updatedLevel < 0
        ? -health[stat]
        : modifiers[stat] + value;

    setModifiers({
      ...modifiers,
      [stat]: newValue,
    });
  };

  const fillAll = () => {
    setModifiers(
      Object.fromEntries(
        Object.keys(modifiers).map((key) => [
          key,
          100 - health[key as keyof HealthLevels],
        ])
      ) as Record<keyof HealthLevels, number>
    );
  };

  const handleSubmit = async () => {
    // Update with sum of health and modifiers
    const result = await updateHealth(
      createHealthUpdate(
        Object.fromEntries(
          Object.keys(modifiers).map((key) => [
            key,
            health[key as keyof HealthLevels] +
              modifiers[key as keyof HealthLevels],
          ])
        ) as Record<keyof HealthLevels, number>
      )
    );
    if (result.status === 200) {
      await updateAuth();
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    // if (!loading) console.log(health);
  }, [loading]);

  return (
    <div
      className="h-screen w-screen flex justify-end"
      style={{ backgroundColor: Colors.p4 }}
    >
      <div
        className="h-full flex flex-col overflow-x-auto"
        style={{
          width: pxl * 1480,
          gap: pxl * 30,
          padding: pxl * 45,
          backgroundColor: Colors.p1,
        }}
      >
        <div className="flex flex-col w-full" style={{ gap: pxl * 5 }}>
          <div
            className="flex justify-start leading-none"
            style={{
              height: pxl * 52,
              fontSize: pxl * 48,
              fontFamily: "'pxlLarge', monospace",
              color: Colors.a5,
            }}
          >
            {Strings.set_levels}
          </div>
          <div
            className="flex justify-start leading-none"
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
              color: Colors.a3,
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
            minWidth: pxl * 1350,
          }}
        >
          <div
            className="self-end flex"
            style={{ width: pxl * 180, marginRight: pxl * 218 }}
          >
            <DefaultButton
              text={Strings.fill_all}
              name="fill_all"
              onClick={fillAll}
              size={30}
              colors={[Colors.a2, Colors.a3, Colors.a6, Colors.p1]}
            />
          </div>

          {allowedStats.map((stat) => (
            <div className="flex" key={stat} style={{ paddingBottom: pxl * 5 }}>
              <SetStat
                stat={stat as keyof HealthLevels}
                level={Math.min(
                  Math.max(
                    health[stat as keyof HealthLevels] +
                      modifiers[stat as keyof HealthLevels],
                    0
                  ),
                  100
                )}
                onClick={updateMod}
              />
            </div>
          ))}
          <div
            className="flex self-end"
            style={{
              width: pxl * 320,
              marginRight: pxl * 100,
              marginTop: pxl * 25,
              marginBottom: pxl * 40,
            }}
          >
            <DefaultButton
              text={Strings.update}
              onClick={handleSubmit}
              colors={[Colors.a5, Colors.a4, Colors.a2, Colors.p1]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetLevels;
