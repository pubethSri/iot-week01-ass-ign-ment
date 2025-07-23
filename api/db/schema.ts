import { relations } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

export const students = t.pgTable("students", {
  stid: t.integer("stid").primaryKey(),

  name: t.varchar("name", { length: 255 }).notNull(),
  surname: t.varchar("surname", { length: 255 }).notNull(),

  birthday: t.date("birthday").notNull(),  // changed to date only

  gender: t.varchar("gender", { length: 50 }).notNull(),
});