import Link from 'next/link';
import { BookOpen, Layers, FileText, Users, Receipt, ArrowLeft } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Overview', icon: Layers },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/orders', label: 'Orders', icon: Receipt },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-stone-900 text-white">
        <div className="section-padding flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm text-stone-400 hover:text-white flex items-center gap-1.5">
              <ArrowLeft size={14} />
              Site
            </Link>
            <span className="text-sm font-medium">Etili Hollander Admin</span>
          </div>
          <Link href="/dashboard" className="text-xs text-stone-400 hover:text-white">
            Dashboard
          </Link>
        </div>
      </header>
      <div className="section-padding py-6">
        <nav className="flex gap-1 mb-8 overflow-x-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-4 py-2 text-sm text-stone-600 hover:text-stone-900 hover:bg-white rounded transition-colors whitespace-nowrap"
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
