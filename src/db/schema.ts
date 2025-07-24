import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";

export const users = pgTable("user", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable("account", {
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccountType>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
},
  (account) => ({
    compoundKey: primaryKey({ columns: [account.provider, account.providerAccountId] }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId").notNull().references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable("verificationToken", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
},
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  name: text("name"),
  description: text("description"),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  questionText: text("question_text"),
  quizzId: integer("quizz_id").references(() => quizzes.id, { onDelete: "cascade" }),
});

export const questionAnswers = pgTable("answers", {
  id: serial("id").primaryKey(),
  questionId: integer("question_id").references(() => questions.id, { onDelete: "cascade" }),
  answerText: text("answer_text"),
  isCorrect: boolean("is_correct"),
});

export const quizzSubmissions = pgTable("quizz_subimissions", {
  id: serial("id").primaryKey(),
  quizzId: integer("quizz_id"),
  score: integer("score"),
  createdAt: timestamp("created_at").defaultNow().notNull()
})

export const quizzSubmissionsRelations = relations(quizzSubmissions, ({ one, many }) => ({
  quizz: one(quizzes, {
    fields: [quizzSubmissions.quizzId],
    references: [quizzes.id],
  })
}))

export const usersRelations = relations(users, ({ many }) => ({
  quizzes: many(quizzes),
  accounts: many(accounts),
}));

export const quizzesRelations = relations(quizzes, ({ one, many }) => ({
  user: one(users, { fields: [quizzes.userId], references: [users.id] }),
  questions: many(questions),
  submissions: many(quizzSubmissions)
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  quizz: one(quizzes, { fields: [questions.quizzId], references: [quizzes.id] }),
  answers: many(questionAnswers),
}));

export const questionAnswersRelations = relations(questionAnswers, ({ one }) => ({
  question: one(questions, { fields: [questionAnswers.questionId], references: [questions.id] }),
}));
