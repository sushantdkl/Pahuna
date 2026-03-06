# Launch Checklist — Surkhet Hotel Platform

## Pre-Launch (1–2 Weeks Before)

### Domain & Hosting
- [ ] Domain `surkhethotel.com` registered and DNS configured
- [ ] SSL/TLS certificate active (auto via Vercel/hosting)
- [ ] CDN configured for static assets
- [ ] Verify `SITE_CONFIG.url` in `src/lib/constants.ts` matches production domain

### Environment Variables
- [ ] `DATABASE_URL` — production PostgreSQL connection string
- [ ] `NEXTAUTH_URL` — production URL (`https://surkhethotel.com`)
- [ ] `NEXTAUTH_SECRET` — strong random secret (min 32 chars)
- [ ] `NEXT_PUBLIC_GA_ID` — Google Analytics 4 measurement ID (optional)
- [ ] All environment variables set in hosting dashboard (Vercel/Railway/etc.)
- [ ] `.env.local` excluded from version control (`.gitignore`)

### Database
- [ ] Production PostgreSQL database provisioned (Neon, Supabase, Railway, etc.)
- [ ] Run `npx prisma db push` or `npx prisma migrate deploy` on production
- [ ] Run `npx prisma db seed` with production seed data
- [ ] Verify database connection from production environment
- [ ] Set up automated database backups

### SEO
- [ ] `og-image.jpg` (1200×630) created and placed in `/public/`
- [ ] `favicon.ico` (32×32) placed in `/public/`
- [ ] `icon.svg` placed in `/public/`
- [ ] `apple-touch-icon.png` (180×180) placed in `/public/`
- [ ] `icon-192.png` (192×192) placed in `/public/`
- [ ] `icon-512.png` (512×512) placed in `/public/`
- [ ] Verify `sitemap.xml` renders at `/sitemap.xml`
- [ ] Verify `robots.txt` renders at `/robots.txt`
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify structured data with Google Rich Results Test
- [ ] Check all pages have unique `<title>` and `<meta description>`

### Content
- [ ] All placeholder/demo content replaced or verified as real
- [ ] Hotel listings verified with actual data (photos, pricing, contact)
- [ ] Training courses reflect current offerings
- [ ] Consulting services reflect current offerings
- [ ] Blog posts published with real content
- [ ] Contact information verified (phone, email, address)
- [ ] Social media links point to real profiles
- [ ] All internal links work (no broken links)

### Legal
- [ ] Privacy Policy reviewed and accurate
- [ ] Terms & Conditions reviewed and accurate
- [ ] Cookie consent banner implemented (if required by jurisdiction)
- [ ] GDPR/data handling compliance verified

---

## Launch Day

### Deployment
- [ ] Final build passes: `npx next build` — zero errors
- [ ] Deploy to production hosting
- [ ] Verify all pages load correctly
- [ ] Verify mobile responsiveness on real devices
- [ ] Test all forms submit successfully (contact, newsletter, consulting, training, hotel lead)
- [ ] Verify authentication flow (login → dashboard)

### Monitoring
- [ ] Google Analytics receiving data
- [ ] Error monitoring active (Sentry, LogRocket, or similar)
- [ ] Uptime monitoring configured (UptimeRobot, Better Stack, etc.)
- [ ] Set up alerting for downtime/errors

### Performance
- [ ] Run Lighthouse audit — target scores: Performance 90+, SEO 95+, Accessibility 90+
- [ ] Verify Core Web Vitals in PageSpeed Insights
- [ ] Images optimized and serving WebP/AVIF
- [ ] Check TTFB (Time to First Byte) < 600ms

---

## Post-Launch (First Week)

### Verification
- [ ] Verify Google Search Console indexing
- [ ] Check analytics data flowing correctly
- [ ] Monitor error logs for issues
- [ ] Test all user flows end-to-end
- [ ] Verify email deliverability (form submissions)

### Marketing
- [ ] Social media profiles linked and active
- [ ] Google Business Profile created/claimed
- [ ] Share launch on social channels
- [ ] Set up Google Ads tracking (if applicable)
- [ ] Submit to local business directories

### Optimization
- [ ] Review real-user performance metrics
- [ ] Fix any 404 errors found in logs
- [ ] Address any accessibility issues from real usage
- [ ] Set up A/B testing for key conversion pages (optional)

---

## Ongoing Operations
- [ ] Weekly: Review analytics and error logs
- [ ] Monthly: Update content (blog, hotels, courses)
- [ ] Monthly: Review and respond to form submissions
- [ ] Quarterly: SEO audit and keyword review
- [ ] Quarterly: Dependency updates (`npm outdated`)
- [ ] Annually: Review legal pages (privacy, terms)
