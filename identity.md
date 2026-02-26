# Project: pastor.activefaith.church

## Summary
National ministry brand platform for Pastor Abraham Tshabuse — a speaker-brand website
designed to increase national speaking invitations and trusted ministry influence.

## Stack
- **Frontend**: Angular 21 + Tailwind CSS 4 + SSR (Azure Static Web App)
- **Backend**: Azure Functions v4 (Node 20, TypeScript)
- **Data**: Azure Table Storage (`PastorSubmissions` table)
- **Hosting**: Azure Static Web App (Free tier) with managed Functions
- **DNS**: Cloudflare → `pastor.activefaith.church`
- **Monitoring**: Azure Application Insights
- **Infrastructure**: Terraform (lives in `activefaith-infra/infra/app/pastor-*.tf`)
- **Testing**: Vitest (unit), Playwright (e2e), Node test runner (API)

## Rules
- Use OnPush change detection.
- ARCHITECTURE: Monolithic SWA (Frontend + Managed Functions).
- Backend logic strictly stateless.
- Use Azure Table Storage for form submissions (not Cosmos DB).
- Honeypot anti-spam on all forms.
- POPIA-compliant consent flows.
- Share resource group with activefaith.church but separate SWA + storage account.