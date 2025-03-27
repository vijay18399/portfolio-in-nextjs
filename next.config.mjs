/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ['mui-color-input'],
  output: "export",
  basePath: "/portfolio-in-nextjs", 
  assetPrefix: "/portfolio-in-nextjs/",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vijay18399.github.io',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
};

export default nextConfig;
