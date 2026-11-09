# NovaMind AI

AI automation landing page and waitlist. A single static file (`index.html`), with no build step.

## Collect waitlist signups (required)

The form sends each signup to a form backend. Until you set one up, the page shows a
"signups are not open just yet" message instead of losing the signup.

1. Create a free form at [formspree.io](https://formspree.io) (or Getform or Basin).
2. Copy the endpoint, for example `https://formspree.io/f/abcdwxyz`.
3. In `index.html`, set `WAITLIST_ENDPOINT` to that URL.

Signups then arrive by email and in the Formspree dashboard, where you can export them as CSV.

## Deploy

Any static host works: GitHub Pages (Settings → Pages → deploy from this branch), Netlify, or Vercel.
Drag the folder in, or point the host at this repo.
