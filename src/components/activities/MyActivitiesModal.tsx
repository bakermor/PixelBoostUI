import { useState } from "react";
import { deleteActivity } from "../../api/ActivitiesApi";
import { Strings } from "../../constants/Strings";
import { Colors, pxl } from "../../constants/ThemeConstants";
import { Activity } from "../../models/User";
import { DefaultButton, DefaultIconButton } from "../Buttons";

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
          <DefaultButton
            text={Strings.now_activity}
            onClick={() => {
              nextModal("current");
            }}
            colors={[Colors.a5, Colors.a3, Colors.a2, Colors.p1]}
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
              className="flex justify-start leading-none"
              style={{
                height: pxl * 26,
                fontSize: pxl * 24,
                fontFamily: "'pxlLarge', monospace",
                color: Colors.p6,
              }}
            >
              {Strings.my_activity}
            </div>
            <DefaultIconButton
              onClick={() => {
                nextModal("create");
              }}
              size={[50, 30]}
              colors={[Colors.p4, Colors.p5]}
            />
          </div>
          <div
            className="w-full"
            style={{ height: pxl * 5, backgroundColor: Colors.p4 }}
          />
          <div
            className="flex-1 flex flex-col overflow-y-auto"
            style={{ gap: pxl * 5, maxHeight: pxl * 490 }}
          >
            {props.state.activities?.map((activity) => (
              <div
                className="flex"
                style={{ maxWidth: pxl * 390 }}
                key={activity.id}
              >
                <DefaultButton
                  text={activity.name}
                  icon={{
                    onClick: () => {
                      setPopup(activity);
                    },
                    colors: [Colors.a5, Colors.a6],
                  }}
                  onClick={() => {
                    editActivity(activity);
                  }}
                  alignLeft={true}
                  size={50}
                  colors={[Colors.a3, Colors.a4, Colors.p1]}
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
  return (
    <div className="absolute w-full h-full flex justify-center">
      <div
        className="flex flex-col"
        style={{
          width: pxl * 310,
          height: pxl * 160,
          marginTop: pxl * 88,
          padding: pxl * 20,
          gap: pxl * 10,
          borderWidth: pxl * 5,
          borderColor: Colors.a6,
          backgroundColor: Colors.p4,
        }}
      >
        <div
          className="flex-1 flex flex-col items-center overflow-clip"
          style={{ gap: pxl * 10 }}
        >
          <div
            className="flex justify-start leading-none"
            style={{
              height: pxl * 26,
              fontSize: pxl * 24,
              fontFamily: "'pxlLarge', monospace",
              color: Colors.a6,
            }}
          >
            {Strings.delete}:
          </div>
          <div
            className="max-w-full flex leading-none whitespace-nowrap"
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
              color: Colors.a5,
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
          <DefaultButton
            text={Strings.cancel}
            onClick={props.cancel}
            size={40}
            colors={[Colors.p2, Colors.p3, Colors.p6]}
          />
          <DefaultButton
            text={Strings.delete}
            onClick={props.onClick}
            size={40}
            colors={[Colors.a3, Colors.a4, Colors.a6, Colors.p1]}
          />
        </div>
      </div>
    </div>
  );
};
