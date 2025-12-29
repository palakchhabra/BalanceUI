export type BalanceUITheme =
  | "calm-blue"
  | "salt-pepper"
  | "quiet-luxury"
  | "gothic-noir"
  | "cherry-blossom"
  | "lavender-fields"
  | "beachfront-views"
  | "frozen-lake"
  | "golden-hour"
  | "stone-path"
  | "cappuccino"
  | "coastal-morning"
  | "desert-dusk"
  | "fresh-peach"
  | "minty-fresh"
  | "ocean-tide"
  | "soft-spring"
  | "autumn-leaves"
  | "winter-chill"
  | "summer-breeze"
  | "us-black-white"
  | "custom";

export const setTheme = (theme: BalanceUITheme) => {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.buTheme = theme;
};
