import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50">
      <div className="section-padding py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16">
          <div className="md:col-span-2">
            <p className="font-display text-xl text-stone-900 mb-1">Etili Hollander</p>
            <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">Boutique Photography</p>
            <p className="text-sm text-stone-500 leading-relaxed max-w-sm">
              Learn to take photos you actually want to keep — using only the phone already in your pocket.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-400 mb-4">Learn</p>
            <div className="flex flex-col gap-2.5">
              <Link href="/course/phone-photography" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                Phone Photography Course
              </Link>
              <Link href="/faq" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                FAQ
              </Link>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-400 mb-4">Company</p>
            <div className="flex flex-col gap-2.5">
              <Link href="/about" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                About
              </Link>
              <Link href="/login" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                Log in
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-stone-200">
          <p className="text-xs text-stone-400">
            © {new Date().getFullYear()} Etili Hollander — Boutique Photography. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
