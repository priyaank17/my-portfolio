import React from 'react';
import FadeIn from '../components/FadeIn';

const PILLARS = [
  {
    icon: '🧩',
    title: 'Strict Separation of Concerns',
    body: 'In every agentic system I build, reasoning (LLM), retrieval (SQL/Graph/Vector), execution (tools), and presentation (frontend) are explicitly separated. This prevents cascading failures, simplifies debugging, and makes each component independently auditable — critical for financial and safety-sensitive domains.',
    accent: 'var(--accent-blue)',
  },
  {
    icon: '🔌',
    title: 'MCP as the Universal Context Gateway',
    body: 'The Model Context Protocol standardizes how agents expose capabilities and consume external tools. By deploying first-party MCP servers (e.g., the Visualization MCP Server in Maistro), I decouple charting, database access, and retrieval from the reasoning layer — making the stack portable and testable.',
    accent: 'var(--accent-violet)',
  },
  {
    icon: '🔁',
    title: 'Deterministic Control Flow over Pure Autonomy',
    body: 'For enterprise deployments, uncontrolled agent autonomy is a liability. I use LangGraph\'s explicit state machine model and typed node transitions to guarantee that high-risk operations (e.g., SQL execution against financial databases) always go through defined checkpoints and validation steps.',
    accent: 'var(--accent-cyan)',
  },
  {
    icon: '📊',
    title: 'Evaluation-Driven Development',
    body: 'I integrate evaluation from day one using Langfuse tracing, Azure AI Studio Prompt Flow, and custom grounding score metrics. For production pipelines, no prompt change ships without a measurable delta in evaluation results. This forces the team to think rigorously about quality rather than anecdotally.',
    accent: 'var(--accent-emerald)',
  },
  {
    icon: '🛡️',
    title: 'Hallucination Containment by Design',
    body: 'Especially in financial analytics, hallucinated data is more dangerous than a system outage. My pipelines employ schema-constrained SQL generation, result-set verification, source attribution in every answer, and Langfuse-logged human-in-the-loop escalation triggers for low-confidence responses.',
    accent: '#f59e0b',
  },
  {
    icon: '📡',
    title: 'Full-Stack Observability as a First-Class Requirement',
    body: 'Every production AI system I build ships with Langfuse end-to-end tracing covering LLM call metadata (tokens, latency, model version), tool invocations, A2A message payloads, and user feedback signals. Observability is not bolted on — it is part of the system architecture from sprint one.',
    accent: '#ec4899',
  },
];

const HOW_I_WORK = [
  { step: '01', title: 'Scope the Problem, Not the Solution', body: 'Before selecting a technology, I work to deeply understand the business constraint — the data shape, failure modes, latency expectations, and regulatory boundaries. This prevents over-engineering and ensures the right tool is chosen for the right job.' },
  { step: '02', title: 'Prototype for Learning, Not for Demos', body: 'Early prototypes are throwaway code designed to answer one question: "Is this approach fundamentally viable?" I avoid demo-driven development — a prototype that impresses but cannot scale is worse than no prototype.' },
  { step: '03', title: 'Build for the Unhappy Path', body: 'Most AI system failures are not catastrophic collapses but subtle degradations. I build explicit error handling, fallback paths, and alerting for edge cases from the start. In LangGraph pipelines, every node has defined failure semantics.' },
  { step: '04', title: 'Treat Every Prompt as Production Code', body: 'Prompt engineering is engineering. Prompts live in version control, have unit tests (via Prompt Flow), and go through review before deployment. Ad-hoc prompt editing in production is treated as a hotfix, not a standard operation.' },
];

const AI_EFFICIENCY = [
  {
    title: 'MCP-Driven Developer Environments',
    desc: 'By configuring custom Model Context Protocol (MCP) gateways in the developer workspace, I connect code repositories, compilers, and databases directly to LLM agents. This automates schema inspections, context assembly, and code compilation loops, resulting in a 40% reduction in debugging latency.',
    metric: '40% faster debugging',
  },
  {
    title: 'Automated Prompt Evaluation & Testing',
    desc: 'Instead of manually testing prompts, I build programmatic evaluation gates using Azure AI Studio and Prompt Flow. This runs batch evaluations of grounding accuracy, faithfulness, and relevance against gold standard datasets on every commit, saving hours of manual QA.',
    metric: '80% faster prompt tuning',
  },
  {
    title: 'AI-Generated Infrastructure & Shell Automation',
    desc: 'I leverage LLM-driven generation for complex bash scripts and Azure CLI templates to orchestrate deployments (ACR, ACA, AKS, Neo4j, Azure Search). This speeds up new environment setups and ensures consistent infrastructure configuration.',
    metric: 'Environment setups in minutes',
  },
  {
    title: 'Co-Pilot-Accelerated Coding & Scaffolding',
    desc: 'I use advanced pair-programming agents for generating boilerplate, refactoring complex code blocks, and writing unit test coverage. This doubles coding velocity, allowing engineering focus to remain on system design and validation.',
    metric: '2x development throughput',
  },
];

const Methodology = () => (
  <>
    <div className="page">
      <section className="section">
        <FadeIn>
          <p className="section-eyebrow">Engineering Philosophy</p>
          <h2 className="section-title">How I Approach AI System Design</h2>
          <p className="section-desc" style={{ marginBottom: '3.5rem' }}>
            These principles are not theoretical preferences — they are hard-won lessons from shipping
            production AI systems where correctness, reliability, and trust are non-negotiable.
          </p>
        </FadeIn>

        <div className="grid-3">
          {PILLARS.map((p, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="glass-card" style={{ borderTop: `2px solid ${p.accent}` }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{p.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{p.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>

    <hr className="section-divider" />

    <div className="page">
      <section className="section">
        <FadeIn>
          <p className="section-eyebrow">Working Style</p>
          <h2 className="section-title">How I Work in Practice</h2>
          <p className="section-desc" style={{ marginBottom: '3rem' }}>
            Beyond architecture principles, the following describes the practical habits that define
            how I approach problem-solving in real delivery environments.
          </p>
        </FadeIn>
        <div className="grid-2">
          {HOW_I_WORK.map((h, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="glass-card">
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>{h.step}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{h.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{h.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>

    <hr className="section-divider" />

    <div className="page">
      <section className="section">
        <FadeIn>
          <p className="section-eyebrow">Developer Velocity</p>
          <h2 className="section-title">AI as a Force Multiplier for Engineering</h2>
          <p className="section-desc" style={{ marginBottom: '3rem' }}>
            To deliver enterprise systems under tight deadlines, I treat AI co-piloting not as a shortcut, 
            but as a disciplined developer efficiency loop. Here is how I structure my own workspace to maximize velocity.
          </p>
        </FadeIn>
        <div className="grid-2">
          {AI_EFFICIENCY.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <span className="tag tag-blue" style={{ width: 'fit-content' }}>{item.metric}</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>

    <footer>
      <p>Priyank Jha &mdash; Engineering Philosophy &mdash; Capgemini &copy; 2026</p>
    </footer>
  </>
);

export default Methodology;
