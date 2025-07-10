"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgessBar from "@/components/progessBar";
import { ChevronLeft, X } from "lucide-react";

const questions = [
  {
    questionText: "What is React?",
    answers: [
      {
        answersText: "A JavaScript library for building user interfaces",
        isCorrect: true,
        id: 1
      },
      {
        answersText: "A Frontend framework for building web applications",
        isCorrect: false,
        id: 2
      },
      {
        answersText: "A back-end framework",
        isCorrect: false,
        id: 3
      },
      {
        answersText: "A database",
        isCorrect: false,
        id: 4
      }
    ]
  },
  {
    questionText: "What is the virtual DOM?",
    answers: [
      {
        answersText: "A lightweight copy of the real DOM",
        isCorrect: true,
        id: 1
      },
      {
        answersText: "A way to store data in React",
        isCorrect: false,
        id: 2
      },
      {
        answersText: "A way to manage state in React",
        isCorrect: false,
        id: 3
      },
      {
        answersText: "A way to handle events in React",
        isCorrect: false,
        id: 4
      }
    ]
  },
  {
    questionText: "What is JSX?",
    answers: [
      {
        answersText: "A syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files",
        isCorrect: true,
        id: 1
      },
      {
        answersText: "A way to style React components",
        isCorrect: false,
        id: 2
      },
      {
        answersText: "A way to manage state in React",
        isCorrect: false,
        id: 3
      },
      {
        answersText: "A way to handle events in React",
        isCorrect: false,
        id: 4
      }
    ]
  }
]

export default function Home() {
  const [started, setStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="position-sticky top-0 z-10 shadow-md py-2 w-full">
        <header className="grid grid-cols-[auto, 1fr, auto] 
          grid-flow-col items-center justify-between py-2 gap-2">
          <Button size="icon" variant="outline">
            <ChevronLeft />
          </Button>
          <Button size="icon" variant="outline">
            <X />
          </Button>
          <ProgessBar value={((currentQuestion + 0) / questions.length) * 100} />
        </header>
      </div>
      <main className="flex justify-center flex-1 p-4">
        {!started ? <h1 className="text-3xl font-bold">Welcome to the quizz page</h1>
          : (
            <div>
              <h2 className="text-3xl font-bold">{questions[currentQuestion].questionText}</h2>
              <div className="grid grid-cols-1 gap-6 mt-6">
                {questions[currentQuestion].answers.map((answer) => (
                  <Button
                    key={answer.id}
                    size="lg"
                    variant="secondary"
                    onClick={() => { }}
                  >
                    {answer.answersText}
                  </Button>
                ))}
              </div>
            </div>
          )}
      </main>
      <footer className="flex footer pb-9 px-6 relative mb-0 justify-end">
        <Button onClick={handleNext}>{!started ? 'Start' : 'Next'}</Button>
      </footer>
    </div>
  );
}
