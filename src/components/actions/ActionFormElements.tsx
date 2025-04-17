import { ActionRanges } from "../../constants/Actions";
import { Strings } from "../../constants/Strings";

interface RangeContainerProps {
  name: string;
}

interface SelectContainerProps {
  name: string;
}

export const RangeContainer = (props: RangeContainerProps) => {
  const pxl = window.innerWidth / 1920;
  const IconComponent = ActionRanges[props.name];

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ width: 130, gap: pxl * 8 }}
    >
      <div
        className="flex items-end justify-center bg-gray-200"
        style={{ width: pxl * 105, height: pxl * 105, padding: pxl * 10 }}
      >
        <IconComponent />
      </div>
      <div
        className="flex justify-start leading-none text-gray-400"
        style={{
          height: pxl * 18,
          fontSize: pxl * 16,
          fontFamily: "'pxlSmall', monospace",
        }}
      >
        {Strings[props.name]}
      </div>
    </div>
  );
};

export const SelectContainer = (props: SelectContainerProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <div
      className="flex flex-col items-center justify-end bg-gray-200"
      style={{ width: pxl * 115, padding: pxl * 8, gap: pxl * 5 }}
    >
      <div
        className="flex leading-none text-gray-500"
        style={{
          height: pxl * 18,
          fontSize: pxl * 16,
          fontFamily: "'pxlSmall', monospace",
        }}
      >
        {Strings[props.name]}
      </div>
      <div className="flex-1 bg-gray-500" style={{ width: pxl * 85 }} />
    </div>
  );
};
