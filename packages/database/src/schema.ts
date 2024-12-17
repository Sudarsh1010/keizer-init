import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  text: text("text"),
  authorId: integer("author_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  postId: integer("post_id")
    .references(() => posts.id, { onDelete: "cascade" })
    .notNull(),
});
