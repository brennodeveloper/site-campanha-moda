import { createFileRoute, Link } from "@tanstack/react-router";
import { RevealUp } from "@/components/RevealUp";

type Search = { s?: number; t?: number };

export const Route = createFileRoute("/resultado")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    s: search.s ? Number(search.s) : undefined,
    t: search.t ? Number(search.t) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Seu resultado · Moda em código" },
      {
        name: "description",
        content: "Seu olhar contra a máquina. Veja o que sua intuição revelou.",
      },
      { property: "og:title", content: "Seu resultado — Moda em código" },
      {
        property: "og:description",
        content: "Você realmente consegue distinguir a criatividade humana da Inteligência Artificial?",
      },
    ],
  }),
  component: Resultado,
});

function Resultado() {
  const { s = 0, t = 6 } = Route.useSearch();
  const pct = t > 0 ? Math.round((s / t) * 100) : 0;

  const verdict =
    pct >= 80
      ? "Seu olhar ainda reconhece o gesto humano."
      : pct >= 50
        ? "Você hesita — e talvez seja exatamente esse o ponto."
        : "A máquina passou despercebida diante de você.";

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-6 py-6 md:px-12">
        <Link to="/" className="font-display text-sm tracking-[0.4em] uppercase">
          Moda em código
        </Link>
        <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Resultado · Editorial nº 01
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24 md:px-12">
        <RevealUp>
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Seu olhar revelou
          </div>
        </RevealUp>

        <RevealUp delay={150}>
          <div className="font-display mt-10 flex items-baseline gap-6 text-foreground">
            <span className="text-[18vw] font-light leading-none tracking-tighter md:text-[14rem]">
              {s}
            </span>
            <span className="text-3xl font-light text-muted-foreground md:text-5xl"> / {t} </span>
          </div>
        </RevealUp>

        <RevealUp delay={300}>
          <h1 className="font-display mt-12 max-w-3xl text-4xl font-light leading-[1.05] tracking-tight md:text-6xl">
            {verdict}
          </h1>
        </RevealUp>

        <RevealUp delay={500}>
          <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Você realmente consegue distinguir a criatividade humana da Inteligência Artificial?
            Talvez a pergunta certa não seja mais essa — mas o que decidimos fazer com a dúvida.
          </p>
        </RevealUp>

        <RevealUp delay={700}>
          <div className="mt-16 flex flex-col gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
            <Link
              to="/quiz"
              className="story-underline text-xs uppercase tracking-[0.4em] text-foreground"
            >
              Refazer a experiência →
            </Link>
            <Link
              to="/"
              className="text-xs uppercase tracking-[0.4em] text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Voltar ao início
            </Link>
          </div>
        </RevealUp>
      </section>

      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground md:px-12">
        <div className="grid gap-2">
          <p className="text-gray-600">Feito por:</p>
          <a href="https://instagram.com/brennoslow" className="text-blue-600"> Brenno Souza </a>
        </div>
      </footer>
    </main>
  );
}
