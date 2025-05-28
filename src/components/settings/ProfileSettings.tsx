import { useState } from "react";
import {
  updateEmail,
  updatePassword,
  updateUser,
  updateUsername,
  User,
} from "../../api/AuthApi";
import { Strings } from "../../constants/Strings";
import { Colors, pxl } from "../../constants/ThemeConstants";
import { DefaultButton } from "../Buttons";
import { Input } from "../Input";

interface Props {
  user: User;
}

interface SectionProps {
  title: string;
  inputs: Record<string, string>;
  onSubmit: (props: any) => Promise<Record<string, any>>;
}

export const ProfileSettings = (props: Props) => {
  const saveGeneral = async (newData: { name: string }) => {
    const result = await updateUser(props.user.id, newData);
    return result;
  };

  const saveUsername = async (newData: { username: string }) => {
    const result = await updateUsername(props.user.id, newData);
    return result;
  };

  const saveEmail = async (newData: { email: string }) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (newData.email != "" && !emailPattern.test(newData.email)) {
      return {
        status: 400,
        field: "email",
        description: Strings.warn_email,
      };
    }
    const result = await updateEmail(props.user.id, newData);
    return result;
  };

  const savePassword = async (newData: {
    current_password: string;
    new_password: string;
    confirm_password: string;
  }) => {
    console.log(newData);
    if (newData.new_password !== newData.confirm_password) {
      return {
        status: 400,
        field: "confirm_password",
        description: Strings.warn_password_match,
      };
    }
    const result = await updatePassword(props.user.id, newData);
    return result;
  };

  return (
    <div className="flex-1 flex flex-col" style={{ gap: pxl * 50 }}>
      <SettingsSection
        title="set_profile"
        inputs={{ name: props.user.name }}
        onSubmit={saveGeneral}
      />
      <SettingsSection
        title="set_username"
        inputs={{ username: props.user.username }}
        onSubmit={saveUsername}
      />
      <SettingsSection
        title="set_email"
        inputs={{ email: props.user.email }}
        onSubmit={saveEmail}
      />
      <SettingsSection
        title="set_password"
        inputs={{
          current_password: "",
          new_password: "",
          confirm_password: "",
        }}
        onSubmit={savePassword}
      />
    </div>
  );
};

const SettingsSection = (props: SectionProps) => {
  const [formData, setFormData] = useState(props.inputs);
  const [warnings, setWarnings] = useState(
    Object.fromEntries(Object.keys(props.inputs).map((key) => [key, ""]))
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const changeWarning = (target: string, value: string = "") => {
    const newWarnings = Object.fromEntries(
      Object.keys(props.inputs).map((key) => [key, ""])
    );
    setWarnings({
      ...newWarnings,
      [target]: value,
    });
  };

  const resetWarnings = () => {
    setWarnings(
      Object.fromEntries(Object.keys(props.inputs).map((key) => [key, ""]))
    );
  };

  const handleSubmit = async () => {
    resetWarnings();
    const result = await props.onSubmit(formData);
    console.log(result);
    if (result.status !== 200 && result.description && result.field) {
      changeWarning(result.field, result.description);
    }
  };

  return (
    <div className="w-full flex flex-col" style={{ gap: pxl * 8 }}>
      <div
        className="flex justify-start leading-none whitespace-nowrap"
        style={{
          height: pxl * 26,
          fontSize: pxl * 24,
          fontFamily: "'pxlLarge', monospace",
          color: Colors.p6,
        }}
      >
        {Strings[props.title]}
      </div>
      <div
        className="w-full"
        style={{ height: pxl * 5, backgroundColor: Colors.p4 }}
      />
      {Object.entries(formData).map(([key, value]) => (
        <div key={key} style={{ width: pxl * 820 }}>
          <Input
            name={key}
            value={value}
            type={key.includes("password") ? "password" : "text"}
            warning={warnings[key]}
            onChange={handleChange}
            colors={[Colors.p5, Colors.p3, Colors.a6, Colors.a3]}
          />
        </div>
      ))}
      <div className="flex" style={{ width: pxl * 180, paddingTop: pxl * 25 }}>
        <DefaultButton
          text={Strings.save}
          onClick={handleSubmit}
          size={50}
          colors={[Colors.a3, Colors.a4, Colors.p1]}
        />
      </div>
    </div>
  );
};
