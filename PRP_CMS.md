# PRP: Art Gallery CMS

**Project:** art-gallery  
**Date:** 2026-04-16  
**Status:** Approved to build  
**Goal:** Replace hardcoded demo data with a real CMS-powered gallery. Upload 12 real artworks from Google Drive/Sheets. Deploy to production.

---

## Problem

The current art-gallery site has all artwork data hardcoded inside `src/app/page.tsx`.

- Adding or changing a painting requires editing source code
- No non-technical person can manage the collection
- Images are remote Unsplash placeholders, not real paintings
- No admin interface

---

## Decisions Made

| Decision | Answer |
|---|---|
| CMS | Sanity |
| First upload batch | 12 artworks |
| Source of real content | Google Drive (images) + Google Sheet (metadata) |
| Studio access | Hosted Sanity Studio, open, no auth for now |
| Gallery visibility | 100% public |
| Admin auth | Login page UI only for now, real auth later |

---

## Architecture

```
Sanity Studio (hosted)
  └── artwork documents (image + metadata)
      ↓ GROQ query
Next.js (art-gallery)
  └── server-side fetch
      ↓ render
Vercel (production)
```

---

## What Gets Built

### Phase 1 — Sanity Setup
- create Sanity project under `reza@investoval.com`
- define artwork schema
- connect `art-gallery` Next.js app to Sanity
- remove hardcoded artwork array
- replace with live GROQ query
- image rendering via `@sanity/image-url`

### Phase 2 — Admin Login Page (UI only)
- `/admin` route with simple login form
- hardcoded username/password for now
- no real auth yet
- placeholder for future real auth
- after "login", redirect to `/admin/dashboard`
- `/admin/dashboard` links out to the hosted Sanity Studio

### Phase 3 — Artwork Upload
- read metadata from Google Sheet
- download images from Google Drive
- upload images + metadata to Sanity via Sanity API
- confirm 12 artworks live on the gallery

### Phase 4 — Deploy
- update `metadataBase` URL to real production domain
- redeploy to Vercel
- confirm live at production URL

---

## Artwork Schema

```ts
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
      name: 'style', title: 'Style', type: 'string',
      options: { list: ['Abstract', 'Minimal', 'Figurative', 'Monochrome', 'Color Field', 'Contemporary'] }
    },
    {
      name: 'availability', title: 'Availability', type: 'string',
      options: { list: ['Available', 'Sold', 'Not for sale'] }
    },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'featured', title: 'Featured', type: 'boolean' },
    { name: 'order', title: 'Display Order', type: 'number' }
  ]
}
```

---

## Code Changes to `art-gallery`

### New files
- `sanity.config.ts`
- `src/lib/sanity.ts`
- `src/lib/queries.ts`
- `schemas/artwork.ts`

### Modified files
- `src/app/page.tsx` — remove hardcoded array, add server-side Sanity fetch
- `src/app/admin/page.tsx` — new admin login page
- `src/app/admin/dashboard/page.tsx` — admin dashboard with Studio link
- `.env.local` — add Sanity project credentials

### Dependencies to add
- `next-sanity`
- `@sanity/image-url`
- `@sanity/client`

---

## Admin Login Page Design (UI Only)

```
/admin
  Logo or wordmark
  Username field
  Password field
  Login button

  (Hardcoded credentials for now)
  On submit → redirect to /admin/dashboard
```

```
/admin/dashboard
  "Welcome, Admin"
  → Open Sanity Studio (link to hosted studio)
  → View live gallery (link to /)
```

---

## Google Drive + Sheets Integration (for upload)

**Required access (Reza to complete OAuth flow):**
- Google Drive read access (download images)
- Google Sheets read access (read metadata)

**Upload script will:**
1. read Sheet row by row (title, artist, year, genre, material, style, availability, description, Drive image ID)
2. download image file from Drive by file ID
3. upload image to Sanity as a Sanity asset
4. create Sanity artwork document with image reference + all metadata
5. confirm 12 artworks are live

**Sheet columns expected:**
```
title | artist | year | genre | material | style | availability | description | drive_image_id | featured | order
```

---

## Estimated Effort

| Task | Complexity |
|---|---|
| Sanity project setup | Low |
| Schema definition | Low |
| Next.js wiring | Medium |
| Admin login page | Low |
| Google Sheet read script | Low |
| Google Drive download + Sanity upload script | Medium |
| Deploy | Low |

Total: half a day of focused work.

---

## Open Items Before Full Build

- [ ] Google OAuth for Drive + Sheets (in progress, see OAuth guide)
- [ ] Confirm Google Sheet column structure
- [ ] Confirm Google Drive folder structure
- [ ] Sanity project ID (will be created during build)

---

## Production URL

Current: `https://art-gallery-seven-mu.vercel.app`  
Replace `metadataBase` in `layout.tsx` with this URL before final deploy.
