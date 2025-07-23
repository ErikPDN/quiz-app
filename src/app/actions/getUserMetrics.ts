import { quizzes, questions, quizzSubmissions } from "@/db/schema"
import { auth } from "@/auth"
import { db } from "@/db"
import { count, eq, avg } from "drizzle-orm"

export const getUserMetrics = async () => {
  try {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
      return []
    }

    const [numQuizzes, numQuestions, numSubmissions, avgScore] =
      await Promise.all([
        db
          .select({ value: count() })
          .from(quizzes)
          .where(eq(quizzes.userId, userId)),

        db
          .select({ value: count() })
          .from(questions)
          .innerJoin(quizzes, eq(questions.quizzId, quizzes.id))
          .where(eq(quizzes.userId, userId)),

        db
          .select({ value: count() })
          .from(quizzSubmissions)
          .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
          .where(eq(quizzes.userId, userId)),

        db
          .select({ value: avg(quizzSubmissions.score) })
          .from(quizzSubmissions)
          .innerJoin(quizzes, eq(quizzSubmissions.quizzId, quizzes.id))
          .where(eq(quizzes.userId, userId)),
      ])

    return [
      {
        label: "Quizzes",
        value: numQuizzes[0]?.value ?? 0,
      },
      {
        label: "Questions",
        value: numQuestions[0]?.value ?? 0,
      },
      {
        label: "Submissions",
        value: numSubmissions[0]?.value ?? 0,
      },
      {
        label: "Average Score",
        value: avgScore[0]?.value
          ? parseFloat(Number(avgScore[0].value).toFixed(1))
          : 0,
      },
    ]
  } catch (error) {
    console.error("Error fetching user metrics:", error)
    return []
  }
}
