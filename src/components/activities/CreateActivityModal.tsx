import { useState } from "react";
import { allowedStats } from "../../constants/StatConstants";
import { Strings } from "../../constants/Strings";
import { AddNewButton, ExitModalButton, SettingsButton } from "../Buttons";
import { Input } from "../Input";
import { BaseModal } from "../Modals";
import { StatModifier } from "./StatModifier";
import { createActivity } from "../../api/ActivitiesApi";

interface ModalProps {
  exit: React.MouseEventHandler<HTMLButtonElement>;
  setModal: (name: string) => void;
  next: string;
}

export const CreateActivityModal = (props: ModalProps) => {
  const pxl = window.innerWidth / 1920;

  const [chooseStat, setChooseStat] = useState(false);

  const [statModifiers, setStatModifiers] = useState<string[]>([]);
  const [formData, setFormData] = useState<{
    name: string;
    time_limit: undefined;
    modifiers: Record<string, number>;
  }>({
    name: "",
    time_limit: undefined,
    modifiers: {},
  });

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
      setChooseStat(false);
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
      props.setModal(props.next);
    }
  };

  return (
    <BaseModal {...props}>
      <ExitModalButton onClick={props.exit} />
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
            {Strings.new_activity}
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
                setChooseStat(!chooseStat);
              }}
            />
          </div>
          <div
            className="w-full flex bg-gray-400"
            style={{ height: pxl * 5 }}
          />
          <div className="flex-1 flex relative">
            {chooseStat ? (
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
                    value={formData.modifiers[option] ?? 0}
                    onClick={handleChangeModifier}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <SettingsButton text="create_activity" onClick={handleCreate} />
      </div>
    </BaseModal>
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
