import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { useContext } from "react";
import { stopActivity } from "../../api/ActivitiesApi";
import { updateHealth } from "../../api/HealthApi";
import { Strings } from "../../constants/Strings";
import { AuthContext } from "../../context/AuthProvider";
import { StatUpdateContext } from "../../context/StatUpdateProvider";
import { Activity } from "../../models/User";
import { createHealthUpdate } from "../../utils/createHealthUpdate";
import { IconButton, NewDefaultButton } from "../Buttons";
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

export const CurrentActivityModal = (props: ModalProps) => {
  const { health, loading } = useContext(StatUpdateContext);
  const { user, updateAuth } = useContext(AuthContext);

  const clickSet = () => {
    props.nav.setPrev("current");
    props.setModal("set");
  };

  const handleSubmit = async () => {
    // Update levels first so there is no conflict with the activity modifiers
    if (!loading && health && user?.current_activity) {
      const update = await updateHealth(createHealthUpdate(health));

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
            {Strings.current_activity}
          </div>
          <div className="sans w-full leading-none whitespace-nowrap text-[#919191]">
            {Strings.current_activity_desc}
          </div>
        </div>
        <NewDefaultButton
          text={Strings.choose_activity}
          onClick={clickSet}
          variant="inverted"
          size="large"
        />
        <div className="flex-1 flex overflow-clip">
          {user && user.current_activity ? (
            <ActivityDisplay activity={user.current_activity} />
          ) : null}
        </div>
        {user && user.current_activity ? (
          <NewDefaultButton
            text={Strings.stop_activity}
            onClick={handleSubmit}
            size="large"
          />
        ) : null}
      </div>
    </div>
  );
};
