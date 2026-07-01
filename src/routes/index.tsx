import { createFileRoute, Link } from "@tanstack/react-router";
import { RevealUp } from "@/components/RevealUp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Quem costura o futuro da moda? — Um editorial interativo" },
      {
        name: "description",
        content:
          "Uma experiência editorial sobre a fronteira entre criatividade humana e Inteligência Artificial na moda contemporânea.",
      },
      { property: "og:title", content: "Quem costura o futuro da moda?" },
      {
        property: "og:description",
        content:
          "Você consegue distinguir a criatividade humana da Inteligência Artificial? Um editorial interativo.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <Manifesto />
    </main>
  );
}

function Hero() {
  return (
    <section className="relative h-screen min-h-160 w-full overflow-hidden bg-background">
      {/* backgroud */}
      <div className="absolute inset-0 gradient(ellipse_at_center,hsl(var(--muted)/0.15),transparent_70%)]" />
      <div className="absolute inset-0 bg-linear-to-b from-background via-background/95 to-background" />

      {/* Top bar */}
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="font-display text-lg tracking-[0.4em] uppercase">Moda em código</div>
        <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          MMXXVI · Editorial nº 01
        </div>
      </header>

      {/* Center content */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-24 md:px-12 md:pb-32">
        <RevealUp>
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Um editorial interativo
          </div>
        </RevealUp>
        <RevealUp delay={150}>
          <h1 className="font-display mt-6 max-w-4xl text-5xl font-light leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            Quem costura
            <br />
            o futuro
            <br />
            <em className="italic text-muted-foreground">da moda?</em>
          </h1>
        </RevealUp>
        <RevealUp delay={400}>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            A Inteligência Artificial já faz parte das criações publicitárias na moda. Por isso,
            convidamos vocês a observar essa transformação e refletir sobre o papel da tecnologia
            como ferramenta, sem perder de vista a identidade e a criatividade humanas.
          </p>
        </RevealUp>
        <RevealUp delay={650}>
          <Link
            to="/quiz"
            className="story-underline mt-12 self-start text-xs uppercase tracking-[0.4em] text-foreground"
          >
            Iniciar a experiência →
          </Link>
        </RevealUp>
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          Role para descobrir
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="relative bg-background px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-6xl">
        <RevealUp>
          <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Manifesto
          </div>
        </RevealUp>

        <RevealUp delay={150}>
          <blockquote className="font-display mt-10 max-w-5xl text-3xl font-light leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
            <span className="text-muted-foreground">“</span>A ideia deste site surgiu
            <br /> como uma forma de demonstrar
            <br /> como a <em className="italic"> Inteligência Artificial</em>
            <br />
            vem se tornando cada vez mais presente
            <br />
            nas criações publicitárias{""}
            <br />
            <span className="italic text-muted-foreground">do universo da moda</span>
            <br />
            <span className="text-muted-foreground">”</span>
          </blockquote>
        </RevealUp>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <RevealUp delay={100}>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Ao longo desta experiência, buscamos demonstrar como a Inteligência Artificial passou
              a fazer parte dos processos criativos na publicidade de moda. Mais do que apresentar
              essa transformação, queremos convidar você a observar cada imagem com atenção e
              refletir sobre o papel da tecnologia na criação.
            </p>
          </RevealUp>
          <RevealUp delay={250}>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Também esperamos despertar um olhar mais crítico sobre esse cenário. Acreditamos que a
              IA pode ser uma ferramenta poderosa para potencializar processos criativos, mas não
              como substituição da criação humana, que carrega identidade, sentimento e
              personalidade de uma forma única.
            </p>
          </RevealUp>
        </div>

        <RevealUp delay={400}>
          <div className="mt-24 flex flex-col items-start gap-6 border-t border-border pt-12 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
                Capítulo 01
              </div>
              <h2 className="font-display mt-3 text-3xl font-light leading-tight md:text-4xl">
                Seis campanhas publicitarias. Uma única pergunta.
              </h2>
            </div>
            <Link
              to="/quiz"
              className="story-underline text-xs uppercase tracking-[0.4em] text-foreground"
            >
              Começar o quiz →
            </Link>
          </div>
        </RevealUp>
      </div>
    </section>
  );
}
