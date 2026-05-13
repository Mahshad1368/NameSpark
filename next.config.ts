import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGitHubPages ? "/NameSpark" : undefined,
  assetPrefix: isGitHubPages ? "/NameSpark/" : undefined,
};

export default nextConfig;
