# GitHub Issue Analyzer (LLM + Local Cache)

A backend service that fetches GitHub issues, caches them locally, and analyzes them using a natural-language prompt powered by an LLM (Gemini).

---

## Tech Stack

* Node.js + Express (TypeScript)
* SQLite (`better-sqlite3`)
* Gemini API (via Axios)
* jet-validators for request validation

---

## Storage Choice

**SQLite**

Chosen for durable local caching with zero external dependencies.
It survives restarts, is easy to inspect, and avoids unnecessary infrastructure.
In-memory and JSON storage were not durable; Redis was unnecessary for this scope.

---

## Setup

```bash
npm install
```

Create `.env`:

```env
GEMINI_API_KEY=your_api_key
```

Run:

```bash
npm run dev
```

---

## API Endpoints

### `POST /api/scan`

Fetch and cache open GitHub issues.

```json
{ "repo": "owner/repo" }
```

Response:

```json
{
  "repo": "owner/repo",
  "issues_fetched": 42,
  "cached_successfully": true
}
```

---

### `POST /api/analyze`

Analyze cached issues using an LLM.

```json
{
  "repo": "owner/repo",
  "prompt": "Summarize key issue themes"
}
```

Response:

```json
{ "analysis": "LLM-generated text" }
```

---

## AI Tool Usage

AI tools were used for architecture decisions, debugging, and prompt design.
