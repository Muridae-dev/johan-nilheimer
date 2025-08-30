import { defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    { name: "description", type: "text" },
    {
      name: "mainImage",
      title: "Huvudbild för Om sidan",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "caption", type: "string" },
        { name: "alt", type: "string" },
      ],
    },
  ],
});
