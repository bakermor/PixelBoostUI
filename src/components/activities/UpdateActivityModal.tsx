import { useState } from "react";
import { createActivity, updateActivity } from "../../api/ActivitiesApi";
import { Activity, Modifiers } from "../../api/AuthApi";
import { allowedStats } from "../../constants/StatConstants";
import { Strings } from "../../constants/Strings";
import { AddNewButton, ModalButton, SettingsButton } from "../Buttons";
import { Input } from "../Input";
import { StatModifier } from "./StatModifier";

interface ModalProps {
  exit: React.MouseEventHandler<HTMLButtonElement>;
  setModal: (name: string) => void;
  nav: {
    prev: string;
    goBack: () => void;
  };
  state: {
    activities: Activity[] | undefined;
    current: Activity | undefined;
    setActivities: (data: Activity[] | undefined) => void;
    setCurrent: (data: Activity | undefined) => void;
  };
}

export const UpdateActivityModal = (props: ModalProps) => {
  const pxl = window.innerWidth / 1920;

  const [openDropdown, setDropdown] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    time_limit: undefined;
    modifiers: Partial<Modifiers>;
  }>({
    name: props.state.current ? props.state.current.name : "",
    time_limit: undefined,
    modifiers: props.state.current // remove null modifiers
      ? Object.fromEntries(
          Object.entries(props.state.current.modifiers).filter(
            ([_, value]) => value
          )
        )
      : {},
  });

  const [statModifiers, setStatModifiers] = useState<string[]>(
    props.state.current ? Object.keys(formData.modifiers) : []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeModifier = (e: React.MouseEvent<HTMLButtonElement>) => {
    setFormData({
      ...formData,
      modifiers: {
        ...formData.modifiers,
        [e.currentTarget.name]: parseFloat(e.currentTarget.value) ?? 1,
      },
    });
  };

  const addModifier = (stat: string) => {
    if (allowedStats.includes(stat)) {
      setStatModifiers([...statModifiers, stat]);
      setDropdown(false);
    }
  };

  const handleCreate = async () => {
    // Remove modifiers that won't affect the decay
    const result = await createActivity({
      ...formData,
      modifiers: Object.fromEntries(
        Object.entries(formData.modifiers).filter(([_, value]) => value !== 1)
      ),
    });
    if (result.status === 200) {
      // TODO: add activity from result to activities
      // If previous modal was "set", display created activity in dropdown
      if (props.nav.prev === "set") props.state.setCurrent(result.activity);
      if (result.activity)
        props.state.setActivities([
          ...(props.state.activities ?? []),
          result.activity,
        ]);
      props.nav.goBack();
    }
  };

  const handleUpdate = async () => {
    if (props.state.current) {
      const result = await updateActivity(props.state.current.id, {
        ...formData,
        // TODO: change modifiers that have no effect to null
        modifiers: Object.fromEntries(
          Object.entries(formData.modifiers).filter(([_, value]) => value !== 1)
        ),
      });
      if (result.status === 200) {
        props.state.setActivities(undefined);
        props.state.setCurrent(undefined);
        props.nav.goBack();
      }
    }
  };

  return (
    <div className="flex-1 flex relative">
      <ModalButton onClick={props.nav.goBack} right={52 * pxl} />
      <ModalButton onClick={props.exit} />
      <div
        className="flex flex-col w-full"
        style={{
          gap: pxl * 10,
          padding: pxl * 20,
        }}
      >
        <div
          className="flex flex-col"
          style={{ gap: pxl * 5, padding: pxl * 10 }}
        >
          <div
            className="flex justify-start leading-none text-gray-400"
            style={{
              height: pxl * 39,
              fontSize: pxl * 36,
              fontFamily: "'pxlLarge', monospace",
            }}
          >
            {props.state.current ? Strings.edit_activity : Strings.new_activity}
          </div>
          <div
            className="flex leading-none text-gray-400"
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
            }}
          >
            {Strings.new_activity_desc}
          </div>
        </div>
        <Input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />
        <div
          className="flex-1 flex flex-col"
          style={{ marginTop: pxl * 15, gap: pxl * 10 }}
        >
          <div className="flex w-full justify-between items-end">
            <div
              className="flex justify-start leading-none text-gray-400"
              style={{
                height: pxl * 26,
                fontSize: pxl * 24,
                fontFamily: "'pxlLarge', monospace",
              }}
            >
              {Strings.activity_modifiers}
            </div>
            <AddNewButton
              onClick={() => {
                setDropdown(!openDropdown);
              }}
            />
          </div>
          <div
            className="w-full flex bg-gray-400"
            style={{ height: pxl * 5 }}
          />
          <div className="flex-1 flex relative">
            {openDropdown ? (
              <StatDropdown
                onClick={addModifier}
                options={allowedStats.filter(
                  (item) => !statModifiers.includes(item)
                )}
              />
            ) : null}
            <div
              className="flex-1 flex flex-col overflow-y-auto"
              style={{
                maxHeight: pxl * 290,
                gap: pxl * 15,
                marginTop: pxl * 10,
              }}
            >
              {statModifiers.map((option) => (
                <div key={option} className="flex">
                  <StatModifier
                    stat={option}
                    value={
                      formData.modifiers[
                        option as keyof typeof formData.modifiers
                      ] ?? 0
                    }
                    onClick={handleChangeModifier}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <SettingsButton
          text={props.state.current ? "update" : "create_activity"}
          onClick={props.state.current ? handleUpdate : handleCreate}
        />
      </div>
    </div>
  );
};

interface StatDropdownProps {
  options: string[];
  onClick: (option: string) => void;
}

const StatDropdown = (props: StatDropdownProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <div
      className="absolute top-0 right-0 flex flex-col self-end bg-gray-400"
      style={{
        width: pxl * 160,
        gap: pxl * 3,
        padding: pxl * 3,
      }}
    >
      {props.options.map((option) => (
        <button
          key={option}
          className="w-full flex items-center bg-gray-300 hover:bg-gray-400 text-gray-400 hover:text-gray-600 cursor-pointer"
          style={{
            height: pxl * 24,
            paddingLeft: pxl * 5,
          }}
          onClick={() => {
            props.onClick(option);
          }}
        >
          <div
            className="w-full flex justify-start leading-none "
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
            }}
          >
            {Strings[option]}
          </div>
        </button>
      ))}
    </div>
  );
};
