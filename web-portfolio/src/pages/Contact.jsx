import React from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import FadeIn from '../components/FadeIn';

const GitHubIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const CONTACT_LINKS = [
  {
    icon: <LinkedInIcon size={22} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/priyaank17',
    href: 'https://www.linkedin.com/in/priyaank17',
    accent: '#0a66c2',
    desc: 'Professional profile & recommendations',
  },
  {
    icon: <GitHubIcon size={22} />,
    label: 'GitHub',
    value: 'github.com/priyaank17',
    href: 'https://github.com/priyaank17',
    accent: '#e2e8f0',
    desc: 'Open-source projects &amp; code',
  },
  {
    icon: <Mail size={22} />,
    label: 'Email',
    value: 'priyankjha62@gmail.com',
    href: 'mailto:priyankjha62@gmail.com',
    accent: '#3b82f6',
    desc: 'Preferred for professional enquiries',
  },
];

const Contact = () => (
  <>
    <div className="page">
      <section className="section">
        <FadeIn>
          <p className="section-eyebrow">Get In Touch</p>
          <h2 className="section-title">Contact &amp; Profiles</h2>
          <p className="section-desc" style={{ marginBottom: '3.5rem' }}>
            Open to senior AI engineering roles, technical leadership positions, and consulting engagements
            in the agentic AI and enterprise LLM space. Feel free to reach out via any of the channels below.
          </p>
        </FadeIn>

        <div className="grid-2" style={{ marginBottom: '3rem' }}>
          {/* Personal Info Card */}
          <FadeIn delay={0.05}>
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>Priyank Jha</h3>
                <p style={{ color: 'var(--accent-blue)', fontWeight: 600, fontSize: '0.9rem' }}>Senior Consultant (AI) · Capgemini</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <MapPin size={16} color="var(--accent-violet)" style={{ flexShrink: 0 }} />
                  Bengaluru, India
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <Mail size={16} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                  priyankjha62@gmail.com
                </div>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Current Focus</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['Multi-Agent Systems', 'MCP', 'Enterprise RAG', 'LangGraph'].map(t => (
                    <span key={t} className="tag tag-blue">{t}</span>
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Open To</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['Senior AI Engineering', 'Tech Lead', 'AI Architecture', 'Consulting'].map(t => (
                    <span key={t} className="tag tag-violet">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {CONTACT_LINKS.map((l, i) => (
              <FadeIn key={l.label} delay={0.1 + i * 0.08}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div className="glass-card" style={{
                    display: 'flex', alignItems: 'center', gap: '1.25rem',
                    borderLeft: `3px solid ${l.accent}`,
                    borderRadius: '12px',
                  }}>
                    <div style={{
                      width: 46, height: 46, borderRadius: 10, flexShrink: 0,
                      background: `${l.accent}18`,
                      border: `1px solid ${l.accent}33`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: l.accent,
                    }}>
                      {l.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.2rem' }}>{l.label}</div>
                      <div style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)' }}>{l.value}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{l.desc}</div>
                    </div>
                    <ExternalLink size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>

    <hr className="section-divider" />

    {/* Quick About */}
    <div className="page">
      <section className="section">
        <FadeIn>
          <p className="section-eyebrow">About</p>
          <h2 className="section-title">In Brief</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="glass-card" style={{ maxWidth: 760, marginTop: '2rem' }}>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.85 }}>
              I am a Senior AI Engineer and Consultant currently working at <strong style={{ color: 'var(--text-primary)' }}>Capgemini India</strong>,
              where I lead the design and delivery of production-grade agentic AI systems for enterprise clients
              including Mercedes-Benz R&amp;D India. My work spans multi-agent orchestration (LangGraph, A2A),
              Model Context Protocol integration, enterprise RAG, and full-stack AI observability.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginTop: '1rem' }}>
              Prior to Capgemini, I spent over five years at <strong style={{ color: 'var(--text-primary)' }}>Drishya AI Labs</strong> (Y-Hat Analytics),
              where I led GenAI and computer vision programs for global oil &amp; gas clients — building knowledge
              graph-powered digitization platforms and fine-tuning vision models on P&amp;ID engineering schematics.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.85, marginTop: '1rem' }}>
              I hold a <strong style={{ color: 'var(--text-primary)' }}>Masters in Data Science, Business Analytics &amp; Big Data</strong> from
              Aegis School of Business, Mumbai, and a <strong style={{ color: 'var(--text-primary)' }}>BTech in Mechanical Engineering</strong> from
              VIT Vellore.
            </p>
          </div>
        </FadeIn>
      </section>
    </div>

    <footer>
      <p>Priyank Jha &mdash; Bengaluru, India &mdash; &copy; 2026</p>
    </footer>
  </>
);

export default Contact;
