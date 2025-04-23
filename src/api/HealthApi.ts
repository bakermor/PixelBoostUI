import { AxiosError } from "axios";
import { api } from "./axiosConfigs";
import { Health } from "./AuthApi";

interface UpdateStatReq {
  current_level?: number;
  equation?: number[];
  last_updated?: number;
}

interface UpdateStatRes {
  status: number;
  health?: Health;
}

export async function updateStat(
  id: string,
  stat: string,
  body: UpdateStatReq
): Promise<UpdateStatRes> {
  try {
    const res = await api.patch(`/health/${id}/${stat}`, body);
    if (res.status === 200) return { status: res.status, health: res.data };
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.status ? error.status : 500 };
    }
    return { status: 500 };
  }
}
