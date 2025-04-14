import { AxiosError } from "axios";
import { STR } from "../constants/Strings";
import { api } from "./axiosConfigs";

interface CreateUserReq {
  username: string;
  email: string;
  password: string;
}

interface CreateUserRes {
  status: number | undefined;
  field?: string;
  description?: string;
}

interface UsernameCheckReq {
  username: string;
}

interface UsernameCheckRes {
  status: boolean;
  description?: string;
}

interface UserLoginReq {
  username: string;
  password: string;
}

interface UserLoginRes {
  status: number | undefined;
  description?: string;
}

export async function usernameCheck(
  params: UsernameCheckReq
): Promise<UsernameCheckRes> {
  try {
    const res = await api.get("/users/check-username", {
      params: params,
    });
    if (res.data.status) return res.data;
    else return { status: false, description: STR.warn_user };
  } catch (error) {
    if (error instanceof AxiosError) {
      // FastAPI Validation Error
      if (error.status === 422) {
        var errorDetail = error.response?.data.detail[0];
        var message = errorDetail.msg;

        // Custom message for regex pattern mismatch
        if (errorDetail.type === "string_pattern_mismatch")
          message = STR.warn_user_pattern;
        return {
          status: false,
          description: message.replace("String", "Username"),
        };
      }
    }
    return { status: false, description: "" };
  }
}

export async function createUser(body: CreateUserReq): Promise<CreateUserRes> {
  try {
    const res = await api.post("/users/register", body);
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      // FastAPI Validation Error
      if (error.status === 422) {
        var errorDetail = error.response?.data.detail[0];
        var message = errorDetail.msg;
        return {
          status: error.status,
          field: errorDetail.loc[1],
          description: message.replace("Value error, ", ""),
        };
      }
      return { status: error.status };
    }
    return { status: 500 };
  }
}

export async function getToken(body: UserLoginReq): Promise<UserLoginRes> {
  const encodedBody = new URLSearchParams();
  encodedBody.append("username", body.username);
  encodedBody.append("password", body.password);

  try {
    const res = await api.post("/auth/token", encodedBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 401 || error.status === 422)
        return { status: error.status, description: STR.warn_user_invalid };
    }
    return { status: 500 };
  }
}
