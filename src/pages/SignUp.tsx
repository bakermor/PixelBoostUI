import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getToken, usernameCheck } from "../api/UserApi";
import { FormButton } from "../components/Buttons";
import { InputBox } from "../components/InputBox";
import { STR } from "../constants/Strings";

const SignUp = () => {
  const pxl = window.innerWidth / 1920;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [warnings, setWarnings] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const changeWarning = (target: string, value: string = "") => {
    setWarnings({
      ...warnings,
      [target]: value,
    });
  };

  const validateUsername = async (e: React.FocusEvent<HTMLInputElement>) => {
    // Check username is valid and not in use
    if (e.target.value != "") {
      const valid = await usernameCheck({ username: e.target.value });
      if (!valid.status) {
        // Add warning if invalid
        changeWarning("username", valid.description);
        return;
      }
    }
    changeWarning("username");
  };

  const validateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    // Check inputted email fits a valid email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (e.target.value != "" && !emailPattern.test(e.target.value)) {
      // Add warning if invalid
      changeWarning("email", STR.warn_email);
    } else changeWarning("email");
  };

  const validatePassword = () => {
    // Check that confirm password matches password
    if (
      formData.confirm_password !== "" &&
      formData.password !== formData.confirm_password
    )
      // Add warning if invalid
      changeWarning("confirm_password", STR.warn_password_match);
    else changeWarning("confirm_password");
    if (warnings.password) changeWarning("password");
  };

  const loginUser = async () => {
    const result = await getToken({
      username: formData.username,
      password: formData.password,
    });
    if (result.status === 204) return true;
    else return false;
  };

  const createAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      const result = await createUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      if (result.status === 201) {
        const authenticated = await loginUser();
        if (authenticated) {
          // Move on to next part of sign up process
          navigate("/dashboard");
        } else {
          // Authenticate the user
          navigate("/login");
        }
      } else {
        // Add a warning to invalid field
        if (result.field) {
          changeWarning(result.field, result.description);
        }
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
              {STR.signup_title}
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
              {STR.signup_desc}
            </div>
          </div>
        </div>
        <div
          className="flex flex-col"
          style={{
            paddingLeft: pxl * 50,
            paddingRight: pxl * 50,
            gap: pxl * 25,
          }}
        >
          <form className="flex flex-col" style={{ gap: pxl * 8 }}>
            <InputBox
              name="username"
              type="text"
              warning={warnings.username}
              value={formData.username}
              onChange={handleChange}
              onBlur={validateUsername}
            />
            <InputBox
              name="email"
              type="email"
              warning={warnings.email}
              value={formData.email}
              onChange={handleChange}
              onBlur={validateEmail}
            />
            <InputBox
              name="password"
              type="password"
              warning={warnings.password}
              value={formData.password}
              onChange={handleChange}
              onBlur={validatePassword}
            />
            <InputBox
              name="confirm_password"
              type="password"
              warning={warnings.confirm_password}
              value={formData.confirm_password}
              onChange={handleChange}
              onBlur={validatePassword}
            />
            <div style={{ marginTop: pxl * 10 }}>
              <FormButton text="create_account" onClick={createAccount} />
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
              {STR.login_prompt}
            </div>
          </div>
          <div className="h-full flex items-center">
            <Link to="/login">
              <div
                className="flex items-end leading-none text-gray-600"
                style={{
                  fontSize: pxl * 15.507,
                  fontFamily: "'pxlSmall', monospace",
                }}
              >
                {STR.login}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
