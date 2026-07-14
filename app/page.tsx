import Hero from '@/components/client/Hero';
import Intro from '@/components/client/Intro';
import Gallery from '@/components/client/Gallery';
import CommissionButtons from '@/components/client/CommissionButtons';

export default function Home() {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth">
      <section id="hero" className="snap-start min-h-screen flex items-center justify-center">
        <Hero />
      </section>
      <section id="intro" className="snap-start min-h-screen flex items-center justify-center">
        <Intro />
      </section>
      <section id="gallery" className="snap-start min-h-screen flex items-center justify-center">
        <Gallery />
      </section>
      <section id="commission" className="snap-start min-h-screen flex items-center justify-center">
        <CommissionButtons />
      </section>
    </div>
  );
}