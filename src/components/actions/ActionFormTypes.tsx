import { useEffect, useState } from "react";
import {
  ActionInput,
  ActionSelect,
  InputValues,
  SelectValues,
} from "../../constants/ActionConstants";
import {
  InputContainer,
  MidRangeContainer,
  RangeContainer,
  SelectContainer,
} from "./ActionFormElements";

interface FormProps {
  name: string;
  multiple?: boolean;
  setModifier: (key: string, modifier: number) => void;
}

export const RangeForm = (props: FormProps) => {
  const pxl = window.innerWidth / 1920;
  const [focused, setFocused] = useState("");

  console.log(props);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFocused(e.currentTarget.name);
    props.setModifier(
      props.name.replace("_range", ""),
      parseFloat(e.currentTarget.value)
    );
  };

  return (
    <div
      className="flex-1 flex justify-between"
      style={{ paddingTop: pxl * 5, paddingBottom: pxl * 1 }}
    >
      <RangeContainer
        action={props.name}
        name="small"
        focused={focused === "small"}
        onClick={handleClick}
      />
      <MidRangeContainer
        action={props.name}
        name="small_medium"
        focused={focused === "small_medium"}
        onClick={handleClick}
      />
      <RangeContainer
        action={props.name}
        name="medium"
        focused={focused === "medium"}
        onClick={handleClick}
      />
      <MidRangeContainer
        action={props.name}
        name="medium_large"
        focused={focused === "medium_large"}
        onClick={handleClick}
      />
      <RangeContainer
        action={props.name}
        name="large"
        focused={focused === "large"}
        onClick={handleClick}
      />
    </div>
  );
};

export const SelectForm = (props: FormProps) => {
  const pxl = window.innerWidth / 1920;
  const [focusedSingle, setFocusedSingle] = useState("");
  const [focusedMultiple, setFocusedMultiple] = useState<Set<string>>(
    new Set()
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    if (!props.multiple) {
      setFocusedSingle(name);

      props.setModifier(
        props.name.replace("_select", ""),
        parseFloat(e.currentTarget.value)
      );
    } else {
      const updateSet = new Set(focusedMultiple);
      if (updateSet.has(name)) {
        updateSet.delete(name);
        props.setModifier(
          props.name.replace("_select", ""),
          -parseFloat(e.currentTarget.value)
        );
      } else {
        updateSet.add(name);
        props.setModifier(
          props.name.replace("_select", ""),
          parseFloat(e.currentTarget.value)
        );
      }

      setFocusedMultiple(updateSet);
    }
  };

  return (
    <div className="flex-1 flex justify-evenly" style={{ gap: pxl * 20 }}>
      {ActionSelect[props.name]?.map((option) => (
        <div className="flex-1 flex" key={option}>
          <SelectContainer
            name={option}
            value={
              SelectValues[props.name] ? SelectValues[props.name][option] : 0
            }
            focused={
              props.multiple
                ? focusedMultiple.has(option)
                : focusedSingle === option
            }
            onClick={handleClick}
          />
        </div>
      ))}
    </div>
  );
};

export const InputForm = (props: FormProps) => {
  const pxl = window.innerWidth / 1920;
  const [value, setValue] = useState(
    Object.fromEntries(ActionInput[props.name].map((key) => [key, 0]))
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: parseFloat(e.target.value)
        ? parseFloat(e.target.value)
        : 0,
    });
  };

  useEffect(() => {
    let modifier = 0;
    for (const [key, val] of Object.entries(value)) {
      modifier += InputValues[props.name]
        ? val * InputValues[props.name][key]
        : 0;
    }

    props.setModifier(props.name.replace("_input", ""), modifier);
  }, [value]);

  return (
    <div
      className={`flex-1 flex ${
        ActionInput[props.name].length === 1
          ? "justify-start"
          : "justify-evenly"
      }`}
      style={{
        padding: pxl * 15,
        paddingTop: pxl * 10,
        paddingBottom: pxl * 10,
        gap: pxl * 30,
      }}
    >
      {ActionInput[props.name]?.map((option) => (
        <div className="flex-1 flex" key={option}>
          <InputContainer
            name={option}
            value={value[option]}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
};
