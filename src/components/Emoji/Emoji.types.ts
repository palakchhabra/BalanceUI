export type EmojiSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type EmojiCategory = 
  | "smileys"
  | "gestures"
  | "people"
  | "animals"
  | "food"
  | "travel"
  | "activities"
  | "objects"
  | "symbols"
  | "flags"
  | "nature"
  | "weather"
  | "celebration"
  | "communication";

export interface EmojiProps {
  name?: string;
  size?: EmojiSize;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode; // For custom SVG content
}

