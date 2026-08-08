"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import type { SearchItem } from "@/app/api/search/route";

const TYPE_LABEL: Record<SearchItem["type"], string> = {
    news: "News",
    project: "Project",
    exhibition: "Exhibition",
};

export default function SearchModal() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [items, setItems] = useState<SearchItem[]>([]);
    const [fuse, setFuse] = useState<Fuse<SearchItem> | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((v) => !v);
            }
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    useEffect(() => {
        if (open && items.length === 0) {
            fetch("/api/search")
                .then((res) => res.json())
                .then((data: SearchItem[]) => {
                    setItems(data);
                    setFuse(
                        new Fuse(data, {
                            keys: ["title", "excerpt"],
                            threshold: 0.35,
                        })
                    );
                });
        }
    }, [open, items.length]);

    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 50);
        } else {
            setQuery("");
        }
    }, [open]);

    const results = query.trim() && fuse ? fuse.search(query, { limit: 20 }).map((r) => r.item) : [];

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                aria-label="Search"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="hidden lg:inline text-xs border border-white/20 rounded px-1.5 py-0.5 text-white/40">⌘K</span>
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="w-full max-w-xl glassmorphism rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-white/40 shrink-0">
                                <circle cx="11" cy="11" r="7" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <input
                                ref={inputRef}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search news, projects, exhibitions…"
                                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/30"
                            />
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto">
                            {query.trim() && results.length === 0 && (
                                <p className="px-5 py-8 text-center text-white/40 text-sm">No results for &ldquo;{query}&rdquo;</p>
                            )}
                            {results.map((item) => (
                                <Link
                                    key={`${item.type}-${item.slug}`}
                                    href={item.url}
                                    onClick={() => setOpen(false)}
                                    className="flex flex-col gap-1 px-5 py-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] uppercase tracking-wide text-primary/80 bg-primary/10 border border-primary/20 rounded-full px-2 py-0.5">
                                            {TYPE_LABEL[item.type]}
                                        </span>
                                        <span className="font-medium text-white/90 truncate">{item.title}</span>
                                    </div>
                                    {item.excerpt && (
                                        <p className="text-sm text-white/50 line-clamp-1">{item.excerpt}</p>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
