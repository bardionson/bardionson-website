import { getArticleBySlug, getArticleSlugs } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Image from "next/image";

export async function generateStaticParams() {
    return getArticleSlugs().map((slug) => ({
        slug: slug.replace(/\.md$/, ''),
    }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
    const article = getArticleBySlug(params.slug);
    if (!article) return {};
    return {
        title: `${article.title} | Bård Ionson`,
        description: article.excerpt,
    };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
    const article = getArticleBySlug(params.slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/news"
                    className="inline-flex items-center text-white/50 hover:text-primary transition-colors mb-8"
                >
                    ← Back to News
                </Link>

                {article.image && (
                    <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 relative shadow-[0_0_30px_rgba(129,140,248,0.15)]">
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 1024px"
                        />
                    </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 text-white">
                    {article.title}
                </h1>

                <div className="flex items-center gap-4 text-white/40 mb-12 pb-8 border-b border-white/10">
                    <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                </div>

                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-white prose-a:transition-colors prose-img:rounded-2xl">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {article.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
