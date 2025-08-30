import { defineType } from "sanity";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    { name: "description", type: "text" },
    {
      name: "mainImage",
      title: "Huvudbild för Kontakt sidan",
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "caption", type: "string" },
        { name: "alt", type: "string" },
      ],
    },
  ],
});
