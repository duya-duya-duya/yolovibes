'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const path = usePathname();
  const isAdmin = path.startsWith('/admin') || path.startsWith('/login');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 bg-white/80 backdrop-blur-sm shadow-sm">
      <Link href="/" className="text-xl font-bold text-pink-600">
        YoloVibes
      </Link>
      {!isAdmin && (
        <nav className="ml-8 flex gap-4 text-sm">
          <Link href="/" className={path === '/' ? 'text-pink-500' : 'text-gray-600'}>
            首页
          </Link>
          <Link href="/#intro" className="text-gray-600">
            介绍
          </Link>
          <Link href="/#gallery" className="text-gray-600">
            作品
          </Link>
          <Link href="/#commission" className="text-gray-600">
            约稿
          </Link>
        </nav>
      )}
    </header>
  );
}