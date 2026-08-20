import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FAQSection from '@/components/landing/FAQSection';

export const metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about the PhotoCraft smartphone photography course.',
};

export default function FAQPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
