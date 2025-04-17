import { useNavigate } from "react-router-dom";
import { Strings } from "../constants/Strings";
import { StatButton } from "./Buttons";

interface ActionModalProps {
  exit: React.MouseEventHandler<HTMLButtonElement>;
}

export const ActionModal = (props: ActionModalProps) => {
  const pxl = window.innerWidth / 1920;
  const navigate = useNavigate();

  const navigateAction = (stat: string) => {
    const url = `/action?stat=${stat}`;
    navigate(url);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div
        className="flex flex-col bg-gray-200"
        style={{
          width: pxl * 440,
          height: pxl * 720,
          padding: pxl * 10,
          gap: pxl * 50,
        }}
      >
        <div className="flex">
          <div
            className="flex-1 flex flex-col"
            style={{ gap: pxl * 5, padding: pxl * 10 }}
          >
            <div
              className="flex justify-start leading-none text-gray-400"
              style={{
                height: pxl * 52,
                fontSize: pxl * 48,
                fontFamily: "'pxlLarge', monospace",
              }}
            >
              {Strings.do_action}
            </div>
            <div
              className="flex leading-none text-gray-400"
              style={{
                height: pxl * 18,
                fontSize: pxl * 16,
                fontFamily: "'pxlSmall', monospace",
              }}
            >
              {Strings.do_action_desc}
            </div>
          </div>
          <button
            className="bg-gray-300 cursor-pointer"
            style={{ marginLeft: pxl * 50, width: pxl * 40, height: pxl * 40 }}
            onClick={props.exit}
          />
        </div>
        <div
          className="flex-1 flex flex-col"
          style={{ gap: pxl * 15, padding: pxl * 10 }}
        >
          <StatButton
            text="energy"
            onClick={() => {
              navigateAction("energy");
            }}
          />
          <StatButton
            text="hunger"
            onClick={() => {
              navigateAction("hunger");
            }}
          />
          <StatButton
            text="thirst"
            onClick={() => {
              navigateAction("thirst");
            }}
          />
          <StatButton
            text="hygiene"
            onClick={() => {
              navigateAction("hygiene");
            }}
          />
          <StatButton
            text="social"
            onClick={() => {
              navigateAction("social");
            }}
          />
          <StatButton
            text="fun"
            onClick={() => {
              navigateAction("fun");
            }}
          />
        </div>
      </div>
    </div>
  );
};
