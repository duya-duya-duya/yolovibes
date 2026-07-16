// app/api/public/content/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const file = url.searchParams.get('file');

  if (!file) {
    return NextResponse.json(
      { error: '缺少 file 参数' },
      { status: 400, headers: { 'Cache-Control': 'no-cache' } }
    );
  }

  const allowedFiles = ['content.json', 'categories.json', 'works.json', 'commissionConfig.json'];
  if (!allowedFiles.includes(file)) {
    return NextResponse.json(
      { error: '不允许读取该文件' },
      { status: 403, headers: { 'Cache-Control': 'no-cache' } }
    );
  }

  const key = file.replace('.json', '');

  const { data, error } = await supabase
    .from('content')
    .select('value')
    .eq('key', key)
    .single();

  if (error) {
    console.error(`读取 ${file} 失败:`, error);
    return NextResponse.json(
      { error: `文件不存在或格式错误` },
      { status: 404, headers: { 'Cache-Control': 'no-cache' } }
    );
  }

  // ✅ 添加缓存头
  return NextResponse.json(data.value, {
    headers: {
      // public: 可被 CDN/浏览器缓存
      // s-maxage=60: Vercel CDN 缓存 60 秒
      // stale-while-revalidate=30: 过期后 30 秒内继续使用旧数据，后台刷新
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
    },
  });
}