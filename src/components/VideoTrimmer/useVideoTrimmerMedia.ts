import { useState, useEffect, useRef } from "react";

export interface UseVideoTrimmerMediaProps {
  src: string | File;
  format: "video" | "audio";
  onError?: (error: string) => void;
}

export interface UseVideoTrimmerMediaReturn {
  srcUrl: string;
  duration: number;
  currentTime: number;
  isVideoLoading: boolean;
  errorState: string | null;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setCurrentTime: (time: number) => void;
  play: () => Promise<void>;
  pause: () => void;
  seek: (time: number) => Promise<void>;
  isPlaying: boolean;
}

export const useVideoTrimmerMedia = ({
  src,
  format,
  onError,
}: UseVideoTrimmerMediaProps): UseVideoTrimmerMediaReturn => {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTimeState] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const srcUrl = typeof src === "string" ? src : URL.createObjectURL(src);

  useEffect(() => {
    return () => {
      if (typeof src !== "string" && srcUrl) {
        URL.revokeObjectURL(srcUrl);
      }
    };
  }, [src, srcUrl]);

  useEffect(() => {
    const media = format === "video" ? videoRef.current : audioRef.current;
    if (!media) return;

    const handleLoadStart = () => {
      setIsVideoLoading(true);
      setErrorState(null);
    };

    const handleLoadedMetadata = () => {
      setIsVideoLoading(false);
      const mediaDuration = media.duration;
      if (isNaN(mediaDuration) || mediaDuration <= 0) {
        const error = "Invalid media file. Could not load duration.";
        setErrorState(error);
        onError?.(error);
        return;
      }
      setDuration(mediaDuration);
      setErrorState(null);
    };

    const handleTimeUpdate = () => {
      setCurrentTimeState(media.currentTime);
    };

    const handleError = () => {
      setIsVideoLoading(false);
      const error = "Failed to load media file. Please check the file format and try again.";
      setErrorState(error);
      onError?.(error);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTimeState(0);
    };

    media.addEventListener("loadstart", handleLoadStart);
    media.addEventListener("loadedmetadata", handleLoadedMetadata);
    media.addEventListener("timeupdate", handleTimeUpdate);
    media.addEventListener("error", handleError);
    media.addEventListener("play", handlePlay);
    media.addEventListener("pause", handlePause);
    media.addEventListener("ended", handleEnded);

    return () => {
      media.removeEventListener("loadstart", handleLoadStart);
      media.removeEventListener("loadedmetadata", handleLoadedMetadata);
      media.removeEventListener("timeupdate", handleTimeUpdate);
      media.removeEventListener("error", handleError);
      media.removeEventListener("play", handlePlay);
      media.removeEventListener("pause", handlePause);
      media.removeEventListener("ended", handleEnded);
    };
  }, [format, onError]);

  const setCurrentTime = (time: number) => {
    const media = format === "video" ? videoRef.current : audioRef.current;
    if (media) {
      media.currentTime = time;
      setCurrentTimeState(time);
    }
  };

  const play = async () => {
    const media = format === "video" ? videoRef.current : audioRef.current;
    if (!media) return;
    try {
      await media.play();
      setIsPlaying(true);
    } catch (err) {
      const error = "Failed to play media. Please check your browser's autoplay settings.";
      setErrorState(error);
      onError?.(error);
      setIsPlaying(false);
    }
  };

  const pause = () => {
    const media = format === "video" ? videoRef.current : audioRef.current;
    if (media) {
      media.pause();
      setIsPlaying(false);
    }
  };

  const seek = async (time: number): Promise<void> => {
    const media = format === "video" ? videoRef.current : audioRef.current;
    if (!media) return;
    
    return new Promise((resolve) => {
      const handleSeeked = () => {
        media.removeEventListener("seeked", handleSeeked);
        setCurrentTimeState(time);
        resolve();
      };
      media.addEventListener("seeked", handleSeeked, { once: true });
      media.currentTime = time;
      
      // Timeout fallback
      setTimeout(() => {
        media.removeEventListener("seeked", handleSeeked);
        resolve();
      }, 500);
    });
  };

  return {
    srcUrl,
    duration,
    currentTime,
    isVideoLoading,
    errorState,
    videoRef,
    audioRef,
    setCurrentTime,
    play,
    pause,
    seek,
    isPlaying,
  };
};

