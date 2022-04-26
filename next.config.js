/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'utils', 'lib', 'components', 'atoms', '__tests__'] // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  }
};

module.exports = nextConfig;
