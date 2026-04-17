# Deployment & Development Workflow

## 🚀 Environments

### Production (Live)
- **URL:** https://art-gallery-seven-mu.vercel.app
- **Branch:** `main`
- **Deployment:** Automatic on push to `main`
- **Purpose:** Public-facing live site

### Preview/Staging (Testing)
- **URL:** https://art-gallery-git-develop.vercel.app
- **Branch:** `develop`
- **Deployment:** Automatic on push to `develop`
- **Purpose:** Test changes before production

### Feature Branches (Optional)
- **URL Pattern:** `https://art-gallery-git-<branch-name>.vercel.app`
- **Branch:** Any feature branch
- **Deployment:** Automatic on push
- **Purpose:** Isolated feature testing

## 🔄 Workflow

### Standard Development Flow
```
1. Create feature branch from `develop`
   git checkout develop
   git pull
   git checkout -b feature/your-feature

2. Make changes and commit
   git add .
   git commit -m "feat: your feature"

3. Push to GitHub
   git push -u origin feature/your-feature

4. Test on Preview URL
   https://art-gallery-git-feature-your-feature.vercel.app

5. Create Pull Request to `develop`
   https://github.com/Reza0val/art-gallery/pulls

6. Review and merge to `develop`

7. Test on Staging URL
   https://art-gallery-git-develop.vercel.app

8. Create Pull Request to `main`
   https://github.com/Reza0val/art-gallery/compare/main...develop

9. Review and merge to `main`

10. Production auto-deploys
    https://art-gallery-seven-mu.vercel.app
```

### Quick Fix Flow (Urgent)
```
1. Checkout `develop`
   git checkout develop
   git pull

2. Make fix and commit
   git add .
   git commit -m "fix: urgent fix"

3. Push to `develop`
   git push

4. Test on Staging URL
   https://art-gallery-git-develop.vercel.app

5. If good, merge to `main`
   git checkout main
   git pull
   git merge develop
   git push
```

## 🚨 Rollback Procedures

### Option 1: Vercel Dashboard (Fastest)
1. Go to https://vercel.com/Reza0val/art-gallery
2. Click "Deployments"
3. Find working deployment
4. Click "..." → "Revert to"
5. **Time:** 30 seconds

### Option 2: Git Revert (Safe)
```bash
# Revert last commit
git revert HEAD
git push

# Revert specific commit
git revert <commit-hash>
git push
```
**Time:** 2 minutes

### Option 3: Force Reset (Dangerous)
```bash
# Go back 1 commit
git reset --hard HEAD~1
git push --force
```
**Only use in emergencies**

## 🔧 Environment Variables

### Production (Vercel)
- `NEXT_PUBLIC_SANITY_PROJECT_ID=96sfqeww`
- `NEXT_PUBLIC_SANITY_DATASET=production`

### Staging (Optional - can use same)
- Can use different Sanity dataset for testing
- Add in Vercel project settings for `develop` branch

## 📋 Quality Gates

### Before Merging to `develop`
- [ ] Code compiles without errors
- [ ] Mobile responsive tested (iPhone 17 Pro Chrome)
- [ ] Artworks display correctly
- [ ] No console errors

### Before Merging to `main`
- [ ] Tested on staging URL
- [ ] Mobile/desktop tested
- [ ] All features working
- [ ] Performance acceptable

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000

# Build for production
npm run build

# Lint code
npm run lint
```

## 📞 Emergency Contacts

### Deployment Issues
1. Check Vercel dashboard: https://vercel.com/Reza0val/art-gallery
2. Check GitHub Actions: https://github.com/Reza0val/art-gallery/actions
3. Rollback via Vercel dashboard

### Sanity CMS Issues
1. Studio: https://art-gallery-seven-mu.vercel.app/studio
2. Sanity dashboard: https://www.sanity.io/manage

## 🎯 Best Practices

### Commit Messages
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style/formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

### Testing Checklist
- [ ] iPhone 17 Pro Chrome
- [ ] Desktop Chrome/Firefox/Safari
- [ ] Tablet/iPad
- [ ] Admin pages (`/admin`, `/studio`)
- [ ] Filter/search functionality
- [ ] Mobile navigation

### Performance
- [ ] Page load < 3 seconds
- [ ] Images optimized (Sanity CDN)
- [ ] No large JavaScript bundles
- [ ] Proper caching headers

---

**Last Updated:** 2026-04-17  
**Maintainer:** Andy (AI Assistant)  
**Owner:** Reza