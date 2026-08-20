# PhotoCraft — Smartphone Photography Course Platform

A production-ready MVP for selling and delivering online smartphone photography courses. Built with Next.js, Supabase, Stripe, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (PostgreSQL + Auth + RLS)
- **Payments:** Stripe Checkout + Webhooks
- **Analytics:** PostHog, Google Analytics, Meta Pixel (all optional)
- **Deployment:** Vercel

## Project Structure

```
src/
├── app/
│   ├── page.tsx                     # Homepage / landing page
│   ├── layout.tsx                   # Root layout with fonts + analytics
│   ├── about/page.tsx               # About page
│   ├── faq/page.tsx                 # FAQ page
│   ├── login/page.tsx               # Login (password + magic link)
│   ├── signup/page.tsx              # Sign up
│   ├── dashboard/page.tsx           # Student dashboard
│   ├── checkout/
│   │   ├── page.tsx                 # Redirect to Stripe Checkout
│   │   ├── success/page.tsx         # Post-purchase success
│   │   └── cancel/page.tsx          # Checkout cancelled
│   ├── course/
│   │   └── [slug]/
│   │       ├── page.tsx             # Course landing page
│   │       └── lesson/
│   │           └── [lessonSlug]/
│   │               └── page.tsx     # Lesson player
│   ├── admin/
│   │   ├── layout.tsx               # Admin navigation
│   │   ├── page.tsx                 # Admin overview
│   │   ├── courses/page.tsx         # Course management
│   │   ├── users/page.tsx           # User listing
│   │   └── orders/page.tsx          # Order history
│   ├── api/
│   │   ├── auth/
│   │   │   ├── callback/route.ts    # OAuth/magic link callback
│   │   │   └── logout/route.ts      # Sign out
│   │   ├── checkout/route.ts        # Create Stripe session
│   │   └── stripe/
│   │       └── webhook/route.ts     # Stripe webhook handler
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── layout/                      # Header, Footer, Analytics
│   ├── landing/                     # Homepage sections
│   ├── course/                      # Course sidebar, lesson player
│   └── admin/                       # Admin components
├── lib/
│   ├── supabase/client.ts           # Browser Supabase client
│   ├── supabase/server.ts           # Server Supabase client
│   ├── stripe.ts                    # Stripe instance
│   ├── analytics.ts                 # Event tracking
│   └── course.ts                    # Course data fetching
├── types/index.ts                   # TypeScript types
└── middleware.ts                    # Auth protection
supabase/
├── schema.sql                       # Database schema + RLS
└── seed.sql                         # Sample course data
```

## Setup Instructions

### 1. Clone and Install

```bash
git clone <repo-url>
cd photocraft
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Run `supabase/seed.sql` to populate the course content
4. Copy your project URL and keys to `.env.local`

### 3. Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Stripe Dashboard
3. Set up a webhook endpoint pointing to `https://your-domain.com/api/stripe/webhook`
4. Subscribe to the `checkout.session.completed` event
5. Copy your keys and webhook secret to `.env.local`

### 4. Environment Variables

Copy `.env.example` to `.env.local` and fill in all values:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL`

### 5. Run Development Server

```bash
npm run dev
```

### 6. Create Admin User

After signing up, update your profile role in Supabase:

```sql
UPDATE public.profiles SET role = 'admin' WHERE email = 'your@email.com';
```

### 7. Deploy to Vercel

```bash
vercel
```

Add all environment variables in the Vercel dashboard.

## Database Schema

### Core Tables

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles extending Supabase Auth |
| `courses` | Course catalog |
| `modules` | Course sections / chapters |
| `lessons` | Individual lessons with video + content |
| `enrollments` | User → Course access grants |
| `lesson_progress` | Per-user lesson completion tracking |
| `orders` | Stripe payment records |
| `assignments` | Future-ready: lesson assignments |
| `assignment_submissions` | Future-ready: student photo uploads + AI feedback |

Row Level Security (RLS) is enabled on all tables. Users can only access their own data. Published courses are publicly visible.

## Analytics Events

| Event | When |
|-------|------|
| `homepage_view` | Landing page loaded |
| `course_page_view` | Course page loaded |
| `pricing_view` | Pricing section scrolled into view |
| `checkout_started` | User clicks "Start the Course" button |
| `purchase_completed` | Stripe webhook confirms payment |
| `signup_completed` | New user registration |
| `lesson_started` | Lesson page loaded |
| `lesson_completed` | User marks lesson as complete |
| `course_completed` | All lessons marked complete |
| `preview_lesson_viewed` | Free preview lesson viewed |

## Stripe Payment Flow

1. User clicks checkout → POST to `/api/checkout`
2. Server creates Stripe Checkout Session with course metadata
3. User completes payment on Stripe-hosted page
4. Stripe sends `checkout.session.completed` webhook
5. Webhook handler creates order + enrollment records
6. User redirected to `/checkout/success`

## Future Architecture

The platform is designed to support:

- **Additional courses** — just add rows to courses/modules/lessons
- **Subscriptions** — Stripe subscription support can be added to the checkout flow
- **AI Photo Coach** — assignment_submissions table is ready for photo uploads and AI feedback
- **B2B content services** — course structure supports business-focused content
- **Localization** — no hardcoded strings; architecture supports i18n

## Design System

- **Display font:** Playfair Display (editorial, European feel)
- **Body font:** Inter (clean, readable)
- **Colors:** Warm stone palette with golden accent (#8b6f47)
- **Style:** Minimal, editorial, photography-led, premium
- **No rounded corners** on buttons/cards — sharp, editorial aesthetic
