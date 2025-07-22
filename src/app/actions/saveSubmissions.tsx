"use server"

import { db } from "@/db"
import { quizzSubmissions } from "@/db/schema"
import { auth } from "@/auth"
import { InferInsertModel, eq } from "drizzle-orm"

type Submisssion = InferInsertModel<typeof quizzSubmissions>;

export async function saveSubmission(sub: Submisssion) {
  const { score, quizzId } = sub;

  const newSubmission = await db
    .insert(quizzSubmissions)
    .values({
      score,
      quizzId
    }).returning({ insertedId: quizzSubmissions.id })

  const submisssionId = newSubmission[0].insertedId
  return submisssionId;
}
