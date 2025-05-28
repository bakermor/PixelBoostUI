import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { allowedStats } from "../constants/StatConstants";
import { Strings } from "../constants/Strings";
import { Colors, pxl } from "../constants/ThemeConstants";
import { DefaultButton, DefaultIconButton } from "./Buttons";

interface BaseModalProps {
  color: string;
  exit: React.MouseEventHandler<any>;
  children?: ReactNode;
}

interface ActionModalProps {
  exit: React.MouseEventHandler<HTMLButtonElement>;
}

export const BaseModal = (props: BaseModalProps) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
      onClick={props.exit}
    >
      <div
        className="flex bg-gray-200 overflow-clip relative"
        style={{
          width: pxl * 440,
          height: pxl * 720,
          padding: pxl * 10,
          backgroundColor: props.color,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
};

export const ActionModal = (props: ActionModalProps) => {
  const navigate = useNavigate();

  const navigateAction = (stat: string) => {
    const url = `/action?stat=${stat}`;
    navigate(url);
  };

  return (
    <BaseModal {...props} color={Colors.p4}>
      <div
        className="absolute"
        style={{
          right: pxl * 5,
          top: pxl * 5,
        }}
      >
        <DefaultIconButton
          onClick={props.exit}
          size={[40]}
          colors={[Colors.p5, Colors.p6]}
        />
      </div>
      <div
        className="flex flex-col w-full"
        style={{
          gap: pxl * 50,
        }}
      >
        <div
          className="flex flex-col"
          style={{ gap: pxl * 5, padding: pxl * 10 }}
        >
          <div
            className="flex justify-start leading-none"
            style={{
              height: pxl * 52,
              fontSize: pxl * 48,
              fontFamily: "'pxlLarge', monospace",
              color: Colors.p1,
            }}
          >
            {Strings.do_action}
          </div>
          <div
            className="flex leading-none"
            style={{
              height: pxl * 18,
              fontSize: pxl * 16,
              fontFamily: "'pxlSmall', monospace",
              color: Colors.p6,
            }}
          >
            {Strings.do_action_desc}
          </div>
        </div>
        <div
          className="flex-1 flex flex-col"
          style={{ gap: pxl * 15, padding: pxl * 10 }}
        >
          {allowedStats.map((stat) => (
            <div key={stat} className="flex">
              <DefaultButton
                text={Strings[stat]}
                onClick={() => {
                  navigateAction(stat);
                }}
                size={65}
                colors={[Colors.a3, Colors.a2, Colors.p1, Colors.a6]}
              />
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );
};
