import { Strings } from "../../constants/Strings";

interface StatModifierProps {
  stat: string;
  value: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const StatModifier = (props: StatModifierProps) => {
  const pxl = window.innerWidth / 1920;
  const buttonValues = [2, 1.5, 1, 0.5, -1, -1.5, -2];

  return (
    <div className="flex w-full justify-between">
      <div
        className="flex"
        style={{
          height: pxl * 18,
          marginTop: pxl * 10,
          paddingLeft: pxl * 5,
        }}
      >
        <div
          className="flex justify-start leading-none text-gray-600"
          style={{
            height: pxl * 18,
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
          }}
        >
          {Strings[props.stat]}
        </div>
      </div>
      <div className="flex flex-col" style={{ gap: pxl * 10 }}>
        <div
          className="flex items-center"
          style={{
            gap: pxl * 5,
            paddingLeft: pxl * 15,
            paddingRight: pxl * 15,
          }}
        >
          {buttonValues.map((value, index) =>
            index % 2 === 0 ? (
              <button
                key={value}
                title={`${value}`}
                name={props.stat}
                value={value}
                onClick={props.onClick}
                className={`cursor-pointer ${
                  props.value === value
                    ? "bg-gray-500"
                    : "bg-gray-400 hover:bg-gray-500"
                }`}
                style={{ width: pxl * 25, height: pxl * 35 }}
              />
            ) : (
              <button
                key={value}
                title={`${value}`}
                name={props.stat}
                value={value}
                onClick={props.onClick}
                className={`cursor-pointer ${
                  props.value === value
                    ? "bg-gray-500"
                    : "bg-gray-300 hover:bg-gray-500"
                }`}
                style={{ width: pxl * 25, height: pxl * 25 }}
              />
            )
          )}
        </div>
        <div className="w-full flex justify-between">
          <div className="flex" style={{ width: pxl * 60, height: pxl * 14 }}>
            <div
              className="flex justify-start leading-none text-gray-500"
              style={{
                height: pxl * 13,
                fontSize: pxl * 12,
                fontFamily: "'pxlLarge', monospace",
              }}
            >
              {Strings.dec}
            </div>
          </div>
          <div className="flex" style={{ width: pxl * 60, height: pxl * 14 }}>
            <div
              className="flex justify-start leading-none text-gray-500"
              style={{
                height: pxl * 13,
                fontSize: pxl * 12,
                fontFamily: "'pxlLarge', monospace",
              }}
            >
              {Strings.inc}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
