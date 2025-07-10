import { AxiosError } from "axios";
import { Strings } from "../constants/Strings";
import { User } from "../models/User";
import { api, baseApiCall, BaseRes } from "./axiosConfigs";

interface AuthRes {
  status: number;
  field?: string;
  description?: string;
}

interface CreateUserReq {
  username: string;
  email: string;
  password: string;
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

interface UpdateUserReq {
  name: string;
}

interface UpdateUsernameReq {
  username: string;
}

interface UpdateEmailReq {
  email: string;
}

interface UpdatePasswordReq {
  current_password: string;
  new_password: string;
}

export async function getToken(body: UserLoginReq): Promise<AuthRes> {
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
        return { status: error.status, description: Strings.warn_user_invalid };
    }
    return { status: 500 };
  }
}

export async function refreshUser(): Promise<{ status: number | undefined }> {
  try {
    const res = await api.post("/auth/refresh");
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.status };
    }
    return { status: 500 };
  }
}

export async function createUser(body: CreateUserReq): Promise<AuthRes> {
  try {
    const res = await api.post("/users/register", body);
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      // FastAPI Validation Error
      if (error.status === 422) {
        let errorDetail = error.response?.data.detail[0];
        let message = errorDetail.msg;
        return {
          status: error.status,
          field: errorDetail.loc[1],
          description: message.replace("Value error, ", ""),
        };
      }
      return { status: error.status ?? 500 };
    }
    return { status: 500 };
  }
}

export function getCurrentUser(): Promise<BaseRes<User>> {
  return baseApiCall(() => api.get("/auth/me"));
}

export async function updateUser(
  id: string,
  body: UpdateUserReq
): Promise<BaseRes> {
  return baseApiCall(() => api.patch(`/users/${id}`, body));
}

export async function updateUsername(
  id: string,
  body: UpdateUsernameReq
): Promise<AuthRes> {
  try {
    const res = await api.patch(`/users/${id}/change-username`, body);
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 409) {
        return {
          status: error.status,
          field: "username",
          description: Strings.warn_user,
        };
      }
      if (error.status === 422) {
        let errorDetail = error.response?.data.detail[0];
        let message = errorDetail.msg;
        return {
          status: error.status,
          field: "username",
          description: message.replace("Value error, ", ""),
        };
      }
      return { status: error.status ?? 500 };
    }
    return { status: 500 };
  }
}

export async function updateEmail(
  id: string,
  body: UpdateEmailReq
): Promise<AuthRes> {
  try {
    const res = await api.patch(`/users/${id}/change-email`, body);
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 422) {
        let errorDetail = error.response?.data.detail[0];
        let message = errorDetail.msg;
        return {
          status: error.status,
          field: "email",
          description: message.replace("Value error, ", ""),
        };
      }
      return { status: error.status ?? 500 };
    }
    return { status: 500 };
  }
}

export async function updatePassword(
  id: string,
  body: UpdatePasswordReq
): Promise<AuthRes> {
  try {
    const res = await api.patch(`/users/${id}/change-password`, body);
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.status === 400) {
        return {
          status: error.status,
          field: "current_password",
          description: Strings.warn_password_invalid,
        };
      }
      if (error.status === 422) {
        let errorDetail = error.response?.data.detail[0];
        let message = errorDetail.msg;
        return {
          status: error.status,
          field: errorDetail.loc[1],
          description: message.replace("Value error, ", ""),
        };
      }
      return { status: error.status ?? 500 };
    }
    return { status: 500 };
  }
}

export async function usernameCheck(
  params: UsernameCheckReq
): Promise<UsernameCheckRes> {
  try {
    const res = await api.get("/users/check-username", {
      params: params,
    });
    if (res.data.status) return res.data;
    else return { status: false, description: Strings.warn_user };
  } catch (error) {
    if (error instanceof AxiosError) {
      // FastAPI Validation Error
      if (error.status === 422) {
        let errorDetail = error.response?.data.detail[0];
        let message = errorDetail.msg;

        // Custom message for regex pattern mismatch
        if (errorDetail.type === "string_pattern_mismatch")
          message = Strings.warn_user_pattern;
        return {
          status: false,
          description: message.replace("String", "Username"),
        };
      }
    }
    return { status: false, description: "" };
  }
}
