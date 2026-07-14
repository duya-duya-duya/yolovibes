// components/admin/WorksManager.tsx
'use client';
import { useState, useEffect } from 'react';

export default function WorksManager() {
  const [categories, setCategories] = useState<any[]>([]);
  const [works, setWorks] = useState<any>({});
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState('');
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      const [cats, wks] = await Promise.all([
        fetch('/api/admin/content?file=categories.json').then(r => r.json()),
        fetch('/api/admin/content?file=works.json').then(r => r.json()),
      ]);
      setCategories(cats || []);
      setWorks(wks || {});
      if (cats && cats.length > 0 && !selectedCategory) {
        setSelectedCategory(cats[0].id);
      }
    } catch (error) {
      console.error('加载数据失败:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addWork = async () => {
    if (!newName.trim() || !newImage.trim()) {
      alert('请填写作品名称和图片路径');
      return;
    }
    setLoading(true);
    const current = works[selectedCategory] || [];
    const newId = `${selectedCategory}_${Date.now()}`;
    const newWork = { id: newId, name: newName.trim(), image: newImage.trim() };
    const updated = { ...works, [selectedCategory]: [...current, newWork] };

    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: 'works.json', data: updated }),
      });
      setWorks(updated);
      setNewName('');
      setNewImage('');
      alert('✅ 作品已添加');
    } catch (error) {
      alert('❌ 添加失败，请检查控制台错误');
      console.error(error);
    }
    setLoading(false);
  };

  const deleteWork = async (categoryId: string, workId: string) => {
    if (!confirm('确定要删除这个作品吗？')) return;
    const current = works[categoryId] || [];
    const updatedList = current.filter((w: any) => w.id !== workId);
    const updated = { ...works, [categoryId]: updatedList };

    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: 'works.json', data: updated }),
      });
      setWorks(updated);
    } catch (error) {
      alert('❌ 删除失败');
      console.error(error);
    }
  };

  // 当选中分类变化时，重置当前作品列表（防止残留）
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
  };

  const currentWorks = works[selectedCategory] || [];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-800">📁 作品管理</h2>

      {/* 分类切换 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              selectedCategory === cat.id
                ? 'bg-pink-500 text-white shadow'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {cat.name}
          </button>
        ))}
        {categories.length === 0 && (
          <p className="text-gray-400 text-sm">暂无分类，请先在「分类管理」中添加</p>
        )}
      </div>

      {/* 当前分类下的作品列表 */}
      {selectedCategory && (
        <>
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
            <h3 className="font-semibold text-gray-700">
              ➕ 新增作品（分类：{categories.find(c => c.id === selectedCategory)?.name || selectedCategory}）
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
                placeholder="作品名称（如：春日物语）"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-pink-400 focus:outline-none"
                placeholder="图片路径（如 /images/postcards/spring.jpg）"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
              />
            </div>
            <button
              onClick={addWork}
              disabled={loading}
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
            >
              {loading ? '添加中...' : '➕ 添加作品'}
            </button>
          </div>

          {/* 作品列表 */}
          <ul className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
            {currentWorks.length === 0 ? (
              <li className="p-4 text-center text-gray-400 text-sm">该分类下暂无作品</li>
            ) : (
              currentWorks.map((item: any) => (
                <li
                  key={`${selectedCategory}_${item.id}`}  // ✅ 组合 key，避免重复
                  className="flex justify-between items-center p-4 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      {item.image}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteWork(selectedCategory, item.id)}
                    className="text-red-400 hover:text-red-600 text-sm font-medium transition"
                  >
                    删除
                  </button>
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </div>
  );
}