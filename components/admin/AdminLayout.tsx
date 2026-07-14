// components/admin/AdminLayout.tsx
'use client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get('tab') || 'intro';

  const tabs = [
    { name: '📝 介绍页', href: '/admin' },
    { name: '📂 分类管理', href: '/admin?tab=categories' },
    { name: '🖼️ 作品管理', href: '/admin?tab=works' },
    { name: '⚙️ 定稿配置', href: '/admin?tab=commission' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin' && currentTab === 'intro') return true;
    if (href.includes('tab=')) {
      const tabParam = href.split('tab=')[1];
      return currentTab === tabParam;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-6">
      {/* 导航栏 */}
      <nav className="glass-card max-w-5xl mx-auto rounded-2xl p-2 mb-6 flex flex-wrap gap-2">
        {tabs.map(tab => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
              isActive(tab.href)
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-md'
                : 'text-gray-600 hover:bg-white/60'
            }`}
          >
            {tab.name}
          </Link>
        ))}
      </nav>

      {/* 页面内容 */}
      <div className="max-w-5xl mx-auto">
        {children}
      </div>
    </div>
  );
}