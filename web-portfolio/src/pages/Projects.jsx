import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Database, BookOpen, Cpu, Bot, Terminal, BrainCircuit, Network } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { MaistroArchDetailed, ProfitArchDetailed, SmartDocsArchDetailed, JuniorArchDetailed } from '../components/ArchDiagrams';

const GitHubIcon = ({ size = 11 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);


/* ─────────────────── CHAT DEMO ─────────────────── */
const INITIAL_MESSAGES = [
  { role: 'agent', agent: 'mAIstro', text: 'mAIstro orchestrator initialized. I have ProfitAgent, Mira, and Minerva agents available. What would you like to analyze today?' },
  { role: 'user', text: 'What were the top 3 cost-overrun vehicle programs in Q3?' },
  { role: 'agent', agent: 'mAIstro', text: 'Intent recognized: Cost Analysis → delegating to Minerva Agent via A2A...' },
  { role: 'agent', agent: 'Minerva', text: 'Running cost variance analysis.\nGenerating SQL for Cost_Actuals vs Cost_Budget...\nQuery executed (0.42s). Results returned to mAIstro.' },
  { role: 'agent', agent: 'mAIstro', text: 'Results aggregated and formatted. Visualization request sent to MCP Chart Server. Langfuse trace: span_id #9f3a2c logged.' },
];

const DEMO_REPLIES = [
  { role: 'agent', agent: 'mAIstro', text: 'Routing to ProfitAgent for financial query processing...' },
  { role: 'agent', agent: 'ProfitAgent', text: 'Intent parsed → Table Selection → Profit_Q3_EV selected.\nSQL generation complete. Executing...\nQuery returned 247 rows in 0.38s. Sending structured results back.' },
  { role: 'agent', agent: 'mAIstro', text: 'Response synthesized. Trace logged in Langfuse. MCP Visualization Server rendered bar chart for EV segment margins.' },
];

const ChatDemo = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [replyIdx, setReplyIdx] = useState(0);
  const bottomRef = React.useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    const replies = DEMO_REPLIES.slice(0, 3);
    replies.forEach((r, i) => {
      setTimeout(() => setMessages(prev => [...prev, r]), 700 * (i + 1));
    });
    setReplyIdx(prev => prev + 1);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <Bot size={18} color="var(--accent-blue)" />
        <span className="chat-header-title">mAIstro Orchestrator Terminal</span>
        <span className="chat-header-status">Live Demo</span>
      </div>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.role}`}>
            {m.role === 'agent' && <div className="agent-label">{m.agent}</div>}
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form className="chat-input-row" onSubmit={send}>
        <input
          className="chat-input"
          placeholder="Ask mAIstro about Mercedes-Benz analytics..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1rem' }}>
          <Terminal size={16} />
        </button>
      </form>
    </div>
  );
};

/* ─────────────────── PROJECT NAV ─────────────────── */
const PROJECT_NAV = [
  { id: 'maistro', label: '01', title: 'mAIstro', tag: 'Multi-Agent Orchestrator', icon: <LayoutDashboard size={14} /> },
  { id: 'profit-agent', label: '02', title: 'ProfitAgent', tag: 'Text2SQL · LangGraph', icon: <Database size={14} /> },
  { id: 'smartdocs', label: '03', title: 'SmartDocs', tag: 'Knowledge Graph RAG', icon: <BookOpen size={14} /> },
  { id: 'junior', label: '04', title: 'Junior', tag: 'Conversational RAG', icon: <Cpu size={14} /> },
  { id: 'it-ticket', label: '05', title: 'IT Ticket RAG', tag: 'Graph RAG · Triage', icon: <BrainCircuit size={14} /> },
  { id: 'silverland', label: '06', title: 'SilverLand', tag: 'LangGraph · MCP', icon: <Network size={14} /> },
];

/* ─────────────────── PROJECTS PAGE ─────────────────── */
const Projects = () => {
  const { hash } = useLocation();
  const [showArch, setShowArch] = useState({
    maistro: false,
    'profit-agent': false,
    smartdocs: false,
    junior: false,
  });

  const toggleArch = (id) => {
    setShowArch(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        if (id === 'maistro' || id === 'profit-agent' || id === 'smartdocs' || id === 'junior') {
          setShowArch(prev => ({ ...prev, [id]: true }));
        }
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [hash]);

  return (
    <>
      <div className="page">
        <section style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
          <FadeIn>
            <p className="section-eyebrow">Engineering Portfolio</p>
            <h2 className="section-title">Production AI Systems</h2>
            <p className="section-desc" style={{ marginBottom: '3rem' }}>
              A detailed breakdown of enterprise AI solutions — detailing architectural decisions,
              observability frameworks, and engineering methodologies. Each project reflects a production deployment
              with verified business impact.
            </p>
          </FadeIn>

          {/* Project Navigation Strip */}
          <FadeIn delay={0.1}>
            <div className="project-nav-strip">
              {PROJECT_NAV.map(p => (
                <a key={p.id} href={`#${p.id}`} className="project-nav-card">
                  <span className="proj-label">{p.label}</span>
                  <span className="proj-title">{p.title}</span>
                  <span className="proj-tag">{p.tag}</span>
                </a>
              ))}
            </div>
          </FadeIn>
        </section>
      </div>

      <hr className="section-divider" />

      {/* ════════ MAISTRO ════════ */}
      <div className="page">
        <section className="section" id="maistro" style={{ scrollMarginTop: '80px' }}>
          <FadeIn>
            <div className="project-hero-meta">
              <span className="tag tag-blue"><LayoutDashboard size={11} /> Multi-Agent Orchestrator</span>
              <span className="tag tag-violet">A2A Protocol</span>
              <span className="tag tag-cyan">MinIO Skills Middleware</span>
              <span className="tag tag-emerald">Langfuse Observability</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mercedes-Benz R&amp;D India</span>
            </div>
            <h2 className="section-title">mAIstro — Multi-Agent Orchestration Platform</h2>
            <p className="section-desc">
              Built a production-grade multi-agent orchestration backend using LangGraph + DeepAgents that routes natural language queries to specialized downstream AI agents via the A2A (Agent-to-Agent) protocol. It serves as the central intelligence layer between a chat frontend and a fleet of domain-specific agents (financial analytics, sales data, visualization).
            </p>
          </FadeIn>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button 
              onClick={() => toggleArch('maistro')} 
              className="btn btn-ghost" 
              style={{ borderColor: 'var(--accent-blue)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {showArch.maistro ? 'Hide Architecture Diagram' : 'View System Architecture Diagram'}
            </button>
          </div>

          {showArch.maistro && (
            <FadeIn delay={0.1} style={{ marginTop: '2rem' }}>
              <div className="arch-diagram">
                <div className="arch-title">Detailed System Architecture · mAIstro (5 Layers)</div>
                <MaistroArchDetailed />
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.15} style={{ marginTop: '3rem' }}>
            <div className="grid-3">
              <div className="glass-card">
                <span className="tag tag-blue" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Architecture &amp; Engineering</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dynamic Orchestrator</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  Designed a LangGraph ReAct graph wrapped with DeepAgents skills middleware that supports dynamic skill injection from MinIO at runtime without restarts.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  Implemented AG-UI protocol SSE streaming endpoint (POST /agui) delivering fully typed events (TEXT_MESSAGE_*, TOOL_CALL_*, STATE_SNAPSHOT, CUSTOM) in real time.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Built dual LLM support within the same graph (Azure OpenAI &amp; Claude via AWS Bedrock Converse) routed through corporate Nexus proxy, selected per-request via forwarded props.
                </p>
              </div>

              <div className="glass-card">
                <span className="tag tag-violet" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Security &amp; Context Propagation</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>RLS Context Chain</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  Engineered custom RLSLangGraphAgent combining AG-UI compatibility and per-request Row Level Security (RLS) context propagation for downstream Fabric-backed agents.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  Implemented context propagation using Python ContextVar so user identity, session ID, Langfuse trace IDs, and user roles survive across asyncio boundaries and worker threads.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  User identity and roles flow from frontend → mAIstro headers → A2A metadata → Fabric connection context, enforcing data security at the database connection layer.
                </p>
              </div>

              <div className="glass-card">
                <span className="tag tag-cyan" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Data System &amp; Observability</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Artifacts &amp; Traces</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  Designed a capability-token-based artifact system: structured payloads (Parquet, Plotly JSON) stored out-of-context in PostgreSQL; LLM only sees lightweight manifests to prevent context bloat.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  Built SSE delivery using a per-request ContextVar-scoped queue, streaming artifact payloads as CUSTOM events immediately after each tool call.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Integrated Langfuse for distributed tracing (tool call spans, environment-filtered prompt versioning) and monkey-patched Bedrock thinking format support.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} style={{ marginTop: '2rem' }}>
            <div className="glass-card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Interactive Demo — mAIstro Agent Terminal</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                The dialogue below simulates mAIstro's orchestration behavior. Type a business question to see how intent routing, A2A delegation, and response synthesis work in practice.
              </p>
              <ChatDemo />
            </div>
          </FadeIn>
        </section>
      </div>

      <hr className="section-divider" />

      {/* ════════ PROFIT AGENT ════════ */}
      <div className="page">
        <section className="section" id="profit-agent" style={{ scrollMarginTop: '80px' }}>
          <FadeIn>
            <div className="project-hero-meta">
              <span className="tag tag-violet"><Database size={11} /> Supervised Text2SQL</span>
              <span className="tag tag-blue">LangGraph Resilience</span>
              <span className="tag tag-cyan">SQLGlot Dialect Translation</span>
              <span className="tag tag-emerald">Audit Tracer Logs</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mercedes-Benz R&amp;D India</span>
            </div>
            <h2 className="section-title">ProfitAgent (DBrainDemo) — Text-to-SQL Analytics Agent</h2>
            <p className="section-desc">
              Built a supervised Text-to-SQL agent that converts natural language business questions into SQL, executes against enterprise data sources (Microsoft Fabric, Databricks, PostgreSQL), and returns structured results with AI-generated explanations and Plotly visualizations. Exposed as both a standalone Streamlit + FastAPI app and an A2A-compliant agent.
            </p>
          </FadeIn>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button 
              onClick={() => toggleArch('profit-agent')} 
              className="btn btn-ghost" 
              style={{ borderColor: 'var(--accent-violet)', color: 'var(--accent-violet)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {showArch['profit-agent'] ? 'Hide Pipeline Architecture' : 'View Pipeline Architecture'}
            </button>
          </div>

          {showArch['profit-agent'] && (
            <FadeIn delay={0.1} style={{ marginTop: '2rem' }}>
              <div className="arch-diagram">
                <div className="arch-title">Detailed Pipeline Architecture · ProfitAgent</div>
                <ProfitArchDetailed />
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.15} style={{ marginTop: '3rem' }}>
            <div className="grid-3">
              <div className="glass-card">
                <span className="tag tag-violet" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>NL-to-SQL &amp; Autocorrector</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>SQL Pipeline</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  Multi-stage supervised pipeline: Supervisor (task classifier) → Table Selector → Clarification Check → Text2SQL → Autocorrector → Execution → Response Generator → Visualizer.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  Supervisor classifies queries into Data | Figure | Metadata | Clarify | Unrelated using LlamaIndex structured output to block out-of-scope requests.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Auto-correction loop intercepts syntax errors and schema mismatches, retrying with generation feedback before surfacing errors. SQLGlot handles PostgreSQL/T-SQL/Databricks translations.
                </p>
              </div>

              <div className="glass-card">
                <span className="tag tag-blue" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Knowledge &amp; Visualizations</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Knowledge Registry</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  Features a database-driven domain knowledge catalog (SQL examples, column descriptions, and system rules) hot-loaded dynamically based on selected tables.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  Supports column placeholder expansion (e.g. <code>{"{{table.column}}"}</code>) with actual database enum values to restrict filters and eliminate hallucinations.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Decoupled Plotly visualizer generates schema-compliant chart instructions from any tabular dataset (SQL, CSV uploads, or corporate indexes) based on user query intent.
                </p>
              </div>

              <div className="glass-card">
                <span className="tag tag-emerald" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>Enterprise Scale &amp; Auditing</span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Tracer &amp; Execution</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  Engineered connection management for high-availability Fabric and Databricks endpoints using Keepalives, pre-pings, and automatic retry capabilities.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                  Audit logs.trace records 50+ fine-grained metrics per turn (LLM thinking/generation tokens, execution latency, selection decisions) for complete turn replay.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  Exposed via BrAInAgentExecutor JSON-RPC protocol accepting task queries, returning typed <code>{'chat_interaction'}</code> artifacts seamlessly parsed by the orchestrator.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>

      <hr className="section-divider" />

      {/* ════════ SMARTDOCS ════════ */}
      <div className="page">
        <section className="section" id="smartdocs" style={{ scrollMarginTop: '80px' }}>
          <FadeIn>
            <div className="project-hero-meta">
              <span className="tag tag-cyan"><BookOpen size={11} /> Multimodal Graph RAG</span>
              <span className="tag tag-violet">Neo4j Hybrid Index</span>
              <span className="tag tag-blue">Azure AI Search</span>
              <span className="tag tag-orange">PaLiGemma-3B</span>
              <a href="https://github.com/priyaank17/agentic-smartdocs" target="_blank" rel="noopener noreferrer" className="tag tag-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}>
                <GitHubIcon size={11} /> GitHub Repo
              </a>
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Drishya AI Labs · Oil &amp; Gas Client</span>
            </div>
            <h2 className="section-title">SmartDocs — Intelligent Document Digitization Platform</h2>
            <p className="section-desc">
              SmartDocs is an enterprise-grade multimodal ingestion and knowledge extraction engine. It processes heterogeneous
              engineering documentation—scanned P&amp;ID schematics, handwritten logs, data sheets—and normalizes content
              into a queryable Neo4j Knowledge Graph backed by hybrid vector embeddings on node descriptions,
              with images and tables stored via blob references for zero-duplication retrieval.
            </p>
          </FadeIn>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => toggleArch('smartdocs')}
              className="btn btn-ghost"
              style={{ borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {showArch.smartdocs ? 'Hide Ingestion Architecture' : 'View Ingestion Architecture'}
            </button>
          </div>

          {showArch.smartdocs && (
            <FadeIn delay={0.1} style={{ marginTop: '2rem' }}>
              <div className="arch-diagram">
                <div className="arch-title">Full Ingestion + Hybrid Knowledge Graph Architecture · SmartDocs</div>
                <SmartDocsArchDetailed />
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.15} style={{ marginTop: '3rem' }}>
            <div className="grid-2">
              <div className="glass-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Multimodal Ingestion Layer</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    'Images (P&ID diagrams, scanned pages): a small VLM (PaLiGemma-3B) generates a text summary/description of each image; description stored in the text index with metadata pointing to the full image blob in Azure Storage.',
                    'Tables extracted from data sheets: converted to Markdown format, saved to blob storage; a concise table description plus the blob path pointer is stored in the text index — no raw table injected into LLM context.',
                    'Text chunks (narratives, specs): split at 512 tokens with 64-token overlap, embedded via Azure OpenAI ada-002, stored in the hybrid BM25+HNSW index.',
                    'Azure AI Document Intelligence handles layout analysis, OCR, and table extraction for all document types before the VLM/NER pipeline.',
                    'LangGraph orchestrates the autonomous ingestion workflows per document type with fault tolerance and retry logic.',
                  ].map((t, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, flexShrink: 0 }}>→</span> {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Hybrid Indexing: Graph + Vector</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    'Structural layer: Neo4j stores entities (Equipment, Nozzle, Instrument, Pipeline…) as typed nodes with typed relationships (HAS_NOZZLE, CONNECTED_TO, MONITORS…) built via deterministic domain rules.',
                    'Semantic layer: For each Neo4j node, the text description field is embedded (ada-002) and stored in Azure AI Search — same index as document chunks, linked back to Neo4j node IDs via metadata.',
                    'This dual store enables multi-hop graph traversals (relational queries) AND semantic vector search (narrative lookups) in one unified retrieval system.',
                    'Graph path retrieves structured facts: e.g., all instruments connected to pump P-101 via multi-hop Cypher traversal.',
                    'Vector path retrieves contextual passages: e.g., "what is the operating pressure of this pump?" from process narratives and data sheets.',
                  ].map((t, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--accent-violet)', fontWeight: 700, flexShrink: 0 }}>→</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} style={{ marginTop: '1.5rem' }}>
            <div className="glass-card" style={{ borderTop: '2px solid var(--accent-emerald)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>💡 Savings &amp; Advantages of This Architecture</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { label: 'Zero LLM context bloat', body: 'Images and full tables are never injected raw into the LLM prompt. Only VLM-generated summaries and table descriptions (a few sentences) enter context — keeping token budgets predictable and costs low.' },
                  { label: '50%+ reduction in manual review', body: 'VLM-generated image captions and table markdown eliminate the need for humans to manually describe figures and transcribe table data for retrieval.' },
                  { label: 'Blob pointer pattern', body: 'The retrieval system can surface the exact source image or table from blob storage using the pointer in the metadata — engineers get direct links to raw evidence, not just text summaries.' },
                  { label: 'Hybrid retrieval accuracy', body: 'Combining graph multi-hop traversal and vector search achieves 90%+ grounding accuracy — structured questions answered via graph, narrative questions answered via vector, both fused for complex queries.' },
                ].map((a, i) => (
                  <div key={i} style={{ padding: '0.85rem 1rem', borderRadius: 10, background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.18)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.35rem' }}>{a.label}</div>
                    <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{a.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.25} style={{ marginTop: '1.5rem' }}>
            <div className="glass-card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Knowledge Graph Ontology &amp; Edge Rules</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Constructs a typed Neo4j schema matching plant topography — Equipment, Nozzle, Pipeline, Instrument, ControlLoop, ProcessUnit, OperatingCondition, DataSheet, Material.',
                  'Applies deterministic domain rules to link documents: e.g., mapping instrument tags to control loops based on ISA-88 tagging conventions.',
                  'Defines equipment-pipeline connections: e.g., mapping line numbers from P&ID nozzle tables to parent equipment nozzle records.',
                  'Builds operational context edges linking process description units to their defined setpoints and hazard rules.',
                  'Verifies relationship integrity against ISO-15926 and DEXPI schema specifications before committing data to Neo4j.',
                ].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, flexShrink: 0 }}>→</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </section>
      </div>

      <hr className="section-divider" />

      {/* ════════ JUNIOR ════════ */}
      <div className="page">
        <section className="section" id="junior" style={{ scrollMarginTop: '80px' }}>
          <FadeIn>
            <div className="project-hero-meta">
              <span className="tag tag-violet"><Cpu size={11} /> Multimodal Conversational RAG</span>
              <span className="tag tag-blue">Semantic Kernel</span>
              <span className="tag tag-cyan">Autogen</span>
              <span className="tag tag-emerald">Azure OpenAI</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Drishya AI Labs · Oil &amp; Gas Client</span>
            </div>
            <h2 className="section-title">Junior — Multimodal Agentic RAG Interface</h2>
            <p className="section-desc">
              Junior is the conversational reasoning interface sitting atop the SmartDocs hybrid Knowledge Graph and vector index.
              It performs multimodal retrieval — fetching structured graph facts, narrative passages, VLM-described images, and
              table markdown from blob storage — delivering source-cited answers where every claim is traceable to a source page, blob link, or graph node.
            </p>
          </FadeIn>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => toggleArch('junior')}
              className="btn btn-ghost"
              style={{ borderColor: 'var(--accent-violet)', color: 'var(--accent-violet)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              {showArch.junior ? 'Hide Retrieval Architecture' : 'View Retrieval Architecture'}
            </button>
          </div>

          {showArch.junior && (
            <FadeIn delay={0.1} style={{ marginTop: '2rem' }}>
              <div className="arch-diagram">
                <div className="arch-title">Multimodal Retrieval Architecture · Junior (Graph + Vector + Blob Fetch)</div>
                <JuniorArchDetailed />
              </div>
            </FadeIn>
          )}

          <FadeIn delay={0.15} style={{ marginTop: '3rem' }}>
            <div className="grid-2">
              <div className="glass-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Multimodal Dual-Path Retrieval</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    'Semantic Kernel planner classifies query intent: structural (graph), unstructured (vector), or hybrid — and routes accordingly.',
                    'Graph path: Autogen generates Cypher queries for multi-hop traversals — e.g., Equipment→Nozzle→Pipeline→Instrument to find all sensors on a pump.',
                    'Vector path: BM25+HNSW hybrid search retrieves narrative passages, VLM image descriptions, and table descriptions from Azure AI Search.',
                    'When retrieval surfaces a blob pointer (image or table), Junior fetches the referenced markdown/image from Azure Blob Storage and includes it in the generated response context.',
                    'Cross-encoder reranking merges evidence from both graph and vector paths before LLM synthesis.',
                    'Source citations injected into every answer: document title, page number, blob URL, or Neo4j node ID — every claim is traceable.',
                  ].map((t, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--accent-violet)', fontWeight: 700, flexShrink: 0 }}>→</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card">
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Evaluation &amp; Cloud Operations</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    'Azure AI Studio Prompt Flow evaluates groundedness, relevance, and faithfulness at scale using pairwise and rubric-based scoring.',
                    'Enforced strict hallucination filters at the generation step — responses with low citation confidence are quarantined.',
                    'Achieved over 90% grounding accuracy across benchmark evaluation datasets.',
                    'OpenTelemetry logging streams telemetry to Azure Application Insights and Azure Monitor dashboards.',
                    'Deployed via FastAPI on Azure Kubernetes Service (AKS) with Key Vault secret management.',
                  ].map((t, i) => (
                    <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <span style={{ color: 'var(--accent-cyan)', fontWeight: 700, flexShrink: 0 }}>→</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>
      </div>

      <hr className="section-divider" />

      {/* ════════ IT TICKET GRAPH RAG ════════ */}
      <div className="page">
        <section className="section" id="it-ticket" style={{ scrollMarginTop: '80px' }}>
          <FadeIn>
            <div className="project-hero-meta">
              <span className="tag tag-orange"><BrainCircuit size={11} /> Graph RAG</span>
              <span className="tag tag-violet">Neo4j</span>
              <span className="tag tag-blue">Semantic Kernel</span>
              <span className="tag tag-cyan">Azure AI Search</span>
              <a href="https://github.com/priyaank17/it-ticket-agentic-rag" target="_blank" rel="noopener noreferrer" className="tag tag-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}>
                <GitHubIcon size={11} /> GitHub Repo
              </a>
              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Drishya AI Labs · Enterprise IT Client</span>
            </div>
            <h2 className="section-title">IT Ticket Graph Hybrid RAG</h2>
            <p className="section-desc">
              A hybrid retrieval-augmented generation system designed to triage and resolve millions of historical
              IT support tickets for an enterprise client, with a focus on high-severity GPU and driver incidents.
              The system cut mean time-to-triage by approximately 40% and reduced analyst effort by 30% by
              surfacing root-cause clusters and duplicate incident chains instantly.
            </p>
          </FadeIn>

          <FadeIn delay={0.1} style={{ marginTop: '3rem' }}>
            <div className="grid-3">
              {[
                { title: 'Multi-Agent Orchestration', body: 'Semantic Kernel coordinates a Planner (GPT-4o-mini), Hybrid Retriever (Azure AI Search BM25+vector), Graph Agent (Neo4j), Cross-Encoder Reranker (Azure ML), and Answer Generator — each specializing in one retrieval or reasoning step.', tag: 'Orchestration' },
                { title: 'Hybrid Knowledge Ingestion', body: 'An ACA-hosted ingestion service preprocesses 10K+ tickets — applying domain-specific chunking for logs, comments, and OCR — then embeds via Azure OpenAI and mirrors duplicate/related/blocking relationships into Neo4j for multi-hop reasoning.', tag: 'Data Pipeline' },
                { title: 'Graph-Augmented Root Cause Analysis', body: 'Neo4j captures ticket relationships (duplicates, blocks, relates-to) alongside label, component, and error nodes. The Graph Agent performs multi-hop traversal to surface root-cause clusters that pure vector search cannot reach.', tag: 'Knowledge Graph' },
              ].map((c, i) => (
                <div key={i} className="glass-card">
                  <span className="tag tag-orange" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>{c.tag}</span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{c.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15} style={{ marginTop: '2rem' }}>
            <div className="glass-card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Infrastructure &amp; Operations</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Deployed on Azure Container Apps (ACA) with Managed Identity for all data-plane calls and secrets stored in Key Vault.',
                  'End-to-end OpenTelemetry traces flowing to Application Insights; per-tenant quotas and policies enforced at Azure API Management.',
                  'Automated environmental provisioning scripts using bash configurations to deploy ACR, ACA, Azure AI Search, Azure OpenAI, App Insights, and Neo4j clusters.',
                  'Prompt Flow Evaluator integrated for semantic matching of generated answers against ground truth, with dashboards in Azure Monitor Workbooks.',
                ].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ color: '#f59e0b', fontWeight: 700, flexShrink: 0 }}>→</span> {t}
                  </li>
                ))}
              </ul>
            </div>
        </FadeIn>
      </section>
    </div>

    <hr className="section-divider" />

    {/* ════════ SILVERLAND ════════ */}
    <div className="page">
      <section className="section" id="silverland" style={{ scrollMarginTop: '80px' }}>
        <FadeIn>
          <div className="project-hero-meta">
            <span className="tag tag-emerald"><Network size={11} /> LangGraph</span>
            <span className="tag tag-blue">MCP Gateway</span>
            <span className="tag tag-violet">Text2SQL</span>
            <a href="https://github.com/priyaank17/real-estate-ai-assistant/tree/main" target="_blank" rel="noopener noreferrer" className="tag tag-blue" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', textDecoration: 'none' }}>
              <GitHubIcon size={11} /> GitHub Repo
            </a>
            <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Drishya AI Labs · Real Estate Domain</span>
          </div>
          <h2 className="section-title">SilverLand — Real Estate AI Assistant</h2>
          <p className="section-desc">
            SilverLand is an agentic AI assistant leveraging LangGraph and the Model Context Protocol (MCP) to 
            automate end-to-end real estate transactions, including property discovery, comparative valuations, 
            investment analysis, and booking management. The application features deterministic, auditable control flows 
            to ensure high reliability.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} style={{ marginTop: '3rem' }}>
          <div className="grid-2">
            <div className="glass-card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Architecture Highlights</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Designed a centralized router agent responsible for intent detection, entity extraction, and state machine transitions, enforcing deterministic behavior across transactional workflows.',
                  'Implemented an MCP-compliant tool gateway to standardize runtime context exchange and isolate execution boundaries between the LLM and functional tools.',
                  'Integrated a Vanna-based Text-to-SQL generation pipeline with robust search fallbacks across metadata attributes to ensure high query execution rates.',
                  'Maintained structural separation of concerns across reasoning, data retrieval, tool execution, and client-side synchronization layers to simplify maintenance and logging.',
                ].map((t, i) => (
                  <li key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 700, flexShrink: 0 }}>→</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass-card">
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Supported Workflows</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { label: 'Semantic Search', desc: 'Supports natural language query parsing with multi-attribute filter extraction (location, budget tiers, unit configuration, and amenities).' },
                  { label: 'Comparative Analysis', desc: 'Generates side-by-side matrices comparing listing specifications, pricing histories, and regional indices.' },
                  { label: 'Financial Projections', desc: 'Conducts rental yield calculations, ROI forecasting, and historical appreciation analysis.' },
                  { label: 'Transactional Scheduling', desc: 'Automates availability checks, locks inventory, generates confirmations, and records audit trails.' },
                ].map((w, i) => (
                  <div key={i} style={{ padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: 8, borderLeft: '2px solid var(--accent-emerald)' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{w.label}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{w.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>

      <footer>
        <p>Priyank Jha &mdash; Engineering Portfolio &mdash; Capgemini &copy; 2026</p>
      </footer>
    </>
  );
};

export default Projects;
