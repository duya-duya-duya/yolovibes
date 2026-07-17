'use client';
import { useState, useEffect } from 'react';

export default function IntroEditor() {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/admin/content?file=content.json')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        // ✅ 确保 data 是对象
        setContent(data || {});
      })
      .catch(err => {
        console.error('加载内容失败:', err);
        setContent({});
      });
  }, []);

  const save = async () => {
    setLoading(true);
    try {
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: 'content.json', data: content }),
      });
      alert('✅ 保存成功');
    } catch (error) {
      alert('❌ 保存失败');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">编辑介绍页</h2>
      <div>
        <label className="block">自我介绍</label>
        <textarea 
          className="w-full border p-2 rounded" 
          rows={3} 
          value={content.selfIntro || ''} 
          onChange={(e) => setContent({...content, selfIntro: e.target.value})} 
        />
      </div>
      <div>
        <label className="block">设计介绍</label>
        <textarea 
          className="w-full border p-2 rounded" 
          rows={3} 
          value={content.designIntro || ''} 
          onChange={(e) => setContent({...content, designIntro: e.target.value})} 
        />
      </div>
      <div>
        <label className="block">约稿计划</label>
        <textarea 
          className="w-full border p-2 rounded" 
          rows={3} 
          value={content.commissionPlan || ''} 
          onChange={(e) => setContent({...content, commissionPlan: e.target.value})} 
        />
      </div>
      <div>
        <label className="block">当前档期</label>
        <input 
          className="w-full border p-2 rounded" 
          value={content.schedule || ''} 
          onChange={(e) => setContent({...content, schedule: e.target.value})} 
        />
      </div>
      <button onClick={save} className="bg-pink-500 text-white px-6 py-2 rounded" disabled={loading}>
        {loading ? '保存中...' : '保存'}
      </button>
    </div>
  );
}