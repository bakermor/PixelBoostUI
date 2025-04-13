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
