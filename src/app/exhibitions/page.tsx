import Link from "next/link";
import Image from "next/image";

export default function ExhibitionsPage() {
    const exhibitions = [
        {
            title: "Bones In The Sky — Marfa",
            date: "October 16 – 19, 2025",
            venue: "Art Blocks Weekend, Marfa, Texas",
            description: "Introducing a new AI art experience exclusive to Marfa. An immersive exploration built at the intersection of generative art and the raw Texas landscape.",
            link: "https://sky-bones.bardionson.com",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/bones-in-the-sky.png"
        },
        {
            title: "ABS Digital Art Prize — Vanishing Of The Genuine: Bone Flag",
            date: "June 4–5, 2025",
            venue: "Arab Bank Switzerland, Lisbon",
            description: "Ten art pieces were selected for the ABS Digital Art Prize. Vanishing Of The Genuine: Bone Flag is an exploration of reality and a culture moving into a simulated world. Inspired by Georgia O'Keeffe, Jean Baudrillard and Jasper Johns — we see bones in the sky as AI simulated fragments of film photography.",
            link: "https://www.arabbank.ch/about-us/art/abs-prize/2025-edition/",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/bone-flag.jpg"
        },
        {
            title: "REIMAGINE TOMORROW — AI Biennale",
            date: "November 17–24, 2024",
            venue: "Heilig Geist, Zeche Zollverein, Essen, Germany",
            description: "EXPANDED.ART presents the international group exhibition curated by Anika Meier. Over 50 international artists reflect on the near future, in which humans and machines will come closer together. Featured: the California Collection — over 2,000 images feeding a StyleGAN2 model, capturing the vision and vibes of a California road trip.",
            link: "https://www.expanded.art/exhibitions/reimagine-tomorrow-ai-biennale",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/redwood-forest.jpg"
        },
        {
            title: "NAKED FLAMES — The Path To The Present 1954–2024",
            date: "July 2 – August 10, 2024",
            venue: "Expanded Art, Berlin",
            description: "\"The nude fire. Grasping at identity is like a flicker of fire. The flame goes out when held too tightly. In the age of artificial intelligence, we are learning to live with the anxiety of our naked uncertainty. The textures evoke the color and form of paintings from a distance and merge the human form with fire.\"",
            link: "https://www.expanded.art/exhibitions/the-path-to-the-present",
            image: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/naked-flames.jpg"
        },
        {
            title: "Painting With Fire: A History in GANs",
            date: "December 20, 2023",
            venue: "Curated On Sovrn Art",
            description: "An odyssey of the GAN. Bård explores the nature of AI and GAN in the metaphor of fire.",
            link: "https://www.sovrn.art/curated/painting-with-fire",
        },
        {
            title: "Alphabets Alive! — Oxford University",
            date: "July 18, 2023 – January 24, 2024",
            venue: "Weston Library, Oxford University",
            description: "Battledore (2019) was displayed and donated into the library's collection — the first NFT in the library's collection. Curated by Robert Bolick for Books on Books.",
            link: "https://books-on-books.com/2023/07/19/alphabets-alive/",
        },
        {
            title: "NFT Art Prize 2023 — Short List",
            date: "June 7–8, 2023",
            venue: "Non Fungible Conference, Lisbon",
            description: "\"Future Is Where East And West Touch\" — One of ten finalists sponsored by Arab Bank Switzerland. Time and technology changes the minds of humans. We can evolve and come together. There is a new reality that becomes possible that was once impossible.",
            link: "https://artbyarabbank.ch/en/nft-art-prize/about-the-prize/",
        },
    ];

    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                    Exhibitions
                </h1>
                <p className="text-xl text-white/60 mb-16 font-light">
                    Selected exhibitions, prizes, and curatorial projects.
                </p>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-white/10 to-transparent" />

                    <div className="space-y-12">
                        {exhibitions.map((ex, i) => (
                            <div key={i} className="relative pl-12 md:pl-20 group">
                                {/* Timeline dot */}
                                <div className="absolute left-2.5 md:left-6.5 top-2 w-3 h-3 rounded-full bg-primary/50 border-2 border-primary group-hover:bg-primary group-hover:shadow-[0_0_12px_rgba(129,140,248,0.5)] transition-all" />

                                <div className="glassmorphism rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all flex flex-col md:flex-row gap-6 items-start">
                                    {ex.image && (
                                        <div className="w-full md:w-1/3 aspect-video md:aspect-square bg-white/5 rounded-xl overflow-hidden relative shrink-0">
                                            <Image
                                                src={ex.image}
                                                alt={ex.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                                            <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{ex.title}</h2>
                                            <span className="text-sm text-white/40 whitespace-nowrap">{ex.date}</span>
                                        </div>
                                        <p className="text-sm text-primary/80 mb-3">{ex.venue}</p>
                                        <p className="text-white/60 leading-relaxed mb-4">{ex.description}</p>
                                        {ex.link && (
                                            <a href={ex.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-primary hover:text-white font-medium text-sm transition-colors">
                                                View Details →
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
