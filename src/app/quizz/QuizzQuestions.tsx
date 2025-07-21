"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";
import { ResultCard } from "./ResultCard";
import QuizzSubmission from "./QuizzSubmission";
import { InferSelectModel } from "drizzle-orm";
import { questionAnswers, questions as DbQuestions, quizzes } from "@/db/schema";
import { useRouter } from "next/navigation"

type Props = {
  quizz: Quizz
}

type Answer = InferSelectModel<typeof questionAnswers>;
type Question = InferSelectModel<typeof DbQuestions> & { answers: Answer[] };
type Quizz = InferSelectModel<typeof quizzes> & { questions: Question[] };
export default function QuizzQuestions(props: Props) {
  const { questions } = props.quizz
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; answerId: number }[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false)
  const router = useRouter()

  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSubmitted(true)
      return
    }

    setIsCorrect(null);
  };

  const handleAnswer = (answer: Answer, questionId: number) => {
    const setUserAnswersArr = [...userAnswers, {
      answerId: answer.id,
      questionId
    }]
    setUserAnswers(setUserAnswersArr)

    const isCurrCorrect = answer.isCorrect;
    if (isCurrCorrect) {
      setScore(score + 1);
    }

    setIsCorrect(isCurrCorrect);
  };

  const handlePressPrev = () => {
    if (currentQuestion !== 0) {
      setCurrentQuestion(prevCurrQuestion => prevCurrQuestion - 1)
    }
  }

  const handlePressExit = () => {
    router.push(`/quizz/${props.quizz.id}`)
  }

  const progress = started
    ? ((currentQuestion) / questions.length) * 100
    : 0;

  const scorePercentage = Math.round((score / questions.length) * 100)
  const selectedAnswer: number | null | undefined = userAnswers.find(item => item.questionId === questions[currentQuestion].id)?.answerId

  if (submitted) {
    return (
      <QuizzSubmission
        score={score}
        scorePercentage={scorePercentage}
        totalQuestions={questions.length}
      />
    )
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full shadow-sm">
        <header className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-4">
          {started && (
            <>
              <Button onClick={handlePressPrev} size="icon" variant="outline">
                <ChevronLeft />
              </Button>

              <div className="w-full">
                <ProgressBar value={progress} />
              </div>

              <Button onClick={handlePressExit} size="icon" variant="outline">
                <X />
              </Button>
            </>
          )}
        </header>
      </div>
      <main className="flex flex-1 justify-center p-4">
        {!started ? (<div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold">Welcome to the quizz!</h1>
          <p className="text-muted-foreground mt-2">Test your knowledge.</p>
        </div>
        ) : (
          <div className="w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-center">
              {questions[currentQuestion].questionText}
            </h2>
            <div className="grid grid-cols-1 gap-4 mt-8">
              {
                questions[currentQuestion].answers.map(answer => {
                  const variant = selectedAnswer === answer.id ? (answer.isCorrect ? "neoCorrect" : "neoIncorrect") : "neoOutline"
                  return (
                    <Button
                      key={answer.id}
                      variant={variant}
                      size={"xl"}
                      onClick={() => handleAnswer(answer, questions[currentQuestion].id)}
                    >
                      <p>
                        {answer.answerText}
                      </p>
                    </Button>
                  )
                })
              }
            </div>
            <ResultCard
              isCorrect={isCorrect}
              correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answerText || ""}
            />
          </div>
        )}
      </main>
      <footer className="flex justify-center p-10">
        <div className="w-full max-w-sm">
          <Button variant="neo" onClick={handleNext} size="lg" className="w-full">
            {!started ? "Start" : (currentQuestion === questions.length - 1) ? "Submit" : "Next"}
          </Button>
        </div>
      </footer>
    </div>
  );
}
