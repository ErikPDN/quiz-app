import { Header } from "../../components/Header"

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      {children}
    </div>
  )
}
