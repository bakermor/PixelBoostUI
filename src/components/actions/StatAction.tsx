import { useEffect, useState } from "react";
import { ActionComponents } from "../../constants/ActionConstants";
import { Strings } from "../../constants/Strings";
import { SmallButton } from "../Buttons";
import { ActionForm, BaseAction } from "./ActionBase";

interface StatActionProps {
  action: string;
  stat: string;
  level: number;
  modifier: number;
  setModifier: (modifier: number) => void;
}

export const StatAction = (props: StatActionProps) => {
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

  const updateFormType = (
    e: React.MouseEvent<HTMLButtonElement>,
    type?: string
  ) => {
    console.log(e.currentTarget.name);
    ActionComponents[props.action]?.map((form) => {
      if (form.name === e.currentTarget.name) {
        setVisibleForm({
          ...visibleForm,
          [e.currentTarget.name]: type ?? "",
        });

        updateModifier(e.currentTarget.name, 0);
      }
    });
  };

  useEffect(() => {
    props.setModifier(
      Object.values(modifiers).reduce((item, val) => item * val, 1)
    );
  }, [modifiers]);

  return (
    <BaseAction {...props}>
      <div className="flex-1 h-full flex flex-col gap-8 justify-between">
        {ActionComponents[props.action]?.map((form) =>
          !form.types ? (
            <ActionForm
              key={form.name}
              name={form.name}
              type={form.type}
              setModifier={
                form.multiple ? multipleSelectUpdate : updateModifier
              }
              multiple={form.multiple ? true : false}
            />
          ) : (
            <div className="relative flex-1" key={form.name}>
              <div className="absolute -top-1 -right-0.5">
                <SmallButton
                  name={form.name}
                  text={
                    Strings[
                      form.types[
                        (form.types.indexOf(visibleForm[form.name]) + 1) %
                          form.types.length
                      ]
                    ]
                  }
                  onClick={(e) =>
                    updateFormType(
                      e,
                      form.types
                        ? form.types[
                            (form.types.indexOf(visibleForm[form.name]) + 1) %
                              form.types.length
                          ]
                        : ""
                    )
                  }
                  variant="activity"
                />
              </div>

              <ActionForm
                name={`${form.name}_${visibleForm[form.name]}`}
                type={visibleForm[form.name]}
                setModifier={
                  form.multiple ? multipleSelectUpdate : updateModifier
                }
              />
            </div>
          )
        )}
      </div>
    </BaseAction>
  );
};
