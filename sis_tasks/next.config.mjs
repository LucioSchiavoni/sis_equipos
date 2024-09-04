/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "node .next/standalone/server.js",
    typescript:{
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
