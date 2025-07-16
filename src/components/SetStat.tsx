import { useEffect, useRef } from "react";
import { Strings } from "../constants/Strings";
import { HealthLevels } from "../models/User";

interface Props {
  stat: keyof HealthLevels;
  level: number;
  onClick: (stat: keyof HealthLevels, value: number) => void;
}

export const SetStat = (props: Props) => {
  useEffect(() => {}, [props]);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="sans flex items-end leading-none text-md text-[#752092]">
        {Strings[props.stat]}
      </div>
      <DragStat {...props} />
    </div>
  );
};

const DragStat = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newLevel = Math.max(0, Math.min((x / rect.width) * 100, 100));

    props.onClick(props.stat, newLevel - props.level);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();

    // Handle initial position immediately
    handleDrag(e.nativeEvent);

    const onMove = (e: MouseEvent) => handleDrag(e);
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div className="relative w-200 h-7">
      <div
        className="w-full h-full overflow-hidden rounded-full bg-[#FFFFFC] outline-3 outline-[#752092]"
        ref={containerRef}
      >
        <div
          className={`h-full ${
            props.level > 65
              ? "bg-[#CCFE93]"
              : props.level > 27
              ? "bg-[#FFED93]"
              : "bg-[#FF90AA]"
          }`}
          style={{ width: `${props.level}%` }}
        />
      </div>
      <div
        className="absolute -top-2 flex flex-col items-center transition-transform"
        style={{
          left: `${props.level}%`,
          transform:
            props.level === 100
              ? "translateX(-55%)"
              : props.level === 0
              ? "translateX(-45%)"
              : "translateX(-50%)",
        }}
      >
        <div
          onMouseDown={onMouseDown}
          className="h-11 w-1 cursor-ew-resize bg-[#C957BC]"
        />
        <div className="sans w-8 text-center text-sm text-[#752092]">
          {Math.floor(props.level)}
        </div>
      </div>
    </div>
  );
};
