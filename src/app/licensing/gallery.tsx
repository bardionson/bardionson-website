"use client";

import { useRef, useState } from "react";
import { selection, type LicensingWork } from "./selection";

export function LicensingGallery() {
  const [selected, setSelected] = useState<LicensingWork>(selection[0].works[0]);
  const [credit, setCredit] = useState(selection[0].credit);
  const dialog = useRef<HTMLDialogElement>(null);

  function enlarge(work: LicensingWork, artistCredit: string) {
    setSelected(work);
    setCredit(artistCredit);
    dialog.current?.showModal();
  }

  return (
    <>
      {selection.map((series) => (
        <section key={series.id} id={series.id} className={series.id === "eight" ? "mt-8 scroll-mt-24 sm:mt-10" : "mt-14 scroll-mt-24 sm:mt-20"} aria-labelledby={series.id + "-heading"}>
          <div className="mb-6 border-b border-white/15 pb-5">
            <h2 id={series.id + "-heading"} className="text-3xl font-serif sm:text-4xl">{series.title}</h2>
            <p className="mt-2 text-base text-white/70">{series.credit}</p>
            {series.description && <p className="mt-2 text-base text-white/60">{series.description}</p>}
          </div>
          <div className={series.id === "eight" ? "grid grid-cols-2 gap-4 sm:gap-8" : "grid gap-8 sm:grid-cols-2"}>
            {series.works.map((work) => (
              <figure key={work.id} data-work={work.id} className="min-w-0">
                <button
                  type="button"
                  onClick={() => enlarge(work, series.credit)}
                  aria-label={"Enlarge " + work.title}
                  className="group relative flex aspect-square w-full items-center justify-center rounded-2xl border border-white/10 bg-black/25 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:p-6"
                >
                  <img
                    src={"/licensing/" + work.id + ".webp"}
                    width={work.width}
                    height={work.height}
                    alt={work.alt}
                    loading={series.id === "eight" ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute bottom-2 right-2 rounded bg-black/85 px-2 py-1 text-sm text-white/80 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">Enlarge</span>
                </button>
                <figcaption className="mt-4">
                  <h3 className="text-lg font-medium sm:text-xl">{work.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{work.detail}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ))}
      <dialog
        ref={dialog}
        className="fixed inset-0 m-auto max-h-[95dvh] w-[96vw] max-w-6xl overflow-auto rounded-2xl border border-white/20 bg-[#101019] p-4 text-white backdrop:bg-black/90 sm:p-6"
        aria-labelledby="licensing-image-title"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id="licensing-image-title" className="text-lg font-medium">{selected.title}</h2>
            <p className="mt-1 text-sm text-white/70">{credit}</p>
          </div>
          <button type="button" autoFocus onClick={() => dialog.current?.close()} className="rounded border border-white/30 px-4 py-2 text-base hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">Close</button>
        </div>
        <img src={"/licensing/" + selected.id + ".webp"} width={selected.width} height={selected.height} alt={selected.alt} className="mx-auto max-h-[72dvh] w-full object-contain" />
      </dialog>
    </>
  );
}
