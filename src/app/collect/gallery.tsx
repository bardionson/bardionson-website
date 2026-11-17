"use client";
import { useRef, useState } from "react";
import type { Picture } from "./catalog";

export function ArtGallery({ pictures, title }: { pictures: Picture[]; title: string }) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const current = pictures[index];
  return <div className="art-gallery"><figure>
    <button className="art-mat zoom" type="button" onClick={() => dialog.current?.showModal()} aria-label={`Enlarge ${current.caption}`}>
      <img src={current.src} alt={current.caption} /><span aria-hidden="true">⤢</span>
    </button><figcaption>{current.caption}</figcaption>
  </figure>
  {pictures.length > 1 && <div className="thumbnails">{pictures.map((pic, i) => <button key={pic.src} aria-label={pic.caption} aria-pressed={i === index} onClick={() => setIndex(i)}><img alt="" src={pic.src} /></button>)}</div>}
  <dialog ref={dialog} className="lightbox" aria-label={`Enlarged image of ${title}`} onClick={event => { if (event.target === dialog.current) dialog.current.close(); }}>
    <button onClick={() => dialog.current?.close()} autoFocus>Close ×</button><img src={current.src} alt={current.caption} /><p>{current.caption}</p>
  </dialog></div>;
}
