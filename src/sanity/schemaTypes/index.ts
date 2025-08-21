import { type SchemaTypeDefinition } from "sanity";
import { albumType } from "./albumType";
import { homePage } from "./homePage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [albumType, homePage],
};
