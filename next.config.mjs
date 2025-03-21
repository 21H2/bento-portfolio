// Import the bundle analyzer at the top of your file
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
  // Add webpack configuration to optimize bundle size
  webpack: (config, { isServer }) => {
    // Split chunks more aggressively
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 30,
      minSize: 10000,
      maxSize: 250000, // Added maxSize to further split large chunks
      cacheGroups: {
        default: false,
        vendors: false,
        framework: {
          name: 'framework',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          priority: 40,
          enforce: true,
        },
        // Separate framer-motion into its own chunk
        framerMotion: {
          name: 'framer-motion',
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          priority: 35,
          enforce: true,
        },
        // Separate other large libraries
        commons: {
          name: 'commons',
          test: /[\\/]node_modules[\\/](tailwind-merge|lucide-react)[\\/]/,
          priority: 30,
          enforce: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // Fix the null context issue by adding a null check
            if (!module.context) {
              return 'npm.unknown';
            }
            const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            if (!match) {
              return 'npm.unknown';
            }
            return `npm.${match[1].replace('@', '')}`;
          },
          priority: 20,
          minChunks: 1,
          reuseExistingChunk: true,
        },
      },
    };

    // Add terser for better minification
    if (!isServer && config.mode === 'production') {
      config.optimization.minimize = true;
    }
    
    // Disable webpack cache for Cloudflare Pages deployment
    if (process.env.CF_PAGES === '1' || process.env.CLOUDFLARE_PAGES === '1') {
      config.cache = false;
    }

    return config;
  },
  // Add compression for static assets
  compress: true,
  // Remove invalid options
  // output: {
  //   fileBasedRouting: false,
  // },
  // swcMinify: true,
}

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

// Wrap nextConfig with the bundle analyzer
export default withBundleAnalyzer(nextConfig);
