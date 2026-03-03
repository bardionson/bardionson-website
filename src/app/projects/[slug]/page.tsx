import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export async function generateStaticParams() {
    const slugs = getProjectSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.md$/, ""),
    }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const project = getProjectBySlug(resolvedParams.slug);

    if (!project) return notFound();

    return (
        <article className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">{project.title}</h1>
                    {project.originalUrl && (
                        <p className="text-white/40 text-sm">
                            Archived from <a href={project.originalUrl} target="_blank" rel="noreferrer" className="underline">{project.originalUrl}</a>
                        </p>
                    )}
                </header>

                {project.image && (
                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12">
                        <Image src={project.image} alt={project.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 80vw" />
                    </div>
                )}

                <div className="prose prose-invert prose-lg max-w-none prose-img:rounded-xl prose-img:mx-auto prose-a:text-primary hover:prose-a:text-primary-dark prose-headings:font-bold">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{project.content}</ReactMarkdown>
                </div>
            </div>
        </article>
    );
}
