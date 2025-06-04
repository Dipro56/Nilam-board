/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'res.cloudinary.com',
      'ratings-images-prod.pulse.ea.com',
    ],
  },
  compilerOptions: {
    forceConsistentCasingInFileNames: true,
  },
};

module.exports = nextConfig;
