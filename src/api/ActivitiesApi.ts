import { AxiosError } from "axios";
import { Activity, Modifiers } from "./AuthApi";
import { api } from "./axiosConfigs";

interface GetActivitiesRes {
  status: number;
  activityList?: Activity[];
}

interface CreateActivityReq {
  name: string;
  time_limit?: number;
  modifiers: Partial<Modifiers>;
}

interface CreateActivityRes {
  status: number;
}

export async function getActivities(): Promise<GetActivitiesRes> {
  try {
    const res = await api.get("/activities");
    return { status: res.status, activityList: res.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.status ? error.status : 500 };
    }
    return { status: 500 };
  }
}

export async function createActivity(
  body: CreateActivityReq
): Promise<CreateActivityRes> {
  try {
    const res = await api.post("/activities", body);
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.status ? error.status : 500 };
    }
    return { status: 500 };
  }
}
