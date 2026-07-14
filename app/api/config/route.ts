import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');

  if (!type) {
    return NextResponse.json({ error: '缺少 type 参数' }, { status: 400 });
  }

  const { data: categoriesData, error: catError } = await supabase
    .from('content')
    .select('value')
    .eq('key', 'categories')
    .single();

  if (catError) {
    return NextResponse.json({ error: '获取分类失败' }, { status: 404 });
  }

  const { data: configData, error: cfgError } = await supabase
    .from('content')
    .select('value')
    .eq('key', 'commissionConfig')
    .single();

  if (cfgError) {
    return NextResponse.json({ error: '获取配置失败' }, { status: 404 });
  }

  const categories = categoriesData.value || [];
  const config = configData.value || { designerXiaohongshu: '', categories: {} };
  const category = categories.find((c: any) => c.id === type);
  const categoryConfig = config.categories[type] || { price: '面议', duration: '待定', notes: '暂无说明' };

  return NextResponse.json({
    categoryName: category?.name || type,
    designerXiaohongshu: config.designerXiaohongshu || 'YoloVibes_Design',
    price: categoryConfig.price,
    duration: categoryConfig.duration,
    notes: categoryConfig.notes,
  });
}