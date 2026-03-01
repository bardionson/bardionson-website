import Link from "next/link";

export default function PortfolioPage() {
    const works = [
        {
            title: "Vanishing Of The Genuine: Bone Flag",
            description: "An exploration of reality and a culture moving into a simulated world. What is real, what is death and what is life? Inspired by Georgia O\u0027Keeffe, Jean Baudrillard and Jasper Johns — we see bones in the sky as AI simulated fragments of film photography. The surreal world of living in a simulation has now arrived.",
            link: "https://www.transient.xyz/nfts/ethereum/0x787f1a337ad0a4c5641bbc0b81ceb5123130b771/1",
            platform: "Transient.xyz",
        },
        {
            title: "Color Magic Planets",
            description: "Released on ArtBlocks. An exploration of generative planetary bodies, where algorithms dictate the atmosphere, terrain, and color palettes of undiscovered worlds.",
            link: "https://www.artblocks.io/collection/color-magic-planets-by-bard-ionson",
            platform: "Art Blocks",
        },
        {
            title: "The 8",
            description: "A seminal piece of generative art exploring numerical symbolism and mathematical beauty through code. Released on ArtBlocks.",
            link: "https://www.artblocks.io/collection/8-by-bard-ionson",
            platform: "Art Blocks",
        },
        {
            title: "Naked Flames",
            description: "\u0022The nude fire. Grasping at identity is like a flicker of fire. The flame goes out when held too tightly. The desire to know brings more uncertainty. In the age of artificial intelligence, we are learning to live with the anxiety of our naked uncertainty. Our nakedness meets the flame.\u0022",
            link: "https://www.expanded.art/collections/bard-ionson-naked-flames",
            platform: "Expanded.art",
        },
        {
            title: "California Collection",
            description: "Summer 2022 — A family trip gathering the vision and vibes of California. The roads, deserts, fields of artichokes, strawberries, chickpeas and vineyards of grapes, the ocean, wild life and the great redwoods. Over 2,000 images feed a StyleGAN2 model. The abundance of open space and nature has eliminated human made objects from the model.",
            link: "https://makersplace.com/bardionson/gallery/created/california-collection",
            platform: "MakersPlace",
        },
        {
            title: "SAGE Anomaly",
            description: "Series on Async Art with a Sci-Fi backstory. A multi-layered artwork exploring narrative, code, and digital autonomy.",
            link: "http://sageanomaly.com",
            platform: "AsyncArt",
        },
        {
            title: "We Are Anarchy On Chain",
            description: "Blockchain art on Ethereum and Bitcoin. Generated from a smart contract and stored on chain forever.",
            link: "https://sansa.xyz/collections/we-are-anarchy-on-chain-by-bard-ionson",
            platform: "Sansa / Mint.fun",
        },
        {
            title: "Battledore",
            description: "Created in 2019. Displayed and donated to Oxford University\u0027s Weston Library as part of the Alphabets Alive! exhibition — the first NFT in the library\u0027s collection.",
            link: "https://codex-viewer.com/record/3010",
            platform: "Codex Protocol",
        },
        {
            title: "Future Is Where East And West Touch",
            description: "One of ten finalists for the NFT Art Prize 2023 sponsored by Arab Bank Switzerland. This is artificial intelligence art composed from the ideas and words of the artist which an AI model generated, then edited by the artist.",
            link: "https://artbyarabbank.ch/en/nft-art-prize/about-the-prize/",
            platform: "NFT Art Prize",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                    Portfolio
                </h1>
                <p className="text-xl text-white/70 mb-16 font-light max-w-3xl">
                    A curated selection of works exploring the intersection of artificial intelligence,
                    blockchain technology, and the nature of simulated reality.
                </p>

                <div className="grid gap-8">
                    {works.map((work, i) => (
                        <div key={i} className={`glassmorphism rounded-3xl p-8 flex flex-col md:flex-row ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''} gap-8 items-center hover:border-primary/30 transition-all group`}>
                            <div className="w-full md:w-2/5 aspect-square bg-white/5 rounded-2xl overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                                    <span className="text-sm">{work.title}</span>
                                </div>
                            </div>
                            <div className="w-full md:w-3/5">
                                <div className="flex items-center gap-3 mb-3">
                                    <h2 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">{work.title}</h2>
                                </div>
                                <span className="inline-block text-xs bg-primary/20 text-primary border border-primary/30 rounded-full px-3 py-1 mb-4">{work.platform}</span>
                                <p className="text-white/60 mb-6 leading-relaxed">{work.description}</p>
                                <a href={work.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-primary hover:text-white font-medium pb-1 border-b border-primary/30 hover:border-primary transition-all">
                                    View Collection →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
