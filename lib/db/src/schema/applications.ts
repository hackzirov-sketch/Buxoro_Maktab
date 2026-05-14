import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  childFirstName: text("child_first_name").notNull(),
  childLastName: text("child_last_name").notNull(),
  currentSchool: text("current_school").notNull(),
  graduatedClass: text("graduated_class").notNull(),
  applyingClass: text("applying_class").notNull(),
  region: text("region").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
