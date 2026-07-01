import { useState } from "react";
import type { QuizQuestion } from "@/data/quiz";

type Props = {
  question: QuizQuestion;
  index: number;
  total: number;
  onNext: (correct: boolean) => void;
};

/**
 * Renders a single quiz question. Local state (`choice`) is intentionally
 * kept inside this component. The parent MUST pass `key={question.id}` so
 * React remounts the card between questions and resets the choice — otherwise
 * subsequent questions would appear pre-answered.
 */
export function QuizCard({ question, index, total, onNext }: Props) {
  const [choice, setChoice] = useState<"human" | "ai" | null>(null);
  const revealed = choice !== null;
  const correct = choice === question.answer;
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-16 md:grid-cols-[5fr_4fr] md:gap-20 md:px-12">
      <div className="reveal-up">
        <div className="relative aspect-4/5 w-full overflow-hidden border border-border bg-card">
          {question.image && !imageFailed ? (
            <img
              src={question.image}
              alt={question.imagePrompt}
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {question.label}
                </div>
                <div className="mt-3 max-w-[16rem] text-xs italic text-muted-foreground">
                  {question.imagePrompt}
                </div>
              </div>
            </div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent" />
          <div className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.3em] text-foreground/60">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Pergunta {String(index + 1).padStart(2, "0")}
        </div>
        <h2 className="font-display mt-6 text-4xl font-light leading-[1.05] tracking-tight md:text-5xl">
          Quem você acha que criou esta campanha publicitária ?
        </h2>

        <div className="mt-10 flex flex-col gap-3">
          <ChoiceButton
            label="Criado por um Publicitário"
            disabled={revealed}
            state={revealed ? optionState("human", question.answer, choice) : "idle"}
            onClick={() => setChoice("human")}
          />
          <ChoiceButton
            label="Criado com Inteligência Artificial"
            disabled={revealed}
            state={revealed ? optionState("ai", question.answer, choice) : "idle"}
            onClick={() => setChoice("ai")}
          />
        </div>

        {revealed && (
          <div className="reveal-up mt-10 border-t border-border pt-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {correct ? "Você acertou" : "Não foi desta vez"}
            </div>
            <p className="font-display mt-4 text-2xl font-light leading-snug">
              {question.answer === "human"
                ? "Criado por um Publicitário."
                : "Criado com Inteligência Artificial."}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {question.explanation}
            </p>
            <button
              onClick={() => onNext(correct)}
              className="story-underline mt-10 self-start text-xs uppercase tracking-[0.3em] text-foreground"
            >
              {index + 1 === total ? "Ver resultado →" : "Próximo →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

type OptionState = "idle" | "correct" | "wrong" | "muted";

function optionState(
  option: "human" | "ai",
  answer: "human" | "ai",
  choice: "human" | "ai" | null,
): OptionState {
  if (option === answer) return "correct";
  if (option === choice && choice !== answer) return "wrong";
  return "muted";
}

function ChoiceButton({
  label,
  state,
  disabled,
  onClick,
}: {
  label: string;
  state: OptionState;
  disabled: boolean;
  onClick: () => void;
}) {
  const base =
    "group relative border px-6 py-5 text-left text-sm uppercase tracking-[0.2em] transition-all duration-500";
  const stateClass =
    state === "idle"
      ? "border-border text-foreground hover:bg-foreground hover:text-background"
      : state === "correct"
        ? "border-foreground bg-foreground text-background"
        : state === "wrong"
          ? "border-border text-muted-foreground line-through"
          : "border-border/40 text-muted-foreground/60";

  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${stateClass}`}>
      <span className="flex items-center justify-between gap-6">
        <span>{label}</span>
        <span className="text-[10px] tracking-[0.3em] opacity-60">
          {state === "correct" ? "↳ verdade" : state === "wrong" ? "↳ engano" : "→"}
        </span>
      </span>
    </button>
  );
}
