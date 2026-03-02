/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fmxqa9jjugng70wj.public.blob.vercel-storage.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
