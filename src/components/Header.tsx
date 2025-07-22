import Link from "next/link"
import { Brain, Plus, LogOut, User, Settings, LayoutDashboard, CreditCard } from "lucide-react"
import { auth, signOut } from "@/auth"
import { Button } from "./ui/button"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function SignOutAction() {
  return (
    <form action={async () => {
      'use server'
      await signOut()
    }} className="w-full">
      <button type="submit" className="flex w-full items-center text-left">
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sign Out</span>
      </button>
    </form>
  )
}

export const Header = async () => {
  const session = await auth()
  return (
    <header className="bg-black/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="mx-auto px-4">
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
              <div className="flex items-center space-x-5">
                <Link
                  href="/quizz/new"
                  className="group flex items-center space-x-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all duration-200 shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Quiz</span>
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      {session.user.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-60" align="end">
                    <DropdownMenuLabel className="flex flex-col">
                      <span>{session.user.name}</span>
                      <span className="text-sm text-muted-foreground font-normal">
                        {session.user.email}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/billing" className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <SignOutAction />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/api/auth/signin">
                  <Button
                    className="bg-white/90 text-gray-900 hover:bg-white hover:text-black font-medium px-6 py-2 transition-all duration-200 shadow-md"
                    variant="secondary"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            )
          }
        </nav>
      </div>
    </header>
  )
}
