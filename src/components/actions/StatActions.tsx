import { ActionForm, BaseAction } from "./ActionComponents";

interface StatActionProps {
  level: number;
}

export const EatFood = (props: StatActionProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <BaseAction stat="hunger" action="eat_food" level={props.level}>
      <div className="flex flex-col" style={{ gap: pxl * 40 }}>
        <ActionForm name="food_quantity" type="range" />
        <ActionForm name="food_quality" type="select" />
      </div>
    </BaseAction>
  );
};
