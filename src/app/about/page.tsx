import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About — Bård Ionson",
    description: "Bio and artist statement for Bård Ionson, pioneer of crypto and generative art.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                    Bård Ionson
                </h1>
                <p className="text-xl text-white/60 mb-16 font-light">
                    Exposing Distortions Between Realities — Digital Art
                </p>

                {/* Hero image */}
                <div className="glassmorphism rounded-3xl overflow-hidden mb-16 aspect-[4/3] relative">
                    <Image
                        src="https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/nudes-at-the-beach.jpg"
                        alt="Bård Ionson art"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 896px"
                    />
                </div>

                {/* Quote */}
                <blockquote className="glassmorphism rounded-2xl p-8 mb-12 border-l-4 border-primary">
                    <p className="text-2xl md:text-3xl font-serif text-white/90 italic leading-relaxed">
                        "You are an artist"
                    </p>
                    <footer className="mt-4 text-white/50 text-sm">— Nam June Paik&apos;s Internet Dweller</footer>
                </blockquote>

                {/* Bio */}
                <section className="glassmorphism rounded-2xl p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-6">Artist Bio</h2>
                    <div className="space-y-5 text-white/70 leading-relaxed text-lg">
                        <p>
                            Bård Ionson is a pioneer of crypto and generative art. He first minted on the blockchain in 2018
                            and has been an OG crypto artist with an extensive catalogue ever since. He is an artist who is
                            exposing the distortions between realities that exist between worlds — by combining technique and
                            forces of the world he captures the temporary spaces between the physical, electronic, digital
                            and spiritual worlds.
                        </p>
                        <p>
                            These strange visions come from an uncommon combination of tools and techniques such as artificial
                            intelligence, GANs, VCRs, CRTs, oscilloscopes, lasers, scanners, photography, smart contracts,
                            blockchains and sound. His collaborative approach between creator and algorithmic systems uses
                            GAN-algorithms to help flesh out small universes across multiple mediums spanning image and
                            written word — a strange, ultra-expressive tango capitalizing on what AIs do best: generate —
                            and what humans do: imagine.
                        </p>
                        <p>
                            He has exhibited art in Valencia, Vienna, Brussels, Paris, Denver, Washington DC, Virgin Islands,
                            Dubai, Riyadh, San Francisco, London, Miami, Italy, Manchester, Essen, Berlin, Lisbon and Marfa.
                            His collectors have been able to enjoy his art online at SuperRare, Art Blocks, AsyncArt,
                            and Expanded.art.
                        </p>
                    </div>
                </section>

                {/* Artistic Style */}
                <section className="glassmorphism rounded-2xl p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-6">Style</h2>
                    <div className="space-y-4 text-white/70 leading-relaxed">
                        <p>
                            Ionson favors cohesion of color over cohesion of form. Edges blend, objects meld together,
                            yet subjects remain recognizable. His work explores fighter pilots, aliens, rockets, and
                            "higher" themes — with recent work focusing deeply on the human soul.
                        </p>
                        <p>
                            The SAGE Anomaly series merges generative artwork with traditional storytelling — a narrative
                            involving aliens, radar technology, degenerative Alzheimer&apos;s, and a mystery spanning decades.
                            One work, <em>Representation of the Entity v. 4</em>, resides in the Museum of Crypto Art&apos;s
                            Genesis Collection.
                        </p>
                    </div>
                </section>

                {/* Credentials */}
                <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                    <div className="glassmorphism rounded-2xl p-6 text-center">
                        <div className="text-3xl font-bold text-primary mb-2">2012</div>
                        <p className="text-white/60 text-sm">Creating art since</p>
                    </div>
                    <div className="glassmorphism rounded-2xl p-6 text-center">
                        <div className="text-3xl font-bold text-primary mb-2">2018</div>
                        <p className="text-white/60 text-sm">First minted on blockchain</p>
                    </div>
                    <div className="glassmorphism rounded-2xl p-6 text-center">
                        <div className="text-3xl font-bold text-primary mb-2">20+</div>
                        <p className="text-white/60 text-sm">Cities exhibited globally</p>
                    </div>
                </section>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href="/cv"
                        className="glassmorphism hover:bg-white/10 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 text-center"
                    >
                        Full CV &amp; Exhibitions →
                    </Link>
                    <Link
                        href="/portfolio"
                        className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 text-center"
                    >
                        View Portfolio →
                    </Link>
                </div>

            </div>
        </div>
    );
}
