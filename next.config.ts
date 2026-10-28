import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // React <ViewTransition> on route changes: a project's name morphs from the
  // work list into the case-study heading. Unsupported browsers just navigate.
  experimental: {
    viewTransition: true,
  },
  // Projects renamed in Oct 2026; keep old links working.
  async redirects() {
    return [
      { source: "/projects/mylamp", destination: "/projects/salonsvitlo", permanent: true },
      {
        source: "/projects/exd-tiktok-bot",
        destination: "/projects/exd-downloader-app",
        permanent: true,
      },
      // the CV downloads under my name
      { source: "/resume.pdf", destination: "/tymur-mustafaiev-cv.pdf", permanent: true },
      { source: "/tymur-mustafaiev.pdf", destination: "/tymur-mustafaiev-cv.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
