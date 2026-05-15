import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Balloons In The Sky — Bård Ionson",
  description:
    "The final installment of The Simulation Trilogy. A generative AI installation where your button press mints a unique 1/1 NFT and prints a physical artifact.",
};

const trilogy = [
  { part: "Part I", title: "Painting With Fire", href: "/projects/painting-with-fire", active: false },
  { part: "Part II", title: "Bones In The Sky", href: "/projects/sky-bones", active: false },
  { part: "Part III", title: "Balloons In The Sky", href: "/balloons-in-the-sky", active: true },
];

export default function BalloonsInTheSkyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="container mx-auto px-4 pt-20 pb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 mb-6 text-sm font-medium">
            The Simulation Trilogy — Part III
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-white/50">
            Balloons In The Sky
          </h1>
          <p className="text-xl md:text-2xl text-white/70 font-light leading-relaxed italic">
            &ldquo;A memento vitae — a reminder that you were alive.&rdquo;
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-5xl mx-auto relative aspect-video rounded-3xl overflow-hidden">
          <Image
            src="https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/1778360304211-Walled-City-Of-Gold.jpg"
            alt="Balloons In The Sky by Bård Ionson"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
      </section>

      {/* Description */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto space-y-6 text-white/70 text-lg leading-relaxed">
          <p>
            <em>Balloons In The Sky</em> is the final resolution of The Simulation Trilogy. The journey of this trilogy has been one of gradual elevation and structural discovery. It began with the foundational <em>Painting With Fire</em>, moved through the skeletal desert landscapes of Marfa, Texas—where the second act, <em>Bones In The Sky</em>, premiered at Art Blocks Weekend—and now culminates in <em>Balloons In The Sky</em>. While previous chapters explored the entropy of our digital existence, this act is born from color, weightlessness, and the pursuit of a collective memory.
          </p>
          <p>
            The “ground truth” of this simulation is a dual perspective: Jennifer Ionson captured the vastness and precision of the event through 3,000 digital SLR photographs, while Bård Ionson documented the textured, chemical memory of the morning through 700 frames of 35mm half-frame film. By weaving together digital clarity and analog grain, we created a custom generative AI that understands both the physics of flight and the emotion of the light.
          </p>
          <p>
            Balloons In The Sky is engineered as a self-contained, autonomous art-delivery system—a “living” node designed for archival permanence. A custom StyleGAN architecture navigates a multi-dimensional map of original digital and analog source images. Upon capture, the node simultaneously executes a 1/1 NFT mint on Ethereum mainnet and a high-fidelity print via an integrated dye-sublimation printer. 
          </p>
          <blockquote className="border-l-2 border-primary pl-6 text-white/90 font-medium text-xl italic">
            &ldquo;Your button press is not an automation; it is a signature.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mb-24 text-center">
        <a
          href="https://inthesky.art"
          target="_blank"
          rel="noreferrer"
          className="inline-block bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-medium transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(var(--color-primary),0.4)]"
        >
          Experience the Project at inthesky.art →
        </a>
      </section>

      {/* The Trilogy */}
      <section className="container mx-auto px-4 pb-24 border-t border-white/10 pt-16">
        <h2 className="text-2xl font-bold text-center mb-10">The Simulation Trilogy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {trilogy.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`glassmorphism rounded-2xl p-6 text-center transition-all hover:border-primary/50 ${
                item.active ? "border border-primary/60 bg-primary/10" : ""
              }`}
            >
              <p className="text-xs text-white/40 mb-1">{item.part}</p>
              <h3 className={`font-bold ${item.active ? "text-primary" : "text-white"}`}>
                {item.title}
              </h3>
              {item.active && (
                <span className="inline-block mt-2 text-xs text-primary/80">You are here</span>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
