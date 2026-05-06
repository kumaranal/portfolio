# Portfolio

Personal portfolio site built with Vite, React, and TypeScript.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

You can install Node via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if you prefer.

## Local development

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

The dev server runs on port `8080` by default (see `vite.config.ts`).

## Scripts

| Command        | Description                          |
| -------------- | ------------------------------------ |
| `npm run dev`  | Start the development server         |
| `npm run build`| Production build to `dist/`          |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint                           |

## Stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

Build with `npm run build` and deploy the `dist/` folder to any static host (for example Netlify, Vercel, GitHub Pages, or your own server).
