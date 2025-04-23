import { useEffect, useState } from "react";
import { getActivities } from "../../api/ActivitiesApi";
import { Activity } from "../../api/AuthApi";
import { Strings } from "../../constants/Strings";
import { ActionButton, AddNewButton, SettingsButton } from "../Buttons";
import { BaseModal } from "../Modals";

interface ModalProps {
  exit: React.MouseEventHandler<HTMLButtonElement>;
  setModal: (name: string) => void;
}

export const MyActivitiesModal = (props: ModalProps) => {
  const pxl = window.innerWidth / 1920;

  const [activitiesList, setActivitiesList] = useState<Activity[] | undefined>(
    undefined
  );

  const newActivity = () => {
    props.setModal("create_activity");
  };

  useEffect(() => {
    const getActivitiesList = async () => {
      const result = await getActivities();
      if (result.status === 200) setActivitiesList(result.activityList);
    };

    getActivitiesList();
  }, []);

  return (
    <BaseModal {...props}>
      <div
        className={`flex-1 flex flex-col ${
          !activitiesList ? "cursor-progress" : ""
        }`}
        style={{
          gap: pxl * 40,
          marginTop: 50 * pxl,
          marginLeft: 15 * pxl,
          marginRight: 15 * pxl,
        }}
      >
        <div
          className="flex"
          style={{ marginLeft: pxl * 5, marginRight: pxl * 5 }}
        >
          <SettingsButton text="choose_activity" onClick={() => {}} />
        </div>
        <div className="flex-1 flex flex-col" style={{ gap: pxl * 8 }}>
          <div className="flex w-full justify-between items-end">
            <div
              className="flex justify-start leading-none text-gray-400"
              style={{
                height: pxl * 26,
                fontSize: pxl * 24,
                fontFamily: "'pxlLarge', monospace",
              }}
            >
              {Strings.set_activity}
            </div>
            <AddNewButton onClick={newActivity} />
          </div>
          <div className="w-full bg-gray-400" style={{ height: pxl * 5 }} />
          <div
            className="flex-1 flex flex-col bg-gray-200 overflow-y-auto"
            style={{ gap: pxl * 5 }}
          >
            {activitiesList?.map((activity) => (
              <div className="flex" key={activity.id}>
                <ActionButton text={activity.name} onClick={() => {}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
