'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const inCoursesSection = pathname?.startsWith('/course');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-warm-50/95 backdrop-blur-sm border-b border-stone-200' : 'bg-transparent'
      }`}
    >
      <nav className="section-padding flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-lg tracking-tight font-display text-stone-900">Etili Hollander</span>
          <span className="text-[10px] uppercase tracking-widest text-stone-500">Boutique Photography</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#portfolio" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
            Portfolio
          </Link>
          <Link href="/#services" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
            Services
          </Link>
          <Link href="/courses" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
            Courses
          </Link>
          <Link href="/about" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
            About
          </Link>
          {user && inCoursesSection ? (
            <Link href="/dashboard" className="btn-primary text-xs py-2.5 px-6">
              My Course
            </Link>
          ) : user ? (
            <Link href="/#contact" className="btn-primary text-xs py-2.5 px-6">
              Work With Me
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm text-stone-600 hover:text-stone-900 transition-colors">
                Log in
              </Link>
              <Link href="/#contact" className="btn-primary text-xs py-2.5 px-6">
                Work With Me
              </Link>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 -mr-2" aria-label="Menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-warm-50 border-b border-stone-200 px-5 pb-6 pt-2">
          <div className="flex flex-col gap-4">
            <Link href="/#portfolio" onClick={() => setOpen(false)} className="text-stone-700 py-2">
              Portfolio
            </Link>
            <Link href="/#services" onClick={() => setOpen(false)} className="text-stone-700 py-2">
              Services
            </Link>
            <Link href="/courses" onClick={() => setOpen(false)} className="text-stone-700 py-2">
              Courses
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="text-stone-700 py-2">
              About
            </Link>
            {user && inCoursesSection ? (
              <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-primary text-center mt-2">
                My Course
              </Link>
            ) : user ? (
              <Link href="/#contact" onClick={() => setOpen(false)} className="btn-primary text-center mt-2">
                Work With Me
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="text-stone-700 py-2">
                  Log in
                </Link>
                <Link href="/#contact" onClick={() => setOpen(false)} className="btn-primary text-center mt-2">
                  Work With Me
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
