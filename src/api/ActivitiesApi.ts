import { AxiosError } from "axios";
import { Activity, Modifiers } from "./AuthApi";
import { api } from "./axiosConfigs";

interface BaseRes {
  status: number;
}

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
  activity?: Activity;
}

interface StartActivityReq {
  start_time: number;
}

interface UpdateActivityRes {
  status: number;
  activity?: Activity;
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
    return { status: res.status, activity: res.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.status ? error.status : 500 };
    }
    return { status: 500 };
  }
}

export async function startActivity(
  id: string,
  body: StartActivityReq
): Promise<BaseRes> {
  try {
    const res = await api.post(`/activities/${id}/start`, body);
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.status ? error.status : 500 };
    }
    return { status: 500 };
  }
}

export async function stopActivity(id: string): Promise<BaseRes> {
  try {
    const res = await api.post(`/activities/${id}/stop`);
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.status ? error.status : 500 };
    }
    return { status: 500 };
  }
}

export async function updateActivity(
  id: string,
  body: Partial<CreateActivityReq>
): Promise<UpdateActivityRes> {
  try {
    const res = await api.patch(`/activities/${id}`, body);
    return { status: res.status, activity: res.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.status ? error.status : 500 };
    }
    return { status: 500 };
  }
}

export async function deleteActivity(id: string): Promise<BaseRes> {
  try {
    const res = await api.delete(`/activities/${id}`);
    return { status: res.status };
  } catch (error) {
    if (error instanceof AxiosError) {
      return { status: error.status ? error.status : 500 };
    }
    return { status: 500 };
  }
}
