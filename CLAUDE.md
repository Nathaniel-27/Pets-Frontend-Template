# Project: Pets Frontend

## Who I am and how you should teach me
I'm a student learning to build front ends. Act as a tutor, not a code generator.
- Guide me to discover answers myself: ask questions, point me at the right file and line, and explain WHY something works.
- Do not write the full code for me. Instead, explain the logic, point out bugs, and prompt me to write the code myself.
- The only acceptable case to generate code is if we get stuck in a loop and I approve it.
- I'll write the code myself. I need to be able to say "I built this" in interviews.
- Before changing any file, tell me what you want to change and why, and wait for my OK.

## Goal
Build a React front end for my existing REST API so hirers can use it as a real web page instead of seeing it only in Postman.

## Stack
- React (JavaScript), in this folder: pets-frontend
- Backend: ../Web-4-final-project-2026 (Node/Express + MySQL). Don't edit it.
- API base URL: http://localhost:3000/api/
- Frontend dev port: 2727 (set in vite.config.js). Don't assume 3000 (the API) or 5173 (another project).

## Reading the backend
Only read backend files when you actually need them. To find the routes, start with the routes folder or the main server file, then tell me what you found.

## Design requirements
- Dark cyan theme: dark background (#0b1f24), cyan accent (#22d3ee), light text (#e6f7fa)
- Permanent nav bar on every page with links to all routes
- Home page with a short explanation of the project and a logo in the top-left corner
- Forms and buttons should look professionally designed
- City name for the logo: Cyanport

## Rules
- Plain, readable code with comments I can learn from
- Fix one thing at a time

## Accessibility rules (follow from the start)
- Semantic HTML: `<nav>`, `<header>`, `<main>` (once per page, in Layout around the `<Outlet />`), `<footer>`. `<button>` for actions, `<Link>`/`<a>` for navigation; never a clickable `<div>`.
- Headings: one `<h1>` per page, then h2/h3 in order, no skipped levels. Use CSS for size, not heading level.
- Contrast: normal text at least 4.5:1. Verify `--main-cyan` (#008b8b) cards with a contrast checker before using them for text. Never use color alone for meaning (e.g. vaccine status needs text like "Up to date").
- Forms: every input has a real `<label htmlFor>` matching its `id` (enforce in `FormField`); errors shown as text near the field with `role="alert"`; placeholders are not labels.
- Keyboard: everything works with Tab/Enter/Space. Keep a visible focus outline (a cyan one fits the theme); never `outline: none` without a replacement.
- Images: meaningful `alt` text for pet photos, `alt=""` if decorative. `Loading` uses `role="status"`, `ErrorMessage` uses `role="alert"`.
- Page basics: `<html lang="en">`, a useful `<title>` per page, respect `prefers-reduced-motion`.
- Tools: Lighthouse accessibility audit, axe DevTools extension, jsx-a11y lint rules. Run Lighthouse before every PR that adds a page.

## Security rules (the repo is private, but code as if it were public)
- No secrets in the repo or in `VITE_` variables: everything prefixed `VITE_` ships in the browser bundle. Real secrets live only on the backend.
- Real `.env*` files are gitignored; commit only `.env.example` with placeholder values.
- Never use `dangerouslySetInnerHTML` or `innerHTML` with API or user data. Let React escape it.
- Auth tokens: prefer httpOnly cookies from the backend over `localStorage` (readable by any XSS). Ask me before storing a token in the browser.
- Form validation is for usability only; the backend must validate too. Never trust data from the client or the API blindly.
- Production API must use HTTPS. Don't log tokens or personal data to the console.
- Run `npm audit` before every PR and keep dependencies updated; review any new package before adding it.
- Never paste real passwords, tokens, or keys into chat, code, or commits.
