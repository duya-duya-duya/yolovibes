// app/commission/[type]/page.tsx
import { getCommissionPageData, getCategories } from '@/lib/data';
import InteractiveOrderForm from './InteractiveOrderForm';

export default async function CommissionPage({ params }: { params: { type: string } }) {
  const config = await getCommissionPageData(params.type);
  return <InteractiveOrderForm config={config} type={params.type} />;
}

// 构建时预生成所有分类页面
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat: any) => ({ type: cat.id }));
}