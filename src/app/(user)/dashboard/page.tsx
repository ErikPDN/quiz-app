import { db } from "@/db"
import { eq } from "drizzle-orm"
import { quizzes } from "@/db/schema"
import { auth } from "@/auth"
import { QuizzesTable, Quizz } from "./quizzesTable"
import { getUserMetrics } from "../../actions/getUserMetrics"

const page = async () => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return (
      <p>User not found!</p>
    )
  }

  const userData = await getUserMetrics()

  const userQuizzes: Quizz[] = await db.query.quizzes.findMany({
    where: eq(quizzes.userId, userId)
  })

  return (
    <QuizzesTable quizzes={userQuizzes} />
  )
}

export default page;
