import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  webpack(config) {
    // Tránh Webpack bundle module 'fs' (vì chỉ có trên server)
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
