# Rokesh R – Portfolio (React + Vite)

Single-page portfolio built with React 18 and Vite. The contact form posts to a
small backend route (`/api/contact`) that holds the Web3Forms access key, so the
key is **never shipped to the browser**.

## How the key stays secret

```
Browser  --JSON (name, email, message)-->  /api/contact  --(+ access_key from env)-->  Web3Forms
```

- The key lives in `WEB3FORMS_ACCESS_KEY` (no `VITE_` prefix). Vite only exposes
  `VITE_*` variables to client code, so this one is never bundled.
- `server/contactHandler.js` is only imported by `api/contact.js` (Vercel
  function) and `vite.config.js` (dev server). Nothing in `src/` imports it.
- The handler also validates input, checks a honeypot, and rate-limits by IP.
- `.env` is git-ignored.

> Do **not** rename the variable to `VITE_WEB3FORMS_ACCESS_KEY`. That would
> embed the key in the public JavaScript and defeat the purpose.

## Run locally

```bash
npm install
cp .env.example .env     # then put your real key in .env (already provided in the zip)
npm run dev
```

The dev server (http://localhost:5173) includes a built-in `/api/contact`
middleware that reads `.env`, so the form works locally.

## Deploy (Vercel – recommended)

1. Push the project to GitHub (`.env` is ignored, so it is not pushed).
2. Import the repo in Vercel (framework preset: Vite).
3. In **Project Settings → Environment Variables** add
   `WEB3FORMS_ACCESS_KEY` (and optionally `CONTACT_SUBJECT`, `CONTACT_FROM_NAME`).
4. Deploy. `api/contact.js` is picked up automatically as a serverless function.

`npm run build` only produces the static frontend (`dist/`). Static-only hosts
(GitHub Pages, plain S3) cannot run `/api/contact`; use Vercel, or port
`server/contactHandler.js` to Netlify Functions / Cloudflare Workers / Express.

## Extra hardening (recommended)

- Rotate your Web3Forms key: the old one was visible in the original HTML.
- In the Web3Forms dashboard, restrict the key to your domain if your plan allows it.
- The in-memory rate limit resets on cold starts; for stricter limits use a
  store such as Upstash Redis or Vercel KV.

## Structure

```
api/contact.js            Vercel serverless function (production)
server/contactHandler.js  validation + forwarding to Web3Forms (server only)
vite.config.js            React plugin + dev-time /api/contact middleware
src/components/*          Header, Hero, About, Experience, Projects, Education, Contact, Footer
src/styles.css            Styles (ported unchanged from the original page)
.env / .env.example       Server-side secrets / template
```

## Colour themes

The header has five colour swatches. Clicking one switches the whole site instantly and the
choice is remembered (localStorage).

| Theme    | Style                      |
|----------|----------------------------|
| Midnight | Dark navy + mint           |
| Ocean    | Light, professional blue   |
| Emerald  | Light, fresh green         |
| Royal    | Dark violet + sky          |
| Sunset   | Warm cream + burnt orange  |

To add or tweak a theme: add a `[data-theme="name"]` block at the top of `src/styles.css`
and one entry in `src/themes.js`. Also add its id and browser-bar colour to the small script in `index.html`.

## Cursor

The pointer is pure CSS (bottom of `src/styles.css`): a clean arrow, a hand over links/buttons and a
text caret over form fields, each tinted with the active theme's accent colour and edged with the
theme background so it stays visible everywhere. It re-themes instantly with the theme switcher, has
no JavaScript and no lag, and touch devices simply ignore it. To tweak a colour, edit the hex values
inside that theme's three `cursor:url(...)` rules (the SVG is URL-encoded in the data URI).
