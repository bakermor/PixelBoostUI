import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../api/UserApi";
import { FormButton } from "../components/Buttons";
import { InputBox } from "../components/InputBox";
import { STR } from "../constants/Strings";

const Login = () => {
  const pxl = window.innerWidth / 1920;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [warnings, setWarnings] = useState({
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
        let test = `${STR.get(`in_${key}`)}${STR.required}`;
        requiredWarnings[key as keyof typeof warnings] = test;
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
                fontSize: pxl * 59.5,
                fontFamily: "'pxlLarge', monospace",
              }}
            >
              {STR.login_title}
            </div>
          </div>
          <div
            className="w-full flex items-start"
            style={{ height: pxl * 35, marginTop: pxl * 5 }}
          >
            <div
              className="w-full flex leading-none justify-center items-start text-gray-400"
              style={{
                fontSize: pxl * 15.507,
                fontFamily: "'pxlSmall', monospace",
              }}
            >
              {STR.login_desc}
            </div>
          </div>
          {warnings.invalid !== "" ? (
            <div
              className="w-full flex items-start"
              style={{ height: pxl * 35, marginTop: pxl * 15 }}
            >
              <div
                className="w-full flex leading-none justify-center items-end text-gray-400"
                style={{
                  fontSize: pxl * 15.507,
                  fontFamily: "'pxlSmall', monospace",
                }}
              >
                {warnings.invalid}
              </div>
            </div>
          ) : null}
          <div
            className="flex flex-col"
            style={{
              paddingLeft: pxl * 50,
              paddingRight: pxl * 50,
              gap: pxl * 25,
            }}
          ></div>
          <form className="flex flex-col" style={{ gap: pxl * 8 }}>
            <InputBox
              name="username"
              type="text"
              warning={warnings.username}
              value={formData.username}
              onChange={handleChange}
              onBlur={undefined}
            />
            <InputBox
              name="password"
              type="password"
              warning={warnings.password}
              value={formData.password}
              onChange={handleChange}
              onBlur={undefined}
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
              className="w-full flex items-end leading-none justify-end text-gray-400"
              style={{
                fontSize: pxl * 15.507,
                fontFamily: "'pxlSmall', monospace",
              }}
            >
              {STR.signup_prompt}
            </div>
          </div>
          <div className="h-full flex items-center justify-start">
            <Link to="/signup">
              <div
                className="flex items-end leading-none text-gray-600"
                style={{
                  fontSize: pxl * 15.507,
                  fontFamily: "'pxlSmall', monospace",
                }}
              >
                {STR.signup}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
