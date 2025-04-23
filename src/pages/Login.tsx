import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../api/AuthApi";
import { FormButton } from "../components/Buttons";
import { Input } from "../components/Input";
import { Strings } from "../constants/Strings";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const pxl = window.innerWidth / 1920;
  const navigate = useNavigate();
  const { updateAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState<Record<string, string>>({
    username: "",
    password: "",
  });

  const [warnings, setWarnings] = useState<Record<string, string>>({
    invalid: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.value !== "") changeWarning(e.target.name);
  };

  const changeWarning = (target: string, value: string = "") => {
    setWarnings({
      ...warnings,
      [target]: value,
    });
  };

  const loginUser = async () => {
    const result = await getToken({
      username: formData.username,
      password: formData.password,
    });
    if (result.status === 204) return true;
    else {
      changeWarning("invalid", result.description);
      return false;
    }
  };

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Check all fields have values
    const requiredWarnings = { ...warnings };
    for (const [key, value] of Object.entries(formData)) {
      if (value === "") {
        let test = `${Strings[`in_${key}`]}${Strings.required}`;
        requiredWarnings[key] = test;
      }
    }
    setWarnings(requiredWarnings);

    // Check no field is invalid
    const noWarnings = Object.values(warnings).every((field) => field === "");
    if (noWarnings) {
      // Create a new user
      const result = await loginUser();
      if (result) {
        // Move on to user's dashboard
        await updateAuth();
        navigate("/dashboard");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex justify-end">
      <div className="flex-1 bg-gray-200" style={{ width: pxl * 1050 }}></div>
      <div
        className="h-full flex flex-col justify-center"
        style={{
          width: pxl * 780,
          gap: pxl * 20,
          paddingRight: pxl * 45,
          paddingLeft: pxl * 45,
        }}
      >
        <div
          className="w-full flex  bg-gray-300"
          style={{ height: pxl * 64 }}
        ></div>
        <div
          className="flex flex-col"
          style={{
            marginTop: pxl * 10,
            paddingLeft: pxl * 80,
            paddingRight: pxl * 80,
          }}
        >
          <div className="w-full flex justify-end" style={{ height: pxl * 72 }}>
            <div
              className="w-full flex leading-none justify-center text-gray-600"
              style={{
                height: pxl * 66,
                fontSize: pxl * 60,
                fontFamily: "'pxlLarge', monospace",
              }}
            >
              {Strings.login_title}
            </div>
          </div>
          <div
            className="w-full flex items-start"
            style={{ height: pxl * 35, marginTop: pxl * 5 }}
          >
            <div
              className="w-full flex leading-none justify-center items-start text-gray-400"
              style={{
                height: pxl * 18,
                fontSize: pxl * 16,
                fontFamily: "'pxlSmall', monospace",
              }}
            >
              {Strings.login_desc}
            </div>
          </div>
          {warnings.invalid !== "" ? (
            <div
              className="w-full flex items-start"
              style={{ height: pxl * 35, marginTop: pxl * 15 }}
            >
              <div
                className="w-full flex leading-none justify-center items-start text-gray-400"
                style={{
                  height: pxl * 18,
                  fontSize: pxl * 16,
                  fontFamily: "'pxlSmall', monospace",
                }}
              >
                {warnings.invalid}
              </div>
            </div>
          ) : null}
        </div>
        <div
          className="flex flex-col"
          style={{
            paddingLeft: pxl * 60,
            paddingRight: pxl * 60,
            gap: pxl * 25,
          }}
        >
          <form className="flex flex-col" style={{ gap: pxl * 8 }}>
            <Input
              name="username"
              type="text"
              warning={warnings.username}
              value={formData.username}
              onChange={handleChange}
            />
            <Input
              name="password"
              type="password"
              warning={warnings.password}
              value={formData.password}
              onChange={handleChange}
            />
            <div style={{ marginTop: pxl * 10 }}>
              <FormButton text="login" onClick={handleLogin} />
            </div>
          </form>
        </div>
        <div
          className="w-full flex justify-center"
          style={{ height: pxl * 35, gap: pxl * 10 }}
        >
          <div
            className="h-full flex items-center"
            style={{ width: pxl * 260 }}
          >
            <div
              className="w-full flex leading-none justify-end text-gray-400"
              style={{
                height: pxl * 18,
                fontSize: pxl * 16,
                fontFamily: "'pxlSmall', monospace",
              }}
            >
              {Strings.signup_prompt}
            </div>
          </div>
          <div className="h-full flex items-center justify-start">
            <Link to="/signup">
              <div
                className="flex leading-none text-gray-600"
                style={{
                  height: pxl * 18,
                  fontSize: pxl * 16,
                  fontFamily: "'pxlSmall', monospace",
                }}
              >
                {Strings.signup}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
