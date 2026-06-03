export type RiskSeverity = "critical" | "high" | "medium" | "low";
export type RiskPillar = "strategy" | "people" | "development";
export type SourceType =
  | "MIT"
  | "OWASP"
  | "CVE"
  | "MSRC"
  | "Research"
  | "CSA"
  | "Industry"
  | "EU";

export interface RiskSubcategory {
  id: string;
  name: string;
  description: string;
  severity: RiskSeverity;
  mitigations: string[];
  mitLinks: { label: string; url: string; source: SourceType }[];
  tags: string[];
}

export interface RiskCategory {
  id: string;
  name: string;
  pillar: RiskPillar;
  icon: string;
  description: string;
  subcategories: RiskSubcategory[];
  sourceLinks: { label: string; url: string; source: SourceType }[];
}

export interface Pillar {
  id: RiskPillar;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  riskCount: number;
}

// MIT AI Risk Repository v4 (released 4 Dec 2025) — 1700+ risks across 9 frameworks, including agentic AI
const MIT_SPREADSHEET = "https://airisk.mit.edu/";
const MIT_PREPRINT = "https://doi.org/10.48550/arXiv.2408.12622";

// 2026 incident references
const CVE_ECHOLEAK = "https://nvd.nist.gov/vuln/detail/cve-2025-32711";
const MSRC_ECHOLEAK = "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-32711";
const AIM_LABS_ECHOLEAK = "https://arxiv.org/abs/2509.10540";
const CVE_COPILOT_RCE = "https://www.cve.org/CVERecord?id=CVE-2025-53773";
const MSRC_COPILOT_RCE = "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-53773";
const REHBERGER_COPILOT = "https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/";
const CSA_A2A = "https://cloudsecurityalliance.org/blog/2025/04/30/threat-modeling-google-s-a2a-protocol-with-the-maestro-framework";
const A2A_BENCHMARK = "https://arxiv.org/pdf/2507.21146";
const A2A_SAFEGUARDS = "https://arxiv.org/abs/2505.12490";
const CYBERHAVEN_REPORT = "https://www.cyberhaven.com/resources/report/ai-adoption-risk-report-2026";
const MS_WTI_2026 = "https://www.microsoft.com/en-us/worklab/work-trend-index";
const MODEL_EXTRACTION_SURVEY = "https://arxiv.org/abs/2506.22521";
const REHBERGER_SPAIWARE = "https://embracethered.com/blog/posts/2024/chatgpt-hacking-memories/";
const MEMORYGRAFT = "https://arxiv.org/pdf/2512.16962";
const PROMPTFOO_CROSSUSER = "https://www.promptfoo.dev/lm-security-db/vuln/benign-cross-user-contamination-6ea37d04";
const LITELLM_INCIDENT = "https://www.trendmicro.com/en_us/research/26/c/inside-litellm-supply-chain-compromise.html";
const EU_AIACT_ART15 = "https://artificialintelligenceact.eu/article/15/";
const EU_AIACT_ART9 = "https://artificialintelligenceact.eu/article/9/";
const NIST_RMF_MAPPING = "https://www.nist.gov/itl/ai-risk-management-framework";

export const pillars: Pillar[] = [
  {
    id: "strategy",
    name: "Strategi & Governance",
    subtitle: "Afstemning, budget & compliance",
    description: "Risici fra utilstrækkelig AI-strategi, governance-rammer, manglende regeloverholdelse, forkert budgetallokering og fejlvalg af AI-løsninger.",
    icon: "🎯",
    riskCount: 20,
  },
  {
    id: "people",
    name: "Mennesker & Uddannelse",
    subtitle: "Kompetencer, tillid & adoption",
    description: "Risici fra videns-gaps, fortrængning af arbejdsstyrken, organisatorisk mistillid, utilstrækkelig uddannelse og manglende AI-forståelse på tværs af teams.",
    icon: "👥",
    riskCount: 14,
  },
  {
    id: "development",
    name: "Udvikling & Sikkerhed",
    subtitle: "Tekniske risici & sårbarheder",
    description: "Tekniske risici herunder prompt injection, dataforgiftning, modelsårbarheder, fejlhåndtering af output, forsyningskædeangreb og agentiske AI-trusler.",
    icon: "🛡️",
    riskCount: 43,
  },
];

export const riskCategories: RiskCategory[] = [
  // ── STRATEGI & GOVERNANCE ──
  {
    id: "governance-failure",
    name: "Governance-svigt",
    pillar: "strategy",
    icon: "⚖️",
    description: "Utilstrækkelige regulatoriske rammer og tilsynsmekanismer, der ikke følger med AI-udviklingen, hvilket fører til ineffektiv styring.",
    subcategories: [
      {
        id: "regulatory-gaps",
        name: "Regulatoriske & politiske huller",
        description: "Fravær af klare AI-politikker, etiske retningslinjer eller compliance-rammer inden for organisationen.",
        severity: "critical",
        mitigations: [
          "Etablér et AI-governance-board med tværfaglig repræsentation",
          "Udvikl og vedligehold en AI-politikramme tilpasset branchestandarder",
          "Gennemfør regelmæssige vurderinger af det regulatoriske landskab",
        ],
        mitLinks: [
          { label: "MIT: Governance Failure Domain", url: MIT_SPREADSHEET, source: "MIT" },
          { label: "OWASP: Governance Checklist", url: "https://genai.owasp.org/resource/llm-applications-cybersecurity-and-governance-checklist-english/", source: "OWASP" },
          { label: "OWASP: State of Agentic AI Security & Governance", url: "/docs/State-of-Agentic-AI-Security-Governance.pdf", source: "OWASP" },
        ],
        tags: ["compliance", "politik", "regulering"],
      },
      {
        id: "accountability-void",
        name: "Ansvarligheds- & tilsynsvakuum",
        description: "Intet klart ejerskab eller ansvar for AI-beslutninger, resultater eller hændelser i organisationen.",
        severity: "high",
        mitigations: [
          "Definér RACI-matricer for AI-initiativer",
          "Implementér hændelsesresponsprocedurer for AI",
          "Etablér klare eskaleringsveje for AI-relaterede problemer",
        ],
        mitLinks: [
          { label: "MIT: Governance Failure Details", url: MIT_SPREADSHEET, source: "MIT" },
          { label: "OWASP: State of Agentic AI Governance", url: "/docs/State-of-Agentic-AI-Security-Governance.pdf", source: "OWASP" },
        ],
        tags: ["ansvarlighed", "tilsyn"],
      },
      {
        id: "agentic-governance-gap",
        name: "Agentisk AI governance-hul",
        description: "Manglende udvidelse af governance-rammer til autonome AI-agenter, hvilket efterlader huller i tilsynet med agentidentitet, rettigheder og adfærdsintegritet.",
        severity: "critical",
        mitigations: [
          "Etablér agentspecifikke governance-politikker dækkende agentidentitet, rettigheder og livscyklus",
          "Implementér MCP-server governance-workflows med indsendelse, scanning og godkendelsesprocesser",
          "Vedligehold et betroet register over godkendte agenter, værktøjer og MCP-servere",
          "Kræv menneskelig godkendelse ved nye agentimplementeringer og rettighedsændringer",
        ],
        mitLinks: [
          { label: "OWASP: State of Agentic AI Security & Governance", url: "/docs/State-of-Agentic-AI-Security-Governance.pdf", source: "OWASP" },
          { label: "OWASP: MCP Servers Security Cheat Sheet", url: "/docs/MCP-Servers-Security-CheatSheet.pdf", source: "OWASP" },
        ],
        tags: ["agentisk", "governance", "MCP", "agentidentitet"],
      },
      {
        id: "shadow-ai",
        name: "Shadow AI & shadow agents",
        description: "Uautoriseret brug af AI-værktøjer og egen-byggede agenter uden om godkendt governance. Cyberhaven 2026: 39,7% af AI-interaktioner indeholder følsomme data, ~98% af organisationer har shadow AI. Mellem-laget af shadow agents (egen-byggede LLM-integrationer der overlever deres skaber) er en ny og særligt vanskelig vektor.",
        severity: "high",
        mitigations: [
          "Udrul en AI-gateway/proxy foran godkendte LLM'er med DLP-egress-inspektion; blokér direkte browser-adgang til usanktionerede endpoints på firewall/SASE-niveau",
          "Inventér AI-agenter med samme disciplin som SaaS: CASB-discovery + identitetslogs afdækker unsanctioned brug",
          "Publicér en kort, sanktioneret AI-værktøjsliste med klassifikationsregler; kombinér med uddannelse, ikke kun blokering",
          "Anvend dataklassifikationsetiketter (Purview/MIP) og blokér 'Fortroligt+' fra at forlade sanktionerede LLM'er",
          "Kræv navngivet ejerskab for hver intern agent (register + udløbsdato) for at undgå at shadow agents overlever deres skaber",
        ],
        mitLinks: [
          { label: "Cyberhaven: AI Adoption & Risk Report 2026", url: CYBERHAVEN_REPORT, source: "Industry" },
          { label: "Microsoft Work Trend Index 2026", url: MS_WTI_2026, source: "Industry" },
        ],
        tags: ["shadow-ai", "DLP", "AI-gateway", "agent-register"],
      },
      {
        id: "eu-ai-act-security-mapping",
        name: "EU AI Act ↔ sikkerheds-frameworks (Art 9/15)",
        description: "EU AI Act Art 9 (risikostyring) og Art 15 (nøjagtighed, robusthed, cybersikkerhed) er de to artikler der mest direkte stiller sikkerhedskrav til høj-risiko AI-systemer. De mapper til NIST AI RMF MS-2.5/2.6/2.7 og ISO/IEC 42001 — som igen udvider ISO 27001. Fulde bøder (op til €35M / 7% omsætning) gælder fra 2. august 2026.",
        severity: "medium",
        mitigations: [
          "Byg en kontrol-matrix: EU AI Act Art 9/15 → NIST AI RMF MS-2.5/2.6/2.7 → ISO 42001 → eksisterende ISO 27001/SOC 2-kontroller. Genbrug eksisterende evidens hvor muligt",
          "Brug OWASP LLM Top 10 (2025) som teknisk test-katalog for Art 15-krav om robusthed og cybersikkerhed",
          "Dokumentér adversarial testing, model-evasion og post-market monitoring (Art 72) som del af jeres ISO 27001 ISMS",
          "Map MIT AI Risk Repository-kategorier til jeres risikoregister så identifikation er reviderbar",
          "Udpeg én accountable rolle (AI risk owner) der bygger bro mellem CISO, DPO og produkt — Art 9 forventer livscyklus-ejerskab",
        ],
        mitLinks: [
          { label: "EU AI Act Art 15 (robusthed & cybersikkerhed)", url: EU_AIACT_ART15, source: "EU" },
          { label: "EU AI Act Art 9 (risikostyringssystem)", url: EU_AIACT_ART9, source: "EU" },
          { label: "NIST AI Risk Management Framework", url: NIST_RMF_MAPPING, source: "Research" },
        ],
        tags: ["EU-AI-Act", "compliance", "NIST-AI-RMF", "ISO-42001"],
      },
    ],
    sourceLinks: [
      { label: "MIT AI Risk Repository – Socioeconomic Domain (6.5)", url: MIT_SPREADSHEET, source: "MIT" },
      { label: "OWASP Governance Checklist", url: "https://genai.owasp.org/resource/llm-applications-cybersecurity-and-governance-checklist-english/", source: "OWASP" },
      { label: "OWASP State of Agentic AI Security & Governance v1.0", url: "/docs/State-of-Agentic-AI-Security-Governance.pdf", source: "OWASP" },
    ],
  },
  {
    id: "competitive-dynamics",
    name: "Konkurrencedynamik & strategirisiko",
    pillar: "strategy",
    icon: "🏁",
    description: "Risici fra AI-'kapløb'-dynamikker, valg af forkerte løsninger, forkert budgetallokering eller manglende tilpasning af AI-strategi til forretningsmål.",
    subcategories: [
      {
        id: "solution-misalignment",
        name: "Løsningsfejltilpasning",
        description: "Valg af AI-løsninger, der ikke passer til organisationens behov, med spild af ressourcer og tabte muligheder til følge.",
        severity: "high",
        mitigations: [
          "Gennemfør grundig behovsanalyse inden AI-anskaffelse",
          "Pilottest AI-løsninger i kontrollerede miljøer før fuld udrulning",
          "Fastlæg evalueringskriterier tilpasset forretningsmål",
        ],
        mitLinks: [
          { label: "MIT: Competitive Dynamics", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["strategi", "anskaffelse", "tilpasning"],
      },
      {
        id: "budget-resource",
        name: "Budget- & ressourcemangel",
        description: "Undervurdering af de samlede omkostninger ved AI-initiativer inklusive infrastruktur, talent, vedligeholdelse og løbende uddannelse.",
        severity: "medium",
        mitigations: [
          "Udvikl omfattende TCO-modeller for AI-initiativer",
          "Allokér reservebudgetter til AI-projekter",
          "Planlæg for løbende driftsomkostninger ud over den indledende implementering",
        ],
        mitLinks: [
          { label: "MIT: Socioeconomic Risks", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["budget", "ressourcer", "planlægning"],
      },
      {
        id: "ai-race",
        name: "AI-kapløbspres",
        description: "Forhastet AI-adoption for at følge med konkurrenter, med potentiel udrulning af usikre eller dårligt testede systemer.",
        severity: "high",
        mitigations: [
          "Fastlæg minimumsstandarder for sikkerhed og kvalitet før udrulning",
          "Implementér trinvis udrulningsprocesser",
          "Afbalancér adoptionshastighed med grundig risikovurdering",
        ],
        mitLinks: [
          { label: "MIT: Competitive Dynamics (6.4)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["konkurrence", "sikkerhed", "udrulning"],
      },
    ],
    sourceLinks: [
      { label: "MIT AI Risk Repository – Competitive Dynamics (6.4)", url: MIT_SPREADSHEET, source: "MIT" },
    ],
  },
  {
    id: "power-centralization",
    name: "Magtcentralisering & ulighed",
    pillar: "strategy",
    icon: "🏛️",
    description: "AI-drevet koncentration af magt og ressourcer, der fører til ulige fordeling af fordele og øget organisatorisk eller samfundsmæssig ulighed.",
    subcategories: [
      {
        id: "benefit-distribution",
        name: "Uretfærdig fordeling af fordele",
        description: "AI-fordele, der primært tilfalder bestemte teams, roller eller ledelsesniveauer, mens andre efterlades.",
        severity: "medium",
        mitigations: [
          "Sikr at AI-værktøjer er tilgængelige på tværs af afdelinger",
          "Overvåg og rapportér om fordelingen af AI-fordele",
          "Inkludér diverse interessenter i AI-beslutningstagning",
        ],
        mitLinks: [
          { label: "MIT: Power Centralization (6.1)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["lighed", "adgang", "retfærdighed"],
      },
      {
        id: "vendor-lock-in",
        name: "Leverandørlåsning & afhængighed",
        description: "Overafhængighed af enkelte AI-leverandører, der skaber strategisk sårbarhed og reducerer forhandlingskraft.",
        severity: "medium",
        mitigations: [
          "Oprethold en multi-leverandør AI-strategi",
          "Sikr dataportabilitet i leverandørkontrakter",
          "Opbyg interne kompetencer sideløbende med eksterne løsninger",
        ],
        mitLinks: [
          { label: "OWASP: Supply Chain Risks", url: "https://genai.owasp.org/llmrisk/llm032025-supply-chain/", source: "OWASP" },
        ],
        tags: ["leverandør", "afhængighed", "strategi"],
      },
    ],
    sourceLinks: [
      { label: "MIT AI Risk Repository – Power Centralization (6.1)", url: MIT_SPREADSHEET, source: "MIT" },
    ],
  },
  {
    id: "environmental-impact",
    name: "Miljøpåvirkning",
    pillar: "strategy",
    icon: "🌍",
    description: "Miljøskader fra AI-udvikling og -drift herunder energiforbrug, CO₂-aftryk og hardwareaffald.",
    subcategories: [
      {
        id: "energy-consumption",
        name: "Energi- & CO₂-aftryk",
        description: "Højt energiforbrug ved AI-træning og inferens, der bidrager til miljøforringelse.",
        severity: "medium",
        mitigations: [
          "Vælg energieffektive AI-modeller og infrastruktur",
          "Overvåg og rapportér AI's CO₂-aftryk",
          "Overvej mindre, mere effektive modeller hvor det er passende",
        ],
        mitLinks: [
          { label: "MIT: Environmental Harm (6.6)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["miljø", "bæredygtighed", "energi"],
      },
    ],
    sourceLinks: [
      { label: "MIT AI Risk Repository – Environmental Harm (6.6)", url: MIT_SPREADSHEET, source: "MIT" },
    ],
  },

  // ── MENNESKER & UDDANNELSE ──
  {
    id: "knowledge-gaps",
    name: "Videns-gaps & mangel på kompetencer",
    pillar: "people",
    icon: "📚",
    description: "Utilstrækkelig AI-forståelse og kompetencer på tværs af organisationen, som skaber videns-gaps der hæmmer effektiv AI-adoption og governance.",
    subcategories: [
      {
        id: "ai-literacy",
        name: "AI-forståelsesunderskud",
        description: "Medarbejdere mangler grundlæggende forståelse af AI's muligheder, begrænsninger og passende anvendelsesområder.",
        severity: "high",
        mitigations: [
          "Udvikl trinvise AI-uddannelsesprogrammer for alle organisationsniveauer",
          "Skab et netværk af AI-ambassadører inden for afdelingerne",
          "Tilbyd praktiske workshops og sandkassemiljøer",
        ],
        mitLinks: [
          { label: "MIT: Human-Computer Interaction Risks", url: MIT_SPREADSHEET, source: "MIT" },
          { label: "OWASP: Getting Started Guide", url: "https://genai.owasp.org/introduction-genai-security-project/", source: "OWASP" },
        ],
        tags: ["uddannelse", "forståelse", "kompetence"],
      },
      {
        id: "security-awareness",
        name: "Sikkerhedsbevidsthedshul",
        description: "Brugere er uvidende om AI-specifikke sikkerhedsrisici som prompt injection, datalæk eller social engineering via AI.",
        severity: "critical",
        mitigations: [
          "Inkludér AI-sikkerhed i sikkerhedsbevidsthedsuddannelsen",
          "Kør AI-specifikke phishing- og social engineering-simuleringer",
          "Udarbejd klare retningslinjer for sikker brug af AI-værktøjer",
        ],
        mitLinks: [
          { label: "OWASP: LLM Top 10 Overview", url: "https://genai.owasp.org/llm-top-10/", source: "OWASP" },
          { label: "OWASP: Sensitive Info Disclosure", url: "https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/", source: "OWASP" },
          { label: "OWASP: Agentic AI Threats & Mitigations", url: "/docs/Agentic-AI-Threats-and-Mitigations.pdf", source: "OWASP" },
        ],
        tags: ["sikkerhed", "bevidsthed", "uddannelse"],
      },
      {
        id: "agentic-literacy",
        name: "Agentisk AI-forståelseshul",
        description: "Teams mangler forståelse for agentiske AI-arkitekturer, autonome agenters adfærd, multi-agent-systemer og deres unikke risikoprofiler inkl. MCP-protokoller.",
        severity: "high",
        mitigations: [
          "Uddan udviklingsteams i agentiske AI-mønstre: single-agent, multi-agent, swarm-arkitekturer",
          "Uddannelse i MCP-protokolsikkerhed: tool poisoning, rug pulls og prompt injection via værktøjer",
          "Opbyg kendskab til OWASP Agentic Top 10-risici på tværs af udviklings- og sikkerhedsteams",
          "Kør bordøvelser der simulerer agentiske angrebsscenarier",
        ],
        mitLinks: [
          { label: "OWASP: Agentic Top 10 for Applications 2026", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
          { label: "OWASP: Agentic AI Threats & Mitigations v1.1", url: "/docs/Agentic-AI-Threats-and-Mitigations.pdf", source: "OWASP" },
          { label: "OWASP: MCP Servers Security Cheat Sheet", url: "/docs/MCP-Servers-Security-CheatSheet.pdf", source: "OWASP" },
        ],
        tags: ["agentisk", "MCP", "multi-agent", "uddannelse"],
      },
    ],
    sourceLinks: [
      { label: "MIT AI Risk Repository – Human-Computer Interaction (5)", url: MIT_SPREADSHEET, source: "MIT" },
      { label: "OWASP GenAI Security Introduction", url: "https://genai.owasp.org/introduction-genai-security-project/", source: "OWASP" },
      { label: "OWASP Agentic AI Threats & Mitigations v1.1", url: "/docs/Agentic-AI-Threats-and-Mitigations.pdf", source: "OWASP" },
    ],
  },
  {
    id: "workforce-displacement",
    name: "Fortrængning af arbejdsstyrken",
    pillar: "people",
    icon: "💼",
    description: "AI-drevet fortrængning af jobs, forringet beskæftigelseskvalitet og devaluering af menneskelige kompetencer og kreativitet.",
    subcategories: [
      {
        id: "job-displacement",
        name: "Fortrængning & rolleændringer",
        description: "AI automatiserer opgaver eller roller, hvilket fører til reduktion af arbejdsstyrken eller væsentlig omstrukturering af roller.",
        severity: "high",
        mitigations: [
          "Udvikl om- og opkvalificeringsforløb",
          "Skab overgangsprogrammer for berørte roller",
          "Fokusér AI på at understøtte snarere end at erstatte mennesker",
        ],
        mitLinks: [
          { label: "MIT: Employment Decline (6.2)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["beskæftigelse", "fortrængning", "opkvalificering"],
      },
      {
        id: "human-devaluation",
        name: "Devaluering af menneskelig indsats",
        description: "AI-genereret indhold og beslutninger reducerer den opfattede værdi af menneskelig kreativitet, ekspertise og indsats.",
        severity: "medium",
        mitigations: [
          "Fremhæv menneske-AI-samarbejde fremfor erstatning",
          "Anerkend og beløn menneskelige bidrag sideløbende med AI-output",
          "Bevar menneskelig oversight i kreative og strategiske beslutninger",
        ],
        mitLinks: [
          { label: "MIT: Cultural Devaluation (6.3)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["kreativitet", "værdi", "kultur"],
      },
    ],
    sourceLinks: [
      { label: "MIT AI Risk Repository – Socioeconomic Domain (6.2, 6.3)", url: MIT_SPREADSHEET, source: "MIT" },
    ],
  },
  {
    id: "trust-adoption",
    name: "Tillid, adoption & overafhængighed",
    pillar: "people",
    icon: "🤝",
    description: "Organisatorisk mistillid til AI, modstand mod adoption, eller omvendt farlig overafhængighed af AI-systemer og autonome agenter.",
    subcategories: [
      {
        id: "organizational-mistrust",
        name: "Organisatorisk mistillid",
        description: "Medarbejdere mistror AI-output eller ledelsens AI-strategi, hvilket fører til modstand og dårlig adoption.",
        severity: "high",
        mitigations: [
          "Kommunikér AI-strategi transparent",
          "Involvér medarbejdere i valg og udrulning af AI-værktøjer",
          "Del både succeser og fiaskoer åbent",
        ],
        mitLinks: [
          { label: "MIT: Overreliance & Unsafe Use (5.1)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["tillid", "adoption", "kultur"],
      },
      {
        id: "overreliance",
        name: "Overafhængighed af AI",
        description: "Brugere stoler blindt på AI-output uden kritisk vurdering, hvilket fører til dårlige beslutninger i kritiske situationer.",
        severity: "critical",
        mitigations: [
          "Implementér krav om menneske-i-loopet for kritiske beslutninger",
          "Uddan brugere i kritisk vurdering af AI-output",
          "Vis konfidensniveauer og begrænsninger sammen med AI-output",
        ],
        mitLinks: [
          { label: "MIT: Overreliance & Unsafe Use (5.1)", url: MIT_SPREADSHEET, source: "MIT" },
          { label: "OWASP: Misinformation Risk", url: "https://genai.owasp.org/llmrisk/llm092025-misinformation/", source: "OWASP" },
        ],
        tags: ["overafhængighed", "kritisk-tænkning", "automationsbias"],
      },
      {
        id: "agency-loss",
        name: "Tab af menneskelig handlekraft",
        description: "Progressiv delegering af beslutninger til AI, der udhuler menneskelig beslutningsevne og autonomi.",
        severity: "high",
        mitigations: [
          "Definér klare grænser for AI's beslutningskompetence",
          "Bevar menneskelige overrulerings-muligheder",
          "Vurdér regelmæssigt delegeringsniveauer og deres konsekvenser",
        ],
        mitLinks: [
          { label: "MIT: Loss of Agency (5.2)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["handlekraft", "autonomi", "delegering"],
      },
      {
        id: "human-agent-trust",
        name: "Menneske-agent tillidsudnyttelse (ASI09)",
        description: "Agenter udnytter tillid gennem naturligt sprogbeherskelse, emotionel intelligens og opfattet ekspertise til at påvirke brugerbeslutninger, udtrække følsomme oplysninger eller styre resultater. Inkluderer falsk forklarbarhed, emotionel manipulation og samtykkevaskning.",
        severity: "critical",
        mitigations: [
          "Kræv flertrins-godkendelse for handlinger med høj konsekvens eller følsomhed",
          "Implementér adaptiv tillidskalibrering — justér agentautonomi baseret på kontekstuel risikoscoring",
          "Markér visuelt højrisikoanbefalinger med UI-signaler (røde kanter, bannere, bekræftelsesdialoger)",
          "Vedhæft verificerbar metadata (kilde-ID'er, tidsstempler, integritetshashes) til alle agentanbefalinger",
          "Adskil forhåndsvisning fra effekt — blokér tilstandsændrende kald under forhåndsvisningskontekst",
          "Uddan personale løbende i manipulationsmønstre og agentbegrænsninger",
        ],
        mitLinks: [
          { label: "OWASP ASI09: Human-Agent Trust Exploitation", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
          { label: "OWASP: Agentic AI Threats & Mitigations (T7, T10)", url: "/docs/Agentic-AI-Threats-and-Mitigations.pdf", source: "OWASP" },
        ],
        tags: ["tillidsudnyttelse", "social-engineering", "automationsbias", "agentisk"],
      },
    ],
    sourceLinks: [
      { label: "MIT AI Risk Repository – Human-Computer Interaction (5.1, 5.2)", url: MIT_SPREADSHEET, source: "MIT" },
      { label: "OWASP ASI09: Human-Agent Trust Exploitation", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
    ],
  },
  {
    id: "discrimination-bias",
    name: "Diskrimination, bias & toksicitet",
    pillar: "people",
    icon: "⚠️",
    description: "AI-systemer der producerer uretfærdige, forudindtagede eller skadelige output, som kan skade enkeltpersoner og grupper i organisationen.",
    subcategories: [
      {
        id: "unfair-discrimination",
        name: "Uretfærdig diskrimination & fejlrepræsentation",
        description: "AI der træffer forudindtagede beslutninger baseret på race, køn eller andre beskyttede karakteristika.",
        severity: "critical",
        mitigations: [
          "Auditering af AI-modeller for bias inden udrulning",
          "Brug diverse og repræsentative træningsdatasæt",
          "Implementér bias-overvågning i produktionssystemer",
        ],
        mitLinks: [
          { label: "MIT: Discrimination Domain (1.1)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["bias", "retfærdighed", "diskrimination"],
      },
      {
        id: "toxic-content",
        name: "Eksponering for skadeligt indhold",
        description: "AI der genererer eller fremviser skadeligt, krænkende eller upassende indhold til brugere.",
        severity: "high",
        mitigations: [
          "Implementér indholdsfiltrering og sikkerhedslag",
          "Fastlæg indholdsmoderationspolitikker for AI-output",
          "Overvåg og log hændelser med skadeligt indhold",
        ],
        mitLinks: [
          { label: "MIT: Toxic Content (1.2)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["toksicitet", "indholdssikkerhed", "moderation"],
      },
    ],
    sourceLinks: [
      { label: "MIT AI Risk Repository – Discrimination & Toxicity (1)", url: MIT_SPREADSHEET, source: "MIT" },
    ],
  },

  // ── UDVIKLING & SIKKERHED ──
  {
    id: "prompt-injection",
    name: "Prompt Injection & Agent Goal Hijack",
    pillar: "development",
    icon: "💉",
    description: "Angreb hvor brugerinput ændrer LLM'ens adfærd til at udføre utilsigtede handlinger, omgå sikkerhedskontroller eller tilgå uautoriserede data. I agentiske systemer udvides dette til goal hijacking, hvor angribere omdirigerer flertrins-agentadfærd (ASI01).",
    subcategories: [
      {
        id: "direct-injection",
        name: "Direkte prompt injection",
        description: "Ondsindet input specifikt udformet til at manipulere LLM'ens adfærd eller omgå dens instruktioner.",
        severity: "critical",
        mitigations: [
          "Implementér inputvalidering og -sanitering",
          "Brug systemprompt-hærdningsteknikker",
          "Udrull systemer til detektion af prompt injection",
        ],
        mitLinks: [
          { label: "OWASP: LLM01 Prompt Injection", url: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/", source: "OWASP" },
          { label: "MIT: AI Security Vulnerabilities (2.2)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["injection", "angreb", "inputvalidering"],
      },
      {
        id: "indirect-injection",
        name: "Indirekte prompt injection",
        description: "Ondsindede instruktioner indlejret i eksterne datakilder, som LLM'en behandler, hvilket fører til utilsigtede handlinger. Den definitive 2025-case er EchoLeak (CVE-2025-32711, M365 Copilot) — zero-click via e-mail der aldrig blev åbnet, eksfiltrerede tenant-data via auto-fetched billeder.",
        severity: "critical",
        mitigations: [
          "Validér og sanitér alle eksterne datakilder",
          "Implementér privilegieseparation for datatilgang",
          "Brug indholdssikkerhedspolitikker for hentede data",
          "Begrænse outbound CSP/allowlist på AI-agenter (lærdom fra EchoLeak: Microsoft Teams var whitelisted og blev exfiltrerings-kanal)",
        ],
        mitLinks: [
          { label: "OWASP: LLM01 Prompt Injection", url: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/", source: "OWASP" },
          { label: "CVE-2025-32711 EchoLeak case study", url: CVE_ECHOLEAK, source: "CVE" },
        ],
        tags: ["injection", "ekstern-data", "RAG", "EchoLeak"],
      },
      {
        id: "agent-goal-hijack",
        name: "Agent Goal Hijack (ASI01)",
        description: "Angribere manipulerer en agents mål, opgavevalg eller beslutningsveje gennem promptbaseret manipulation, vildledende værktøjsoutput, ondsindede artefakter, forfalskede agent-til-agent-beskeder eller forgiftet ekstern data — og omdirigerer dermed flertrins autonom adfærd mod utilsigtede eller skadelige resultater.",
        severity: "critical",
        mitigations: [
          "Behandl alle naturligsprogs-input som ubetroede — rut gennem inputvalidering og prompt injection-sikring før de påvirker målvalg eller værktøjskald",
          "Håndhæv mindste-privilegium for agentværktøjer og kræv menneskelig godkendelse for handlinger med høj konsekvens eller målændringer",
          "Definér og lås agentens system-prompts så målprioriteter er eksplicitte og reviderbare",
          "Validér både brugerens og agentens hensigt før eksekvering af målændrende handlinger",
          "Sanitér tilkoblede datakilder (RAG-input, e-mails, kalenderinvitationer, uploadede filer, peer-agent-beskeder) med CDR og indholdsfiltrering",
          "Vedligehold omfattende logning med adfærdsbaselines; alarmér ved uventede målændringer eller afvigende værktøjssekvenser",
        ],
        mitLinks: [
          { label: "OWASP ASI01: Agent Goal Hijack", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
          { label: "OWASP: Agentic AI Threats (T6, T7)", url: "/docs/Agentic-AI-Threats-and-Mitigations.pdf", source: "OWASP" },
        ],
        tags: ["agentisk", "goal-hijack", "flertrins", "autonom"],
      },
      {
        id: "echoleak-zero-click",
        name: "EchoLeak — zero-click prompt injection (CVE-2025-32711)",
        description: "Verdens første dokumenterede zero-click prompt injection i et produktions-LLM. CVSS 9.3, opdaget af Aim Labs og fixed af Microsoft 11. juni 2025. En enkelt e-mail (aldrig åbnet af offeret) kunne få M365 Copilot til at exfiltrere tenant-data næste gang brugeren stillede et relateret spørgsmål. Patched server-side; ingen kundehandling krævet, ingen kendt udnyttelse i felten — men det er den nye baseline trusselmodel for RAG-baserede assistenter.",
        severity: "critical",
        mitigations: [
          "Begrænse eller deaktivere ekstern e-mail som grounding-kilde for Copilot hvor det er forretningsmæssigt forsvarligt",
          "Håndhæv striks outbound CSP/allowlist på AI-agenter — inkluderet Teams/SharePoint proxy-domæner — og audit hvad jeres tenant whitelister",
          "Behandl alt hentet indhold (e-mail, SharePoint, web) som ubetroet input; deploy en prompt-injection-classifier FORAN, ikke kun INDE i modellen",
          "Log og alarmér ved Copilot outbound image/link-hentninger til ikke-Microsoft-domæner",
          "Tilføj DLP egress-inspektion mellem Copilot og eksterne endpoints; blokér markdown reference-link rendering hvor muligt",
        ],
        mitLinks: [
          { label: "CVE-2025-32711 (NVD)", url: CVE_ECHOLEAK, source: "CVE" },
          { label: "Microsoft MSRC advisory", url: MSRC_ECHOLEAK, source: "MSRC" },
          { label: "Aim Labs EchoLeak paper (arXiv)", url: AIM_LABS_ECHOLEAK, source: "Research" },
        ],
        tags: ["zero-click", "RAG", "Copilot", "2025-incident", "CVE"],
      },
    ],
    sourceLinks: [
      { label: "OWASP Top 10 – LLM01: Prompt Injection", url: "https://genai.owasp.org/llmrisk/llm01-prompt-injection/", source: "OWASP" },
      { label: "MIT AI Risk Repository – Security Vulnerabilities (2.2)", url: MIT_SPREADSHEET, source: "MIT" },
      { label: "OWASP ASI01: Agent Goal Hijack", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
      { label: "CVE-2025-32711 — EchoLeak (Microsoft 365 Copilot)", url: CVE_ECHOLEAK, source: "CVE" },
    ],
  },
  {
    id: "sensitive-disclosure",
    name: "Afsløring af følsomme oplysninger",
    pillar: "development",
    icon: "🔓",
    description: "AI-systemer der afslører følsomme data inklusive personoplysninger, proprietær information eller systemkonfigurationer gennem deres output.",
    subcategories: [
      {
        id: "data-leakage",
        name: "Lækage af træningsdata",
        description: "LLM'er der memorerer og afslører følsomme oplysninger fra træningsdata i deres svar.",
        severity: "critical",
        mitigations: [
          "Implementér datasanitering i træningspipelines",
          "Brug teknikker til differentiel privathed",
          "Udrull output-filtrering for mønstre med følsomme data",
        ],
        mitLinks: [
          { label: "OWASP: LLM02 Sensitive Info Disclosure", url: "https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/", source: "OWASP" },
          { label: "MIT: Privacy Compromise (2.1)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["privatliv", "datalæk", "personoplysninger"],
      },
      {
        id: "privacy-inference",
        name: "Privatlivsinferensangreb",
        description: "Angribere der bruger AI til at udlede private oplysninger om enkeltpersoner uden direkte adgang til dataene.",
        severity: "high",
        mitigations: [
          "Begræns modeladgang til følsomme data",
          "Implementér adgangskontroller og dataminimering",
          "Overvåg for usædvanlige forespørgselsmønstre",
        ],
        mitLinks: [
          { label: "MIT: Privacy Compromise (2.1)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["privatliv", "inferens", "overvågning"],
      },
      {
        id: "model-extraction",
        name: "Model-ekstraktion & API-distillation",
        description: "Angribere der bruger gentagne API-forespørgsler til at rekonstruere en proprietær model, dens system-prompt eller dens træningsdata. SIGKDD 2025-survey kategoriserer angrebene i tre: funktionalitets-ekstraktion (API-distillation), træningsdata-ekstraktion og prompt-rettet ekstraktion (system-prompt-stealing). Defenses fokuserer på query-pattern-detektion, output-watermarking og restriktioner på logits.",
        severity: "medium",
        mitigations: [
          "Anvend per-API-key og per-IP rate limiting plus anomali-detektion på query-distribution (entropi, emne-spredning)",
          "Indlejr kryptografiske output-watermarks for proprietære modeller; scan periodisk konkurrent-output for mærker",
          "Begræns adgang til top-k logits / log-probabilities — de accelererer distillation massivt",
          "Brug proof-of-work eller graduated pricing for at hæve ekstraktions-omkostning uden at skade legitime brugere",
          "Behandl system-prompts som hemmeligheder: minimér deres informationsindhold, defense-test mod prompt-leak før launch",
        ],
        mitLinks: [
          { label: "SIGKDD 2025: Model Extraction Survey", url: MODEL_EXTRACTION_SURVEY, source: "Research" },
          { label: "MIT: AI Security Vulnerabilities (2.2)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["model-extraction", "IP-tyveri", "watermarking", "rate-limiting"],
      },
    ],
    sourceLinks: [
      { label: "OWASP Top 10 – LLM02: Sensitive Information Disclosure", url: "https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/", source: "OWASP" },
      { label: "MIT AI Risk Repository – Privacy (2.1)", url: MIT_SPREADSHEET, source: "MIT" },
      { label: "SIGKDD 2025 Model Extraction Survey", url: MODEL_EXTRACTION_SURVEY, source: "Research" },
    ],
  },
  {
    id: "supply-chain",
    name: "Forsyningskæde & agentisk forsyningskæde",
    pillar: "development",
    icon: "🔗",
    description: "Sårbarheder i AI-forsyningskæden herunder kompromitterede modeller, datasæt, plugins, tredjepartskomponenter, og i agentiske systemer: dynamisk indlæste værktøjer, MCP-servere, agentregistre og runtime-afhængigheder (ASI04).",
    subcategories: [
      {
        id: "model-integrity",
        name: "Model- & datasætintegritet",
        description: "Brug af forudtrænede modeller eller datasæt fra ubetroede kilder, der kan indeholde bagdøre eller ondsindede modifikationer.",
        severity: "high",
        mitigations: [
          "Verificér herkomst af alle modeller og datasæt",
          "Implementér modelsignering og -verifikation",
          "Brug AI Bill of Materials (AIBOM)-sporing",
        ],
        mitLinks: [
          { label: "OWASP: LLM03 Supply Chain", url: "https://genai.owasp.org/llmrisk/llm032025-supply-chain/", source: "OWASP" },
          { label: "OWASP: AIBOM Generator", url: "https://genai.owasp.org/ai-sbom-initiative/", source: "OWASP" },
        ],
        tags: ["forsyningskæde", "integritet", "herkomst"],
      },
      {
        id: "plugin-risks",
        name: "Plugin- & udvidelsesrisici",
        description: "Tredjeparts-plugins eller -udvidelser der introducerer sårbarheder, dataeksfiltrering eller uautoriserede handlinger.",
        severity: "high",
        mitigations: [
          "Auditér alle plugins og udvidelser inden udrulning",
          "Implementér sandkassemiljøer for tredjepartskomponenter",
          "Vedligehold et godkendt plugin-register",
        ],
        mitLinks: [
          { label: "OWASP: LLM03 Supply Chain", url: "https://genai.owasp.org/llmrisk/llm032025-supply-chain/", source: "OWASP" },
        ],
        tags: ["plugins", "udvidelser", "tredjepart"],
      },
      {
        id: "agentic-supply-chain",
        name: "Agentiske forsyningskædesårbarheder (ASI04)",
        description: "Runtime-sammensætning af agenter, værktøjer og MCP-servere fra tredjeparter, der introducerer forgiftede prompt-skabeloner, tool-descriptor injection, typosquattede endpoints, kompromitterede MCP-/registry-servere og agent-in-the-middle-angreb via forfalskede agent cards. Konkret 2026-case: LiteLLM (populært AI-gateway-bibliotek) blev kompromitteret via PyPI i marts 2026 — viser at proxy/gateway-laget nu er et angrebsoverflade på linje med modellen selv.",
        severity: "critical",
        mitigations: [
          "Signér og attestér manifester, prompts og værktøjsdefinitioner; kræv SBOMs og AIBOMs med periodiske attesteringer",
          "Hvidlist og pin afhængigheder; scan for typosquats; verificér herkomst inden installation eller aktivering",
          "Kør følsomme agenter i sandkassecontainere med strenge netværks-/syscall-begrænsninger; kræv reproducerbare builds",
          "Håndhæv gensidig autentifikation og attestering via PKI og mTLS; ingen åben registrering for inter-agent-kommunikation",
          "Implementér en forsyningskæde-nødstop til øjeblikkelig deaktivering af kompromitterede værktøjer, prompts eller agentforbindelser",
          "Design med zero-trust: antag fejl eller udnyttelse af enhver LLM- eller agentisk komponent",
        ],
        mitLinks: [
          { label: "OWASP ASI04: Agentic Supply Chain Vulnerabilities", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
          { label: "OWASP: Agentic AI Threats (T17 Supply Chain)", url: "/docs/Agentic-AI-Threats-and-Mitigations.pdf", source: "OWASP" },
          { label: "OWASP: MCP Servers Security Cheat Sheet", url: "/docs/MCP-Servers-Security-CheatSheet.pdf", source: "OWASP" },
          { label: "Trend Micro: LiteLLM supply-chain compromise (Mar 2026)", url: LITELLM_INCIDENT, source: "Research" },
        ],
        tags: ["agentisk", "forsyningskæde", "MCP", "typosquatting", "AIBOM", "LiteLLM"],
      },
    ],
    sourceLinks: [
      { label: "OWASP Top 10 – LLM03: Supply Chain", url: "https://genai.owasp.org/llmrisk/llm032025-supply-chain/", source: "OWASP" },
      { label: "OWASP ASI04: Agentic Supply Chain Vulnerabilities", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
      { label: "OWASP MCP Servers Security Cheat Sheet v1.0", url: "/docs/MCP-Servers-Security-CheatSheet.pdf", source: "OWASP" },
      { label: "Trend Micro: LiteLLM supply-chain (Mar 2026)", url: LITELLM_INCIDENT, source: "Research" },
    ],
  },
  {
    id: "data-poisoning",
    name: "Data- & modelforgiftning",
    pillar: "development",
    icon: "☠️",
    description: "Angreb der korrumperer prætrænings-, finjusterings- eller embedding-data for at indføre sårbarheder, bagdøre eller bias i AI-modeller.",
    subcategories: [
      {
        id: "training-poisoning",
        name: "Forgiftning af træningsdata",
        description: "Injektion af ondsindede data i træningsdatasæt for at påvirke modeladfærd på målrettede måder.",
        severity: "critical",
        mitigations: [
          "Implementér sporing og validering af dataherkomst",
          "Brug anomalidetektion på træningsdatasæt",
          "Vedligehold kurerede og verificerede træningsdataarkiver",
        ],
        mitLinks: [
          { label: "OWASP: LLM04 Data & Model Poisoning", url: "https://genai.owasp.org/llmrisk/llm042025-data-and-model-poisoning/", source: "OWASP" },
        ],
        tags: ["forgiftning", "træning", "dataintegritet"],
      },
    ],
    sourceLinks: [
      { label: "OWASP Top 10 – LLM04: Data & Model Poisoning", url: "https://genai.owasp.org/llmrisk/llm042025-data-and-model-poisoning/", source: "OWASP" },
    ],
  },
  {
    id: "output-handling",
    name: "Fejlhåndtering af output & uventet kodeeksekvering",
    pillar: "development",
    icon: "📤",
    description: "Utilstrækkelig validering og sanitering af LLM-output inden videresendelse til downstream-systemer, der muliggør XSS, SSRF eller kodeeksekvering. I agentiske systemer udvides dette til uventet fjernkodeeksekvering via genereret kode (ASI05).",
    subcategories: [
      {
        id: "output-injection",
        name: "Output-til-kode-injection",
        description: "LLM-output der indeholder eksekverbar kode eller kommandoer, som downstream-systemer behandler usikkert.",
        severity: "critical",
        mitigations: [
          "Behandl alle LLM-output som ubetroet input",
          "Implementér output-kodning og -sanitering",
          "Brug hvidlister for acceptable output-formater",
        ],
        mitLinks: [
          { label: "OWASP: LLM05 Improper Output Handling", url: "https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/", source: "OWASP" },
        ],
        tags: ["output", "sanitering", "XSS", "injection"],
      },
      {
        id: "unexpected-rce",
        name: "Uventet kodeeksekvering / RCE (ASI05)",
        description: "Agentiske systemer der genererer og eksekverer kode under runtime, som omgår traditionelle sikkerhedskontroller — via prompt injection, kodehallucination, shell-kommandoer, usikker deserialisering eller multi-tool-kædeudnyttelse, der fører til vært-kompromittering eller sandkasseflugt.",
        severity: "critical",
        mitigations: [
          "Forbyd eval() i produktionsagenter; kræv sikre fortolkere med taint-tracking på genereret kode",
          "Kør kode i sandkassecontainere med strenge begrænsninger (netværk, filsystem); kør aldrig som root",
          "Kræv menneskelig godkendelse for forhøjet kodeeksekvering; hold auto-eksekverings-hvidlister under versionskontrol",
          "Udfør statiske scans inden eksekvering; aktivér runtime-overvågning for prompt injection-mønstre",
          "Isolér per-session-miljøer med rettighedsgrænser; adskil kodegenerering fra eksekvering med valideringsporte",
          "Forhindre direkte agent-til-produktion-veje; operationaliser pre-production sikkerhedstjek",
        ],
        mitLinks: [
          { label: "OWASP ASI05: Unexpected Code Execution (RCE)", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
          { label: "OWASP: Securing Agentic Applications Guide", url: "/docs/Securing-Agentic-Applications-Guide.pdf", source: "OWASP" },
        ],
        tags: ["RCE", "kodeeksekvering", "sandkasseflugt", "agentisk", "vibe-coding"],
      },
      {
        id: "agentic-ide-rce",
        name: "Agentic IDE RCE (CVE-2025-53773)",
        description: "CVSS 7.8 prompt-injection-til-RCE i GitHub Copilot i Visual Studio (Johann Rehberger, juni 2025; patched i august Patch Tuesday). Et forgiftet README, dependency eller GitHub-issue kunne stille instruktioner der fik Copilot til selv at skrive 'chat.tools.autoApprove: true' i .vscode/settings.json — hvorefter agenten kunne køre arbitrære shell-kommandoer og redigere filer uden bekræftelse. En wormable variant ('ZombAI') propagerer ved at skrive samme injection i andre repos udvikleren rører.",
        severity: "high",
        mitigations: [
          "Patch Visual Studio til 17.14.12+ og audit .vscode/settings.json på tværs af repos for 'chat.tools.autoApprove'",
          "Deaktivér eksperimental auto-approve / YOLO mode på org policy-niveau; kræv human-in-the-loop for shell- og file-write-værktøjer",
          "Sandbox Copilot/agent-eksekvering i dev containers uden host-shell eller credential-adgang",
          "Behandl 3.-parts repos, READMEs og issues som ubetroet input — review før de åbnes med agent aktiveret",
          "Overvåg for pludselige settings-fil-commits fra agentic IDE-sessioner",
        ],
        mitLinks: [
          { label: "CVE-2025-53773", url: CVE_COPILOT_RCE, source: "CVE" },
          { label: "Microsoft MSRC advisory", url: MSRC_COPILOT_RCE, source: "MSRC" },
          { label: "Rehberger: GitHub Copilot RCE write-up", url: REHBERGER_COPILOT, source: "Research" },
        ],
        tags: ["RCE", "Copilot", "IDE", "YOLO-mode", "2025-incident", "CVE"],
      },
    ],
    sourceLinks: [
      { label: "OWASP Top 10 – LLM05: Improper Output Handling", url: "https://genai.owasp.org/llmrisk/llm052025-improper-output-handling/", source: "OWASP" },
      { label: "OWASP ASI05: Unexpected Code Execution (RCE)", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
      { label: "CVE-2025-53773 — GitHub Copilot RCE i Visual Studio", url: CVE_COPILOT_RCE, source: "CVE" },
    ],
  },
  {
    id: "excessive-agency",
    name: "Overdreven handlefrihed & privilegieeskalering",
    pillar: "development",
    icon: "🔑",
    description: "AI-systemer med overdrevne rettigheder, utilstrækkelige adgangskontroller eller evne til at udføre uautoriserede handlinger. I agentiske systemer inkluderer dette identitets- og privilegiemisbrug, delegation-loops og kontekstlæk (ASI02, ASI03).",
    subcategories: [
      {
        id: "excessive-permissions",
        name: "Overdrevne tilladelser",
        description: "AI-systemer med bredere adgang end nødvendigt, hvilket skaber angrebsflader og potentiale for utilsigtede handlinger.",
        severity: "critical",
        mitigations: [
          "Anvend mindste-privilegium-princippet for AI-systemer",
          "Implementér granulære adgangskontroller",
          "Gennemgå og auditér AI-systemtilladelser regelmæssigt",
        ],
        mitLinks: [
          { label: "OWASP: LLM06 Excessive Agency", url: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/", source: "OWASP" },
        ],
        tags: ["tilladelser", "adgangskontrol", "mindste-privilegium"],
      },
      {
        id: "tool-misuse",
        name: "Værktøjsmisbrug & overdreven autonomi (ASI02)",
        description: "Agenter der kalder værktøjer med forkerte eller ondsindede parametre, kæder værktøjskald på uventede måder, eller handler uden tilstrækkelig menneskelig godkendelse — forstærket af vage tool-beskrivelser, manglende input-skema-håndhævelse og utilstrækkelige guardrails.",
        severity: "critical",
        mitigations: [
          "Håndhæv streng input-validering og schema-tjek for alle værktøjskald med typede, begrænsede parametre",
          "Implementér et risikotiered godkendelsessystem: automatisk for lavrisiko, menneskelig godkendelse for højrisiko-handlinger",
          "Gør værktøjskald idempotente og reversible hvor muligt; kræv eksplicit bekræftelse af destruktive handlinger",
          "Log alle værktøjskald med fuld kontekst; monitorér for afvigende mønstre, uventede sekvenser og frekvensanomalier",
          "Design værktøjer med klare, entydige beskrivelser; undgå vage eller overbredt fortolkelige tool-definitioner",
          "Implementér hastighedsbegrænsning, kædedybde-begrænsninger og circuit-breakers for værktøjskald",
        ],
        mitLinks: [
          { label: "OWASP ASI02: Tool Misuse & Excessive Autonomy", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
          { label: "OWASP: Securing Agentic Applications Guide", url: "/docs/Securing-Agentic-Applications-Guide.pdf", source: "OWASP" },
        ],
        tags: ["agentisk", "værktøjsmisbrug", "autonomi", "guardrails"],
      },
      {
        id: "identity-privilege-abuse",
        name: "Identitets- & privilegiemisbrug (ASI03)",
        description: "Agenter der eskalerer privilegier, misbruger delegerede identiteter, handler ud over autoriseret scope, eller udnytter forvirringsangreb — herunder token-tyveri, delegerings-loops, kontekstlæk og utilstrækkelig adskillelse af bruger- vs. agenttilladelser.",
        severity: "critical",
        mitigations: [
          "Håndhæv mindste-privilegium med korttidsgyldige, scope-begrænsede tokens og regelmæssige rotationer",
          "Oprethold separat identitetsramme for agenter vs. brugere med unikke credentials og handlings-logs",
          "Validér scope ved hvert agentisk trin; brug politikmotorer til runtime-beslutninger og scope-begrænsning",
          "Implementér løbende autentifikation, anomalidetektion og adfærdsbaserede adgangskontroller",
          "Registrér alle delegeringskæder med fuld kontekst for alle privilegieændringer",
          "Blokér automatisk for privilegieeskalering ud over definerede politikgrænser",
        ],
        mitLinks: [
          { label: "OWASP ASI03: Identity & Privilege Abuse", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
          { label: "OWASP: Agentic AI Threats (T3 Identity Spoofing)", url: "/docs/Agentic-AI-Threats-and-Mitigations.pdf", source: "OWASP" },
        ],
        tags: ["agentisk", "identitet", "privilegieeskalering", "delegering", "zero-trust"],
      },
    ],
    sourceLinks: [
      { label: "OWASP Top 10 – LLM06: Excessive Agency", url: "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/", source: "OWASP" },
      { label: "OWASP ASI02: Tool Misuse & Excessive Autonomy", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
      { label: "OWASP ASI03: Identity & Privilege Abuse", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
    ],
  },
  {
    id: "system-prompt-leakage",
    name: "Lækage af system-prompt",
    pillar: "development",
    icon: "🔍",
    description: "System-prompts der indeholder følsomme konfigurationer, API-nøgler eller forretningslogik, som kan udtrækkes af angribere.",
    subcategories: [
      {
        id: "prompt-extraction",
        name: "Udtrækning af system-prompt",
        description: "Angribere der udtrækker system-prompts for at forstå og omgå sikkerhedsforanstaltninger eller afsløre proprietær logik.",
        severity: "high",
        mitigations: [
          "Undgå at placere følsomme data i system-prompts",
          "Implementér prompt-beskyttelsesteknikker",
          "Brug server-side prompt-håndtering",
        ],
        mitLinks: [
          { label: "OWASP: LLM07 System Prompt Leakage", url: "https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/", source: "OWASP" },
        ],
        tags: ["prompt", "lækage", "konfiguration"],
      },
    ],
    sourceLinks: [
      { label: "OWASP Top 10 – LLM07: System Prompt Leakage", url: "https://genai.owasp.org/llmrisk/llm072025-system-prompt-leakage/", source: "OWASP" },
    ],
  },
  {
    id: "vector-embedding",
    name: "Vektor-, embedding- & hukommelsesforgiftning",
    pillar: "development",
    icon: "🧮",
    description: "Sikkerhedsrisici i vektordatabaser, embedding-systemer og agenthukommelse brugt til RAG — herunder forgiftning, uautoriseret adgang og vedvarende kontekstkorruption der spreder sig på tværs af sessioner (ASI06).",
    subcategories: [
      {
        id: "vector-poisoning",
        name: "Vektorlagerforgiftning",
        description: "Injektion af ondsindet indhold i vektordatabaser for at påvirke retrieval-augmented generation-resultater.",
        severity: "high",
        mitigations: [
          "Validér og sanitér alle data inden embedding",
          "Implementér adgangskontroller på vektorlagre",
          "Overvåg embeddingkvalitet og anomalier",
        ],
        mitLinks: [
          { label: "OWASP: LLM08 Vector & Embedding Weaknesses", url: "https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/", source: "OWASP" },
        ],
        tags: ["RAG", "vektorer", "embeddings"],
      },
      {
        id: "memory-context-poisoning",
        name: "Hukommelses- & kontekstforgiftning (ASI06)",
        description: "Modstandere korrumperer agenthukommelse, samtalehistorik eller hentbar kontekst med ondsindede data — hvilket forårsager at fremtidig ræsonnering, planlægning eller værktøjsbrug bliver forudindtaget eller understøtter eksfiltrering. Inkluderer RAG-forgiftning, delt kontekstkontaminering, kontekstvindue-manipulation, langtidshukommelsesdrift og krydsagent-udbredelse.",
        severity: "critical",
        mitigations: [
          "Kryptér hukommelse under transport og ved lagring; håndhæv mindste-privilegium-adgang til hukommelseslagre",
          "Scan alle nye hukommelsesskrivninger og modeloutput for ondsindet indhold inden commit",
          "Isolér brugersessioner og domænekontekster for at forhindre videnlæk (hukommelsessegmentering)",
          "Kræv kildeangivelse; detektér mistænkelige opdateringsfrekvenser eller anomalier",
          "Forhindre automatisk genindtagelse af agentens eget output i betroet hukommelse",
          "Brug per-lejer-navnerum og tillidsscore for delte vektorlagre; lad uverificeret hukommelse forfalde over tid",
          "Udfør adversarial testing; brug snapshots og rollback; kræv menneskelig gennemgang for højrisiko-hukommelsesændringer",
        ],
        mitLinks: [
          { label: "OWASP ASI06: Memory & Context Poisoning", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
          { label: "OWASP: Agentic AI Threats (T1 Memory Poisoning)", url: "/docs/Agentic-AI-Threats-and-Mitigations.pdf", source: "OWASP" },
          { label: "Rehberger: SPAIWARE — ChatGPT memory persistence", url: REHBERGER_SPAIWARE, source: "Research" },
          { label: "MemoryGraft — long-term memory exploitation (2026)", url: MEMORYGRAFT, source: "Research" },
        ],
        tags: ["agentisk", "hukommelsesforgiftning", "RAG", "kontekst", "krydsagent", "persistence"],
      },
      {
        id: "cross-user-contamination",
        name: "Cross-user jailbreak persistence via shared memory",
        description: "Jailbreaks og ondsindede instruktioner kan persistere på tværs af sessioner — og bløde mellem brugere — når en LLM bruger delt langtidshukommelse eller delt retrieval-state. Rehbergers SPAIWARE-arbejde (ChatGPT memory, 2024) viste at en indirekte prompt-injection via billede, Google Doc eller connected app kan skrive angriber-instruktioner i ChatGPT's persistente hukommelse, der fortsætter med at exfiltrere data i hver efterfølgende samtale. Nyere arbejde (MemoryGraft, AgentPoison) udvider dette til RAG-agenter.",
        severity: "high",
        mitigations: [
          "Deaktivér long-term memory for agenter der håndterer følsomme data, eller scope hukommelse stramt per opgave",
          "Behandl memory writes som sikkerhedshændelser: log dem, gør dem synlige for brugeren, og kræv bekræftelse før de persisterer",
          "Sanitér al hentet hukommelse før injection i prompten (strip instruktioner, URLs, tool-calls); brug en separat 'memory firewall'-model",
          "Prune og re-index hukommelseslagre periodisk; tilbyd brugeren én-klik 'wipe memory'",
          "For multi-bruger-agenter: del aldrig memory-namespace mellem brugere; nøgl alt på user ID + tenant ID",
        ],
        mitLinks: [
          { label: "Rehberger: ChatGPT Memory SPAIWARE write-up", url: REHBERGER_SPAIWARE, source: "Research" },
          { label: "MemoryGraft paper (2026)", url: MEMORYGRAFT, source: "Research" },
          { label: "Promptfoo: Cross-user contamination vulnerability", url: PROMPTFOO_CROSSUSER, source: "Research" },
        ],
        tags: ["memory", "persistence", "cross-user", "RAG", "SPAIWARE"],
      },
    ],
    sourceLinks: [
      { label: "OWASP Top 10 – LLM08: Vector & Embedding Weaknesses", url: "https://genai.owasp.org/llmrisk/llm082025-vector-and-embedding-weaknesses/", source: "OWASP" },
      { label: "OWASP ASI06: Memory & Context Poisoning", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
      { label: "Rehberger: SPAIWARE / Memory persistence research", url: REHBERGER_SPAIWARE, source: "Research" },
    ],
  },
  {
    id: "misinformation",
    name: "Misinformation & hallucination",
    pillar: "development",
    icon: "🌫️",
    description: "AI der genererer falsk, vildledende eller opdigtet information, som kan føre til forkerte beslutninger og underminere tillid.",
    subcategories: [
      {
        id: "hallucination",
        name: "Modelhallucination",
        description: "LLM'er der genererer troværdig men faktisk ukorrekt information, herunder falske citater, statistikker eller påstande.",
        severity: "high",
        mitigations: [
          "Implementér retrieval-augmented generation (RAG) med verificerede kilder",
          "Tilføj faktuelle verifikationslag",
          "Vis konfidensindikatorer og kildecitater",
        ],
        mitLinks: [
          { label: "OWASP: LLM09 Misinformation", url: "https://genai.owasp.org/llmrisk/llm092025-misinformation/", source: "OWASP" },
          { label: "MIT: False or Misleading Info (3.1)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["hallucination", "nøjagtighed", "verifikation"],
      },
      {
        id: "info-pollution",
        name: "Forurening af informationsøkosystemet",
        description: "AI-genereret misinformation i stor skala der underminerer fælles virkelighdsforståelse og udhuler tillid.",
        severity: "medium",
        mitigations: [
          "Mærk AI-genereret indhold tydeligt",
          "Implementér sporing af indholdsoprindelse",
          "Overvåg for AI-genereret misinformation i datapipelines",
        ],
        mitLinks: [
          { label: "MIT: Info Ecosystem Pollution (3.2)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["misinformation", "indholdsintegritet", "tillid"],
      },
    ],
    sourceLinks: [
      { label: "OWASP Top 10 – LLM09: Misinformation", url: "https://genai.owasp.org/llmrisk/llm092025-misinformation/", source: "OWASP" },
      { label: "MIT AI Risk Repository – Misinformation (3)", url: MIT_SPREADSHEET, source: "MIT" },
    ],
  },
  {
    id: "unbounded-consumption",
    name: "Ubegrænset ressourceforbrug",
    pillar: "development",
    icon: "📊",
    description: "LLM-applikationer der forbruger overdrevne ressourcer, hvilket fører til tjenestenægtelse, omkostningsoverskridelser eller ydeevneforringelse.",
    subcategories: [
      {
        id: "resource-exhaustion",
        name: "Ressourceudtømning & DoS",
        description: "Angribere der udformer input til at forbruge overdreven compute, hukommelse eller API-kald, der forringer eller nægter tjenesten.",
        severity: "high",
        mitigations: [
          "Implementér hastighedsbegrænsning og forbrugskvoter",
          "Sæt maksimale token-grænser for input og output",
          "Overvåg og alarmér ved unormale forbrugsmønstre",
        ],
        mitLinks: [
          { label: "OWASP: LLM10 Unbounded Consumption", url: "https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/", source: "OWASP" },
        ],
        tags: ["DoS", "ressourcer", "hastighedsbegrænsning"],
      },
    ],
    sourceLinks: [
      { label: "OWASP Top 10 – LLM10: Unbounded Consumption", url: "https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/", source: "OWASP" },
    ],
  },
  {
    id: "malicious-use",
    name: "Ondsindet brug & misbrug",
    pillar: "development",
    icon: "🎭",
    description: "Bevidst misbrug af AI-systemer til desinformation, svindel, cyberangreb, våbenudvikling eller målrettet manipulation.",
    subcategories: [
      {
        id: "disinformation-campaigns",
        name: "Desinformation & påvirkningsoperationer",
        description: "Brug af AI til at gennemføre sofistikerede desinformationskampagner, automatiseret propaganda eller målrettet manipulation i stor skala.",
        severity: "critical",
        mitigations: [
          "Implementér verifikation af indholdsautenticitet",
          "Udrull detektion af AI-genereret indhold",
          "Fastlæg politikker for ansvarlig brug med håndhævelse",
        ],
        mitLinks: [
          { label: "MIT: Disinformation at Scale (4.1)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["desinformation", "manipulation", "deepfakes"],
      },
      {
        id: "fraud-scams",
        name: "AI-muliggjort svindel & bedrageri",
        description: "Brug af AI til efterligning, deepfakes, automatiseret phishing eller målrettede social engineering-angreb.",
        severity: "critical",
        mitigations: [
          "Implementér identitetsverifikation for højrisikohandlinger",
          "Udrull deepfake-detektionskapabiliteter",
          "Uddan medarbejdere i AI-forstærket social engineering",
        ],
        mitLinks: [
          { label: "MIT: Fraud & Scams (4.2)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["svindel", "deepfakes", "social-engineering"],
      },
      {
        id: "cyber-weapons",
        name: "Cyberangreb & våben",
        description: "Brug af AI til at udvikle malware, forstærke cyberangreb eller accelerere våbenudvikling.",
        severity: "critical",
        mitigations: [
          "Begræns AI-adgang til følsomme kodearkiver",
          "Implementér brugsovervågning for farlige kapabiliteter",
          "Følg praksis for ansvarlig offentliggørelse",
        ],
        mitLinks: [
          { label: "MIT: Cyberattacks & Weapons (4.3)", url: MIT_SPREADSHEET, source: "MIT" },
          { label: "OWASP: AI Red Teaming", url: "https://genai.owasp.org/initiatives/#ai-redteaming", source: "OWASP" },
        ],
        tags: ["cybersikkerhed", "våben", "malware"],
      },
    ],
    sourceLinks: [
      { label: "MIT AI Risk Repository – Malicious Actors (4)", url: MIT_SPREADSHEET, source: "MIT" },
      { label: "OWASP: AI Red Teaming Initiative", url: "https://genai.owasp.org/initiatives/#ai-redteaming", source: "OWASP" },
    ],
  },
  {
    id: "inter-agent-security",
    name: "Inter-agent-kommunikationssikkerhed",
    pillar: "development",
    icon: "📡",
    description: "Multi-agent-systemer er afhængige af løbende kommunikation mellem autonome agenter. Svage inter-agent-kontroller for autentifikation, integritet, fortrolighed eller autorisation giver angribere mulighed for at opsnappe, manipulere, forfalske eller blokere beskeder (ASI07).",
    subcategories: [
      {
        id: "inter-agent-comms",
        name: "Usikker inter-agent-kommunikation (ASI07)",
        description: "Udveksling mellem agenter der mangler korrekt autentifikation, integritet eller semantisk validering — muliggør aflytning, forfalskning, beskedmanipulation, replay-angreb, protokolnedgradering og metadataanalyse til adfærdsprofilering.",
        severity: "critical",
        mitigations: [
          "Brug end-to-end-kryptering med per-agent-credentials og gensidig autentifikation (PKI, mTLS)",
          "Signér beskeder digitalt og hash både payload og kontekst; validér for skjulte instruktioner",
          "Beskyt udvekslinger med nonces, sessionsidentifikatorer og tidsstempler bundet til opgavevinduer",
          "Deaktivér svage eller forældede kommunikationsmetoder; håndhæv versions- og kapabilitetspolitikker ved gateways",
          "Autentificér alle opdagelses- og koordineringsbeskeder med kryptografisk identitet",
          "Brug registre der giver digital attestering af agentidentitet, herkomst og descriptorintegritiet",
          "Brug versionerede, typede beskedskemaer med eksplicit per-besked-publikum",
        ],
        mitLinks: [
          { label: "OWASP ASI07: Insecure Inter-Agent Communication", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
          { label: "OWASP: Agentic AI Threats (T12, T16)", url: "/docs/Agentic-AI-Threats-and-Mitigations.pdf", source: "OWASP" },
          { label: "OWASP: MAS Threat Modelling Guide", url: "/docs/Agentic-AI-MAS-Threat-Modelling-Guide.pdf", source: "OWASP" },
        ],
        tags: ["agentisk", "multi-agent", "A2A", "MCP", "forfalskning", "mTLS"],
      },
      {
        id: "cascading-failures",
        name: "Kaskaderende fejl (ASI08)",
        description: "En enkelt fejl (hallucination, ondsindet input, korrupt værktøj eller forgiftet hukommelse) der spreder sig på tværs af autonome agenter og forværres til systemomspændende skade — herunder planner-executor-kobling, feedback-loop-forstærkning, krydsagent-kaskader og governance-drift.",
        severity: "critical",
        mitigations: [
          "Design med zero-trust-fejltolerance der antager fejl i enhver LLM- eller agentisk komponent",
          "Sandkass agenter med mindste privilegium, netværkssegmentering og scopede API'er for at inddæmme fejludbredelse",
          "Udsted korttidsgyldige, opgavescopede credentials; validér enhver højkonsekvens-værktøjsinvokation mod politik",
          "Adskil planlægning og eksekvering via en ekstern politikmotor",
          "Implementér checkpoints, governance-agenter eller menneskelige gennemgangsporte inden output spredes downstream",
          "Implementér blast-radius-guardrails: kvoter, fremdriftslofter, circuit breakers mellem planner og executor",
          "Registrér alle inter-agent-beskeder og politikbeslutninger i manipulationssikre, tidsstemplede logs",
        ],
        mitLinks: [
          { label: "OWASP ASI08: Cascading Failures", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
          { label: "OWASP: Agentic AI Threats (T5 Cascading Hallucination)", url: "/docs/Agentic-AI-Threats-and-Mitigations.pdf", source: "OWASP" },
        ],
        tags: ["agentisk", "kaskaderende", "fejludbredelse", "circuit-breaker", "multi-agent"],
      },
      {
        id: "rogue-agents",
        name: "Slyngel-agenter (ASI10)",
        description: "Ondsindede eller kompromitterede AI-agenter der afviger fra tiltænkt funktion og handler skadeligt eller bedragerisk inden for multi-agent-økosystemer — herunder måldrift, workflow-kapring, agentsammensvægtelse, selvreplikation og belønningshacking.",
        severity: "critical",
        mitigations: [
          "Vedligehold omfattende, uforanderlige og signerede auditlogs af alle agenthandlinger og inter-agent-kommunikation",
          "Tildel tillidszoner med strenge inter-zone-kommunikationsregler; udrull containersandkasser med API-scopes",
          "Udrull adfærdsdetektion (watchdog-agenter) til at validere peer-adfærd og detektere sammensvægtelsesmønstre",
          "Implementér hurtig inddæmning: nødstop og tilbagekaldelse af credentials til øjeblikkelig deaktivering af slyngel-agenter",
          "Implementér per-agent kryptografisk identitetsattestering og adfærdsintegritets-baselines",
          "Kræv periodisk adfærdsattestering med signerede styklister for prompts og værktøjer",
          "Etablér betroede baselines til gendannelse af karantænerede agenter; kræv ny attestering inden reintegration",
        ],
        mitLinks: [
          { label: "OWASP ASI10: Rogue Agents", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
          { label: "OWASP: Agentic AI Threats (T13 Rogue Agents)", url: "/docs/Agentic-AI-Threats-and-Mitigations.pdf", source: "OWASP" },
        ],
        tags: ["agentisk", "slyngel-agent", "adfærdsdrift", "sammensvægtelse", "nødstop"],
      },
    ],
    sourceLinks: [
      { label: "OWASP Top 10 for Agentic Applications 2026", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
      { label: "OWASP Agentic AI Threats & Mitigations v1.1", url: "/docs/Agentic-AI-Threats-and-Mitigations.pdf", source: "OWASP" },
      { label: "OWASP MAS Threat Modelling Guide v1.0", url: "/docs/Agentic-AI-MAS-Threat-Modelling-Guide.pdf", source: "OWASP" },
    ],
  },
  {
    id: "mcp-protocol-security",
    name: "MCP- & protokolsikkerhed",
    pillar: "development",
    icon: "🔌",
    description: "Sikkerhedsrisici specifikke for Model Context Protocol (MCP) og agentiske kommunikationsprotokoller — herunder tool poisoning, rug pull-angreb, prompt injection via værktøjer, hukommelsesforgiftning, værktøjsinterferens og usikker serveropdagelse.",
    subcategories: [
      {
        id: "tool-poisoning",
        name: "Tool poisoning & rug pull-angreb",
        description: "Modstandere der indlejrer ondsindede kommandoer i MCP-værktøjsbeskrivelser eller -parametre, eller hemmeligt erstatter legitime værktøjer med ondsindede versioner for at udføre uautoriserede handlinger.",
        severity: "critical",
        mitigations: [
          "Vis fuld værktøjsmanifest inkl. beskrivelser, parametre og kapabiliteter inden aktivering",
          "Gennemgå beskrivelser for mistænkelige nøgleord; gennemgå fuld MCP-kode hvis tilgængelig",
          "Pin MCP-server- og værktøjsversioner med hash/checksum; alarmér ved uautoriserede ændringer",
          "Håndhæv mindste-privilegium-politikker ved MCP-servergrænsen for at begrænse værktøjsadgang",
        ],
        mitLinks: [
          { label: "OWASP: MCP Servers Security Cheat Sheet", url: "/docs/MCP-Servers-Security-CheatSheet.pdf", source: "OWASP" },
          { label: "OWASP ASI04: Agentic Supply Chain", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
        ],
        tags: ["MCP", "tool-poisoning", "rug-pull", "forsyningskæde"],
      },
      {
        id: "mcp-server-discovery",
        name: "Usikker MCP-serveropdagelse & autentifikation",
        description: "Tilslutning til ubetroede eller kompromitterede MCP-servere, manglende korrekt autentifikation/autorisation og fejl i verifikation af serveridentitet — hvilket fører til datatyveri, ondsindet kodeeksekvering og systemsabotage.",
        severity: "high",
        mitigations: [
          "Tilslut kun til servere fra et betroet register; brug IP-hvidlister og netværksisolering",
          "Brug STDIO til lokale servere (lavere latens, nemmere at hærde) og Streamable HTTP med TLS/mTLS til fjernservere",
          "Implementér OAuth 2.1 til autentifikation; brug OIDC/PKCE til brugeroperationer",
          "Definér mindste-tilladelse OAuth-scopes; brug handlingsniveau-tilladelser per identitet",
          "Kræv menneskelig godkendelse for handlinger der ikke tidligere er udført",
          "Stage nye servere i staging-miljø med fuld telemetri inden produktion",
        ],
        mitLinks: [
          { label: "OWASP: MCP Servers Security Cheat Sheet", url: "/docs/MCP-Servers-Security-CheatSheet.pdf", source: "OWASP" },
          { label: "OWASP: Securing Agentic Applications Guide", url: "/docs/Securing-Agentic-Applications-Guide.pdf", source: "OWASP" },
        ],
        tags: ["MCP", "serveropdagelse", "OAuth", "mTLS", "autentifikation"],
      },
      {
        id: "tool-interference",
        name: "Værktøjsinterferens & krydsserver-risici",
        description: "Brug af flere MCP-servere der fører til utilsigtede værktøjseksekverings-kæder, hvor ét værktøjs output udløser et andet servers værktøj, med datalæk, utilsigtede operationer eller tjenestenægtelses-loops til følge.",
        severity: "high",
        mitigations: [
          "Kræv menneskelig godkendelsesflow inden værktøjseksekvering",
          "Adskil kontekst for hver værktøjseksekvering; nulstil LLM-kontekst mellem distinkte eksekveringer",
          "Implementér eksekveringstimeouts for at forhindre loopende værktøjer i at påvirke værten",
          "Kør tredjeparts MCP-servere i Docker-containere for at begrænse lokal adgang",
        ],
        mitLinks: [
          { label: "OWASP: MCP Servers Security Cheat Sheet", url: "/docs/MCP-Servers-Security-CheatSheet.pdf", source: "OWASP" },
        ],
        tags: ["MCP", "værktøjsinterferens", "multiserver", "kontekstisolering"],
      },
      {
        id: "a2a-protocol-risks",
        name: "A2A-protokol-eksponering (Google Agent2Agent)",
        description: "Google's A2A-protokol (lanceret april 2025, nu under Linux Foundation, 150+ partnere) er den nye standard for agent-til-agent-kommunikation. 2025 trusselsmodeller og akademiske PoC'er identificerer agent-card forgery, capability spoofing, task replay, tool-shadowing og cross-agent prompt injection — med rapporterede attack success rates på 60-86% mod uhærdede deployments. Endnu ingen bekræftede in-the-wild brud, men trusselmodellen er reel.",
        severity: "high",
        mitigations: [
          "Kræv signerede, kortlivede OAuth-tokens for hvert A2A-kald; afvis langlivede bearer tokens",
          "Validér agent cards mod et betroet register; pin kendte agent-identiteter i stedet for at stole på discovery",
          "Håndhæv capability scoping: downstream-agenter accepterer kun deklarerede tool calls inden for et delegeret scope",
          "Log fulde A2A-message-kæder (parent task ID, kaldende agent, payload hash) til forensisk replay",
          "Kør en 'A2A gateway' der stripper/karantæner ubetroede instruktioner før de når en downstream-agents planner",
        ],
        mitLinks: [
          { label: "CSA: Threat-modeling Google's A2A (MAESTRO)", url: CSA_A2A, source: "CSA" },
          { label: "A2A Sensitive Data Safeguards (arXiv)", url: A2A_SAFEGUARDS, source: "Research" },
          { label: "Quantitative A2A security benchmark (arXiv)", url: A2A_BENCHMARK, source: "Research" },
        ],
        tags: ["A2A", "multi-agent", "protokol", "agent-card", "capability-spoofing"],
      },
    ],
    sourceLinks: [
      { label: "OWASP MCP Servers Security Cheat Sheet v1.0", url: "/docs/MCP-Servers-Security-CheatSheet.pdf", source: "OWASP" },
      { label: "OWASP Securing Agentic Applications Guide v1.0", url: "/docs/Securing-Agentic-Applications-Guide.pdf", source: "OWASP" },
      { label: "OWASP Top 10 for Agentic Applications 2026", url: "/docs/OWASP-Top-10-Agentic-Applications-2026.pdf", source: "OWASP" },
      { label: "CSA: Threat-modeling Google's A2A protocol", url: CSA_A2A, source: "CSA" },
    ],
  },
  {
    id: "system-safety",
    name: "AI-systemsikkerhed & pålidelighed",
    pillar: "development",
    icon: "🔧",
    description: "Risici fra AI-systemer der mangler robusthed, gennemsigtighed eller opererer med fejltilpassede mål.",
    subcategories: [
      {
        id: "lack-robustness",
        name: "Manglende robusthed",
        description: "AI-systemer der fejler under edge cases, adversarielle forhold eller uventede input.",
        severity: "high",
        mitigations: [
          "Implementér omfattende testning herunder adversariel testning",
          "Brug fallback-mekanismer ved AI-fejl",
          "Overvåg modelpræstationsdrift i produktion",
        ],
        mitLinks: [
          { label: "MIT: Lack of Robustness (7.3)", url: MIT_SPREADSHEET, source: "MIT" },
          { label: "OWASP: Securing Agentic Applications Guide", url: "/docs/Securing-Agentic-Applications-Guide.pdf", source: "OWASP" },
        ],
        tags: ["robusthed", "testning", "pålidelighed"],
      },
      {
        id: "lack-transparency",
        name: "Manglende gennemsigtighed",
        description: "Manglende evne til at forklare eller fortolke AI-beslutningsprocesser, hvilket hæmmer ansvarlighed og tillid.",
        severity: "high",
        mitigations: [
          "Implementér forklarbarhedslag for AI-beslutninger",
          "Vedligehold modeldokumentation og beslutningslogs",
          "Brug fortolkelige modeller hvor muligt i højrisiko-scenarier",
        ],
        mitLinks: [
          { label: "MIT: Lack of Transparency (7.4)", url: MIT_SPREADSHEET, source: "MIT" },
        ],
        tags: ["gennemsigtighed", "forklarbarhed", "XAI"],
      },
    ],
    sourceLinks: [
      { label: "MIT AI Risk Repository – AI System Safety (7)", url: MIT_SPREADSHEET, source: "MIT" },
      { label: "OWASP Securing Agentic Applications Guide v1.0", url: "/docs/Securing-Agentic-Applications-Guide.pdf", source: "OWASP" },
    ],
  },
];

export const getSeverityColor = (severity: RiskSeverity): string => {
  switch (severity) {
    case "critical": return "text-danger";
    case "high": return "text-warning";
    case "medium": return "text-info";
    case "low": return "text-success";
  }
};

export const getSeverityBg = (severity: RiskSeverity): string => {
  switch (severity) {
    case "critical": return "bg-danger/15 border-danger/30";
    case "high": return "bg-warning/15 border-warning/30";
    case "medium": return "bg-info/15 border-info/30";
    case "low": return "bg-success/15 border-success/30";
  }
};

export const getRisksByPillar = (pillar: RiskPillar): RiskCategory[] => {
  return riskCategories.filter((r) => r.pillar === pillar);
};

// ── Værktøjer: metadata for canonical /vaerktoejer/<slug> URLs ──
// Component-free so it can be imported by both the SPA (Index.tsx) and the
// prerender script (scripts/prerender.ts). Index.tsx maps each slug to its
// React component; the prerender script emits per-tool meta + sitemap entries.
export interface ToolMeta {
  slug: string;
  title: string;
  shortPitch: string; // 1 sentence for the teaser card
  description: string; // 2-3 sentences for meta tags + tool-page lede
  icon: string;
}

export const toolsMeta: ToolMeta[] = [
  {
    slug: "risiko-adoption",
    title: "Risiko × adoptionsfase",
    shortPitch: "Hvilke AI-risici er akutte i netop jeres fase? 4 faser × 3 søjler med klikbare risici.",
    description:
      "Matrix over 4 adoptionsfaser (eksperimenter → pilotering → produktion → skalering) × 3 risikosøjler, med de mest akutte risici kurateret per celle. Svarer på \"vi er i pilot — hvilke risici skal vi se på nu?\" Klik en celle for at springe direkte til risikoen.",
    icon: "🧭",
  },
  {
    slug: "trusselsaktoer-matrix",
    title: "Trusselsaktør × AI-aktiv",
    shortPitch: "Hvem angriber hvad? 5 trusselsaktører × 6 AI-aktiver med konkrete teknikker.",
    description:
      "Matrix over 5 trusselsaktører (insider, opportunist, nation-state, supply chain, konkurrent) × 6 AI-aktiver (træningsdata, modelvægte, RAG-korpus, system prompt, agent-identiteter, output) med trusselsniveau og konkret teknik i hver celle.",
    icon: "🎯",
  },
  {
    slug: "mitigation-radar",
    title: "Mitigation-modenhedsradar",
    shortPitch: "Hvor moden er jeres AI-sikkerhed? Interaktiv selvvurdering på 6 akser.",
    description:
      "Interaktiv selvvurderings-radar på 6 akser (detection, prevention, response m.fl.) med 4 modenhedsniveauer per akse — fra ad hoc til optimeret. Få et visuelt øjebliksbillede af jeres AI-sikkerhedsmodenhed og hvor I bør investere næst.",
    icon: "📡",
  },
];
