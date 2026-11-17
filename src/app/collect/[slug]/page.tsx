import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works } from "../catalog";
import { ArtGallery } from "../gallery";
import "../collect.css";

type Props = { params: { slug: string } };
export function generateStaticParams() { return works.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: Props): Metadata {
  const work = works.find(item => item.slug === params.slug);
  return work ? { title: `${work.title} | Collect | Bård Ionson`, description: work.story } : {};
}
export default function WorkPage({ params }: Props) {
  const work = works.find(item => item.slug === params.slug);
  if (!work) notFound();
  const email = "mailto:bard.ionson@gmail.com?subject=" + encodeURIComponent((work.store ? "Direct studio order — " : "Artwork inquiry — ") + work.title) +
    "&body=" + encodeURIComponent(work.store ? `Hello Bård,\n\nI would like to order a ${work.title} directly from the studio. Please confirm availability and shipping to:\nCity, postal code, country:\n` : `Hello Bård,\n\nI'm interested in ${work.title}. Could you share availability, pricing and delivery details?\n`);
  return <article className="collect detail"><Link className="back" href="/collect#physical">← Physical works</Link>
    <div className="detail-grid"><ArtGallery pictures={work.pictures} title={work.title} />
      <div className="object-info"><small>{work.status}</small><h1>{work.title}</h1><p className="medium">{work.medium}</p>
        <dl>{work.price && <div><dt>Price</dt><dd>{work.price}</dd></div>}{work.dimensions && <div><dt>Artwork dimensions</dt><dd>{work.dimensions}</dd></div>}
          {work.facts.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        {work.slug === "fountain-405" && <a className="token-link" href="https://opensea.io/assets/ethereum/0x3ac9ef13007e2f8ad860a77f5fdf14696acf1e02/405">View original token ↗</a>}
        {work.status !== "Sold" && work.status !== "Reserved" && <div className="flex flex-wrap items-center gap-4"><a className="cta" href={email}>{work.store ? "Order by email from the studio ↗" : "Email the studio to inquire ↗"}</a>{work.store && <a className="underline underline-offset-4" href={work.store}>Choose a scope for SuperRare checkout ↗</a>}</div>}
      </div></div>
    <section className="story"><h2>Studio notes</h2><div><p>{work.story}</p><Link href={work.source}>{work.sourceLabel} →</Link></div></section>
    <Link className="back" href="/collect">Explore the collection →</Link>
  </article>;
}
