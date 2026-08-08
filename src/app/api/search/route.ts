import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/markdown';
import { getAllProjects } from '@/lib/projects';
import { getAllExhibitions } from '@/lib/exhibitions';

export interface SearchItem {
    type: 'news' | 'project' | 'exhibition';
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    url: string;
}

export async function GET() {
    const news: SearchItem[] = getAllArticles().map((a) => ({
        type: 'news',
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt || '',
        date: a.date,
        url: `/news/${a.slug}`,
    }));

    const projects: SearchItem[] = getAllProjects().map((p) => ({
        type: 'project',
        slug: p.slug,
        title: p.title,
        excerpt: p.content.replace(/[#!\[\]()*_`>-]/g, '').slice(0, 150),
        date: p.date,
        url: `/projects/${p.slug}`,
    }));

    const exhibitions: SearchItem[] = getAllExhibitions().map((e) => ({
        type: 'exhibition',
        slug: e.slug,
        title: e.title,
        excerpt: e.venue || e.content.replace(/[#!\[\]()*_`>-]/g, '').slice(0, 150),
        date: e.year,
        url: `/exhibitions/${e.slug}`,
    }));

    const items = [...news, ...projects, ...exhibitions];

    return NextResponse.json(items, {
        headers: { 'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400' },
    });
}
