import Link from "next/link";
import type { Metadata } from "next";
import { studioWorks, works } from "./catalog";
import "./collect.css";

export const metadata: Metadata = { title: "Collect | Bård Ionson", description: "Physical artworks, studio projects and print-at-home editions by Bård Ionson." };

export default function CollectPage() {
  return <div className="collect">
    <header className="collect-head"><h1>Collect</h1>
      <nav aria-label="Browse the collection"><a href="#physical">Physical works</a><a href="#downloads">Print at Home</a><a href="#studio">In the studio</a></nav>
    </header>
    <section id="physical"><h2>Physical works</h2>
      <div className="work-grid">{works.map(work => <Link key={work.slug} href={`/collect/${work.slug}`} className="work-card">
        <div className="art-mat"><img src={work.pictures[0].src} alt={work.pictures[0].caption} /></div>
        <div className="work-line"><h3>{work.title}</h3><span aria-hidden="true">↗</span></div>
        <p>{[work.medium, work.dimensions].filter(Boolean).join(" · ")}</p><small>{[work.price, work.status].filter(Boolean).join(" · ")}</small>
      </Link>)}</div>
    </section>
    <section id="downloads"><h2>Print at Home</h2>
      <Link href="/print-at-home" className="download-card"><img src="/print-previews/nudes-at-the-beach-2.jpg" alt="Square composition of Nudes At The Beach 2" />
      <div><small>Personal-use digital download · $25 USD</small><h3>Nudes At The Beach 2</h3>
      <p>Three compositions to print yourself or take to your preferred print shop.</p><b>View artwork and print options →</b></div></Link>
    </section>
    <section id="studio"><h2>In the studio</h2><p className="intro">Display objects and video sculptures in development.</p>
      <dl className="studio-list">{studioWorks.map(([title, description]) => <div key={title}><dt>{title}</dt><dd>{description}</dd></div>)}</dl>
    </section>
  </div>;
}
