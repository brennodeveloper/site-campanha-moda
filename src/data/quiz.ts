export type QuizAnswer = "human" | "ai";

export type QuizQuestion = {
  id: number;
  label: string;
  /** Path to the look image inside /public (e.g. "/looks/look-01.jpg"). Optional — falls back to placeholder. */
  image?: string;
  /** Short editorial description shown as placeholder text (or as alt text when image is set). */
  imagePrompt: string;
  answer: QuizAnswer;
  explanation: string;
};

// To use real images: drop files in `public/looks/` and set the `image` field
// on each question below (e.g. image: "/looks/look-01.jpg").
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    label: "Look 01",
    image: "../assets/images/sfn-1.jpeg",
    imagePrompt:
      "Capa da revista SFN, Edição 07 de junho de 2026. Destaque para um jovem vestindo streetwear autêntico e boné, em cenário urbano com cerca de ferro ao fundo. Tipografia amarela e branca anuncia o tema 'Guetos e Estilo'.",
    answer: "human",
    explanation:
      "Concebido em estratégia a partir da cultura urbana e da identidade do futebol. A equipe alinhou a autenticidade das ruas com o orgulho clubístico, ajustando a narrativa visual e os símbolos do 'gueto' até encontrar o volume final de conexão com a torcida e o público jovem.",
  },
  {
    id: 2,
    label: "Look 02",
    image: "../assets/images/sfn-ai.jpeg",
    imagePrompt: "...",
    answer: "ai",
    explanation:
      "Gerado por modelo de IA treinado em arquivos sobre moda. A direção criativa humana ficou no prompt, mas o tecido nunca existiu.",
  },
  {
    id: 3,
    label: "Look 03",
    image: "../assets/images/sfn-ai2.jpeg",
    imagePrompt: "...",
    answer: "ai",
    explanation:
      "Gerado por modelo de IA treinado em arquivos sobre moda. A direção criativa humana ficou no prompt, mas o tecido nunca existiu.",
  },
  {
    id: 4,
    label: "Look 04",
    image: "../assets/images/sfn-2.jpeg",
    imagePrompt:
      "Editorial de moda da SFN mostrando close-up de peças de vestuário streetwear, incluindo camisa de futebol personalizada com o dizer '091 OG GUETO' e acessórios urbanos. Composição focada em texturas e identidade visual da periferia.",
    answer: "human",
    explanation:
      "Concebido nas ruas a partir da vivência da periferia. A equipe alinhou o estilo dos artistas urbanos e a identidade do streetwear real, ajustando a narrativa visual até encontrar o volume final de uma moda feita por quem vem da base.",
  },
  {
    id: 5,
    label: "Look 05",
    image: "../assets/images/sfn-ai3.jpeg",
    imagePrompt: "...",
    answer: "ai",
    explanation: "Composição feita inteiramente por IA generativa.",
  },
  {
    id: 6,
    label: "Look 06",
    image: "../assets/images/sfn-3.jpeg",
    imagePrompt:
      "Página interna da revista SFN com grupo de artistas urbanos posando em ambiente externo, vestindo coleções de marcas locais de streetwear. A imagem transmite a vivência real das ruas e a conexão entre moda, música e cultura jovem de 2026.",
    answer: "human",
    explanation:
      "Concebido nas ruas a partir da vivência da periferia. A equipe alinhou o estilo dos artistas urbanos e a identidade do streetwear real, ajustando a narrativa visual até encontrar o volume final de uma moda feita por quem vem da base.",
  },
];
