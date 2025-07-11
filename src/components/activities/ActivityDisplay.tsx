import { Strings } from "../../constants/Strings";
import { Activity } from "../../models/User";

interface Props {
  activity: Activity;
}

interface StatDisplayProps {
  stat: string;
  value: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ActivityDisplay = (props: Props) => {
  return (
    <div className="flex-1 flex flex-col gap-1 overflow-clip">
      <div className="kameron flex leading-none font-semibold text-2xl text-[#C957BC]">
        {props.activity.name}
      </div>
      <div className="w-full h-1 rounded-lg bg-[#752092]" />
      <div className="flex-1 flex flex-col p-2 mt-1 gap-3 overflow-y-auto overflow-x-clip scrollbar scrollbar-thumb-[#FFC872] scrollbar-track-[#FFF0A6]">
        {Object.entries(props.activity.modifiers).map(([key, value]) =>
          value ? (
            <div key={key} className="flex pointer-events-none">
              <StatModifier stat={key} value={value ?? 0} onClick={() => {}} />
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export const StatModifier = (props: StatDisplayProps) => {
  const buttonValues = [3, 2.5, 2, 1, -1, -1.5, -2];

  return (
    <div className="flex w-full justify-between">
      <div className="sans flex mt-1 justify-start leading-none font-semibold text-[#752092]">
        {Strings[props.stat]}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 px-3">
          {buttonValues.map((value, index) =>
            index % 2 === 0 ? (
              <button
                key={value}
                title={`${value}`}
                name={props.stat}
                value={value}
                onClick={props.onClick}
                className={`cursor-pointer w-5 h-7 rounded-xs ${
                  props.value === value
                    ? "bg-[#C957BC]"
                    : "bg-[#FFE497] hover:bg-[#C957BC]"
                } transition-colors duration-300`}
              />
            ) : (
              <button
                key={value}
                title={`${value}`}
                name={props.stat}
                value={value}
                onClick={props.onClick}
                className={`cursor-pointer w-5 h-5 rounded-xs ${
                  props.value === value
                    ? "bg-[#C957BC]"
                    : "bg-[#FFC872] hover:bg-[#C957BC]"
                } transition-colors duration-300`}
              />
            )
          )}
        </div>
        <div className="w-full flex justify-between gap-2 pb-1">
          <div className="kameron flex justify-start leading-none font-semibold text-xs text-[#C957BC]">
            {Strings.dec}
          </div>
          <div className="kameron flex justify-start leading-none font-semibold text-xs text-[#C957BC]">
            {Strings.inc}
          </div>
        </div>
      </div>
    </div>
  );
};
