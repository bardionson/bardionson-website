import { notFound } from 'next/navigation';
import { getExhibitionBySlug, getAllExhibitions } from '@/lib/exhibitions';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';

export async function generateStaticParams() {
    const exhibitions = getAllExhibitions();
    return exhibitions.map((ex) => ({
        slug: ex.slug,
    }));
}

export default function ExhibitionPage({ params }: { params: { slug: string } }) {
    const exhibition = getExhibitionBySlug(params.slug);

    if (!exhibition) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl pt-32 min-h-screen">
            <Link href="/exhibitions" className="inline-block mb-8 text-neutral-400 hover:text-white transition-colors">
                ← Back to Exhibitions
            </Link>

            <article className="prose prose-invert lg:prose-xl mx-auto prose-img:rounded-xl prose-a:text-blue-400">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{exhibition.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-neutral-400 mb-8 border-b border-neutral-800 pb-8">
                    <span className="bg-neutral-800 px-3 py-1 rounded-full text-sm">{exhibition.year}</span>
                    {exhibition.link && (
                        <a href={exhibition.link} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                            Visit Project Link
                        </a>
                    )}
                </div>

                {exhibition.image && (
                    <img
                        src={exhibition.image}
                        alt={exhibition.title}
                        className="w-full h-auto rounded-xl mb-12 shadow-2xl"
                    />
                )}

                <div className="mt-8 prose-headings:font-bold prose-a:text-primary hover:prose-a:text-white prose-img:rounded-2xl">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {exhibition.content}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
