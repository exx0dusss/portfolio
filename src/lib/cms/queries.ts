export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  name, seoTitle, seoDescription, eyebrow, headline, intro, about, contactHeading, contactIntro, availability, location, email,
  portrait{asset->{_id, url, metadata{dimensions}}},
  resume{asset->{_id, url, originalFilename}},
  stack[]{label, value},
  socials[]{label, url}
}`;

export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  title, "slug": slug.current, eyebrow, heading, lead
}`;

export const projectsQuery = `*[_type == "project"] | order(order asc){
  _id, title, "slug": slug.current, order, icon, year, kind, tagline, description,
  role, type, opennessTone, opennessLabel, tags, githubUrl,
  downloads[]{label, file{asset->{_id, url, originalFilename}}},
  cover{asset->{_id, url, metadata{dimensions}}},
  features[]{label, title, description},
  architecture[]{title, nodes[]{title, sub, accent}},
  overview, buildNotes,
  gallery[]{asset->{_id, url, metadata{dimensions}}}
}`;

export const experiencesQuery = `*[_type == "experience"] | order(order asc, year desc){
  _id, year, where, role, company, description, tags
}`;

export const educationQuery = `*[_type == "education"] | order(order asc, year desc){
  _id, year, where, role, company, description
}`;

export const certificatesQuery = `*[_type == "certificate"] | order(order asc, title asc){
  _id, title, issuer, badgeIcon, href,
  file{asset->{_id, url, originalFilename}},
  image{asset->{_id, url, metadata{dimensions}}}
}`;

export const booksQuery = `*[_type == "book"] | order(order asc, title asc){
  _id, title, author, sourceLabel, href,
  cover{asset->{_id, url, metadata{dimensions}}}
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, order, icon, year, kind, tagline, description,
  role, type, opennessTone, opennessLabel, tags, githubUrl,
  downloads[]{label, file{asset->{_id, url, originalFilename}}},
  cover{asset->{_id, url, metadata{dimensions}}},
  features[]{label, title, description},
  architecture[]{title, nodes[]{title, sub, accent}},
  overview, buildNotes,
  gallery[]{asset->{_id, url, metadata{dimensions}}}
}`;
