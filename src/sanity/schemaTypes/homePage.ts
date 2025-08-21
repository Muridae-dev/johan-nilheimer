import { defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    {
      name: "homePagePhoto",
      title: "Huvudbild för hemsidan",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "caption", type: "string" },
        { name: "alt", type: "string" },
      ],
    },
  ],
});
