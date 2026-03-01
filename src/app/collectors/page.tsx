import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import { SignInForm } from "@/app/collectors/signin-form";

export default async function CollectorsVaultPage() {
    const session = await getServerSession(authOptions);

    // If the user isn't authenticated yet
    if (!session) {
        return (
            <div className="container mx-auto px-4 py-20 min-h-[80vh] flex flex-col items-center justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="max-w-md w-full glassmorphism rounded-3xl p-8 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="relative z-10 w-16 h-16 mx-auto bg-black/50 rounded-full border border-white/10 flex items-center justify-center mb-6">
                        <span className="text-2xl">🔒</span>
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Collectors Vault</h1>
                    <p className="text-white/60 mb-8 font-light">
                        Enter your password or connect your wallet to access exclusive work-in-progress notes and unreleased drops.
                    </p>

                    <SignInForm />

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <p className="text-sm text-white/40">Looking to support the new project?</p>
                        <Link href="/balloons-in-the-sky" className="text-sm text-primary hover:text-white transition-colors">
                            Back Balloons In The Sky
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Render the Vault Content for Authenticated Users
    return (
        <div className="container mx-auto px-4 py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2 text-primary">
                            The Vault
                        </h1>
                        <p className="text-white/60">Welcome back, Collector.</p>
                    </div>
                    <form
                        action={async () => {
                            "use server";
                            // We'd import signOut from next-auth here in a real server action
                            // For demo purposes, we usually rely on client-side sign out
                        }}
                    >
                        {/* Client side signout hooked up below */}
                        <div className="text-sm px-4 py-2 border border-white/10 rounded-full hover:bg-white/5 cursor-pointer transition-colors">
                            Sign Out
                        </div>
                    </form>
                </header>

                <div className="grid gap-8">
                    <section className="glassmorphism rounded-2xl p-8">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold">Field Note: Marfa Site Visit</h2>
                            <span className="text-sm text-white/40">Oct 2, 2025</span>
                        </div>
                        <p className="text-white/70 mb-6 leading-relaxed">
                            The light here is unlike anywhere else. The way it interacts with the dust creates almost algorithmic patterns in the air. I've been experimenting with using these natural atmospheric gradients as direct inputs for the GAN models. The results are startlingly organic.
                        </p>
                        <div className="aspect-video bg-black/50 rounded-xl border border-white/5 flex items-center justify-center">
                            <span className="text-white/20 text-sm">Image: Studio_sketch_marfa_v2.png (Locked)</span>
                        </div>
                    </section>

                    <section className="glassmorphism rounded-2xl p-8 border-primary/30 shadow-[0_0_30px_rgba(129,140,248,0.1)]">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-bold text-white group">
                                <span className="text-primary mr-2">✦</span> Early Access: Abstract 09
                            </h2>
                            <span className="text-sm text-white/40">Today</span>
                        </div>
                        <p className="text-white/70 mb-6">
                            As a vault member, you get 24-hour early access to mint the next piece in the series before it hits the primary market.
                        </p>
                        <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full font-medium transition-colors">
                            Mint Now (0.5 ETH)
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}
