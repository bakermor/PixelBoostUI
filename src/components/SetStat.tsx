import { useEffect, useRef, useState } from "react";
import { Strings } from "../constants/Strings";
import { SquareButton } from "./Buttons";

interface Props {
  stat: string;
  level: number;
  onClick: (stat: string, value: number) => void;
}

interface DragStatProps {
  stat: string;
  level: number;
  onClick: (stat: string, value: number) => void;
}

interface LevelDisplayProps {
  level: number;
}

export const SetStat = (props: Props) => {
  const pxl = window.innerWidth / 1920;

  return (
    <div className="w-full flex flex-col" style={{ gap: pxl * 20 }}>
      <div className="w-full flex items-center" style={{ gap: pxl * 50 }}>
        <div
          className="flex justify-start leading-none text-gray-400"
          style={{
            marginTop: pxl * 2,
            paddingLeft: pxl * 15,
            width: pxl * 140,
            height: pxl * 26,
            fontSize: pxl * 24,
            fontFamily: "'pxlLarge', monospace",
          }}
        >
          {Strings[props.stat]}
        </div>
        <div
          className="flex items-center"
          style={{ gap: pxl * 5, marginRight: pxl * 20 }}
        >
          <SquareButton
            onClick={() => {
              props.onClick(props.stat, -5);
            }}
            disabled={props.level <= 0}
          />
          <DragStat {...props} />
          <SquareButton
            onClick={() => {
              props.onClick(props.stat, 5);
            }}
            disabled={props.level >= 100}
          />
        </div>
        <LevelDisplay {...props} />
      </div>
      <div className="w-full bg-gray-200" style={{ height: pxl * 5 }} />
    </div>
  );
};

const DragStat = (props: DragStatProps) => {
  const pxl = window.innerWidth / 1920;
  const width = Math.floor((props.level / 100) * 810) * pxl;

  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    // Outside the stat bar
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setOffset(e.clientX - rect.left - width);
    setIsDragging(true);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let newWidth = e.clientX - rect.left - offset;
    newWidth = Math.max(0, Math.min(rect.width, newWidth));

    const newLevel =
      ((Math.round(newWidth / pxl) * pxl - width) * 100) / 810 / pxl;
    props.onClick(props.stat, newLevel);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    } else {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="flex border-gray-500 bg-gray-200 overflow-clip relative"
      style={{ width: pxl * 820, height: pxl * 50, borderWidth: pxl * 5 }}
      ref={containerRef}
    >
      <div
        className="bg-gray-400 h-full"
        style={{
          width: Math.floor((props.level / 100) * 810) * pxl,
          position: "absolute",
          left: 0,
          top: 0,
        }}
      />

      <div
        onMouseDown={onMouseDown}
        className="absolute top-0 bg-gray-400 h-full cursor-ew-resize"
        style={{
          width: pxl * 10,
          left: width - pxl * 5,
        }}
      />
    </div>
  );
};

const LevelDisplay = (props: LevelDisplayProps) => {
  const pxl = window.innerWidth / 1920;

  return (
    <div
      className="flex border-gray-400 bg-gray-200 justify-between items-center"
      style={{
        width: pxl * 120,
        height: pxl * 54,
        borderWidth: pxl * 5,
        padding: pxl * 5,
      }}
    >
      <div
        className="flex-1 flex justify-center leading-none text-gray-500"
        style={{
          height: pxl * 18,
          fontSize: pxl * 16,
          fontFamily: "'pxlSmall', monospace",
        }}
      >
        {`${Math.floor(props.level)}${Strings.level_display}`}
      </div>
    </div>
  );
};
