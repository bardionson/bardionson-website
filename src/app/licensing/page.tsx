import type { Metadata } from "next";
import { LicensingGallery } from "./gallery";
import { selection } from "./selection";

export const metadata: Metadata = {
  title: "Print Licensing | Bård Ionson",
  description: "Selected works by Bård Ionson for print licensing inquiries, with artwork previews, artist information and a selected CV.",
};

const inquiry = "mailto:Bard@bardIonson.com?subject=" + encodeURIComponent("Print licensing inquiry") +
  "&body=" + encodeURIComponent("Hello Bård,\n\nI would like to discuss print licensing.\n\nArtwork titles:\nIntended use:\nPrint sizes and quantities:\nTerritories:\nProposed license term:\n");

export default function LicensingPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <header>
        <h1 className="bg-gradient-to-r from-primary to-white bg-clip-text text-4xl font-bold tracking-tighter text-transparent sm:text-6xl">Print Licensing</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">A selection of generative art, photography-based imagery and digital compositions for print licensing inquiries.</p>
        <div className="mt-5 flex flex-wrap gap-4">
          <a href="#inquiries" className="rounded-full bg-primary px-6 py-3 text-base font-medium text-white transition-colors hover:bg-primary-dark">Print licensing inquiries</a>
          <a href="/licensing/Bard_Ionson_Selected_CV.pdf" target="_blank" rel="noreferrer" className="rounded-full border border-white/25 px-6 py-3 text-base font-medium transition-colors hover:bg-white/10">Selected CV</a>
        </div>
      </header>

      <nav aria-label="Artwork series" className="mt-7 flex gap-x-6 gap-y-3 overflow-x-auto whitespace-nowrap border-y border-white/15 py-4 text-base text-white/70 sm:flex-wrap">
        {selection.map((series) => <a key={series.id} href={"#" + series.id} className="hover:text-primary">{series.title}</a>)}
      </nav>

      <LicensingGallery />

      <div className="mt-20 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-2">
        <section aria-labelledby="licensing-bio">
          <h2 id="licensing-bio" className="text-3xl font-serif">Artist bio</h2>
          <p className="mt-5 text-base leading-relaxed text-white/75">Born in Denver, Colorado, Bård Ionson is a Virginia-based artist working across generative image-making, print, moving image and installation. His practice brings together photography, code and custom generative models. His work is held in the permanent collections of the Bodleian Libraries at the University of Oxford and the Francisco Carolinum Museum in Linz, Austria. His publishing projects include contributions to <em>History of Bitcoin</em>, <em>Collecting Art Onchain</em> and <em>Crypto Art – Begins</em>.</p>
        </section>
        <section aria-labelledby="licensing-statement">
          <h2 id="licensing-statement" className="text-3xl font-serif">Artist statement</h2>
          <p className="mt-5 text-base leading-relaxed text-white/75">I am drawn to the space between the familiar and the strange, the physical and the imagined, the moment we see and the one we remember. I use photography, code, generative models, painting, film and electronic devices to move images between these worlds. With each passage, something changes, and something unexpected comes into view. A print gives one of these moments a place in the physical world.</p>
        </section>
      </div>

      <section id="inquiries" aria-labelledby="licensing-contact" className="glassmorphism mt-14 scroll-mt-24 rounded-3xl p-6 sm:p-10">
        <h2 id="licensing-contact" className="text-3xl font-serif">Print licensing inquiries</h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/75">Licensing terms are agreed individually for each artwork and use. Please include the artwork titles, intended use, print sizes, quantities, territories and proposed term in your inquiry. Print-ready files can be supplied once terms are agreed.</p>
        <a href={inquiry} className="mt-6 inline-block break-all text-lg text-primary underline underline-offset-4 hover:text-white">Bard@bardIonson.com</a>
      </section>
    </div>
  );
}
