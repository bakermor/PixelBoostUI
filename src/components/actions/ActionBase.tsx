import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateStat } from "../../api/HealthApi";
import { PickActions } from "../../constants/ActionConstants";
import { Strings } from "../../constants/Strings";
import { AuthContext } from "../../context/AuthProvider";
import { NewDefaultButton } from "../Buttons";
import { ModifiedStat } from "../LabeledStat";
import { InputForm, RangeForm, SelectForm } from "./ActionFormTypes";

interface Props {
  children: ReactNode;
  stat: string;
  action: string;
  level: number;
  modifier: number;
}

interface ActionFormProps {
  name: string;
  type: string;
  multiple?: boolean;
  setModifier: (key: string, modifier: number) => void;
}

interface PickActionProps {
  stat: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const BaseAction = (props: Props) => {
  const { user, updateAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const updateLevel = async () => {
    // update level to level + modifier
    if (user) {
      const result = await updateStat(props.stat, {
        current_level: props.level + props.modifier,
        last_updated: Date.now() / 1000,
      });

      if (result.status === 200) {
        await updateAuth();
      }
    }
    navigate("/dashboard");
  };

  // TODO: actions don't increase levels enough

  useEffect(() => {}, [props]);

  return (
    <div className="flex-1 flex flex-col p-12 pt-2 gap-4">
      <div className="flex flex-col gap-1 p-2">
        <div className="kameron mt-3 w-full leading-none whitespace-nowrap text-4xl text-[#000000]">
          {Strings[props.action]}
        </div>
        <div className="sans w-full leading-none whitespace-nowrap text-[#919191]">
          {Strings[`${props.action}_desc`]}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between gap-3 px-30">
        <div className="flex self-end">
          <ModifiedStat
            name={props.stat}
            level={props.level}
            modifier={props.modifier}
          />
        </div>
        <div className="flex-1">{props.children}</div>
        <div className="flex self-end w-90 ">
          <NewDefaultButton
            text={Strings.complete_action}
            onClick={updateLevel}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export const ActionForm = (props: ActionFormProps) => {
  return (
    <div className="flex-1 flex flex-col gap-2 justify-center">
      <div className="kameron flex leading-none mr-20 text-2xl text-[#752092]">
        {Strings[props.name]}
      </div>
      <div className="w-full h-42 flex p-3 bg-linear-to-t from-[#FFF0A6] to-[#FFC872] outline-3 outline-[#FFC872]">
        {props.type === "range" ? (
          <RangeForm name={props.name} setModifier={props.setModifier} />
        ) : props.type === "select" ? (
          <SelectForm
            name={props.name}
            multiple={props.multiple ? props.multiple : false}
            setModifier={props.setModifier}
          />
        ) : props.type === "input" ? (
          <InputForm name={props.name} setModifier={props.setModifier} />
        ) : null}
      </div>
    </div>
  );
};

export const PickAction = (props: PickActionProps) => {
  return (
    <div className="flex-1 flex flex-col p-12 pt-2 gap-12">
      <div className="flex flex-col gap-1 p-2">
        <div className="kameron mt-3 w-full leading-none whitespace-nowrap text-4xl text-[#000000]">
          {Strings[`${props.stat}_actions`]}
        </div>
        <div className="sans w-full leading-none whitespace-nowrap text-[#919191]">
          {Strings[`${props.stat}_actions_desc`]}
        </div>
      </div>
      <div className="flex flex-col justify-center px-30 gap-3">
        {PickActions[props.stat]?.map((option) => (
          <NewDefaultButton
            key={option}
            text={Strings[`${option}_b`]}
            name={option}
            onClick={props.onClick}
            variant="inverted"
            size="large"
          />
        ))}
      </div>
    </div>
  );
};
