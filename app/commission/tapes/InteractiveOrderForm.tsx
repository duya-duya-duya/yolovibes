'use client';
import { useState, useEffect } from 'react';

export default function InteractiveOrderForm({ config, type }: { config: any, type: string }) {
  const [xiaohongshu, setXiaohongshu] = useState('');
  const [requirements, setRequirements] = useState('');

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

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-4">😕</div>
          <p>加载失败，请刷新重试</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 pb-32">
      <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
        📝 {config.categoryName} 定稿
      </h1>

      {/* 价格与时长 */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <p className="text-lg font-semibold">💰 参考价格：{config.price}</p>
        <p className="text-lg font-semibold">⏳ 预计完成：{config.duration}</p>
      </div>

      {/* 注意事项 */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-800">📋 约稿注意事项</h3>
        <div className="whitespace-pre-wrap text-sm text-gray-700 mt-2">
          {config.notes}
        </div>
      </div>

      {/* 本地备忘录 */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
        <p className="text-xs text-gray-400">✏️ 以下信息仅保存在你的浏览器中，方便沟通时参考</p>
        <input
          type="text"
          placeholder="你的小红书账号"
          className="w-full border p-3 rounded focus:ring-2 focus:ring-pink-400 outline-none"
          value={xiaohongshu}
          onChange={(e) => setXiaohongshu(e.target.value)}
        />
        <textarea
          placeholder="你的稿件要求（风格/尺寸/用途等）"
          rows={4}
          className="w-full border p-3 rounded focus:ring-2 focus:ring-pink-400 outline-none"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
        />
      </div>

      {/* 固定底部的联系按钮 */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg flex flex-col gap-3 lg:static lg:shadow-none lg:border-t-0 lg:flex-row">
        <button
          onClick={copyDesignerID}
          className="flex-1 bg-gray-200 py-3 rounded-lg font-medium hover:bg-gray-300 transition"
        >
          📋 复制设计师账号
        </button>
        <button
          onClick={openXiaohongshu}
          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition"
        >
          📱 打开小红书 联系我
        </button>
      </div>
    </div>
  );
}