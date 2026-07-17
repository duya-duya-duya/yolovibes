// components/admin/CategoryManager.tsx
'use client';
import { useState, useEffect } from 'react';

export default function CategoryManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      const res = await fetch('/api/admin/content?file=categories.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // ✅ 确保 data 是数组
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('加载分类数据失败:', error);
      setCategories([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addCategory = async () => {
    if (!newName.trim()) return;
    setLoading(true);
    const newId = newName.toLowerCase().replace(/\s+/g, '_');
    // ✅ 确保 categories 是数组再取 length
    const currentCategories = Array.isArray(categories) ? categories : [];
    const newCat = { id: newId, name: newName.trim(), order: currentCategories.length + 1 };
    const updated = [...currentCategories, newCat];
    
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: 'categories.json', data: updated }),
      });
      setCategories(updated);
      setNewName('');
      alert('✅ 分类已添加');
    } catch (error) {
      alert('❌ 添加失败');
      console.error(error);
    }
    setLoading(false);
  };

  const deleteCategory = async (id: string) => {
    if (!confirm('确定要删除吗？')) return;
    const currentCategories = Array.isArray(categories) ? categories : [];
    const updated = currentCategories.filter(c => c.id !== id);
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: 'categories.json', data: updated }),
      });
      setCategories(updated);
      alert('✅ 已删除');
    } catch (error) {
      alert('❌ 删除失败');
      console.error(error);
    }
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
        {Array.isArray(categories) && categories.map(cat => (
          <li key={cat.id} className="flex justify-between items-center py-2">
            <span>{cat.name} (ID: {cat.id})</span>
            <button onClick={() => deleteCategory(cat.id)} className="text-red-500 text-sm">删除</button>
          </li>
        ))}
        {(!Array.isArray(categories) || categories.length === 0) && (
          <li className="py-2 text-gray-400 text-sm">暂无分类</li>
        )}
      </ul>
    </div>
  );
}