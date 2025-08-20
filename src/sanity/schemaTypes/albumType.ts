import { defineType } from "sanity";

export const albumType = defineType({
  name: "album",
  title: "Album",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "description", type: "text" },
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
    },
  ],
});
