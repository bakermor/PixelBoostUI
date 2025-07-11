import CloseIcon from "@mui/icons-material/Close";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { allowedStats } from "../constants/StatConstants";
import { Strings } from "../constants/Strings";
import { IconButton, NewDefaultButton } from "./Buttons";

interface Props {
  exit: React.MouseEventHandler<any>;
  children?: ReactNode;
}

export const BaseModal = (props: Props) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      onClick={props.exit}
    >
      <div
        className="flex w-92 h-150 p-2 bg-linear-to-t from-[#FFFEE0] to-[#FFFFFC] outline-3 outline-[#752092] overflow-clip relative"
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
};

export const ActionModal = (props: Props) => {
  const navigate = useNavigate();

  const navigateAction = (stat: string) => {
    const url = `/action?stat=${stat}`;
    navigate(url);
  };

  return (
    <BaseModal {...props}>
      <div className="absolute right-2 top-2">
        <IconButton onClick={props.exit}>
          <CloseIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-1 p-2">
          <div className="kameron mt-3 w-full leading-none whitespace-nowrap text-4xl text-[#000000]">
            {Strings.do_action}
          </div>
          <div className="sans w-full leading-none whitespace-nowrap text-[#919191]">
            {Strings.do_action_desc}
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3 px-2">
          {allowedStats.map((stat) => (
            <div key={stat} className="flex">
              <NewDefaultButton
                text={Strings[stat]}
                onClick={() => {
                  navigateAction(stat);
                }}
                variant="inverted"
                size="large"
              />
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );
};
