import type { NextConfig } from "next";
import autoImport from "unplugin-auto-import/webpack";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/home", permanent: true }];
  },
  images: {
    domains: ["lh5.googleusercontent.com"],
  },
  webpack(config) {
    // Add SVGR support
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.experiments = { layers: true, topLevelAwait: true };

    // Add tree-shaking support for environment variables
    config.plugins.push(
      autoImport({
        // .ts, .tsx
        include: [/\.tsx?$/],
        imports: [
          "react",
          { from: "next", imports: ["Metadata"], type: true },
          { from: "react", imports: ["PropsWithChildren"], type: true },
          { from: "sonner", imports: ["toast"] },
          {
            from: "@/lib/constants",
            imports: [],
          },
          {
            from: "@/lib/utils",
            imports: ["cn", "formatNumber"],
          },
        ],
      })
    );

    return config;
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
