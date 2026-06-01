# ai-sikkerhed.dk — project status

**Last updated:** 2026-06-01

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
- **51 sub-risks**
- **25 critical risks** flagged
- Source frameworks: MIT AI Risk Repository (1700+ risks across 7 domains), OWASP Top 10 for LLM Applications 2025, OWASP Top 10 for Agentic Applications 2026, OWASP Agentic Security Initiative guides

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

## Known issues / open items

- [ ] **MailerLite form is shared.** Same as compliance — needs sikkerhed-specific form ID for proper segmentation.
- [ ] **Legacy field names** (`mitigations`, `mitLinks`) in riskData.ts vs. domain-neutral names elsewhere. Not blocking but inconsistent.
- [ ] **No per-subcategory CTA card heading customization** — uses generic "Brug for sparring på denne risiko?" (already adapted to risk context, fine as is).

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
