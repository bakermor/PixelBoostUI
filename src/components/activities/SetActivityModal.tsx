import { useContext, useState } from "react";
import { startActivity } from "../../api/ActivitiesApi";
import { Activity } from "../../api/AuthApi";
import { updateHealth } from "../../api/HealthApi";
import { Strings } from "../../constants/Strings";
import { AuthContext } from "../../context/AuthProvider";
import { StatUpdateContext } from "../../context/StatUpdateProvider";
import { ModalButton, SettingsButton } from "../Buttons";
import { StatModifier } from "./StatModifier";

interface ModalProps {
  exit: () => void;
  setModal: (name: string) => void;
  nav: {
    setPrev: (prev: string) => void;
    goBack: () => void;
  };
  state: {
    activities: Activity[] | undefined;
    current: Activity | undefined;
    setActivities: (data: Activity[] | undefined) => void;
    setCurrent: (data: Activity | undefined) => void;
  };
}

export const SetActivityModal = (props: ModalProps) => {
  const pxl = window.innerWidth / 1920;
  const { health, loading } = useContext(StatUpdateContext);
  const { updateAuth } = useContext(AuthContext);

  const [openDropdown, setDropdown] = useState(false);

  const chooseActivity = (option: Activity) => {
    props.state.setCurrent(option);
    setDropdown(false);
  };

  const clickCreate = () => {
    props.nav.setPrev("set");
    props.setModal("create");
  };

  const handleSubmit = async () => {
    // Update levels first so there is no conflict with the activity modifiers
    if (!loading && health && props.state.current) {
      const update = await updateHealth({
        energy: {
          current_level: health.energy,
          last_updated: Date.now() / 1000,
        },
        hunger: {
          current_level: health.hunger,
          last_updated: Date.now() / 1000,
        },
        thirst: {
          current_level: health.thirst,
          last_updated: Date.now() / 1000,
        },
        fun: {
          current_level: health.fun,
          last_updated: Date.now() / 1000,
        },
        social: {
          current_level: health.social,
          last_updated: Date.now() / 1000,
        },
        hygiene: {
          current_level: health.hygiene,
          last_updated: Date.now() / 1000,
        },
      });

      // Start Activity
      const result = await startActivity(props.state.current.id, {
        start_time: Date.now() / 1000,
      });

      if (update.status === 200 && result.status === 204) {
        props.exit();
        await updateAuth();
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
          gap: pxl * 35,
          padding: pxl * 15,
          paddingTop: pxl * 25,
        }}
      >
        <div
          className="flex flex-col"
          style={{ gap: pxl * 5, padding: pxl * 5 }}
        >
          <div
            className="flex justify-start leading-none text-gray-400"
            style={{
              height: pxl * 39,
              fontSize: pxl * 36,
              fontFamily: "'pxlLarge', monospace",
            }}
          >
            {Strings.set_activity}
          </div>
          <div
            className="flex leading-none text-gray-400"
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
            }}
          >
            {Strings.set_activity_desc}
          </div>
        </div>
        <div className="w-full flex flex-col" style={{ padding: pxl * 10 }}>
          <button
            className="w-full flex justify-between items-center bg-gray-300 cursor-pointer"
            style={{
              height: pxl * 55,
              paddingRight: pxl * 10,
              paddingLeft: pxl * 10,
              gap: pxl * 10,
            }}
            onClick={() => setDropdown(!openDropdown)}
          >
            <div
              className={`flex-1 flex leading-none overflow-clip ${
                props.state.current ? "text-gray-600" : "text-gray-400"
              }`}
              style={{
                height: pxl * 18,
                fontSize: pxl * 16,
                fontFamily: "'pxlSmall', monospace",
              }}
            >
              {props.state.current
                ? props.state.current.name
                : Strings.set_activity_placeholder}
            </div>
            <div className="" style={{ width: pxl * 25, height: pxl * 25 }} />
          </button>
          <div className="flex relative w-full">
            {openDropdown ? (
              <FullDropdown
                options={props.state.activities}
                focused={props.state.current?.id}
                create={{ name: "create_act_drop", onClick: clickCreate }}
                onClick={chooseActivity}
              />
            ) : null}
          </div>
        </div>
        <div className="flex-1 flex">
          {props.state.current ? (
            <ActivityDisplay activity={props.state.current} />
          ) : null}
        </div>
        <SettingsButton text="submit" onClick={handleSubmit} />
      </div>
    </div>
  );
};

interface DropdownProps {
  options: Activity[] | undefined;
  focused?: string;
  create?: { name: string; onClick: () => void };
  onClick: (option: Activity) => void;
}

const FullDropdown = (props: DropdownProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <div
      className="absolute top-0 left-0 w-full flex flex-col bg-gray-400"
      style={{
        gap: pxl * 3,
        padding: pxl * 3,
      }}
    >
      {props.create ? (
        <button
          className="w-full flex bg-gray-300 hover:bg-gray-400 text-gray-400 hover:text-gray-600 items-center cursor-pointer"
          style={{
            paddingRight: pxl * 10,
            paddingLeft: pxl * 10,
            height: pxl * 30,
          }}
          onClick={props.create.onClick}
        >
          <div
            className="flex-1 flex leading-none overflow-clip "
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
            }}
          >
            {Strings[props.create.name]}
          </div>
        </button>
      ) : null}

      {props.options?.map((option) => (
        <button
          key={option.id}
          className={`w-full flex ${
            props.focused === option.id
              ? "bg-gray-400 hover:bg-gray-500"
              : "bg-gray-300 hover:bg-gray-400"
          } items-center cursor-pointer`}
          style={{
            paddingRight: pxl * 10,
            paddingLeft: pxl * 10,
            height: pxl * 30,
          }}
          onClick={() => props.onClick(option)}
        >
          <div
            className="flex-1 flex leading-none overflow-clip text-gray-600"
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
            }}
          >
            {option.name}
          </div>
        </button>
      ))}
    </div>
  );
};

interface ActivityDisplayProps {
  activity: Activity;
}

const ActivityDisplay = (props: ActivityDisplayProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <div className="flex-1 flex flex-col" style={{ gap: pxl * 5 }}>
      <div
        className="flex justify-start leading-none text-gray-400"
        style={{
          height: pxl * 26,
          fontSize: pxl * 24,
          fontFamily: "'pxlLarge', monospace",
        }}
      >
        {props.activity.name}
      </div>
      <div className="w-full flex bg-gray-400" style={{ height: pxl * 5 }} />
      <div
        className="flex-1 flex flex-col overflow-y-auto"
        style={{
          maxHeight: pxl * 285,
          marginTop: pxl * 15,
          gap: pxl * 15,
        }}
      >
        {Object.entries(props.activity.modifiers).map(([key, value]) =>
          value ? (
            <div key={key} className="flex pointer-events-none">
              <StatModifier stat={key} value={value ?? 0} onClick={() => {}} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
