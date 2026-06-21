import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutDashboard, Database, BrainCircuit, Cpu, BookOpen } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const SKILLS = [
  { label: 'LangGraph', icon: '🔁' },
  { label: 'LangChain', icon: '⛓️' },
  { label: 'Multi-Agent A2A', icon: '🤝' },
  { label: 'Model Context Protocol', icon: '🔌' },
  { label: 'Text2SQL', icon: '📊' },
  { label: 'RAG & Graph RAG', icon: '🧠' },
  { label: 'Azure OpenAI', icon: '☁️' },
  { label: 'CopilotKit / AG-UI', icon: '🖥️' },
  { label: 'Langfuse', icon: '📡' },
  { label: 'Neo4j', icon: '🕸️' },
  { label: 'Azure AI Studio', icon: '🏗️' },
  { label: 'Prompt Flow', icon: '🌊' },
  { label: 'Semantic Kernel', icon: '⚙️' },
  { label: 'Autogen', icon: '🤖' },
  { label: 'Python', icon: '🐍' },
  { label: 'FastAPI', icon: '⚡' },
];

const FEATURED_PROJECTS = [
  {
    id: 'maistro',
    label: 'Mercedes-Benz R\u0026D India · Capgemini',
    title: 'mAIstro',
    desc: 'Enterprise-grade multi-agent orchestrator coordinating domain-specific AI agents over an A2A communication protocol with MCP tool integrations and real-time frontend sync.',
    tags: ['Multi-Agent', 'A2A', 'MCP', 'CopilotKit'],
    icon: <LayoutDashboard size={22} />,
    accent: 'var(--accent-blue)',
  },
  {
    id: 'profit-agent',
    label: 'Mercedes-Benz R\u0026D India · Capgemini',
    title: 'ProfitAgent',
    desc: 'A self-correcting LangGraph orchestrator translating natural language business queries into verified SQL statements, with full Langfuse observability across every reasoning step.',
    tags: ['Text2SQL', 'LangGraph', 'Langfuse'],
    icon: <Database size={22} />,
    accent: 'var(--accent-violet)',
  },
  {
    id: 'smartdocs',
    label: 'Drishya AI Labs · Oil \u0026 Gas Client',
    title: 'SmartDocs \u0026 Junior',
    desc: 'A dual-layer intelligent document platform: SmartDocs extracts and indexes unstructured engineering content into a Neo4j Knowledge Graph; Junior surfaces insights through a conversational RAG interface.',
    tags: ['Graph RAG', 'Neo4j', 'Azure AI Search'],
    icon: <BookOpen size={22} />,
    accent: 'var(--accent-cyan)',
  },
  {
    id: 'it-ticket',
    label: 'Drishya AI Labs · Enterprise IT Client',
    title: 'IT Ticket Graph RAG',
    desc: 'A hybrid RAG system combining Neo4j graph traversal and Azure AI Search to triage millions of historical IT tickets, cutting mean time-to-resolution for high-severity GPU incidents by ~40%.',
    tags: ['Graph RAG', 'Neo4j', 'Semantic Kernel', 'Azure AI'],
    icon: <BrainCircuit size={22} />,
    accent: '#f59e0b',
  },
  {
    id: 'silverland',
    label: 'Drishya AI Labs · Real Estate',
    title: 'SilverLand AI Assistant',
    desc: 'A LangGraph + MCP-based agentic assistant supporting real-estate discovery, comparison, investment analysis, and booking workflows through deterministic, explainable tool orchestration.',
    tags: ['LangGraph', 'MCP', 'Text2SQL', 'Tool Orchestration'],
    icon: <Cpu size={22} />,
    accent: 'var(--accent-emerald)',
  },
];

const Home = () => (
  <>
    {/* ── HERO ── */}
    <div className="page">
      <section className="hero">
        <FadeIn>
          <div className="hero-eyebrow">Senior Consultant (AI) &amp; Agentic Systems Architect</div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h1>
            Building the <em>Agentic AI</em><br />
            Infrastructure of Tomorrow.
          </h1>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="hero-sub">
            I design and deliver production-grade multi-agent systems that transform how enterprises
            interact with their data. Currently driving AI-led transformation at Mercedes-Benz R&amp;D India
            through Capgemini, with a focus on orchestration, observability, and scalable reasoning pipelines.
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="hero-cta">
            <Link to="/showcase" className="btn btn-primary">
              ✦ View Showcase <ArrowRight size={16} />
            </Link>
            <Link to="/projects" className="btn btn-ghost">
              <LayoutDashboard size={16} /> All Projects
            </Link>
            <Link to="/experience" className="btn btn-ghost">
              Experience
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── STATS ── */}
      <FadeIn delay={0.1}>
        <div className="stats-strip">
          <div className="stat-item">
            <div className="number">5+</div>
            <div className="label">Years in AI/ML</div>
          </div>
          <div className="stat-item">
            <div className="number">5</div>
            <div className="label">Production AI Systems</div>
          </div>
          <div className="stat-item">
            <div className="number">15+</div>
            <div className="label">AI Frameworks Used</div>
          </div>
          <div className="stat-item">
            <div className="number">40%</div>
            <div className="label">Avg. Efficiency Gain</div>
          </div>
        </div>
      </FadeIn>
    </div>

    <hr className="section-divider" />

    {/* ── FEATURED PROJECTS ── */}
    <div className="page">
      <section className="section">
        <FadeIn>
          <p className="section-eyebrow">Selected Work</p>
          <h2 className="section-title">Flagship Engineering Projects</h2>
          <p className="section-desc" style={{ marginBottom: '3rem' }}>
            Each project below represents a production deployment addressing a real enterprise challenge —
            from financial analytics orchestration to knowledge graph-powered document intelligence.
          </p>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {FEATURED_PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1}>
              <Link to={`/projects#${p.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="glass-card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                    background: `linear-gradient(135deg, ${p.accent}22, ${p.accent}11)`,
                    border: `1px solid ${p.accent}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: p.accent
                  }}>
                    {p.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{p.label}</div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>{p.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.875rem' }}>{p.desc}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {p.tags.map(t => <span key={t} className="tag tag-blue">{t}</span>)}
                    </div>
                  </div>
                  <ArrowRight size={18} style={{ color: 'var(--text-muted)', flexShrink: 0, marginTop: '0.25rem' }} />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3}>
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/projects" className="btn btn-ghost">View All Projects &amp; Architectures <ArrowRight size={16} /></Link>
          </div>
        </FadeIn>
      </section>
    </div>

    <hr className="section-divider" />

    {/* ── SKILLS ── */}
    <div className="page">
      <section className="section">
        <FadeIn>
          <p className="section-eyebrow">Technical Toolkit</p>
          <h2 className="section-title">Core Competencies</h2>
          <p className="section-desc" style={{ marginBottom: '2.5rem' }}>
            A practitioner's toolkit built through hands-on deployment of enterprise AI systems.
          </p>
        </FadeIn>
        <div className="grid-4">
          {SKILLS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.04}>
              <div className="skill-chip">
                <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
                {s.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>

    <footer>
      <p>Priyank Jha &mdash; Lead Data Scientist &amp; Senior AI Engineer &mdash; Capgemini &copy; 2026</p>
    </footer>
  </>
);

export default Home;
