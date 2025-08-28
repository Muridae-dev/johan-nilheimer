import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== "homePage"
      ),
    ]);
