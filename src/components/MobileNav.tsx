"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/print-at-home", label: "Print at Home", accent: true },
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
        <div className="xl:hidden">
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-navigation"
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
                    className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] bg-black/50"
                    onClick={() => setOpen(false)}
                >
                    <nav
                        id="mobile-navigation"
                        aria-label="Main navigation"
                        className="bg-slate-100 text-slate-900 border-t border-slate-200 shadow-2xl flex flex-col divide-y divide-slate-200 max-h-[calc(100dvh-4rem)] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className={`px-6 py-4 text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-indigo-700 ${link.accent ? "text-indigo-700" : "text-slate-900"
                                    } hover:bg-white focus-visible:bg-white`}
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
