import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import works from "@/data/california.json";
import VimeoPlayer from "./vimeo-player";

const collectionUrl = "https://superrare.com/bardionson?series=1-0x0faa59d8455bdbad52945d15ed2a5531d00efbad";

export const metadata: Metadata = {
    title: "California | Bård Ionson",
    description: "A California family road trip transformed through photography, StyleGAN2, and moving images. Eight works by Bård Ionson with original descriptions and videos.",
    alternates: { canonical: "https://www.bardionson.com/california" },
    openGraph: {
        title: "California | Bård Ionson",
        description: "The roads, the ocean, the vineyards, and the great redwoods. A series born from a family journey through California.",
        url: "https://www.bardionson.com/california",
        images: [{ url: "https://www.bardionson.com/california/3.webp", width: 1200, height: 1200, alt: "Vineyard Mountain by Bård Ionson" }],
    },
};

export default function CaliforniaPage() {
    return (
        <article className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-6xl mx-auto">
                <Link href="/portfolio" className="text-primary hover:text-white underline underline-offset-4">Portfolio</Link>
                <header className="mt-8 mb-14">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center mb-8">
                        <div>
                            <p className="text-primary uppercase tracking-widest text-sm mb-4">Bård Ionson · California series</p>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">California</h1>
                            <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-6">A family trip gathering the vision and vibes of California. The roads, the ocean, the vineyards, and the great redwoods.</p>
                            <p className="text-white/70 leading-relaxed">Artwork by Bård Ionson. Photography by Bård, Jennifer, and Liza Grace.</p>
                            <a href={collectionUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-primary hover:text-white underline underline-offset-4">View the collection on SuperRare</a>
                        </div>
                        <figure>
                            <a href="#work-3" aria-label="Watch Vineyard Mountain" className="block rounded-2xl overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                                <Image src="/california/3.webp" alt="Vineyard Mountain, where redwood trees and a highway merge with a blue Pacific landscape" width={1200} height={1200} priority className="w-full h-auto" sizes="(max-width: 1024px) 100vw, 50vw" />
                            </a>
                            <figcaption className="mt-3 text-sm text-white/60">Vineyard Mountain · Still from the moving image</figcaption>
                        </figure>
                    </div>
                    <div className="space-y-4 text-lg text-white/65 leading-relaxed max-w-4xl">
                        <p>In summer 2022, we traveled from LA, Anaheim, and Santa Monica through Bakersfield, Monterey Bay, Watsonville, Santa Cruz, Point Reyes, Guerneville, Mountain View, and San Francisco, taking pictures along the way.</p>
                        <p>Thousands of photographs became the material for a StyleGAN2 model. Despite the many vehicles we photographed, the resulting landscapes are filled with open space and nature. I selected and manipulated the output to create these moving images. In <em>Trippin’ Trees</em>, AI next frame prediction sets the redwoods dancing.</p>
                    </div>
                </header>

                <nav aria-label="California artworks" className="mb-14 border-y border-white/10 py-6">
                    <ul className="flex flex-wrap gap-x-6 gap-y-3 text-base text-white/70">
                        {works.map(work => <li key={work.id}><a href={`#work-${work.id}`} className="hover:text-primary underline underline-offset-4">{work.title}</a></li>)}
                    </ul>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-16">
                    {works.map(work => {
                        const paragraphs = work.description.split(/\n\s*\n/);
                        const introduction = paragraphs[0] === "California The Series" ? paragraphs[1] : paragraphs[0];
                        return (
                            <section id={`work-${work.id}`} key={work.id} aria-labelledby={`title-${work.id}`} className="scroll-mt-28 min-w-0">
                                <div className="rounded-2xl overflow-hidden bg-black border border-white/10 flex items-center justify-center h-[min(70vh,560px)]">
                                    <VimeoPlayer id={work.vimeoId} title={work.title} poster={work.poster} width={work.width} height={work.height} />
                                </div>
                                <div className="pt-6">
                                    <p className="text-sm text-primary mb-2">{work.technique} · Moving image</p>
                                    <h2 id={`title-${work.id}`} className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{work.title}</h2>
                                    <p className="text-white/75 leading-relaxed whitespace-pre-line">{introduction}</p>
                                    {paragraphs.length > 1 && (
                                        <details className="mt-4 text-white/65">
                                            <summary className="cursor-pointer text-primary hover:text-white py-2">Full original description</summary>
                                            <div className="space-y-4 pt-3 leading-relaxed">
                                                {paragraphs.map((paragraph, i) => <p key={i} className="whitespace-pre-line">{paragraph}</p>)}
                                            </div>
                                        </details>
                                    )}
                                    <div className="flex flex-wrap gap-x-6 gap-y-3 mt-5 text-base">
                                        <a href={`https://vimeo.com/${work.vimeoId}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-white underline underline-offset-4">Watch on Vimeo</a>
                                        <a href={work.source} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white underline underline-offset-4">Artwork record</a>
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>

                <footer className="mt-20 pt-10 border-t border-white/10 flex flex-wrap items-center gap-x-8 gap-y-4">
                    <Link href="/about" className="text-primary hover:text-white underline underline-offset-4">About the artist</Link>
                    <Link href="/cv" className="text-primary hover:text-white underline underline-offset-4">CV and exhibitions</Link>
                    <a href="mailto:Bard@bardIonson.com?subject=California%20series" className="text-primary hover:text-white underline underline-offset-4">Studio inquiries</a>
                </footer>
            </div>
        </article>
    );
}
