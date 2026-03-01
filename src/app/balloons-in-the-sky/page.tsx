import Link from "next/link";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export default function BalloonsInTheSkyPage() {
    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 mb-6 text-sm font-medium">
                        New Project & Crowdfund
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-white/50">
                        Balloons In The Sky
                    </h1>
                    <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed">
                        An ambitious new installation piece preparing for exhibition in Lisbon. Become a supporter to unlock exclusive field notes, diagrams, and physical artifacts.
                    </p>
                </div>

                {/* Support CTA / Resend Mailing List Integration Hook */}
                <section className="glassmorphism rounded-3xl p-8 md:p-12 mb-20 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Join the Expedition</h2>
                        <p className="text-white/60 max-w-xl mx-auto mb-8">
                            Sign up for the mailing list to receive updates on funding milestones, or log in to the Collectors Vault if you&apos;re already a backer.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <NewsletterForm />
                        </div>
                    </div>
                </section>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-12 mb-20">
                    <div className="space-y-6 text-white/70 prose prose-invert">
                        <h3 className="text-2xl font-bold text-white mb-4">The Vision</h3>
                        <p>
                            &quot;Balloons In The Sky&quot; is more than a single piece; it is a physical and digital expedition. Rooted in the visual language of data, surrealism, and atmosphere, this installation will be debuted in Lisbon.
                        </p>
                        <p>
                            The journey from concept to installation is a core part of the artwork. Through this portal, supporters will get direct access to my studio process.
                        </p>
                    </div>
                    <div className="glassmorphism rounded-2xl p-8 border border-white/5">
                        <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">Supporter Tiers</h3>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="text-primary mt-1">✧</div>
                                <div>
                                    <h4 className="font-bold text-white">The Watcher</h4>
                                    <p className="text-sm text-white/60">Access to digital work-in-progress notes and diagrams.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="text-primary mt-1">✧</div>
                                <div>
                                    <h4 className="font-bold text-white">The Voyager</h4>
                                    <p className="text-sm text-white/60">Includes physical postcards sent from the Lisbon installation and a special edition NFT.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="text-primary mt-1">✧</div>
                                <div>
                                    <h4 className="font-bold text-white">The Patron</h4>
                                    <p className="text-sm text-white/60">Includes a signed physical fine art print and VIP access to the Collectors Vault.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center pt-8 border-t border-white/10">
                    <Link href="/collectors" className="text-primary hover:text-white transition-colors">
                        Already a supporter? Enter the Collectors Vault →
                    </Link>
                </div>

            </div>
        </div >
    );
}
