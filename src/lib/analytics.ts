'use client';

type EventName =
  | 'homepage_view'
  | 'course_page_view'
  | 'pricing_view'
  | 'checkout_started'
  | 'purchase_completed'
  | 'signup_completed'
  | 'lesson_started'
  | 'lesson_completed'
  | 'course_completed'
  | 'preview_lesson_viewed';

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(event: EventName, properties?: EventProperties) {
  // PostHog
  if (typeof window !== 'undefined' && (window as any).posthog) {
    (window as any).posthog.capture(event, properties);
  }

  // Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event, properties);
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', event, properties);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${event}`, properties);
  }
}

export function identifyUser(userId: string, traits?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).posthog) {
    (window as any).posthog.identify(userId, traits);
  }
}
