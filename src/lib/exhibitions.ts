import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const exhibitionsDir = path.join(process.cwd(), 'src/content/exhibitions');

export interface ExhibitionData {
    slug: string;
    title: string;
    year: string;
    image?: string;
    link?: string;
    content: string;
    venue?: string;
    dateStr?: string;
}

export function getAllExhibitions(): ExhibitionData[] {
    if (!fs.existsSync(exhibitionsDir)) {
        return [];
    }

    const fileNames = fs.readdirSync(exhibitionsDir);

    const exhibitions = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(exhibitionsDir, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            const { data, content } = matter(fileContents);

            return {
                slug,
                title: data.title || 'Untitled Exhibition',
                year: data.year ? String(data.year) : '2020',
                image: data.image || '',
                link: data.link || '',
                venue: data.venue || '',
                dateStr: data.dateStr || '',
                content,
            };
        });

    return exhibitions.sort((a, b) => {
        return parseInt(b.year || '0') - parseInt(a.year || '0');
    });
}

export function getExhibitionBySlug(slug: string): ExhibitionData | undefined {
    const exhibitions = getAllExhibitions();
    return exhibitions.find((exhibition) => exhibition.slug === slug);
}
