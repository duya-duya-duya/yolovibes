'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CommissionButtons() {
  const [categories, setCategories] = useState<any[]>([]);
  const [works, setWorks] = useState<any>({});

  useEffect(() => {
    Promise.all([
      fetch('/api/public/content?file=categories.json').then(r => r.json()),
      fetch('/api/public/content?file=works.json').then(r => r.json())
    ]).then(([cats, wks]) => {
      setCategories(cats || []);
      setWorks(wks || {});
    });
  }, []);

  // 获取每个分类的第一张作品图片（作为背景）
  const getFirstImage = (catId: string) => {
    const items = works[catId] || [];
    return items.length > 0 ? items[0].image : null;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-10">
        选择约稿类型
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {categories.map(cat => {
          const bgImage = getFirstImage(cat.id);
          return (
            <Link key={cat.id} href={`/commission/${cat.id}`} className="block w-36 sm:w-44">
              <div
                className="relative w-full aspect-[1/1.8] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
              >
                {/* 背景图片：虚化 */}
                {bgImage ? (
                  <div
                    className="absolute inset-0 bg-cover bg-center scale-110 blur-md"
                    style={{ backgroundImage: `url(${bgImage})` }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
                )}
                {/* 半透明遮罩 */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition duration-300" />

                {/* 按钮文字 */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white p-4 text-center">
                  <span className="text-xl font-bold drop-shadow-lg">{cat.name}</span>
                  <span className="text-xs opacity-80 mt-1">点击进入</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}