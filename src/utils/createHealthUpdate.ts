import { UpdateHealthReq } from "../api/HealthApi";
import { HealthLevels } from "../models/User";

export const createHealthUpdate = (health: HealthLevels): UpdateHealthReq => ({
  energy: {
    current_level: health.energy,
    last_updated: Date.now() / 1000,
  },
  hunger: {
    current_level: health.hunger,
    last_updated: Date.now() / 1000,
  },
  thirst: {
    current_level: health.thirst,
    last_updated: Date.now() / 1000,
  },
  fun: {
    current_level: health.fun,
    last_updated: Date.now() / 1000,
  },
  social: {
    current_level: health.social,
    last_updated: Date.now() / 1000,
  },
  hygiene: {
    current_level: health.hygiene,
    last_updated: Date.now() / 1000,
  },
});
