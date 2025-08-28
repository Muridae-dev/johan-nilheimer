import { defineType } from "sanity";

export const albumType = defineType({
  name: "album",
  title: "Album",
  type: "document",
  fields: [
    { name: "title", type: "string", validation: (Rule) => Rule.required() },
    {
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    },
    { name: "description", type: "text" },
    {
      name: "albumImage",
      title: "Huvudbild för albumet",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "caption", type: "string" },
            { name: "alt", type: "string" },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
});
