import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FAQSection from '@/components/landing/FAQSection';
import { getSiteContent, parseFaqItems } from '@/lib/content';

export const metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about the Etili Hollander smartphone photography course.',
};

export default async function FAQPage() {
  const content = await getSiteContent();

  return (
    <>
      <Header />
      <main className="pt-20">
        <FAQSection
          eyebrow={content['faq.eyebrow']}
          title={content['faq.title']}
          items={parseFaqItems(content['faq.items'])}
        />
      </main>
      <Footer />
    </>
  );
}
