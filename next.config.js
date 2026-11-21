/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    // Note: 外部の画像を使う場合はホストネームを登録する必要がある。動作確認のため追加している
    remotePatterns: [{ protocol: 'https', hostname: 'loremflickr.com' }],
  },
};

module.exports = nextConfig;
