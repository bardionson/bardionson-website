import { ArtistBio, ArtistStatement } from "@/components/ArtistProfile";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About — Bård Ionson",
    description: "Bård Ionson’s work is held by the Bodleian Libraries at the University of Oxford and the Francisco Carolinum Museum. Read his bio and artist statement.",
};

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                    Bård Ionson
                </h1>
                <ArtistBio />

                <ArtistStatement />
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
