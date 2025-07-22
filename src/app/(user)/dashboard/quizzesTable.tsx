import { quizzes } from "@/db/schema"
import { InferSelectModel } from "drizzle-orm"
import Link from "next/link"

export type Quizz = InferSelectModel<typeof quizzes>;

type Props = {
  quizzes: Quizz[]
}

export const QuizzesTable = (props: Props) => {
  return (
    <div className="rounded-md mt-10 border border-zinc-800">
      <table className="w-full table-fixed">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="py-3 px-4 text-left text-sm font-medium text-zinc-400 w-1/3">Name</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-zinc-400">Description</th>
          </tr>
        </thead>
        <tbody>
          {
            props.quizzes.map((quizz: Quizz) =>
              <tr key={quizz.id} className="border-b border-zinc-800 hover:bg-zinc-900/50">
                <td className="py-3 px-4 align-middle">
                  <Link href={`/quizz/${quizz.id}`}>
                    <p className="font-medium text-blue-400 hover:underline">
                      {quizz.name}
                    </p>
                  </Link>
                </td>
                <td className="py-3 px-4 align-middle text-sm text-zinc-400">{quizz.description}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}
