import React, { useState, useEffect, useRef } from 'react';
import FadeIn from '../components/FadeIn';
import { ArrowRight, TrendingUp, Zap, Target, Lightbulb, ChevronRight, CheckCircle2, Clock, Database, Network, BookOpen, BarChart3 } from 'lucide-react';

/* ─────────────────── ANIMATED COUNTER ─────────────────── */
const AnimatedNumber = ({ target, suffix = '', prefix = '' }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const numeric = parseFloat(String(target).replace(/[^0-9.]/g, ''));
        const duration = 1800;
        const steps = 60;
        const step = numeric / steps;
        let current = 0;
        const timer = setInterval(() => {
          current = Math.min(current + step, numeric);
          setValue(parseFloat(current.toFixed(1)));
          if (current >= numeric) clearInterval(timer);
        }, duration / steps);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  const display = String(target).includes('.') ? value.toFixed(1) : Math.round(value);

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
};

/* ─────────────────── IMPACT METRICS ─────────────────── */
const METRICS = [
  { value: 40, suffix: '%', label: 'Reduction in IT Ticket Triage Time', context: 'IT Ticket Graph RAG · Drishya AI Labs', color: 'var(--accent-blue)', icon: '⚡' },
  { value: 30, suffix: '%+', label: 'Improvement in Document Intelligence Accuracy', context: 'SmartDocs · Drishya AI Labs', color: 'var(--accent-violet)', icon: '📄' },
  { value: 50, suffix: '%', label: 'Reduction in Manual Review Effort', context: 'SmartDocs Knowledge Graph · Oil & Gas', color: 'var(--accent-cyan)', icon: '🧑‍💼' },
  { value: 66, suffix: '%', label: 'Faster P&ID Diagram Processing', context: 'DETR Vision Model · Drishya AI Labs', color: 'var(--accent-emerald)', icon: '🏭' },
  { value: 90, suffix: '%+', label: 'Grounding Accuracy on RAG Pipelines', context: 'Junior RAG · Azure AI Studio Eval', color: '#f59e0b', icon: '🎯' },
  { value: 40, suffix: '%', label: 'Revenue Growth Contribution', context: 'GenAI Programs · Drishya AI Labs', color: '#ec4899', icon: '📈' },
];

const ImpactDashboard = () => (
  <section className="section" id="impact">
    <FadeIn>
      <p className="section-eyebrow">Measurable Outcomes</p>
      <h2 className="section-title">AI-Driven Efficiency Gains</h2>
      <p className="section-desc" style={{ marginBottom: '3rem' }}>
        Every system I build is designed with a measurable outcome in mind. These are the verified,
        production results from deployed AI systems — not estimates or projections.
      </p>
    </FadeIn>
    <div className="grid-3">
      {METRICS.map((m, i) => (
        <FadeIn key={i} delay={i * 0.08}>
          <div className="glass-card" style={{ borderTop: `2px solid ${m.color}`, textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{m.icon}</div>
            <div style={{
              fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-3px',
              background: `linear-gradient(135deg, ${m.color}, ${m.color}99)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text', lineHeight: 1, marginBottom: '0.75rem'
            }}>
              <AnimatedNumber target={m.value} suffix={m.suffix} />
            </div>
            <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{m.label}</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>{m.context}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  </section>
);

/* ─────────────────── CASE STUDY ─────────────────── */
const CASE_STUDY_STEPS = [
  {
    title: 'The Problem',
    icon: '🔍',
    content: 'Mercedes-Benz MBRDI analysts were manually querying sprawling financial databases across Profit, Sales, and Cost domains. Each ad-hoc query required an analyst to know the exact table schemas, join conditions, and domain-specific business logic — creating a bottleneck and introducing human error on high-stakes financial decisions.',
    highlight: 'Manual SQL bottleneck on business-critical financial data.'
  },
  {
    title: 'Key Constraints',
    icon: '⚖️',
    content: 'The solution had to (1) never hallucinate financial figures, (2) work reliably across a 200+ table schema without overwhelming the LLM context window, (3) be auditable — every query must be explainable to a non-technical analyst, and (4) integrate into the existing enterprise data stack without a major replatforming effort.',
    highlight: 'Zero tolerance for hallucinated numbers. Full auditability required.'
  },
  {
    title: 'Architecture Decision: Why LangGraph?',
    icon: '🧠',
    content: 'I chose LangGraph over vanilla LangChain or direct API calls because financial workflows require explicit, deterministic state transitions — not emergent agent behavior. LangGraph\'s node-based state machine lets me define exactly what happens at each step (intent parsing → table selection → SQL generation → execution → correction), making failures traceable and correctable without re-running the entire pipeline.',
    highlight: 'Deterministic state machines over unpredictable autonomous agents.'
  },
  {
    title: 'Critical Design: Schema-Aware Table Selection',
    icon: '🗂️',
    content: 'The biggest technical risk was feeding a 200+ table schema to an LLM — it would overflow the context and produce confused queries. I built a semantic similarity-based table ranker that narrows the field to the 3–5 most relevant tables before SQL generation. This single decision eliminated the majority of hallucination and syntax errors in testing.',
    highlight: 'Narrowing context before generation was the key quality unlock.'
  },
  {
    title: 'The Auto-Correction Loop',
    icon: '🔄',
    content: 'Rather than treating SQL execution failure as a fatal error, pRofit\'s LangGraph pipeline feeds the error message back to the SQL generation node with the faulty query and error as additional context. Up to 3 correction iterations are allowed before escalation. This pattern reduced manual intervention by a significant margin and made the system resilient to edge cases in the schema.',
    highlight: 'Errors become training signal for the next generation attempt.'
  },
  {
    title: 'Outcome & Observability',
    icon: '✅',
    content: 'Every reasoning step, token count, latency, and SQL diff is traced end-to-end in Langfuse. This means I can pinpoint which table selector, which prompt version, or which schema ambiguity caused a failure — without guessing. Prompt changes require a measurable evaluation delta before shipping. The system is now in production at MBRDI, serving analysts across Profit and Cost domains.',
    highlight: 'Full Langfuse traceability from NL query to verified SQL result.'
  },
];

const CaseStudy = () => {
  const [active, setActive] = useState(0);
  return (
    <section className="section" id="case-study">
      <FadeIn>
        <p className="section-eyebrow">Engineering Deep Dive</p>
        <h2 className="section-title">How I Solve Hard Problems</h2>
        <p className="section-desc" style={{ marginBottom: '3rem' }}>
          An annotated walkthrough of the pRofit Agent — breaking down each architectural decision,
          the constraints that shaped it, and the tradeoffs I made to reach a production-grade result.
        </p>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Step Nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'sticky', top: '84px' }}>
          {CASE_STUDY_STEPS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.85rem 1rem', borderRadius: 10,
                background: active === i ? 'rgba(59,130,246,0.08)' : 'transparent',
                border: active === i ? '1px solid rgba(59,130,246,0.25)' : '1px solid transparent',
                color: active === i ? 'var(--text-primary)' : 'var(--text-muted)',
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{s.icon}</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, lineHeight: 1.4 }}>{s.title}</span>
              {active === i && <ChevronRight size={14} style={{ marginLeft: 'auto', color: 'var(--accent-blue)', flexShrink: 0 }} />}
            </button>
          ))}
        </div>
        {/* Step Content */}
        <div className="glass-card" style={{ minHeight: 320 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2rem' }}>{CASE_STUDY_STEPS[active].icon}</span>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--accent-blue)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                Step {active + 1} of {CASE_STUDY_STEPS.length}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{CASE_STUDY_STEPS[active].title}</h3>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            {CASE_STUDY_STEPS[active].content}
          </p>
          <div style={{
            padding: '1rem 1.25rem', borderRadius: 10,
            background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)',
            display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
          }}>
            <Lightbulb size={16} color="var(--accent-blue)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '0.875rem', color: '#93c5fd', fontWeight: 500, lineHeight: 1.6 }}>
              {CASE_STUDY_STEPS[active].highlight}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button
              onClick={() => setActive(Math.max(0, active - 1))}
              disabled={active === 0}
              className="btn btn-ghost"
              style={{ opacity: active === 0 ? 0.3 : 1 }}
            >
              ← Previous
            </button>
            <button
              onClick={() => setActive(Math.min(CASE_STUDY_STEPS.length - 1, active + 1))}
              disabled={active === CASE_STUDY_STEPS.length - 1}
              className="btn btn-primary"
              style={{ opacity: active === CASE_STUDY_STEPS.length - 1 ? 0.3 : 1 }}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─────────────────── LIVE WORKFLOW DEMO ─────────────────── */
const WORKFLOW_STEPS = [
  { id: 1, actor: 'Analyst', icon: '👤', title: 'Natural Language Query', desc: '"Show me Q3 profit margin by EV segment, broken down by region"', color: 'var(--accent-blue)' },
  { id: 2, actor: 'mAIstro', icon: '🎯', title: 'Intent Classification & Routing', desc: 'mAIstro classifies intent → Profit Analysis. Routes query to ProfitAgent via A2A protocol.', color: 'var(--accent-violet)' },
  { id: 3, actor: 'ProfitAgent', icon: '🗂️', title: 'Schema Lookup & Table Selection', desc: 'Semantic similarity ranks 200+ tables → selects: Sales_Q3_EV, Region_Master, Profit_Metrics', color: 'var(--accent-violet)' },
  { id: 4, actor: 'ProfitAgent', icon: '⚙️', title: 'SQL Generation', desc: 'Few-shot T-SQL prompt generates query with GROUP BY region, EV_segment, fiscal_quarter', color: 'var(--accent-violet)' },
  { id: 5, actor: 'ProfitAgent', icon: '✅', title: 'Execution & Validation', desc: 'Query executes in 0.38s. Row count and schema validated. 247 rows returned. No error — skipping correction loop.', color: 'var(--accent-emerald)' },
  { id: 6, actor: 'mAIstro', icon: '📊', title: 'MCP Chart Render', desc: 'mAIstro calls Visualization MCP Server → renders grouped bar chart. Langfuse trace #9f3a2c logged.', color: 'var(--accent-blue)' },
  { id: 7, actor: 'AG-UI', icon: '🖥️', title: 'Real-Time Frontend Sync', desc: 'CopilotKit streams final structured response + chart to analyst dashboard. Full trace visible in Langfuse.', color: 'var(--accent-cyan)' },
];

const WorkflowDemo = () => {
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const start = () => {
    setActive(0);
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    if (active >= WORKFLOW_STEPS.length - 1) {
      setRunning(false);
      return;
    }
    timerRef.current = setTimeout(() => setActive(p => p + 1), 1800);
    return () => clearTimeout(timerRef.current);
  }, [running, active]);

  return (
    <section className="section" id="workflow">
      <FadeIn>
        <p className="section-eyebrow">End-to-End Demonstration</p>
        <h2 className="section-title">Live Workflow Walkthrough</h2>
        <p className="section-desc" style={{ marginBottom: '3rem' }}>
          Watch a business analyst query traverse the entire mAIstro → ProfitAgent → MCP pipeline
          in real time — from natural language input to a rendered chart on the dashboard.
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="glass-card">
          {/* Query display */}
          <div style={{
            padding: '1rem 1.25rem', borderRadius: 10, marginBottom: '2rem',
            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)',
            fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem', color: '#93c5fd',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>analyst@maistro:~$</span>
            "Show me Q3 profit margin by EV segment, broken down by region"
          </div>

          {/* Pipeline steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {WORKFLOW_STEPS.map((step, i) => {
              const isActive = i === active;
              const isDone = i < active;
              const isPending = i > active;
              return (
                <div
                  key={step.id}
                  style={{
                    display: 'flex', gap: '1rem', padding: '1rem 0',
                    borderBottom: i < WORKFLOW_STEPS.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                    opacity: isPending ? 0.35 : 1,
                    transition: 'opacity 0.4s ease',
                  }}
                >
                  {/* Timeline */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 40 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: isDone ? 'rgba(16,185,129,0.15)' : isActive ? `${step.color}22` : 'rgba(255,255,255,0.04)',
                      border: `2px solid ${isDone ? 'var(--accent-emerald)' : isActive ? step.color : 'var(--border-subtle)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
                      transition: 'all 0.4s ease',
                      boxShadow: isActive ? `0 0 12px ${step.color}55` : 'none',
                    }}>
                      {isDone ? <CheckCircle2 size={16} color="var(--accent-emerald)" /> : step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.07em', color: isActive ? step.color : 'var(--text-muted)',
                        transition: 'color 0.3s',
                      }}>{step.actor}</span>
                      {isActive && running && (
                        <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Clock size={11} /> processing...
                        </span>
                      )}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.25rem' }}>{step.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, fontFamily: isActive ? 'JetBrains Mono, monospace' : 'inherit' }}>
                      {step.desc}
                    </div>
                  </div>

                  {/* Step number */}
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono', flexShrink: 0 }}>
                    {String(step.id).padStart(2, '0')}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={start} className="btn btn-primary" disabled={running}>
              {running ? '⏳ Running...' : active === 0 ? '▶ Run Workflow' : '↺ Replay'}
            </button>
            {!running && active === WORKFLOW_STEPS.length - 1 && (
              <span style={{ fontSize: '0.875rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={16} /> Workflow complete — chart rendered in 2.1s total
              </span>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

/* ─────────────────── DECISION MATRIX ─────────────────── */
const DECISIONS = [
  {
    scenario: 'Agent with complex multi-step state',
    chosen: 'LangGraph',
    alternatives: 'Vanilla LangChain, AutoGen',
    reason: 'Explicit node-level state machines guarantee deterministic, auditable control flow. Critical for financial and compliance-sensitive workflows where emergent behavior is a liability.',
    tag: 'tag-blue',
  },
  {
    scenario: 'NL → SQL over 200+ table schema',
    chosen: 'Semantic Table Selector + Few-shot SQL',
    alternatives: 'Full schema in context, ORM abstraction',
    reason: 'Feeding the full schema overflows context and confuses the model. A two-stage approach — rank tables first, then generate SQL — dramatically improves query quality and reduces hallucination.',
    tag: 'tag-violet',
  },
  {
    scenario: 'Document retrieval with structured relationships',
    chosen: 'Neo4j Graph RAG + Azure AI Search (Hybrid)',
    alternatives: 'Pure vector search (FAISS/Pinecone)',
    reason: 'Pure vector search misses multi-hop relational knowledge (e.g., "all instruments connected to pump P-101"). Graph traversal over Neo4j captures relationship-dependent queries that vector similarity cannot express.',
    tag: 'tag-cyan',
  },
  {
    scenario: 'LLM observability in production',
    chosen: 'Langfuse',
    alternatives: 'LangSmith, custom logging, OpenTelemetry only',
    reason: 'Langfuse provides structured trace views at the span level — each LLM call, tool invocation, and A2A message is logged with token counts, latency, and input/output diffs. This makes prompt regression testing tractable.',
    tag: 'tag-emerald',
  },
  {
    scenario: 'P&ID schematic entity extraction',
    chosen: 'PaLiGemma-3B (fine-tuned) + DETR',
    alternatives: 'GPT-4V, rule-based OCR, off-the-shelf YOLO',
    reason: 'General-purpose vision LLMs hallucinate P&ID symbols due to domain specificity. Fine-tuning PaLiGemma-3B on domain data with LoRA achieves far higher precision on instrument/equipment classes than zero-shot alternatives, at a fraction of the inference cost.',
    tag: 'tag-orange',
  },
  {
    scenario: 'Multi-agent communication protocol',
    chosen: 'A2A (Agent-to-Agent)',
    alternatives: 'Direct function calls, shared memory, REST polling',
    reason: 'A2A preserves strong agent state boundaries — each agent maintains its own context and capabilities. This enables independent scaling, versioning, and testing of each agent, and allows Maistro to discover agent capabilities at runtime without hardcoded dependencies.',
    tag: 'tag-blue',
  },
];

const DecisionMatrix = () => (
  <section className="section" id="decisions">
    <FadeIn>
      <p className="section-eyebrow">Engineering Judgement</p>
      <h2 className="section-title">Why I Chose Each Tool</h2>
      <p className="section-desc" style={{ marginBottom: '3rem' }}>
        Good engineering is about deliberate choices. For every major architectural decision across
        my projects, here is the rationale — including what I considered and why I didn't use it.
      </p>
    </FadeIn>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {DECISIONS.map((d, i) => (
        <FadeIn key={i} delay={i * 0.07}>
          <div className="glass-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.35rem' }}>Scenario</div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>{d.scenario}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.35rem' }}>Chosen Approach</div>
              <span className={`tag ${d.tag}`} style={{ display: 'inline-block', marginBottom: '0.4rem' }}>{d.chosen}</span>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>vs. {d.alternatives}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.35rem' }}>Rationale</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{d.reason}</p>
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  </section>
);

/* ─────────────────── CHALLENGING SITUATIONS ─────────────────── */
const CHALLENGES = [
  {
    id: 1,
    tag: 'SmartDocs · Computer Vision',
    tagColor: 'var(--accent-cyan)',
    icon: '🔄',
    title: 'Incremental Symbol Learning Across Expanding P&ID Clients',
    problem: 'Our DETR-based P&ID symbol detector was trained on a fixed set of ~200 symbol classes for the initial oil & gas client. Each new client we onboarded introduced entirely new symbol vocabularies — sometimes 50–100 new classes per project — with no overlap in annotation style or class definitions. Full retraining from scratch each time would cost weeks of GPU time and destroy accuracy on previously mastered clients.',
    approach: 'Designed an incremental learning pipeline using Elastic Weight Consolidation (EWC) — a regularization technique that penalizes changes to weights that were critical for old tasks, allowing the model to learn new symbol classes without catastrophic forgetting. We also maintained a small rehearsal buffer: 10–15% of the previous client\'s annotated samples were replayed during each new client fine-tune. Combined with a LoRA adapter approach, each new client got its own lightweight adapter layer on top of the frozen backbone — meaning client isolation, rollback capability, and zero cross-contamination between client data.',
    outcome: 'New client onboarding went from 3–4 weeks of full retraining to ~4 days of incremental fine-tuning. The rehearsal buffer kept old-client accuracy degradation under 3% across all retained clients.',
    highlight: 'EWC + rehearsal replay + per-client LoRA adapters: zero catastrophic forgetting at 4-day onboarding speed.',
  },
  {
    id: 2,
    tag: 'SmartDocs · PaLiGemma Fine-Tuning',
    tagColor: 'var(--accent-violet)',
    icon: '📊',
    title: 'Data Sheet Table Diversity — Fine-Tuning PaLiGemma-3B Per Client',
    problem: 'Engineering data sheets from different clients look completely different: different column layouts, units, merged cells, rotated headers, and domain-specific terminology. A model fine-tuned on one client\'s data sheets would fail silently on another\'s — returning wrong values or missing fields entirely — with no obvious error signal to the end user.',
    approach: 'Rather than building one universal extractor, we built a client-specific fine-tuning pipeline for PaLiGemma-3B using PEFT/LoRA. Each client\'s annotated data sheets became a fine-tuning dataset where the model was trained to recognize that client\'s exact column schema, unit conventions, and table structures. We also built an automatic routing layer: when a document was ingested, a lightweight classifier identified the client/document-type combination and loaded the correct LoRA adapter from a registry before running extraction. For newly encountered layouts with no prior training, we introduced an active learning loop — low-confidence extractions were flagged for human review, then fed back as new training samples for the next adapter version.',
    outcome: 'Field extraction accuracy jumped from ~62% (generic model) to 91%+ (per-client fine-tuned) across three client deployments. The active learning loop reduced annotation burden by surfacing only the genuinely ambiguous edge cases.',
    highlight: 'Per-client LoRA adapters + automatic routing + active learning loop → 91%+ extraction accuracy across heterogeneous data sheet schemas.',
  },
  {
    id: 3,
    tag: 'mAIstro · Real-Time Streaming',
    tagColor: 'var(--accent-blue)',
    icon: '⚡',
    title: 'Out-of-Band Artifact Delivery Without Blocking LLM Token Stream',
    problem: 'Agent tool calls in mAIstro could return large structured payloads — Parquet DataFrames with 10k+ rows, Plotly chart JSON with hundreds of data points — that are useless inside the LLM context window but must be delivered to the frontend in sync with the SSE stream. Injecting these payloads inline would bloat the LLM context, break streaming latency, and cause the frontend to hang waiting for a multi-MB payload before rendering any text.',
    approach: 'Designed a two-channel delivery architecture: the LLM token stream continued uninterrupted via the AG-UI SSE endpoint, while artifact payloads were pushed out-of-band using a per-request ContextVar-scoped payload queue. After each tool call completed, the artifact bytes were stored in PostgreSQL as BYTEA, and a lightweight CUSTOM SSE event carrying only the artifact manifest (ID, type, token) was injected into the stream. The frontend used this manifest to asynchronously fetch the full artifact over a separate REST endpoint, decoding Parquet bytes client-side via the Apache Arrow JS library. This meant text streaming never stalled, charts appeared immediately after the manifest event, and the LLM never saw raw binary data.',
    outcome: 'Time-to-first-token was unaffected by artifact size. Frontend chart render latency dropped from 3–4s (synchronous injection) to under 800ms (manifest + async fetch). Zero LLM context tokens consumed by tabular data.',
    highlight: 'ContextVar-scoped payload queue + CUSTOM SSE events + async frontend fetch: streaming and artifacts fully decoupled.',
  },
  {
    id: 4,
    tag: 'ProfitAgent · SQL Reliability',
    tagColor: 'var(--accent-emerald)',
    icon: '🛡️',
    title: 'Zero-Hallucination SQL on Categorical Filters Across 200+ Tables',
    problem: 'ProfitAgent operated against a 200+ table Fabric (T-SQL) schema with deeply domain-specific categorical values — market codes like \'MBUSA\', segment identifiers, fiscal quarter labels — that the LLM had never seen in pretraining. Generated SQL would frequently use plausible-looking but wrong filter values (e.g., market = \'US\' instead of market = \'MBUSA\'), which would execute without error but silently return empty result sets or wrong subsets — the worst failure mode for a financial analytics tool.',
    approach: 'Built a runtime knowledge injection pipeline using a Config singleton with hot-reloadable domain knowledge stored in PostgreSQL. Column-level metadata entries carried actual enum values for categorical columns via a template placeholder system (e.g., {{Sales.market}} would expand to a concrete allowlist of valid market codes at inference time). Only the knowledge entries relevant to the selected tables were injected, keeping prompts within token budgets. Added a semantic validation step post-generation: before execution, the SQL was parsed with SQLGlot and filter values were checked against known enums — invalid values triggered an LLM correction pass with the valid enum list explicitly in context, rather than falling through to a silent wrong-result execution.',
    outcome: 'Categorical filter hallucination dropped to near-zero after the enum expansion system was deployed. The semantic pre-execution validation layer caught edge cases that even the LLM correction loop missed, providing a deterministic safety net beneath the probabilistic generation layer.',
    highlight: 'Enum placeholder expansion at inference time + SQLGlot pre-execution validation: categorical hallucination eliminated without prompt bloat.',
  },
];

const ChallengingSituations = () => {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="section" id="challenges">
      <FadeIn>
        <p className="section-eyebrow">Battle-Tested Engineering</p>
        <h2 className="section-title">Challenging Situations &amp; How I Solved Them</h2>
        <p className="section-desc" style={{ marginBottom: '3rem' }}>
          Real production problems are rarely clean. These are four situations where standard approaches
          failed and required novel engineering thinking — from vision model continual learning to
          real-time streaming decoupling.
        </p>
      </FadeIn>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {CHALLENGES.map((c, i) => {
          const isOpen = openId === c.id;
          return (
            <FadeIn key={c.id} delay={i * 0.07}>
              <div
                className="glass-card"
                style={{
                  borderLeft: `3px solid ${c.tagColor}`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  padding: '1.5rem',
                }}
                onClick={() => setOpenId(isOpen ? null : c.id)}
              >
                {/* Header row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
                    <span style={{ fontSize: '1.75rem', flexShrink: 0, lineHeight: 1 }}>{c.icon}</span>
                    <div>
                      <span style={{
                        display: 'inline-block', marginBottom: '0.4rem',
                        fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                        letterSpacing: '0.08em', color: c.tagColor,
                      }}>{c.tag}</span>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.4, color: 'var(--text-primary)' }}>
                        {c.title}
                      </h3>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '1.2rem', color: 'var(--text-muted)', flexShrink: 0,
                    transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    marginTop: '0.1rem',
                  }}>+</span>
                </div>

                {/* Expanded content */}
                {isOpen && (
                  <div
                    style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{
                        padding: '1rem 1.1rem', borderRadius: 10,
                        background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)',
                      }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          🔍 The Problem
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{c.problem}</p>
                      </div>
                      <div style={{
                        padding: '1rem 1.1rem', borderRadius: 10,
                        background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-subtle)',
                      }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                          🔧 What We Did
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{c.approach}</p>
                      </div>
                    </div>

                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
                    }}>
                      <div style={{
                        padding: '1rem 1.1rem', borderRadius: 10,
                        background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)',
                      }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-emerald)', marginBottom: '0.5rem' }}>
                          ✅ Outcome
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{c.outcome}</p>
                      </div>
                      <div style={{
                        padding: '1rem 1.1rem', borderRadius: 10,
                        background: `rgba(${c.tagColor === 'var(--accent-blue)' ? '59,130,246' : c.tagColor === 'var(--accent-violet)' ? '139,92,246' : c.tagColor === 'var(--accent-cyan)' ? '6,182,212' : '16,185,129'},0.06)`,
                        border: `1px solid ${c.tagColor}30`,
                        display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
                      }}>
                        <Lightbulb size={15} color={c.tagColor} style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: c.tagColor, marginBottom: '0.4rem' }}>Key Insight</div>
                          <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.65, fontStyle: 'italic' }}>{c.highlight}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

/* ─────────────────── GROWTH GOALS ─────────────────── */
const GOALS = [
  {
    icon: '🏗️',
    title: 'AI Infrastructure Leadership',
    body: 'I want to move from building individual agentic systems to defining the infrastructure layer that multiple teams build on — evaluation frameworks, observability standards, and reusable orchestration patterns.',
    timeframe: '12 – 18 months',
  },
  {
    icon: '📐',
    title: 'Formal Evaluation Frameworks',
    body: 'Current LLM evaluation is inconsistent across the industry. I want to develop and contribute to rigorous, domain-specific evaluation methodologies — especially for financial and engineering intelligence use cases where grounding accuracy is non-negotiable.',
    timeframe: 'Ongoing',
  },
  {
    icon: '🌐',
    title: 'Cross-Domain Agent Ecosystems',
    body: 'mAIstro taught me the value of A2A communication. The next step is building open, interoperable agent ecosystems where domain-specific agents from different providers can collaborate securely — with standardized capability discovery and trust models.',
    timeframe: '2 – 3 years',
  },
  {
    icon: '🎓',
    title: 'Knowledge Transfer & Team Building',
    body: 'The biggest multiplier for an AI engineer is uplifting the team around them. I want to establish strong AI engineering practices — prompt versioning, evaluation gates, observability-first design — as team standards, not individual habits.',
    timeframe: 'From day one',
  },
];

const GrowthGoals = () => (
  <section className="section" id="growth">
    <FadeIn>
      <p className="section-eyebrow">Career Vision</p>
      <h2 className="section-title">What I'm Building Towards</h2>
      <p className="section-desc" style={{ marginBottom: '3rem' }}>
        Technical skills plateau without a clear direction. Here is what I am actively working
        toward — both as an engineer and as a leader — and how this role fits that trajectory.
      </p>
    </FadeIn>
    <div className="grid-2">
      {GOALS.map((g, i) => (
        <FadeIn key={i} delay={i * 0.1}>
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '2rem' }}>{g.icon}</span>
              <span className="tag tag-violet" style={{ fontSize: '0.7rem' }}>{g.timeframe}</span>
            </div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{g.title}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{g.body}</p>
          </div>
        </FadeIn>
      ))}
    </div>

    {/* Why this role */}
    <FadeIn delay={0.2}>
      <div className="glass-card" style={{
        marginTop: '2rem',
        borderLeft: '3px solid var(--accent-blue)',
        background: 'rgba(59,130,246,0.04)',
      }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Target size={20} color="var(--accent-blue)" /> Why This Role Is the Right Fit
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
          The intersection of enterprise AI deployment and ambitious product thinking is exactly where
          I want to operate. I have spent five years building systems that work in production under real
          constraints — not in demo environments. I am looking for a role where that experience compounds:
          where I can set the technical direction for agentic AI, contribute to how the organisation evaluates
          and governs AI outputs, and work alongside a team that treats engineering rigor as a competitive
          advantage rather than an afterthought.
        </p>
      </div>
    </FadeIn>
  </section>
);

/* ─────────────────── SHOWCASE PAGE ─────────────────── */
const Showcase = () => {
  const sections = [
    { id: 'impact', label: 'AI Impact', icon: <TrendingUp size={14} /> },
    { id: 'workflow', label: 'Live Demo', icon: <Zap size={14} /> },
    { id: 'case-study', label: 'Case Study', icon: <BookOpen size={14} /> },
    { id: 'decisions', label: 'Decision Matrix', icon: <BarChart3 size={14} /> },
    { id: 'challenges', label: 'Hard Problems', icon: <Zap size={14} /> },
    { id: 'growth', label: 'Growth Goals', icon: <Target size={14} /> },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Sub-nav */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 90,
        background: 'rgba(4,5,7,0.85)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.6rem 0',
      }}>
        <div className="page" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className="btn btn-ghost"
              style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="page">
        <div style={{ paddingTop: '4rem' }}>
          <FadeIn>
            <p className="section-eyebrow">Practical Skills Showcase</p>
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em',
              background: 'linear-gradient(135deg, #fff 30%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              lineHeight: 1.05, marginBottom: '1rem',
            }}>
              Proof of Work.
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: 620, lineHeight: 1.75, marginBottom: '1rem' }}>
              Numbers, decisions, and walkthroughs — demonstrating how AI engineering translates
              into measurable business outcomes in production environments.
            </p>
          </FadeIn>
        </div>

        <hr className="section-divider" style={{ margin: '3rem 0' }} />
        <ImpactDashboard />
        <hr className="section-divider" style={{ margin: '0' }} />
        <WorkflowDemo />
        <hr className="section-divider" style={{ margin: '0' }} />
        <CaseStudy />
        <hr className="section-divider" style={{ margin: '0' }} />
        <DecisionMatrix />
        <hr className="section-divider" style={{ margin: '0' }} />
        <ChallengingSituations />
        <hr className="section-divider" style={{ margin: '0' }} />
        <GrowthGoals />
      </div>

      <footer>
        <p>Priyank Jha &mdash; Practical Skills Showcase &mdash; Capgemini &copy; 2026</p>
      </footer>
    </>
  );
};

export default Showcase;
