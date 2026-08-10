# Wise Saturn Website

Production website for Wise Saturn's automatic self-cleaning livestock water trough.

## Information architecture

- Home — product demonstration, benefits, trial and dealer calls to action
- Product — dimensions, cleaning system, installation, valve and controller information
- Trial — supported three-month feedlot trial
- Videos — database-managed demonstrations
- Updates — database-managed news, trials, exhibitions and dealer updates
- Downloads — database-managed approved resources
- About — concise product origin story
- Contact — one adaptive product, trial and dealer form
- Admin — enquiries, CSV export, content and user status

## Production services

- Vercel project: `wise-saturn-website`
- GitHub: `yzyemo/wise-saturn-website`
- Postgres: Neon through the existing Vercel project
- Email: Resend notification only; full enquiry details remain in the database

## Required environment variables

- `DATABASE_URL`
- `ADMIN_SESSION_SECRET`
- `ADMIN_INITIAL_PASSWORD`
- `DAVID_INITIAL_PASSWORD`
- `NEMO_INITIAL_PASSWORD`
- `RESEND_API_KEY`

The admin usernames are `admin`, `david`, and `nemo`. Initial passwords are deployment secrets and are never committed.

Preserve the existing lockfile, `.openai`, worker, Vite and Vercel configuration.
