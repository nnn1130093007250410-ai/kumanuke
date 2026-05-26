/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  transpilePackages: ['react-map-gl'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      // mapbox-gl is browser-only — exclude from SSR bundle
      config.resolve.alias['mapbox-gl'] = false
    }
    return config
  },
}

module.exports = nextConfig
