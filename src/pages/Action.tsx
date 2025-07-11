import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PickAction } from "../components/actions/ActionBase";
import { StatAction } from "../components/actions/StatAction";
import { SideBar } from "../components/SideBar";
import {
  ActionComponentStat,
  ActionComponents,
} from "../constants/ActionConstants";
import { allowedStats } from "../constants/StatConstants";
import { AuthContext } from "../context/AuthProvider";
import { StatUpdateContext } from "../context/StatUpdateProvider";
import { HealthLevels } from "../models/User";

const Action = () => {
  const { health, loading } = useContext(StatUpdateContext);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const stat = params.get("stat");

  const [action, setAction] = useState("");
  const [level, setLevel] = useState(0);
  const [modifier, setModifier] = useState(0);

  const updateModifier = (modifier: number) => {
    if (user?.health) {
      const currentStat = user.health[stat as keyof HealthLevels];
      let equation = currentStat?.equation.reduce((sum, n) => sum + n, 0);
      setModifier(equation * modifier);
    }
  };

  const chooseAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAction(e.currentTarget.name);
  };

  useEffect(() => {
    if (!stat || !allowedStats.includes(stat)) {
      navigate("/dashboard");
      return;
    }

    if (stat === "hunger") setAction("eat_food");
    if (stat === "thirst") setAction("drink");
    if (stat === "hygiene") setAction("get_clean");
    if (stat === "fun") setAction("do_fun");
    if (stat === "social") setAction("hangout");
  }, [params, loading]);

  useEffect(() => {
    if (stat && allowedStats.includes(stat) && action !== "") {
      const statKey = ActionComponentStat[action];
      const currentLevel = health[statKey as keyof HealthLevels];

      setLevel(currentLevel);
    }
  }, [action, health]);

  if (!stat || !allowedStats.includes(stat)) return null;

  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="flex-1 flex h-full p-8 pt-6 pb-2 bg-linear-to-t from-[#FFFFFC] to-[#FFFEE0] overflow-auto">
        {action === "" ? (
          <PickAction stat={stat} onClick={chooseAction} />
        ) : ActionComponents[action] ? (
          <StatAction
            action={action}
            stat={stat}
            level={level}
            modifier={modifier}
            setModifier={updateModifier}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Action;
