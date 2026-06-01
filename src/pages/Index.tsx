import { useState, type FormEvent } from "react";
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

  const filteredCategories = searchQuery
    ? riskCategories.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.subcategories.some(
            (s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              s.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
          )
      )
    : [];

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
                type="text"
                placeholder="Søg i risici..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-64 rounded-md border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
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
                ({filteredCategories.length} kategorier fundet)
              </span>
            </h2>
            {filteredCategories.length > 0 ? (
              <div className="grid gap-3">
                {filteredCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSearchQuery("");
                      navigate("category", cat.pillar, cat);
                    }}
                    className="card-hover flex items-center gap-4 rounded-lg border border-border bg-card p-4 text-left"
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <div className="flex-1">
                      <p className="font-display text-sm font-semibold text-foreground">{cat.name}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{cat.description}</p>
                    </div>
                    <span className="rounded border border-border px-2 py-0.5 text-xs text-muted-foreground capitalize">
                      {cat.pillar}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Ingen risici matcher din søgning.</p>
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
function DashboardView({ onNavigate }: { onNavigate: (v: View, p?: RiskPillar) => void }) {
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
          Omfattende risikovurdering på tværs af Strategi, Mennesker og Udvikling — baseret på MIT AI Risk Repository (1700+ risici, 7 domæner), OWASP Top 10 for LLM'er 2025, OWASP Top 10 for Agentiske Applikationer 2026 og OWASP Agentic Security Initiative-guides.
        </p>
      </div>

      {/* Statistik */}
      <div className="mb-10 grid grid-cols-4 gap-4">
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
              <p className="font-display text-sm font-semibold text-foreground">MIT AI Risk Repository</p>
              <p className="mt-1 text-xs text-muted-foreground">
                1700+ AI-risici på tværs af 7 domæner og 24 underdomæner. Inkluderer kausale og domæne-taksonomier med dokumentation fra 74 frameworks.
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
