// app/admin/page.tsx
'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import IntroEditor from '@/components/admin/IntroEditor';
import CategoryManager from '@/components/admin/CategoryManager';
import WorksManager from '@/components/admin/WorksManager';
import CommissionConfigEditor from '@/components/admin/CommissionConfigEditor';

function AdminContent() {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'intro';

  let content;
  switch (tab) {
    case 'categories':
      content = <CategoryManager />;
      break;
    case 'works':
      content = <WorksManager />;
      break;
    case 'commission':
      content = <CommissionConfigEditor />;
      break;
    default:
      content = <IntroEditor />;
  }

  return <AdminLayout currentTab={tab}>{content}</AdminLayout>;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-500">加载中...</div>}>
      <AdminContent />
    </Suspense>
  );
}