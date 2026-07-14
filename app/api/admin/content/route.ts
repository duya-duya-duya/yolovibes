import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const file = url.searchParams.get('file');

  if (!file) {
    return NextResponse.json({ error: '缺少 file 参数' }, { status: 400 });
  }

  const key = file.replace('.json', '');
  const { data, error } = await supabase
    .from('content')
    .select('value')
    .eq('key', key)
    .single();

  if (error) {
    return NextResponse.json({ error: '文件不存在' }, { status: 404 });
  }

  return NextResponse.json(data.value);
}

export async function POST(request: Request) {
  const { file, data } = await request.json();

  if (!file || data === undefined) {
    return NextResponse.json({ error: '缺少 file 或 data 参数' }, { status: 400 });
  }

  const key = file.replace('.json', '');
  const { error } = await supabase
    .from('content')
    .upsert({ key, value: data }, { onConflict: 'key' });

  if (error) {
    console.error('写入失败:', error);
    return NextResponse.json({ error: '写入失败' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}