import { Activity, Health, Modifiers, Stat, User } from "../models/User";

export const createEmptyModifiers = (): Modifiers => ({
  energy: undefined,
  hunger: undefined,
  thirst: undefined,
  fun: undefined,
  social: undefined,
  hygiene: undefined,
});

export const createEmptyActivity = (): Activity => ({
  id: "",
  name: "",
  modifiers: createEmptyModifiers(),
  time_limit: null,
  start_time: null,
});

export const createEmptyStat = (): Stat => ({
  current_level: 0,
  equation: [0],
  last_updated: 0,
});

export const createEmptyHealth = (): Health => ({
  energy: createEmptyStat(),
  hunger: createEmptyStat(),
  thirst: createEmptyStat(),
  fun: createEmptyStat(),
  social: createEmptyStat(),
  hygiene: createEmptyStat(),
});

export const createEmptyUser = (): User => ({
  id: "",
  username: "",
  email: "",
  name: "",
  following: [],
  followers: [],
  current_activity: createEmptyActivity(),
  health: createEmptyHealth(),
});

export const createEmptyHealthLevels = () => ({
  energy: 0,
  hunger: 0,
  thirst: 0,
  fun: 0,
  social: 0,
  hygiene: 0,
});
