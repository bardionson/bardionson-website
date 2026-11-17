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
                <section aria-labelledby="statement" className="mb-10">
                    <h2 id="statement" className="text-2xl font-bold mt-10 mb-4">Artist statement</h2>
                    <p className="text-lg leading-relaxed text-white/80">
                        I photograph animal bones against the sky, then train a machine to imagine what else it might have seen.
                        Sometimes I take an image the machine gives me and paint it in oil or turn it into a Polaroid.
                        I’m interested in what happens to a familiar thing as it passes between the physical world, a photograph,
                        and an artificial one. In my installations, that passage is partly in someone else’s hands.
                        A visitor watching an endless stream of images presses a button, and the instant they chose becomes
                        a print they can take home.
                    </p>
                </section>

                <section aria-labelledby="bio" className="mb-12">
                    <h2 id="bio" className="text-2xl font-bold mb-4">Bio</h2>
                    <p className="text-lg leading-relaxed text-white/80">
                        Bård Ionson is an artist working with photography, generative systems, and electronic sculpture.
                        An encounter with one of Nam June Paik’s <em>Internet Dwellers</em> around 2012 drew him toward
                        installation and oscilloscope art. In 2018 he trained a neural network on images of his own oscilloscope
                        work and began minting art on the blockchain. His work is held by the{' '}
                        <a href="https://www.prnewswire.com/news-releases/bard-ionsons-battledore-enters-bodleian-libraries-weston-library-collection-as-nft--physical-artifact-302374375.html" className="underline underline-offset-4">Bodleian Libraries at the University of Oxford</a>,
                        whose collection includes <em>Battledore</em>, and by the{' '}
                        <a href="https://www.sovrn.art/collections/fransisco-carolinum/" className="underline underline-offset-4">Francisco Carolinum</a> in Linz, Austria,
                        which holds <em>Alternate Fires</em> from <em>Painting with Fire</em>.
                    </p>
                </section>
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
                        “You are an artist”
                    </p>
                    <footer className="mt-4 text-white/50 text-sm">— Nam June Paik&apos;s Internet Dweller</footer>
                </blockquote>

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
