import { type SchemaTypeDefinition } from "sanity";
import { albumType } from "./albumType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [albumType],
};
