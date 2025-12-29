import { useState, useEffect } from "react";

export interface UseVideoTrimmerFramesProps {
  video: HTMLVideoElement | null;
  duration: number;
  format: "video" | "audio";
}

export interface UseVideoTrimmerFramesReturn {
  frames: string[];
  isGeneratingFrames: boolean;
}

export const useVideoTrimmerFrames = ({
  video,
  duration,
  format,
}: UseVideoTrimmerFramesProps): UseVideoTrimmerFramesReturn => {
  const [frames, setFrames] = useState<string[]>([]);
  const [isGeneratingFrames, setIsGeneratingFrames] = useState(false);

  useEffect(() => {
    if (format !== "video" || !video || !duration || duration <= 0 || !video.videoWidth || !video.videoHeight) {
      setFrames([]);
      return;
    }

    let cancelled = false;

    const generateFrames = async () => {
      setIsGeneratingFrames(true);
      setFrames([]);

      // Reduce number of frames for better performance - use 12 instead of 20
      const numFrames = Math.min(12, Math.floor(duration / 2)); // Max 12 frames, or 1 per 2 seconds
      const frameTimes: number[] = [];
      const frameUrls: string[] = [];

      for (let i = 0; i < numFrames; i++) {
        frameTimes.push((duration / (numFrames + 1)) * (i + 1)); // Skip first frame (0s)
      }

      // Use smaller canvas for thumbnails to improve performance
      const canvas = document.createElement("canvas");
      const scale = 0.3; // Scale down to 30% for thumbnails
      canvas.width = Math.floor((video.videoWidth || 160) * scale);
      canvas.height = Math.floor((video.videoHeight || 90) * scale);
      const ctx = canvas.getContext("2d", { willReadFrequently: false });

      if (!ctx) {
        setIsGeneratingFrames(false);
        return;
      }

      const originalTime = video.currentTime;
      const originalMuted = video.muted;
      video.muted = true;

      try {
        // Generate frames with small delays to prevent blocking
        for (let i = 0; i < frameTimes.length; i++) {
          if (cancelled) break;

          const time = frameTimes[i];
          video.currentTime = time;

          await new Promise((resolve) => {
            const onSeeked = () => {
              video.removeEventListener("seeked", onSeeked);
              if (!cancelled) {
                try {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  // Use lower quality for faster encoding
                  const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
                  frameUrls.push(dataUrl);
                } catch (err) {
                  console.warn("Error drawing frame:", err);
                }
              }
              resolve(null);
            };
            video.addEventListener("seeked", onSeeked, { once: true });

            // Timeout fallback
            setTimeout(() => {
              video.removeEventListener("seeked", onSeeked);
              resolve(null);
            }, 500);
          });

          // Small delay between frames to prevent UI blocking
          if (i < frameTimes.length - 1 && !cancelled) {
            await new Promise((resolve) => setTimeout(resolve, 10));
          }
        }
      } catch (error) {
        console.error("Error generating frames:", error);
      } finally {
        if (!cancelled) {
          video.currentTime = originalTime;
          video.muted = originalMuted;
          setFrames(frameUrls);
        }
        setIsGeneratingFrames(false);
      }
    };

    generateFrames();

    return () => {
      cancelled = true;
    };
  }, [video, duration, format]);

  return {
    frames,
    isGeneratingFrames,
  };
};

