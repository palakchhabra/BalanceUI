import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
    USE_BLOB_STORAGE: process.env.USE_BLOB_STORAGE || "false", // Default to false for local/dev
  },
};

export default nextConfig;
