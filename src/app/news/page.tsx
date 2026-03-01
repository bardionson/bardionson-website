import Link from "next/link";
import articles from "@/data/articles.json";

export default function NewsPage() {
    // Sort articles by date descending (newest first)
    const sorted = [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Group by year
    const grouped: Record<string, typeof articles> = {};
    sorted.forEach(article => {
        const year = new Date(article.date).getFullYear().toString();
        if (!grouped[year]) grouped[year] = [];
        grouped[year].push(article);
    });

    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                    News &amp; Articles
                </h1>
                <p className="text-xl text-white/60 mb-16 font-light">
                    Studio notes, exhibition announcements, and artist writings.
                </p>

                {Object.entries(grouped).sort(([a], [b]) => Number(b) - Number(a)).map(([year, posts]) => (
                    <div key={year} className="mb-16">
                        <h2 className="text-3xl font-bold mb-8 text-primary/80 border-b border-white/10 pb-4">{year}</h2>
                        <div className="space-y-4">
                            {posts.map((article, i) => (
                                <a
                                    key={i}
                                    href={article.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block glassmorphism rounded-2xl p-6 hover:border-primary/30 transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                                            {article.title}
                                        </h3>
                                        <span className="text-sm text-white/40 whitespace-nowrap shrink-0">
                                            {new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                        </span>
                                    </div>
                                    <p className="text-white/60 text-sm leading-relaxed line-clamp-2">{article.excerpt}</p>
                                    <span className="inline-flex items-center text-primary text-sm mt-3 group-hover:text-white transition-colors">
                                        Read Article →
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
