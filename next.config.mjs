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
        let redirects = [];
        try {
            const articlesJsonPath = path.join(process.cwd(), 'src', 'data', 'articles.json');
            const articles = JSON.parse(fs.readFileSync(articlesJsonPath, 'utf-8'));

            const articleRedirects = articles.map(article => {
                const parts = article.url.replace(/\/$/, '').split('/');
                const slug = parts[parts.length - 1];
                return {
                    source: `/${slug}`,
                    destination: `/news/${slug}`,
                    permanent: true,
                };
            }).filter(r => r.source !== '/'); // prevent root redirect

            redirects = [...articleRedirects];
        } catch (e) {
            console.error('Failed to load articles for redirects', e);
        }

        const legacyProjects = [
            { source: '/artist-portfolio', dest: 'artist-portfolio' },
            { source: '/sky-bones', dest: 'sky-bones' },
            { source: '/painting-with-fire', dest: 'painting-with-fire' },
            { source: '/we-are-anarchy-on-chains', dest: 'we-are-anarchy-on-chains' },
            { source: '/soul-scroll-tech', dest: 'soul-scroll-tech' },
            { source: '/scan', dest: 'scan' },
            { source: '/home', dest: 'home' },
            { source: '/soundwords', dest: 'soundwords' },
            { source: '/sage-anomaly', dest: 'sage-anomaly' },
            { source: '/8-2', dest: 'eight' },
            { source: '/colormagic', dest: 'color-magic' },
            { source: '/bards-freaky-faces', dest: 'freaky-faces' }
        ];

        legacyProjects.forEach(p => {
            redirects.push({ source: p.source, destination: `/projects/${p.dest}`, permanent: true });
            redirects.push({ source: `${p.source}/`, destination: `/projects/${p.dest}`, permanent: true });
        });

        return redirects;
    },
};

export default nextConfig;
