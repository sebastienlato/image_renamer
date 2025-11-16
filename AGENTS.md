# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, with page layout in `App.tsx`, React entry wiring in `main.tsx`, and Tailwind tokens in `index.css`. UI pieces sit in `src/components/`, utilities such as renaming and zipping helpers in `src/utils/`, and shared contracts in `src/types/`. Configuration files (`vite.config.ts`, `tsconfig*.json`, `tailwind.config.js`, `eslint.config.js`) stay at the repo root; adjust them instead of inlining values inside components. Static HTML scaffolding is in `index.html`, and build artifacts land in `dist/` after production builds.

## Build, Test, and Development Commands
- `npm run dev` – start the Vite dev server on `http://localhost:5173`, with hot reload for React/Tailwind changes.
- `npm run build` – produce an optimized bundle in `dist/`; use before pushing deploy-ready changes.
- `npm run preview` – serve the `dist/` output locally to validate production behavior.
- `npm run lint` – run ESLint using `eslint.config.js`; keep it clean before committing.

## Coding Style & Naming Conventions
Use TypeScript throughout, 2-space indentation, and functional React components with hooks. Component files and exports use `PascalCase` (`DropZone.tsx`), utilities and hooks use `camelCase`, and types/interfaces belong in `src/types` with a leading capital letter (`ImageFile`). Favor Tailwind utility classes plus the custom `cyber-*` styles defined in `index.css`; avoid ad-hoc inline styles. Keep props typed explicitly, and colocate helper functions in `src/utils` to keep components lean.

## Testing Guidelines
Automated tests are not yet configured—new test infrastructure should lean on Vitest + React Testing Library (both integrate smoothly with Vite). Mirror the component tree (e.g., `src/components/__tests__/DropZone.test.tsx`) and name files after the unit under test. For now, perform manual QA covering drag-and-drop, naming updates, and zip downloads in Chrome and Firefox. Gate merges on smoke tests that verify the generated filenames, removal flow, and disabled states for downloads.

## Commit & Pull Request Guidelines
Existing history uses concise sentence-case summaries (e.g., `Initial commit for image_renamer`). Continue with imperative, <=72-character titles plus detailed bodies when needed, and group related changes per commit. Pull requests should describe rationale, list functional changes, mention UX/regression risks, and link any issue or ticket. Because this app is UI-heavy, attach before/after screenshots or short clips demonstrating DropZone, config form, and download behavior. Confirm `npm run lint` and a production preview pass before requesting review.
