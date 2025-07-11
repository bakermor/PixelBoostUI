import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import { deleteActivity } from "../../api/ActivitiesApi";
import { Strings } from "../../constants/Strings";
import { Activity } from "../../models/User";
import { IconButton, NewDefaultButton } from "../Buttons";

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
    <div
      className={`flex-1 flex flex-col gap-10 mt-8 mx-3 ${
        !props.state.activities ? "cursor-progress" : ""
      }`}
    >
      <div className="flex mx-1">
        <NewDefaultButton
          text={Strings.now_activity}
          onClick={() => {
            nextModal("current");
          }}
          size="large"
        />
      </div>
      <div className="flex-1 flex flex-col relative gap-1 overflow-hidden pb-2.5">
        {deletePopup ? (
          <Popup
            name={deletePopup.name}
            cancel={cancelDelete}
            onClick={handleDelete}
          />
        ) : null}
        <div className="flex w-full justify-between items-end">
          <div className="kameron flex leading-none font-semibold text-2xl text-[#C957BC]">
            {Strings.my_activity}
          </div>
          <IconButton
            onClick={() => {
              nextModal("create");
            }}
            variant="add"
          >
            <AddIcon />
          </IconButton>
        </div>
        <div className="w-full h-1 rounded-lg bg-[#752092]" />
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-clip p-2 mt-1 gap-1.5 scrollbar scrollbar-thumb-[#FFC872] scrollbar-track-[#FFF0A6]">
          {props.state.activities?.map((activity) => (
            <NewDefaultButton
              key={activity.id}
              text={activity.name}
              onClick={() => {
                editActivity(activity);
              }}
              variant="light_invert"
              size="small"
              align="left"
            >
              <DeleteOutlineIcon
                className="text-[#C957BC] hover:text-[#752092] transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setPopup(activity);
                }}
              />
            </NewDefaultButton>
          ))}
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
      <div className="flex flex-col w-62 h-34 mt-18 p-4 justify-center gap-1 bg-[#C957BC] border-3 border-[#752092]">
        <div className="flex-1 flex flex-col items-center overflow-clip gap-1">
          <div className="kameron leading-none mt-1 text-xl text-[#FFFFFC]">
            {Strings.delete}:
          </div>
          <div className="sans leading-none whitespace-nowrap text-[#FBC0E5]">
            {props.name}
          </div>
        </div>
        <div className="flex w-full justify-around gap-2 px-2">
          <NewDefaultButton
            text={Strings.cancel}
            onClick={props.cancel}
            variant="delete1"
            size="small"
          />
          <NewDefaultButton
            text={Strings.delete}
            onClick={props.onClick}
            variant="delete2"
            size="small"
          />
        </div>
      </div>
    </div>
  );
};
