import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

export interface ProjectData {
    slug: string;
    title: string;
    date: string;
    image: string | null;
    originalUrl: string;
    content: string;
}

export function getProjectSlugs() {
    if (!fs.existsSync(projectsDirectory)) return [];
    return fs.readdirSync(projectsDirectory).filter((file) => file.endsWith(".md"));
}

export function getProjectBySlug(slug: string): ProjectData | null {
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = path.join(projectsDirectory, `${realSlug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug: realSlug,
            title: data.title || realSlug,
            date: data.date || "",
            image: data.image || null,
            originalUrl: data.originalUrl || "",
            content,
        };
    } catch {
        return null;
    }
}

export function getAllProjects(): ProjectData[] {
    const slugs = getProjectSlugs();
    const projects = slugs
        .map((slug) => getProjectBySlug(slug))
        .filter((project): project is ProjectData => project !== null)
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return projects;
}
