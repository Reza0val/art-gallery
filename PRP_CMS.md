# PRP: Art Gallery CMS

**Project:** art-gallery  
**Date:** 2026-04-16  
**Status:** Draft  
**Goal:** Enable real artwork content to be uploaded and managed through a CMS, replacing the current hardcoded demo data.

---

## Problem

The current art-gallery site has all artwork data hardcoded inside `src/app/page.tsx`.

That means:
- adding or changing a painting requires editing source code
- no non-technical person can manage the collection
- images are remote Unsplash placeholders, not real paintings

We need a CMS layer so that:
- real artwork images and metadata can be uploaded
- the site reflects actual collection content
- content management is decoupled from deployment

---

## Proposed Solution

Add a headless CMS connected to the Next.js app.

**Recommended CMS: Sanity**

Why:
- already used in Vermeer
- team has familiarity
- free tier is generous
- good Next.js integration via `next-sanity`
- real-time content delivery
- image CDN included

---

## Scope: MVP (Real Samples Upload)

### What we need to get real artwork live

**Phase 1 — Sanity setup**
- create Sanity project
- define artwork schema:
  - `title`
  - `artist`
  - `year`
  - `genre`
  - `material`
  - `style`
  - `availability` (Available / Sold / Not for sale)
  - `image` (uploaded to Sanity CDN)
  - `description`
  - `featured` (boolean)
- connect to Next.js app via `next-sanity`
- replace hardcoded artwork array with Sanity query

**Phase 2 — Upload real samples**
- upload 4–8 real artwork images to Sanity Studio
- fill in real metadata per artwork
- confirm they render correctly on the site
- verify filters, gallery grid, and detail card work with real data

**Phase 3 — Deploy**
- update metadata base URL to real production domain
- redeploy to Vercel
- confirm everything live

---

## Schema Design

```ts
// artwork.ts
export default {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'artist', title: 'Artist', type: 'string' },
    { name: 'year', title: 'Year', type: 'string' },
    { name: 'genre', title: 'Genre', type: 'string' },
    { name: 'material', title: 'Material', type: 'string' },
    {
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: ['Abstract', 'Minimal', 'Figurative', 'Monochrome', 'Color Field', 'Contemporary']
      }
    },
    {
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: ['Available', 'Sold', 'Not for sale']
      }
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true }
    },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'featured', title: 'Featured', type: 'boolean' },
    { name: 'order', title: 'Display Order', type: 'number' }
  ]
}
```

---

## What changes in the code

### `src/app/page.tsx`
- remove hardcoded `artworks` array
- import `createClient` from `next-sanity`
- add GROQ query for artworks
- fetch on server side or via Suspense

### New files needed
- `sanity.config.ts`
- `src/lib/sanity.ts` (client)
- `src/lib/queries.ts` (GROQ)
- `schemas/artwork.ts`

### `.env.local`
```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## What real samples mean

For upload, you need per artwork:
- high-resolution image file (JPG or PNG, recommend min 2000px wide)
- title
- artist name
- year
- medium / material
- genre / style
- availability status
- 2–3 sentence description

Minimum viable sample: **4 artworks**

---

## What this does NOT include

- inquiry form delivery (still UI-only)
- authentication for private collection access
- pricing display
- e-commerce or payment

Those are the logical next features after CMS is live.

---

## Dependencies

| Package | Version |
|---|---|
| `next-sanity` | latest |
| `@sanity/image-url` | latest |
| `@sanity/client` | latest |

All already available in Sanity ecosystem.

---

## Estimated Complexity

- **Sanity setup:** low
- **Schema definition:** low
- **Code changes:** medium
- **Content upload:** depends on how many artworks and image quality available

---

## Next Decision Needed From Reza

1. **Do you have the real artwork images ready?** (JPG/PNG, high-res)
2. **How many artworks for the first upload?** (recommend 4–8)
3. **Do you want a private Sanity Studio** or are you okay using the hosted Sanity Studio at `sanity.io/studio`?
4. **Should the collection remain fully public** or do you want a password-gated gallery view?

---

## Recommendation

**Build this.** The current hardcoded state is not acceptable for actual production use.

The Sanity approach is the fastest path to a real, manageable gallery because:
- we already know how to wire it (Vermeer precedent)
- Sanity Studio is zero-infrastructure
- content upload can happen in under an hour once schema is live
- first real content iteration can be live within a day of starting
