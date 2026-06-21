import React from 'react';

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SHARED DIAGRAM STYLES
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const COLORS = {
  blue: '#3b82f6',
  violet: '#8b5cf6',
  cyan: '#06b6d4',
  emerald: '#10b981',
  orange: '#f97316',
  pink: '#ec4899',
  slate: '#475569',
};

const Legend = ({ items }) => (
  <g>
    {items.map((item, i) => (
      <g key={i} transform={`translate(${i * 130}, 0)`}>
        <rect width="12" height="12" rx="3" fill={item.color} fillOpacity="0.7" />
        <text x="18" y="10" fill="#64748b" fontSize="10" fontFamily="Inter, sans-serif">{item.label}</text>
      </g>
    ))}
  </g>
);

export const MaistroProfitCombinedArch = ({ defaultTab = 'overview' }) => {
  const [activeTab, setActiveTab] = React.useState(defaultTab);
  const [hoveredTab, setHoveredTab] = React.useState(null);

  const tabs = [
    { id: 'overview', label: '1. System Overview', desc: 'mAIstro + A2A + pRofit' },
    { id: 'maistro', label: '2. mAIstro Core', desc: 'LangGraph & Tools Flow' },
    { id: 'profit', label: '3. pRofit Agent', desc: 'Self-Correcting Text2SQL' },
    { id: 'sequence', label: '4. Turn Sequence', desc: 'End-to-End Execution Flow' },
    { id: 'schema', label: '5. DB Schema ERD', desc: 'Table Relationships' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      width: '100%',
      background: 'rgba(15, 23, 42, 0.4)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    }}>
      {/* Interactive Tabs Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        paddingBottom: '1.25rem'
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isHovered = hoveredTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              onMouseEnter={() => setHoveredTab(tab.id)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                flex: '1 1 170px',
                textAlign: 'left',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))' 
                  : (isHovered ? 'rgba(255,255,255,0.04)' : 'transparent'),
                border: '1px solid',
                borderColor: isActive 
                  ? 'rgba(59, 130, 246, 0.3)' 
                  : (isHovered ? 'rgba(255,255,255,0.1)' : 'transparent'),
                color: isActive ? '#f8fafc' : '#94a3b8',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem',
                boxShadow: isActive ? '0 4px 20px rgba(59, 130, 246, 0.15)' : 'none'
              }}
            >
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: isActive ? '#60a5fa' : '#cbd5e1'
              }}>{tab.label}</div>
              <div style={{
                fontSize: '0.68rem',
                color: isActive ? '#a78bfa' : '#64748b'
              }}>{tab.desc}</div>
            </button>
          );
        })}
      </div>

      {/* SVG Diagram Rendering Panel */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(2, 6, 23, 0.3)',
        borderRadius: '12px',
        padding: '0.5rem',
        border: '1px solid rgba(255,255,255,0.03)'
      }}>
        {activeTab === 'overview' && <OverviewSvg />}
        {activeTab === 'maistro' && <MaistroCoreSvg />}
        {activeTab === 'profit' && <ProfitAgentSvg />}
        {activeTab === 'sequence' && <SequenceSvg />}
        {activeTab === 'schema' && <DbSchemaSvg />}
      </div>
    </div>
  );
};

// Aliases for compatibility with Projects.jsx
export const MaistroArchDetailed = () => <MaistroProfitCombinedArch defaultTab="overview" />;
export const ProfitArchDetailed = () => <MaistroProfitCombinedArch defaultTab="profit" />;

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   1. SYSTEM OVERVIEW SVG
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const OverviewSvg = () => (
  <svg viewBox="0 0 980 620" width="100%" style={{ fontFamily: 'Inter, sans-serif' }}>
    <defs>
      <marker id="o-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.3)" />
      </marker>
      <marker id="o-blue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#3b82f6" />
      </marker>
      <marker id="o-violet" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#8b5cf6" />
      </marker>
      <linearGradient id="g-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="g-violet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="g-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#047857" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="g-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0e7490" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="g-orange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#c2410c" stopOpacity="0.05" />
      </linearGradient>
    </defs>

    {/* USERS ZONE */}
    <rect x="20" y="20" width="700" height="90" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.05)" />
    <text x="35" y="40" fill="#64748b" fontSize="9" fontWeight="700" letterSpacing="0.06em">👤 USER LAYER</text>

    {/* Streamlit FE */}
    <rect x="40" y="50" width="280" height="48" rx="6" fill="url(#g-blue)" stroke="#3b82f6" strokeWidth="1.2" />
    <text x="180" y="72" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="800">Streamlit Frontend (mAIstro-fe)</text>
    <text x="180" y="86" textAnchor="middle" fill="#64748b" fontSize="8.5">Interactive dashboards, tables &amp; charts</text>

    {/* AGUI FE */}
    <rect x="340" y="50" width="280" height="48" rx="6" fill="url(#g-blue)" stroke="#3b82f6" strokeWidth="1.2" />
    <text x="480" y="72" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="800">AG-UI / CopilotKit Frontend</text>
    <text x="480" y="86" textAnchor="middle" fill="#64748b" fontSize="8.5">Dynamic agent sync &amp; share panel</text>

    {/* MAISTRO ORCHESTRATOR ZONE */}
    <rect x="20" y="130" width="940" height="230" rx="10" fill="url(#g-violet)" stroke="#8b5cf6" strokeWidth="1.5" />
    <text x="35" y="152" fill="#c4b5fd" fontSize="10" fontWeight="800" letterSpacing="0.06em">🧠 mAIstro ORCHESTRATOR LAYER (DeepAgents &amp; LangGraph)</text>

    {/* POST /agui SSE Stream */}
    <rect x="40" y="170" width="200" height="60" rx="8" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" strokeWidth="1.2" />
    <text x="140" y="195" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="800">POST /agui Endpoint</text>
    <text x="140" y="212" textAnchor="middle" fill="#94a3b8" fontSize="9">FastAPI SSE stream generator</text>

    {/* LangGraph Graph */}
    <rect x="270" y="170" width="220" height="60" rx="8" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" strokeWidth="1.2" />
    <text x="380" y="195" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="800">DeepAgent Orchestrator</text>
    <text x="380" y="212" textAnchor="middle" fill="#94a3b8" fontSize="9">LangGraph StateGraph Engine</text>

    {/* Tools */}
    <rect x="520" y="170" width="410" height="60" rx="8" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" strokeWidth="1.2" />
    <text x="725" y="193" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="800">Orchestrator Tools Middleware</text>
    <text x="725" y="212" textAnchor="middle" fill="#94a3b8" fontSize="8.5">execute_a2a_agent · query_mira · inspect_artifact · create_visualization_* · csv_to_artifact</text>

    {/* Checkpoints Saver */}
    <rect x="40" y="270" width="200" height="55" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
    <text x="140" y="293" textAnchor="middle" fill="#e2e8f0" fontSize="10.5" fontWeight="800">AsyncPostgresSaver</text>
    <text x="140" y="309" textAnchor="middle" fill="#64748b" fontSize="8.5">PostgreSQL checkpoint storage</text>

    {/* Artifact Store */}
    <rect x="270" y="270" width="220" height="55" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
    <text x="380" y="293" textAnchor="middle" fill="#e2e8f0" fontSize="10.5" fontWeight="800">Artifact Store</text>
    <text x="380" y="309" textAnchor="middle" fill="#64748b" fontSize="8.5">PostgreSQL BYTEA (Parquet/CSV)</text>

    {/* Conv Meta */}
    <rect x="520" y="270" width="200" height="55" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
    <text x="620" y="293" textAnchor="middle" fill="#e2e8f0" fontSize="10.5" fontWeight="700">conversation_metadata</text>
    <text x="620" y="309" textAnchor="middle" fill="#64748b" fontSize="8.5">Thread sharing index</text>

    {/* Skills Middleware */}
    <rect x="740" y="270" width="190" height="55" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
    <text x="835" y="293" textAnchor="middle" fill="#e2e8f0" fontSize="10.5" fontWeight="700">Skills Middleware</text>
    <text x="835" y="309" textAnchor="middle" fill="#64748b" fontSize="8.5">MinIO-backed SKILL.md rules</text>

    {/* A2A HOST AGENTS ZONE */}
    <rect x="20" y="380" width="410" height="140" rx="10" fill="url(#g-emerald)" stroke="#10b981" strokeWidth="1.5" />
    <text x="35" y="402" fill="#6ee7b7" fontSize="10" fontWeight="800" letterSpacing="0.06em">⚙️ A2A HOST AGENTS LAYER</text>

    {/* ProfitAgent */}
    <rect x="40" y="420" width="115" height="80" rx="8" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1.2" />
    <text x="97" y="445" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="800">ProfitAgent</text>
    <text x="97" y="460" textAnchor="middle" fill="#64748b" fontSize="8.5">POST /a2a/</text>
    <text x="97" y="475" textAnchor="middle" fill="#64748b" fontSize="8.5">Text2SQL DBrain</text>
    <text x="97" y="488" textAnchor="middle" fill="#475569" fontSize="7.5">Finance analytics</text>

    {/* MinervaAgent */}
    <rect x="170" y="420" width="115" height="80" rx="8" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1.2" />
    <text x="227" y="445" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="800">MinervaAgent</text>
    <text x="227" y="460" textAnchor="middle" fill="#64748b" fontSize="8.5">POST /a2a/</text>
    <text x="227" y="475" textAnchor="middle" fill="#64748b" fontSize="8.5">Cost Benchmark</text>
    <text x="227" y="488" textAnchor="middle" fill="#475569" fontSize="7.5">Program variance</text>

    {/* WikipediaAgent */}
    <rect x="300" y="420" width="115" height="80" rx="8" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1.2" />
    <text x="357" y="445" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="800">WikipediaAgent</text>
    <text x="357" y="460" textAnchor="middle" fill="#64748b" fontSize="8.5">POST /a2a/</text>
    <text x="357" y="475" textAnchor="middle" fill="#64748b" fontSize="8.5">Docs reference</text>
    <text x="357" y="488" textAnchor="middle" fill="#475569" fontSize="7.5">Public context</text>

    {/* ANALYTICS ZONE */}
    <rect x="445" y="380" width="165" height="140" rx="10" fill="url(#g-cyan)" stroke="#06b6d4" strokeWidth="1.5" />
    <text x="460" y="402" fill="#67e8f9" fontSize="10" fontWeight="800" letterSpacing="0.06em">📊 ANALYTICS</text>

    {/* MIRA Service */}
    <rect x="460" y="420" width="135" height="80" rx="8" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="1.2" />
    <text x="527" y="445" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="800">MIRA Service</text>
    <text x="527" y="460" textAnchor="middle" fill="#64748b" fontSize="8.5">POST /invoke</text>
    <text x="527" y="475" textAnchor="middle" fill="#64748b" fontSize="8.5">Sales Data NL-&gt;SQL</text>
    <text x="527" y="488" textAnchor="middle" fill="#475569" fontSize="7.5">T-SQL Analytics</text>

    {/* OBSERVABILITY ZONE */}
    <rect x="740" y="20" width="220" height="90" rx="8" fill="rgba(236,72,153,0.08)" stroke="#ec4899" strokeWidth="1.3" />
    <text x="755" y="40" fill="#f472b6" fontSize="9" fontWeight="700" letterSpacing="0.06em">🔍 OBSERVABILITY</text>

    {/* Langfuse */}
    <rect x="755" y="50" width="190" height="48" rx="6" fill="rgba(236,72,153,0.15)" stroke="#ec4899" strokeWidth="1.2" />
    <text x="850" y="72" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="800">Langfuse Service</text>
    <text x="850" y="86" textAnchor="middle" fill="#64748b" fontSize="8.5">Traces &amp; Prompts (PromptCraft)</text>

    {/* INFRASTRUCTURE ZONE */}
    <rect x="625" y="380" width="335" height="140" rx="10" fill="url(#g-orange)" stroke="#f97316" strokeWidth="1.5" />
    <text x="640" y="402" fill="#fdba74" fontSize="10" fontWeight="800" letterSpacing="0.06em">🗄️ INFRASTRUCTURE</text>

    {/* PostgreSQL */}
    <rect x="640" y="420" width="95" height="80" rx="8" fill="rgba(249,115,22,0.1)" stroke="#f97316" strokeWidth="1.2" />
    <text x="687" y="445" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="800">PostgreSQL</text>
    <text x="687" y="461" textAnchor="middle" fill="#64748b" fontSize="8">Checkpoints</text>
    <text x="687" y="473" textAnchor="middle" fill="#64748b" fontSize="8">Artifacts</text>
    <text x="687" y="485" textAnchor="middle" fill="#64748b" fontSize="8">Conversations</text>

    {/* MinIO S3 */}
    <rect x="745" y="420" width="95" height="80" rx="8" fill="rgba(249,115,22,0.1)" stroke="#f97316" strokeWidth="1.2" />
    <text x="792" y="445" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="800">MinIO S3</text>
    <text x="792" y="465" textAnchor="middle" fill="#64748b" fontSize="8">Skills files</text>
    <text x="792" y="478" textAnchor="middle" fill="#64748b" fontSize="8">SKILL.md</text>

    {/* MCP Visualizer */}
    <rect x="850" y="420" width="95" height="80" rx="8" fill="rgba(249,115,22,0.1)" stroke="#f97316" strokeWidth="1.2" />
    <text x="897" y="445" textAnchor="middle" fill="#fdba74" fontSize="10.5" fontWeight="800">MCP Visualizer</text>
    <text x="897" y="465" textAnchor="middle" fill="#64748b" fontSize="8">Plotly Chart svc</text>
    <text x="897" y="478" textAnchor="middle" fill="#64748b" fontSize="8">Docker (AKS)</text>

    {/* CONNECTOR ARROWS */}
    {/* FE -> agui endpoint */}
    <path d="M 180 98 L 180 120 L 140 120 L 140 170" fill="none" stroke="#3b82f6" strokeWidth="1.3" markerEnd="url(#o-blue)" className="flow-blue-line" />
    <path d="M 480 98 L 480 120 L 140 120 L 140 170" fill="none" stroke="#3b82f6" strokeWidth="1.3" markerEnd="url(#o-blue)" />
    <text x="210" y="115" fill="#64748b" fontSize="8">AG-UI JSON-RPC / SSE Stream</text>

    {/* agui ep -> orch */}
    <line x1="240" y1="200" x2="270" y2="200" stroke="#8b5cf6" strokeWidth="1.3" markerEnd="url(#o-violet)" className="flow-violet-line" />

    {/* orch -> tools */}
    <line x1="490" y1="200" x2="520" y2="200" stroke="#8b5cf6" strokeWidth="1.3" markerEnd="url(#o-violet)" className="flow-violet-line" />

    {/* tools -> A2A Agents */}
    <path d="M 520 215 L 500 215 L 500 365 L 97 365 L 97 420" fill="none" stroke="#10b981" strokeWidth="1.3" markerEnd="url(#o-arr)" />
    <path d="M 500 365 L 227 365 L 227 420" fill="none" stroke="#10b981" strokeWidth="1.3" markerEnd="url(#o-arr)" />
    <path d="M 500 365 L 357 365 L 357 420" fill="none" stroke="#10b981" strokeWidth="1.3" markerEnd="url(#o-arr)" />
    <text x="230" y="360" fill="#10b981" fontSize="8" fontWeight="700">A2A JSON-RPC (x-user-id, x-user-roles)</text>

    {/* tools -> MIRA */}
    <path d="M 725 230 L 725 350 L 527 350 L 527 420" fill="none" stroke="#06b6d4" strokeWidth="1.3" markerEnd="url(#o-arr)" />
    <text x="535" y="347" fill="#06b6d4" fontSize="8">POST /invoke</text>

    {/* tools -> MCP Visualizer */}
    <path d="M 930 200 L 950 200 L 950 360 L 897 360 L 897 420" fill="none" stroke="#f97316" strokeWidth="1.2" markerEnd="url(#o-arr)" opacity="0.8" />

    {/* orch <-> chkpt */}
    <path d="M 380 230 L 380 250 L 140 250 L 140 270" fill="none" stroke="#8b5cf6" strokeWidth="1.2" />

    {/* chkpt -> Postgres */}
    <path d="M 140 325 L 140 350 L 687 350 L 687 420" fill="none" stroke="#f97316" strokeWidth="1.1" strokeDasharray="3 3" />

    {/* artstore -> Postgres */}
    <path d="M 380 325 L 380 345 L 687 345 L 687 420" fill="none" stroke="#f97316" strokeWidth="1.1" strokeDasharray="3 3" />

    {/* convmeta -> Postgres */}
    <path d="M 620 325 L 620 340 L 687 340 L 687 420" fill="none" stroke="#f97316" strokeWidth="1.1" strokeDasharray="3 3" />

    {/* tools -> ArtStore */}
    <path d="M 725 230 L 725 255 L 380 255 L 380 270" fill="none" stroke="#8b5cf6" strokeWidth="1.1" />

    {/* skills -> MinIO */}
    <path d="M 835 325 L 835 350 L 792 350 L 792 420" fill="none" stroke="#f97316" strokeWidth="1.1" strokeDasharray="3 3" />

    {/* orch & tools -> Langfuse */}
    <path d="M 380 170 L 380 145 L 755 145 L 755 98" fill="none" stroke="#ec4899" strokeWidth="1.1" strokeDasharray="3 3" opacity="0.75" />
    <path d="M 725 170 L 725 145 L 755 145" fill="none" stroke="#ec4899" strokeWidth="1.1" strokeDasharray="3 3" opacity="0.75" />
    <text x="560" y="142" fill="#ec4899" fontSize="8" opacity="0.8">Langfuse Tracing Span</text>

    {/* Legend */}
    <g transform="translate(40, 560)">
      <rect width="12" height="12" rx="3" fill="#3b82f6" />
      <text x="18" y="10" fill="#cbd5e1" fontSize="9">User FE</text>

      <rect x="100" width="12" height="12" rx="3" fill="#8b5cf6" />
      <text x="118" y="10" fill="#cbd5e1" fontSize="9">mAIstro Core</text>

      <rect x="230" width="12" height="12" rx="3" fill="#10b981" />
      <text x="248" y="10" fill="#cbd5e1" fontSize="9">A2A Agents</text>

      <rect x="360" width="12" height="12" rx="3" fill="#06b6d4" />
      <text x="378" y="10" fill="#cbd5e1" fontSize="9">Analytics</text>

      <rect x="480" width="12" height="12" rx="3" fill="#f97316" />
      <text x="498" y="10" fill="#cbd5e1" fontSize="9">Infrastructure</text>

      <rect x="610" width="12" height="12" rx="3" fill="#ec4899" />
      <text x="628" y="10" fill="#cbd5e1" fontSize="9">Observability</text>
    </g>
  </svg>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   2. MAISTRO DETAIL SVG
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const MaistroCoreSvg = () => (
  <svg viewBox="0 0 980 720" width="100%" style={{ fontFamily: 'Inter, sans-serif' }}>
    <defs>
      <marker id="m-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.3)" />
      </marker>
      <linearGradient id="m-blue" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="m-violet" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.05" />
      </linearGradient>
    </defs>

    {/* INCOMING REQUEST */}
    <rect x="15" y="15" width="950" height="90" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.06)" />
    <text x="30" y="32" fill="#64748b" fontSize="8.5" fontWeight="700">INCOMING REQUEST</text>
    <rect x="30" y="42" width="920" height="50" rx="6" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="1" />
    <text x="50" y="62" fill="#cbd5e1" fontSize="11" fontWeight="700">POST /agui</text>
    <text x="50" y="78" fill="#94a3b8" fontSize="8.5">Payload: {"{ messages: Message[], thread_id: string, forwarded_props: { user_id, user_roles, model_name, system_prompt_name } }"}</text>

    {/* MIDDLEWARE LAYER */}
    <rect x="15" y="120" width="950" height="110" rx="8" fill="url(#m-blue)" stroke="#3b82f6" strokeWidth="1.2" />
    <text x="30" y="138" fill="#93c5fd" fontSize="9.5" fontWeight="800">FastAPI Middleware Layer</text>

    <rect x="30" y="150" width="210" height="65" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="135" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="10.5" fontWeight="700">CORS Middleware</text>
    <text x="135" y="185" textAnchor="middle" fill="#64748b" fontSize="8.5">Origin checks &amp; headers</text>
    <text x="135" y="197" textAnchor="middle" fill="#64748b" fontSize="8">Secure API boundary</text>

    <rect x="255" y="150" width="210" height="65" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="360" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="10.5" fontWeight="700">x-api-key Authentication</text>
    <text x="360" y="185" textAnchor="middle" fill="#64748b" fontSize="8.5">Gateway-enforced security</text>
    <text x="360" y="197" textAnchor="middle" fill="#64748b" fontSize="8">Tenant authorization validate</text>

    <rect x="480" y="150" width="210" height="65" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="585" y="170" textAnchor="middle" fill="#cbd5e1" fontSize="10.5" fontWeight="700">_LazyLangGraphAgent</text>
    <text x="585" y="185" textAnchor="middle" fill="#64748b" fontSize="8.5">Lazy proxy agent initializer</text>
    <text x="585" y="197" textAnchor="middle" fill="#64748b" fontSize="8">Pre-flight schema parsing</text>

    <rect x="705" y="150" width="245" height="65" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="827" y="168" textAnchor="middle" fill="#cbd5e1" fontSize="10.5" fontWeight="700">RLSLangGraphAgent</text>
    <text x="827" y="182" textAnchor="middle" fill="#64748b" fontSize="8.5">prepare_stream() · Set ContextVars</text>
    <text x="827" y="194" textAnchor="middle" fill="#475569" fontSize="8">user_id, session_id, user_roles context</text>
    <text x="827" y="206" textAnchor="middle" fill="#475569" fontSize="8">Langfuse handler · upsert_conversation()</text>

    {/* TRACING */}
    <rect x="15" y="245" width="210" height="85" rx="8" fill="rgba(236,72,153,0.06)" stroke="#ec4899" strokeWidth="1" strokeDasharray="4 2" />
    <text x="30" y="263" fill="#f472b6" fontSize="9" fontWeight="700">Langfuse Trace Scope</text>
    <text x="120" y="285" textAnchor="middle" fill="#e2e8f0" fontSize="9.5" fontWeight="700">@observe("orchestrator-agui-turn")</text>
    <text x="120" y="300" textAnchor="middle" fill="#64748b" fontSize="8">Attributes propagated: user_id, session_id</text>
    <text x="120" y="312" textAnchor="middle" fill="#64748b" fontSize="8">Latency &amp; cost tracked at call-level</text>

    {/* GRAPH CORE */}
    <rect x="240" y="245" width="480" height="195" rx="10" fill="url(#m-violet)" stroke="#8b5cf6" strokeWidth="1.5" />
    <text x="255" y="265" fill="#c4b5fd" fontSize="11" fontWeight="800">mAIstro Graph Core (LangGraph / DeepAgent)</text>

    {/* System prompt */}
    <rect x="255" y="280" width="220" height="65" rx="6" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.3)" />
    <text x="365" y="296" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="700">System Prompt Engine</text>
    <text x="365" y="310" textAnchor="middle" fill="#64748b" fontSize="8.5">Langfuse PromptCraft Integration</text>
    <text x="365" y="322" textAnchor="middle" fill="#64748b" fontSize="8.5">Tags: systemcontext + int/prod</text>

    {/* LLM */}
    <rect x="490" y="280" width="220" height="65" rx="6" fill="rgba(139,92,246,0.15)" stroke="rgba(139,92,246,0.3)" />
    <text x="600" y="296" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="700">Azure OpenAI &amp; Bedrock LLM</text>
    <text x="600" y="310" textAnchor="middle" fill="#64748b" fontSize="8.5">Azure OpenAI GPT-4o / o-series</text>
    <text x="600" y="322" textAnchor="middle" fill="#64748b" fontSize="8.5">Claude 3.5 Sonnet via Nexus</text>

    {/* Agent Nodes */}
    <rect x="255" y="355" width="220" height="70" rx="6" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.2)" />
    <text x="365" y="373" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="700">Agent Node</text>
    <text x="365" y="388" textAnchor="middle" fill="#64748b" fontSize="8.5">State check &amp; routing analysis</text>
    <text x="365" y="401" textAnchor="middle" fill="#64748b" fontSize="8.5">ReAct (Reasoning + Action) loop</text>
    <text x="365" y="414" textAnchor="middle" fill="#64748b" fontSize="8">Decides when to invoke tools</text>

    {/* Tool Node */}
    <rect x="490" y="355" width="220" height="70" rx="6" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.2)" />
    <text x="600" y="373" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="700">Tool Node</text>
    <text x="600" y="388" textAnchor="middle" fill="#64748b" fontSize="8.5">Parallel tool execution node</text>
    <text x="600" y="401" textAnchor="middle" fill="#64748b" fontSize="8.5">Dispatches JSON-RPC payloads</text>
    <text x="600" y="414" textAnchor="middle" fill="#64748b" fontSize="8">Aggregates results into State</text>

    {/* STATE & PERSISTENCE */}
    <rect x="735" y="245" width="230" height="195" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <text x="750" y="265" fill="#e2e8f0" fontSize="10" fontWeight="700">LangGraph State &amp; Storage</text>

    <rect x="745" y="278" width="210" height="72" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
    <text x="755" y="292" fill="#cbd5e1" fontSize="9" fontWeight="700">State Schema:</text>
    <text x="755" y="306" fill="#64748b" fontSize="8">· messages: Message[] (with runtime elapsed)</text>
    <text x="755" y="319" fill="#64748b" fontSize="8">· artifact_refs: ArtifactRef[] (Parquet refs)</text>
    <text x="755" y="332" fill="#64748b" fontSize="8">· artifact_token: string (RLS capabilities)</text>

    <rect x="745" y="357" width="210" height="72" rx="5" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" />
    <text x="755" y="371" fill="#cbd5e1" fontSize="9" fontWeight="700">Persistence Tables (PostgreSQL):</text>
    <text x="755" y="385" fill="#64748b" fontSize="8">· checkpoints: state thread_id snapshot</text>
    <text x="755" y="398" fill="#64748b" fontSize="8">· agent_artifacts: payload BYTEA + token</text>
    <text x="755" y="411" fill="#64748b" fontSize="8">· conversation_metadata: user thread map</text>

    {/* TOOL IMPLEMENTATIONS */}
    <rect x="15" y="455" width="950" height="150" rx="9" fill="rgba(16,185,129,0.04)" stroke="#10b981" strokeWidth="1.3" />
    <text x="30" y="473" fill="#6ee7b7" fontSize="10" fontWeight="800">🛠️ Tool Implementations Layer (Parallel Registry)</text>

    {[
      { title: 'execute_a2a_agent', lines: ['A2A SDK send_task()', 'Payload x-user-id + role', 'Stores task output artifact'], x: 30, w: 220 },
      { title: 'query_mira', lines: ['POST /invoke to Mira', 'Retrieves sales volume', 'Stores data_refs as Parquet'], x: 260, w: 220 },
      { title: 'inspect_artifact', lines: ['Query Postgres payload', 'Decrypts BYTEA data', 'Returns as Markdown table'], x: 490, w: 220 },
      { title: 'visualizations (MCP)', lines: ['T4: Parquet → CSV → Plotly', 'T5: Direct CSV → Plotly', 'T6: Parse CSV → Parquet'], x: 720, w: 230 },
    ].map((tool, idx) => (
      <g key={idx}>
        <rect x={tool.x} y={490} width={tool.w} height={90} rx="6" fill="rgba(16,185,129,0.06)" stroke="rgba(16,185,129,0.2)" />
        <text x={tool.x + 10} y={508} fill="#6ee7b7" fontSize="10" fontWeight="700">{tool.title}</text>
        <line x1={tool.x + 10} y1={515} x2={tool.x + tool.w - 10} y2={515} stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
        {tool.lines.map((l, lIdx) => (
          <text key={lIdx} x={tool.x + 10} y={530 + lIdx * 15} fill="#64748b" fontSize="8.5">{l}</text>
        ))}
      </g>
    ))}

    {/* RESPONSE SSE STREAM */}
    <rect x="15" y="620" width="950" height="75" rx="8" fill="rgba(249,115,22,0.04)" stroke="#f97316" strokeWidth="1.2" />
    <text x="30" y="638" fill="#fdba74" fontSize="10" fontWeight="800">📯 Server-Sent Events (SSE) Response Stream</text>
    <rect x="30" y="648" width="920" height="36" rx="4" fill="rgba(249,115,22,0.1)" stroke="rgba(249,115,22,0.2)" />
    <text x="490" y="670" textAnchor="middle" fill="#fdba74" fontSize="10" fontWeight="700">
      RUN_STARTED {"→"} TEXT_MESSAGE_CONTENT (streaming) {"→"} TOOL_CALL_STARTED {"→"} STATE_SNAPSHOT {"→"} CUSTOM (artifact payload) {"→"} RUN_FINISHED
    </text>

    {/* CONNECTION ARROWS */}
    <path d="M 490 105 L 490 120" fill="none" stroke="#3b82f6" strokeWidth="1.2" markerEnd="url(#m-arr)" />
    <path d="M 480 230 L 480 245" fill="none" stroke="#3b82f6" strokeWidth="1.2" markerEnd="url(#m-arr)" />
    <path d="M 120 230 L 120 220 L 827 220 L 827 245" fill="none" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="3 3" />
    <path d="M 600 355 L 600 455" fill="none" stroke="#8b5cf6" strokeWidth="1.2" markerEnd="url(#m-arr)" />
    <path d="M 720 300 L 735 300" fill="none" stroke="#8b5cf6" strokeWidth="1.2" markerEnd="url(#m-arr)" />
    <path d="M 490 605 L 490 620" fill="none" stroke="#f97316" strokeWidth="1.2" markerEnd="url(#m-arr)" />
  </svg>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3. PROFIT AGENT DETAIL SVG
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const ProfitAgentSvg = () => (
  <svg viewBox="0 0 980 680" width="100%" style={{ fontFamily: 'Inter, sans-serif' }}>
    <defs>
      <marker id="p-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.3)" />
      </marker>
      <linearGradient id="p-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#047857" stopOpacity="0.05" />
      </linearGradient>
      <linearGradient id="p-orange" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#c2410c" stopOpacity="0.05" />
      </linearGradient>
    </defs>

    {/* INPUT SOURCES */}
    <rect x="15" y="15" width="220" height="145" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.06)" />
    <text x="30" y="32" fill="#64748b" fontSize="8.5" fontWeight="700">INPUT SOURCES</text>

    <rect x="30" y="42" width="190" height="30" rx="4" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="0.8" />
    <text x="40" y="60" fill="#cbd5e1" fontSize="9" fontWeight="700">Streamlit UI (app.py)</text>

    <rect x="30" y="77" width="190" height="30" rx="4" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="0.8" />
    <text x="40" y="95" fill="#cbd5e1" fontSize="9" fontWeight="700">FastAPI POST /ask</text>

    <rect x="30" y="112" width="190" height="35" rx="4" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="0.8" />
    <text x="40" y="127" fill="#cbd5e1" fontSize="9" fontWeight="700">A2A JSON-RPC (POST /a2a/)</text>
    <text x="40" y="139" fill="#64748b" fontSize="7">Invoked directly by mAIstro orchestrator</text>

    {/* AUTH & CONTEXT */}
    <rect x="250" y="15" width="240" height="145" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.06)" />
    <text x="265" y="32" fill="#64748b" fontSize="8.5" fontWeight="700">AUTH &amp; CONTEXT ROUTER</text>
    <rect x="260" y="42" width="220" height="105" rx="6" fill="rgba(59,130,246,0.05)" stroke="#3b82f6" strokeWidth="1" />
    <text x="270" y="58" fill="#93c5fd" fontSize="9.5" fontWeight="700">RLS Middleware Layer</text>
    <text x="270" y="73" fill="#64748b" fontSize="8.5">· Parse headers: user-id, user-roles, dept</text>
    <text x="270" y="86" fill="#64748b" fontSize="8.5">· fabric_user_groups ContextVar set</text>
    <text x="270" y="99" fill="#64748b" fontSize="8.5">· SQL stamped with RLS WHERE filters</text>
    <text x="270" y="115" fill="#e2e8f0" fontSize="8.5" fontWeight="700">Role Gate: DNA.DNA_BRAIN_PROFIT_*</text>
    <text x="270" y="128" fill="#475569" fontSize="8">Authorizes profit schema access bounds</text>

    {/* PROCESSING PIPELINE */}
    <rect x="505" y="15" width="460" height="425" rx="10" fill="url(#p-emerald)" stroke="#10b981" strokeWidth="1.5" />
    <text x="520" y="35" fill="#6ee7b7" fontSize="10.5" fontWeight="800" letterSpacing="0.06em">⚙️ pRofit EXECUTION PIPELINE</text>

    {/* 1. Supervisor */}
    <rect x="520" y="50" width="430" height="55" rx="6" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.2)" />
    <text x="535" y="68" fill="#cbd5e1" fontSize="10" fontWeight="700">1. Supervisor (LlamaIndex Router)</text>
    <text x="535" y="83" fill="#64748b" fontSize="8.5">Classifies intent into: Data | Figure | Metadata | Clarify | Unrelated. Emits structured task.</text>

    {/* 2. Table Selector */}
    <rect x="520" y="115" width="430" height="55" rx="6" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.2)" />
    <text x="535" y="133" fill="#cbd5e1" fontSize="10" fontWeight="700">2. Table Selector Node</text>
    <text x="535" y="148" fill="#64748b" fontSize="8.5">If tables count &gt; threshold, LLM prunes schemas. Selects relevant tables for T-SQL prompt.</text>

    {/* 3. Clarification */}
    <rect x="520" y="180" width="430" height="45" rx="6" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.2)" />
    <text x="535" y="196" fill="#cbd5e1" fontSize="10" fontWeight="700">3. Clarification Check Node</text>
    <text x="535" y="211" fill="#64748b" fontSize="8.5">Validates dialog state history. Prompts user for details if target context is ambiguous.</text>

    {/* 4. Branches */}
    <rect x="520" y="235" width="430" height="190" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
    <text x="535" y="252" fill="#a78bfa" fontSize="9.5" fontWeight="800">4. Task Routing Branches</text>

    {/* DATA Branch */}
    <rect x="530" y="265" width="130" height="150" rx="5" fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.2)" />
    <text x="540" y="282" fill="#c4b5fd" fontSize="9" fontWeight="700">DATA Branch</text>
    <text x="540" y="297" fill="#64748b" fontSize="7.5">· Text2SQL (t2s.py)</text>
    <text x="540" y="309" fill="#475569" fontSize="7">Dialect: SQLGlot Synapse</text>
    <text x="540" y="321" fill="#64748b" fontSize="7.5">· Autocorrector</text>
    <text x="540" y="333" fill="#475569" fontSize="7">Syntax &amp; policy correction</text>
    <text x="540" y="345" fill="#64748b" fontSize="7.5">· DB Executor</text>
    <text x="540" y="357" fill="#475569" fontSize="7">Fabric T-SQL with context</text>
    <text x="540" y="369" fill="#64748b" fontSize="7.5">· Response Generator</text>
    <text x="540" y="381" fill="#475569" fontSize="7">LLM: data → answer</text>

    {/* FIGURE Branch */}
    <rect x="670" y="265" width="130" height="150" rx="5" fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.2)" />
    <text x="680" y="282" fill="#67e8f9" fontSize="9" fontWeight="700">FIGURE Branch</text>
    <text x="680" y="297" fill="#64748b" fontSize="7.5">· Visualizer Node</text>
    <text x="680" y="309" fill="#475569" fontSize="7">Chart intent classifier</text>
    <text x="680" y="321" fill="#475569" fontSize="7">Date standardization</text>
    <text x="680" y="333" fill="#64748b" fontSize="7.5">· Plotly Generator</text>
    <text x="680" y="345" fill="#475569" fontSize="7">Supervised rules schema</text>
    <text x="680" y="357" fill="#475569" fontSize="7">Plotly JSON generation</text>
    <text x="680" y="369" fill="#475569" fontSize="7">GPT-4o fallback path</text>

    {/* METADATA Branch */}
    <rect x="810" y="265" width="130" height="150" rx="5" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.2)" />
    <text x="820" y="282" fill="#6ee7b7" fontSize="9" fontWeight="700">METADATA Branch</text>
    <text x="820" y="297" fill="#64748b" fontSize="7.5">· Schema Queries</text>
    <text x="820" y="309" fill="#475569" fontSize="7">Fetches table schemas</text>
    <text x="820" y="321" fill="#475569" fontSize="7">Column desc catalogs</text>
    <text x="820" y="333" fill="#475569" fontSize="7">Table enum definitions</text>
    <text x="820" y="345" fill="#64748b" fontSize="7.5">· Follow-up Gen</text>
    <text x="820" y="357" fill="#475569" fontSize="7">Emits 3 follow-up Qs</text>

    {/* KNOWLEDGE BASE */}
    <rect x="15" y="175" width="220" height="265" rx="8" fill="url(#g-orange)" stroke="#f97316" strokeWidth="1.3" />
    <text x="30" y="193" fill="#fdba74" fontSize="9.5" fontWeight="800">Knowledge Base Config</text>
    <line x1="30" y1="200" x2="220" y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
    {[
      { title: 'Domain Knowledge', desc: 'Financial rules (e.g. Q3 mapping)' },
      { title: 'SQL Templates', desc: 'Few-shot T-SQL examples' },
      { title: 'Viz Knowledge', desc: 'Plotly configurations' },
      { title: 'Table Metadata', desc: 'Column descriptions & enums' },
      { title: 'Placeholder Config', desc: '{{table.column}} translations' },
    ].map((item, idx) => (
      <g key={idx} transform={`translate(30, ${208 + idx * 44})`}>
        <text x="0" y="10" fill="#cbd5e1" fontSize="9.5" fontWeight="700">{item.title}</text>
        <text x="0" y="22" fill="#64748b" fontSize="8">{item.desc}</text>
      </g>
    ))}

    {/* DATA SOURCES */}
    <rect x="250" y="175" width="240" height="110" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.06)" />
    <text x="265" y="192" fill="#64748b" fontSize="8.5" fontWeight="700">DATA TIERS</text>
    {[
      { title: 'Microsoft Fabric (T-SQL)', desc: 'RLS stamped: user groups mapped' },
      { title: 'PostgreSQL DB', desc: 'Staging, test & validation schemas' },
      { title: 'Databricks Catalog', desc: 'Alternative source raw datalake' },
    ].map((db, idx) => (
      <g key={idx} transform={`translate(265, ${200 + idx * 30})`}>
        <circle cx="5" cy="8" r="2.5" fill="#f97316" />
        <text x="15" y="10" fill="#cbd5e1" fontSize="9" fontWeight="700">{db.title}</text>
        <text x="15" y="20" fill="#64748b" fontSize="8">{db.desc}</text>
      </g>
    ))}

    {/* OBSERVABILITY LOGS */}
    <rect x="250" y="300" width="240" height="140" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.06)" />
    <text x="265" y="318" fill="#64748b" fontSize="8.5" fontWeight="700">OBSERVABILITY &amp; AUDITING</text>
    {[
      { title: 'logs.trace table', desc: '800+ tracked fields per query execution' },
      { title: 'logs.feedback table', desc: 'Stores user thumbs up / thumbs down' },
      { title: 'logs.good_requests', desc: 'Successful T-SQL prompts cataloged' },
    ].map((log, idx) => (
      <g key={idx} transform={`translate(265, ${328 + idx * 32})`}>
        <circle cx="5" cy="8" r="2.5" fill="#ec4899" />
        <text x="15" y="10" fill="#cbd5e1" fontSize="9" fontWeight="700">{log.title}</text>
        <text x="15" y="20" fill="#64748b" fontSize="8">{log.desc}</text>
      </g>
    ))}

    {/* A2A SERVER INFO */}
    <rect x="15" y="455" width="950" height="110" rx="9" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
    <text x="30" y="473" fill="#6ee7b7" fontSize="10" fontWeight="800">⚙️ A2A Server Environment (brain/a2a/)</text>
    <rect x="30" y="482" width="290" height="70" rx="6" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" />
    <text x="40" y="500" fill="#6ee7b7" fontSize="9.5" fontWeight="700">/.well-known/agent-card.json</text>
    <text x="40" y="514" fill="#64748b" fontSize="8">· Agent ID: profit_agent</text>
    <text x="40" y="526" fill="#64748b" fontSize="8">· Skills dynamically discoverable from DB</text>
    <text x="40" y="538" fill="#64748b" fontSize="8">· Input schema constraints detailed</text>

    <rect x="335" y="482" width="290" height="70" rx="6" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" />
    <text x="345" y="500" fill="#6ee7b7" fontSize="9.5" fontWeight="700">BrAInAgentExecutor</text>
    <text x="345" y="514" fill="#64748b" fontSize="8">· Wraps the full Text2SQL pipeline nodes</text>
    <text x="345" y="526" fill="#64748b" fontSize="8">· Manages ContextVars (user context execution)</text>
    <text x="345" y="538" fill="#64748b" fontSize="8">· Generates structured chat_interaction artifact</text>

    <rect x="640" y="482" width="310" height="70" rx="6" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.2)" />
    <text x="650" y="500" fill="#6ee7b7" fontSize="9.5" fontWeight="700">InMemoryTaskStore</text>
    <text x="650" y="514" fill="#64748b" fontSize="8">· In-memory execution thread database</text>
    <text x="650" y="526" fill="#64748b" fontSize="8">· Prevents double executions under network lag</text>
    <text x="650" y="538" fill="#475569" fontSize="8">· Roadmap: migrate checkpoints to PostgreSQL</text>

    {/* RESPONSE OUTPUT */}
    <rect x="15" y="580" width="950" height="80" rx="8" fill="rgba(59,130,246,0.06)" stroke="#3b82f6" strokeWidth="1.2" />
    <text x="30" y="598" fill="#93c5fd" fontSize="10" fontWeight="800">📭 Structured ResponseAsk / A2A Task Result</text>
    <rect x="30" y="608" width="920" height="40" rx="4" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.2)" />
    <text x="490" y="632" textAnchor="middle" fill="#93c5fd" fontSize="9.5" fontWeight="700">
      Response: {"{ conversation_id, answer_int, sql_query, data: Row[], ai_resp: string, vis_json: string, follow_up_ques: string[] }"}
    </text>

    {/* CONNECTORS */}
    <path d="M 235 90 L 250 90" fill="none" stroke="#3b82f6" strokeWidth="1.2" markerEnd="url(#p-arr)" />
    <path d="M 490 90 L 505 90" fill="none" stroke="#3b82f6" strokeWidth="1.2" markerEnd="url(#p-arr)" />
    <path d="M 120 160 L 120 175" fill="none" stroke="#f97316" strokeWidth="1.2" markerEnd="url(#p-arr)" />
    <path d="M 235 230 L 250 230" fill="none" stroke="#f97316" strokeWidth="1" strokeDasharray="3 3" />
    <path d="M 370 285 L 370 300" fill="none" stroke="#ec4899" strokeWidth="1" strokeDasharray="3 3" />
  </svg>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   4. TURN SEQUENCE FLOW SVG
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const SequenceSvg = () => (
  <svg viewBox="0 0 980 740" width="100%" style={{ fontFamily: 'Inter, sans-serif' }}>
    <defs>
      <marker id="s-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.4)" />
      </marker>
    </defs>

    {/* LIFELINE COLUMNS */}
    {[
      { name: 'Streamlit FE', x: 70, color: '#3b82f6' },
      { name: 'mAIstro API', x: 210, color: '#8b5cf6' },
      { name: 'LangGraph CP', x: 350, color: '#8b5cf6' },
      { name: 'Langfuse', x: 490, color: '#ec4899' },
      { name: 'ProfitAgent', x: 630, color: '#10b981' },
      { name: 'Fabric DB', x: 770, color: '#f97316' },
      { name: 'Artifact Store', x: 910, color: '#fdba74' },
    ].map((col, idx) => (
      <g key={idx}>
        <line x1={col.x} y1="35" x2={col.x} y2="705" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
        <rect x={col.x - 55} y="10" width="110" height="25" rx="4" fill={col.color} fillOpacity="0.1" stroke={col.color} strokeWidth="1" />
        <text x={col.x} y="26" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="700">{col.name}</text>
      </g>
    ))}

    {/* EVENTS */}
    {[
      { from: 70, to: 210, text: 'POST /agui (message, user_id, roles)', y: 55, color: '#3b82f6' },
      { from: 210, to: 490, text: '1. start trace orchestrator-agui-turn', y: 85, color: '#ec4899', dash: true },
      { from: 210, to: 350, text: '2. load checkpoint (conversation history)', y: 115, color: '#8b5cf6' },
      { from: 210, to: 490, text: '3. fetch system prompt (systemcontext)', y: 145, color: '#ec4899', dash: true },
      { from: 210, to: 70, text: '4. SSE stream: TOOL_CALL_START (execute_a2a_agent)', y: 175, color: '#3b82f6' },
      { from: 210, to: 630, text: '5. POST /a2a/ (message, roles, trace_id)', y: 205, color: '#10b981' },
      { from: 630, to: 630, text: '6. Supervisor -> Table Selector -> SQL Gen', y: 235, color: '#10b981', self: true },
      { from: 630, to: 770, text: '7. Execute SQL (with Fabric RLS context stamped)', y: 265, color: '#f97316' },
      { from: 770, to: 630, text: '8. Returns DataFrame results', y: 295, color: '#f97316' },
      { from: 630, to: 630, text: '9. Autocorrector syntax check / Response Gen', y: 325, color: '#10b981', self: true },
      { from: 630, to: 210, text: '10. Emits chat_interaction artifact', y: 355, color: '#10b981' },
      { from: 210, to: 910, text: '11. Stores Parquet data & Plotly JSON in Postgres', y: 385, color: '#fdba74' },
      { from: 210, to: 70, text: '12. SSE stream: CUSTOM(artifact_payload_meta)', y: 415, color: '#3b82f6' },
      { from: 210, to: 70, text: '13. SSE stream: TEXT_MESSAGE_CONTENT (streaming)', y: 445, color: '#3b82f6' },
      { from: 210, to: 350, text: '14. save checkpoint thread snapshot', y: 475, color: '#8b5cf6' },
      { from: 210, to: 490, text: '15. persist trace input/output metrics', y: 505, color: '#ec4899', dash: true },
      { from: 210, to: 70, text: '16. SSE stream: RUN_FINISHED & snapshot', y: 535, color: '#3b82f6' },
      { from: 70, to: 210, text: '17. GET /artifacts/art_xxx?token=...', y: 585, color: '#3b82f6' },
      { from: 210, to: 910, text: '18. Fetch artifact from Postgres', y: 615, color: '#fdba74' },
      { from: 910, to: 210, text: '19. Return decrypted Parquet payload', y: 645, color: '#fdba74' },
      { from: 210, to: 70, text: '20. Return JSON formatted rows to client', y: 675, color: '#3b82f6' },
    ].map((evt, idx) => (
      <g key={idx}>
        {evt.self ? (
          <g>
            <path d={`M ${evt.from} ${evt.y} L ${evt.from + 40} ${evt.y} L ${evt.from + 40} ${evt.y + 18} L ${evt.from} ${evt.y + 18}`} fill="none" stroke={evt.color} strokeWidth="1.2" markerEnd="url(#s-arr)" />
            <text x={evt.from + 45} y={evt.y + 12} fill="#94a3b8" fontSize="8">{evt.text}</text>
          </g>
        ) : (
          <g>
            <line x1={evt.from} y1={evt.y} x2={evt.to} y2={evt.y} stroke={evt.color} strokeWidth="1.2" strokeDasharray={evt.dash ? '3 3' : 'none'} markerEnd="url(#s-arr)" />
            <text x={(evt.from + evt.to) / 2} y={evt.y - 4} textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="600">{evt.text}</text>
          </g>
        )}
      </g>
    ))}
  </svg>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   5. DATABASE SCHEMA ERD SVG
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const DbSchemaSvg = () => (
  <svg viewBox="0 0 980 600" width="100%" style={{ fontFamily: 'Inter, sans-serif' }}>
    <defs>
      <linearGradient id="db-header" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#334155" stopOpacity="0.9" />
      </linearGradient>
    </defs>

    {/* TABLES */}

    {/* conversation_metadata */}
    <g transform="translate(35, 30)">
      <rect width="250" height="130" rx="6" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.2" />
      <rect width="250" height="24" rx="6" fill="url(#db-header)" stroke="#8b5cf6" strokeWidth="0.8" />
      <text x="10" y="16" fill="#c4b5fd" fontSize="9.5" fontWeight="800">conversation_metadata</text>
      <text x="10" y="42" fill="#3b82f6" fontSize="9" fontWeight="700">PK  thread_id (TEXT)</text>
      <text x="10" y="58" fill="#94a3b8" fontSize="8.5">· user_id (TEXT)</text>
      <text x="10" y="74" fill="#94a3b8" fontSize="8.5">· title (TEXT)</text>
      <text x="10" y="90" fill="#94a3b8" fontSize="8.5">· deleted (BOOLEAN)</text>
      <text x="10" y="106" fill="#64748b" fontSize="8">· created_at / updated_at (TIMESTAMPTZ)</text>
    </g>

    {/* agent_artifacts */}
    <g transform="translate(345, 30)">
      <rect width="260" height="155" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
      <rect width="260" height="24" rx="6" fill="url(#db-header)" stroke="#10b981" strokeWidth="0.8" />
      <text x="10" y="16" fill="#6ee7b7" fontSize="9.5" fontWeight="800">agent_artifacts</text>
      <text x="10" y="42" fill="#10b981" fontSize="9" fontWeight="700">PK  id (TEXT)</text>
      <text x="10" y="58" fill="#94a3b8" fontSize="8.5">· access_token (TEXT)</text>
      <text x="10" y="74" fill="#cbd5e1" fontSize="8.5">FK  thread_id (TEXT)</text>
      <text x="10" y="90" fill="#94a3b8" fontSize="8.5">· run_id (TEXT)</text>
      <text x="10" y="106" fill="#94a3b8" fontSize="8.5">· type (TEXT) - e.g. parquet / plotly</text>
      <text x="10" y="122" fill="#64748b" fontSize="8">· payload (BYTEA) / meta (JSONB)</text>
      <text x="10" y="138" fill="#64748b" fontSize="8">· created_at (TIMESTAMPTZ)</text>
    </g>

    {/* presentation */}
    <g transform="translate(665, 30)">
      <rect width="260" height="130" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.2" />
      <rect width="260" height="24" rx="6" fill="url(#db-header)" stroke="#3b82f6" strokeWidth="0.8" />
      <text x="10" y="16" fill="#93c5fd" fontSize="9.5" fontWeight="800">presentation</text>
      <text x="10" y="42" fill="#3b82f6" fontSize="9" fontWeight="700">PK  id (TEXT)</text>
      <text x="10" y="58" fill="#cbd5e1" fontSize="8.5">FK  thread_id (TEXT)</text>
      <text x="10" y="74" fill="#94a3b8" fontSize="8.5">· user_id (TEXT)</text>
      <text x="10" y="90" fill="#94a3b8" fontSize="8.5">· html_content / status (TEXT)</text>
      <text x="10" y="106" fill="#64748b" fontSize="8">· created_at / updated_at (TIMESTAMPTZ)</text>
    </g>

    {/* presentation_shares */}
    <g transform="translate(665, 210)">
      <rect width="260" height="120" rx="6" fill="#0f172a" stroke="#3b82f6" strokeWidth="1" />
      <rect width="260" height="24" rx="6" fill="url(#db-header)" stroke="#3b82f6" strokeWidth="0.8" />
      <text x="10" y="16" fill="#93c5fd" fontSize="9.5" fontWeight="800">presentation_shares</text>
      <text x="10" y="42" fill="#3b82f6" fontSize="9" fontWeight="700">PK  share_token (TEXT)</text>
      <text x="10" y="58" fill="#cbd5e1" fontSize="8.5">FK  presentation_id (TEXT)</text>
      <text x="10" y="74" fill="#94a3b8" fontSize="8.5">· artifact_token (TEXT)</text>
      <text x="10" y="90" fill="#94a3b8" fontSize="8.5">· created_by (TEXT)</text>
      <text x="10" y="106" fill="#64748b" fontSize="8">· expires_at / created_at (TIMESTAMPTZ)</text>
    </g>

    {/* checkpoints */}
    <g transform="translate(35, 210)">
      <rect width="250" height="145" rx="6" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.2" />
      <rect width="250" height="24" rx="6" fill="url(#db-header)" stroke="#8b5cf6" strokeWidth="0.8" />
      <text x="10" y="16" fill="#c4b5fd" fontSize="9.5" fontWeight="800">checkpoints</text>
      <text x="10" y="42" fill="#3b82f6" fontSize="9.5" fontWeight="700">PK  thread_id (TEXT)</text>
      <text x="10" y="56" fill="#3b82f6" fontSize="9.5" fontWeight="700">PK  checkpoint_ns / checkpoint_id (TEXT)</text>
      <text x="10" y="72" fill="#94a3b8" fontSize="8.5">· parent_checkpoint_id (TEXT)</text>
      <text x="10" y="88" fill="#94a3b8" fontSize="8.5">· checkpoint (JSONB) - variables state</text>
      <text x="10" y="104" fill="#94a3b8" fontSize="8.5">· metadata (JSONB) - user timestamp</text>
      <text x="10" y="120" fill="#64748b" fontSize="8">· created_at (TIMESTAMPTZ)</text>
    </g>

    {/* checkpoint_blobs */}
    <g transform="translate(345, 210)">
      <rect width="260" height="135" rx="6" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.2" />
      <rect width="260" height="24" rx="6" fill="url(#db-header)" stroke="#8b5cf6" strokeWidth="0.8" />
      <text x="10" y="16" fill="#c4b5fd" fontSize="9.5" fontWeight="800">checkpoint_blobs</text>
      <text x="10" y="42" fill="#3b82f6" fontSize="9" fontWeight="700">PK  thread_id / checkpoint_ns (TEXT)</text>
      <text x="10" y="58" fill="#3b82f6" fontSize="9" fontWeight="700">PK  channel / version (TEXT)</text>
      <text x="10" y="74" fill="#94a3b8" fontSize="8.5">· blob (BYTEA) - serialized channel state</text>
      <text x="10" y="90" fill="#64748b" fontSize="8">· created_at (TIMESTAMPTZ)</text>
    </g>

    {/* DBrainDemo: logs_trace */}
    <g transform="translate(35, 385)">
      <rect width="290" height="175" rx="6" fill="#0f172a" stroke="#f97316" strokeWidth="1.2" />
      <rect width="290" height="24" rx="6" fill="url(#db-header)" stroke="#f97316" strokeWidth="0.8" />
      <text x="10" y="16" fill="#fdba74" fontSize="9.5" fontWeight="800">logs_trace (ProfitAgent Observability)</text>
      <text x="10" y="42" fill="#f97316" fontSize="9" fontWeight="700">PK  session_id (UUID)</text>
      <text x="10" y="58" fill="#94a3b8" fontSize="8.5">· user_message / ai_resp (TEXT)</text>
      <text x="10" y="74" fill="#94a3b8" fontSize="8.5">· sql_query (TEXT) · sql_duration_ms (INT)</text>
      <text x="10" y="90" fill="#94a3b8" fontSize="8.5">· sql_status (TEXT) · sql_corrected (BOOLEAN)</text>
      <text x="10" y="106" fill="#94a3b8" fontSize="8.5">· tokens: user / ai · duration_ms (INT)</text>
      <text x="10" y="122" fill="#64748b" fontSize="8">· gpt_calls / gpt_outputs / errors (JSONB)</text>
      <text x="10" y="138" fill="#64748b" fontSize="8">· relevant_tables (TEXT) · vis_success (BOOL)</text>
      <text x="10" y="154" fill="#64748b" fontSize="8">· created_at (TIMESTAMP)</text>
    </g>

    {/* logs_feedback */}
    <g transform="translate(345, 385)">
      <rect width="260" height="135" rx="6" fill="#0f172a" stroke="#f97316" strokeWidth="1.2" />
      <rect width="260" height="24" rx="6" fill="url(#db-header)" stroke="#f97316" strokeWidth="0.8" />
      <text x="10" y="16" fill="#fdba74" fontSize="9.5" fontWeight="800">logs_feedback (User Feedback)</text>
      <text x="10" y="42" fill="#f97316" fontSize="9" fontWeight="700">PK  id (UUID)</text>
      <text x="10" y="58" fill="#94a3b8" fontSize="8.5">· type (TEXT) - e.g. thumbs_up / down</text>
      <text x="10" y="74" fill="#cbd5e1" fontSize="8.5">FK  session_id (UUID) - links logs_trace</text>
      <text x="10" y="90" fill="#94a3b8" fontSize="8.5">· sql_query / correct_sql_query (TEXT)</text>
      <text x="10" y="106" fill="#64748b" fontSize="8">· created_at (TIMESTAMP)</text>
    </g>

    {/* a2a_agent_skills */}
    <g transform="translate(665, 385)">
      <rect width="260" height="135" rx="6" fill="#0f172a" stroke="#f97316" strokeWidth="1.2" />
      <rect width="260" height="24" rx="6" fill="url(#db-header)" stroke="#f97316" strokeWidth="0.8" />
      <text x="10" y="16" fill="#fdba74" fontSize="9.5" fontWeight="800">a2a_agent_skills</text>
      <text x="10" y="42" fill="#f97316" fontSize="9" fontWeight="700">PK  skill_id (TEXT)</text>
      <text x="10" y="58" fill="#cbd5e1" fontSize="8.5">· agent_id (TEXT) - e.g. profit_agent</text>
      <text x="10" y="74" fill="#94a3b8" fontSize="8.5">· name / description (TEXT)</text>
      <text x="10" y="90" fill="#64748b" fontSize="8">· parameters (JSONB) - schema rules</text>
      <text x="10" y="106" fill="#64748b" fontSize="8">· created_at (TIMESTAMP)</text>
    </g>

    {/* RELATION RELATIONSHIP LINES */}
    {/* metadata -> agent_artifacts */}
    <path d="M 285 90 L 345 90" fill="none" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 2" />
    <circle cx="285" cy="90" r="3" fill="#10b981" />

    {/* metadata -> presentation */}
    <path d="M 285 90 L 305 90 L 305 20 L 665 20 L 665 65" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 2" />

    {/* presentation -> shares */}
    <path d="M 795 160 L 795 210" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 2" />
    <circle cx="795" cy="160" r="3" fill="#3b82f6" />

    {/* checkpoints -> blobs */}
    <path d="M 285 270 L 345 270" fill="none" stroke="#8b5cf6" strokeWidth="1.2" strokeDasharray="3 2" />
    <circle cx="285" cy="270" r="3" fill="#8b5cf6" />

    {/* logs_trace -> logs_feedback */}
    <path d="M 325 450 L 345 450" fill="none" stroke="#f97316" strokeWidth="1.2" strokeDasharray="3 2" />
    <circle cx="325" cy="450" r="3" fill="#f97316" />
  </svg>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SMARTDOCS — FULL PIPELINE WITH DOMAIN RULES + DEPLOY
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const SmartDocsArchDetailed = () => (
  <svg viewBox="0 0 980 1120" width="100%" style={{ fontFamily: 'Inter, sans-serif' }}>
    <defs>
      <marker id="sd-b" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#06b6d4" />
      </marker>
      <marker id="sd-v" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#8b5cf6" />
      </marker>
      <marker id="sd-e" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#10b981" />
      </marker>
      <marker id="sd-o" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#f97316" />
      </marker>
      <marker id="sd-y" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#f59e0b" />
      </marker>
    </defs>

    {/* TITLE */}
    <text x="490" y="20" textAnchor="middle" fill="#67e8f9" fontSize="13" fontWeight="800" letterSpacing="-0.3px">SmartDocs — Multimodal Ingestion + Hybrid Knowledge Graph Architecture</text>

    {/* ══ ZONE 1: DOCUMENT INPUTS ══ */}
    <rect x="15" y="28" width="950" height="110" rx="9" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
    <text x="25" y="48" fill="#475569" fontSize="9" fontWeight="700" letterSpacing="0.08em">DOCUMENT INPUTS</text>

    <rect x="35" y="55" width="270" height="70" rx="7" fill="rgba(59,130,246,0.1)" stroke="#3b82f6" strokeWidth="1.2" />
    <text x="170" y="74" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="800">Process Narratives</text>
    <text x="170" y="89" textAnchor="middle" fill="#94a3b8" fontSize="8.5">PDF / Word · Process descriptions</text>
    <text x="170" y="102" textAnchor="middle" fill="#64748b" fontSize="8">Operating procedures · P&amp;ID refs · Unit descriptions</text>
    <text x="170" y="115" textAnchor="middle" fill="#475569" fontSize="8" fontStyle="italic">Typical: 50–300 pages per plant unit</text>

    <rect x="355" y="55" width="270" height="70" rx="7" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" strokeWidth="1.2" />
    <text x="490" y="74" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="800">Control Narratives</text>
    <text x="490" y="89" textAnchor="middle" fill="#94a3b8" fontSize="8.5">PDF / Excel · Instrument specs &amp; tables</text>
    <text x="490" y="102" textAnchor="middle" fill="#64748b" fontSize="8">Control loops · Setpoints · Interlocks · Alarms</text>
    <text x="490" y="115" textAnchor="middle" fill="#475569" fontSize="8" fontStyle="italic">Typical: structured tables, numbered IDs</text>

    <rect x="675" y="55" width="270" height="70" rx="7" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1.2" />
    <text x="810" y="74" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="800">Equipment Data Sheets</text>
    <text x="810" y="89" textAnchor="middle" fill="#94a3b8" fontSize="8.5">PDF / Scanned · P&amp;ID diagrams + tables</text>
    <text x="810" y="102" textAnchor="middle" fill="#64748b" fontSize="8">Materials · Ratings · Nozzle tables · P&amp;ID symbols</text>
    <text x="810" y="115" textAnchor="middle" fill="#475569" fontSize="8" fontStyle="italic">Typical: scanned non-searchable PDFs</text>

    {/* Arrows to parsing zone */}
    <line x1="170" y1="125" x2="170" y2="148" stroke="#3b82f6" strokeWidth="1.3" markerEnd="url(#sd-b)" />
    <line x1="490" y1="125" x2="490" y2="148" stroke="#8b5cf6" strokeWidth="1.3" markerEnd="url(#sd-v)" />
    <line x1="810" y1="125" x2="810" y2="148" stroke="#10b981" strokeWidth="1.3" markerEnd="url(#sd-e)" />

    {/* ══ ZONE 2: AUTONOMOUS PARSING WORKFLOWS ══ */}
    <rect x="15" y="148" width="950" height="175" rx="9" fill="rgba(6,182,212,0.03)" stroke="rgba(6,182,212,0.12)" strokeWidth="1" />
    <text x="25" y="168" fill="#06b6d4" fontSize="9" fontWeight="700" letterSpacing="0.08em">AUTONOMOUS PARSING WORKFLOWS (Azure Doc Intelligence · PaLiGemma VLM · LangGraph Orchestrated)</text>

    {/* Workflow A */}
    <rect x="35" y="175" width="270" height="130" rx="7" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="1.1" />
    <text x="170" y="193" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="700">Workflow A: Process Narrative</text>
    <line x1="50" y1="200" x2="290" y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
    <text x="170" y="214" textAnchor="middle" fill="#94a3b8" fontSize="8.5">① Azure Doc Intelligence (layout+OCR)</text>
    <text x="170" y="227" textAnchor="middle" fill="#94a3b8" fontSize="8.5">② Text chunk extraction (512t/64 overlap)</text>
    <text x="170" y="240" textAnchor="middle" fill="#94a3b8" fontSize="8.5">③ NER: Process Units, Equipment IDs</text>
    <text x="170" y="253" textAnchor="middle" fill="#94a3b8" fontSize="8.5">④ Relation extraction: Unit→Operation</text>
    <text x="170" y="268" textAnchor="middle" fill="#64748b" fontSize="8">→ Text chunks: ada-002 embed → vector index</text>
    <text x="170" y="280" textAnchor="middle" fill="#475569" fontSize="8" fontStyle="italic">Entities: ProcessUnit, OperatingCondition, Hazard</text>

    {/* Workflow B */}
    <rect x="355" y="175" width="270" height="130" rx="7" fill="rgba(139,92,246,0.08)" stroke="#8b5cf6" strokeWidth="1.1" />
    <text x="490" y="193" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="700">Workflow B: Control Narrative</text>
    <line x1="370" y1="200" x2="610" y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
    <text x="490" y="214" textAnchor="middle" fill="#94a3b8" fontSize="8.5">① Table extractor (structured cells → MD)</text>
    <text x="490" y="227" textAnchor="middle" fill="#f59e0b" fontSize="8.5">② Tables → Markdown → Azure Blob Storage</text>
    <text x="490" y="240" textAnchor="middle" fill="#f59e0b" fontSize="8.5">③ Table description + blob path → text index</text>
    <text x="490" y="253" textAnchor="middle" fill="#94a3b8" fontSize="8.5">④ NER: Instruments, Loops, Setpoints</text>
    <text x="490" y="268" textAnchor="middle" fill="#64748b" fontSize="8">→ Instrument tag normalisation (ISA-88)</text>
    <text x="490" y="280" textAnchor="middle" fill="#475569" fontSize="8" fontStyle="italic">Entities: Instrument, ControlLoop, Setpoint</text>

    {/* Workflow C */}
    <rect x="675" y="175" width="270" height="130" rx="7" fill="rgba(16,185,129,0.08)" stroke="#10b981" strokeWidth="1.1" />
    <text x="810" y="193" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="700">Workflow C: Data Sheet (Multimodal)</text>
    <line x1="690" y1="200" x2="930" y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
    <text x="810" y="214" textAnchor="middle" fill="#94a3b8" fontSize="8.5">① Azure Doc Intelligence (OCR + layout)</text>
    <text x="810" y="227" textAnchor="middle" fill="#f59e0b" fontSize="8.5">② PaLiGemma-3B VLM → image caption/desc</text>
    <text x="810" y="240" textAnchor="middle" fill="#f59e0b" fontSize="8.5">③ Image desc + blob pointer → text index</text>
    <text x="810" y="253" textAnchor="middle" fill="#f59e0b" fontSize="8.5">④ Tables → MD blob; desc+path → text index</text>
    <text x="810" y="268" textAnchor="middle" fill="#6ee7b7" fontSize="8.5">⑤ P&amp;ID symbol extraction (200+ classes)</text>
    <text x="810" y="280" textAnchor="middle" fill="#475569" fontSize="8" fontStyle="italic">Entities: Equipment, Nozzle, Material, PISymbol</text>

    {/* Down arrows */}
    <line x1="170" y1="305" x2="170" y2="330" stroke="#06b6d4" strokeWidth="1.3" markerEnd="url(#sd-b)" />
    <line x1="490" y1="305" x2="490" y2="330" stroke="#06b6d4" strokeWidth="1.3" markerEnd="url(#sd-b)" />
    <line x1="810" y1="305" x2="810" y2="330" stroke="#06b6d4" strokeWidth="1.3" markerEnd="url(#sd-b)" />

    {/* ══ ZONE 3: BLOB STORAGE SIDECAR ══ */}
    <rect x="15" y="330" width="950" height="55" rx="7" fill="rgba(245,158,11,0.04)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="5 2" />
    <text x="25" y="350" fill="#f59e0b" fontSize="9" fontWeight="700" letterSpacing="0.08em">AZURE BLOB STORAGE — Out-of-Band Multimodal Store</text>
    <text x="490" y="366" textAnchor="middle" fill="#94a3b8" fontSize="8.5">Full images (P&amp;ID diagrams, scanned pages) · Table Markdown files — referenced by blob path pointers in the text index · Never injected raw into LLM context</text>
    <text x="490" y="378" textAnchor="middle" fill="#64748b" fontSize="8">Junior fetches blobs on-demand when a retrieval result surfaces a blob pointer — raw evidence delivered to the user alongside the generated answer</text>

    {/* ══ ZONE 4: ENTITY MERGE + VALIDATION ══ */}
    <line x1="170" y1="385" x2="170" y2="408" stroke="#06b6d4" strokeWidth="1.3" markerEnd="url(#sd-b)" />
    <line x1="490" y1="385" x2="490" y2="408" stroke="#06b6d4" strokeWidth="1.3" markerEnd="url(#sd-b)" />
    <line x1="810" y1="385" x2="810" y2="408" stroke="#06b6d4" strokeWidth="1.3" markerEnd="url(#sd-b)" />

    <rect x="15" y="408" width="950" height="60" rx="9" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <text x="490" y="430" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="800">Entity Merge &amp; Validation Gate</text>
    <text x="490" y="446" textAnchor="middle" fill="#64748b" fontSize="9">Cross-workflow deduplication · DEXPI / ISO-15926 schema validation · Malformed entities → quarantine queue</text>
    <text x="490" y="461" textAnchor="middle" fill="#475569" fontSize="8.5">MLflow tracks entity counts, validation pass rates, schema version per batch</text>

    {/* Fork to KG and Hybrid Vector */}
    <path d="M 300 468 L 300 490 L 180 490 L 180 512" stroke="#8b5cf6" strokeWidth="1.3" strokeDasharray="4 2" fill="none" markerEnd="url(#sd-v)" />
    <path d="M 680 468 L 680 490 L 810 490 L 810 512" stroke="#10b981" strokeWidth="1.3" strokeDasharray="4 2" fill="none" markerEnd="url(#sd-e)" />
    <line x1="490" y1="468" x2="490" y2="512" stroke="#06b6d4" strokeWidth="1.3" markerEnd="url(#sd-b)" />
    <text x="200" y="488" fill="#8b5cf6" fontSize="9">→ Neo4j (structure)</text>
    <text x="810" y="488" textAnchor="middle" fill="#10b981" fontSize="9">→ Azure AI Search (vectors)</text>

    {/* ══ ZONE 5: HYBRID INDEXING ══ */}
    {/* Neo4j */}
    <rect x="15" y="512" width="460" height="340" rx="9" fill="rgba(139,92,246,0.04)" stroke="#8b5cf6" strokeWidth="1.2" />
    <text x="245" y="533" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontWeight="800">Neo4j Knowledge Graph — Structural Layer</text>
    <text x="245" y="548" textAnchor="middle" fill="#64748b" fontSize="9">Nodes + typed edges built via deterministic domain rules</text>

    <text x="35" y="568" fill="#a78bfa" fontSize="9" fontWeight="700">NODE TYPES:</text>
    {['Equipment', 'Nozzle', 'Pipeline', 'Instrument', 'ControlLoop', 'ProcessUnit', 'OperatingCondition', 'DataSheet', 'Material'].map((n, i) => (
      <g key={i}>
        <rect x={35 + (i % 3) * 138} y={575 + Math.floor(i / 3) * 22} width="130" height="16" rx="4"
          fill="rgba(139,92,246,0.1)" stroke="rgba(139,92,246,0.25)" strokeWidth="0.8" />
        <text x={100 + (i % 3) * 138} y={587 + Math.floor(i / 3) * 22}
          textAnchor="middle" fill="#a78bfa" fontSize="8.5" fontWeight="600">{n}</text>
      </g>
    ))}

    <text x="35" y="660" fill="#06b6d4" fontSize="9" fontWeight="700">DOMAIN RULES — EDGE DEFINITIONS:</text>
    <line x1="35" y1="665" x2="460" y2="665" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
    {[
      { from: 'Equipment', rel: 'HAS_NOZZLE', to: 'Nozzle', rule: 'Tag prefix linkage' },
      { from: 'Equipment', rel: 'CONNECTED_TO', to: 'Pipeline', rule: 'P&ID line numbers' },
      { from: 'Pipeline', rel: 'FEEDS_INTO', to: 'Equipment', rule: 'Flow direction symbol' },
      { from: 'Instrument', rel: 'MONITORS', to: 'ProcessUnit', rule: 'ISA-88 loop→unit map' },
      { from: 'ControlLoop', rel: 'USES', to: 'Instrument', rule: 'Loop diagram linkage' },
      { from: 'Equipment', rel: 'SPECIFIED_BY', to: 'DataSheet', rule: 'Tag cross-reference' },
      { from: 'Equipment', rel: 'MADE_OF', to: 'Material', rule: 'Material column in sheet' },
      { from: 'ProcessUnit', rel: 'HAS_CONDITION', to: 'OperatingCondition', rule: 'Section heading match' },
    ].map((r, i) => (
      <g key={i} transform={`translate(35, ${672 + i * 21})`}>
        <rect width="92" height="15" rx="3" fill="rgba(139,92,246,0.08)" stroke="rgba(139,92,246,0.2)" strokeWidth="0.6" />
        <text x="46" y="11" textAnchor="middle" fill="#a78bfa" fontSize="7.5" fontWeight="700">{r.from}</text>
        <text x="116" y="11" textAnchor="middle" fill="#67e8f9" fontSize="7.5" fontWeight="700">─[{r.rel}]→</text>
        <rect x="152" width="65" height="15" rx="3" fill="rgba(6,182,212,0.08)" stroke="rgba(6,182,212,0.2)" strokeWidth="0.6" />
        <text x="184" y="11" textAnchor="middle" fill="#67e8f9" fontSize="7.5" fontWeight="700">{r.to}</text>
        <text x="224" y="11" fill="#475569" fontSize="7" fontStyle="italic">{r.rule}</text>
      </g>
    ))}

    {/* Hybrid index arrow: Neo4j node descriptions → Azure AI Search */}
    <path d="M 475 680 L 505 680" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#sd-y)" />
    <text x="487" y="673" textAnchor="middle" fill="#f59e0b" fontSize="8" fontWeight="700">embed</text>
    <text x="487" y="690" textAnchor="middle" fill="#f59e0b" fontSize="7.5">descriptions</text>

    {/* Azure AI Search — Hybrid Vector layer */}
    <rect x="505" y="512" width="460" height="340" rx="9" fill="rgba(16,185,129,0.04)" stroke="#10b981" strokeWidth="1.2" />
    <text x="735" y="533" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="800">Azure AI Search — Semantic Layer</text>
    <text x="735" y="548" textAnchor="middle" fill="#64748b" fontSize="9">Hybrid BM25 + HNSW Vector · Unified text + node embedding index</text>

    <text x="525" y="568" fill="#34d399" fontSize="9" fontWeight="700">INDEX SCHEMA (Multimodal + Graph-linked):</text>
    {[
      { field: 'content', type: 'text (BM25)', desc: 'Text chunk / image description / table description' },
      { field: 'embedding', type: 'vector-1536', desc: 'ada-002 embed of content field' },
      { field: 'content_type', type: 'filterable', desc: 'text_chunk | image_desc | table_desc | node_desc' },
      { field: 'blob_path', type: 'retrievable', desc: 'Azure Blob URL for images and table markdown' },
      { field: 'neo4j_id', type: 'retrievable', desc: 'Linked Neo4j node ID (for node descriptions)' },
      { field: 'tag_id', type: 'filterable', desc: 'Equipment / Instrument tag number' },
      { field: 'page_ref', type: 'retrievable', desc: 'Source page + document blob URL' },
    ].map((f, i) => (
      <g key={i} transform={`translate(525, ${575 + i * 26})`}>
        <rect width="420" height="21" rx="4" fill="rgba(16,185,129,0.05)" stroke="rgba(16,185,129,0.12)" strokeWidth="0.8" />
        <text x="10" y="14" fill="#34d399" fontSize="8" fontWeight="700">{f.field}</text>
        <rect x="90" y="3" width="78" height="14" rx="3" fill="rgba(16,185,129,0.12)" />
        <text x="129" y="14" textAnchor="middle" fill="#6ee7b7" fontSize="7.5">{f.type}</text>
        <text x="176" y="14" fill="#64748b" fontSize="7.5">{f.desc}</text>
      </g>
    ))}

    <rect x="525" y="762" width="420" height="72" rx="7" fill="rgba(245,158,11,0.06)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
    <text x="735" y="780" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="700">HYBRID INDEXING — Key Design Insight</text>
    <line x1="540" y1="785" x2="930" y2="785" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
    <text x="735" y="799" textAnchor="middle" fill="#94a3b8" fontSize="8">Neo4j stores structural nodes+edges. Each node's text description is</text>
    <text x="735" y="812" textAnchor="middle" fill="#94a3b8" fontSize="8">also embedded (ada-002) and stored in AI Search with neo4j_id metadata.</text>
    <text x="735" y="825" textAnchor="middle" fill="#64748b" fontSize="8">→ Structural queries: multi-hop Cypher on Neo4j</text>
    <text x="735" y="838" textAnchor="middle" fill="#64748b" fontSize="8">→ Semantic queries: vector search surfaces both doc chunks AND graph node descriptions</text>

    {/* ══ ZONE 6: DEPLOYMENT ══ */}
    <rect x="15" y="870" width="950" height="220" rx="9" fill="rgba(249,115,22,0.03)" stroke="#f97316" strokeWidth="1.1" />
    <text x="25" y="891" fill="#f97316" fontSize="9" fontWeight="700" letterSpacing="0.08em">DEPLOYMENT ARCHITECTURE (Azure · AKS · Managed Identity)</text>

    {[
      { x: 35, label: 'Azure ML Pipelines', color: '#3b82f6', lines: ['Orchestrates ingestion', 'GPU compute (A100)', 'Dataset versioning', 'MLflow tracking', 'Model registry'] },
      { x: 225, label: 'AKS Cluster', color: '#8b5cf6', lines: ['Neo4j pod (graph DB)', 'Ingestion svc pod', 'PaLiGemma inference', 'Managed Identity', 'Pod autoscaling'] },
      { x: 415, label: 'Azure Blob Storage', color: '#f59e0b', lines: ['Raw PDFs', 'Image blobs (P&IDs)', 'Table markdown files', 'Quarantine queue', 'MLflow artifacts'] },
      { x: 605, label: 'Security Layer', color: '#10b981', lines: ['Key Vault secrets', 'Managed Identity', 'RBAC per data tier', 'ACR for images', 'APIM gateway'] },
      { x: 795, label: 'Observability', color: '#f97316', lines: ['OpenTelemetry traces', 'App Insights metrics', 'Azure Monitor', 'Workbook dashboards', 'Eval: Prompt Flow'] },
    ].map((d) => (
      <g key={d.x}>
        <rect x={d.x} y={900} width="170" height="175" rx="7" fill={`${d.color}10`} stroke={d.color} strokeWidth="1.1" />
        <text x={d.x + 85} y={920} textAnchor="middle" fill={d.color} fontSize="10" fontWeight="800">{d.label}</text>
        <line x1={d.x + 10} y1={928} x2={d.x + 160} y2={928} stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
        {d.lines.map((l, i) => (
          <g key={i}>
            <circle cx={d.x + 18} cy={942 + i * 26} r="2.5" fill={d.color} fillOpacity="0.6" />
            <text x={d.x + 27} y={946 + i * 26} fill="#94a3b8" fontSize="8.5">{l}</text>
          </g>
        ))}
      </g>
    ))}

    {/* Legend */}
    <g transform="translate(15, 1105)">
      <Legend items={[
        { color: '#3b82f6', label: 'Process Narrative' },
        { color: '#8b5cf6', label: 'Control Narrative + KG' },
        { color: '#10b981', label: 'Data Sheet + Vector' },
        { color: '#f59e0b', label: 'Blob Store + Hybrid Embed' },
        { color: '#f97316', label: 'Deployment' },
      ]} />
    </g>
  </svg>
);

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   JUNIOR RAG — DETAILED RETRIEVAL ARCHITECTURE
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export const JuniorArchDetailed = () => (
  <svg viewBox="0 0 980 540" width="100%" style={{ fontFamily: 'Inter, sans-serif' }}>
    <defs>
      <marker id="j-b" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#3b82f6" />
      </marker>
      <marker id="j-v" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#8b5cf6" />
      </marker>
      <marker id="j-e" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#10b981" />
      </marker>
      <marker id="j-c" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#06b6d4" />
      </marker>
      <marker id="j-o" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#f97316" />
      </marker>
      <marker id="j-y" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
        <path d="M0,0 L0,6 L7,3 z" fill="#f59e0b" />
      </marker>
    </defs>

    <text x="490" y="20" textAnchor="middle" fill="#a78bfa" fontSize="13" fontWeight="800">Junior — Multimodal Agentic RAG Interface (Semantic Kernel + Autogen)</text>

    {/* ── USER QUERY ── */}
    <rect x="15" y="35" width="160" height="90" rx="8" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1.3" />
    <text x="95" y="57" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="800">Engineer Query</text>
    <text x="95" y="72" textAnchor="middle" fill="#94a3b8" fontSize="8.5">FastAPI · AKS · APIM</text>
    <text x="95" y="87" textAnchor="middle" fill="#64748b" fontSize="8" fontStyle="italic">"What instruments</text>
    <text x="95" y="99" textAnchor="middle" fill="#64748b" fontSize="8" fontStyle="italic">monitor pump P-101?"</text>
    <text x="95" y="113" textAnchor="middle" fill="#64748b" fontSize="8" fontStyle="italic">"Show P&amp;ID for P-101"</text>
    <line x1="175" y1="80" x2="205" y2="80" stroke="#3b82f6" strokeWidth="1.4" markerEnd="url(#j-b)" />

    {/* ── QUERY UNDERSTANDING ── */}
    <rect x="205" y="35" width="175" height="90" rx="8" fill="rgba(139,92,246,0.12)" stroke="#8b5cf6" strokeWidth="1.3" />
    <text x="292" y="57" textAnchor="middle" fill="#c4b5fd" fontSize="10" fontWeight="800">Query Understanding</text>
    <text x="292" y="72" textAnchor="middle" fill="#94a3b8" fontSize="8.5">Semantic Kernel Planner</text>
    <text x="292" y="87" textAnchor="middle" fill="#64748b" fontSize="8">Structured → graph path</text>
    <text x="292" y="100" textAnchor="middle" fill="#64748b" fontSize="8">Unstructured → vector path</text>
    <text x="292" y="113" textAnchor="middle" fill="#64748b" fontSize="8">Hybrid → both paths</text>
    <line x1="380" y1="80" x2="410" y2="80" stroke="#8b5cf6" strokeWidth="1.4" markerEnd="url(#j-v)" />

    {/* Router */}
    <rect x="410" y="55" width="120" height="50" rx="8" fill="rgba(249,115,22,0.12)" stroke="#f97316" strokeWidth="1.3" />
    <text x="470" y="76" textAnchor="middle" fill="#fdba74" fontSize="10" fontWeight="800">Query Router</text>
    <text x="470" y="91" textAnchor="middle" fill="#94a3b8" fontSize="8.5">Autogen orchestrated</text>

    {/* Fork to two paths */}
    <line x1="470" y1="105" x2="470" y2="128" stroke="#f97316" strokeWidth="1.2" />
    <line x1="195" y1="128" x2="750" y2="128" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
    <line x1="245" y1="128" x2="245" y2="152" stroke="#8b5cf6" strokeWidth="1.3" markerEnd="url(#j-v)" />
    <line x1="700" y1="128" x2="700" y2="152" stroke="#10b981" strokeWidth="1.3" markerEnd="url(#j-e)" />
    <text x="245" y="146" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontWeight="700">Graph path</text>
    <text x="700" y="146" textAnchor="middle" fill="#10b981" fontSize="8" fontWeight="700">Vector + Multimodal path</text>

    {/* ── GRAPH PATH ── */}
    <rect x="35" y="160" width="420" height="165" rx="9" fill="rgba(139,92,246,0.05)" stroke="#8b5cf6" strokeWidth="1.1" />
    <text x="245" y="180" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="800">Neo4j Graph Retrieval Path</text>

    <rect x="50" y="190" width="170" height="122" rx="7" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" strokeWidth="1" />
    <text x="135" y="208" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="700">Cypher Generator</text>
    <line x1="60" y1="215" x2="210" y2="215" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
    <text x="135" y="228" textAnchor="middle" fill="#94a3b8" fontSize="8">Semantic Kernel plugin</text>
    <text x="135" y="242" textAnchor="middle" fill="#64748b" fontSize="7.5">MATCH (e:Equipment)-</text>
    <text x="135" y="254" textAnchor="middle" fill="#64748b" fontSize="7.5">  [:HAS_NOZZLE|CONNECTED_TO*]</text>
    <text x="135" y="266" textAnchor="middle" fill="#64748b" fontSize="7.5">-(i:Instrument)</text>
    <text x="135" y="278" textAnchor="middle" fill="#64748b" fontSize="7.5">WHERE e.tag = 'P-101'</text>
    <text x="135" y="290" textAnchor="middle" fill="#64748b" fontSize="7.5">RETURN i, i.description</text>
    <text x="135" y="303" textAnchor="middle" fill="#475569" fontSize="7.5" fontStyle="italic">Multi-hop traversal</text>

    <rect x="240" y="190" width="200" height="122" rx="7" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6" strokeWidth="1" />
    <text x="340" y="208" textAnchor="middle" fill="#c4b5fd" fontSize="9" fontWeight="700">Graph Execution</text>
    <line x1="250" y1="215" x2="430" y2="215" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
    <text x="340" y="230" textAnchor="middle" fill="#94a3b8" fontSize="8">Neo4j on AKS (Bolt)</text>
    <text x="340" y="245" textAnchor="middle" fill="#64748b" fontSize="8">→ FT-101 (Flow Trans.)</text>
    <text x="340" y="258" textAnchor="middle" fill="#64748b" fontSize="8">→ PT-101 (Pressure)</text>
    <text x="340" y="271" textAnchor="middle" fill="#64748b" fontSize="8">→ LT-101 (Level)</text>
    <text x="340" y="284" textAnchor="middle" fill="#64748b" fontSize="8">→ TT-101 (Temperature)</text>
    <text x="340" y="300" textAnchor="middle" fill="#475569" fontSize="7.5" fontStyle="italic">Equipment→Nozzle→Pipeline→Instrument</text>

    {/* ── VECTOR + MULTIMODAL PATH ── */}
    <rect x="515" y="160" width="450" height="165" rx="9" fill="rgba(16,185,129,0.05)" stroke="#10b981" strokeWidth="1.1" />
    <text x="740" y="180" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="800">Azure AI Search — Multimodal Vector Path</text>

    <rect x="530" y="190" width="175" height="122" rx="7" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1" />
    <text x="617" y="208" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="700">Hybrid Query</text>
    <line x1="540" y1="215" x2="695" y2="215" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
    <text x="617" y="228" textAnchor="middle" fill="#94a3b8" fontSize="8">ada-002 embed + BM25</text>
    <text x="617" y="242" textAnchor="middle" fill="#64748b" fontSize="8">RRF fusion across:</text>
    <text x="617" y="256" textAnchor="middle" fill="#94a3b8" fontSize="8">• text_chunk chunks</text>
    <text x="617" y="270" textAnchor="middle" fill="#f59e0b" fontSize="8">• image_desc (VLM captions)</text>
    <text x="617" y="284" textAnchor="middle" fill="#f59e0b" fontSize="8">• table_desc (MD summaries)</text>
    <text x="617" y="298" textAnchor="middle" fill="#a78bfa" fontSize="8">• node_desc (graph nodes)</text>

    <rect x="720" y="190" width="230" height="122" rx="7" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1" />
    <text x="835" y="208" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="700">Retrieved Results</text>
    <line x1="730" y1="215" x2="940" y2="215" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
    <text x="835" y="228" textAnchor="middle" fill="#94a3b8" fontSize="8">Semantic re-ranking</text>
    <text x="835" y="243" textAnchor="middle" fill="#64748b" fontSize="8">Narrative chunk: p.45</text>
    <text x="835" y="257" textAnchor="middle" fill="#f59e0b" fontSize="8">Image desc + blob_path → P-101.png</text>
    <text x="835" y="271" textAnchor="middle" fill="#f59e0b" fontSize="8">Table desc + blob_path → nozzle.md</text>
    <text x="835" y="285" textAnchor="middle" fill="#a78bfa" fontSize="8">Graph node desc (neo4j_id linked)</text>
    <text x="835" y="300" textAnchor="middle" fill="#475569" fontSize="7.5" fontStyle="italic">blob_path present → trigger blob fetch</text>

    {/* ── BLOB FETCH SIDECAR ── */}
    <path d="M 835 312 L 835 335 L 835 355" stroke="#f59e0b" strokeWidth="1.3" strokeDasharray="3 2" markerEnd="url(#j-y)" />
    <rect x="720" y="355" width="230" height="65" rx="8" fill="rgba(245,158,11,0.08)" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 2" />
    <text x="835" y="374" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="800">Azure Blob Storage Fetch</text>
    <line x1="730" y1="380" x2="940" y2="380" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
    <text x="835" y="393" textAnchor="middle" fill="#94a3b8" fontSize="8">On-demand: fetch full image or table MD</text>
    <text x="835" y="407" textAnchor="middle" fill="#64748b" fontSize="8">Returned as raw evidence alongside answer</text>
    <line x1="720" y1="388" x2="470" y2="420" stroke="#f59e0b" strokeWidth="1.1" strokeDasharray="3 2" markerEnd="url(#j-y)" />

    {/* Merge arrows */}
    <line x1="245" y1="325" x2="245" y2="358" stroke="#8b5cf6" strokeWidth="1.3" markerEnd="url(#j-v)" />
    <line x1="650" y1="325" x2="490" y2="358" stroke="#10b981" strokeWidth="1.3" markerEnd="url(#j-e)" />

    {/* ── CONTEXT FUSION ── */}
    <rect x="130" y="358" width="330" height="85" rx="9" fill="rgba(249,115,22,0.08)" stroke="#f97316" strokeWidth="1.3" />
    <text x="295" y="378" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="800">Context Fusion</text>
    <text x="295" y="393" textAnchor="middle" fill="#94a3b8" fontSize="8.5">Semantic Kernel · Cross-encoder rerank</text>
    <line x1="145" y1="399" x2="445" y2="399" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
    <text x="295" y="412" textAnchor="middle" fill="#94a3b8" fontSize="8">Graph results + vector chunks</text>
    <text x="295" y="425" textAnchor="middle" fill="#f59e0b" fontSize="8">+ blob-fetched images/tables (if any)</text>
    <text x="295" y="437" textAnchor="middle" fill="#64748b" fontSize="8">Dedup · Score-weight · Rank by confidence</text>
    <line x1="460" y1="400" x2="490" y2="400" stroke="#f97316" strokeWidth="1.4" markerEnd="url(#j-o)" />

    {/* LLM synthesis */}
    <rect x="490" y="358" width="215" height="85" rx="9" fill="rgba(139,92,246,0.12)" stroke="#8b5cf6" strokeWidth="1.3" />
    <text x="597" y="378" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontWeight="800">LLM Synthesis</text>
    <text x="597" y="393" textAnchor="middle" fill="#94a3b8" fontSize="8.5">Azure OpenAI GPT-4o</text>
    <line x1="505" y1="399" x2="695" y2="399" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
    <text x="597" y="413" textAnchor="middle" fill="#94a3b8" fontSize="8">Dynamic prompt + all evidence</text>
    <text x="597" y="427" textAnchor="middle" fill="#94a3b8" fontSize="8">Hallucination guard: citation required</text>
    <text x="597" y="440" textAnchor="middle" fill="#475569" fontSize="7.5" fontStyle="italic">Groundedness &gt;90% (Prompt Flow eval)</text>
    <line x1="705" y1="400" x2="730" y2="400" stroke="#8b5cf6" strokeWidth="1.4" markerEnd="url(#j-v)" />

    {/* Answer */}
    <rect x="730" y="450" width="220" height="75" rx="8" fill="rgba(16,185,129,0.12)" stroke="#10b981" strokeWidth="1.3" />
    <line x1="730" y1="400" x2="840" y2="450" stroke="#10b981" strokeWidth="1.1" markerEnd="url(#j-e)" />
    <text x="840" y="470" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="800">Grounded Multimodal Answer</text>
    <text x="840" y="484" textAnchor="middle" fill="#94a3b8" fontSize="8">Text answer + citations</text>
    <text x="840" y="497" textAnchor="middle" fill="#f59e0b" fontSize="8">Blob links: P&amp;ID image / nozzle table</text>
    <text x="840" y="510" textAnchor="middle" fill="#64748b" fontSize="8">Neo4j node IDs + page refs traceable</text>

    {/* Eval strip */}
    <rect x="15" y="450" width="700" height="40" rx="7" fill="rgba(16,185,129,0.05)" stroke="#10b981" strokeWidth="1" strokeDasharray="4 2" />
    <text x="357" y="467" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="700">Evaluation: Azure AI Studio Prompt Flow · Pairwise + Rubric-based scoring</text>
    <text x="357" y="481" textAnchor="middle" fill="#64748b" fontSize="8">Groundedness · Relevance · Faithfulness · Citation accuracy → App Insights</text>

    {/* Legend */}
    <g transform="translate(15, 500)">
      <Legend items={[
        { color: '#8b5cf6', label: 'Graph Path' },
        { color: '#10b981', label: 'Vector + Node Desc Path' },
        { color: '#f59e0b', label: 'Blob Fetch (Images/Tables)' },
        { color: '#f97316', label: 'Fusion + LLM Synthesis' },
      ]} />
    </g>
  </svg>
);
