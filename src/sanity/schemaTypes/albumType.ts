import { defineType } from "sanity";
import { ALBUM_QUERY_SLUGResult } from "../types";

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

export type AlbumPhoto = NonNullable<
  NonNullable<ALBUM_QUERY_SLUGResult>["photos"]
>[number];
