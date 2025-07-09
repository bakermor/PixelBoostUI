import { useContext, useState } from "react";
import { startActivity } from "../../api/ActivitiesApi";
import { updateHealth } from "../../api/HealthApi";
import { Strings } from "../../constants/Strings";
import { Colors, pxl } from "../../constants/ThemeConstants";
import { AuthContext } from "../../context/AuthProvider";
import { StatUpdateContext } from "../../context/StatUpdateProvider";
import { Activity } from "../../models/User";
import { createHealthUpdate } from "../../utils/createHealthUpdate";
import { DefaultButton, DefaultIconButton } from "../Buttons";
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
      const update = await updateHealth(createHealthUpdate(health));

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
            className="flex justify-start leading-none"
            style={{
              height: pxl * 39,
              fontSize: pxl * 36,
              fontFamily: "'pxlLarge', monospace",
              color: Colors.a5,
            }}
          >
            {Strings.set_activity}
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
            {Strings.set_activity_desc}
          </div>
        </div>
        <div className="w-full flex flex-col" style={{ padding: pxl * 10 }}>
          <button
            className="w-full flex justify-between items-center cursor-pointer"
            style={{
              height: pxl * 55,
              paddingRight: pxl * 10,
              paddingLeft: pxl * 10,
              gap: pxl * 10,
              backgroundColor: Colors.a3,
            }}
            onClick={() => setDropdown(!openDropdown)}
          >
            <div
              className="flex-1 flex leading-none overflow-clip"
              style={{
                height: pxl * 18,
                fontSize: pxl * 16,
                fontFamily: "'pxlSmall', monospace",
                color: props.state.current ? Colors.p1 : Colors.a1,
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
        <DefaultButton
          text={Strings.submit}
          onClick={handleSubmit}
          colors={[Colors.a5, Colors.a4, Colors.a2, Colors.p1]}
        />
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
  return (
    <div
      className="absolute top-0 left-0 w-full flex flex-col"
      style={{
        gap: pxl * 3,
        padding: pxl * 3,
        backgroundColor: Colors.a6,
      }}
    >
      {props.create ? (
        <DefaultButton
          text={Strings[props.create.name]}
          onClick={props.create.onClick}
          size={30}
          alignLeft={true}
          colors={[Colors.a2, Colors.a3, Colors.a4, Colors.a2]}
        />
      ) : null}

      {props.options?.map((option) => (
        <div key={option.id} className="flex">
          <DefaultButton
            text={option.name}
            onClick={() => {
              props.onClick(option);
            }}
            size={30}
            alignLeft={true}
            colors={[Colors.a2, Colors.a3, Colors.a5, Colors.p1]}
          />
        </div>
      ))}
    </div>
  );
};

interface ActivityDisplayProps {
  activity: Activity;
}

const ActivityDisplay = (props: ActivityDisplayProps) => {
  return (
    <div className="flex-1 flex flex-col" style={{ gap: pxl * 5 }}>
      <div
        className="flex justify-start leading-none"
        style={{
          height: pxl * 26,
          fontSize: pxl * 24,
          fontFamily: "'pxlLarge', monospace",
          color: Colors.p6,
        }}
      >
        {props.activity.name}
      </div>
      <div
        className="w-full flex"
        style={{ height: pxl * 5, backgroundColor: Colors.p4 }}
      />
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
