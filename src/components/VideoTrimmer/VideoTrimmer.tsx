import { useState, useRef, useEffect } from "react";
import { VideoTrimmerProps } from "./VideoTrimmer.types";
import "./VideoTrimmer.css";

export const VideoTrimmer = ({
  src,
  onTrim,
  minDuration = 1,
  maxDuration,
  className,
  style,
  format = "video",
  quality = 0.8,
  disabled = false,
  error,
  helperText,
  label,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
}: VideoTrimmerProps) => {
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isDragging, setIsDragging] = useState<"start" | "end" | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [frames, setFrames] = useState<string[]>([]);
  const [isGeneratingFrames, setIsGeneratingFrames] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [isTrimming, setIsTrimming] = useState(false);
  const [focusedHandle, setFocusedHandle] = useState<"start" | "end" | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const frameCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const startHandleRef = useRef<HTMLDivElement>(null);
  const endHandleRef = useRef<HTMLDivElement>(null);

  const srcUrl = typeof src === "string" ? src : URL.createObjectURL(src);
  
  // Generate unique IDs for accessibility
  const id = `videotrimmer-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error || errorState ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId, ariaDescribedBy].filter(Boolean).join(" ") || undefined;

  useEffect(() => {
    const media = format === "video" ? videoRef.current : audioRef.current;
    if (!media) return;

    const handleLoadStart = () => {
      setIsVideoLoading(true);
    };

    const handleLoadedMetadata = async () => {
      setIsVideoLoading(false);
      setErrorState(null);
      const mediaDuration = media.duration;
      if (isNaN(mediaDuration) || mediaDuration <= 0) {
        setErrorState("Invalid media file. Could not load duration.");
        return;
      }
      setDuration(mediaDuration);
      setEndTime(Math.min(mediaDuration, maxDuration || mediaDuration));
      
      // Generate frames for video timeline asynchronously
      if (format === "video" && videoRef.current) {
        // Don't await - let it run in background
        generateFrames(videoRef.current, mediaDuration).catch((err) => {
          console.error("Error generating frames:", err);
          setErrorState("Failed to generate video preview frames.");
        });
      }
    };
    
    const handleError = () => {
      setIsVideoLoading(false);
      setErrorState("Failed to load media file. Please check the file format and try again.");
    };

    const handleTimeUpdate = () => {
      const current = media.currentTime;
      setCurrentTime(current);
      if (current >= endTime) {
        media.pause();
        setIsPlaying(false);
        media.currentTime = startTime;
      }
    };

    media.addEventListener("loadstart", handleLoadStart);
    media.addEventListener("loadedmetadata", handleLoadedMetadata);
    media.addEventListener("timeupdate", handleTimeUpdate);
    media.addEventListener("error", handleError);

    return () => {
      media.removeEventListener("loadstart", handleLoadStart);
      media.removeEventListener("loadedmetadata", handleLoadedMetadata);
      media.removeEventListener("timeupdate", handleTimeUpdate);
      media.removeEventListener("error", handleError);
    };
  }, [format, endTime, startTime, maxDuration]);

  useEffect(() => {
    return () => {
      if (typeof src !== "string" && srcUrl) {
        URL.revokeObjectURL(srcUrl);
      }
    };
  }, [src, srcUrl]);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !timelineRef.current) return;
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const time = percentage * duration;

    if (Math.abs(time - startTime) < Math.abs(time - endTime)) {
      const newStart = Math.max(0, Math.min(time, endTime - minDuration));
      setStartTime(newStart);
      const media = format === "video" ? videoRef.current : audioRef.current;
      if (media) media.currentTime = newStart;
    } else {
      const newEnd = Math.min(duration, Math.max(time, startTime + minDuration));
      setEndTime(newEnd);
    }
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
        const media = format === "video" ? videoRef.current : audioRef.current;
        if (media) media.currentTime = newTime;
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        newTime = Math.max(0, startTime - step);
        setStartTime(newTime);
        const media = format === "video" ? videoRef.current : audioRef.current;
        if (media) media.currentTime = newTime;
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

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!timelineRef.current || !duration) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const time = (x / rect.width) * duration;

      if (isDragging === "start") {
        const newStart = Math.max(0, Math.min(time, endTime - minDuration));
        setStartTime(newStart);
        const media = format === "video" ? videoRef.current : audioRef.current;
        if (media) media.currentTime = newStart;
      } else {
        const newEnd = Math.min(duration, Math.max(time, startTime + minDuration));
        setEndTime(newEnd);
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
  }, [isDragging, duration, startTime, endTime, minDuration, format]);

  const handlePlayPause = () => {
    if (disabled) return;
    const media = format === "video" ? videoRef.current : audioRef.current;
    if (!media) return;

    if (isPlaying) {
      media.pause();
      setIsPlaying(false);
    } else {
      media.currentTime = startTime;
      media.play().catch((err) => {
        console.error("Error playing media:", err);
        setErrorState("Failed to play media. Please check your browser's autoplay settings.");
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleTrim = async () => {
    if (!onTrim || disabled || isTrimming) return;

    setIsTrimming(true);
    setErrorState(null);

    try {
      // For video trimming, we'll use canvas to extract frames
      // For audio, we'll use Web Audio API
      if (format === "video" && videoRef.current) {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        const video = videoRef.current;
        const originalTime = video.currentTime;
        video.currentTime = startTime;

        await new Promise((resolve) => {
          video.addEventListener("seeked", resolve, { once: true });
        });

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              onTrim(blob, startTime, endTime);
            }
          },
          "video/webm",
          quality
        );

        video.currentTime = originalTime;
      } else if (format === "audio" && audioRef.current) {
        // For audio, create a trimmed version using Web Audio API
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const response = await fetch(srcUrl);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const startSample = Math.floor(startTime * audioBuffer.sampleRate);
        const endSample = Math.floor(endTime * audioBuffer.sampleRate);
        const length = endSample - startSample;

        const newBuffer = audioContext.createBuffer(
          audioBuffer.numberOfChannels,
          length,
          audioBuffer.sampleRate
        );

        for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
          const oldData = audioBuffer.getChannelData(channel);
          const newData = newBuffer.getChannelData(channel);
          for (let i = 0; i < length; i++) {
            newData[i] = oldData[startSample + i];
          }
        }

        // Convert to blob (simplified - in production, use a proper audio encoder)
        onTrim(new Blob([newBuffer.getChannelData(0).buffer]), startTime, endTime);
      }
    } catch (error) {
      console.error("Error trimming media:", error);
      setErrorState(error instanceof Error ? error.message : "Failed to trim media. Please try again.");
    } finally {
      setIsTrimming(false);
    }
  };

  const generateFrames = async (video: HTMLVideoElement, duration: number) => {
    if (!duration || duration <= 0 || !video.videoWidth || !video.videoHeight) {
      return;
    }
    
    setIsGeneratingFrames(true);
    
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
        const time = frameTimes[i];
        video.currentTime = time;
        
        await new Promise((resolve) => {
          const onSeeked = () => {
            video.removeEventListener("seeked", onSeeked);
            try {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              // Use lower quality for faster encoding
              const dataUrl = canvas.toDataURL("image/jpeg", 0.6);
              frameUrls.push(dataUrl);
            } catch (err) {
              console.warn("Error drawing frame:", err);
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
        if (i < frameTimes.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }
    } catch (error) {
      console.error("Error generating frames:", error);
    } finally {
      video.currentTime = originalTime;
      video.muted = originalMuted;
      setFrames(frameUrls);
      setIsGeneratingFrames(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const startPercent = duration > 0 ? (startTime / duration) * 100 : 0;
  const endPercent = duration > 0 ? (endTime / duration) * 100 : 0;
  const currentPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const displayError = error || errorState;
  
  return (
    <div
      ref={containerRef}
      className={`balanceui-videotrimmer ${disabled ? "balanceui-videotrimmer-disabled" : ""} ${className || ""}`}
      style={{ 
        ...style,
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
      role="group"
      aria-label={ariaLabel || label || "Video trimmer"}
      aria-describedby={describedBy}
      aria-disabled={disabled}
    >
      {label && (
        <label
          htmlFor={id}
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: displayError ? "var(--bu-error, #d32f2f)" : "var(--bu-fg, #000)",
          }}
        >
          {label}
        </label>
      )}
      {format === "video" ? (
        <div style={{ position: "relative", width: "100%" }}>
          {isVideoLoading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                borderRadius: "var(--bu-radius-md, 0.375rem)",
                zIndex: 10,
                color: "#fff",
                fontSize: "0.875rem",
              }}
            >
              Loading video...
            </div>
          )}
          <video
            ref={videoRef}
            src={srcUrl}
            style={{
              width: "100%",
              maxHeight: "400px",
              borderRadius: "var(--bu-radius-md, 0.375rem)",
              border: displayError 
                ? "1px solid var(--bu-error, #d32f2f)" 
                : "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
              boxShadow: displayError
                ? "0 0 0 1px var(--bu-error, #d32f2f)"
                : "0 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#000",
            }}
            playsInline
            preload="metadata"
            aria-label="Video preview"
          />
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))",
            borderRadius: "var(--bu-radius-md, 0.375rem)",
            border: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          }}
        >
          Audio File
        </div>
      )}
      <audio ref={audioRef} src={srcUrl} style={{ display: "none" }} />

      <div
        style={{
          marginTop: "1rem",
          padding: "1.5rem",
          backgroundColor: "var(--bu-surface, #fff)",
          borderRadius: "var(--bu-radius-md, 0.375rem)",
          border: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div
          ref={timelineRef}
          className="balanceui-videotrimmer-timeline"
          onClick={handleTimelineClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              const rect = timelineRef.current?.getBoundingClientRect();
              if (rect) {
                const x = rect.width / 2;
                const percentage = x / rect.width;
                const time = percentage * duration;
                const newStart = Math.max(0, Math.min(time, endTime - minDuration));
                setStartTime(newStart);
                const media = format === "video" ? videoRef.current : audioRef.current;
                if (media) media.currentTime = newStart;
              }
            }
          }}
          tabIndex={disabled ? -1 : 0}
          role="slider"
          aria-label="Timeline"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          aria-disabled={disabled}
          style={{
            position: "relative",
            height: "5rem",
            backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))",
            borderRadius: "var(--bu-radius-md, 0.375rem)",
            cursor: disabled ? "not-allowed" : "pointer",
            marginBottom: "1.5rem",
            overflow: "hidden",
            display: "flex",
            border: displayError
              ? "1px solid var(--bu-error, #d32f2f)"
              : "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
            boxShadow: displayError
              ? "0 0 0 1px var(--bu-error, #d32f2f)"
              : "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
            transition: "all 0.2s ease",
            outline: "none",
          }}
          onFocus={(e) => {
            if (!disabled) {
              e.currentTarget.style.boxShadow = "0 0 0 2px var(--bu-primary, #1976d2)";
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = displayError
              ? "0 0 0 1px var(--bu-error, #d32f2f)"
              : "inset 0 2px 4px rgba(0, 0, 0, 0.06)";
          }}
        >
          {format === "video" && (
            <>
              {isGeneratingFrames && frames.length === 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))",
                    color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                    fontSize: "0.75rem",
                    zIndex: 1,
                  }}
                >
                  Generating preview...
                </div>
              )}
              {frames.length > 0 && (
                <>
                  {frames.map((frame, index) => (
                    <img
                      key={index}
                      src={frame}
                      alt={`Frame ${index}`}
                      style={{
                        flex: 1,
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                      loading="lazy"
                    />
                  ))}
                </>
              )}
            </>
          )}
          {/* Darken unselected parts - left side */}
          {startPercent > 0 && (
            <div
              style={{
                position: "absolute",
                left: 0,
                width: `${startPercent}%`,
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                pointerEvents: "none",
                zIndex: 1,
                transition: "opacity 0.2s ease",
              }}
            />
          )}
          {/* Darken unselected parts - right side */}
          {endPercent < 100 && (
            <div
              style={{
                position: "absolute",
                right: 0,
                width: `${100 - endPercent}%`,
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                pointerEvents: "none",
                zIndex: 1,
                transition: "opacity 0.2s ease",
              }}
            />
          )}
          {/* Selected range border highlight */}
          <div
            style={{
              position: "absolute",
              left: `${startPercent}%`,
              width: `${endPercent - startPercent}%`,
              height: "100%",
              border: "2px solid var(--bu-primary, #1976d2)",
              boxSizing: "border-box",
              pointerEvents: "none",
              zIndex: 2,
              transition: "all 0.2s ease",
            }}
          />
          {/* Start handle */}
          <div
            ref={startHandleRef}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown("start");
            }}
            onKeyDown={(e) => handleKeyDown(e, "start")}
            onFocus={() => setFocusedHandle("start")}
            onBlur={() => setFocusedHandle(null)}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-label="Start time"
            aria-valuemin={0}
            aria-valuemax={endTime - minDuration}
            aria-valuenow={startTime}
            aria-disabled={disabled}
            className={`balanceui-videotrimmer-handle balanceui-videotrimmer-handle-start ${focusedHandle === "start" ? "balanceui-videotrimmer-handle-focused" : ""}`}
            style={{
              position: "absolute",
              left: `${startPercent}%`,
              top: 0,
              width: "0.75rem",
              height: "100%",
              backgroundColor: "var(--bu-primary, #1976d2)",
              cursor: disabled ? "not-allowed" : "ew-resize",
              transform: "translateX(-50%)",
              zIndex: 3,
              borderRadius: "var(--bu-radius-sm, 0.25rem)",
              boxShadow: focusedHandle === "start"
                ? "0 0 0 3px rgba(25, 118, 210, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)"
                : "0 2px 8px rgba(0, 0, 0, 0.2)",
              transition: "all 0.2s ease",
              outline: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "3px",
                height: "60%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "2px",
              }}
            />
          </div>
          {/* End handle */}
          <div
            ref={endHandleRef}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown("end");
            }}
            onKeyDown={(e) => handleKeyDown(e, "end")}
            onFocus={() => setFocusedHandle("end")}
            onBlur={() => setFocusedHandle(null)}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-label="End time"
            aria-valuemin={startTime + minDuration}
            aria-valuemax={duration}
            aria-valuenow={endTime}
            aria-disabled={disabled}
            className={`balanceui-videotrimmer-handle balanceui-videotrimmer-handle-end ${focusedHandle === "end" ? "balanceui-videotrimmer-handle-focused" : ""}`}
            style={{
              position: "absolute",
              left: `${endPercent}%`,
              top: 0,
              width: "0.75rem",
              height: "100%",
              backgroundColor: "var(--bu-primary, #1976d2)",
              cursor: disabled ? "not-allowed" : "ew-resize",
              transform: "translateX(-50%)",
              zIndex: 3,
              borderRadius: "var(--bu-radius-sm, 0.25rem)",
              boxShadow: focusedHandle === "end"
                ? "0 0 0 3px rgba(25, 118, 210, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)"
                : "0 2px 8px rgba(0, 0, 0, 0.2)",
              transition: "all 0.2s ease",
              outline: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "3px",
                height: "60%",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "2px",
              }}
            />
          </div>
          {/* Current time indicator */}
          <div
            style={{
              position: "absolute",
              left: `${currentPercent}%`,
              top: 0,
              width: "3px",
              height: "100%",
              backgroundColor: "#fff",
              transform: "translateX(-50%)",
              pointerEvents: "none",
              zIndex: 4,
              boxShadow: "0 0 8px rgba(0,0,0,0.6), 0 0 4px rgba(255,255,255,0.8)",
              transition: "left 0.1s linear",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "0",
                height: "0",
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "8px solid #fff",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <div style={{ fontSize: "0.875rem", color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
            {formatTime(startTime)} - {formatTime(endTime)}
          </div>
          <button
            type="button"
            onClick={handlePlayPause}
            disabled={disabled}
            className="balanceui-videotrimmer-play-button"
            aria-label={isPlaying ? "Pause playback" : "Play preview"}
            style={{
              padding: "0.625rem 1.25rem",
              border: "none",
              borderRadius: "var(--bu-radius-md, 0.375rem)",
              backgroundColor: disabled 
                ? "var(--bu-disabled, rgba(0, 0, 0, 0.12))"
                : "var(--bu-primary, #1976d2)",
              color: "#fff",
              cursor: disabled ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
              fontWeight: 500,
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "all 0.2s ease",
              opacity: disabled ? 0.6 : 1,
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>

        {onTrim && (
          <button
            type="button"
            onClick={handleTrim}
            disabled={disabled || isTrimming}
            className="balanceui-videotrimmer-trim-button"
            aria-label="Trim and download media"
            style={{
              width: "100%",
              padding: "0.875rem",
              border: "none",
              borderRadius: "var(--bu-radius-md, 0.375rem)",
              backgroundColor: disabled || isTrimming
                ? "var(--bu-disabled, rgba(0, 0, 0, 0.12))"
                : "var(--bu-primary, #1976d2)",
              color: "#fff",
              cursor: disabled || isTrimming ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
              fontWeight: 600,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              transition: "all 0.2s ease",
              opacity: disabled || isTrimming ? 0.6 : 1,
            }}
          >
            {isTrimming ? "Trimming..." : "Trim & Download"}
          </button>
        )}
      </div>
      
      {displayError && (
        <div
          id={errorId}
          role="alert"
          style={{
            marginTop: "0.5rem",
            fontSize: "0.75rem",
            color: "var(--bu-error, #d32f2f)",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
          }}
        >
          <span>⚠</span>
          <span>{displayError}</span>
        </div>
      )}
      
      {helperText && !displayError && (
        <div
          id={helperId}
          style={{
            marginTop: "0.5rem",
            fontSize: "0.75rem",
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
          }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

