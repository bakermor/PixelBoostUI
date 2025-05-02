import { useContext } from "react";
import { stopActivity } from "../../api/ActivitiesApi";
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

export const CurrentActivityModal = (props: ModalProps) => {
  const pxl = window.innerWidth / 1920;
  const { health, loading } = useContext(StatUpdateContext);
  const { user, updateAuth } = useContext(AuthContext);

  const clickSet = () => {
    props.nav.setPrev("current");
    props.setModal("set");
  };

  const handleSubmit = async () => {
    // Update levels first so there is no conflict with the activity modifiers
    if (!loading && health && user?.current_activity) {
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

      // Stop Activity
      const result = await stopActivity(user.current_activity.id);
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
            {Strings.current_activity}
          </div>
          <div
            className="flex leading-none text-gray-400"
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
            }}
          >
            {Strings.current_activity_desc}
          </div>
        </div>
        <SettingsButton text="choose_activity" onClick={clickSet} />
        <div className="flex-1 flex">
          {user && user.current_activity ? (
            <ActivityDisplay activity={user.current_activity} />
          ) : null}
        </div>
        {user && user.current_activity ? (
          <SettingsButton text="stop_activity" onClick={handleSubmit} />
        ) : null}
      </div>
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
