# Bulk Submit Data Visualization Demo

## Getting Started

Copy `.env.example` to `.env.local` and update `NEXT_PUBLIC_DEQM_SERVER` to reference the base FHIR url of your `deqm-test-server` instance. If running locally, this likely will be `http://localhost:3000/4_0_1`.

Install dependencies as usual:

```bash
npm install
```

Start `deqm-test-server` or have `.env.local` point to an already running instance.

Start dev server on the default port of 3002:

```bash
npm run dev
```

Optionally start dev server on a different port (ex. 8081):

```bash
npm run dev -- -p 8081
```
