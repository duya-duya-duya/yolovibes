// app/admin/page.tsx
'use client';
import { useSearchParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import IntroEditor from '@/components/admin/IntroEditor';
import CategoryManager from '@/components/admin/CategoryManager';
import WorksManager from '@/components/admin/WorksManager';
import CommissionConfigEditor from '@/components/admin/CommissionConfigEditor';

export default function AdminPage() {
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

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto">
        <div className="glass-card p-6 rounded-2xl">
          {content}
        </div>
      </div>
    </AdminLayout>
  );
}