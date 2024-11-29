/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["moodverse.blob.core.windows.net"], // Add your Blob Storage domain here
  },
};

module.exports = nextConfig;