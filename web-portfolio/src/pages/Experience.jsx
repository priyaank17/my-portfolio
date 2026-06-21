import React from 'react';
import FadeIn from '../components/FadeIn';

const EXPERIENCE = [
  {
    period: 'Dec 2025 – Present',
    role: 'Senior Consultant (AI)',
    company: 'Capgemini · Mercedes-Benz R&D India (MBRDI), Bengaluru',
    desc: 'Leading the design and delivery of enterprise-grade agentic AI systems for the automotive product profitability, sales, and cost analytics domain at MBRDI. Architected mAIstro, a multi-agent orchestrator using A2A communication and MCP, and ProfitAgent, a LangGraph-based Text2SQL engine with Langfuse observability and CopilotKit/AG-UI frontend sync.',
    tags: ['Multi-Agent', 'LangGraph', 'MCP', 'A2A', 'CopilotKit', 'Langfuse', 'Text2SQL'],
  },
  {
    period: 'Aug 2020 – Oct 2025',
    role: 'Senior Data Scientist (Gen AI)',
    company: 'Drishya AI Labs (Y-Hat Analytics India Pvt. Ltd.), Bangalore',
    desc: 'Led AI and GenAI programs for global oil & gas clients, contributing to 40% revenue growth and expanding solutions to new markets. Designed and deployed scalable LLM + RAG pipelines (text + vision) on Azure AI & AWS, improving document intelligence accuracy by 30%+ and cutting manual review effort by 50%. Built SmartDocs (Knowledge Graph RAG platform) and Junior (conversational RAG interface). Fine-tuned PaLiGemma-3B for P&ID engineering schematics. Developed DETR-based vision models to digitize 200+ P&ID symbol classes, reducing plant diagram processing time by 66%.',
    tags: ['Graph RAG', 'Neo4j', 'PaLiGemma-3B', 'Azure AI', 'LangGraph', 'Semantic Kernel', 'Autogen', 'DETR'],
  },
  {
    period: 'Mar 2020 – May 2020',
    role: 'Research AI Intern',
    company: 'AIForMankind, California, United States (Remote)',
    desc: 'Contributed to a real-time wildfire smoke detection system using advanced neural networks. Collaborated with domain experts to refine AI model accuracy and efficiency, focusing on practical deployment of machine learning models for environmental monitoring.',
    tags: ['Computer Vision', 'Neural Networks', 'ML Deployment'],
  },
];

const EDUCATION = [
  {
    period: 'Aug 2019 – Apr 2020',
    degree: 'Masters — Data Science, Business Analytics & Big Data',
    institution: 'Aegis School of Business, Mumbai, India',
    gpa: 'GPA: 2.75 / 5',
  },
  {
    period: '2013 – 2017',
    degree: 'BTech — Mechanical Engineering',
    institution: 'VIT Vellore, Vellore, India',
    gpa: 'GPA: 8.68 / 10',
  },
];

const Experience = () => (
  <>
    <div className="page">
      <section className="section">
        <FadeIn>
          <p className="section-eyebrow">Career History</p>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-desc" style={{ marginBottom: '4rem' }}>
            Over five years of progressive experience in applied AI, with a consistent focus on building
            production systems that translate complex AI research into measurable enterprise outcomes.
          </p>
        </FadeIn>

        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <FadeIn key={i} delay={i * 0.12}>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-period">{e.period}</div>
                <div className="timeline-role">{e.role}</div>
                <div className="timeline-company">{e.company}</div>
                <div className="timeline-desc">{e.desc}</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                  {e.tags.map(t => <span key={t} className="tag tag-blue">{t}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>

    <hr className="section-divider" />

    {/* Education */}
    <div className="page">
      <section className="section">
        <FadeIn>
          <p className="section-eyebrow">Academic Background</p>
          <h2 className="section-title">Education</h2>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem', maxWidth: 720 }}>
          {EDUCATION.map((ed, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="glass-card">
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{ed.period}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem' }}>{ed.degree}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{ed.institution}</p>
                <span className="tag tag-violet">{ed.gpa}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>

    <hr className="section-divider" />

    {/* Skills */}
    <div className="page">
      <section className="section">
        <FadeIn>
          <p className="section-eyebrow">Technical Skills</p>
          <h2 className="section-title">Core Stack</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                category: 'AI & Machine Learning',
                color: 'var(--accent-blue)',
                items: ['Generative AI', 'LLMs (GPT, T5, LLaMA)', 'RAG & Graph RAG', 'Fine-tuning Transformers', 'Deep Learning', 'Multi-Agent Systems', 'MCP / MCP Gateway'],
              },
              {
                category: 'Frameworks & Orchestration',
                color: 'var(--accent-violet)',
                items: ['LangGraph', 'LangChain', 'Semantic Kernel', 'Autogen', 'CopilotKit / AG-UI', 'Langfuse', 'Prompt Flow'],
              },
              {
                category: 'Cloud & Deployment',
                color: 'var(--accent-cyan)',
                items: ['Azure OpenAI', 'Azure AI Studio', 'Azure ML Pipelines', 'Azure AI Search', 'Azure Document Intelligence', 'AKS', 'ACR', 'Azure Key Vault', 'Azure Monitor', 'AWS', 'Docker', 'Kubernetes', 'FastAPI'],
              },
              {
                category: 'Data & Knowledge',
                color: 'var(--accent-emerald)',
                items: ['Neo4j (Knowledge Graphs)', 'Azure AI Search (BM25 + Vector)', 'SQL / Text2SQL', 'MLflow', 'OpenTelemetry', 'Azure Blob / ADLS Gen2'],
              },
              {
                category: 'Programming & CV',
                color: '#f59e0b',
                items: ['Python', 'PyTorch', 'TensorFlow', 'DETR', 'Vision Transformers', 'PaLiGemma-3B', 'LoRA / QLoRA'],
              },
            ].map((group, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${group.color}`, paddingLeft: '1.25rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: group.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>{group.category}</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {group.items.map(item => (
                    <span key={item} className="tag tag-blue" style={{ fontSize: '0.8rem' }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>
    </div>

    <footer>
      <p>Priyank Jha &mdash; Professional Experience &mdash; Capgemini &copy; 2026</p>
    </footer>
  </>
);

export default Experience;
