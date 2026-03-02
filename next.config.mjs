import fs from "fs";
import path from "path";

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
    async redirects() {
        try {
            const articlesJsonPath = path.join(process.cwd(), 'src', 'data', 'articles.json');
            const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

            return articles.map(article => {
                const parts = article.url.replace(/\/$/, '').split('/');
                const slug = parts[parts.length - 1];
                return {
                    source: `/${slug}`,
                    destination: `/news/${slug}`,
                    permanent: true,
                };
            }).filter(r => r.source !== '/'); // prevent root redirect
        } catch (e) {
            console.error('Failed to load articles for redirects', e);
            return [];
        }
    },
};

export default nextConfig;
