import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { QUIZ_QUESTIONS } from "@/data/quiz";
import { QuizCard } from "@/components/QuizCard";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "O Quiz — Humano ou IA?" },
      {
        name: "description",
        content:
          "Seis campanhas publicitárias. Sua intuição contra a máquina. Você consegue distinguir o que foi criado por um publicitário do que nasceu de uma Inteligência Artificial?",
      },
      { property: "og:title", content: "O Quiz — Humano ou IA?" },
      {
        property: "og:description",
        content: "Seis campanhas publicitárias. Uma única pergunta a cada um.",
      },
    ],
  }),
  component: QuizPage,
});

function QuizPage() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  // Store every answer so the final score is only computed after the last question.
  const [answers, setAnswers] = useState<boolean[]>([]);

  const total = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[index];
  const progress = ((index + 1) / total) * 100;

  const handleNext = (correct: boolean) => {
    const nextAnswers = [...answers, correct];

    if (nextAnswers.length >= total) {
      const score = nextAnswers.filter(Boolean).length;
      navigate({ to: "/resultado", search: { s: score, t: total } });
      return;
    }

    setAnswers(nextAnswers);
    setIndex(index + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-12">
          <Link to="/" className="font-display text-sm tracking-[0.4em] uppercase text-foreground">
            Logo ou Nome do Projeto
          </Link>
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
        <div className="h-px w-full bg-border">
          <div
            className="h-px bg-foreground transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* key={question.id} forces QuizCard to remount between questions so its
          internal `choice` state resets — without it, the previous choice
          leaks in and the next question appears pre-answered. */}
      <QuizCard
        key={question.id}
        question={question}
        index={index}
        total={total}
        onNext={handleNext}
      />
    </main>
  );
}
