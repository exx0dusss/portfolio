import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // memoizes components and hooks at build time, so no manual useMemo/memo
  reactCompiler: true,
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
        destination: "/projects/exd-download-app",
        permanent: true,
      },
      // ExdDownloaderApp became ExdDownloadApp in Nov 2026: its pages, in any
      // language, and the images under its old folder
      // (the page itself has its own rule: ":path*" with nothing after the
      // slug would redirect to a trailing slash, and from there a second time)
      {
        source: "/projects/exd-downloader-app",
        destination: "/projects/exd-download-app",
        permanent: true,
      },
      {
        source: "/projects/exd-downloader-app/:path+",
        destination: "/projects/exd-download-app/:path+",
        permanent: true,
      },
      {
        source: "/:lang(en|uk|ru)/projects/exd-downloader-app",
        destination: "/:lang/projects/exd-download-app",
        permanent: true,
      },
      {
        source: "/:lang(en|uk|ru)/projects/exd-downloader-app/:path+",
        destination: "/:lang/projects/exd-download-app/:path+",
        permanent: true,
      },
      // the CV downloads under my name
      { source: "/resume.pdf", destination: "/tymur-mustafaiev-cv.pdf", permanent: true },
      { source: "/tymur-mustafaiev.pdf", destination: "/tymur-mustafaiev-cv.pdf", permanent: true },
    ];
  },
};

export default nextConfig;
