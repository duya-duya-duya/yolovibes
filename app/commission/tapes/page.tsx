// app/commission/postcards/page.tsx
// 删除顶部的 'use client'

import InteractiveOrderForm from './InteractiveOrderForm';

// 获取配置数据的函数（服务端执行）
async function getConfig(type: string) {
  const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
    : 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/config?type=${type}`);
  if (!res.ok) throw new Error('Failed to fetch config');
  return res.json();
}

export default async function CommissionPage() {
  const type = 'tapes'; // 固定为当前分类
  const config = await getConfig(type);
  
  // 将数据传给客户端组件
  return <InteractiveOrderForm config={config} type={type} />;
}

// generateStaticParams 可以保留（仅在服务端构建时执行）
export async function generateStaticParams() {
  // 如果使用动态路由，这里返回所有分类的 type
  // 但因为是静态分类，可以省略或返回空数组
  return [];
}