import { useEffect, useState } from "react";
import { ActionComponents } from "../../constants/ActionConstants";
import { SwitchFormButton } from "../Buttons";
import { ActionForm, BaseAction } from "./ActionBase";

interface StatActionProps {
  action: string;
  stat: string;
  level: number;
  modifier: number;
  setModifier: (modifier: number) => void;
}

export const StatAction = (props: StatActionProps) => {
  const pxl = window.innerWidth / 1920;

  const [modifiers, setModifiers] = useState<Record<string, number>>(
    Object.fromEntries(
      ActionComponents[props.action]?.map((form) => [form.name, 0])
    )
  );

  const updateModifier = (key: string, modifier: number) => {
    setModifiers({
      ...modifiers,
      [key]: modifier,
    });
  };

  // add selected values together rather than overwriting
  const multipleSelectUpdate = (key: string, modifier: number) => {
    setModifiers({
      ...modifiers,
      [key]: modifiers[key] + modifier,
    });
  };

  // allows for multiple form types for one part of the action
  const [visibleForm, setVisibleForm] = useState<Record<string, string>>(
    Object.fromEntries(
      ActionComponents[props.action]?.map((form) => [form.name, form.type])
    )
  );

  const updateFormType = (e: React.MouseEvent<HTMLButtonElement>) => {
    ActionComponents[props.action]?.map((form) => {
      if (form.name === e.currentTarget.name) {
        setVisibleForm({
          ...visibleForm,
          [e.currentTarget.name]: e.currentTarget.value,
        });

        updateModifier(e.currentTarget.name, 0);
      }
    });
  };

  useEffect(() => {
    props.setModifier(
      Object.values(modifiers).reduce((acc, val) => acc * val, 1)
    );
    console.log(modifiers);
  }, [modifiers]);

  return (
    <BaseAction {...props}>
      <div className="flex flex-col" style={{ gap: pxl * 40 }}>
        {ActionComponents[props.action]?.map((form) => (
          <div className="flex" key={form.name}>
            {!form.types ? (
              <ActionForm
                name={form.name}
                type={form.type}
                setModifier={
                  form.multiple ? multipleSelectUpdate : updateModifier
                }
                multiple={form.multiple ? true : false}
              />
            ) : (
              <div className="relative flex-1">
                <SwitchFormButton
                  name={form.name}
                  text={
                    form.types[
                      (form.types.indexOf(visibleForm[form.name]) + 1) %
                        form.types.length
                    ]
                  }
                  onClick={updateFormType}
                />
                <ActionForm
                  name={`${form.name}_${visibleForm[form.name]}`}
                  type={visibleForm[form.name]}
                  setModifier={
                    form.multiple ? multipleSelectUpdate : updateModifier
                  }
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </BaseAction>
  );
};
