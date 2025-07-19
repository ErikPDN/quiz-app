import { db } from "@/db"
import { questions, quizzes } from "@/db/schema"
import { eq } from "drizzle-orm"
import QuizzQuestions from "../QuizzQuestions"

const page = async ({ params }: {
  params: Promise<{
    quizzId: string
  }>
}) => {
  const { quizzId } = await params

  const quizz = await db.query.quizzes.findFirst({
    where: eq(quizzes.id, parseInt(quizzId, 10)),
    with: {
      questions: {
        with: {
          answers: true
        }
      }
    }
  })

  if (!quizzId || !quizz || quizz.questions.length <= 0) {
    return <div>Quizz not found</div>
  }

  return (
    <div>
      <QuizzQuestions quizz={quizz} />
    </div>
  )
}

export default page;
