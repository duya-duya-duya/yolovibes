'use client';
import { useEffect, useState } from 'react';

export default function Intro() {
  const [content, setContent] = useState<any>(null);
  useEffect(() => {
    fetch('/api/admin/content?file=content.json')
      .then(res => res.json())
      .then(setContent);
  }, []);

  if (!content) return <div className="text-center">加载中...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center">关于我</h2>
      <div className="glass-card p-8 rounded-2xl space-y-4 max-w-2xl mx-auto">
        <p><strong>自我介绍：</strong>{content.selfIntro}</p>
        <p><strong>设计风格：</strong>{content.designIntro}</p>
        <p><strong>约稿计划：</strong>{content.commissionPlan}</p>
        <p><strong>档期状态：</strong>{content.schedule}</p>
      </div>
    </div>
  );
}