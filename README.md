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

## Running Demos

After starting up Bulk Submit Demo and DEQM Test Server, the Measure ID drop down will be populated with the resource IDs of the measures populated on the test server. Selecting a measure will trigger a `$data-requirements` request to the test server for that measure, the results of which can be viewed in the "Data Requirements" panel. The results of the `$data-requirements` request are parsed into `_type` and `_typeFilter` headers in the "Filters" panel. When sending a bulk submit-data request, these filters are passed in with the request as query parameters.

Fill in the "Export URL (Data Source)" field with the url to a FHIR server with bulk submit-data capability (You can use DEQM Test Server for this as well). Populating this field with a valid URL will generate a request preview with the URL, JSON body, and headers required for sending a bulk submit-data request.
