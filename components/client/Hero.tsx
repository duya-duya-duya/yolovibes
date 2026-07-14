export default function Hero() {
  return (
    <div className="text-center space-y-6">
      <div className="inline-block p-4 rounded-full bg-white/30 backdrop-blur-sm">
        <h1 className="text-6xl md:text-8xl font-extrabold text-gradient">
          YoloVibes
        </h1>
      </div>
      <p className="text-2xl md:text-3xl text-gray-600 font-light tracking-wide">
        设计小屋
      </p>
      <p className="mt-10 text-gray-400 animate-bounce-slow text-sm">
        ↓ 下滑探索
      </p>
    </div>
  );
}