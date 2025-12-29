"use client";

import { useState } from "react";
import { VideoTrimmer, Card, Badge, Button } from "@balanceui/core";
import Link from "next/link";

export default function VideoTrimmerPage() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "video" | "audio") => {
    const file = e.target.files?.[0];
    if (file) {
      setError(null);
      if (type === "video") {
        setVideoSrc(URL.createObjectURL(file));
      } else {
        setAudioSrc(URL.createObjectURL(file));
      }
    }
  };

  const handleTrim = (trimmedBlob: Blob, startTime: number, endTime: number) => {
    console.log("Trimmed:", {
      blob: trimmedBlob,
      startTime,
      endTime,
      duration: endTime - startTime,
    });
    // You can download or process the trimmed blob here
    const url = URL.createObjectURL(trimmedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trimmed-${Date.now()}.${videoSrc ? "mp4" : "mp3"}`;
    a.click();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/components"
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          ← Back to Components
        </Link>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            VideoTrimmer
          </h1>
          <Badge variant="solid" style={{ fontSize: "0.875rem" }}>
            Media
          </Badge>
        </div>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          A powerful video and audio trimmer component similar to Instagram's trimmer.
          Allows users to select start and end points, preview the trimmed section,
          and export the trimmed media.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Examples
            </h2>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Video Trimmer
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select a video file:
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileSelect(e, "video")}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 dark:file:bg-white dark:file:text-black dark:hover:file:bg-gray-200"
                  />
                </div>
                {videoSrc && (
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
                {!videoSrc && (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">
                      Select a video file to see the trimmer
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Audio Trimmer
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Select an audio file:
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileSelect(e, "audio")}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 dark:file:bg-white dark:file:text-black dark:hover:file:bg-gray-200"
                  />
                </div>
                {audioSrc && (
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
                {!audioSrc && (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">
                      Select an audio file to see the trimmer
                    </p>
                  </div>
                )}
              </div>
            </Card>

            <Card variant="elevated" elevation={2} style={{ padding: "2rem", marginBottom: "2rem" }}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                With Custom Duration Limits & Controls
              </h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Example with minimum 5 seconds and maximum 15 seconds duration
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="stroke"
                    size="sm"
                    onClick={() => setDisabled(!disabled)}
                  >
                    {disabled ? "Enable" : "Disable"} Trimmer
                  </Button>
                </div>
                {videoSrc && (
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
                )}
                {!videoSrc && (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Select a video file first
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Usage
            </h2>
            <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
              <pre className="text-sm text-gray-100">
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

          <section>
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Props
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Prop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Default
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      src
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      string | File
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      required
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Video or audio source (URL string or File object)
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      format
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      "video" | "audio"
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      "video"
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Media format type
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      onTrim
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      (blob: Blob, startTime: number, endTime: number) =&gt; void
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Callback when trim is completed
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      minDuration
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      number
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      1
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Minimum trim duration in seconds
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      maxDuration
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      number
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Maximum trim duration in seconds
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      quality
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      number
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      0.8
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Video quality (0-1) for export
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      className
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      string
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Additional CSS classes
                    </td>
                  </tr>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                      style
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      React.CSSProperties
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      undefined
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Inline styles
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="lg:col-span-1">
          <Card variant="elevated" elevation={2} style={{ padding: "1.5rem", position: "sticky", top: "6rem" }}>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#examples"
                  className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
                >
                  Examples
                </Link>
              </li>
              <li>
                <Link
                  href="#usage"
                  className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
                >
                  Usage
                </Link>
              </li>
              <li>
                <Link
                  href="#props"
                  className="text-sm text-black hover:text-gray-800 dark:text-white dark:hover:text-gray-200"
                >
                  Props
                </Link>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

