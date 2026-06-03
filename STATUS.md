# ai-sikkerhed.dk — project status

**Last updated:** 2026-06-03 — tool-URL refactor shipped (UX sprint 2/3).

## Tool-URL refactor (UX sprint 2/3) — shipped 2026-06-03

3 tools promoted to canonical, prerendered `/vaerktoejer/<slug>` URLs:

| Slug | Tool | Was inline on |
|---|---|---|
| `risiko-adoption` | Risiko × adoptionsfase | dashboard |
| `trusselsaktoer-matrix` | Trusselsaktør × AI-aktiv | Udvikling pillar |
| `mitigation-radar` | Mitigation-modenhedsradar | Strategi pillar |

- `AttackChain` stays **inline** on its 6 agentic subcategories (contextual to each).
- **Site-specific gotcha:** `RiskAdoptionMatrix` takes `onNavigate` (clickable cells), so here `ToolConfig.Component` is typed `ComponentType<{ onNavigate }>` and `ToolPage` passes `onNavigate` through — unlike compliance/governance whose promoted tools are prop-free (`() => JSX.Element`).
- Tool metadata in `riskData.ts` (`toolsMeta`), shared by `Index.tsx` + `prerender.ts`. New `ToolTeaserCard`/`ToolsIndex`/`ToolPage`; "Værktøjer" header nav; Breadcrumbs extended (`tool`/`toolsRoot`/`onTools`). Build: 87 routes + sitemap. Hydration verified via headless Chrome (incl. clickable matrix on the tool page).



## At a glance

| | |
|---|---|
| **Live URL** | https://ai-sikkerhed.dk (HTTPS via Let's Encrypt on Netlify) |
| **Netlify site** | ai-sikkerhed.netlify.app |
| **GitHub repo** | https://github.com/solution8-com/ai-sikkerhed |
| **Brand color** | Orange HSL(38°, 92%, 50%) ≈ #F59E0B |
| **Topic** | AI risks — MIT AI Risk Repository + OWASP LLM/Agentic Top 10 synthesis |
| **Status** | ✅ Live, migrated from Lovable, all CTAs wired |

## Origin story

This was the pilot site — built first in Lovable while we figured out the pattern. ai-compliance.dk was cloned from it; later ai-sikkerhed was migrated off Lovable to the same GitHub → Netlify stack as the other sites for consistency.

DNS migration on 2026-06-01: changed GoDaddy records from Lovable to Netlify. Cert flipped from Google Trust Services (Lovable's provider) to Let's Encrypt (Netlify's).

## Content scope

- **3 pillars:** Strategi & Governance / Mennesker & Uddannelse / Udvikling & Sikkerhed
- **22 categories**
- **58 sub-risks** (was 51; +7 added 2026-06-03 covering 2026 incidents: EchoLeak CVE-2025-32711, Agentic IDE RCE CVE-2025-53773, Shadow AI, A2A protocol risks, model extraction, cross-user memory contamination, EU AI Act security mapping)
- **27 critical risks** flagged (was 25)
- Source frameworks: MIT AI Risk Repository (1700+ risks across 7 domains), OWASP Top 10 for LLM Applications 2025, OWASP Top 10 for Agentic Applications 2026, OWASP Agentic Security Initiative guides. Source-type union extended 2026-06-03 to include CVE / MSRC / Research / CSA / Industry / EU for 2026-incident references.

Note: this site uses the ORIGINAL Lovable-era field names in `riskData.ts` (`mitigations`, `mitLinks`, `RiskPillar`, `RiskCategory`, `RiskSubcategory`) — NOT the domain-neutral names that compliance and governance use. Refactoring is low-priority but possible if we ever extract a shared template.

## Key technical bits

- **Stack:** Vite + React + TS + Tailwind + shadcn/ui (Lovable export, modernized — vitest deps were pruned because vite-node@3.2.5 was yanked from npm)
- **Data file:** `src/data/riskData.ts` (legacy field names)
- **CTAs:** MailerLite form (shared with compliance/governance) + Calendly
- **DNS at GoDaddy:** A `@ → 75.2.60.5`, CNAME `www → ai-sikkerhed.netlify.app`
- **public/docs/**: 6 OWASP PDFs that are linked from `riskData.ts` source citations — keep them
- **Auto-deploy:** every `git push` to main triggers Netlify rebuild

## Build commands

```bash
npm install
npm run dev -- --port 8081
npm run build
```

## Audit-driven refresh (2026-06-01)

Content audit recommended (1) updating OWASP LLM Top 10 URLs from 2025→2026 slugs and (2) bumping MIT AI Risk Repository to v4. Acted as follows (commit 41ccbf2):

- **MIT AI Risk Repository v4** — `MIT_SPREADSHEET` constant changed from /pubhtml direct-spreadsheet link to canonical `airisk.mit.edu/` homepage. Added `MIT_PREPRINT` for arXiv:2408.12622v2. Source card label updated to "MIT AI Risk Repository v4" with note that v4 (released 4 Dec 2025) adds 9 new frameworks, 200 new risks, total 1700+, including agentic AI. Hero copy now mentions v4 explicitly.
- **OWASP URLs NOT changed** — review-agent claimed OWASP LLM Top 10 2026 edition was out. Web-verified against `genai.owasp.org/llm-top-10/`: OWASP still serves 2025 as canonical. No changes warranted. Lesson: verify agent claims against authoritative sources before implementing.

## Known issues / open items

- [ ] **MailerLite form is shared.** Same as compliance — needs sikkerhed-specific form ID for proper segmentation.
- [ ] **Legacy field names** (`mitigations`, `mitLinks`) in riskData.ts vs. domain-neutral names elsewhere. Not blocking but inconsistent.

## Identified content gaps (next round)

From audit — not yet shipped:
- [ ] **EU AI Act compliance overlap category** — entire category missing; biggest 2026 risk for Danish enterprises
- [ ] **Shadow AI + Shadow Agents** — top people-pillar risk of 2026, not represented
- [ ] **AI-mediated insider threat** — paraphrase/summarisation defeats DLP signatures
- [ ] **Cognitive deskilling** — distinct from overreliance
- [ ] **Model extraction / model theft** — distillation attacks against deployed APIs
- [ ] **Jailbreak persistence** — jailbreaks persisting via memory poisoning across sessions
- [ ] **Foundation-model deprecation / model drift** — provider-side silent behavior changes
- [ ] **2025-2026 incidents to weave in:** zero-click Copilot CVE-2025-32711 (under indirect-injection), GitHub Copilot CVE-2025-53773 RCE (under unexpected-rce), agent-network worms (Moltbook), cross-tenant memory bleed, A2A protocol exploitation
- [ ] **Visualizations:** risk likelihood × impact matrix, severity heatmap, threat taxonomy sunburst, attack-chain diagrams for top 5 agentic threats, MITRE ATLAS technique map

## Recent commits

```
c19d546 Rename CTA buttons to "Book et møde"
a096793 Add CTAs, fix hero copy, modernize SEO + og-image
b76ee47 Initial commit: ai-sikkerhed Lovable export (pre-migration snapshot)
```

## Migration changes from Lovable original

- Removed unused `Shield` icon import
- Added `NewsletterCTA` component (MailerLite, optimistic submit via fetch no-cors)
- Added sticky "Book et møde" button in header next to MIT Repository + OWASP GenAI external links
- Added per-subcategory sparring CTA card
- Hero copy: "AI-risiko Overblik" → "AI Risici Overblik"
- Footer: added AI Rådgivning credit line
- SEO meta: full Danish title/description/OG/JSON-LD pointing at ai-sikkerhed.dk
- og-image: regenerated with clean minimal design (orange, "AI Sikkerhed" wordmark)
- apple-touch-icon.png generated from existing favicon

## Next-session quick start

```bash
cd /Users/jacobsmacbookair/projects/websites/onepagers/ai-sikkerhed
npm run dev -- --port 8081
# Open http://localhost:8081
```
