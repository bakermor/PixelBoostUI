import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { createActivity, updateActivity } from "../../api/ActivitiesApi";
import { allowedStats } from "../../constants/StatConstants";
import { Strings } from "../../constants/Strings";
import { Activity, Modifiers } from "../../models/User";
import { IconButton, NewDefaultButton, SmallButton } from "../Buttons";
import { Input } from "../Input";
import { StatModifier } from "./ActivityDisplay";

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
        modifiers: formData.modifiers,
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
      <div className="absolute flex right-0 top-0 gap-2">
        <IconButton onClick={props.nav.goBack}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={props.exit}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="flex flex-col w-full gap-4 p-3 pt-2">
        <div className="flex flex-col gap-1 p-2">
          <div className="kameron mt-3 w-full leading-none whitespace-nowrap text-4xl text-[#000000]">
            {props.state.current ? Strings.edit_activity : Strings.new_activity}
          </div>
          <div className="sans w-full leading-none whitespace-nowrap text-[#919191]">
            {Strings.new_activity_desc}
          </div>
        </div>
        <div className="flex flex-col w-full relative mt-2">
          <div className="absolute right-0 -top-3">
            <SmallButton
              text={Strings.select}
              onClick={handleSet}
              variant="activity"
            />
          </div>

          <Input
            name="act_name"
            type="text"
            value={formData.act_name}
            onChange={handleChange}
            variant="activity"
          />
        </div>
        <div className="flex-1 flex flex-col mt-2 gap-2">
          <div className="flex w-full justify-between items-end">
            <div className="kameron flex leading-none font-semibold text-2xl text-[#C957BC]">
              {Strings.activity_modifiers}
            </div>
            <IconButton
              onClick={() => {
                setDropdown(!openDropdown);
              }}
              variant="add"
              focused={openDropdown}
            >
              <AddIcon />
            </IconButton>
          </div>
          <div className="w-full h-1 rounded-lg bg-[#752092]" />
          <div className="flex-1 flex relative overflow-clip">
            {openDropdown ? (
              <StatDropdown
                onClick={addModifier}
                options={allowedStats.filter(
                  (item) => !statModifiers.includes(item)
                )}
              />
            ) : null}
            <div className="flex-1 max-h-54 flex flex-col p-2 mt-1 gap-3 overflow-y-auto overflow-x-clip scrollbar scrollbar-thumb-[#FFC872] scrollbar-track-[#FFF0A6]">
              {statModifiers.map((option) => (
                <StatModifier
                  key={option}
                  stat={option}
                  value={
                    formData.modifiers[
                      option as keyof typeof formData.modifiers
                    ] ?? 0
                  }
                  onClick={handleChangeModifier}
                />
              ))}
            </div>
          </div>
        </div>
        <NewDefaultButton
          text={props.state.current ? Strings.update : Strings.create_activity}
          onClick={props.state.current ? handleUpdate : handleCreate}
          size="large"
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
    <div className="absolute top-0 right-0 w-32 flex flex-col self-end border-3 border-[#C957BC]">
      {props.options.map((option) => (
        <NewDefaultButton
          key={option}
          text={Strings[option]}
          onClick={() => {
            props.onClick(option);
          }}
          variant="dropdown"
          size="2xs"
          align="left"
        />
      ))}
    </div>
  );
};
