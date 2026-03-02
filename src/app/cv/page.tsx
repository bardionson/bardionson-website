import Link from "next/link";

export default function CVPage() {
    const soloExhibitions = [
        { year: "2019", title: "ARTificial", venue: "Machine Learning Conference, Chantilly, Va." },
        { year: "2019", title: "Working Together", venue: "ElectroRent product launch, London" },
        { year: "2019", title: "ARTificial", venue: "Bull Run Library, Manassas, Va." },
    ];

    const selectedExhibitions = [
        // Current-2025
        { year: "2025", title: "Spam series, From Spam To Slop", venue: "L’avant Galerie Vossen, Paris" },
        { year: "2025", title: "Bones In The Sky", venue: "Art Blocks Weekend, Marfa Texas" },
        { year: "2025", title: "Painting With Fire", venue: "Sovrn Pop up gallery Marfa Texas" },
        { year: "2025", title: "Vanishing Of The Genuine: Bone Flag", venue: "Digital Art Prize Arab Bank, Lisbon" },
        { year: "2025", title: "Extinction, Cult Of Crypto Art", venue: "NFC Summit, Lisbon" },
        { year: "2025", title: "Vapors Of Culture", venue: "Oculus Digital Visions, NYC" },
        { year: "2025", title: "California & Vanishing Of The Genuine works", venue: "ArtCrush Gallery, worldwide" },
        // 2024
        { year: "2024", title: "Life Of Fire", venue: "Imagine Today, MUD Gallery, Shanghai" },
        { year: "2024", title: "Naked Flames, Path To The Present", venue: "Expanded Art Gallery, Berlin, Germany" },
        { year: "2024", title: "Vineyard Mountain, Reimagine Tomorrow", venue: "Expanded Art, Essen, Germany" },
        { year: "2024", title: "Battledore, Alphabets Alive", venue: "Weston Library, University of Oxford, England" },
        { year: "2024", title: "We Love The Art Optimism award", venue: "We Love The Art" },
        // 2023
        { year: "2023", title: "Hypercubus, Continuum", venue: "Accelerate Art, Barcelona, Spain" },
        { year: "2023", title: "We're All Gonna..", venue: "For the Culture, ArtPoint, Paris" },
        { year: "2023", title: "Future is Where East & West Touch", venue: "NFT Art Prize, Arab Bank, Lisbon, Portugal" },
        { year: "2023", title: "Tomato McMeme, McDo Meme", venue: "NFT Factory, Paris" },
        { year: "2023", title: "La Trahison de l’IA (The Treachery of Ai), 100% AI", venue: "*it doesn’t exist, NFT Factory, Paris" },
        { year: "2023", title: "Color of Crypto & Freaky Faces", venue: "MoCA Collection, IHAM Gallery, Paris" },
        { year: "2023", title: "The Dance, Ça sent le Crypto-Sapin", venue: "NFT Factory, Paris" },
        { year: "2023", title: "Multiple works", venue: "Historic NFT Fest, Barcelona, Spain" },
        { year: "2023", title: "Slice of the Pie", venue: "Collab Sebastian Schmieg & Silvio Lorusso DYOR Kunsthalle, Zurich" },
        // 2022
        { year: "2022", title: "Soul Scroll Installation & California Series", venue: "CADAF Crypto & Digital Art Fair, New York" },
        { year: "2022", title: "Four 3D works", venue: "TechCrunch Disrupt, San Francisco" },
        { year: "2022", title: "Crypto Art-Begins book launch", venue: "multiple pieces, New York" },
        { year: "2022", title: "Abstraction of the Mind 8", venue: "NFT Show Europe, Valencia, Spain" },
        { year: "2022", title: "Squeeze, collaboration with Oleksiy Sai", venue: "Vienna Contemporary Art Fair, Vienna" },
        { year: "2022", title: "Abstraction of Mind 4", venue: "Riyadh Next World Forum, Riyadh, Saudi Arabia" },
        { year: "2022", title: "The Prophesy street projection", venue: "Artcrush, Brussels" },
        { year: "2022", title: "The HODL Frame", venue: "Icons Of Crypto Art, Dubai, UAE" },
        // 2021
        { year: "2021", title: "Knights of the Apocalypse", venue: "CryptoArt Revolution, Paris" },
        { year: "2021", title: "Mysterious Value", venue: "Mint Gold Dust, New York" },
        { year: "2021", title: "Representation of the Entity", venue: "U’R,L Group Exhibition, IRL Art Gallery, Denver" },
        { year: "2021", title: "Presidential Portrait 2017-2021", venue: "Outside Forces, Art Enables, Washington" },
        { year: "2021", title: "Life Is Green & Alien Life Of Venus", venue: "Art for Space, MOCDA, Virtual" },
        { year: "2021", title: "Eternal Flame, collaboration with Braulio Crespo", venue: "Virgin Islands Jam Fest, St. John, USVI" },
        // 2020
        { year: "2020", title: "Three Little Gods", venue: "Digital Art Month, CADAF, New York" },
        { year: "2020", title: "λίμνη Στύγα", venue: "Museum Of Contemporary Digital Art, Virtual" },
        { year: "2020", title: "Close Our Eyes", venue: "Outside Forces, Art Enables, Washington" },
        { year: "2020", title: "Nine works of art", venue: "CADAF Online Art Fair, Virtual" },
        { year: "2020", title: "Welcome To Earth & The AI Spawns", venue: "Virtual Rare Art Fair, Virtual" },
        { year: "2020", title: "Fight Crown 19", venue: "CoinFestUK, Decentraland, Virtual" },
        { year: "2020", title: "Decentralized Culture Lost", venue: "D&F Tower projection, Denver" },
        { year: "2020", title: "Ethangelist", venue: "EthDenver, Denver" },
        { year: "2020", title: "Space Cross & Structural Jesus", venue: "Virgen del Crypto Exhibit, Denver" },
        { year: "2020", title: "Ethangelist", venue: "Miami Blockchain Week, Miami" },
        // 2019
        { year: "2019", title: "Two video, Five digital AI works", venue: "CADAF, Miami" },
        { year: "2019", title: "Communing With Internet Dweller", venue: "DappCon Berlin Institute of Tech, Berlin" },
        { year: "2019", title: "Nudes at the Beach", venue: "International Digital Art Fest, iDAF, Manchester, England" },
        { year: "2019", title: "The HODL Frame & Air-Coin-Artdrop", venue: "Rare Art Festival, New York" },
        { year: "2019", title: "Bufficorn", venue: "EthDenver, Denver" },
        { year: "2019", title: "Big Net Of Dreams", venue: "Fight Fear, Tolmezzo, Italy" },
    ];

    const publications = [
        { year: "2025", text: "History Of Bitcoin, Slashdot Effect, Smashtoshi" },
        { year: "2022", text: "Crypto Art- Begins, book by Andrea Concas & Eleonora Brizi, Rizzoli, October 18" },
        { year: "2022", text: "Crypto Art Begins: The Marvelous Stories of 50 Crypto Artists, Panelist, CADAF New York, November 12" },
        { year: "2022", text: "D'artiste en difficulté à créateur d'art numérique à succès, Robert Spotlight Livestream, October 14" },
        { year: "2022", text: "Bard Ionson: la tecnologia NFT ci sta cambiando, online article by Mariam Ndiaye, Artuu.it, September 1" },
        { year: "2022", text: "Bard Ionson: NFT Technology is Changing Us, online article, ArtsRights, September 5" },
        { year: "2022", text: "Episode 59 Bård Ionson, ArtBoxDMV talk radio show, by Jason at WERA, April 7" },
        { year: "2022", text: "Bård Ionson Discusses Crypto Culture, Custom Smart Contracts & How NFTs Empower Artists To Thrive, YouTube interview by NewForum, May 18" },
        { year: "2021", text: "NFT Crypto Artists Make More Money With Royalties, Toilets Make Happy Green Bug & More, Video interview by Ann Marie Alanes, March 6" },
        { year: "2021", text: "Episode 5: GENESIS Artist - Bard Ionson, Mint Gold Dust podcast, Eleonora Brizi, August 4" },
        { year: "2020", text: "Distortion Genius: Bård Ionson, a Singular Artist for a New Age, online article by William M. Peaster, November 6" },
        { year: "2020", text: "Looking, liking and locating: aesthetic experiences shape spatial representations, academic paper by Mariana Babo Rebelo, et al, Institute of Cognitive Neuroscience, University College, London, May 29" },
        { year: "2020", text: "Episode 34 Bard Ionson, ArtBoxDMV talk radio show, by Jason at WERA, September 24" }
    ];

    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-4">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                        Curriculum Vitae
                    </h1>
                    <a href="/Bard_Ionson_CV_2025.pdf" target="_blank" rel="noreferrer" className="mt-4 md:mt-0 glassmorphism hover:bg-white/10 text-white px-6 py-2 rounded-full font-medium transition-all text-sm inline-flex items-center gap-2">
                        Download PDF
                    </a>
                </div>
                <p className="text-xl text-white/60 mb-2 font-light">
                    Bård Ionson — Spiritual - Physical - Digital
                </p>
                <p className="text-primary/80 mb-16 font-mono text-sm">
                    GAN AI Art, CryptoArt, Digital &amp; Installation Art
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

                {/* Permanent Collections */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Permanent Collections</h2>
                    <ul className="space-y-3 list-disc list-inside text-white/70">
                        <li><strong>Battledore</strong>, Bodleian Library, Oxford</li>
                        <li><strong>Representation of the Entity v4</strong>, Museum of CryptoArt, New York</li>
                        <li><strong>Neural Dream Map</strong>, Museum of Crypto Art, Paris</li>
                        <li><strong>Coindrop Still Life</strong>, Museum of Crypto Art, Paris</li>
                        <li><strong>The Color Of Crypto</strong>, Museum of Crypto Art, Paris</li>
                    </ul>
                </section>

                {/* Solo Exhibitions */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Solo Exhibitions</h2>
                    <div className="space-y-4">
                        {soloExhibitions.map((ex, i) => (
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

                {/* Selected Exhibitions */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Selected Exhibitions</h2>
                    <div className="space-y-4">
                        {selectedExhibitions.map((ex, i) => (
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

                {/* Publications & Interviews */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Selected Publications, Articles, Interviews</h2>
                    <div className="space-y-4">
                        {publications.map((pub, i) => (
                            <div key={i} className="flex items-start gap-6 py-3 border-b border-white/5">
                                <span className="text-primary font-mono text-sm w-12 shrink-0">{pub.year}</span>
                                <p className="text-white/70 text-sm leading-relaxed">{pub.text}</p>
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
                    <p className="text-white/60 mb-2">bard.ionson@gmail.com</p>
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
