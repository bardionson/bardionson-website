export function ArtistStatement() {
  return (
    <section aria-labelledby="statement" className="mb-10">
        <h2 id="statement" className="scroll-mt-24 text-2xl font-bold mt-10 mb-4">Artist statement</h2>
        <p className="text-lg leading-relaxed text-white/80">
            I am drawn to the space between things: the familiar and the strange, the physical and the imagined,
            the moment we see and the one we remember. I use photography, code, generative models, painting, film,
            and electronic devices to move images between these worlds. With each passage, something changes,
            and something unexpected comes into view.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-white/80">
            In <em>Balloons In The Sky</em>, created with Jennifer Ionson, photographs become the starting point for
            a continuously changing landscape. Visitors choose when to stop the flow and capture an image.
            Their choice is a creative act, a way of finding something that belongs to them within a world of possibilities.
        </p>
    </section>
  );
}

export function MuseumCollectionCredits({ includeWorks = true }: { includeWorks?: boolean }) {
  return (
    <>
      Bård Ionson’s work is held in the permanent collections of the{' '}
      <a href="https://www.prnewswire.com/news-releases/bard-ionsons-battledore-enters-bodleian-libraries-weston-library-collection-as-nft--physical-artifact-302374375.html" className="underline underline-offset-4">Bodleian Libraries at the University of Oxford</a>
      {includeWorks && <> (<em>Battledore</em>)</>} and the{' '}
      <a href="https://www.sovrn.art/collections/fransisco-carolinum/" className="underline underline-offset-4">Francisco Carolinum Museum</a> in Linz, Austria
      {includeWorks && <> (<em>Alternate Fires</em>, from <em>Painting with Fire</em>)</>}.
    </>
  );
}

export function ArtistBio() {
  return (
    <section aria-labelledby="bio" className="mb-12">
        <h2 id="bio" className="scroll-mt-24 text-2xl font-bold mb-4">Artist bio</h2>
        <p className="text-lg leading-relaxed text-white/80">
            <MuseumCollectionCredits />
        </p>
        <p className="mt-4 text-lg leading-relaxed text-white/80">
            Born in Denver, Colorado, Bård Ionson works with photography, generative systems, and electronic sculpture.
            An encounter with one of Nam June Paik’s <em>Internet Dwellers</em> around 2012 drew him toward
            installation and oscilloscope art. In 2018 he trained a neural network on images of his own oscilloscope
            work and began minting art on the blockchain.
        </p>
    </section>
  );
}
