import Link from "next/link";

export default function CVPage() {
    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                    Curriculum Vitae
                </h1>
                <p className="text-xl text-white/60 mb-16 font-light">
                    Bård Ionson — Fine Artist &amp; Technologist
                </p>

                {/* Bio */}
                <section className="glassmorphism rounded-2xl p-8 mb-12">
                    <h2 className="text-2xl font-bold mb-4">Artist Statement</h2>
                    <p className="text-white/70 leading-relaxed">
                        Creating art since 2012. Bård Ionson is an artist who is exposing the distortions between realities.
                        By combining technique and forces of the world he captures the temporary spaces between the physical,
                        electronic, digital and spiritual worlds. These strange visions come from an uncommon combination of
                        tools and techniques such as artificial intelligence, GANs, VCRs, CRTs, oscilloscopes, lasers, scanners,
                        photography, smart contracts, blockchains and sound.
                    </p>
                </section>

                {/* Selected Exhibitions */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Selected Exhibitions</h2>
                    <div className="space-y-4">
                        {[
                            { year: "2025", title: "Bones In The Sky", venue: "Art Blocks Weekend, Marfa, Texas" },
                            { year: "2025", title: "ABS Digital Art Prize", venue: "Arab Bank Switzerland, Lisbon" },
                            { year: "2024", title: "REIMAGINE TOMORROW — AI Biennale", venue: "Heilig Geist, Essen, Germany" },
                            { year: "2024", title: "NAKED FLAMES — The Path To The Present", venue: "Expanded Art, Berlin" },
                            { year: "2023", title: "Painting With Fire: A History in GANs", venue: "Sovrn Art" },
                            { year: "2023", title: "Alphabets Alive!", venue: "Oxford University, Weston Library" },
                            { year: "2023", title: "NFT Art Prize — Short List", venue: "Non Fungible Conference, Lisbon" },
                        ].map((ex, i) => (
                            <div key={i} className="flex items-start gap-6 py-3 border-b border-white/5">
                                <span className="text-primary font-mono text-sm w-12 shrink-0">{ex.year}</span>
                                <div>
                                    <p className="font-medium text-white">{ex.title}</p>
                                    <p className="text-sm text-white/50">{ex.venue}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Platforms */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Platforms</h2>
                    <div className="flex flex-wrap gap-3">
                        {["SuperRare", "Art Blocks", "AsyncArt", "Expanded.art", "MakersPlace", "Nifty Gateway", "Sansa", "Sovrn Art", "Transient.xyz"].map(p => (
                            <span key={p} className="glassmorphism px-4 py-2 rounded-full text-sm text-white/70">{p}</span>
                        ))}
                    </div>
                </section>

                {/* Museum Collections */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Permanent Museum Collections</h2>
                    <div className="space-y-3">
                        <a href="https://www.cryptovoxels.com/play?coords=E@148W,125N" target="_blank" rel="noreferrer" className="block text-white/70 hover:text-primary transition-colors">Museum of Crypto Art — Paris MoCA</a>
                        <a href="https://app.museumofcryptoart.com/collection/the-permanent-collection" target="_blank" rel="noreferrer" className="block text-white/70 hover:text-primary transition-colors">Museum of Crypto Art — NY MOCA</a>
                        <a href="https://www.mocda.org/artists/b%C3%A5rd-ionson" target="_blank" rel="noreferrer" className="block text-white/70 hover:text-primary transition-colors">Museum of Contemporary Digital Art (MoCDA)</a>
                        <p className="block text-white/70">Oxford University Weston Library — Battledore (2019), first NFT in the collection</p>
                    </div>
                </section>

                {/* Notable Collectors */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Proudly in the Collections of</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "Benoit Couty", "Anne Spalter", "TokenAngels", "BatSoupYum", "Bryan Brinkman",
                            "EZinCrypto", "La Virgen del Crypto", "Elsie Edicurial", "Coldie", "Colborn Bell",
                            "VK_Crypto", "Momus Collection", "The Art Whale", "Jonathan Perkins", "sebdcl",
                            "Roses", "HEX0x6C – Massimo Franceschet", "Fanny Lakoubay", "Eleonora Brizi",
                            "EuroCollector", "Gisel Florez", "Luo Han", "Hacktao", "BoyPreviousDoor",
                            "Shortcut – Jörn Bielewski", "YoungStax", "Brett Shear", "Stanford CS",
                            "Thoreau Centre for the Blockchain Arts", "Brandi Kyle", "Kinchasa",
                            "Stefan Stignei", "Brandon Schwartz", "Vasilis", "JudithESSS", "Mattia Cuttini",
                            "Matt Kane", "Chris Nunes", "Mr. Monk", "Jason Bailey", "Pindar Van Arman",
                            "Jake Johns", "VincentVanDough", "Billy Whistler", "Zaphodok"
                        ].map(name => (
                            <span key={name} className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/60 hover:text-primary hover:border-primary/30 transition-colors">
                                {name}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Contact */}
                <section className="glassmorphism rounded-2xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">Contact</h2>
                    <p className="text-white/60 mb-4">Bård Ionson • 11151 Valley View Dr #525, Bristow, VA 20136</p>
                    <div className="flex justify-center gap-6">
                        <a href="https://twitter.com/bardionson" target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors">Twitter (X)</a>
                        <a href="https://instagram.com/bardionson" target="_blank" rel="noreferrer" className="text-primary hover:text-white transition-colors">Instagram</a>
                    </div>
                </section>
            </div>
        </div>
    );
}
