// lib/data.ts
import { supabase } from './supabase';

export async function getContentKey(key: string) {
  const { data, error } = await supabase
    .from('content')
    .select('value')
    .eq('key', key)
    .single();
  if (error) throw new Error(`Failed to fetch ${key}: ${error.message}`);
  return data.value;
}

export async function getIntroContent() {
  return getContentKey('content');
}

export async function getCategories() {
  return getContentKey('categories');
}

export async function getWorks() {
  return getContentKey('works');
}

export async function getCommissionConfig() {
  return getContentKey('commissionConfig');
}

export async function getHomePageData() {
  const [content, categories, works] = await Promise.all([
    getIntroContent(),
    getCategories(),
    getWorks(),
  ]);
  return { content, categories, works };
}

export async function getCommissionPageData(type: string) {
  const [categories, config] = await Promise.all([
    getCategories(),
    getCommissionConfig(),
  ]);
  const category = categories.find((c: any) => c.id === type);
  const categoryConfig = config.categories?.[type] || {};
  return {
    categoryName: category?.name || type,
    designerXiaohongshu: config.designerXiaohongshu || '',
    price: categoryConfig.price || '面议',
    duration: categoryConfig.duration || '待定',
    notes: categoryConfig.notes || '暂无说明',
  };
}