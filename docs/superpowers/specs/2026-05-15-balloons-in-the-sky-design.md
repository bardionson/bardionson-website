# Balloons In The Sky — Page & Homepage Feature Design

**Date:** 2026-05-15
**Branch:** balloons-in-the-sky-feature

---

## Summary

Two changes to bardionson.com:
1. Replace the placeholder crowdfund page at `/balloons-in-the-sky` with a rich project summary page that describes the installation and directs visitors to inthesky.art.
2. Add a "The Simulation Trilogy" section to the homepage featuring all three works in the series, with Balloons In The Sky prominent at top.

---

## Change 1: `/balloons-in-the-sky` Page Replacement

**File:** `src/app/balloons-in-the-sky/page.tsx`

Replace the existing newsletter/crowdfund content entirely. New content:

### Structure (top to bottom)

- **Badge:** "The Simulation Trilogy — Part III"
- **H1:** Balloons In The Sky
- **Tagline (pull quote):** *"A memento vitae — a reminder that you were alive."*
- **Hero image:** `/images/art/computer-new-gallery.jpg` (local public asset)
- **Description block:** Two paragraphs covering:
  - What it is: final installment of The Simulation Trilogy by Bård and Jennifer Ionson, emerging from documenting a mass balloon ascension in New Mexico, transformed into an autonomous generative AI installation
  - The experience: custom GPU workstation + proprietary StyleGAN model, 75" portrait display, physical red button freezes the generative stream → immediately mints a unique 1/1 NFT on Ethereum and prints a physical artifact via dye-sublimation printer
  - The core gesture: *"Your button press is not an automation; it is a signature."*
- **CTA button (primary):** "Experience the Project →" — links to `https://inthesky.art`
- **The Trilogy section:** Three linked cards in a row labeled Part I, Part II, Part III
  - Part I — Painting With Fire → `/projects/painting-with-fire`
  - Part II — Bones In The Sky → `/sky-bones`
  - Part III — Balloons In The Sky → current page (highlighted/active state)

### Style
- Matches site aesthetic: glassmorphism cards, `text-primary` accents, fade-in animations
- No newsletter form, no supporter tiers

---

## Change 2: Homepage "The Simulation Trilogy" Section

**File:** `src/app/page.tsx`

### Placement
Insert new section **after** "Featured Works Gallery" and **before** "About the Artist".

### Layout
- Section header: "The Simulation Trilogy"
- Subheading: "A three-part series exploring elevation, memory, and simulated reality."
- **Top row:** Single large feature card — Balloons In The Sky
  - Image: `/images/art/computer-new-gallery.jpg`
  - Badge: "Part III — New"
  - Title, one-line description, "Explore →" link to `/balloons-in-the-sky`
- **Bottom row:** Two equal cards side by side
  - Painting With Fire — `sg3-seed.png` from blob storage — links to `/projects/painting-with-fire`
  - Bones In The Sky — `bones-in-the-sky.png` from blob storage — links to `/sky-bones`

---

## What Is NOT Changing
- Navigation in `layout.tsx` — "Balloons In The Sky" link already exists
- Any other pages (sky-bones, painting-with-fire project pages)
- The "Latest Drop" / Fire and Bone banner on the hero

---

## Image Assets
| Use | Path | Source |
|-----|------|--------|
| Balloons In The Sky | `/images/art/computer-new-gallery.jpg` | Local public dir |
| Painting With Fire | blob: `sg3-seed.png` | Already in use on homepage |
| Bones In The Sky | blob: `bones-in-the-sky.png` | Already in use on homepage |
