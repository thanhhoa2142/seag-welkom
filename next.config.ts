import type { NextConfig } from "next";
import autoImport from "unplugin-auto-import/webpack";

const nextConfig: NextConfig = {
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

export default nextConfig;
