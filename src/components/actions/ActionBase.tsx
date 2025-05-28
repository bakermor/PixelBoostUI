import { ReactNode, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateStat } from "../../api/HealthApi";
import { PickActions } from "../../constants/ActionConstants";
import { Strings } from "../../constants/Strings";
import { Colors, pxl } from "../../constants/ThemeConstants";
import { AuthContext } from "../../context/AuthProvider";
import { DefaultButton } from "../Buttons";
import { ModifiedStat } from "../LabeledStat";
import { InputForm, RangeForm, SelectForm } from "./ActionFormTypes";

interface ActionProps {
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

export const BaseAction = (props: ActionProps) => {
  const { user, updateAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const updateLevel = async () => {
    // update level to level + modifier
    console.log(`new level: ${props.level + props.modifier}`);

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

  useEffect(() => {}, [props]);

  return (
    <div
      className="flex-1 flex flex-col overflow-clip"
      style={{ padding: pxl * 70, paddingTop: pxl * 30, gap: pxl * 20 }}
    >
      <div
        className="flex flex-col w-full"
        style={{ paddingRight: pxl * 150, gap: pxl * 5 }}
      >
        <div
          className="flex justify-start whitespace-nowrap leading-none"
          style={{
            height: pxl * 52,
            fontSize: pxl * 48,
            fontFamily: "'pxlLarge', monospace",
            color: Colors.a5,
          }}
        >
          {Strings[props.action]}
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
          {Strings[`${props.action}_desc`]}
        </div>
      </div>
      <div className="flex self-end">
        <ModifiedStat
          name={props.stat}
          level={props.level}
          color={Colors.a5}
          modifier={props.modifier}
        />
      </div>
      <div
        className="flex-1"
        style={{ marginTop: pxl * 60, marginBottom: pxl * 10 }}
      >
        {props.children}
      </div>
      <div className="flex self-end" style={{ width: pxl * 400 }}>
        <DefaultButton
          text={Strings.complete_action}
          onClick={updateLevel}
          colors={[Colors.a3, Colors.a4, Colors.p1]}
        />
      </div>
    </div>
  );
};

export const ActionForm = (props: ActionFormProps) => {
  return (
    <div className="w-full flex flex-col" style={{ gap: pxl * 10 }}>
      <div
        className="flex justify-start leading-none"
        style={{
          marginRight: pxl * 80,
          height: pxl * 26,
          fontSize: pxl * 24,
          fontFamily: "'pxlLarge', monospace",
          color: Colors.a3,
        }}
      >
        {Strings[props.name]}
      </div>
      <div
        className="w-full flex"
        style={{
          height: pxl * 180,
          padding: pxl * 15,
          backgroundColor: Colors.p6,
        }}
      >
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
    <div
      className="flex-1 flex flex-col"
      style={{ padding: pxl * 70, paddingTop: pxl * 30, gap: pxl * 20 }}
    >
      <div
        className="flex flex-col w-full"
        style={{ paddingRight: pxl * 150, gap: pxl * 5 }}
      >
        <div
          className="flex justify-start whitespace-nowrap leading-none"
          style={{
            height: pxl * 52,
            fontSize: pxl * 48,
            fontFamily: "'pxlLarge', monospace",
            color: Colors.a5,
          }}
        >
          {Strings[`${props.stat}_actions`]}
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
          {Strings[`${props.stat}_actions_desc`]}
        </div>
      </div>
      <div
        className="flex flex-col justify-center"
        style={{
          marginTop: pxl * 60,
          paddingLeft: pxl * 60,
          paddingRight: pxl * 60,
          gap: pxl * 15,
        }}
      >
        {PickActions[props.stat]?.map((option) => (
          <div className="flex" key={option}>
            <DefaultButton
              text={Strings[`${option}_b`]}
              name={option}
              onClick={props.onClick}
              colors={[Colors.a3, Colors.a4, Colors.p1]}
              size={65}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
