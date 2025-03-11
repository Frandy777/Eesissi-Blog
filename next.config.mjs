import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 配置图片优化
    formats: ['image/avif', 'image/webp'],
    // 允许的外部图片域名
    domains: ['z3.ax1x.com', 'z1.ax1x.com', 'z2.ax1x.com', 'imgse.com', 'i.imgur.com'],
    // 如果需要使用更复杂的远程图片配置，可以使用remotePatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ax1x.com',
      },
      {
        protocol: 'https',
        hostname: '**.imgur.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig); 