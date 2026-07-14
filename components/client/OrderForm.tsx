// components/client/OrderForm.tsx
'use client';
import { useState, useEffect } from 'react';

interface OrderFormProps {
  type: string;
}

export default function OrderForm({ type }: OrderFormProps) {
  const [config, setConfig] = useState<any>(null);
  const [xiaohongshu, setXiaohongshu] = useState('');
  const [requirements, setRequirements] = useState('');

  useEffect(() => {
    fetch(`/api/config?type=${type}`)
      .then(res => res.json())
      .then(setConfig);
  }, [type]);

  useEffect(() => {
    const saved = localStorage.getItem(`draft_${type}`);
    if (saved) {
      try {
        const { xhs, req } = JSON.parse(saved);
        setXiaohongshu(xhs || '');
        setRequirements(req || '');
      } catch (e) {}
    }
  }, [type]);

  useEffect(() => {
    localStorage.setItem(`draft_${type}`, JSON.stringify({ xhs: xiaohongshu, req: requirements }));
  }, [xiaohongshu, requirements, type]);

  const copyDesignerID = () => {
    const id = config?.designerXiaohongshu || 'YoloVibes_Design';
    navigator.clipboard.writeText(id);
    alert('已复制设计师小红书账号，请打开APP搜索私信！');
  };

  const openXiaohongshu = () => {
    const id = config?.designerXiaohongshu || 'YoloVibes_Design';
    window.location.href = `xiaohongshu://user?userId=${id}`;
    setTimeout(() => {
      alert('如果未能自动唤起，请复制账号手动搜索。');
    }, 2000);
  };

  if (!config) return <div>加载中...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <p className="text-lg font-semibold">💰 参考价格：{config.price}</p>
        <p className="text-lg font-semibold">⏳ 预计完成：{config.duration}</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-800">📋 约稿注意事项</h3>
        <div className="whitespace-pre-wrap text-sm text-gray-700 mt-2">{config.notes}</div>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <p className="text-xs text-gray-400">✏️ 以下信息仅保存在你的浏览器中，方便沟通时参考</p>
        <input
          type="text"
          placeholder="你的小红书账号"
          className="w-full border p-3 rounded"
          value={xiaohongshu}
          onChange={(e) => setXiaohongshu(e.target.value)}
        />
        <textarea
          placeholder="你的稿件要求（风格/尺寸/用途等）"
          rows={4}
          className="w-full border p-3 rounded"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3 lg:flex-row">
        <button onClick={copyDesignerID} className="flex-1 bg-gray-200 py-3 rounded-lg font-medium">📋 复制设计师账号</button>
        <button onClick={openXiaohongshu} className="flex-1 bg-red-500 text-white py-3 rounded-lg font-medium shadow-lg">📱 打开小红书 联系我</button>
      </div>
    </div>
  );
}