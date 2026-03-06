# Recommended Analytics Events

## Overview

This document defines the custom analytics events to track across the Surkhet Hotel platform.
Use the `trackEvent()` helper from `src/components/analytics.tsx` to fire these events:

```tsx
import { trackEvent } from "@/components/analytics";

// Example usage:
trackEvent("click_cta", { label: "Book Now", page: "/hotels" });
```

---

## Core Conversion Events

| Event Name | Trigger | Parameters | Priority |
|---|---|---|---|
| `form_submit_contact` | Contact form submitted | `{ page }` | 🔴 High |
| `form_submit_hotel_lead` | Hotel listing form submitted | `{ hotel_name }` | 🔴 High |
| `form_submit_consulting` | Consulting inquiry submitted | `{ service_type }` | 🔴 High |
| `form_submit_training` | Training enrollment submitted | `{ course_id, course_name }` | 🔴 High |
| `form_submit_newsletter` | Newsletter signup | `{ page }` | 🟡 Medium |
| `form_submit_partner` | Partner application submitted | `{ partner_type }` | 🟡 Medium |

---

## Navigation & Engagement Events

| Event Name | Trigger | Parameters | Priority |
|---|---|---|---|
| `click_cta` | Any CTA button clicked | `{ label, page, section }` | 🔴 High |
| `click_hotel_card` | Hotel card clicked | `{ hotel_slug, hotel_name, source }` | 🔴 High |
| `click_phone` | Phone number clicked | `{ page }` | 🟡 Medium |
| `click_email` | Email link clicked | `{ page }` | 🟡 Medium |
| `click_social` | Social media link clicked | `{ platform, location }` | 🟢 Low |
| `click_navigation` | Nav item clicked | `{ item, is_mobile }` | 🟢 Low |

---

## Content Consumption Events

| Event Name | Trigger | Parameters | Priority |
|---|---|---|---|
| `view_hotel_detail` | Hotel detail page viewed | `{ hotel_slug, hotel_name, star_rating }` | 🔴 High |
| `view_course_detail` | Training course detail viewed | `{ course_slug, course_name }` | 🟡 Medium |
| `view_service_detail` | Consulting service detail viewed | `{ service_slug, service_name }` | 🟡 Medium |
| `view_blog_post` | Blog post viewed | `{ post_slug, post_title, category }` | 🟡 Medium |
| `view_package_detail` | Trip package detail viewed | `{ package_slug, tier }` | 🟡 Medium |
| `view_itinerary_detail` | Itinerary detail viewed | `{ itinerary_slug, duration }` | 🟢 Low |

---

## Search & Filter Events

| Event Name | Trigger | Parameters | Priority |
|---|---|---|---|
| `search_hotels` | Hotel search/filter used | `{ query, property_type, star_rating, price_range }` | 🔴 High |
| `filter_change` | Any filter changed | `{ filter_type, filter_value, page }` | 🟡 Medium |
| `search_empty_result` | Search returns no results | `{ query, page }` | 🟡 Medium |

---

## Tool Usage Events

| Event Name | Trigger | Parameters | Priority |
|---|---|---|---|
| `use_budget_estimator` | Trip cost estimator used | `{ tier, duration, total_estimate }` | 🟡 Medium |
| `use_itinerary_builder` | Itinerary planner used | `{ days, activities_count }` | 🟡 Medium |

---

## Error & UX Events

| Event Name | Trigger | Parameters | Priority |
|---|---|---|---|
| `error_page_view` | Error page displayed | `{ error_code, error_digest }` | 🔴 High |
| `error_404` | 404 page displayed | `{ attempted_url }` | 🟡 Medium |
| `form_validation_error` | Form validation fails | `{ form_name, field, error_message }` | 🟢 Low |

---

## Implementation Guide

### Step 1: Add to Form Submissions

In each form component, add tracking after successful submit:

```tsx
// In contact-form.tsx
async function onSubmit(data: ContactInput) {
  const result = await submitContact(data);
  if (result.success) {
    trackEvent("form_submit_contact", { page: window.location.pathname });
    toast.success("Message sent!");
  }
}
```

### Step 2: Add to CTA Buttons

```tsx
<Button
  onClick={() => {
    trackEvent("click_cta", {
      label: "Book Now",
      page: "/hotels",
      section: "hero",
    });
  }}
>
  Book Now
</Button>
```

### Step 3: Add to Hotel Card Clicks

```tsx
<Link
  href={`/hotels/${hotel.slug}`}
  onClick={() => {
    trackEvent("click_hotel_card", {
      hotel_slug: hotel.slug,
      hotel_name: hotel.name,
      source: "featured",
    });
  }}
>
```

### Step 4: Track Page Views (Automatic)

GA4 automatically tracks `page_view` events. For enhanced tracking,
use the `trackEvent` helper in `useEffect`:

```tsx
useEffect(() => {
  trackEvent("view_hotel_detail", {
    hotel_slug: hotel.slug,
    hotel_name: hotel.name,
    star_rating: hotel.starRating,
  });
}, [hotel]);
```

---

## Google Analytics 4 Setup

### Custom Dimensions (configure in GA4 Admin)
| Dimension Name | Scope | Event Parameter |
|---|---|---|
| `hotel_name` | Event | `hotel_name` |
| `course_name` | Event | `course_name` |
| `service_type` | Event | `service_type` |
| `page_section` | Event | `section` |

### Conversions (mark as key events in GA4)
1. `form_submit_contact`
2. `form_submit_hotel_lead`
3. `form_submit_consulting`
4. `form_submit_training`
5. `form_submit_newsletter`
6. `click_phone`

### Audiences (create in GA4)
| Audience | Definition |
|---|---|
| **Hotel Browsers** | Users who viewed 2+ hotel details |
| **Training Interested** | Users who viewed training page + course detail |
| **B2B Prospects** | Users who viewed consulting page |
| **Engaged Planners** | Users who used budget estimator or itinerary builder |
| **Lead Submitters** | Users who triggered any `form_submit_*` event |

---

## Dashboard Reports to Build (GA4)

1. **Overview**: Sessions, users, bounce rate, avg session duration
2. **Conversion Funnel**: Page view → CTA click → Form submission
3. **Top Hotels**: Most viewed hotel detail pages
4. **Lead Sources**: Which pages generate most form submissions
5. **Mobile vs Desktop**: Conversion rate by device type
6. **Content Performance**: Blog post views, time on page
7. **Geographic**: User locations (Nepal regions, international)
