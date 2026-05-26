/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  transpilePackages: ['react-map-gl', '@vis.gl/react-mapbox', 'mapbox-gl'],
}

module.exports = nextConfig
