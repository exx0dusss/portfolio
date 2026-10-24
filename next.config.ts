import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Projects renamed in Oct 2026; keep old links working.
  async redirects() {
    return [
      { source: "/projects/mylamp", destination: "/projects/salonsvitlo", permanent: true },
      {
        source: "/projects/exd-tiktok-bot",
        destination: "/projects/exd-downloader-app",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
