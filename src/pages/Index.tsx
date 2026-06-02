import { useState, useMemo, useRef, useEffect, type FormEvent } from "react";
import logo from "@/assets/logo.png";
import { ExternalLink, ChevronRight, ChevronDown, ArrowLeft, Search } from "lucide-react";
import {
  pillars,
  riskCategories,
  getRisksByPillar,
  getSeverityColor,
  getSeverityBg,
  type RiskPillar,
  type RiskCategory,
  type RiskSubcategory,
} from "@/data/riskData";

type View = "dashboard" | "pillar" | "category" | "subcategory";

const CALENDLY_URL = "https://calendly.com/ai-raadgivning_jacob/30min?month=2026-06";
// MailerLite form — shared with compliance temporarily; swap to a sikkerhed-specific form once created
const MAILERLITE_ACTION = "https://assets.mailerlite.com/jsonp/1571946/forms/189012812467536974/subscribe";

type SearchResult =
  | { kind: "category"; item: RiskCategory }
  | { kind: "subcategory"; item: RiskSubcategory; parent: RiskCategory };

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="rounded bg-primary/25 px-0.5 text-foreground">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

const pillarName = (id: RiskPillar) =>
  id === "strategy" ? "Strategi" : id === "people" ? "Mennesker" : "Udvikling";

const Index = () => {
  const [view, setView] = useState<View>("dashboard");
  const [selectedPillar, setSelectedPillar] = useState<RiskPillar | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<RiskCategory | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<RiskSubcategory | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = (
    newView: View,
    pillar?: RiskPillar,
    category?: RiskCategory,
    subcategory?: RiskSubcategory
  ) => {
    setView(newView);
    if (pillar !== undefined) setSelectedPillar(pillar);
    if (category !== undefined) setSelectedCategory(category);
    if (subcategory !== undefined) setSelectedSubcategory(subcategory);
  };

  const goBack = () => {
    if (view === "subcategory") navigate("category");
    else if (view === "category") navigate("pillar");
    else if (view === "pillar") navigate("dashboard");
  };

  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const searchResults = useMemo<SearchResult[]>(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    const out: SearchResult[] = [];
    riskCategories.forEach((c) => {
      if (c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)) {
        out.push({ kind: "category", item: c });
      }
      c.subcategories.forEach((s) => {
        if (
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
        ) {
          out.push({ kind: "subcategory", item: s, parent: c });
        }
      });
    });
    return out;
  }, [searchQuery]);
  const categoryHits = searchResults.filter((r) => r.kind === "category");
  const subcategoryHits = searchResults.filter((r) => r.kind === "subcategory");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("dashboard")}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <img src={logo} alt="AI Sikkerhed" className="h-14" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Søg i risici..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-64 rounded-md border border-border bg-secondary pl-9 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <kbd className="pointer-events-none absolute right-2 top-1/2 hidden h-5 -translate-y-1/2 select-none items-center gap-0.5 rounded border border-border bg-background px-1.5 text-[10px] font-medium text-muted-foreground sm:flex">⌘K</kbd>
            </div>
            <div className="flex gap-2">
              <a
                href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQw0Pk4uwdimbx8SGAXuAeDvTRP_0Hvtlamm1LYjWtP7oOEcVGFOCKXAeq81qscsamlqfcqdEPKZJke/pubhtml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                MIT Repository <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://genai.owasp.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                OWASP GenAI <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Book et møde
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Søgeresultater */}
        {searchQuery && (
          <div className="fade-in mb-8">
            <h2 className="mb-4 font-display text-lg text-foreground">
              Søgeresultater for "{searchQuery}"
              <span className="ml-2 text-sm text-muted-foreground">
                ({categoryHits.length} områder · {subcategoryHits.length} risici)
              </span>
            </h2>
            {searchResults.length === 0 ? (
              <p className="text-sm text-muted-foreground">Ingen risici matcher din søgning.</p>
            ) : (
              <>
                {categoryHits.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">Områder ({categoryHits.length})</h3>
                    <div className="grid gap-3">
                      {categoryHits.map((r) => r.kind === "category" && (
                        <button
                          key={r.item.id}
                          onClick={() => {
                            setSearchQuery("");
                            navigate("category", r.item.pillar, r.item);
                          }}
                          className="card-hover flex items-center gap-4 rounded-lg border border-border bg-card p-4 text-left"
                        >
                          <span className="text-2xl">{r.item.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-sm font-semibold text-foreground">
                              <Highlight text={r.item.name} query={searchQuery} />
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              <Highlight text={r.item.description} query={searchQuery} />
                            </p>
                          </div>
                          <span className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground">
                            {pillarName(r.item.pillar)}
                          </span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {subcategoryHits.length > 0 && (
                  <div>
                    <h3 className="mb-2 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">Konkrete risici ({subcategoryHits.length})</h3>
                    <div className="grid gap-2">
                      {subcategoryHits.map((r) => r.kind === "subcategory" && (
                        <button
                          key={`${r.parent.id}-${r.item.id}`}
                          onClick={() => {
                            setSearchQuery("");
                            navigate("subcategory", r.parent.pillar, r.parent, r.item);
                          }}
                          className="card-hover flex items-center gap-4 rounded-lg border border-border bg-card/60 p-3 text-left"
                        >
                          <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${getSeverityColor(r.item.severity)}`}>
                            {r.item.severity === "critical" ? "kritisk" : r.item.severity === "high" ? "høj" : r.item.severity === "medium" ? "middel" : "lav"}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-sm font-medium text-foreground">
                              <Highlight text={r.item.name} query={searchQuery} />
                            </p>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {r.parent.icon} {r.parent.name} · <Highlight text={r.item.description} query={searchQuery} />
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Dashboard */}
        {!searchQuery && view === "dashboard" && <DashboardView onNavigate={navigate} />}
        {!searchQuery && view === "pillar" && selectedPillar && (
          <PillarView pillar={selectedPillar} onNavigate={navigate} onBack={goBack} />
        )}
        {!searchQuery && view === "category" && selectedCategory && (
          <CategoryView category={selectedCategory} onNavigate={navigate} onBack={goBack} />
        )}
        {!searchQuery && view === "subcategory" && selectedSubcategory && selectedCategory && (
          <SubcategoryView
            subcategory={selectedSubcategory}
            category={selectedCategory}
            onBack={goBack}
          />
        )}
      </main>

      {/* Newsletter + CTA strip */}
      <NewsletterCTA />

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-6">
        <div className="container mx-auto px-6 text-center text-xs text-muted-foreground">
          <p>
            Risikodata baseret på{" "}
            <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQw0Pk4uwdimbx8SGAXuAeDvTRP_0Hvtlamm1LYjWtP7oOEcVGFOCKXAeq81qscsamlqfcqdEPKZJke/pubhtml" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              MIT AI Risk Repository
            </a>{" "}
            og{" "}
            <a href="https://genai.owasp.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              OWASP GenAI Security Project
            </a>
            . For alle detaljer, besøg de originale repositories.
          </p>
          <p className="mt-3">
            En oversigt fra{" "}
            <a href="https://ai-raadgivning.dk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">AI Rådgivning</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

// ── Dashboard View ──
function DashboardView({ onNavigate }: { onNavigate: (v: View, p?: RiskPillar, c?: RiskCategory, s?: RiskSubcategory) => void }) {
  const totalRisks = riskCategories.reduce((sum, c) => sum + c.subcategories.length, 0);
  const criticalCount = riskCategories.reduce(
    (sum, c) => sum + c.subcategories.filter((s) => s.severity === "critical").length,
    0
  );

  return (
    <div className="fade-in">
      {/* Hero */}
      <div className="mb-10">
        <h2 className="font-display text-3xl font-bold text-foreground">
          AI Risici <span className="text-primary text-glow">Overblik</span>
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Omfattende risikovurdering på tværs af Strategi, Mennesker og Udvikling — baseret på MIT AI Risk Repository v4 (dec 2025, 1700+ risici, 9 frameworks inkl. agentic AI), OWASP Top 10 for LLM'er 2025, OWASP Top 10 for Agentiske Applikationer 2026 og OWASP Agentic Security Initiative-guides.
        </p>
      </div>

      {/* Statistik */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {[
          { label: "Risikokategorier", value: riskCategories.length, color: "text-foreground" },
          { label: "Sub-risici sporet", value: totalRisks, color: "text-info" },
          { label: "Kritiske risici", value: criticalCount, color: "text-danger" },
          { label: "Kilder", value: 8, color: "text-primary" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-5 border-glow">
            <p className={`font-display text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Værktøj: Risiko × adoptionsfase-matrix */}
      <RiskAdoptionMatrix onNavigate={onNavigate} />

      {/* Søjler */}
      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => {
          const categories = getRisksByPillar(pillar.id);
          const criticals = categories.reduce(
            (sum, c) => sum + c.subcategories.filter((s) => s.severity === "critical").length,
            0
          );
          return (
            <button
              key={pillar.id}
              onClick={() => onNavigate("pillar", pillar.id)}
              className="card-hover group rounded-xl border border-border bg-card p-6 text-left"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-3xl">{pillar.icon}</span>
                {criticals > 0 && (
                  <span className="risk-pulse rounded-full bg-danger/15 px-2.5 py-0.5 text-xs font-medium text-danger">
                    {criticals} kritiske
                  </span>
                )}
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {pillar.name}
              </h3>
              <p className="mt-0.5 text-xs font-medium text-primary/70">{pillar.subtitle}</p>
              <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{pillar.description}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{categories.length} risikokategorier</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Kilderepoer */}
      <div className="mt-10 rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Kilderepositories</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <a
            href="https://docs.google.com/spreadsheets/d/e/2PACX-1vQw0Pk4uwdimbx8SGAXuAeDvTRP_0Hvtlamm1LYjWtP7oOEcVGFOCKXAeq81qscsamlqfcqdEPKZJke/pubhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover flex items-start gap-4 rounded-lg border border-border p-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-info/10 font-display text-sm font-bold text-info">
              MIT
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-foreground">MIT AI Risk Repository v4</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Opdateret dec 2025. 1700+ AI-risici på tværs af 7 domæner og 24 underdomæner, fra 83 frameworks (inkl. nye agentic AI-rammer). Kausale og domæne-taksonomier.
              </p>
            </div>
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          </a>
          <a
            href="https://genai.owasp.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="card-hover flex items-start gap-4 rounded-lg border border-border p-4"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-warning/10 font-display text-xs font-bold text-warning">
              OWASP
            </div>
            <div>
              <p className="font-display text-sm font-semibold text-foreground">OWASP GenAI Security Project</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Top 10-risici for LLM'er 2025, Top 10 for agentiske applikationer 2026, governance-tjeklister, agentisk sikkerhedsvejledning, AI-red-teaming-ressourcer og sikkerhedsløsningslandskab.
              </p>
            </div>
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Severity Breakdown per pillar (no chart lib needed) ──
// ── Værktøj: Risiko × adoptionsfase matrix ──
function RiskAdoptionMatrix({
  onNavigate,
}: {
  onNavigate: (v: View, p?: RiskPillar, c?: RiskCategory, s?: RiskSubcategory) => void;
}) {
  const phases = [
    { id: "experiment", label: "Eksperimenter", sub: "PoCs, sandboxes, læring", icon: "🧪" },
    { id: "pilot", label: "Pilotering", sub: "Begrænset rollout, brugergrupper", icon: "🎯" },
    { id: "production", label: "Produktion", sub: "Fuld deployment, end-users", icon: "⚙️" },
    { id: "scale", label: "Skalering", sub: "Multi-system, agentic, embedded", icon: "🌐" },
  ];

  const pillarsList: { id: RiskPillar; label: string; icon: string }[] = [
    { id: "strategy", label: "Strategi & Governance", icon: "🎯" },
    { id: "people", label: "Mennesker & Uddannelse", icon: "👥" },
    { id: "development", label: "Udvikling & Sikkerhed", icon: "🛡️" },
  ];

  // For each phase × pillar combination, curated 2 most-acute subcategory references
  // (categoryId, subcategoryId). Picks driven by where in the AI lifecycle each risk
  // typically becomes a critical concern.
  const cells: Record<string, Record<string, { c: string; s: string }[]>> = {
    experiment: {
      strategy: [
        { c: "governance-failure", s: "accountability-void" },
        { c: "governance-failure", s: "regulatory-gaps" },
      ],
      people: [
        { c: "knowledge-gaps", s: "ai-literacy" },
        { c: "knowledge-gaps", s: "security-awareness" },
      ],
      development: [
        { c: "prompt-injection", s: "direct-injection" },
        { c: "sensitive-disclosure", s: "data-leakage" },
      ],
    },
    pilot: {
      strategy: [
        { c: "competitive-dynamics", s: "solution-misalignment" },
        { c: "power-centralization", s: "vendor-lock-in" },
      ],
      people: [
        { c: "trust-adoption", s: "overreliance" },
        { c: "trust-adoption", s: "organizational-mistrust" },
      ],
      development: [
        { c: "prompt-injection", s: "indirect-injection" },
        { c: "system-prompt-leakage", s: "prompt-extraction" },
      ],
    },
    production: {
      strategy: [
        { c: "competitive-dynamics", s: "budget-resource" },
        { c: "environmental-impact", s: "energy-consumption" },
      ],
      people: [
        { c: "workforce-displacement", s: "job-displacement" },
        { c: "discrimination-bias", s: "unfair-discrimination" },
      ],
      development: [
        { c: "misinformation", s: "hallucination" },
        { c: "system-safety", s: "lack-robustness" },
      ],
    },
    scale: {
      strategy: [
        { c: "governance-failure", s: "agentic-governance-gap" },
        { c: "competitive-dynamics", s: "ai-race" },
      ],
      people: [
        { c: "knowledge-gaps", s: "agentic-literacy" },
        { c: "trust-adoption", s: "human-agent-trust" },
      ],
      development: [
        { c: "prompt-injection", s: "agent-goal-hijack" },
        { c: "inter-agent-security", s: "rogue-agents" },
      ],
    },
  };

  const findSub = (catId: string, subId: string) => {
    const cat = riskCategories.find((c) => c.id === catId);
    if (!cat) return null;
    const sub = cat.subcategories.find((s) => s.id === subId);
    if (!sub) return null;
    return { cat, sub };
  };

  return (
    <div className="mb-10 rounded-xl border border-primary/30 bg-primary/5 p-6">
      <div className="mb-1 flex items-center gap-2">
        <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">Værktøj</span>
        <h3 className="font-display text-lg font-semibold text-foreground">Risiko × adoptionsfase</h3>
      </div>
      <p className="mb-5 text-sm text-muted-foreground">
        Hvilke risici skal du fokusere på <em>lige nu</em>? Matrixen viser de mest akutte risici i hver fase af jeres AI-adoption — to per celle, klikbar for at læse mere.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="w-[16%] p-2 text-left align-bottom font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">Adoptionsfase</th>
              {pillarsList.map((p) => (
                <th key={p.id} className="p-2 text-left align-bottom">
                  <p className="font-display text-xs font-semibold text-foreground">{p.icon} {p.label}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {phases.map((phase) => (
              <tr key={phase.id} className="border-t border-border/40">
                <th className="p-3 text-left align-top">
                  <p className="font-display text-sm font-semibold text-foreground">{phase.icon} {phase.label}</p>
                  <p className="mt-1 text-[10px] font-normal text-muted-foreground">{phase.sub}</p>
                </th>
                {pillarsList.map((pillar) => {
                  const items = cells[phase.id][pillar.id];
                  return (
                    <td key={pillar.id} className="p-2 align-top">
                      <div className="flex flex-col gap-1.5">
                        {items.map((item) => {
                          const found = findSub(item.c, item.s);
                          if (!found) return null;
                          const sevAbbr =
                            found.sub.severity === "critical"
                              ? "kr."
                              : found.sub.severity === "high"
                              ? "h."
                              : found.sub.severity === "medium"
                              ? "m."
                              : "l.";
                          return (
                            <button
                              key={`${item.c}-${item.s}`}
                              onClick={() => onNavigate("subcategory", pillar.id, found.cat, found.sub)}
                              className="card-hover flex items-start gap-2 rounded-md border border-border bg-card/60 p-2 text-left"
                            >
                              <span className={`mt-0.5 shrink-0 rounded px-1 py-0.5 text-[9px] font-bold uppercase ${getSeverityColor(found.sub.severity)}`}>
                                {sevAbbr}
                              </span>
                              <span className="flex-1 text-[11px] leading-tight text-foreground">{found.sub.name}</span>
                              <ChevronRight className="ml-auto mt-0.5 h-3 w-3 shrink-0 text-muted-foreground" />
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Værktøj: Attack chain mini-diagrams (MITRE ATLAS-inspireret) ──
type AttackStep = { kind: "attacker" | "vector" | "mechanism" | "effect"; label: string; detail: string };
type AttackChainData = {
  title: string;
  atlasRef?: string;
  steps: AttackStep[];
};

const ATTACK_CHAINS: Record<string, AttackChainData> = {
  "agent-goal-hijack": {
    title: "Agent goal hijack via indirekte injektion",
    atlasRef: "MITRE ATLAS AML.T0051 + OWASP ASI01 (Planning)",
    steps: [
      { kind: "attacker", label: "Angriber", detail: "Eksternt aktør eller intern saboteur" },
      { kind: "vector", label: "Plant skjult instruktion", detail: "I et dokument der bliver RAG-indekseret, en email, et website-tag" },
      { kind: "mechanism", label: "Agent læser kilde", detail: "Agentens planning-trin behandler input som instruktion" },
      { kind: "mechanism", label: "Mål muteres", detail: "Agentens oprindelige opgave ignoreres eller subverteres" },
      { kind: "effect", label: "Uønsket handling", detail: "Tool kald med angriberens hensigt — data-eksfil, betaling, sletning" },
    ],
  },
  "indirect-injection": {
    title: "Indirekte prompt injection",
    atlasRef: "OWASP LLM01 + MITRE ATLAS AML.T0051.001",
    steps: [
      { kind: "attacker", label: "Angriber", detail: "Plant skjult tekst i offentligt indhold" },
      { kind: "vector", label: "Inficeret kilde", detail: "Email, PDF, hjemmeside, RAG-dokument, søgeresultat, OCR'd billede" },
      { kind: "mechanism", label: "AI ingerer kilden", detail: "LLM behandler tekst som instruktion uden differentiering mellem data og kommando" },
      { kind: "effect", label: "Adfærdsændring", detail: "AI'en udfører angriberens skjulte instruktion under brugerens session" },
    ],
  },
  "rogue-agents": {
    title: "Rogue agent — out-of-scope adfærd",
    atlasRef: "OWASP ASI10 (Rogue Agents) + MITRE ATLAS agentic 2026",
    steps: [
      { kind: "attacker", label: "Trigger", detail: "Adversarial input, drift, prompt injection eller fejl i guardrails" },
      { kind: "mechanism", label: "Agent forsøger out-of-scope", detail: "Action der ikke er på dens allowlist eller decision class" },
      { kind: "mechanism", label: "Guardrail blokerer", detail: "Men agenten forsøger igen — gentagne forsøg eller workaround" },
      { kind: "effect", label: "Eskalering", detail: "Uden auto-suspend opnår agenten alligevel målet eller forårsager driftforstyrrelse" },
    ],
  },
  "agentic-supply-chain": {
    title: "Agentic supply chain — kompromitteret tool eller MCP-server",
    atlasRef: "OWASP ASI04 (Supply Chain) + MITRE ATLAS AML.TA0007",
    steps: [
      { kind: "attacker", label: "Angriber", detail: "Kompromitterer et MCP-server-image, en plugin, eller en tool-leverandør" },
      { kind: "vector", label: "Distribuér malicious tool", detail: "Via offentligt registry, typosquatting (\"ai-helper-tools-v2\"), eller direkte target" },
      { kind: "mechanism", label: "Agent autoriserer tool", detail: "Tool får OAuth-token, scope, måske persistent identity" },
      { kind: "effect", label: "Bagdør i agentens kontekst", detail: "Angriber kan tilgå data agenten ser, opnå laterel bevægelse, eksfiltrere" },
    ],
  },
  "tool-misuse": {
    title: "Tool misuse — agent bruger autoriseret værktøj på uautoriseret måde",
    atlasRef: "OWASP ASI02 (Tool Use) + MITRE ATLAS AML.T0048",
    steps: [
      { kind: "attacker", label: "Anstødssten", detail: "Prompt injection, ambivalent brugerinstruktion, eller agent-confusion" },
      { kind: "mechanism", label: "Agent har gyldig autorisation", detail: "Tool er på allowlist, scope er rigtigt, token er gyldig" },
      { kind: "mechanism", label: "Bruger til andet formål", detail: "Fx 'list files' bruges til at fingerprinte system, 'send email' til phishing-kampagne mod kolleger" },
      { kind: "effect", label: "Skadelig handling med ren autorisationssti", detail: "Audit-log viser legitim brug — sværere at detektere uden adfærdsbaseline" },
    ],
  },
  "memory-context-poisoning": {
    title: "Memory / context poisoning",
    atlasRef: "OWASP ASI06 (Memory)",
    steps: [
      { kind: "attacker", label: "Angriber", detail: "Plant falske 'memories' i agentens vector store eller conversation history" },
      { kind: "vector", label: "Persistent injection", detail: "Skadelig fact gemmes som hvis det var brugerens preference eller virksomheds-policy" },
      { kind: "mechanism", label: "Senere session bruger memory", detail: "Agent henter falsk memory og bruger det som troværdigt grundlag" },
      { kind: "effect", label: "Vedvarende kompromittering", detail: "Påvirker alle fremtidige sessions for samme bruger eller på tværs — cross-tenant" },
    ],
  },
};

function AttackChain({ subcategoryId }: { subcategoryId: string }) {
  const data = ATTACK_CHAINS[subcategoryId];
  if (!data) return null;

  const stepColor = (kind: AttackStep["kind"]) => {
    switch (kind) {
      case "attacker":
        return "border-danger/40 bg-danger/10 text-danger";
      case "vector":
        return "border-warning/40 bg-warning/10 text-warning";
      case "mechanism":
        return "border-info/40 bg-info/10 text-info";
      case "effect":
        return "border-danger/40 bg-danger/15 text-danger";
    }
  };
  const stepLabel = (kind: AttackStep["kind"]) => {
    switch (kind) {
      case "attacker":
        return "Aktør";
      case "vector":
        return "Vektor";
      case "mechanism":
        return "Mekanisme";
      case "effect":
        return "Effekt";
    }
  };

  return (
    <div className="mb-8 rounded-xl border border-primary/30 bg-primary/5 p-6">
      <div className="mb-1 flex items-center gap-2">
        <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">Værktøj</span>
        <h3 className="font-display text-base font-semibold text-foreground">⚡ Attack chain — {data.title}</h3>
      </div>
      {data.atlasRef && (
        <p className="mb-4 text-[11px] text-muted-foreground">Reference: {data.atlasRef}</p>
      )}
      <div className="flex flex-wrap items-stretch gap-2 md:flex-nowrap">
        {data.steps.map((step, i) => (
          <div key={i} className="flex flex-1 items-stretch gap-2">
            <div className={`flex flex-1 flex-col gap-1 rounded-lg border p-3 ${stepColor(step.kind)}`}>
              <span className="text-[9px] font-bold uppercase tracking-wide opacity-70">{stepLabel(step.kind)}</span>
              <p className="font-display text-xs font-semibold leading-tight">{step.label}</p>
              <p className="text-[10px] leading-snug opacity-80">{step.detail}</p>
            </div>
            {i < data.steps.length - 1 && (
              <ChevronRight className="my-auto hidden h-5 w-5 shrink-0 text-muted-foreground md:block" />
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-muted-foreground">
        Forsvar mod denne kæde kræver kontroller flere steder — ikke kun ved input. Se mitigeringsstrategierne nedenfor.
      </p>
    </div>
  );
}

// ── Værktøj: Threat actor × AI asset matrix ──
function ThreatActorAssetMatrix() {
  const actors = [
    { id: "insider", label: "Insider", note: "Utilfreds eller kompromitteret medarbejder" },
    { id: "opportunist", label: "Eksternt opportunist", note: "Ransomware-grupper, script kiddies" },
    { id: "nation", label: "Nation-state", note: "Advanced persistent threat" },
    { id: "supply", label: "Supply chain", note: "Kompromitteret leverandør / MCP-server / plugin" },
    { id: "competitor", label: "Konkurrent", note: "Industrispionage, IP-tyveri" },
  ];

  const assets = [
    { id: "training", label: "Træningsdata" },
    { id: "weights", label: "Modelvægte" },
    { id: "rag", label: "RAG-korpus" },
    { id: "prompt", label: "System prompt" },
    { id: "identity", label: "Agent-identiteter" },
    { id: "output", label: "Output / inference" },
  ];

  type Level = "critical" | "high" | "medium" | "low" | "na";
  type Cell = { level: Level; tech: string };

  const cells: Record<string, Record<string, Cell>> = {
    insider: {
      training: { level: "high", tech: "Label manipulation, etikettering" },
      weights: { level: "critical", tech: "Direkte modeltyveri (legitim adgang)" },
      rag: { level: "high", tech: "Indsætter giftige dokumenter" },
      prompt: { level: "high", tech: "Lækage via chat / screenshot" },
      identity: { level: "critical", tech: "Persistent agent-access efter offboard" },
      output: { level: "medium", tech: "Ikke-autoriseret brug af model" },
    },
    opportunist: {
      training: { level: "low", tech: "Sjældent — kræver indre adgang" },
      weights: { level: "high", tech: "Model extraction via API-distillation" },
      rag: { level: "high", tech: "Indirekte prompt injection via offentligt indhold" },
      prompt: { level: "high", tech: "Prompt extraction-angreb" },
      identity: { level: "high", tech: "Credential stuffing, OAuth-misbrug" },
      output: { level: "medium", tech: "Sensitive info disclosure (LLM06)" },
    },
    nation: {
      training: { level: "critical", tech: "Subtle backdoor-poisoning over tid" },
      weights: { level: "critical", tech: "Advanced extraction + reverse-eng" },
      rag: { level: "critical", tech: "Målrettet disinfo-plantning + cross-tenant" },
      prompt: { level: "critical", tech: "Sofistikerede multi-turn extraction-kæder" },
      identity: { level: "critical", tech: "Compromise + langvarig persistens" },
      output: { level: "critical", tech: "Målrettet manipulation af specifikke brugere" },
    },
    supply: {
      training: { level: "critical", tech: "Pre-trained model poisoning (HuggingFace)" },
      weights: { level: "critical", tech: "LoRA / adapter backdoor i delt model" },
      rag: { level: "high", tech: "Vendor leverer korrupt referencedata" },
      prompt: { level: "high", tech: "Pre-baked prompts i 3rd party template" },
      identity: { level: "critical", tech: "OAuth/token compromise via MCP-server" },
      output: { level: "high", tech: "Backdoored output via plugin / kompromitteret API" },
    },
    competitor: {
      training: { level: "low", tech: "Sjældent — kræver indre adgang" },
      weights: { level: "high", tech: "API reverse-engineering, behavior cloning" },
      rag: { level: "medium", tech: "Begrænset adgang" },
      prompt: { level: "high", tech: "Prompt extraction afslører konkurrencefordel" },
      identity: { level: "low", tech: "Begrænset relevans" },
      output: { level: "high", tech: "Output scraping for at træne egne modeller" },
    },
  };

  const levelStyle = (level: Level) => {
    switch (level) {
      case "critical":
        return { cls: "bg-danger/15 text-danger border-danger/30", label: "Kritisk" };
      case "high":
        return { cls: "bg-warning/15 text-warning border-warning/30", label: "Høj" };
      case "medium":
        return { cls: "bg-info/15 text-info border-info/30", label: "Middel" };
      case "low":
        return { cls: "bg-success/15 text-success border-success/30", label: "Lav" };
      case "na":
        return { cls: "bg-muted/20 text-muted-foreground/60 border-border/40", label: "N/A" };
    }
  };

  return (
    <div className="mb-8 rounded-xl border border-primary/30 bg-primary/5 p-6">
      <div className="mb-1 flex items-center gap-2">
        <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-primary-foreground">Værktøj</span>
        <h3 className="font-display text-lg font-semibold text-foreground">Trusselsaktør × AI-aktiv</h3>
      </div>
      <p className="mb-5 text-sm text-muted-foreground">
        Hvem prøver at kompromittere hvad? Brug matrixen til at scope jeres threat modelling — ikke alle aktører er interesseret i alle aktiver, og forskellige aktører kræver forskellige forsvar. Hold musen over en celle for den konkrete teknik.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-[22%] bg-card p-2 text-left align-bottom font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground">Aktør</th>
              {assets.map((a) => (
                <th key={a.id} className="p-2 text-center align-bottom">
                  <p className="font-display text-[11px] font-semibold text-foreground">{a.label}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {actors.map((a) => (
              <tr key={a.id} className="border-t border-border/40">
                <th className="sticky left-0 z-10 bg-card/80 p-3 text-left align-top">
                  <p className="font-display text-[12px] font-semibold text-foreground">{a.label}</p>
                  <p className="mt-0.5 text-[10px] font-normal leading-tight text-muted-foreground">{a.note}</p>
                </th>
                {assets.map((asset) => {
                  const cell = cells[a.id][asset.id];
                  const sty = levelStyle(cell.level);
                  return (
                    <td key={asset.id} className="p-1 align-middle">
                      <div
                        className={`mx-auto flex h-8 w-full max-w-[80px] items-center justify-center rounded border px-1 font-display text-[10px] font-semibold ${sty.cls}`}
                        title={`${sty.label}: ${cell.tech}`}
                      >
                        {sty.label}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-1.5 text-[10px] md:grid-cols-4">
        {(["critical", "high", "medium", "low"] as Level[]).map((level) => {
          const sty = levelStyle(level);
          return (
            <span key={level} className="inline-flex items-center gap-1.5">
              <span className={`inline-block h-3 w-6 rounded ${sty.cls.split(" ")[0]}`} />
              <span className="text-muted-foreground">{sty.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ── Pillar View ──
function PillarView({
  pillar,
  onNavigate,
  onBack,
}: {
  pillar: RiskPillar;
  onNavigate: (v: View, p?: RiskPillar, c?: RiskCategory) => void;
  onBack: () => void;
}) {
  const pillarData = pillars.find((p) => p.id === pillar)!;
  const categories = getRisksByPillar(pillar);

  return (
    <div className="fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Tilbage til overblik
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{pillarData.icon}</span>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">{pillarData.name}</h2>
            <p className="text-sm text-primary/70">{pillarData.subtitle}</p>
          </div>
        </div>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{pillarData.description}</p>
      </div>

      {/* Værktøj: Threat actor × AI asset matrix (kun Udvikling-pillar) */}
      {pillar === "development" && <ThreatActorAssetMatrix />}

      <div className="grid gap-4">
        {categories.map((cat) => {
          const criticals = cat.subcategories.filter((s) => s.severity === "critical").length;
          const highs = cat.subcategories.filter((s) => s.severity === "high").length;
          return (
            <button
              key={cat.id}
              onClick={() => onNavigate("category", pillar, cat)}
              className="card-hover flex items-center gap-5 rounded-lg border border-border bg-card p-5 text-left"
            >
              <span className="text-2xl">{cat.icon}</span>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold text-foreground">{cat.name}</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{cat.description}</p>
                <div className="mt-2 flex gap-2">
                  {criticals > 0 && (
                    <span className="rounded bg-danger/15 px-2 py-0.5 text-[10px] font-medium text-danger">
                      {criticals} kritiske
                    </span>
                  )}
                  {highs > 0 && (
                    <span className="rounded bg-warning/15 px-2 py-0.5 text-[10px] font-medium text-warning">
                      {highs} høje
                    </span>
                  )}
                  <span className="rounded bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                    {cat.subcategories.length} sub-risici
                  </span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Category View ──
function CategoryView({
  category,
  onNavigate,
  onBack,
}: {
  category: RiskCategory;
  onNavigate: (v: View, p?: RiskPillar, c?: RiskCategory, s?: RiskSubcategory) => void;
  onBack: () => void;
}) {
  const [expandedSource, setExpandedSource] = useState(false);

  return (
    <div className="fade-in">
      <button onClick={onBack} className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Tilbage
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{category.icon}</span>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">{category.name}</h2>
            <span className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground capitalize">
              {category.pillar === "strategy" ? "strategi" : category.pillar === "people" ? "mennesker" : "udvikling"}-søjle
            </span>
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{category.description}</p>
      </div>

      {/* Underkategorier */}
      <div className="mb-8 grid gap-4">
        {category.subcategories.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onNavigate("subcategory", category.pillar, category, sub)}
            className={`card-hover rounded-lg border p-5 text-left ${getSeverityBg(sub.severity)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-display text-sm font-semibold text-foreground">{sub.name}</p>
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${getSeverityColor(sub.severity)}`}>
                    {sub.severity === "critical" ? "kritisk" : sub.severity === "high" ? "høj" : sub.severity === "medium" ? "middel" : "lav"}
                  </span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{sub.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {sub.tags.map((tag) => (
                    <span key={tag} className="rounded bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <ChevronRight className="ml-4 mt-1 h-5 w-5 shrink-0 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>

      {/* Kildelinks */}
      <div className="rounded-lg border border-border bg-card p-5">
        <button
          onClick={() => setExpandedSource(!expandedSource)}
          className="flex w-full items-center justify-between"
        >
          <h3 className="font-display text-sm font-semibold text-foreground">
            📎 Kildereferencer ({category.sourceLinks.length})
          </h3>
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedSource ? "rotate-180" : ""}`} />
        </button>
        {expandedSource && (
          <div className="mt-4 grid gap-2">
            {category.sourceLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded border border-border p-3 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${link.source === "MIT" ? "bg-info/15 text-info" : "bg-warning/15 text-warning"}`}>
                  {link.source}
                </span>
                <span className="flex-1">{link.label}</span>
                <ExternalLink className="h-3 w-3 shrink-0" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Subcategory View ──
function SubcategoryView({
  subcategory,
  category,
  onBack,
}: {
  subcategory: RiskSubcategory;
  category: RiskCategory;
  onBack: () => void;
}) {
  return (
    <div className="fade-in max-w-3xl">
      <button onClick={onBack} className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Tilbage til {category.name}
      </button>

      {/* Header */}
      <div className={`mb-8 rounded-xl border p-6 ${getSeverityBg(subcategory.severity)}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{category.icon}</span>
          <span className={`rounded px-2 py-0.5 text-xs font-bold uppercase ${getSeverityColor(subcategory.severity)}`}>
            {subcategory.severity === "critical" ? "kritisk" : subcategory.severity === "high" ? "høj" : subcategory.severity === "medium" ? "middel" : "lav"} alvorlighed
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground">{subcategory.name}</h2>
        <p className="mt-3 text-sm text-secondary-foreground leading-relaxed">{subcategory.description}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {subcategory.tags.map((tag) => (
            <span key={tag} className="rounded bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Værktøj: MITRE ATLAS-inspireret attack chain (kun udvalgte subkategorier) */}
      <AttackChain subcategoryId={subcategory.id} />

      {/* Mitigeringsstrategier */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 font-display text-lg font-semibold text-foreground">🛡️ Mitigeringsstrategier</h3>
        <div className="grid gap-3">
          {subcategory.mitigations.map((mit, i) => (
            <div key={i} className="flex gap-3 rounded-lg border border-border bg-secondary/50 p-4">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-success/15 text-xs font-bold text-success">
                {i + 1}
              </div>
              <p className="text-sm text-secondary-foreground">{mit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Detaljerede referencer */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 font-display text-lg font-semibold text-foreground">
          🔗 Detaljerede referencer
        </h3>
        <p className="mb-4 text-xs text-muted-foreground">
          Klik igennem for fulde mitigeringsdetaljer, dokumentation og forskning i de originale repositories.
        </p>
        <div className="grid gap-2">
          {subcategory.mitLinks.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover flex items-center gap-3 rounded-lg border border-border p-4"
            >
              <span className={`rounded px-2 py-1 text-[10px] font-bold ${link.source === "MIT" ? "bg-info/15 text-info" : "bg-warning/15 text-warning"}`}>
                {link.source}
              </span>
              <span className="flex-1 text-sm text-secondary-foreground">{link.label}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>

      {/* Sparring CTA */}
      <div className="mt-8 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
        <h3 className="font-display text-lg font-semibold text-foreground">Brug for sparring på denne risiko?</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Book et 30-min sparringsmøde med AI Rådgivning — vi hjælper danske organisationer med at vurdere, mitigere og styre AI-risici i praksis.
        </p>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          Book 30-min sparring
        </a>
      </div>
    </div>
  );
}

// ── Newsletter + main CTA strip ──
function NewsletterCTA() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const formData = new FormData();
      formData.append("fields[email]", email);
      formData.append("ml-submit", "1");
      formData.append("anticsrf", "true");
      await fetch(MAILERLITE_ACTION, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="border-t border-border bg-card/30 py-12">
      <div className="container mx-auto grid gap-8 px-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="font-display text-lg font-semibold text-foreground">📬 Nyhedsbrev: AI Sikkerhed i praksis</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Månedlig opdatering om AI-risici, nye OWASP-/MIT-frameworks, threat intelligence og praktiske mitigeringer for danske virksomheder.
          </p>
          {status === "success" ? (
            <div className="mt-4 rounded-md border border-success/30 bg-success/10 p-4 text-sm text-success">
              ✓ Tak! Du er nu tilmeldt — tjek din indbakke for bekræftelse.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="din@email.dk"
                disabled={status === "loading"}
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === "loading" ? "Tilmelder…" : "Tilmeld"}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 text-xs text-danger">Noget gik galt. Prøv igen om lidt.</p>
          )}
        </div>
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
          <h3 className="font-display text-lg font-semibold text-foreground">🗓️ Book 30-min sparring</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Konkret sparring om jeres AI-risikobillede — kortlægning, mitigeringer, governance, leverandørsikkerhed eller noget helt andet.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Book et møde
          </a>
        </div>
      </div>
    </section>
  );
}

export default Index;
