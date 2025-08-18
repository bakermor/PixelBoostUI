import { ReactNode } from "react";
import { Strings } from "../../constants/Strings";
import { DefaultButton } from "../Buttons";

interface SectionProps {
  title: string;
  subtitle?: boolean;
  children?: ReactNode;
  onSubmit: (props?: any) => Promise<Record<string, any>>;
}

export const SettingsSection = (props: SectionProps) => {
  const handleSubmit = async () => {
    const result = await props.onSubmit();
    console.log(result);
  };

  return (
    <div className="w-full flex flex-col gap-2 pr-6">
      <div className="w-full flex flex-col gap-1 mb-1">
        <div className="kameron flex leading-none font-semibold text-xl text-[#C957BC]">
          {Strings[props.title]}
        </div>
        {props.subtitle ? (
          <div className="sans w-full leading-none whitespace-nowrap text-sm text-[#752092]">
            {Strings[`${props.title}_desc`]}
          </div>
        ) : null}
        <div className="w-full h-1 rounded-lg bg-[#C957BC]" />
      </div>
      {props.children}
      <div className="flex w-40 mt-1.5">
        <DefaultButton
          text={Strings.save}
          onClick={handleSubmit}
          variant="inverted"
          size="small"
        />
      </div>
    </div>
  );
};
