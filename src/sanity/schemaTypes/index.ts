import { type SchemaTypeDefinition } from "sanity";
import { albumType } from "./albumType";
import { homePage } from "./homePage";
import { aboutPage } from "./aboutPage";
import { contactPage } from "./contactPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [albumType, homePage, aboutPage, contactPage],
};
