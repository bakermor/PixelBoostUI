import { useEffect, useState } from "react";
import { getActivities } from "../../api/ActivitiesApi";
import { Activity } from "../../api/AuthApi";
import { BaseModal } from "../Modals";
import { MyActivitiesModal } from "./MyActivitiesModal";
import { SetActivityModal } from "./SetActivityModal";
import { UpdateActivityModal } from "./UpdateActivityModal";

interface ModalProps {
  exit: () => void;
}

export const ActivityModal = (props: ModalProps) => {
  const [modal, setModal] = useState("all");
  const [prev, setPrev] = useState("");

  const [activities, setActivities] = useState<Activity[] | undefined>(
    undefined
  );
  const [current, setCurrent] = useState<Activity | undefined>(undefined);

  const modalProps = { exit: props.exit, setModal: setModal };

  const goBack = () => {
    setModal(prev);
    setPrev("all");
  };

  useEffect(() => {
    const getActivitiesList = async () => {
      const result = await getActivities();
      if (result.status === 200 && result.activityList)
        setActivities(result.activityList);
    };

    if (!activities) {
      getActivitiesList();
    }
  }, [activities]);

  return (
    <BaseModal {...props}>
      {modal === "all" ? (
        <MyActivitiesModal
          {...modalProps}
          nav={{ setPrev }}
          state={{ activities, current, setActivities, setCurrent }}
        />
      ) : modal === "create" ? (
        <UpdateActivityModal
          {...modalProps}
          nav={{ prev, goBack }}
          state={{
            activities,
            current: undefined,
            setActivities,
            setCurrent,
          }}
        />
      ) : modal === "edit" ? (
        <UpdateActivityModal
          {...modalProps}
          nav={{ prev, goBack }}
          state={{
            activities,
            current,
            setActivities,
            setCurrent,
          }}
        />
      ) : modal === "set" ? (
        <SetActivityModal
          {...modalProps}
          nav={{ setPrev, goBack }}
          state={{ activities, current, setActivities, setCurrent }}
        />
      ) : null}
    </BaseModal>
  );
};
