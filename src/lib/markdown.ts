import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content/news');

export interface ArticleData {
    slug: string;
    title: string;
    date: string;
    excerpt?: string;
    image?: string | null;
    content: string;
}

export function getArticleSlugs() {
    if (!fs.existsSync(contentDirectory)) return [];
    return fs.readdirSync(contentDirectory).filter(file => file.endsWith('.md'));
}

export function getArticleBySlug(slug: string): ArticleData | null {
    try {
        const realSlug = slug.replace(/\.md$/, '');
        const fullPath = path.join(contentDirectory, `${realSlug}.md`);

        if (!fs.existsSync(fullPath)) return null;

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug: realSlug,
            title: data.title || '',
            date: data.date || '',
            excerpt: data.excerpt || '',
            image: data.image || null,
            content: content
        };
    } catch (e) {
        console.error(`Error reading article ${slug}:`, e);
        return null;
    }
}

export function getAllArticles(): ArticleData[] {
    const slugs = getArticleSlugs();
    const articles = slugs
        .map((slug) => getArticleBySlug(slug))
        .filter((article): article is ArticleData => article !== null)
        .sort((a, b) => (new Date(b.date).getTime() > new Date(a.date).getTime() ? 1 : -1));

    return articles;
}
