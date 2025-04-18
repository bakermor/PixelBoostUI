import { useState } from "react";
import { ActionForm, BaseAction } from "./ActionComponents";
import { SwitchFormButton } from "../Buttons";

interface StatActionProps {
  level: number;
}

export const EatFood = (props: StatActionProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <BaseAction stat="hunger" action="eat_food" level={props.level}>
      <div className="flex flex-col" style={{ gap: pxl * 40 }}>
        <ActionForm name="food_quantity" type="range" />
        <ActionForm name="food_quality" type="select" multiple={true} />
      </div>
    </BaseAction>
  );
};

export const DrinkSomething = (props: StatActionProps) => {
  const pxl = window.innerWidth / 1920;
  const [quantityForm, setQuantityForm] = useState<"units" | "range">("units");

  const updateFormType = () => {
    if (quantityForm === "units") setQuantityForm("range");
    else setQuantityForm("units");
  };

  return (
    <BaseAction stat="thirst" action="drink" level={props.level}>
      <div className="flex flex-col" style={{ gap: pxl * 40 }}>
        <ActionForm name="drink_type" type="select" />
        <div className="relative">
          <SwitchFormButton
            text={quantityForm === "units" ? "range" : "units"}
            onClick={updateFormType}
          />
          {quantityForm === "units" ? (
            <ActionForm name="drink_quantity_in" type="input" />
          ) : (
            <ActionForm name="drink_quantity_range" type="range" />
          )}
        </div>
        <div className="flex flex-col" style={{ gap: pxl * 10 }}></div>
      </div>
    </BaseAction>
  );
};

export const GetClean = (props: StatActionProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <BaseAction stat="hygiene" action="get_clean" level={props.level}>
      <div className="flex flex-col" style={{ gap: pxl * 40 }}>
        <ActionForm name="clean" type="select" />
      </div>
    </BaseAction>
  );
};

export const DoFun = (props: StatActionProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <BaseAction stat="fun" action="do_fun" level={props.level}>
      <div className="flex flex-col" style={{ gap: pxl * 40 }}>
        <ActionForm name="fun_quality" type="range" />
        <ActionForm name="fun_length" type="input" />
      </div>
    </BaseAction>
  );
};

export const DrinkCaffeine = (props: StatActionProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <BaseAction stat="energy" action="have_coffee" level={props.level}>
      <div className="flex flex-col" style={{ gap: pxl * 40 }}>
        <ActionForm name="coffee_quantity" type="input" />
      </div>
    </BaseAction>
  );
};

export const GetSleep = (props: StatActionProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <BaseAction stat="energy" action="get_sleep" level={props.level}>
      <div className="flex flex-col" style={{ gap: pxl * 40 }}>
        <ActionForm name="sleep_length" type="input" />
        <ActionForm name="sleep_quality" type="range" />
      </div>
    </BaseAction>
  );
};

export const CallSomeone = (props: StatActionProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <BaseAction stat="social" action="call_someone" level={props.level}>
      <div className="flex flex-col" style={{ gap: pxl * 40 }}></div>
    </BaseAction>
  );
};

export const SocailHangout = (props: StatActionProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <BaseAction stat="social" action="go_hangout" level={props.level}>
      <div className="flex flex-col" style={{ gap: pxl * 40 }}>
        <ActionForm name="social_hangout" type="input" />
        <ActionForm name="social_quality" type="range" />
      </div>
    </BaseAction>
  );
};
