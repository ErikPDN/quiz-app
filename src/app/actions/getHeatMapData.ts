import { quizzes, questions, quizzSubmissions } from "@/db/schema"
import { auth } from "@/auth"
import { db } from "@/db"
import { count, eq, avg, sql } from "drizzle-orm"

export const getHeatMapData = async () => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return []
  }

  const data = await db
    .select({
      createdAt: quizzSubmissions.createdAt,
      count: sql<number>`cast(count(${quizzSubmissions.id}) as int)`
    })
    .from(quizzSubmissions)
    .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
    .where(eq(quizzes.userId, userId))
    .groupBy(quizzSubmissions.createdAt)

  return data
}
