import { Strings } from "../../constants/Strings";
import { Colors, pxl } from "../../constants/ThemeConstants";

interface StatModifierProps {
  stat: string;
  value: number;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const StatModifier = (props: StatModifierProps) => {
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
          className="flex justify-start leading-none"
          style={{
            height: pxl * 18,
            fontSize: pxl * 16,
            fontFamily: "'pxlSmall', monospace",
            color: Colors.p6,
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
                className="clickable cursor-pointer"
                style={
                  {
                    "--main-color":
                      props.value === value ? Colors.a5 : Colors.p5,
                    "--hover-color": Colors.a5,
                    width: `${pxl * 25}px`,
                    height: `${pxl * 35}px`,
                  } as React.CSSProperties & Record<string, string>
                }
              />
            ) : (
              <button
                key={value}
                title={`${value}`}
                name={props.stat}
                value={value}
                onClick={props.onClick}
                className="clickable cursor-pointer"
                style={
                  {
                    "--main-color":
                      props.value === value ? Colors.a5 : Colors.p4,
                    "--hover-color": Colors.a5,
                    width: `${pxl * 25}px`,
                    height: `${pxl * 25}px`,
                  } as React.CSSProperties & Record<string, string>
                }
              />
            )
          )}
        </div>
        <div className="w-full flex justify-between">
          <div className="flex" style={{ width: pxl * 60, height: pxl * 14 }}>
            <div
              className="flex justify-start leading-none"
              style={{
                height: pxl * 13,
                fontSize: pxl * 12,
                fontFamily: "'pxlLarge', monospace",
                color: Colors.a6,
              }}
            >
              {Strings.dec}
            </div>
          </div>
          <div className="flex" style={{ width: pxl * 60, height: pxl * 14 }}>
            <div
              className="flex justify-start leading-none"
              style={{
                height: pxl * 13,
                fontSize: pxl * 12,
                fontFamily: "'pxlLarge', monospace",
                color: Colors.a6,
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
