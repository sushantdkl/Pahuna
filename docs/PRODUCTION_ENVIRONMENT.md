# Production Environment Checklist

## Infrastructure

### Hosting Platform
| Item | Recommended | Notes |
|------|-------------|-------|
| **Hosting** | Vercel (free tier works) | Native Next.js support, edge functions, analytics |
| **Database** | Neon / Supabase / Railway PostgreSQL | Prisma 7 compatible, connection pooling required |
| **Domain** | Cloudflare DNS | Free SSL, DDoS protection, caching |
| **CDN** | Vercel Edge / Cloudflare | Automatic with Vercel |
| **Email** | Resend / SendGrid | For form submission notifications |

### Required Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:pass@host:5432/surkhet_hotel?sslmode=require"

# Authentication
NEXTAUTH_URL="https://surkhethotel.com"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Analytics (optional — enables Google Analytics)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"

# Email notifications (optional — for form submissions)
# RESEND_API_KEY="re_xxxxxxxxxxxx"
# NOTIFICATION_EMAIL="hello@surkhethotel.com"
```

### Generate NEXTAUTH_SECRET
```bash
# On Linux/Mac:
openssl rand -base64 32

# On Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Max 256 }) -as [byte[]])
```

---

## Security Checklist

| Check | Status | How to Verify |
|-------|--------|---------------|
| HTTPS enforced | ✅ Auto via Vercel/Cloudflare | Visit `http://` → should redirect |
| HSTS header | ✅ Set in `next.config.ts` | Check with `curl -I` |
| X-Frame-Options: DENY | ✅ Set in `next.config.ts` | Prevents clickjacking |
| X-Content-Type-Options: nosniff | ✅ Set in `next.config.ts` | Prevents MIME sniffing |
| Referrer-Policy | ✅ Set in `next.config.ts` | `strict-origin-when-cross-origin` |
| Permissions-Policy | ✅ Set in `next.config.ts` | Denies camera/mic/geo access |
| `poweredByHeader: false` | ✅ Set in `next.config.ts` | Removes `X-Powered-By: Next.js` |
| NEXTAUTH_SECRET is strong | ⬜ Manual | Min 32 characters, random |
| DATABASE_URL uses SSL | ⬜ Manual | Add `?sslmode=require` |
| `.env.local` in `.gitignore` | ⬜ Manual | Never commit secrets |
| Dashboard behind auth | ✅ Built-in | `/dashboard` requires login |
| Login page not indexed | ✅ robots: noindex | Check `/login` metadata |

---

## Database Setup

### Initial Setup
```bash
# Push Prisma schema to production database
npx prisma db push

# Seed production data
npx prisma db seed

# Verify connection
npx prisma studio
```

### Connection Pooling
For serverless deployments (Vercel), use connection pooling:
- **Neon**: Use the pooled connection string (port 5432 → `?pgbouncer=true`)
- **Supabase**: Use the connection pooler URL
- **PgBouncer**: Add `?pgbouncer=true&connection_limit=1` to `DATABASE_URL`

### Backups
- Set up daily automated backups via your database provider
- Keep at least 7 days of rolling backups
- Test restore procedure quarterly

---

## Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| **Lighthouse Performance** | 90+ | Chrome DevTools |
| **Lighthouse SEO** | 95+ | Chrome DevTools |
| **Lighthouse Accessibility** | 90+ | Chrome DevTools |
| **LCP** (Largest Contentful Paint) | < 2.5s | PageSpeed Insights |
| **FID** (First Input Delay) | < 100ms | PageSpeed Insights |
| **CLS** (Cumulative Layout Shift) | < 0.1 | PageSpeed Insights |
| **TTFB** (Time to First Byte) | < 600ms | WebPageTest |
| **Build Time** | < 30s | CI/CD logs |

---

## Monitoring & Alerting

### Recommended Stack
| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **Vercel Analytics** | Real-user performance | ✅ |
| **Google Analytics 4** | Traffic, engagement, conversions | ✅ |
| **Sentry** | Error monitoring & alerting | ✅ (5K events/mo) |
| **Better Stack / UptimeRobot** | Uptime monitoring | ✅ |
| **Google Search Console** | SEO monitoring, indexing | ✅ |

### Alert Triggers
- Server error rate > 1% → Slack/email alert
- Response time > 3s → investigate
- Downtime > 1 minute → immediate alert
- New 404 patterns → weekly review

---

## Deployment Workflow

### Recommended Git Workflow
```
main (production)
  └── develop (staging)
       └── feature/xxx (feature branches)
```

### CI/CD Pipeline (Vercel)
1. Push to `main` → auto-deploy to production
2. Push to `develop` → auto-deploy to preview
3. Pull request → deploy preview URL for review

### Pre-Deploy Checks
```bash
# Type checking
npx tsc --noEmit

# Build verification
npx next build

# Optional: lint
npx next lint
```

---

## Scaling Considerations

### When Traffic Grows
- **Database**: Upgrade to dedicated instance (Neon Pro, Supabase Pro)
- **Caching**: Add Redis for session store and API caching
- **Images**: Move to dedicated image CDN (Cloudinary, ImageKit)
- **Search**: Add full-text search (Algolia, Meilisearch)
- **Email**: Move from transactional to dedicated email service

### Cost Estimates (Monthly)
| Stage | Hosting | Database | Domain | Total |
|-------|---------|----------|--------|-------|
| **MVP** | $0 (Vercel free) | $0 (Neon free) | $12/yr | ~$1/mo |
| **Growth** | $20 (Vercel Pro) | $19 (Neon Launch) | $12/yr | ~$40/mo |
| **Scale** | $20+ (Vercel Pro) | $69+ (Neon Scale) | $12/yr | ~$90+/mo |
