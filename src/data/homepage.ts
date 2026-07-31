export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export const homepageContent = {
  hero: {
    eyebrow: "lorem ipsum",
    title: "lorem ipsum dolor sit amet, consectetur adipiscing elit",
    subtitle:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  } satisfies HeroContent,
};
