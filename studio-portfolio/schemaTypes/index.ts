import { defineArrayMember, defineField, defineType } from "sanity";

const tagField = defineField({
  name: "tags",
  title: "Tags",
  type: "array",
  of: [defineArrayMember({ type: "string" })],
});

const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "order", type: "number", validation: (Rule) => Rule.required().integer() }),
    defineField({ name: "icon", type: "string", validation: (Rule) => Rule.max(2) }),
    defineField({ name: "year", type: "string" }),
    defineField({ name: "kind", type: "string" }),
    defineField({ name: "tagline", type: "text", rows: 3 }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "type", type: "string" }),
    defineField({
      name: "opennessTone",
      title: "Openness tone",
      type: "string",
      options: { list: ["open", "source", "client", "nda"] },
    }),
    defineField({ name: "opennessLabel", title: "Openness label", type: "string" }),
    tagField,
    defineField({ name: "cover", type: "image", options: { hotspot: true } }),
    defineField({ name: "githubUrl", title: "External project URL", type: "url" }),
    defineField({ name: "githubLabel", title: "External link label", type: "string" }),
    defineField({ name: "architectureIntro", type: "text", rows: 3 }),
    defineField({ name: "architectureNote", type: "string" }),
    defineField({ name: "noticeTitle", type: "string" }),
    defineField({ name: "noticeBody", type: "text", rows: 3 }),
    defineField({ name: "nextProjectName", type: "string" }),
    defineField({ name: "nextProjectSlug", type: "string" }),
    defineField({
      name: "downloads",
      title: "Downloadable files",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "file", type: "file", validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
    }),
    defineField({ name: "features", type: "array", of: [defineArrayMember({ type: "feature" })] }),
    defineField({ name: "architecture", type: "array", of: [defineArrayMember({ type: "architectureColumn" })] }),
    defineField({ name: "overview", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({ name: "buildNotes", title: "How it was built", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({
      name: "gallery",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "kind", media: "cover" },
  },
});

const feature = defineType({
  name: "feature",
  title: "Feature",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", type: "text", rows: 3 }),
  ],
});

const architectureColumn = defineType({
  name: "architectureColumn",
  title: "Architecture column",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "nodes",
      type: "array",
      of: [defineArrayMember({ type: "architectureNode" })],
    }),
  ],
});

const architectureNode = defineType({
  name: "architectureNode",
  title: "Architecture node",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "sub", type: "string" }),
    defineField({ name: "accent", type: "boolean" }),
  ],
});

const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "year", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "where", type: "string" }),
    defineField({ name: "role", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "company", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", type: "text", rows: 4 }),
    tagField,
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "role", subtitle: "company" } },
});

const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "year", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "where", type: "string" }),
    defineField({ name: "role", title: "Degree", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "company", title: "Institution", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "role", subtitle: "company" } },
});

const certificate = defineType({
  name: "certificate",
  title: "Certificate",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "issuer", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "badgeIcon", title: "Badge icon slug", type: "string" }),
    defineField({ name: "href", title: "Verification URL", type: "url" }),
    defineField({ name: "file", title: "Certificate file", type: "file" }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "issuer", media: "image" } },
});

const book = defineType({
  name: "book",
  title: "Book",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "author", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "sourceLabel", type: "string" }),
    defineField({ name: "href", type: "url", validation: (Rule) => Rule.required() }),
    defineField({ name: "cover", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "author", media: "cover" } },
});

const page = defineType({
  name: "page",
  title: "Page copy",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "heading", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "lead", type: "text", rows: 4 }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "seoTitle", title: "Browser title", type: "string" }),
    defineField({ name: "seoDescription", title: "Search description", type: "text", rows: 3 }),
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "headline", type: "string" }),
    defineField({ name: "intro", type: "text", rows: 5 }),
    defineField({ name: "about", type: "array", of: [defineArrayMember({ type: "block" })] }),
    defineField({ name: "contactHeading", type: "string" }),
    defineField({ name: "contactIntro", type: "text", rows: 4 }),
    defineField({ name: "availability", type: "string" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "email", type: "string", validation: (Rule) => Rule.email() }),
    defineField({ name: "portrait", type: "image", options: { hotspot: true } }),
    defineField({ name: "resume", type: "file" }),
    defineField({
      name: "stack",
      title: "Technology stack",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "value", type: "string", validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "url", type: "url", validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
    }),
  ],
});

export const schemaTypes = [
  siteSettings,
  page,
  project,
  feature,
  architectureColumn,
  architectureNode,
  experience,
  education,
  certificate,
  book,
];
