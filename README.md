# Atelier / AI — Quem cria o futuro da moda?

An interactive editorial landing page (in Brazilian Portuguese) about the frontier between **human creativity and Artificial Intelligence in fashion**. Minimalist *noir absoluto* aesthetic, serif display typography, subtle micro-animations, and a 6-question visual quiz.

Built with **TanStack Start v1 + React 19 + Vite 7 + Tailwind CSS v4** in TypeScript.

---

## Table of contents

1. [Project overview](#1-project-overview)
2. [Folder structure](#2-folder-structure)
3. [Installation & running](#3-installation--running)
4. [Build commands](#4-build-commands)
5. [How routing works](#5-how-routing-works)
6. [Quiz — data, questions & images](#6-quiz--data-questions--images)
7. [Where to edit each piece of text](#7-where-to-edit-each-piece-of-text)
8. [Colors, fonts and styles](#8-colors-fonts-and-styles)
9. [Architecture at a glance](#9-architecture-at-a-glance)

---

## 1. Project overview

Three routes, no backend, no database:

| Route         | File                          | Purpose                                                     |
| ------------- | ----------------------------- | ----------------------------------------------------------- |
| `/`           | `src/routes/index.tsx`        | Hero + editorial manifesto + CTA to start the quiz.         |
| `/quiz`       | `src/routes/quiz.tsx`         | Sequential quiz — one question at a time, 6 total.          |
| `/resultado`  | `src/routes/resultado.tsx`    | Final score + reflective verdict.                           |

All content is static. Quiz questions live in a single TypeScript array (`src/data/quiz.ts`).

---

## 2. Folder structure

```
.
├── public/
│   └── looks/                   # Drop quiz images here (look-01.jpg … look-06.jpg)
│
├── src/
│   ├── routes/                  # File-based routing (TanStack Router)
│   │   ├── __root.tsx           # HTML shell, <head>, fonts, global meta
│   │   ├── index.tsx            # Home  /
│   │   ├── quiz.tsx             # Quiz page  /quiz
│   │   └── resultado.tsx        # Result page  /resultado
│   │
│   ├── components/
│   │   ├── QuizCard.tsx         # Question card (image + choices + reveal)
│   │   └── RevealUp.tsx         # Scroll fade-up wrapper
│   │
│   ├── data/
│   │   └── quiz.ts              # Quiz questions, answers, explanations
│   │
│   ├── lib/                     # SSR error-page helpers (runtime shell)
│   ├── styles.css               # Tailwind v4 + design tokens + fonts
│   ├── router.tsx               # Router bootstrap
│   ├── routeTree.gen.ts         # AUTO-GENERATED — never edit
│   ├── server.ts                # SSR entry
│   └── start.ts                 # Server middleware
│
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 3. Installation & running

Requirements: **Node.js 20+** and **[Bun](https://bun.sh)** (or npm/pnpm).

```bash
# install
bun install         # or: npm install

# dev server → http://localhost:8080
bun run dev         # or: npm run dev
```

---

## 4. Build commands

```bash
bun run build       # production build → .output/
bun run preview     # serve the built app locally
bun run lint        # ESLint
bun run format      # Prettier
```

The build targets **Cloudflare Workers / Pages** by default and also runs on any Node-compatible SSR host (Vercel, Netlify, Fly.io, VPS).

---

## 5. How routing works

TanStack Router uses **file-based routing** under `src/routes/`. Each file exports a `Route` created with `createFileRoute()`; the plugin regenerates `src/routeTree.gen.ts` automatically.

To add a new page (e.g. `/about`), create `src/routes/about.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About" }] }),
  component: () => <main>About</main>,
});
```

Navigation uses the typed `<Link to="/quiz">` component from `@tanstack/react-router`. Never edit `routeTree.gen.ts`.

---

## 6. Quiz — data, questions & images

### Where questions live
All questions are in **`src/data/quiz.ts`** as a single array:

```ts
{
  id: 1,
  label: "Look 01",
  image: "/looks/look-01.jpg",     // path inside /public
  imagePrompt: "Editorial preto e branco — silhueta oversized",
  answer: "human",                 // "human" | "ai"
  explanation: "Concebido em ateliê…",
}
```

### Add / edit / remove a question
Just add, edit, or remove an entry in the array. The quiz page reads `QUIZ_QUESTIONS.length` and adapts automatically — the progress bar, counter, and final score all rescale.

### Replace / add the look images
1. Save your image files inside `public/looks/` (e.g. `look-01.jpg`, `look-02.jpg`…).
2. Reference them with an absolute path in `src/data/quiz.ts`:
   ```ts
   image: "/looks/look-01.jpg"
   ```
3. Recommended: **portrait 4:5 ratio**, `.jpg`, ≤ 400 KB each.

If an image is missing or fails to load, the card falls back gracefully to the placeholder box with the `imagePrompt` text — nothing breaks.

### Hero visual
The Hero currently uses a minimalist gradient (no video). To reintroduce a fashion film, drop a file at `public/videos/hero.mp4` and add a `<video>` element inside the `<Hero>` function in `src/routes/index.tsx`:

```tsx
<video
  src="/videos/hero.mp4"
  autoPlay muted loop playsInline
  className="absolute inset-0 h-full w-full object-cover opacity-70"
/>
```

Recommended: H.264, 1080p or lower, ≤ 8 MB, silent.

---

## 7. Where to edit each piece of text

| I want to change…                                       | Edit this file                          |
| ------------------------------------------------------- | --------------------------------------- |
| Site title, meta description, social preview            | `src/routes/__root.tsx`                 |
| Hero headline, subtitle, CTA, manifesto quote & body    | `src/routes/index.tsx`                  |
| Quiz question text ("Quem você acredita…")              | `src/components/QuizCard.tsx`           |
| Quiz choice labels ("Criado por um estilista", etc.)    | `src/components/QuizCard.tsx`           |
| Question data (labels, answers, explanations, images)   | `src/data/quiz.ts`                      |
| Progress header / brand mark on `/quiz`                 | `src/routes/quiz.tsx`                   |
| Final verdict messages & result copy                    | `src/routes/resultado.tsx`              |

---

## 8. Colors, fonts and styles

All design tokens live in **`src/styles.css`**:

- **Colors:** OKLCH values under `:root` — `--background`, `--foreground`, `--muted`, `--border`, etc. Mapped to Tailwind utilities in the `@theme inline` block (e.g. `bg-background`, `text-muted-foreground`).
- **Fonts:** `--font-display` (Cormorant Garamond) and `--font-sans` (Inter). Loaded via `<link>` in `src/routes/__root.tsx`. Use with `font-display` / default sans utilities.
- **Custom utilities:** `reveal-up` (fade-up animation), `story-underline` (hover underline). Defined in the same file.
- **Rule:** never hardcode colors like `text-white` or `bg-[#000]`. Always use the semantic tokens so the theme stays consistent.

---

## 9. Architecture at a glance

- **Routing:** TanStack Router, file-based, SSR-first.
- **State:** Only local React state (`useState`). No global store, no fetching — everything is static.
- **Quiz flow:** `quiz.tsx` holds the current `index` and an `answers: boolean[]` array. Each `<QuizCard>` is remounted with `key={question.id}` so its internal `choice` state is fresh per question. When the last answer arrives, the total score is computed and passed to `/resultado` via search params (`?s=…&t=…`).
- **Animations:** `RevealUp.tsx` uses `IntersectionObserver` to fade elements in on scroll. No animation library.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`, tokens in `src/styles.css`.
- **Build/SSR:** Vite 7 + `@tanstack/react-start`, deployable on Cloudflare Workers or any Node SSR host.

---

## Credits

**Atelier / AI** — MMXXVI. An editorial exploration of authorship on the frontier between the human hand and generative machines. Inspired by digital campaigns from Maison Margiela, Prada, Acne Studios and Jacquemus.
