import { homepageContent } from "@/data/homepage";
import { HeroContent } from "@/data/homepage";

export type HomepageData = {
  hero: HeroContent;
};

export const getHomepageData = (): HomepageData => ({
  hero: homepageContent.hero,
});
