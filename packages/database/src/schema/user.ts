import { InferSelectModel } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

import { baseTable } from "./base-table";

export const userTable = pgTable("user", {
  ...baseTable,
  name: varchar("name").notNull(),
});

export type User = InferSelectModel<typeof userTable>;
