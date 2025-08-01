import { db } from "@/db"
import { eq } from "drizzle-orm"
import { quizzes } from "@/db/schema"
import { auth } from "@/auth"
import { QuizzesTable, Quizz } from "./quizzesTable"
import { getUserMetrics } from "../../actions/getUserMetrics"
import { MetricCard } from "./metricCard"
import { getHeatMapData } from "@/app/actions/getHeatMapData"
import SubmissionsHeatMap from "./heatMap"
import { SubscribeBtn } from "../billing/SubscribeBtn"
import { PRICE_ID } from "@/lib/utils"

const Page = async () => {
  const session = await auth()
  const userId = session?.user?.id

  if (!userId) {
    return <p>User not found!</p>
  }

  const [userData, userQuizzes] = await Promise.all([
    getUserMetrics(),
    db.query.quizzes.findMany({
      where: eq(quizzes.userId, userId),
    }),
  ])

  const heatMapData = await getHeatMapData()

  return (
    <div className="mt-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {userData.length > 0 &&
          userData.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
            />
          ))}
      </div>

      <div>
        {
          heatMapData ? <SubmissionsHeatMap data={heatMapData} /> : null
        }
      </div>
      <QuizzesTable quizzes={userQuizzes as Quizz[]} />
      <SubscribeBtn price={PRICE_ID} userId={userId} />
    </div>
  )
}

export default Page
