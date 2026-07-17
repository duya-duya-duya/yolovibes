'use client';
export default function Intro({ content }: { content: any }) {
  if (!content) {
    return <div className="text-center p-10 text-gray-500">暂无介绍信息</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
        关于我
      </h2>
      <div className="glass-card p-6 rounded-2xl space-y-4">
        <p><strong>自我介绍：</strong>{content.selfIntro}</p>
        <p><strong>设计风格：</strong>{content.designIntro}</p>
        <p><strong>约稿计划：</strong>{content.commissionPlan}</p>
        <p><strong>档期状态：</strong>{content.schedule}</p>
      </div>
    </div>
  );
}