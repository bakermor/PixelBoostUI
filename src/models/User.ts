export interface Modifiers {
  energy: number | undefined;
  hunger: number | undefined;
  thirst: number | undefined;
  fun: number | undefined;
  social: number | undefined;
  hygiene: number | undefined;
}

export interface Activity {
  id: string;
  name: string;
  modifiers: Modifiers;
  time_limit: number | null;
  start_time: number | null;
}

export interface Stat {
  current_level: number;
  equation: Array<number>;
  last_updated: number;
}

export interface Health {
  energy: Stat;
  hunger: Stat;
  thirst: Stat;
  fun: Stat;
  social: Stat;
  hygiene: Stat;
}

export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  following: Array<string>;
  followers: Array<string>;
  current_activity: Activity;
  health: Health;
}

// OTHER MODELS

export interface HealthLevels {
  energy: number;
  hunger: number;
  thirst: number;
  fun: number;
  social: number;
  hygiene: number;
}
