// app/admin/page.tsx
'use client';
import { Suspense } from 'react'; // 1. 导入 Suspense
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

export default function AdminPage() {
  return (
+    <Suspense fallback={<div>加载中...</div>}> {/* 2. 添加 Suspense 边界 */}
       <AdminContent />
+    </Suspense>
  );
}