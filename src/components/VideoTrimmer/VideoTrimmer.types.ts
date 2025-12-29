export interface VideoTrimmerProps {
  src: string | File;
  onTrim?: (trimmedBlob: Blob, startTime: number, endTime: number) => void;
  minDuration?: number; // Minimum trim duration in seconds
  maxDuration?: number; // Maximum trim duration in seconds
  className?: string;
  style?: React.CSSProperties;
  format?: "video" | "audio";
  quality?: number; // 0-1 for video quality
  disabled?: boolean;
  error?: string;
  helperText?: string;
  label?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
}

