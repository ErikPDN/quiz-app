import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Alert variant="default" className="mt-10 max-w-md w-full p-6 shadow-lg rounded-lg">
        <AlertTitle className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
          Success
        </AlertTitle>
        <AlertDescription className="text-lg text-gray-700 dark:text-gray-300">
          Your account has been upgraded.
          <br />
          <Link
            href={"/dashboard"}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline mt-2"
          >
            Go to the dashboard
          </Link>
          {' '}to generate more quizzes.
        </AlertDescription>
      </Alert>
    </div>
  )
}

export default page;
