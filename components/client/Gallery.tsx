'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Gallery({ categories, works }: { categories: any[], works: any }) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentWorks = works[activeCategory] || [];
  const currentItem = currentWorks[currentIndex] || { name: '暂无作品', image: '' };

  const switchCategory = (id: string) => {
    setActiveCategory(id);
    setCurrentIndex(0);
  };

  const next = () => {
    if (currentWorks.length === 0) return;
    setCurrentIndex((i) => (i + 1) % currentWorks.length);
  };
  const prev = () => {
    if (currentWorks.length === 0) return;
    setCurrentIndex((i) => (i - 1 + currentWorks.length) % currentWorks.length);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* 分类导航 */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => switchCategory(cat.id)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-pink-400 to-purple-400 text-white shadow-lg'
                : 'bg-white/60 backdrop-blur-sm text-gray-600 hover:bg-white/90'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 展示区域：背景虚化 + 前景清晰图片 */}
      <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-100 shadow-xl">
        {/* 背景层：当前图片虚化 */}
        {currentItem.image && (
          <div
            className="absolute inset-0 bg-cover bg-center scale-110 blur-2xl opacity-60"
            style={{ backgroundImage: `url(${currentItem.image})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/10" />

        {/* 前景：清晰的图片（带滑动动画） */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id || 'empty'}
            className="relative w-full h-full flex items-center justify-center"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {currentItem.image ? (
              <img
                src={currentItem.image}
                alt={currentItem.name}
                className="max-h-full max-w-full object-contain drop-shadow-2xl"
                onClick={() => alert('查看大图（可扩展）')}
              />
            ) : (
              <div className="text-white text-xl font-light">暂无作品</div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* 左右点击区域（翻页） */}
        {currentWorks.length > 1 && (
          <>
            <div className="absolute inset-y-0 left-0 w-1/4 cursor-pointer z-10" onClick={prev} />
            <div className="absolute inset-y-0 right-0 w-1/4 cursor-pointer z-10" onClick={next} />
          </>
        )}

        {/* 手机端底部名称浮层 */}
        {currentItem.name && currentItem.name !== '暂无作品' && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium">
            {currentItem.name}
          </div>
        )}
      </div>

      {/* 电脑端：缩略图列表 */}
      <div className="hidden lg:flex flex-wrap gap-2 justify-center mt-4">
        {currentWorks.map((item: any, idx: number) => (
          <button
            key={item.id}
            onClick={() => setCurrentIndex(idx)}
            className={`px-3 py-1 rounded-lg text-xs transition ${
              idx === currentIndex
                ? 'bg-pink-500 text-white'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
}