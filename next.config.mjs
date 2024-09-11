/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/:path*",
        destination: "/api/rewrite",
      },
    ];
  },
};

export default nextConfig;
