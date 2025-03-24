export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "মূলপাতা",
      href: "/",
    },
    {
      label: "কোর্সসমূহ",
      href: "/courses",
    },
    {
      label: "আমাদের সম্পর্কে",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "লগইন",
      href: "/login",
    },
    {
      label: "কোর্সসমূহ",
      href: "/courses",
    },
    {
      label: "আমাদের সম্পর্কে",
      href: "/about",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
