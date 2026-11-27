"use client";

import Image from "next/image";
import { useState } from "react";

export default function VimeoPlayer({ id, title, poster, width, height }: { id: number; title: string; poster: string; width: number; height: number }) {
    const [playing, setPlaying] = useState(false);

    return playing ? (
        <iframe src={`https://player.vimeo.com/video/${id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0`} title={`${title} on Vimeo`} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="w-full h-full border-0" />
    ) : (
        <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${title} on Vimeo`} className="relative w-full h-full group focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-4">
            <Image src={poster} alt={title} width={width} height={height} sizes="(max-width: 1024px) 100vw, 50vw" className="w-full h-full object-contain" />
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/85 border border-white/30 px-5 py-3 text-base text-white whitespace-nowrap group-hover:bg-primary group-focus-visible:bg-primary transition-colors">Play on Vimeo</span>
        </button>
    );
}
