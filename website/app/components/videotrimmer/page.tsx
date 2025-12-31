"use client";

import { useState, useRef, DragEvent } from "react";
import { VideoTrimmer, Card, Badge, Button } from "@balanceui/core";
import Link from "next/link";

// Compact File Upload Component with Drag & Drop - Refactored for better UX
function CompactFileUpload({
  accept,
  onFileSelect,
  label,
  icon,
}: {
  accept: string;
  onFileSelect: (file: File) => void;
  label: string;
  icon: React.ReactNode;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith(accept.split("/")[0])) {
      setIsLoading(true);
      setTimeout(() => {
        onFileSelect(file);
        setIsLoading(false);
      }, 100);
    }
  };

  const handleClick = () => {
    if (!isLoading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setTimeout(() => {
        onFileSelect(file);
        setIsLoading(false);
      }, 100);
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="cursor-pointer transition-all duration-200"
      style={{
        border: `2px dashed ${isDragging ? "var(--bu-primary, #1976d2)" : "var(--bu-border, rgba(0, 0, 0, 0.12))"}`,
        borderRadius: "var(--bu-radius-md, 0.375rem)",
        padding: "clamp(0.75rem, 2vw, 1rem)",
        backgroundColor: isDragging
          ? "rgba(25, 118, 210, 0.04)"
          : "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))",
        textAlign: "center",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isDragging ? "0 4px 12px rgba(25, 118, 210, 0.15)" : "0 1px 3px rgba(0, 0, 0, 0.08)",
        minHeight: "clamp(100px, 15vh, 140px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        style={{ display: "none" }}
        disabled={isLoading}
      />
      {isLoading ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "3px solid var(--bu-primary, #1976d2)",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <p style={{ fontSize: "0.75rem", color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>Loading...</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "clamp(0.5rem, 1.5vw, 0.75rem)" }}>
          <div
            style={{
              width: "clamp(36px, 5vw, 40px)",
              height: "clamp(36px, 5vw, 40px)",
              borderRadius: "50%",
              backgroundColor: "var(--bu-primary, #1976d2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "clamp(18px, 3vw, 20px)",
              transition: "transform 0.2s ease, background-color 0.2s ease",
              transform: isDragging ? "scale(1.1)" : "scale(1)",
            }}
          >
            {icon}
          </div>
          <div>
            <p
              style={{
                fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                fontWeight: 500,
                color: "var(--bu-fg, #000)",
                marginBottom: "0.125rem",
              }}
            >
              {label}
            </p>
            <p
              style={{
                fontSize: "clamp(0.625rem, 1.5vw, 0.75rem)",
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
              }}
            >
              Click or drag to upload
            </p>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default function VideoTrimmerPage() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (file: File, type: "video" | "audio") => {
    setError(null);
    if (type === "video") {
      if (videoSrc) URL.revokeObjectURL(videoSrc);
      setVideoSrc(URL.createObjectURL(file));
    } else {
      if (audioSrc) URL.revokeObjectURL(audioSrc);
      setAudioSrc(URL.createObjectURL(file));
    }
  };

  const handleTrim = (trimmedBlob: Blob, startTime: number, endTime: number) => {
    console.log("Trimmed:", {
      blob: trimmedBlob,
      startTime,
      endTime,
      duration: endTime - startTime,
    });
    const url = URL.createObjectURL(trimmedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trimmed-${Date.now()}.${videoSrc ? "mp4" : "mp3"}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearVideo = () => {
    if (videoSrc) URL.revokeObjectURL(videoSrc);
    setVideoSrc(null);
  };

  const clearAudio = () => {
    if (audioSrc) URL.revokeObjectURL(audioSrc);
    setAudioSrc(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:ml-64">
      <div className="mb-6 sm:mb-8">
        <Link
          href="/components"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
        >
          ← Back to Components
        </Link>
      </div>

      <div className="mb-8 sm:mb-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            VideoTrimmer
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem", alignSelf: "flex-start" }} className="sm:align-self-auto">
            Media
          </Badge>
        </div>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400">
          A powerful video and audio trimmer component with Material Design styling. Select start and end points,
          preview the trimmed section, and export the trimmed media.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          <section id="examples" className="mb-8 sm:mb-12">
            <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Examples
            </h2>

            {/* Video Trimmer Example */}
            <Card
              variant="elevated"
              elevation={2}
              style={{ padding: "clamp(1rem, 3vw, 1.5rem)", marginBottom: "1.5rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Video Trimmer
                </h3>
                {videoSrc && (
                  <Button variant="stroke" size="sm" onClick={clearVideo}>
                    Clear
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {!videoSrc ? (
                  <CompactFileUpload
                    accept="video/*"
                    onFileSelect={(file) => handleFileSelect(file, "video")}
                    label="Upload Video"
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
                      </svg>
                    }
                  />
                ) : (
                  <VideoTrimmer
                    src={videoSrc}
                    format="video"
                    onTrim={handleTrim}
                    minDuration={1}
                    maxDuration={30}
                    label="Video Timeline"
                    helperText="Drag the handles to select the portion you want to keep"
                    disabled={disabled}
                    error={error || undefined}
                  />
                )}
              </div>
            </Card>

            {/* Audio Trimmer Example */}
            <Card
              variant="elevated"
              elevation={2}
              style={{ padding: "clamp(1rem, 3vw, 1.5rem)", marginBottom: "1.5rem" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                  Audio Trimmer
                </h3>
                {audioSrc && (
                  <Button variant="stroke" size="sm" onClick={clearAudio}>
                    Clear
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {!audioSrc ? (
                  <CompactFileUpload
                    accept="audio/*"
                    onFileSelect={(file) => handleFileSelect(file, "audio")}
                    label="Upload Audio"
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                      </svg>
                    }
                  />
                ) : (
                  <VideoTrimmer
                    src={audioSrc}
                    format="audio"
                    onTrim={handleTrim}
                    minDuration={1}
                    maxDuration={60}
                    label="Audio Timeline"
                    helperText="Select the audio segment to trim"
                    disabled={disabled}
                  />
                )}
              </div>
            </Card>

            {/* Custom Duration Limits Example */}
            <Card variant="elevated" elevation={2} style={{ padding: "clamp(1rem, 3vw, 1.5rem)", marginBottom: "1.5rem" }}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Custom Duration Limits & Controls
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Example with minimum 5 seconds and maximum 15 seconds duration
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="stroke" size="sm" onClick={() => setDisabled(!disabled)}>
                    {disabled ? "Enable" : "Disable"} Trimmer
                  </Button>
                  {videoSrc && (
                    <Button variant="stroke" size="sm" onClick={clearVideo}>
                      Clear Video
                    </Button>
                  )}
                </div>
                {videoSrc ? (
                  <VideoTrimmer
                    src={videoSrc}
                    format="video"
                    onTrim={handleTrim}
                    minDuration={5}
                    maxDuration={15}
                    label="Custom Duration Trimmer"
                    helperText="Minimum 5s, Maximum 15s"
                    disabled={disabled}
                  />
                ) : (
                  <CompactFileUpload
                    accept="video/*"
                    onFileSelect={(file) => handleFileSelect(file, "video")}
                    label="Upload Video for Custom Duration Example"
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z" />
                      </svg>
                    }
                  />
                )}
              </div>
            </Card>
          </section>

          <section id="usage" className="mb-8 sm:mb-12">
            <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Usage
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-4 sm:p-6">
              <pre className="text-xs sm:text-sm text-gray-100">
                <code>{`import { VideoTrimmer } from '@balanceui/core'
import { useState } from 'react'

function VideoEditor() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoSrc(URL.createObjectURL(file))
    }
  }

  const handleTrim = (trimmedBlob: Blob, startTime: number, endTime: number) => {
    // Process the trimmed video/audio
    console.log('Trimmed:', { startTime, endTime })
    
    // Download or upload the trimmed blob
    const url = URL.createObjectURL(trimmedBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'trimmed-video.mp4'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileSelect} />
      {videoSrc && (
        <VideoTrimmer
          src={videoSrc}
          format="video"
          onTrim={handleTrim}
          minDuration={1}
          maxDuration={30}
        />
      )}
    </div>
  )
}`}</code>
              </pre>
            </div>
          </section>

          <section id="props">
            <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
              Props
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Prop
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Type
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Default
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      src
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      string | File
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      required
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Video or audio source (URL string or File object)
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      format
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      "video" | "audio"
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      "video"
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Media format type
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      onTrim
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      (blob: Blob, startTime: number, endTime: number) =&gt; void
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Callback when trim is completed
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      minDuration
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      number
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      1
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Minimum trim duration in seconds
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      maxDuration
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      number
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Maximum trim duration in seconds
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      quality
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      number
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      0.8
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Video quality (0-1) for export
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      disabled
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      boolean
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      false
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Disable the trimmer controls
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      label
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      string
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Label text for the trimmer
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      helperText
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      string
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Helper text displayed below the trimmer
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      error
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      string
                    </td>
                    <td className="whitespace-nowrap px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Error message to display
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card
            variant="elevated"
            elevation={2}
            style={{ padding: "1.25rem", position: "sticky", top: "6rem" }}
            className="hidden lg:block"
          >
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#examples"
                  className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 transition-colors"
                >
                  Examples
                </a>
              </li>
              <li>
                <a
                  href="#usage"
                  className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 transition-colors"
                >
                  Usage
                </a>
              </li>
              <li>
                <a
                  href="#props"
                  className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200 transition-colors"
                >
                  Props
                </a>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
