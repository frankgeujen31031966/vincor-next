# Vincor Next — Deployment & CMS Handleiding

## Tech Stack

- **Framework**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **CMS**: Sveltia CMS (compatible met Decap CMS)
- **i18n**: next-intl (NL / EN / FR)
- **Content**: JSON bestanden in `content/{locale}/`

---

## Deployment

De site kan op meerdere platforms draaien. Hieronder de opties.

### Optie 1: Cloudflare Workers (huidige setup)

1. Installeer dependencies: `npm install`
2. Login bij Cloudflare: `npx wrangler login`
3. Deploy: `npm run deploy`

De site draait op `https://<naam>.workers.dev`.

**Auto-deploy via GitHub Actions:**
- Voeg twee repository secrets toe in GitHub (Settings > Secrets > Actions):
  - `CLOUDFLARE_API_TOKEN` — maak aan via https://dash.cloudflare.com/profile/api-tokens (template: "Edit Cloudflare Workers")
  - `CLOUDFLARE_ACCOUNT_ID` — te vinden in Cloudflare dashboard
- Bij elke push naar `master` wordt de site automatisch gedeployed.

### Optie 2: Vercel

1. Verwijder `output: 'standalone'` regel uit `next.config.ts` (als aanwezig)
2. Verwijder `@opennextjs/cloudflare` en `wrangler` uit devDependencies
3. Verbind je GitHub repo op https://vercel.com
4. Vercel detecteert Next.js automatisch

### Optie 3: Netlify

1. Verbind je GitHub repo op https://netlify.com
2. Build command: `npm run build`
3. Netlify heeft een ingebouwde Next.js runtime

### Optie 4: Docker (self-hosted / NAS)

Een `Dockerfile` is meegeleverd. Voeg `output: 'standalone'` toe aan `next.config.ts`.

```bash
docker build -t vincor-next .
docker run -p 3000:3000 vincor-next
```

---

## CMS (Admin Paneel)

Het admin paneel is bereikbaar op `/admin/` en gebruikt Sveltia CMS met GitHub als backend.

### CMS Setup voor een nieuwe omgeving

1. **Maak een GitHub OAuth App aan:**
   - Ga naar https://github.com/settings/developers
   - Klik "New OAuth App"
   - Application name: `Vincor CMS`
   - Homepage URL: `https://jouw-domein.com`
   - Authorization callback URL: `https://jouw-oauth-worker-url/callback`
   - Noteer de **Client ID** en **Client Secret**

2. **Deploy de OAuth Worker:**
   De map `oauth-worker/` bevat een Cloudflare Worker die GitHub OAuth afhandelt.
   - Pas `CLIENT_ID` en `CLIENT_SECRET` aan in `oauth-worker/worker.js`
   - Deploy: `cd oauth-worker && npx wrangler deploy`

3. **Update CMS config:**
   Pas `public/admin/config.yml` aan:
   ```yaml
   backend:
     name: github
     repo: <github-username>/<repo-naam>
     branch: master
     base_url: https://<jouw-oauth-worker>.workers.dev
     auth_endpoint: auth
   ```

4. Ga naar `/admin/` en log in met GitHub.

### Content bewerken

- **Via admin paneel**: Ga naar `/admin/`, log in, bewerk content en klik opslaan.
- **Direct in code**: Bewerk JSON bestanden in `content/{locale}/` en deploy opnieuw.
- **Via GitHub**: Bewerk bestanden direct op github.com.

### Content structuur

```
content/
  nl/          # Nederlands (brontaal)
  en/          # Engels
  fr/          # Frans
messages/
  nl.json      # UI vertalingen NL
  en.json      # UI vertalingen EN
  fr.json      # UI vertalingen FR
```

---

## Analytics

Cloudflare Web Analytics is voorbereid. Om te activeren:

1. Ga naar Cloudflare Dashboard > Analytics & Logs > Web Analytics
2. Voeg je domein toe en kopieer het **token**
3. Stel de environment variable in:
   ```
   NEXT_PUBLIC_CF_ANALYTICS_TOKEN=jouw-token-hier
   ```
   - Bij Cloudflare Workers: `npx wrangler secret put NEXT_PUBLIC_CF_ANALYTICS_TOKEN`
   - Bij Vercel: Settings > Environment Variables
   - Bij Netlify: Site settings > Environment variables
   - Bij Docker: `-e NEXT_PUBLIC_CF_ANALYTICS_TOKEN=jouw-token`

---

## Environment Variables

| Variable | Beschrijving | Verplicht |
|----------|-------------|-----------|
| `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` | Cloudflare Web Analytics token | Nee |

---

## Lokaal ontwikkelen

```bash
npm install
npm run dev
```

De site draait op `http://localhost:3000`.
