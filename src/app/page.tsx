import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Camera, Store, Megaphone, ArrowRight, GraduationCap } from 'lucide-react';

const services = [
  {
    icon: Camera,
    title: 'Photography',
    text: 'Editorial and lifestyle photography for your business — styled looks, products, details and in-store imagery, shot in natural light with clean composition.',
  },
  {
    icon: Store,
    title: 'Branding',
    text: 'A consistent visual identity for your brand. Imagery that captures the atmosphere of your store, your products and the people behind them.',
  },
  {
    icon: Megaphone,
    title: 'Social Media Content',
    text: 'Ongoing content creation for your channels — a steady stream of refined, on-brand photos so your feed always looks as good as your shop window.',
  },
];

const portfolio = [
  { src: '/images/street-style.jpg', alt: 'Street style portrait of a woman in a checked jacket' },
  { src: '/images/outfit-detail.jpg', alt: 'Styled outfit detail with layered jackets and belt' },
  { src: '/images/coffee-truck.jpg', alt: 'Woman ordering at a coffee truck' },
  { src: '/images/tote-detail.jpg', alt: 'Leather tote bag product photo' },
  { src: '/images/stairs-bag.jpg', alt: 'Handbag styled on a staircase railing' },
  { src: '/images/portrait-coat.jpg', alt: 'Profile portrait of a woman in a waxed coat' },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero — mirrors the portfolio layout */}
        <section className="section-padding pt-28 lg:pt-36 pb-16 lg:pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="fade-in lg:pt-6">
              <p className="text-xs uppercase tracking-widest text-accent mb-6">Etili Hollander</p>
              <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 mb-10 leading-[1.1]">
                Photographer &amp;<br />Content Creator
              </h1>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-accent mb-3">Who I Am</p>
                <p className="text-stone-600 leading-relaxed max-w-md">
                  I am a Haarlem-based photographer with a background in family and lifestyle photography. My work has always focused on natural light, clean composition and creating images that feel natural and refined.
                </p>
              </div>
              <div className="mb-10">
                <p className="text-xs uppercase tracking-widest text-accent mb-3">What I Do Today</p>
                <p className="text-stone-600 leading-relaxed max-w-md">
                  Today I focus on creating photography, branding and social media content for boutiques and businesses — styled looks, products, details and in-store imagery.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="btn-primary py-4 px-10">
                  Work With Me
                </a>
                <a href="#portfolio" className="btn-secondary py-4 px-10">
                  View Portfolio
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Image
                  src="/images/boutique-shelf.jpg"
                  alt="Boutique shelf styled with boots, bags and knitwear"
                  width={1168}
                  height={815}
                  priority
                  className="w-full h-auto"
                />
              </div>
              <Image
                src="/images/boutique-portrait.jpg"
                alt="Portrait of a boutique owner in a leather armchair"
                width={551}
                height={529}
                className="w-full h-auto"
              />
              <Image
                src="/images/folded-knits.jpg"
                alt="Folded knitwear and a leather bag in a boutique"
                width={579}
                height={528}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section-padding py-20 lg:py-28 bg-warm-100 scroll-mt-16">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-accent mb-4">Services</p>
            <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-12 max-w-xl">
              Imagery for businesses that care about how they look
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-white border border-stone-200 p-8">
                  <Icon size={22} strokeWidth={1.5} className="text-accent mb-5" />
                  <h3 className="font-display text-xl text-stone-900 mb-3">{title}</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-stone-500 mt-10">
              Currently creating content for boutiques including{' '}
              <span className="text-stone-700">Meent</span>.
            </p>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="section-padding py-20 lg:py-28 scroll-mt-16">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-accent mb-4">Selected Work</p>
            <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-12">
              Recent photography
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {portfolio.map(({ src, alt }) => (
                <Image
                  key={src}
                  src={src}
                  alt={alt}
                  width={681}
                  height={683}
                  className="w-full h-auto"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Course callout */}
        <section className="section-padding py-20 lg:py-28 bg-stone-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <GraduationCap size={28} strokeWidth={1.25} className="mx-auto mb-6 text-accent-light" />
            <p className="text-xs uppercase tracking-widest text-accent-light mb-6">Online Course</p>
            <h2 className="font-display text-3xl lg:text-5xl mb-6 font-normal leading-tight">
              Turn Everyday Moments Into Professional&nbsp;Photos
            </h2>
            <p className="text-stone-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Learn how to photograph your children, family, travels and everyday life beautifully — using only your smartphone.
            </p>
            <Link
              href="/course/phone-photography"
              className="btn-accent py-4 px-12 inline-flex items-center gap-2"
            >
              Explore the Course <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section-padding py-20 lg:py-28 scroll-mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-accent mb-4">Work Together</p>
            <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-6">
              Let&apos;s create something for your brand
            </h2>
            <p className="text-stone-500 leading-relaxed mb-10 max-w-md mx-auto">
              Tell me about your business and what you need — a one-off shoot, a full brand library, or ongoing social media content.
            </p>
            <a href="mailto:hello@etilihollander.com" className="btn-primary py-4 px-12">
              Get in Touch
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
