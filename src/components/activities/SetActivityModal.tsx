import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { startActivity } from "../../api/ActivitiesApi";
import { updateHealth } from "../../api/HealthApi";
import { Strings } from "../../constants/Strings";
import { AuthContext } from "../../context/AuthProvider";
import { StatUpdateContext } from "../../context/StatUpdateProvider";
import { Activity } from "../../models/User";
import { createHealthUpdate } from "../../utils/createHealthUpdate";
import { IconButton, DefaultButton } from "../Buttons";
import { ActivityDisplay } from "./ActivityDisplay";

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
      <div className="absolute flex right-0 top-0 gap-2">
        <IconButton onClick={props.nav.goBack}>
          <ArrowBackIcon fontSize="large" />
        </IconButton>
        <IconButton onClick={props.exit}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="flex flex-col w-full gap-6 p-3 pt-2">
        <div className="flex flex-col gap-1 p-2">
          <div className="kameron mt-3 w-full leading-none whitespace-nowrap text-4xl text-[#000000]">
            {Strings.set_activity}
          </div>
          <div className="sans w-full leading-none whitespace-nowrap text-[#919191]">
            {Strings.set_activity_desc}
          </div>
        </div>
        <div className="w-full flex flex-col p-2">
          <button
            className={`w-full h-12 pl-3 pr-1 gap-2 flex justify-between items-center cursor-pointer bg-[#FFF0A6] border-3 hover:border-[#C957BC] ${
              openDropdown
                ? "border-[#C957BC] rounded-t-sm"
                : "border-[#FFC872] rounded-sm"
            } transition-colors duration-300`}
            onClick={() => setDropdown(!openDropdown)}
          >
            <div
              className={`sans flex-1 flex leading-none whitespace-nowrap overflow-x-clip ${
                props.state.current ? "text-[#752092]" : "text-[#C957BC]"
              }`}
            >
              {props.state.current
                ? props.state.current.name
                : Strings.set_activity_placeholder}
            </div>
            <ArrowDropDownIcon
              className="text-[#C957BC] hover:text-[#752092]"
              fontSize="large"
            />
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
        <div className="flex-1 flex overflow-clip">
          {props.state.current ? (
            <ActivityDisplay activity={props.state.current} />
          ) : null}
        </div>
        <DefaultButton
          text={Strings.submit}
          onClick={handleSubmit}
          size="large"
        />
      </div>
    </div>
  );
};

interface DropdownProps {
  options: Activity[] | undefined;
  onClick: (option: Activity) => void;

  focused?: string;
  create?: { name: string; onClick: () => void };
}

const FullDropdown = (props: DropdownProps) => {
  return (
    <div className="absolute top-0 left-0 w-full max-h-75 flex overflow-clip">
      <div className="w-full flex flex-col border-3 border-t-0 border-[#C957BC] overflow-y-auto overflow-x-clip scrollbar-hide">
        {props.create ? (
          <DefaultButton
            text={Strings[props.create.name]}
            onClick={props.create.onClick}
            variant="dropdown_ph"
            size="xs"
            align="left"
          />
        ) : null}

        {props.options?.map((option) => (
          <DefaultButton
            key={option.id}
            text={option.name}
            onClick={() => {
              props.onClick(option);
            }}
            variant="dropdown"
            size="xs"
            align="left"
          />
        ))}
      </div>
    </div>
  );
};
