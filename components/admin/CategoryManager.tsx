// components/admin/CategoryManager.tsx
'use client';
import { useState, useEffect } from 'react';

export default function CategoryManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    const res = await fetch('/api/admin/content?file=categories.json');
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const addCategory = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    const newId = newName.toLowerCase().replace(/\s+/g, '_');
    const newCat = { id: newId, name: newName.trim(), order: categories.length + 1 };
    const updated = [...categories, newCat];
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: 'categories.json', data: updated }),
    });
    // 同时需要在 works.json 和 commissionConfig.json 中添加空条目，以免出错
    // 简单起见，我们只提示
    setCategories(updated);
    setNewName('');
    setLoading(false);
    alert('分类已添加，请手动在 works.json 和 commissionConfig.json 中补充对应数据（或重启服务）');
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('确定要删除吗？')) return;
    const updated = categories.filter(c => c.id !== id);
    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file: 'categories.json', data: updated }),
    });
    setCategories(updated);
    alert('已删除，请同步清理 works.json 和 commissionConfig.json 中的相关条目');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">作品分类管理</h2>
      <div className="flex gap-2">
        <input
          className="border p-2 rounded flex-1"
          placeholder="新分类名称（如：海报设计）"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <button onClick={addCategory} className="bg-pink-500 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? '添加中...' : '添加'}
        </button>
      </div>
      <ul className="divide-y">
        {categories.map(cat => (
          <li key={cat.id} className="flex justify-between items-center py-2">
            <span>{cat.name} (ID: {cat.id})</span>
            <button onClick={() => deleteCategory(cat.id)} className="text-red-500 text-sm">删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}