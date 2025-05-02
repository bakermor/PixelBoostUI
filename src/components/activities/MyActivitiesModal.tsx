import { useState } from "react";
import { deleteActivity } from "../../api/ActivitiesApi";
import { Activity } from "../../api/AuthApi";
import { Strings } from "../../constants/Strings";
import {
  ActionButton,
  AddNewButton,
  ConfirmDeleteButton,
  SettingsButton,
} from "../Buttons";

interface ModalProps {
  exit: React.MouseEventHandler<HTMLButtonElement>;
  setModal: (name: string) => void;
  nav: {
    setPrev: (name: string) => void;
  };
  state: {
    activities: Activity[] | undefined;
    current: Activity | undefined;
    setActivities: (data: Activity[] | undefined) => void;
    setCurrent: (data: Activity | undefined) => void;
  };
}

export const MyActivitiesModal = (props: ModalProps) => {
  const pxl = window.innerWidth / 1920;

  const [deletePopup, setPopup] = useState<Activity | undefined>(undefined);

  const nextModal = (next: string) => {
    if (props.state.current) props.state.setCurrent(undefined);
    props.nav.setPrev("all");
    props.setModal(next);
  };

  const editActivity = (activity: Activity) => {
    props.state.setCurrent(activity);
    props.nav.setPrev("all");
    props.setModal("edit");
  };

  const cancelDelete = () => {
    setPopup(undefined);
  };

  const handleDelete = async () => {
    if (deletePopup) {
      const result = await deleteActivity(deletePopup.id);
      if (result.status === 204) {
        setPopup(undefined);
        props.state.setActivities(
          props.state.activities?.filter((item) => item.id !== deletePopup.id)
        );
      }
    }
  };

  return (
    <div className="flex-1 flex">
      <div
        className={`flex-1 flex flex-col ${
          !props.state.activities ? "cursor-progress" : ""
        }`}
        style={{
          gap: pxl * 40,
          marginTop: 40 * pxl,
          marginLeft: 15 * pxl,
          marginRight: 15 * pxl,
        }}
      >
        <div
          className="flex"
          style={{ marginLeft: pxl * 5, marginRight: pxl * 5 }}
        >
          <SettingsButton
            text="now_activity"
            onClick={() => {
              nextModal("current");
            }}
          />
        </div>
        <div className="flex-1 flex flex-col relative" style={{ gap: pxl * 8 }}>
          {deletePopup ? (
            <Popup
              name={deletePopup.name}
              cancel={cancelDelete}
              onClick={handleDelete}
            />
          ) : null}
          <div className="flex w-full justify-between items-end">
            <div
              className="flex justify-start leading-none text-gray-400"
              style={{
                height: pxl * 26,
                fontSize: pxl * 24,
                fontFamily: "'pxlLarge', monospace",
              }}
            >
              {Strings.my_activity}
            </div>
            <AddNewButton
              onClick={() => {
                nextModal("create");
              }}
            />
          </div>
          <div className="w-full bg-gray-400" style={{ height: pxl * 5 }} />
          <div
            className="flex-1 flex flex-col bg-gray-200 overflow-y-auto"
            style={{ gap: pxl * 5, maxHeight: pxl * 490 }}
          >
            {props.state.activities?.map((activity) => (
              <div
                className="flex"
                style={{ maxWidth: pxl * 390 }}
                key={activity.id}
              >
                <ActionButton
                  text={activity.name}
                  icon={{
                    onClick: () => {
                      setPopup(activity);
                    },
                  }}
                  onClick={() => {
                    editActivity(activity);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface PopupProps {
  name: string;
  cancel: () => void;
  onClick: () => void;
}

const Popup = (props: PopupProps) => {
  const pxl = window.innerWidth / 1920;
  return (
    <div className="absolute w-full h-full flex justify-center">
      <div
        className="bg-white flex flex-col"
        style={{
          width: pxl * 300,
          height: pxl * 150,
          marginTop: pxl * 88,
          padding: pxl * 20,
          gap: pxl * 10,
        }}
      >
        <div
          className="flex-1 flex flex-col items-center overflow-clip"
          style={{ gap: pxl * 10 }}
        >
          <div
            className="flex justify-start leading-none text-gray-400"
            style={{
              height: pxl * 26,
              fontSize: pxl * 24,
              fontFamily: "'pxlLarge', monospace",
            }}
          >
            {Strings.delete}:
          </div>
          <div
            className="max-w-full flex leading-none whitespace-nowrap text-gray-400"
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
            }}
          >
            {props.name}
          </div>
        </div>
        <div
          className="flex w-full justify-between"
          style={{
            gap: pxl * 10,
            paddingRight: pxl * 15,
            paddingLeft: pxl * 15,
          }}
        >
          <ConfirmDeleteButton text="cancel" onClick={props.cancel} />
          <ConfirmDeleteButton text="delete" onClick={props.onClick} />
        </div>
      </div>
    </div>
  );
};
