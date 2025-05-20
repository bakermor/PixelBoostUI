export const allowedStats: string[] = [
  "energy",
  "hunger",
  "thirst",
  "hygiene",
  "social",
  "fun",
];

export const statEquations: Record<string, number> = {
  hunger: 0.0014815,
  thirst: 0.0014815,
  energy: 0.0011575,
  social: 0.0005555,
  fun: 0.0011575,
  hygiene: 0.0006945,
};
