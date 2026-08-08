"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/exhibitions", label: "Exhibitions" },
    { href: "/news", label: "News" },
    { href: "/primary-market", label: "Primary" },
    { href: "/secondary-market", label: "Secondary" },
    { href: "/balloons-in-the-sky", label: "Balloons In The Sky" },
    { href: "/collectors", label: "Collectors Vault", accent: true },
];

export default function MobileNav() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className="flex items-center justify-center w-9 h-9 text-white/70 hover:text-white transition-colors"
            >
                {open ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                        <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                        <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                )}
            </button>

            {open && (
                <div
                    className="fixed inset-x-0 top-16 bottom-0 z-40 bg-black/60 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                >
                    <nav
                        className="glassmorphism border-t border-white/10 flex flex-col divide-y divide-white/5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={`px-6 py-4 text-base font-medium transition-colors ${link.accent ? "text-primary" : "text-white/80"
                                    } hover:bg-white/5`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
}
