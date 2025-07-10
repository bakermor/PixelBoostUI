import { User } from "../models/User";
import { api, baseApiCall, BaseRes } from "./axiosConfigs";

export function getUsersFromSearch(search: string): Promise<BaseRes<User[]>> {
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

export function getUserFollowers(user_id: string): Promise<BaseRes<User[]>> {
  return baseApiCall(() => api.get(`/followers/${user_id}`));
}

export function getUserFollowing(user_id: string): Promise<BaseRes<User[]>> {
  return baseApiCall(() => api.get(`/following/${user_id}`));
}
