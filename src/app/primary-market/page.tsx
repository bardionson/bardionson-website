import Link from "next/link";
import PrimaryWorksGrid from "@/components/PrimaryWorksGrid";

export default function PrimaryMarketPage() {
    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 mb-6 text-sm font-medium">
                        Available For Collection
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                        Primary Market
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                        Newly released series and individual works available directly from the artist studio.
                    </p>
                </div>

                {/* Highlighted Release */}
                <section className="glassmorphism rounded-3xl p-8 md:p-12 mb-20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                        <div className="w-full lg:w-1/2 aspect-[4/3] bg-black/50 rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                            <img src="/images/projects/sky-bones-000050420055-print-sm-v.jpg" alt="Bones In The Sky" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                        </div>

                        <div className="w-full lg:w-1/2 space-y-6">
                            <span className="text-primary font-bold tracking-wider text-sm uppercase">Curated Release</span>
                            <h2 className="text-4xl font-bold text-white">Bones In The Sky</h2>
                            <p className="text-white/70 text-lg leading-relaxed">
                                The foundational piece of the upcoming Marfa and Lisbon exhibitions. This work explores the blending of desert landscapes with the surreal algorithmic interventions of style GANs.
                            </p>

                            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-6 items-center">
                                <div>
                                    <p className="text-sm text-white/50 mb-1">Platform</p>
                                    <p className="font-bold">Sky Bones</p>
                                </div>
                                <div>
                                    <p className="text-sm text-white/50 mb-1">Edition</p>
                                    <p className="font-bold">1 of 1</p>
                                </div>
                                <div>
                                    <p className="text-sm text-white/50 mb-1">Price</p>
                                    <p className="font-bold">2.5 ETH</p>
                                </div>
                            </div>

                            <div className="pt-4">
                                <a
                                    href="https://sky-bones.bardionson.com/marketplace"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium transition-colors"
                                >
                                    View on Sky Bones
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mb-20">
                    <PrimaryWorksGrid />
                </div>

                <div className="text-center pt-8 border-t border-white/10">
                    <Link href="/secondary-market" className="text-white/70 hover:text-white transition-colors">
                        Looking for older works? Browse the Secondary Market →
                    </Link>
                </div>
            </div>
        </div>
    );
}
