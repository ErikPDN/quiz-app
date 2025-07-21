import Link from "next/link"
import { Brain, Plus, Home } from "lucide-react"
import { auth, signOut } from "@/auth"
import { Button } from "./ui/button"

function SignOut() {
  return (
    <form action={async () => {
      'use server'
      await signOut()
    }}>
      <Button type="submit" variant={"ghost"}>Sign Out</Button>
    </form>
  )
}

export const Header = async () => {
  const session = await auth()

  return (
    <header className="bg-black/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link
            href="/quizz"
            className="flex items-center space-x-2 text-lg font-bold text-white transition-colors duration-200"
          >
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-neutral-100">
              QuizzMaster
            </span>
          </Link>

          {/* Navigation Links */}
          {
            session?.user ? (
              <div className="flex items-center space-x-3">
                <Link
                  href="/quizz/new"
                  className="group flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Quiz</span>
                </Link>

                <SignOut />
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href={"/api/auth/signin"}>
                  <Button
                    className="bg-white/90 text-gray-900 hover:bg-white hover:text-black font-medium px-6 py-2 transition-all duration-200 shadow-md"
                    variant="secondary"
                    type="submit"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            )
          }
        </nav>
      </div >
    </header >
  )
}
