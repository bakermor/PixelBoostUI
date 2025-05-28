import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, getToken, usernameCheck } from "../api/AuthApi";
import { DefaultButton } from "../components/Buttons";
import { Input } from "../components/Input";
import { Strings } from "../constants/Strings";
import { Colors, pxl } from "../constants/ThemeConstants";
import { AuthContext } from "../context/AuthProvider";

const SignUp = () => {
  const navigate = useNavigate();
  const { updateAuth } = useContext(AuthContext);

  const [formData, setFormData] = useState<Record<string, string>>({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [warnings, setWarnings] = useState<Record<string, string>>({
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
      changeWarning("email", Strings.warn_email);
    } else changeWarning("email");
  };

  const validatePassword = () => {
    // Check that confirm password matches password
    if (
      formData.confirm_password !== "" &&
      formData.password !== formData.confirm_password
    )
      // Add warning if invalid
      changeWarning("confirm_password", Strings.warn_password_match);
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

  const validateFunction: Record<string, (e?: any) => any> = {
    username: validateUsername,
    email: validateEmail,
    password: validatePassword,
    confirm_password: validatePassword,
  };

  const createAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
      const result = await createUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      if (result.status === 201) {
        const authenticated = await loginUser();
        if (authenticated) {
          // Move on to next part of sign up process
          await updateAuth();
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
    <div
      className="h-screen w-screen flex justify-end"
      style={{ backgroundColor: Colors.p1 }}
    >
      <div
        className="flex-1"
        style={{ width: pxl * 1050, backgroundColor: Colors.p4 }}
      ></div>
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
          className="w-full flex"
          style={{ backgroundColor: Colors.p4, height: pxl * 64 }}
        />
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
              className="w-full flex leading-none justify-center"
              style={{
                height: pxl * 66,
                fontSize: pxl * 60,
                fontFamily: "'pxlLarge', monospace",
                color: Colors.a5,
              }}
            >
              {Strings.signup_title}
            </div>
          </div>
          <div
            className="w-full flex items-start"
            style={{ height: pxl * 35, marginTop: pxl * 5 }}
          >
            <div
              className="w-full flex leading-none justify-center items-start"
              style={{
                height: pxl * 18,
                fontSize: pxl * 16,
                fontFamily: "'pxlSmall', monospace",
                color: Colors.a3,
              }}
            >
              {Strings.signup_desc}
            </div>
          </div>
        </div>
        <div
          className="flex flex-col w-full"
          style={{
            paddingLeft: pxl * 60,
            paddingRight: pxl * 60,
            gap: pxl * 25,
          }}
        >
          <form className="flex w-full flex-col" style={{ gap: pxl * 8 }}>
            {Object.entries(formData).map(([input, value]) => (
              <div key={input} className="flex w-full">
                <Input
                  name={input}
                  type={input.includes("password") ? "password" : "text"}
                  warning={warnings[input]}
                  value={value}
                  onChange={handleChange}
                  onBlur={validateFunction[input]}
                  colors={[Colors.p6, Colors.p2, Colors.a6, Colors.a3]}
                />
              </div>
            ))}
            <div style={{ marginTop: pxl * 10 }}>
              <DefaultButton
                text={Strings.create_account}
                onClick={createAccount}
                size={70}
                colors={[Colors.a5, Colors.a3, Colors.a2, Colors.p1]}
              />
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
              className="w-full flex leading-none justify-end"
              style={{
                height: pxl * 18,
                fontSize: pxl * 16,
                fontFamily: "'pxlSmall', monospace",
                color: Colors.p4,
              }}
            >
              {Strings.login_prompt}
            </div>
          </div>
          <div className="h-full flex items-center">
            <Link to="/login">
              <div
                className="flex leading-none"
                style={{
                  height: pxl * 18,
                  fontSize: pxl * 16,
                  fontFamily: "'pxlSmall', monospace",
                  color: Colors.a3,
                }}
              >
                {Strings.login}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
