/**
 * People a case study credits, for PersonLink: who they are, in a line, and
 * the public profile the link opens. Taken from their own institutions'
 * pages, and so are the photos: 96px squares in public/people/, cropped to
 * the face from the profile each link opens or the person's university page.
 */
export interface Person {
  name: string;
  /** Position, as their institution states it. */
  role: string;
  affiliation: string;
  /** One or two sentences: their field, and their part in the work. */
  about: string;
  href: string;
  /** A square portrait in public/people/; the card shows initials without one. */
  photo?: string;
}

export const PEOPLE = {
  "piotr-gago": {
    name: "Piotr Gago",
    role: "Researcher, XR Center",
    affiliation: "Polish-Japanese Academy of Information Technology",
    about:
      "Software engineer, systems architect and university teacher: databases, software architecture, AI and data science. Supervised Giga Psych.",
    href: "https://scholar.google.com/citations?user=l-bDBpAAAAAJ",
    photo: "/people/piotr-gago.webp",
  },
  "wieslaw-kopec": {
    name: "Wiesław Kopeć",
    role: "Head of the XR Center and XR Department",
    affiliation: "Polish-Japanese Academy of Information Technology",
    about:
      "Computer scientist and associate professor in human-computer interaction. Giga Psych began as a project of his XR Center.",
    href: "https://scholar.google.com/citations?user=aFYddKYAAAAJ",
    photo: "/people/wieslaw-kopec.webp",
  },
  "jacek-buczny": {
    name: "Jacek Buczny",
    role: "Assistant professor, organizational psychology",
    affiliation: "Vrije Universiteit Amsterdam",
    about:
      "Studies self-regulation and personality; associate editor of Personality and Individual Differences.",
    href: "https://vu.nl/en/research/scientists/jacek-buczny",
    photo: "/people/jacek-buczny.webp",
  },
  "antonis-koutsoumpis": {
    name: "Antonis Koutsoumpis",
    role: "Postdoctoral researcher, social psychology",
    affiliation: "Tilburg University",
    about:
      "PhD at Vrije Universiteit Amsterdam on assessing personality from voice, video and text. Lead researcher on Giga Psych.",
    href: "https://research.tilburguniversity.edu/en/persons/antonios-koutsoumpis/",
    // Tilburg's portal has no photo; this one is from his VU Amsterdam profile
    photo: "/people/antonis-koutsoumpis.webp",
  },
} satisfies Record<string, Person>;

export type PersonId = keyof typeof PEOPLE;

/** "Jacek Buczny" → "JB" */
export const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("");
