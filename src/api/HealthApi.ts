import { AxiosError } from "axios";
import { Health } from "./AuthApi";
import { api } from "./axiosConfigs";

interface UpdateStatReq {
  current_level: number;
  last_updated: number;
}

interface UpdateStatRes {
  status: number;
  health?: Health;
}

export interface UpdateHealthReq {
  energy: UpdateStatReq;
  hunger: UpdateStatReq;
  thirst: UpdateStatReq;
  fun: UpdateStatReq;
  social: UpdateStatReq;
  hygiene: UpdateStatReq;
}

export async function updateStat(
  stat: string,
  body: UpdateStatReq
): Promise<UpdateStatRes> {
  try {
    const res = await api.patch(`/health/${stat}`, body);
    if (res.status === 200) return { status: res.status, health: res.data };
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.status ? error.status : 500 };
    }
    return { status: 500 };
  }
}

export async function updateHealth(body: UpdateHealthReq) {
  try {
    const res = await api.patch("/health/", body);
    if (res.status === 200) return { status: res.status, health: res.data };
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.status ? error.status : 500 };
    }
    return { status: 500 };
  }
}
