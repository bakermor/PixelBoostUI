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

export function removeFollower(user_id: string): Promise<BaseRes<User>> {
  return baseApiCall(() => api.post(`/follow/remove/${user_id}`));
}

export function getUserFollowers(
  user_id: string,
  search?: string
): Promise<BaseRes<User[]>> {
  return baseApiCall(() =>
    api.get(`/followers/${user_id}`, {
      params: { search_term: search && search.length > 0 ? search : undefined },
    })
  );
}

export function getUserFollowing(
  user_id: string,
  search?: string
): Promise<BaseRes<User[]>> {
  return baseApiCall(() =>
    api.get(`/following/${user_id}`, {
      params: { search_term: search && search.length > 0 ? search : undefined },
    })
  );
}
