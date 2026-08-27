import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getSiteContent, getSiteImages } from '@/lib/content';
import { Camera, Store, Megaphone, ArrowRight, GraduationCap } from 'lucide-react';

const serviceIcons = [Camera, Store, Megaphone];

export default async function HomePage() {
  const [content, images] = await Promise.all([getSiteContent(), getSiteImages()]);

  const services = [1, 2, 3].map((i) => ({
    icon: serviceIcons[i - 1],
    title: content[`home.services.${i}.title`],
    text: content[`home.services.${i}.text`],
  }));

  const portfolio = [1, 2, 3, 4, 5, 6]
    .map((i) => images[`home.portfolio.${i}`])
    .filter((img) => img && img.url);

  return (
    <>
      <Header />
      <main>
        {/* Hero — mirrors the portfolio layout */}
        <section className="section-padding pt-28 lg:pt-36 pb-16 lg:pb-24">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="fade-in lg:pt-6">
              <p className="text-xs uppercase tracking-widest text-accent mb-6">
                {content['home.hero.eyebrow']}
              </p>
              <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl text-stone-900 mb-10 leading-[1.1] whitespace-pre-line">
                {content['home.hero.title']}
              </h1>
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-accent mb-3">
                  {content['home.hero.whoiam_label']}
                </p>
                <p className="text-stone-600 leading-relaxed max-w-md">{content['home.hero.whoiam']}</p>
              </div>
              <div className="mb-10">
                <p className="text-xs uppercase tracking-widest text-accent mb-3">
                  {content['home.hero.whatido_label']}
                </p>
                <p className="text-stone-600 leading-relaxed max-w-md">{content['home.hero.whatido']}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="btn-primary py-4 px-10">
                  {content['home.hero.cta_primary']}
                </a>
                <a href="#portfolio" className="btn-secondary py-4 px-10">
                  {content['home.hero.cta_secondary']}
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative col-span-2 aspect-[10/7]">
                <Image
                  src={images['home.hero.main'].url}
                  alt={images['home.hero.main'].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square">
                <Image
                  src={images['home.hero.small1'].url}
                  alt={images['home.hero.small1'].alt}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square">
                <Image
                  src={images['home.hero.small2'].url}
                  alt={images['home.hero.small2'].alt}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section-padding py-20 lg:py-28 bg-warm-100 scroll-mt-16">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-accent mb-4">
              {content['home.services.eyebrow']}
            </p>
            <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-12 max-w-xl">
              {content['home.services.title']}
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
            <p className="text-sm text-stone-500 mt-10">{content['home.services.note']}</p>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="section-padding py-20 lg:py-28 scroll-mt-16">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-accent mb-4">
              {content['home.portfolio.eyebrow']}
            </p>
            <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-12">
              {content['home.portfolio.title']}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
              {portfolio.map(({ url, alt }) => (
                <div key={url} className="relative aspect-square">
                  <Image
                    src={url}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Course callout */}
        <section className="section-padding py-20 lg:py-28 bg-stone-900 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <GraduationCap size={28} strokeWidth={1.25} className="mx-auto mb-6 text-accent-light" />
            <p className="text-xs uppercase tracking-widest text-accent-light mb-6">
              {content['home.course.eyebrow']}
            </p>
            <h2 className="font-display text-3xl lg:text-5xl mb-6 font-normal leading-tight">
              {content['home.course.title']}
            </h2>
            <p className="text-stone-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              {content['home.course.text']}
            </p>
            <Link href="/courses" className="btn-accent py-4 px-12 inline-flex items-center gap-2">
              {content['home.course.cta']} <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section-padding py-20 lg:py-28 scroll-mt-16">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-accent mb-4">
              {content['home.contact.eyebrow']}
            </p>
            <h2 className="heading-display text-3xl lg:text-4xl text-stone-900 mb-6">
              {content['home.contact.title']}
            </h2>
            <p className="text-stone-500 leading-relaxed mb-10 max-w-md mx-auto">
              {content['home.contact.text']}
            </p>
            <a href={`mailto:${content['contact.email']}`} className="btn-primary py-4 px-12">
              {content['home.contact.cta']}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
