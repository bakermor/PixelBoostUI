import { Health, HealthLevels } from "../models/User";
import { api, baseApiCall, BaseRes } from "./axiosConfigs";

interface UpdateStatReq {
  current_level: number;
  last_updated: number;
}

export interface UpdateHealthReq {
  energy: UpdateStatReq;
  hunger: UpdateStatReq;
  thirst: UpdateStatReq;
  fun: UpdateStatReq;
  social: UpdateStatReq;
  hygiene: UpdateStatReq;
}

export function updateStat(
  stat: string,
  body: UpdateStatReq
): Promise<BaseRes<Health>> {
  return baseApiCall(() => api.patch(`/health/${stat}`, body));
}

export function updateHealth(body: UpdateHealthReq): Promise<BaseRes<Health>> {
  return baseApiCall(() => api.patch("/health/", body));
}

export function updateEquations(body: HealthLevels): Promise<BaseRes<Health>> {
  return baseApiCall(() => api.patch("/health/equations", body));
}
