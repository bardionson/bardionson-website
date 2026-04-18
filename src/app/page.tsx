import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Art */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Hero background image */}
        <Image
          src="https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/bone-flag.jpg"
          alt="Vanishing Of The Genuine: Bone Flag by Bård Ionson"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background z-10" />

        <div className="container relative z-20 px-4 flex flex-col items-center text-center">
          <div className="mb-6 font-serif text-3xl md:text-4xl text-primary font-medium tracking-wide">
            Bård Ionson
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/50">
            Art in the Age of <br />
            <span className="text-primary-dark">Simulated Reality</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 font-light">
            Creating art since 2012. Entered the NFT space in 2018 with SuperRare.
            Creator of Color Magic Planets, The 8, and Naked Flames.
            Exposing the distortions between realities through AI, GANs, and human perception.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/portfolio"
              className="glassmorphism hover:bg-white/10 text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 active:scale-95"
            >
              Explore Portfolio
            </Link>
            <Link
              href="/primary-market"
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 active:scale-95"
            >
              Collect Works
            </Link>
          </div>
        </div>

        {/* Latest Drop Announcement (Overlay) */}
        <div className="absolute bottom-0 left-0 right-0 z-30 container mx-auto px-4 max-w-6xl translate-y-1/2">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 glassmorphism p-6 md:p-8 rounded-2xl border-2 border-primary/40 relative overflow-hidden group shadow-2xl bg-black/40 backdrop-blur-xl">
             <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none group-hover:from-primary/30 transition-colors duration-500" />
             <div className="relative z-10 flex-1">
               <span className="text-primary font-bold tracking-wider text-sm uppercase mb-1 block animate-pulse">Now Available</span>
               <h2 className="text-2xl font-bold text-white mb-2">Fire and Bone</h2>
               <p className="text-base text-white/80 max-w-2xl leading-relaxed">
                 Double Take #1 with Hash Gallery. Extending my interest in elemental materials, transformation, and the slow grammar of the moving image.
               </p>
             </div>
             <div className="relative z-10 shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-4">
               <Link href="/primary-market" className="glassmorphism hover:bg-white/10 text-white px-5 py-2.5 rounded-full font-medium transition-all text-center border border-white/20 text-sm">
                 Watch Video
               </Link>
               <a href="https://www.hashgallery.digital/double-take-1" target="_blank" rel="noreferrer" className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-medium transition-all text-center hover:scale-105 text-sm shadow-[0_0_15px_rgba(var(--color-primary),0.5)]">
                 Collect for $285
               </a>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Works Gallery */}
      <section className="py-20 container mx-auto px-4 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Works</h2>
            <p className="text-white/50">Selected pieces from the studio.</p>
          </div>
          <Link href="/portfolio" className="text-primary hover:text-primary-dark hover:underline underline-offset-4 mt-4 md:mt-0 transition-colors">
            View Full Portfolio →
          </Link>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {[
            { src: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/bone-flag.jpg", title: "Vanishing Of The Genuine: Bone Flag", year: "2024", width: 2048, height: 1152 },
            { src: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/color-magic-planets.png", title: "Color Magic Planets", year: "2022", width: 1536, height: 1536 },
            { src: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/desolation-of-empire.jpg", title: "Desolation Of Empire", year: "2024", width: 1024, height: 1024 },
            { src: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/naked-flames.jpg", title: "Naked Flames", year: "2024", width: 600, height: 338 },
            { src: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/nudes-at-the-beach.jpg", title: "Nudes At The Beach", year: "2019", width: 1000, height: 1000 },
            { src: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/redwood-forest.jpg", title: "From The Redwood Forest", year: "2022", width: 576, height: 1024 },
            { src: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/sg3-seed.png", title: "Painting With Fire", year: "2023", width: 1024, height: 1024 },
            { src: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/bones-in-the-sky.png", title: "Bones In The Sky", year: "2025", width: 930, height: 620 },
            { src: "https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/signed.jpg", title: "Signed Edition", year: "2025", width: 1024, height: 1024 },
          ].map((work, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl glassmorphism hover:border-primary/30 transition-all break-inside-avoid">
              <Image
                src={work.src}
                alt={work.title}
                width={work.width}
                height={work.height}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 block"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="font-bold text-white text-lg">{work.title}</h3>
                <p className="text-white/60 text-sm">{work.year}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About the Artist */}
      <section className="py-20 container mx-auto px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto glassmorphism rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6">About the Artist</h2>
          <p className="text-white/70 leading-relaxed text-lg">
            Bård Ionson is an artist who is exposing the distortions between realities that exist between worlds.
            By combining technique and forces of the world he captures the temporary spaces between the physical,
            electronic, digital and spiritual worlds. These strange visions come from an uncommon combination of
            tools and techniques such as artificial intelligence, GANs, VCRs, CRTs, oscilloscopes, lasers, scanners,
            photography, smart contracts, blockchains and sound.
          </p>
          <p className="text-white/70 leading-relaxed text-lg mt-4">
            He has exhibited art in Valencia, Vienna, Brussels, Paris, Denver, Washington DC, Virgin Islands, Dubai,
            Riyadh, San Francisco, London, Miami, Italy, Manchester, Essen, Berlin, Lisbon and Marfa.
            His collectors have been able to enjoy his art online at SuperRare, Art Blocks, AsyncArt, and Expanded.art.
          </p>
        </div>
      </section>

      {/* Current Exhibitions */}
      <section className="py-20 container mx-auto px-4 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Exhibitions</h2>
            <p className="text-white/50">Where to find Bård&apos;s work globally and digitally.</p>
          </div>
          <Link href="/exhibitions" className="text-primary hover:text-primary-dark hover:underline underline-offset-4 mt-4 md:mt-0 transition-colors">
            View All Exhibitions →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glassmorphism rounded-2xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
            <div className="relative aspect-video">
              <Image src="https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/bones-in-the-sky.png" alt="Bones In The Sky" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Bones In The Sky — Marfa</h3>
              <p className="text-sm text-white/50">Oct 16 – 19, 2025</p>
              <p className="text-xs text-white/40 mt-1">Art Blocks Weekend</p>
            </div>
          </div>
          <div className="glassmorphism rounded-2xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
            <div className="relative aspect-video">
              <Image src="https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/bone-flag.jpg" alt="ABS Digital Art Prize" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">ABS Digital Art Prize</h3>
              <p className="text-sm text-white/50">Arab Bank Switzerland • Lisbon</p>
              <p className="text-xs text-white/40 mt-1">June 4–5, 2025</p>
            </div>
          </div>
          <div className="glassmorphism rounded-2xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
            <div className="relative aspect-video">
              <Image src="https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/naked-flames.jpg" alt="REIMAGINE TOMORROW" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">REIMAGINE TOMORROW</h3>
              <p className="text-sm text-white/50">AI Biennale, Essen</p>
              <p className="text-xs text-white/40 mt-1">Nov 17–24, 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Museum Collections */}
      <section className="py-20 container mx-auto px-4 border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Permanent Museum Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          <a href="https://www.cryptovoxels.com/play?coords=E@148W,125N" target="_blank" rel="noreferrer" className="glassmorphism rounded-2xl p-6 text-center hover:border-primary/50 transition-colors group">
            <h3 className="font-bold group-hover:text-primary transition-colors">Museum of Crypto Art</h3>
            <p className="text-sm text-white/50 mt-1">Paris MoCA</p>
          </a>
          <a href="https://app.museumofcryptoart.com/collection/the-permanent-collection" target="_blank" rel="noreferrer" className="glassmorphism rounded-2xl p-6 text-center hover:border-primary/50 transition-colors group">
            <h3 className="font-bold group-hover:text-primary transition-colors">Museum of Crypto Art</h3>
            <p className="text-sm text-white/50 mt-1">NY MOCA</p>
          </a>
          <a href="https://www.mocda.org/artists/b%C3%A5rd-ionson" target="_blank" rel="noreferrer" className="glassmorphism rounded-2xl p-6 text-center hover:border-primary/50 transition-colors group">
            <h3 className="font-bold group-hover:text-primary transition-colors">MoCDA</h3>
            <p className="text-sm text-white/50 mt-1">Museum of Contemporary Digital Art</p>
          </a>
          <a href="https://bardionson.com/oxford-university-nft/" target="_blank" rel="noreferrer" className="glassmorphism rounded-2xl p-6 text-center hover:border-primary/50 transition-colors group">
            <h3 className="font-bold group-hover:text-primary transition-colors">Bodleian Library</h3>
            <p className="text-sm text-white/50 mt-1">Oxford University</p>
            <p className="text-xs text-white/30 mt-1 italic">Battledore</p>
          </a>
          <a href="https://x.com/ooeculture/status/2000913855791149466" target="_blank" rel="noreferrer" className="glassmorphism rounded-2xl p-6 text-center hover:border-primary/50 transition-colors group">
            <h3 className="font-bold group-hover:text-primary transition-colors">Francisco Carolinum</h3>
            <p className="text-sm text-white/50 mt-1">Museum, Linz</p>
            <p className="text-xs text-white/30 mt-1 italic">Painting With Fire</p>
          </a>
        </div>
      </section>
    </div>
  );
}
