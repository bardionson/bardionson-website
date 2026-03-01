import { getBardIonsonArt } from '@/lib/data-source';
import { enrichAndSortCollections } from '@/lib/collection-utils';
import Gallery from '@/components/Gallery';

// Use ISR (Incremental Static Regeneration) to revalidate the cache exactly once per hour.
// This prevents hitting OpenSea/Alchemy API limits on every request while keeping data fresh.
export const revalidate = 3600;

export default async function SecondaryMarketPage() {
    const grouped = await getBardIonsonArt();
    const collections = enrichAndSortCollections(grouped);

    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

                    <h1 className="relative z-10 text-5xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-white">
                        Secondary Market
                    </h1>

                    <p className="relative z-10 text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                        Archive of minted works currently circulating in the secondary market. Data is synchronized via the OpenSea protocol.
                    </p>
                </div>

                <div className="relative z-10">
                    <Gallery initialCollections={collections} />
                </div>
            </div>
        </div>
    );
}
