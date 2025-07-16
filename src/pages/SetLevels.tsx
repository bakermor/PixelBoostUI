import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateHealth } from "../api/HealthApi";
import { NewDefaultButton, SmallButton } from "../components/Buttons";
import { SetStat } from "../components/SetStat";
import { SideBar } from "../components/SideBar";
import { allowedStats } from "../constants/StatConstants";
import { Strings } from "../constants/Strings";
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
    <div className="h-screen w-screen flex gap-10 bg-linear-to-t from-[#FFFFFC] to-[#FFFEE0]">
      <SideBar />
      <div className="flex-1 flex flex-col overflow-x-auto p-8 gap-8">
        <div className="flex flex-col gap-1 p-2 px-4">
          <div className="kameron mt-3 w-full leading-none whitespace-nowrap text-4xl text-[#000000]">
            {Strings.set_levels}
          </div>
          <div className="sans w-full leading-none whitespace-nowrap text-[#919191]">
            {Strings.set_levels_desc}
          </div>
        </div>
        <div className="flex-1 flex flex-col min-w-100 max-w-230 justify-between px-5 gap-6 relative">
          <div className="absolute -top-4 left-181.5">
            <SmallButton
              text={Strings.fill_all}
              name="fill_all"
              onClick={fillAll}
              variant="activity"
            />
          </div>
          {allowedStats.map((stat) => (
            <SetStat
              key={stat}
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
          ))}
          <div className="flex self-end w-90 mb-10 mt-6">
            <NewDefaultButton
              text={Strings.update}
              onClick={handleSubmit}
              size="large"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetLevels;
