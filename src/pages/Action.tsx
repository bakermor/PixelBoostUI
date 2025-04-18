import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  DoFun,
  DrinkCaffeine,
  DrinkSomething,
  EatFood,
  GetClean,
  GetSleep,
  SocailHangout,
} from "../components/actions/StatActions";
import { StatUpdateContext } from "../context/StatUpdateProvider";
import { PickAction } from "../components/actions/ActionComponents";

const Action = () => {
  const pxl = window.innerWidth / 1920;
  const allowedStats = [
    "energy",
    "hunger",
    "thirst",
    "hygiene",
    "social",
    "fun",
  ];

  const [params] = useSearchParams();
  const [action, setAction] = useState("");
  const { health, loading } = useContext(StatUpdateContext);

  const stat = params.get("stat");
  const navigate = useNavigate();

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
  }, [params, loading]);

  if (!stat || !allowedStats.includes(stat)) return null;

  return (
    <div className="w-screen h-screen flex">
      <div className="flex-1 bg-gray-200" />
      <div className="flex h-full" style={{ width: pxl * 850 }}>
        {action === "" ? (
          <PickAction stat={stat} onClick={chooseAction} />
        ) : action === "eat_food" ? (
          <EatFood level={health.hunger} />
        ) : action === "drink" ? (
          <DrinkSomething level={health.thirst} />
        ) : action === "get_clean" ? (
          <GetClean level={health.hygiene} />
        ) : action === "do_fun" ? (
          <DoFun level={health.fun} />
        ) : action === "coffee" ? (
          <DrinkCaffeine level={health.energy} />
        ) : action === "sleep" ? (
          <GetSleep level={health.energy} />
        ) : action === "hangout" ? (
          <SocailHangout level={health.social} />
        ) : null}
      </div>
      <div className="flex-1 bg-gray-200" />
    </div>
  );
};

export default Action;
