import { HeroContent } from "@/data/homepage";

const Hero = ({ eyebrow, title, subtitle }: HeroContent) => (
  <section className="bg-zinc-950 px-4 py-16 text-center sm:px-6">
    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-400">
      {eyebrow}
    </p>
    <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
    <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">{subtitle}</p>
  </section>
);

export default Hero;
