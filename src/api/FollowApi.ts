import { User } from "../models/User";
import { api, baseApiCall, BaseRes } from "./axiosConfigs";

export function getUsersFromSearch(
  search: string
): Promise<BaseRes<Array<User>>> {
  return baseApiCall(() =>
    api.get("/search", { params: { search_term: search } })
  );
}

export function followUser(user_id: string): Promise<BaseRes<User>> {
  return baseApiCall(() => api.post(`/follow/${user_id}`));
}

export function unfollowUser(user_id: string): Promise<BaseRes<User>> {
  return baseApiCall(() => api.post(`/unfollow/${user_id}`));
}
