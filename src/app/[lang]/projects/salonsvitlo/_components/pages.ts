import type { ProjectTab } from "../../_components/project-tabs";
import type { Shot, ShotGroup } from "../../_components/gallery";

import groups from "./shots.json";

const PATH = "/projects/salonsvitlo";

/** What the case study's two pages share: their tabs, colours and screenshots. */
export const SALON_TABS: ProjectTab[] = [
  { label: "Case study", href: PATH },
  { label: "Gallery", href: `${PATH}/gallery` },
];
export const SALON_GALLERY_PATH = `${PATH}/gallery`;

/** the storefront's mustard glowing over white and the page's warm grey;
 *  graphite for dark */
export const SALON_BANNER = {
  colors: {
    light: ["#e9c60b", "#f8ecaa", "#ebeae8", "#ffffff"],
    dark: ["#a38700", "#3a3632", "#2b2825", "#0c0c0c"],
  },
  pattern: { offsetX: 0.05, offsetY: -0.2, rotation: 10 },
};

/** accents in the storefront's mustard #e9c60b: a deeper #a38700 for shapes
 *  (3.5:1 on white) and its own #7a6500 for text (5.7:1); the mustard itself
 *  and its hover #fdda1f on dark */
export const SALON_ACCENTS = {
  light: { accent: "#a38700", ink: "#7a6500" },
  dark: { accent: "#e9c60b", ink: "#fdda1f" },
};

/** The homepage, also the first lightbox slide on the case study. */
export const SALON_COVER: Shot = {
  title: "Homepage",
  thumb: "/projects/salonsvitlo/hero.webp",
  src: "/projects/salonsvitlo/hero.webp",
  alt: "The SalonSvitlo storefront homepage in a Safari window: a category bar, three promotional banners and a shelf of best-selling lamps labelled “Хіт”",
};

/** The gallery's shots, grouped; built by `pnpm screens gallery` from shots.json.
 *  A shot marked `hold` there is kept back until the storefront is live: it is
 *  neither shown nor built into /public. */
export const SALON_GROUPS: ShotGroup[] = groups
  .map((group) => ({
    label: group.group,
    shots: group.shots
      .filter((shot) => !("hold" in shot && shot.hold))
      .map((shot) => ({
        title: shot.title,
        thumb: `/projects/salonsvitlo/gallery/thumb/${shot.id}.webp`,
        src: `/projects/salonsvitlo/gallery/full/${shot.id}.webp`,
        alt: shot.alt,
      })),
  }))
  .filter((group) => group.shots.length > 0);

export const SALON_SHOTS: Shot[] = SALON_GROUPS.flatMap((group) => group.shots);

/** The lightbox's set on the case study: the cover, then every shot. */
export const SALON_SLIDES: Shot[] = [SALON_COVER, ...SALON_SHOTS];

/** The shots the case study shows before its "+N" card, one per theme. */
export const SALON_PREVIEW: Shot[] = [
  "mega-menu",
  "product",
  "filters",
  "mini-cart",
  "checkout-delivery",
  "search-suggest",
  "phone-home",
  "phone-cart",
].map((id) => {
  const shot = SALON_SHOTS.find((s) => s.src.endsWith(`/${id}.webp`));
  if (!shot) throw new Error(`SALON_PREVIEW: no gallery shot “${id}”`);
  return shot;
});

/** The screenshot faded out behind the "+N" card: the first one it hides. */
export const SALON_MORE_SHOT: Shot = SALON_SHOTS.find((s) => !SALON_PREVIEW.includes(s))!;
