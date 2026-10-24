import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownToLine, Printer, Frame } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Print at Home | Bård Ionson",
  description: "Nudes At The Beach by Bård Ionson. A $25 digital download with square, 16:9, and 4:3 versions to print yourself. Preview the release on Payhip.",
};

const steps = [
  { icon: ArrowDownToLine, title: "Choose & download", text: "Purchase through Payhip and receive your download link after payment. Your download includes three high-resolution JPEG files, ready to save to your own device." },
  { icon: Printer, title: "Make it physical", text: "Print at home or take the files to your preferred print shop. Choose the square or landscape format that suits your space." },
  { icon: Frame, title: "Find its place", text: "Choose your paper, frame, and a place to live with the work. Printing and framing are arranged by you." },
];

export default function PrintAtHome() {
  const signupAvailable = Boolean(process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID);
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
      <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">← Back to the studio</Link>
      <section className="mt-12 max-w-3xl" aria-labelledby="print-title">
        <p className="text-primary text-sm font-semibold uppercase tracking-[0.2em] mb-5">Digital art. Your space.</p>
        <h1 id="print-title" className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight">Download art.<br /><span className="text-primary">Print it your way.</span></h1>
        <p className="text-lg md:text-xl text-white/70 leading-relaxed mt-8 max-w-2xl">Selected works by Bård Ionson, offered as digital downloads for you to print and enjoy in your own space.</p>
        <div className="flex flex-wrap gap-3 mt-8 text-sm text-white/70">
          {["Personal printing", "Open edition", "Three formats"].map((label) => <span key={label} className="rounded-full border border-white/15 px-4 py-2">{label}</span>)}
        </div>
      </section>

      <section className="mt-16 md:mt-20 glassmorphism rounded-3xl overflow-hidden border-primary/30" aria-labelledby="release-title">
        <div className="grid lg:grid-cols-2">
          <figure className="bg-black/30 p-5 md:p-8 lg:self-start">
            <Image
              src="/print-previews/nudes-at-the-beach-square.jpg"
              alt="Nudes At The Beach by Bård Ionson — square digital print composition"
              width={1200}
              height={1200}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="w-full h-auto rounded-xl"
              priority
            />
            <figcaption className="mt-4 text-xs text-white/50">Square composition shown. Three formats are included in the download.</figcaption>
          </figure>
          <div className="p-6 md:p-10 bg-gradient-to-br from-primary/10 to-transparent">
            <span className="inline-block text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1 text-xs font-medium mb-5">Available now</span>
            <h2 id="release-title" className="text-3xl md:text-4xl font-bold tracking-tight mb-5">Nudes At The Beach</h2>
            <p className="text-white/70 leading-relaxed">Jackson Pollock drip painting meets cubism meets Tiffany in the artificial latent space of a remixed Robbie Barrat nude model. Created with machine learning and artificial intelligence.</p>
            <p className="text-white/60 leading-relaxed mt-4">Three compositions, each generated in its own format with the unusual edges intact.</p>
            <dl className="mt-6 divide-y divide-white/10 text-sm">
              {[
                ["Square", "6048 × 6048 pixels"],
                ["Landscape 16:9", "6144 × 3456 pixels"],
                ["Landscape 4:3", "6144 × 4608 pixels"],
              ].map(([format, dimensions]) => (
                <div key={format} className="flex flex-wrap justify-between gap-2 py-3">
                  <dt className="text-white/80">{format}</dt><dd className="text-white/50">{dimensions}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="text-3xl font-bold">$25 <span className="text-sm font-normal text-white/50">USD</span></span>
              <a href="https://payhip.com/b/D43zs" className="inline-flex justify-center rounded-full bg-primary hover:bg-primary-dark px-6 py-3 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">Get the download →</a>
            </div>
            <p className="text-sm text-primary mt-4">Secure payment and file delivery through Payhip.</p>
            <p className="text-xs text-white/50 leading-relaxed mt-4">Three high-resolution JPEGs. Digital download only; printing and framing are separate. For personal use.</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20" aria-labelledby="how-title">
        <h2 id="how-title" className="text-3xl font-bold mb-10">From the screen to your wall.</h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map(({ icon: Icon, title, text }, index) => (
            <div key={title}>
              <div className="flex items-center justify-between border-b border-white/15 pb-5 mb-5"><Icon className="text-primary" size={28} aria-hidden="true" /><span className="text-sm text-white/40">0{index + 1}</span></div>
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-white/60 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 pt-12 max-w-3xl" aria-labelledby="questions-title">
        <h2 id="questions-title" className="text-3xl font-bold mb-8">Before you print</h2>
        {[
          ["Is a physical print included?", "This is a digital file purchase. You arrange and pay for any printing, framing, and shipping directly with your chosen provider."],
          ["What does open edition mean?", "There is no fixed quantity available during the sale window. These downloads are not numbered editions. This is a limited-time offer; check the Payhip listing for release details."],
          ["Can I use a professional print shop?", "Yes. You may have the files printed by a professional print shop for your own personal enjoyment."],
          ["Can I share or resell the file?", "Files are for personal use. Resale, commercial reproduction, and sharing or redistributing the digital files are not permitted."],
          ["Which sizes can I print?", "The three upscaled JPEGs support prints approximately 20 inches wide at 300 PPI. Choose the matching aspect ratio and ask your printer to retain the entire image, including its textured edges."],
        ].map(([question, answer]) => (
          <details key={question} className="border-b border-white/10 py-5">
            <summary className="cursor-pointer font-medium text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4">{question}</summary>
            <p className="text-white/60 leading-relaxed mt-4">{answer}</p>
          </details>
        ))}
      </section>

      {signupAvailable && <section className="glassmorphism rounded-3xl mt-16 p-8 md:p-10 max-w-3xl" aria-labelledby="updates-title">
        <h2 id="updates-title" className="text-2xl font-semibold mb-3">Future releases from the studio</h2>
        <p className="text-sm text-white/60 leading-relaxed mb-6">Join the studio email list for new work and future releases. You can unsubscribe at any time.</p>
        <NewsletterForm />
      </section>}
    </div>
  );
}
