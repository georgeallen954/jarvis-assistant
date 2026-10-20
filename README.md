# JARVIS iPhone PWA starter

A minimal mobile-first Progressive Web App with a JARVIS-style UI, local task list, browser speech input where supported, optional spoken replies, and a server-side OpenAI Responses API endpoint.

## Deploy from an iPhone

This starter is designed to be deployed using a GitHub repository and Vercel's website. Exact dashboard labels may change.

1. Create/sign in to GitHub and make a **private** repository.
2. Upload these files and the `api` folder to the repository (use GitHub's web interface).
3. Create/sign in to Vercel and import that repository.
4. In Vercel project Settings → Environment Variables, add:
   - `OPENAI_API_KEY` = your secret OpenAI API key
   - `JARVIS_ACCESS_CODE` = a long, unique passphrase you choose
   - Optional `OPENAI_MODEL` = a model available to your API account (default is `gpt-4.1-mini`)
5. Deploy. Open the HTTPS URL Vercel gives you.
6. In JARVIS → Setup, enter the same `JARVIS_ACCESS_CODE` and save.
7. Test a text question. If it fails, check the Vercel deployment logs and API billing.

## Add to iPhone Home Screen

Open the deployed URL in Safari → Share → Add to Home Screen → enable “Open as Web App” if shown → Add.

## Security and limitations

- Never put `OPENAI_API_KEY` in `index.html`, client-side JavaScript, a public repository, or a screenshot.
- Use a private repository. The access code is a basic shared-secret gate, not a full user-account system. Anyone who obtains it can use your API quota. Rotate it if exposed.
- Add rate limiting and proper authentication before making this public or sharing it widely. Serverless in-memory rate limits are not reliable.
- The browser task list is stored locally in the browser on this device; it is not encrypted cloud storage or cross-device sync.
- Browser speech recognition varies by browser and iOS version and may require network access and microphone permission. Text chat is the reliable fallback.
- This starter has no calendar, messaging, payment, smart-home, or other external action integrations yet. It cannot control the iPhone or run a persistent wake word in the background.
- API usage is billed separately from a ChatGPT subscription. Set usage limits/budget alerts in the API provider dashboard where available.

## API endpoint

`POST /api/chat`
Headers: `Content-Type: application/json`, `x-jarvis-access: <your access code>`
Body: `{"message":"Hello, JARVIS"}`
