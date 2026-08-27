export interface FaqItem {
  q: string;
  a: string;
}

export interface SiteImage {
  url: string;
  alt: string;
}

// Every editable text on the site, keyed. Values here are the fallbacks
// used until an admin saves an override in the site_content table.
export const contentDefaults: Record<string, string> = {
  // Homepage — hero
  'home.hero.eyebrow': 'Etili Hollander',
  'home.hero.title': 'Photographer &\nContent Creator',
  'home.hero.whoiam_label': 'Who I Am',
  'home.hero.whoiam':
    'I am a Haarlem-based photographer with a background in family and lifestyle photography. My work has always focused on natural light, clean composition and creating images that feel natural and refined.',
  'home.hero.whatido_label': 'What I Do Today',
  'home.hero.whatido':
    'Today I focus on creating photography, branding and social media content for boutiques and businesses — styled looks, products, details and in-store imagery.',
  'home.hero.cta_primary': 'Work With Me',
  'home.hero.cta_secondary': 'View Portfolio',

  // Homepage — services
  'home.services.eyebrow': 'Services',
  'home.services.title': 'Imagery for businesses that care about how they look',
  'home.services.1.title': 'Photography',
  'home.services.1.text':
    'Editorial and lifestyle photography for your business — styled looks, products, details and in-store imagery, shot in natural light with clean composition.',
  'home.services.2.title': 'Branding',
  'home.services.2.text':
    'A consistent visual identity for your brand. Imagery that captures the atmosphere of your store, your products and the people behind them.',
  'home.services.3.title': 'Social Media Content',
  'home.services.3.text':
    'Ongoing content creation for your channels — a steady stream of refined, on-brand photos so your feed always looks as good as your shop window.',
  'home.services.note': 'Currently creating content for boutiques including Meent.',

  // Homepage — portfolio
  'home.portfolio.eyebrow': 'Selected Work',
  'home.portfolio.title': 'Recent photography',

  // Homepage — course callout
  'home.course.eyebrow': 'Online Course',
  'home.course.title': 'Turn Everyday Moments Into Professional Photos',
  'home.course.text':
    'Learn how to photograph your children, family, travels and everyday life beautifully — using only your smartphone.',
  'home.course.cta': 'Explore the Course',

  // Homepage — contact
  'home.contact.eyebrow': 'Work Together',
  'home.contact.title': "Let's create something for your brand",
  'home.contact.text':
    'Tell me about your business and what you need — a one-off shoot, a full brand library, or ongoing social media content.',
  'home.contact.cta': 'Get in Touch',
  'contact.email': 'hello@etilihollander.com',

  // Courses listing page
  'courses.eyebrow': 'Online Courses',
  'courses.title': 'Learn photography, one practical lesson at a time',
  'courses.text':
    'Every course teaches specific, practical skills you can apply immediately — no jargon, no expensive equipment.',
  'courses.empty': 'No courses are available right now — check back soon.',

  // About page
  'about.eyebrow': 'About Etili Hollander',
  'about.title': 'Better photos should be simple',
  'about.body':
    'Etili Hollander — Boutique Photography was built on a simple observation: most people take hundreds of photos every year with an incredibly powerful camera — the one in their phone — and are disappointed with the results.\n\nThe problem is rarely the camera. Modern smartphones produce stunning image quality. The issue is that a few fundamental photographic principles — light, lens choice, composition, and camera position — are never taught to everyday users.\n\nOur courses bridge that gap. We take professional photography techniques and translate them into simple, visual, immediately actionable lessons that anyone can apply using only their smartphone.\n\nNo jargon. No expensive equipment. No prior experience needed.\n\nJust better photos, starting today.',
  'about.cta.title': 'Ready to start?',
  'about.cta.text': 'Join the course and see the difference in your very first photos.',
  'about.cta.button': 'View the Course',

  // FAQ
  'faq.eyebrow': 'Common Questions',
  'faq.title': 'Frequently asked questions',
  'faq.items': JSON.stringify([
    {
      q: 'Do I need an iPhone?',
      a: 'No. This course works with any modern smartphone — iPhone, Samsung, Google Pixel, or any Android device with a camera. The techniques are universal.',
    },
    {
      q: 'Does this work with Android?',
      a: 'Absolutely. While some screenshots show iPhone, every technique applies equally to Android. Smartphone cameras share the same fundamental principles.',
    },
    {
      q: 'Do I need photography experience?',
      a: 'None at all. This course is designed for complete beginners. If you can take a photo with your phone, you have all the skills you need to start.',
    },
    {
      q: 'How long is the course?',
      a: 'The course contains around 30 short lessons, each between 3 and 8 minutes. You can complete the entire course in a weekend, or take one lesson per day over a month.',
    },
    {
      q: 'Can I watch it on my phone?',
      a: 'Yes. The platform is designed mobile-first. You can watch lessons on your phone, tablet, or desktop — wherever is most comfortable.',
    },
    {
      q: 'How long do I have access?',
      a: 'Lifetime. Once you purchase the course, you keep access forever — including any future updates and new lessons we add.',
    },
    {
      q: 'Is this suitable for parents?',
      a: 'This course was designed with parents in mind. Several lessons specifically cover photographing children, family moments, birthday parties, and everyday life at home.',
    },
    {
      q: 'Do I need editing software?',
      a: "No. The editing lessons use the free editing tools built into your phone's photo app. No additional apps or subscriptions required.",
    },
  ]),

  // Before & After section (course page)
  'ba.eyebrow': 'See the Difference',
  'ba.title': 'One small change. Dramatically better photos.',
  'ba.text':
    'Each of these improvements took less than five seconds. No editing. No special equipment. Just a simple adjustment anyone can learn.',
  'ba.1.label': 'Portrait lens choice',
  'ba.1.change': 'Used 2x instead of 0.5x',
  'ba.2.label': 'Window light positioning',
  'ba.2.change': 'Moved closer to the window',
  'ba.3.label': 'Camera height',
  'ba.3.change': 'Lowered the phone to eye level',
  'ba.4.label': 'Background simplification',
  'ba.4.change': 'Removed distracting background',

  // Pricing section (course page)
  'pricing.eyebrow': 'Start Today',
  'pricing.title': 'Better photos start here',
  'pricing.text': 'One course. Lifetime access. Immediate results.',
  'pricing.features': JSON.stringify([
    'Lifetime access to all lessons',
    'Future lesson updates included',
    'Watch on phone, tablet, or desktop',
    'Practical challenges with every module',
    'No photography equipment required',
    'Works with any smartphone',
  ]),
  'pricing.footnote': 'Secure payment via Stripe. 14-day money-back guarantee.',

  // Footer
  'footer.tagline':
    'Photography, branding and social media content for boutiques and businesses — and an online course for everyone who wants to take better photos.',
};

// Every uploadable photo slot on the site. Values here are the fallbacks
// used until an admin uploads a replacement (site_images table).
export const imageDefaults: Record<string, SiteImage> = {
  'home.hero.main': {
    url: '/images/boutique-shelf.jpg',
    alt: 'Boutique shelf styled with boots, bags and knitwear',
  },
  'home.hero.small1': {
    url: '/images/boutique-portrait.jpg',
    alt: 'Portrait of a boutique owner in a leather armchair',
  },
  'home.hero.small2': {
    url: '/images/folded-knits.jpg',
    alt: 'Folded knitwear and a leather bag in a boutique',
  },
  'home.portfolio.1': {
    url: '/images/street-style.jpg',
    alt: 'Street style portrait of a woman in a checked jacket',
  },
  'home.portfolio.2': {
    url: '/images/outfit-detail.jpg',
    alt: 'Styled outfit detail with layered jackets and belt',
  },
  'home.portfolio.3': {
    url: '/images/coffee-truck.jpg',
    alt: 'Woman ordering at a coffee truck',
  },
  'home.portfolio.4': {
    url: '/images/tote-detail.jpg',
    alt: 'Leather tote bag product photo',
  },
  'home.portfolio.5': {
    url: '/images/stairs-bag.jpg',
    alt: 'Handbag styled on a staircase railing',
  },
  'home.portfolio.6': {
    url: '/images/portrait-coat.jpg',
    alt: 'Profile portrait of a woman in a waxed coat',
  },
  // Before/After pairs start empty — colored placeholders render until uploaded
  'ba.1.before': { url: '', alt: 'Before: portrait lens choice' },
  'ba.1.after': { url: '', alt: 'After: portrait lens choice' },
  'ba.2.before': { url: '', alt: 'Before: window light positioning' },
  'ba.2.after': { url: '', alt: 'After: window light positioning' },
  'ba.3.before': { url: '', alt: 'Before: camera height' },
  'ba.3.after': { url: '', alt: 'After: camera height' },
  'ba.4.before': { url: '', alt: 'Before: background simplification' },
  'ba.4.after': { url: '', alt: 'After: background simplification' },
};

export function parseFaqItems(json: string): FaqItem[] {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => item && typeof item.q === 'string' && typeof item.a === 'string');
    }
  } catch {
    // fall through to defaults
  }
  return JSON.parse(contentDefaults['faq.items']) as FaqItem[];
}

export function parseStringList(json: string, fallbackKey: string): string[] {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => typeof item === 'string');
    }
  } catch {
    // fall through to defaults
  }
  return JSON.parse(contentDefaults[fallbackKey]) as string[];
}
