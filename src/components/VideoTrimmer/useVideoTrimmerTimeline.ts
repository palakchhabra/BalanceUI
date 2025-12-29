import { useState, useEffect, useRef } from "react";

export interface UseVideoTrimmerTimelineProps {
  duration: number;
  minDuration: number;
  maxDuration?: number;
  disabled: boolean;
  onStartTimeChange?: (time: number) => void;
  onEndTimeChange?: (time: number) => void;
}

export interface UseVideoTrimmerTimelineReturn {
  startTime: number;
  endTime: number;
  isDragging: "start" | "end" | null;
  focusedHandle: "start" | "end" | null;
  timelineRef: React.RefObject<HTMLDivElement>;
  startHandleRef: React.RefObject<HTMLDivElement>;
  endHandleRef: React.RefObject<HTMLDivElement>;
  setStartTime: (time: number) => void;
  setEndTime: (time: number) => void;
  handleMouseDown: (type: "start" | "end") => void;
  handleKeyDown: (e: React.KeyboardEvent, type: "start" | "end") => void;
  handleTimelineClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  setFocusedHandle: (handle: "start" | "end" | null) => void;
}

export const useVideoTrimmerTimeline = ({
  duration,
  minDuration,
  maxDuration,
  disabled,
  onStartTimeChange,
  onEndTimeChange,
}: UseVideoTrimmerTimelineProps): UseVideoTrimmerTimelineReturn => {
  const [startTime, setStartTimeState] = useState(0);
  const [endTime, setEndTimeState] = useState(0);
  const [isDragging, setIsDragging] = useState<"start" | "end" | null>(null);
  const [focusedHandle, setFocusedHandle] = useState<"start" | "end" | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const startHandleRef = useRef<HTMLDivElement>(null);
  const endHandleRef = useRef<HTMLDivElement>(null);

  // Initialize endTime when duration is available
  useEffect(() => {
    if (duration > 0 && endTime === 0) {
      const initialEnd = Math.min(duration, maxDuration || duration);
      setEndTimeState(initialEnd);
      onEndTimeChange?.(initialEnd);
    }
  }, [duration, maxDuration, endTime, onEndTimeChange]);

  const setStartTime = (time: number) => {
    const clamped = Math.max(0, Math.min(time, endTime - minDuration));
    setStartTimeState(clamped);
    onStartTimeChange?.(clamped);
  };

  const setEndTime = (time: number) => {
    const clamped = Math.min(duration, Math.max(time, startTime + minDuration));
    setEndTimeState(clamped);
    onEndTimeChange?.(clamped);
  };

  const handleMouseDown = (type: "start" | "end") => {
    if (disabled) return;
    setIsDragging(type);
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: "start" | "end") => {
    if (disabled) return;

    const step = duration / 100; // 1% of duration
    let newTime: number;

    if (type === "start") {
      if (e.key === "ArrowRight") {
        newTime = Math.min(startTime + step, endTime - minDuration);
        setStartTime(newTime);
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        newTime = Math.max(0, startTime - step);
        setStartTime(newTime);
        e.preventDefault();
      }
    } else {
      if (e.key === "ArrowRight") {
        newTime = Math.min(duration, endTime + step);
        setEndTime(newTime);
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        newTime = Math.max(startTime + minDuration, endTime - step);
        setEndTime(newTime);
        e.preventDefault();
      }
    }
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !timelineRef.current || duration === 0) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const time = percentage * duration;

    if (Math.abs(time - startTime) < Math.abs(time - endTime)) {
      setStartTime(time);
    } else {
      setEndTime(time);
    }
  };

  useEffect(() => {
    if (!isDragging || !timelineRef.current || duration === 0) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const time = (x / rect.width) * duration;

      if (isDragging === "start") {
        setStartTime(time);
      } else {
        setEndTime(time);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, duration, startTime, endTime, minDuration]);

  return {
    startTime,
    endTime,
    isDragging,
    focusedHandle,
    timelineRef,
    startHandleRef,
    endHandleRef,
    setStartTime,
    setEndTime,
    handleMouseDown,
    handleKeyDown,
    handleTimelineClick,
    setFocusedHandle,
  };
};

