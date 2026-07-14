import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const file = url.searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: '缺少 file 参数' }, { status: 400 });
  }

  const allowedFiles = ['content.json', 'categories.json', 'works.json', 'commissionConfig.json'];
  if (!allowedFiles.includes(file)) {
    return NextResponse.json({ error: '不允许读取该文件' }, { status: 403 });
  }

  const key = file.replace('.json', '');

  const { data, error } = await supabase
    .from('content')
    .select('value')
    .eq('key', key)
    .single();

  if (error) {
    console.error(`读取 ${file} 失败:`, error);
    return NextResponse.json({ error: `文件不存在或格式错误` }, { status: 404 });
  }

  return NextResponse.json(data.value);
}