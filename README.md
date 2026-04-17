# Art Gallery CMS

A Next.js art gallery with Sanity CMS backend for managing a private collection.

## 🚀 Live Sites
- **Production:** https://art-gallery-seven-mu.vercel.app
- **Staging:** https://art-gallery-git-develop.vercel.app
- **Sanity Studio:** https://art-gallery-seven-mu.vercel.app/studio
- **Admin:** https://art-gallery-seven-mu.vercel.app/admin

## ✨ Features
- **Sanity CMS Integration** - 12+ artworks managed via Sanity
- **Responsive Design** - Mobile-first, iPhone 17 Pro optimized
- **Filterable Gallery** - Style, Artist, and title search
- **Artwork Detail View** - Focus area with acquisition flow
- **Admin Dashboard** - Protected admin area with Studio access
- **FAQ Section** - Expandable accordion for common questions
- **Inquiry System** - Contact form for artwork acquisition

## 🛠 Tech Stack
- **Frontend:** Next.js 14, React, TypeScript
- **CMS:** Sanity.io
- **Styling:** CSS-in-JS (inline styles)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Hosting:** Vercel

## 📁 Project Structure
```
art-gallery/
├── src/app/              # Next.js app router
│   ├── page.tsx         # Homepage
│   ├── gallery-client.tsx # Main gallery component
│   ├── admin/           # Admin pages
│   └── studio/          # Embedded Sanity Studio
├── src/lib/             # Utilities
│   ├── sanity.ts       # Sanity client
│   └── queries.ts      # GROQ queries
├── schemas/             # Sanity schemas
│   └── artwork.ts      # Artwork schema
└── scripts/             # Utility scripts
    └── upload-artworks.ts # Upload from Google Sheets
```

## 🚦 Development Workflow

### Branches
- `main` → Production (auto-deploys)
- `develop` → Staging (preview URL)
- `feature/*` → Feature branches (preview URLs)

### Workflow
1. Create feature branch from `develop`
2. Make changes and test on preview URL
3. Create PR to `develop`
4. Test on staging URL
5. Create PR to `main`
6. Production auto-deploys

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed workflow.

## 🏃‍♂️ Quick Start

### Local Development
```bash
# Clone repository
git clone https://github.com/Reza0val/art-gallery.git
cd art-gallery

# Install dependencies
npm install

# Set up environment
cp env.example .env.local
# Edit .env.local with your Sanity project ID

# Run development server
npm run dev
```

### Admin Access
- **URL:** `/admin`
- **Username:** `admin`
- **Password:** `gallery2024`

### Sanity Studio
- **URL:** `/studio`
- **Access:** Via admin dashboard or direct link

## 📦 Deployment

### Automatic Deployments
- Push to `main` → Production
- Push to `develop` → Staging
- Push to any branch → Preview URL

### Manual Deployment
```bash
# Deploy to production
npm run deploy:prod

# Deploy to staging  
npm run deploy:staging
```

## 🔧 Environment Variables

### Required
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Optional
```
# For upload script
SANITY_TOKEN=your_sanity_token
SHEET_CSV_URL=your_google_sheet_url
```

## 🎨 Adding Artworks

### Via Sanity Studio
1. Go to `/studio`
2. Click "Create new"
3. Fill artwork details
4. Upload image

### Via Google Sheets
1. Prepare CSV with columns: title, artist, year, genre, material, style, availability, description, drive_image_url, featured, order
2. Run upload script:
```bash
SANITY_TOKEN=xxx SHEET_CSV_URL=xxx npm run upload
```

## 🚨 Rollback

### Quick Rollback (Vercel)
1. Go to Vercel dashboard
2. Find working deployment
3. Click "Revert to"

### Git Rollback
```bash
# Revert last commit
git revert HEAD
git push
```

## 📞 Support

### Issues
1. Check deployment status: Vercel dashboard
2. Check Sanity: https://www.sanity.io/manage
3. Rollback if needed

### Emergency Contacts
- **Vercel:** https://vercel.com/Reza0val/art-gallery
- **GitHub:** https://github.com/Reza0val/art-gallery
- **Sanity:** https://www.sanity.io/manage

---

**Maintainer:** Andy (AI Assistant)  
**Owner:** Reza  
**Last Updated:** 2026-04-17
