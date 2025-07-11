"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";
import { ResultCard } from "./ResultCard";
import QuizzSubmission from "./QuizzSubmission";

type Answer = {
  answersText: string;
  isCorrect: boolean;
  id: number;
};

type Question = {
  questionText: string;
  answers: Answer[];
};

const questions: Question[] = [
  {
    questionText: "What is React?",
    answers: [
      {
        answersText: "A JavaScript library for building user interfaces",
        isCorrect: true,
        id: 1,
      },
      {
        answersText: "A Frontend framework for building web applications",
        isCorrect: false,
        id: 2,
      },
      {
        answersText: "A back-end framework",
        isCorrect: false,
        id: 3,
      },
      {
        answersText: "A database",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "What is the virtual DOM?",
    answers: [
      {
        answersText: "A lightweight copy of the real DOM",
        isCorrect: true,
        id: 1,
      },
      {
        answersText: "A way to store data in React",
        isCorrect: false,
        id: 2,
      },
      {
        answersText: "A way to manage state in React",
        isCorrect: false,
        id: 3,
      },
      {
        answersText: "A way to handle events in React",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "What is JSX?",
    answers: [
      {
        answersText:
          "A syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files",
        isCorrect: true,
        id: 1,
      },
      {
        answersText: "A way to style React components",
        isCorrect: false,
        id: 2,
      },
      {
        answersText: "A way to manage state in React",
        isCorrect: false,
        id: 3,
      },
      {
        answersText: "A way to handle events in React",
        isCorrect: false,
        id: 4,
      },
    ],
  },
];

export default function QuizPage() {
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false)

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

    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (answer: Answer) => {
    setSelectedAnswer(answer.id);

    const isCurrCorrect = answer.isCorrect;
    if (isCurrCorrect) {
      setScore(score + 1);
    }

    setIsCorrect(isCurrCorrect);
  };

  const progress = started
    ? ((currentQuestion + 1) / questions.length) * 100
    : 0;

  const scorePercentage = Math.round((score / questions.length) * 100)

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
          <Button size="icon" variant="outline">
            <ChevronLeft />
          </Button>

          <div className="w-full">
            {started && <ProgressBar value={progress} />}
          </div>

          <Button size="icon" variant="outline">
            <X />
          </Button>
        </header>
      </div>
      <main className="flex flex-1 justify-center p-4">
        {!started ? (
          <div className="flex flex-col items-center justify-center text-center">
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
                      onClick={() => handleAnswer(answer)}
                    >
                      <p>
                        {answer.answersText}
                      </p>
                    </Button>
                  )
                })
              }
            </div>
            <ResultCard
              isCorrect={isCorrect}
              correctAnswer={questions[currentQuestion].answers.find(answer => answer.isCorrect === true)?.answersText ?? ''}
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
