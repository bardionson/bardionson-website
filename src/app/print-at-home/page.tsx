import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownToLine, Printer, Frame } from "lucide-react";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Print at Home | Bård Ionson",
  description: "Selected digital artworks by Bård Ionson to download and print yourself. Join the studio list for news of the first limited-time, open edition release.",
};

const steps = [
  { icon: ArrowDownToLine, title: "Choose & download", text: "Purchase a selected artwork and receive the digital file, ready to save to your own device." },
  { icon: Printer, title: "Make it physical", text: "Print at home or take the file to your preferred print shop. Each release will include recommended sizes and printing guidance." },
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
        <p className="text-lg md:text-xl text-white/70 leading-relaxed mt-8 max-w-2xl">A small selection of works by Bård Ionson, offered as digital downloads for you to print and enjoy in your own space.</p>
        <div className="flex flex-wrap gap-3 mt-8 text-sm text-white/70">
          {["Personal printing", "Open edition", "Limited-time releases"].map((label) => <span key={label} className="rounded-full border border-white/15 px-4 py-2">{label}</span>)}
        </div>
      </section>
      <section className="mt-16 md:mt-20 glassmorphism rounded-3xl p-8 md:p-12 border-primary/30 relative overflow-hidden" aria-labelledby="release-title">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
        <div className="relative grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <div>
            <span className="inline-block text-primary bg-primary/10 border border-primary/30 rounded-full px-3 py-1 text-xs font-medium mb-5">Coming soon</span>
            <h2 id="release-title" className="text-3xl md:text-4xl font-bold tracking-tight mb-5">Nudes At The Beach</h2>
            <p className="text-white/70 leading-relaxed">Nudes At The Beach (2019) will be part of the first Print at Home selection. Available for a limited time, with no limit on the number sold during the release.</p>
            <p className="text-white/50 leading-relaxed mt-4">The high-resolution print file is being prepared. Pricing, file specifications, and release dates will be announced here before sales open.</p>
          </div>
          <div id="release-updates" className="rounded-2xl border border-white/10 bg-black/20 p-6 md:p-8 min-w-0">
            <h3 className="text-xl font-semibold mb-3">Be here for the release.</h3>
            <p className="text-sm text-white/60 leading-relaxed mb-6">Join the studio email list for launch news, future releases, and new work. You can unsubscribe at any time.</p>
            {signupAvailable ? <NewsletterForm /> : <p className="text-sm text-white/70">Email signup will open soon. Check this page for the release announcement.</p>}
          </div>
        </div>
      </section>
        <figure className="relative mt-10 max-w-2xl mx-auto">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/30">
            <Image
              src="https://fmxqa9jjugng70wj.public.blob.vercel-storage.com/images/art/nudes-at-the-beach.jpg"
              alt="Nudes At The Beach by Bård Ionson, 2019"
              width={1000}
              height={1000}
              sizes="(max-width: 768px) 100vw, 672px"
              className="w-full h-auto"
            />
          </div>
          <figcaption className="mt-4 text-sm text-white/60">Nudes At The Beach · 2019 <span className="block text-white/40 mt-1">Preview image. High-resolution download coming soon.</span></figcaption>
        </figure>
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
          ["What does open edition mean?", "There is no fixed quantity available during the sale window. These downloads are not numbered editions. Each release will state when purchasing opens and closes."],
          ["Can I use a professional print shop?", "Yes. The release is intended for personal printing, including through a professional print shop. Each artwork will include its printing permissions and guidance."],
          ["Can I share or resell the file?", "Files are for personal use. Redistribution, resale, and commercial reproduction are not included. Full terms will accompany each release."],
          ["Which sizes can I print?", "Recommended print sizes depend on the artwork. Pixel dimensions, file format, and recommended sizes will be listed before you buy."],
        ].map(([question, answer]) => (
          <details key={question} className="border-b border-white/10 py-5">
            <summary className="cursor-pointer font-medium text-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4">{question}</summary>
            <p className="text-white/60 leading-relaxed mt-4">{answer}</p>
          </details>
        ))}
      </section>
    </div>
  );
}

