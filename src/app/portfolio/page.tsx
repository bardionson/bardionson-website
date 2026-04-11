import Link from "next/link";
import Image from "next/image";

export default function PortfolioPage() {
    const works = [
        {
            title: "Vanishing Of The Genuine: Bone Flag",
            description: "An exploration of reality and a culture moving into a simulated world. What is real, what is death and what is life? Inspired by Georgia O'Keeffe, Jean Baudrillard and Jasper Johns — we see bones in the sky as AI simulated fragments of film photography. The surreal world of living in a simulation has now arrived.",
            link: "https://www.transient.xyz/nfts/ethereum/0x787f1a337ad0a4c5641bbc0b81ceb5123130b771/1",
            platform: "Transient.xyz",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/bone-flag.jpg"
        },
        {
            title: "Color Magic Planets",
            description: "Released on ArtBlocks. An exploration of generative planetary bodies, where algorithms dictate the atmosphere, terrain, and color palettes of undiscovered worlds.",
            link: "https://www.artblocks.io/collection/color-magic-planets-by-bard-ionson",
            platform: "Art Blocks",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/color-magic-planets.png"
        },
        {
            title: "The 8 (Art Blocks)",
            description: "A seminal piece of generative art exploring numerical symbolism and mathematical beauty through code. View the collection on ArtBlocks.",
            link: "https://www.artblocks.io/collection/8-by-bard-ionson",
            platform: "Art Blocks",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/eight-41000017-1024x1024.webp"
        },
        {
            title: "Naked Flames",
            description: "\"The nude fire. Grasping at identity is like a flicker of fire. The flame goes out when held too tightly. The desire to know brings more uncertainty. In the age of artificial intelligence, we are learning to live with the anxiety of our naked uncertainty. Our nakedness meets the flame.\"",
            link: "https://www.expanded.art/collections/bard-ionson-naked-flames",
            platform: "Expanded.art",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/naked-flames.jpg"
        },
        {
            title: "California Collection",
            description: "Summer 2022 — A family trip gathering the vision and vibes of California. The roads, deserts, fields of artichokes, strawberries, chickpeas and vineyards of grapes, the ocean, wild life and the great redwoods. Over 2,000 images feed a StyleGAN2 model. The abundance of open space and nature has eliminated human made objects from the model.",
            link: "https://makersplace.com/bardionson/gallery/created/california-collection",
            platform: "MakersPlace",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/redwood-forest.jpg"
        },
        {
            title: "SAGE Anomaly (Async Art)",
            description: "Series on Async Art with a Sci-Fi backstory. A multi-layered artwork exploring narrative, code, and digital autonomy.",
            link: "http://sageanomaly.com",
            platform: "AsyncArt",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/desolation-of-empire.jpg"
        },
        {
            title: "We Are Anarchy On Chain",
            description: "Blockchain art on Ethereum and Bitcoin. Generated from a smart contract and stored on chain forever.",
            link: "https://sansa.xyz/collections/we-are-anarchy-on-chain-by-bard-ionson",
            platform: "Sansa / Mint.fun",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/sg3-seed.png"
        },
        {
            title: "Battledore",
            description: "Created in 2019. Displayed and donated to Oxford University's Weston Library as part of the Alphabets Alive! exhibition — the first NFT in the library's collection.",
            link: "https://codex-viewer.com/record/3010",
            platform: "Codex Protocol",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/battledore.webp"
        },
        {
            title: "Future Is Where East And West Touch",
            description: "One of ten finalists for the NFT Art Prize 2023 sponsored by Arab Bank Switzerland. This is artificial intelligence art composed from the ideas and words of the artist which an AI model generated, then edited by the artist.",
            link: "https://artbyarabbank.ch/en/nft-art-prize/about-the-prize/",
            platform: "NFT Art Prize",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/FutureEastWestTouchSm.webp"
        },
        {
            title: "Scanning the Scanner",
            description: "A generative exploration where the physical device capturing reality is turned upon itself to recursively distort and create. By pulling the light back into the lens block block by block, an infinite feedback loop forms.",
            link: "/projects/scan",
            platform: "Project",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/projects/scan-internet-dweller.jpg"
        },
        {
            title: "Sound Words Poetry Art",
            description: "The poetry and visual performance of the digital soul. Audio waves and words combine to visualize the invisible frequencies between meaning and sound.",
            link: "/projects/soundwords",
            platform: "Project",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/sound-words.jpg"
        },
        {
            title: "Color Magic Planets (Project Detail)",
            description: "An in-depth look at the process and philosophy behind the creation of the Color Magic Planets collection. Understanding the math behind the atmosphere.",
            link: "/projects/color-magic",
            platform: "Project",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/color-magic-planets.png"
        },
        {
            title: "Painting With Fire: A History in GANs",
            description: "An odyssey of the Generative Adversarial Network. Bård explores the nature of AI and GAN in the metaphor of fire. The neural network learns the form of the flame.",
            link: "/projects/painting-with-fire",
            platform: "Project",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/projects/painting-with-fire-NeuralDreamMap.jpg"
        },
        {
            title: "SAGE Anomaly",
            description: "Series on Async Art with a Sci-Fi backstory. A multi-layered artwork exploring narrative, code, and digital autonomy.",
            link: "/projects/sage-anomaly",
            platform: "Project",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/desolation-of-empire.jpg"
        },
        {
            title: "The 8",
            description: "A seminal piece of generative art exploring numerical symbolism and mathematical beauty through code. Released on ArtBlocks.",
            link: "/projects/eight",
            platform: "Project",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/eight-41000017-1024x1024.webp"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                    Portfolio
                </h1>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16">
                    <p className="text-xl text-white/70 font-light max-w-2xl">
                        A curated selection of works exploring the intersection of artificial intelligence,
                        blockchain technology, and the nature of simulated reality.
                    </p>
                    <Link href="/cv" className="glassmorphism hover:bg-white/10 text-white px-6 py-3 rounded-full font-medium transition-all hover:scale-105 inline-flex items-center gap-2 whitespace-nowrap">
                        View Full CV &amp; Exhibitions →
                    </Link>
                </div>

                <div className="grid gap-8">
                    {works.map((work, i) => (
                        <div key={i} className={`glassmorphism rounded-3xl p-8 flex flex-col md:flex-row ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''} gap-8 items-center hover:border-primary/30 transition-all group`}>
                            <div className="w-full md:w-2/5 aspect-square bg-white/5 rounded-2xl overflow-hidden relative group-hover:shadow-[0_0_30px_rgba(129,140,248,0.15)] transition-all">
                                {work.image ? (
                                    <Image
                                        src={work.image}
                                        alt={work.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                                        <span className="text-sm">{work.title}</span>
                                    </div>
                                )}
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
