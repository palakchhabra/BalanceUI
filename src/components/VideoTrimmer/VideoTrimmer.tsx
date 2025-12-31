import { useState, useEffect, useMemo } from "react";
import { VideoTrimmerProps } from "./VideoTrimmer.types";
import { useVideoTrimmerMedia } from "./useVideoTrimmerMedia";
import { useVideoTrimmerTimeline } from "./useVideoTrimmerTimeline";
import { useVideoTrimmerFrames } from "./useVideoTrimmerFrames";
import { ShimmerElement } from "../Shimmer";
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
  const [isTrimming, setIsTrimming] = useState(false);
  const [trimError, setTrimError] = useState<string | null>(null);

  // Generate unique IDs for accessibility
  const id = useMemo(() => `videotrimmer-${Math.random().toString(36).substr(2, 9)}`, []);

  // Media handling hook
  const {
    srcUrl,
    duration,
    currentTime,
    isVideoLoading,
    errorState: mediaError,
    videoRef,
    audioRef,
    setCurrentTime,
    play,
    pause,
    seek,
    isPlaying,
  } = useVideoTrimmerMedia({
    src,
    format,
    onError: (error) => setTrimError(error),
  });

  // Timeline handling hook
  const {
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
  } = useVideoTrimmerTimeline({
    duration,
    minDuration,
    maxDuration,
    disabled,
    onStartTimeChange: (time) => {
      setCurrentTime(time);
    },
  });

  // Frame generation hook
  const { frames, isGeneratingFrames } = useVideoTrimmerFrames({
    video: videoRef.current,
    duration,
    format,
  });

  // Auto-pause when reaching end time
  useEffect(() => {
    if (isPlaying && currentTime >= endTime) {
      pause();
      seek(startTime);
    }
  }, [currentTime, endTime, startTime, isPlaying, pause, seek]);

  const handlePlayPause = async () => {
    if (disabled) return;
    if (isPlaying) {
      pause();
    } else {
      await seek(startTime);
      await play();
    }
  };

  const handleTrim = async () => {
    if (!onTrim || disabled || isTrimming) return;

    setIsTrimming(true);
    setTrimError(null);

    try {
      if (format === "video" && videoRef.current) {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Failed to get canvas context");
        }

        const video = videoRef.current;
        const originalTime = video.currentTime;
        await seek(startTime);

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              onTrim(blob, startTime, endTime);
            } else {
              setTrimError("Failed to create trimmed video blob");
            }
          },
          "video/webm",
          quality
        );

        await seek(originalTime);
      } else if (format === "audio" && audioRef.current) {
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
      setTrimError(error instanceof Error ? error.message : "Failed to trim media. Please try again.");
    } finally {
      setIsTrimming(false);
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

  const displayError = error || mediaError || trimError;
  const errorId = displayError ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId, ariaDescribedBy].filter(Boolean).join(" ") || undefined;

  return (
    <div
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
          className="balanceui-videotrimmer-label"
          style={{
            display: "block",
            marginBottom: "0.75rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: displayError ? "var(--bu-error, #d32f2f)" : "var(--bu-fg, #000)",
            transition: "color 0.2s ease",
          }}
        >
          {label}
        </label>
      )}

      {/* Video/Audio Preview Area - Responsive & Compact */}
      <div className="balanceui-videotrimmer-preview">
        {format === "video" ? (
          <div style={{ position: "relative", width: "100%", borderRadius: "var(--bu-radius-md, 0.375rem)", overflow: "hidden", minHeight: "clamp(200px, 40vh, 400px)" }}>
            {isVideoLoading && (
              <div className="balanceui-videotrimmer-loading-overlay" style={{ position: "absolute", inset: 0, zIndex: 10 }}>
                <ShimmerElement 
                  width="100%" 
                  height="100%" 
                  style={{ position: "absolute", inset: 0, borderRadius: "var(--bu-radius-md, 0.375rem)" }} 
                />
                <div className="balanceui-videotrimmer-loading-text" style={{ position: "relative", zIndex: 11 }}>
                  Loading video...
                </div>
              </div>
            )}
            <video
              ref={videoRef}
              src={srcUrl}
              className="balanceui-videotrimmer-video"
              style={{
                width: "100%",
                maxHeight: "clamp(200px, 40vh, 400px)",
                minHeight: "clamp(200px, 40vh, 400px)",
                display: "block",
                borderRadius: "var(--bu-radius-md, 0.375rem)",
                border: displayError
                  ? "2px solid var(--bu-error, #d32f2f)"
                  : "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
                boxShadow: displayError
                  ? "0 0 0 1px var(--bu-error, #d32f2f)"
                  : "0 2px 8px rgba(0, 0, 0, 0.08)",
                backgroundColor: "#000",
                objectFit: "contain",
                opacity: isVideoLoading ? 0.3 : 1,
                transition: "opacity 0.3s ease",
              }}
              playsInline
              preload="metadata"
              aria-label="Video preview"
            />
          </div>
        ) : (
          <div
            className="balanceui-videotrimmer-audio-placeholder"
            style={{
              width: "100%",
              height: "clamp(120px, 20vh, 200px)",
              backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))",
              borderRadius: "var(--bu-radius-md, 0.375rem)",
              border: displayError
                ? "2px solid var(--bu-error, #d32f2f)"
                : "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              gap: "0.5rem",
            }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.5 }}>
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Audio File</span>
          </div>
        )}
        <audio ref={audioRef} src={srcUrl} style={{ display: "none" }} />
      </div>

      {/* Timeline Controls Container */}
      <div
        className="balanceui-videotrimmer-controls"
        style={{
          marginTop: "1.25rem",
          padding: "clamp(1rem, 2vw, 1.5rem)",
          backgroundColor: "var(--bu-surface, #fff)",
          borderRadius: "var(--bu-radius-md, 0.375rem)",
          border: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
        }}
      >
        {/* Timeline */}
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
                setStartTime(time);
                setCurrentTime(time);
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
            height: "clamp(3.5rem, 6vw, 5rem)",
            backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))",
            borderRadius: "var(--bu-radius-md, 0.375rem)",
            cursor: disabled ? "not-allowed" : "pointer",
            marginBottom: "1.25rem",
            overflow: "hidden",
            display: "flex",
            border: displayError
              ? "2px solid var(--bu-error, #d32f2f)"
              : "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
            boxShadow: displayError
              ? "0 0 0 1px var(--bu-error, #d32f2f)"
              : "inset 0 2px 4px rgba(0, 0, 0, 0.06)",
            transition: "all 0.2s ease",
            outline: "none",
          }}
        >
          {/* Shimmer loading for frame generation */}
          {format === "video" && isGeneratingFrames && frames.length === 0 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))",
                zIndex: 1,
              }}
            >
              <ShimmerElement width="100%" height="100%" />
            </div>
          )}

          {/* Video frames preview */}
          {format === "video" && frames.length > 0 && (
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

          {/* Darken unselected parts - left side */}
          {startPercent > 0 && (
            <div
              className="balanceui-videotrimmer-overlay-left"
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
              className="balanceui-videotrimmer-overlay-right"
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
            className="balanceui-videotrimmer-selected-range"
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
            className={`balanceui-videotrimmer-handle balanceui-videotrimmer-handle-start ${
              focusedHandle === "start" ? "balanceui-videotrimmer-handle-focused" : ""
            }`}
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
              boxShadow:
                focusedHandle === "start"
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
                backgroundColor: "rgba(255, 255, 255, 0.9)",
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
            className={`balanceui-videotrimmer-handle balanceui-videotrimmer-handle-end ${
              focusedHandle === "end" ? "balanceui-videotrimmer-handle-focused" : ""
            }`}
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
              boxShadow:
                focusedHandle === "end"
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
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Current time indicator */}
          <div
            className="balanceui-videotrimmer-playhead"
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
                width: 0,
                height: 0,
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderTop: "8px solid #fff",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
              }}
            />
          </div>
        </div>

        {/* Time Display & Play Button */}
        <div
          className="balanceui-videotrimmer-time-controls"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: "0.875rem",
              color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
              fontWeight: 500,
            }}
          >
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
              minWidth: "80px",
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>

        {/* Trim Button */}
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
              position: "relative",
              overflow: "hidden",
            }}
          >
            {isTrimming ? (
              <>
                <ShimmerElement width="100%" height="100%" style={{ position: "absolute", inset: 0 }} />
                <span style={{ position: "relative", zIndex: 1 }}>Trimming...</span>
              </>
            ) : (
              "Trim & Download"
            )}
          </button>
        )}
      </div>

      {/* Error Message */}
      {displayError && (
        <div
          id={errorId}
          role="alert"
          className="balanceui-videotrimmer-error"
          style={{
            marginTop: "0.75rem",
            fontSize: "0.75rem",
            color: "var(--bu-error, #d32f2f)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span>⚠</span>
          <span>{displayError}</span>
        </div>
      )}

      {/* Helper Text */}
      {helperText && !displayError && (
        <div
          id={helperId}
          className="balanceui-videotrimmer-helper"
          style={{
            marginTop: "0.75rem",
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
