import type { StructureResolver } from "sanity/structure";

const singlePageDocumnents = [
  {
    title: "Home Page",
    id: "homePage",
  },
  {
    title: "Contact Page",
    id: "contactPage",
  },
  {
    title: "About Page",
    id: "aboutPage",
  },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      ...singlePageDocumnents.map((item) =>
        S.listItem()
          .title(item.title)
          .child(S.document().schemaType(item.id).documentId(item.id))
      ),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !singlePageDocumnents.some((doc) => doc.id === listItem.getId())
      ),
    ]);
