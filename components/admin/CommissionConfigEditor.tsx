'use client';
import { useState, useEffect } from 'react';

export default function CommissionConfigEditor() {
  const [config, setConfig] = useState<any>({ categories: {} });
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/content?file=commissionConfig.json').then(r => r.json()),
      fetch('/api/admin/content?file=categories.json').then(r => r.json())
    ])
      .then(([cfg, cats]) => {
        // ✅ 确保数据格式正确
        setConfig(cfg || { categories: {} });
        setCategories(Array.isArray(cats) ? cats : []);
      })
      .catch(err => {
        console.error('加载配置数据失败:', err);
        setConfig({ categories: {} });
        setCategories([]);
      });
  }, []);

  const updateCategory = (id: string, field: string, value: string) => {
    setConfig((prev: any) => ({
      ...prev || { categories: {} },
      categories: {
        ...(prev?.categories || {}),
        [id]: { ...(prev?.categories?.[id] || {}), [field]: value }
      }
    }));
  };

  const save = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: 'commissionConfig.json', data: config }),
      });
      alert('✅ 保存成功');
    } catch (error) {
      alert('❌ 保存失败');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">定稿页配置</h2>
      <div>
        <label className="block">设计师小红书ID（全局）</label>
        <input 
          className="w-full border p-2 rounded" 
          value={config?.designerXiaohongshu || ''} 
          onChange={(e) => setConfig({ ...config, designerXiaohongshu: e.target.value })} 
        />
      </div>
      {Array.isArray(categories) && categories.map(cat => (
        <div key={cat.id} className="border p-4 rounded space-y-2">
          <h3 className="font-bold">{cat.name}</h3>
          <input 
            className="w-full border p-2 rounded" 
            placeholder="参考价格" 
            value={config?.categories?.[cat.id]?.price || ''} 
            onChange={(e) => updateCategory(cat.id, 'price', e.target.value)} 
          />
          <input 
            className="w-full border p-2 rounded" 
            placeholder="预估时长" 
            value={config?.categories?.[cat.id]?.duration || ''} 
            onChange={(e) => updateCategory(cat.id, 'duration', e.target.value)} 
          />
          <textarea 
            className="w-full border p-2 rounded" 
            rows={4} 
            placeholder="约稿注意事项（换行用数字序号）" 
            value={config?.categories?.[cat.id]?.notes || ''} 
            onChange={(e) => updateCategory(cat.id, 'notes', e.target.value)} 
          />
        </div>
      ))}
      <button onClick={save} className="bg-pink-500 text-white px-6 py-2 rounded" disabled={loading}>
        {loading ? '保存中...' : '保存全部'}
      </button>
    </div>
  );
}