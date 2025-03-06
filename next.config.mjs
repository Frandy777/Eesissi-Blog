import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 配置图片优化
    formats: ['image/avif', 'image/webp'],
    // 如果有外部图片源，可以在这里添加
    // domains: ['example.com'],
    // 如果需要使用远程图片，可以添加匹配模式
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'example.com',
    //     port: '',
    //     pathname: '/images/**',
    //   },
    // ],
  },
};

export default withNextIntl(nextConfig); 