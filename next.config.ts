import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smwftcudujqqbjucjsfh.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/Uploads/**',
        search: '',
      },
    ],
  },
}
export default nextConfig;
