import { type SchemaTypeDefinition } from "sanity";
import { upcomingEvent } from "./upcomingEvent";
import { pastEvent } from "./pastEvent";
import author from "./author";
import category from "./category";
import blockContent from "./blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [upcomingEvent, pastEvent, author, category, blockContent],
};
