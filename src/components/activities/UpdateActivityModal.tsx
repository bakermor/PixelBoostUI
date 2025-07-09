import { useState } from "react";
import { createActivity, updateActivity } from "../../api/ActivitiesApi";
import { Activity, Modifiers } from "../../models/User";
import { allowedStats } from "../../constants/StatConstants";
import { Strings } from "../../constants/Strings";
import { Colors, pxl } from "../../constants/ThemeConstants";
import { DefaultButton, DefaultIconButton } from "../Buttons";
import { Input } from "../Input";
import { StatModifier } from "./StatModifier";

interface ModalProps {
  exit: React.MouseEventHandler<HTMLButtonElement>;
  setModal: (name: string) => void;
  nav: {
    prev: string;
    setPrev: (name: string) => void;
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
  const [openDropdown, setDropdown] = useState(false);
  const [formData, setFormData] = useState<{
    act_name: string;
    time_limit: undefined;
    modifiers: Partial<Modifiers>;
  }>({
    act_name: props.state.current ? props.state.current.name : "",
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

  const handleSet = () => {
    props.nav.setPrev("all");
    props.setModal("set");
  };

  const handleCreate = async () => {
    // Remove modifiers that won't affect the decay
    const result = await createActivity({
      ...formData,
      name: formData.act_name,
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
      <div
        className="absolute flex"
        style={{
          right: pxl * 5,
          top: pxl * 5,
          gap: pxl * 8,
        }}
      >
        <DefaultIconButton
          onClick={props.nav.goBack}
          size={[40]}
          colors={[Colors.p4, Colors.p6]}
        />
        <DefaultIconButton
          onClick={props.exit}
          size={[40]}
          colors={[Colors.p4, Colors.p6]}
        />
      </div>
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
            className="flex justify-start leading-none"
            style={{
              height: pxl * 39,
              fontSize: pxl * 36,
              fontFamily: "'pxlLarge', monospace",
              color: Colors.a5,
            }}
          >
            {props.state.current ? Strings.edit_activity : Strings.new_activity}
          </div>
          <div
            className="flex leading-none"
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
              color: Colors.a3,
            }}
          >
            {Strings.new_activity_desc}
          </div>
        </div>
        <div className="flex flex-col w-full relative">
          <div className="absolute right-0">
            <DefaultIconButton
              onClick={handleSet}
              size={[50, 30]}
              colors={[Colors.p4, Colors.p5]}
            />
          </div>

          <Input
            name="act_name"
            type="text"
            value={formData.act_name}
            onChange={handleChange}
            colors={[Colors.a5, Colors.a2, Colors.a6, Colors.a3]}
          />
        </div>
        <div
          className="flex-1 flex flex-col"
          style={{ marginTop: pxl * 15, gap: pxl * 10 }}
        >
          <div className="flex w-full justify-between items-end">
            <div
              className="flex justify-start leading-none"
              style={{
                height: pxl * 26,
                fontSize: pxl * 24,
                fontFamily: "'pxlLarge', monospace",
                color: Colors.p6,
              }}
            >
              {Strings.activity_modifiers}
            </div>
            <DefaultIconButton
              onClick={() => {
                setDropdown(!openDropdown);
              }}
              size={[50, 30]}
              colors={[Colors.p4, Colors.p5]}
            />
          </div>
          <div
            className="w-full flex"
            style={{ height: pxl * 5, backgroundColor: Colors.p4 }}
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
        <DefaultButton
          text={props.state.current ? Strings.update : Strings.create_activity}
          onClick={props.state.current ? handleUpdate : handleCreate}
          colors={[Colors.a5, Colors.a3, Colors.a2, Colors.p1]}
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
  return (
    <div
      className="absolute top-0 right-0 flex flex-col self-end"
      style={{
        width: pxl * 160,
        gap: pxl * 3,
        padding: pxl * 3,
        backgroundColor: Colors.a6,
      }}
    >
      {props.options.map((option) => (
        <div key={option} className="flex">
          <DefaultButton
            text={Strings[option]}
            onClick={() => {
              props.onClick(option);
            }}
            size={26}
            alignLeft
            colors={[Colors.a2, Colors.a3, Colors.a5, Colors.p1]}
          />
        </div>
      ))}
    </div>
  );
};
