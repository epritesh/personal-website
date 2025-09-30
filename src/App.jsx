import { useState } from 'react'
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Sun,
  Moon,
  Cpu,
  Rocket,
  Code2,
  Layers,
  Cloud,
  Calendar,
  Award
} from 'lucide-react'

const primaryProjects = [
  {
    title: 'Edge Annotation Platform',
    description:
      'Realtime design feedback system with collaborative annotation, offline sync, and Figma plug-in integration.',
    tags: ['React', 'Vite', 'WebRTC', 'Node.js'],
    link: 'https://github.com/epritesh/edge-annotation'
  },
  {
    title: 'DevOps Insights Dashboard',
    description:
      'Unified deployment health and DORA metrics with streaming logs, feature flags, and on-call context in one UI.',
    tags: ['TypeScript', 'Fastify', 'TailwindCSS', 'PostgreSQL'],
    link: 'https://github.com/epritesh/devops-insights'
  },
  {
    title: 'LLM Pair Programmer',
    description:
      'Prompt engineering toolkit for codebases: context-aware suggestions, automated test hints, and change risk scoring.',
    tags: ['Next.js', 'OpenAI', 'Prisma', 'Supabase'],
    link: 'https://github.com/epritesh/llm-pair-programmer'
  }
]

const skillDomains = [
  {
    icon: Cpu,
    title: 'Frontend Systems',
    items: ['React 18+', 'TypeScript', 'State charts', 'Design systems', 'Accessibility audits']
  },
  {
    icon: Cloud,
    title: 'Cloud & Edge',
    items: ['Vercel', 'AWS Lambda', 'Cloudflare Workers', 'Supabase', 'CI/CD automation']
  },
  {
    icon: Layers,
    title: 'Backend Services',
    items: ['Node.js', 'Fastify', 'tRPC', 'Prisma', 'Event-driven workflows']
  },
  {
    icon: Rocket,
    title: 'Product Velocity',
    items: ['Lean discovery', 'OKR facilitation', 'Experiment design', 'Tech mentoring']
  }
]

const timeline = [
  {
    period: '2023 — Present',
    role: 'Senior Frontend Engineer · Aurora Analytics',
    bullets: [
      'Led rewrite to Vite + React Server Components; cut cold-start by 42%.',
      'Built design tokens pipeline syncing Figma and Storybook automatically.',
      'Mentored 4 engineers, introduced quarterly accessibility audits.'
    ]
  },
  {
    period: '2020 — 2023',
    role: 'Full-Stack Engineer · CloudFlux',
    bullets: [
      'Shipped observability explorer ingesting 4M events/min with sub-second drilldowns.',
      'Authored internal CLI tooling adopted by 6 squads and platform SRE team.',
      'Created feature flag heuristics that reduced incident rollback time by 60%.'
    ]
  }
]

const learningLog = [
  {
    title: 'Bringing streaming UX to marketing dashboards',
    date: 'Aug 2025',
    link: 'https://dev.to/epritesh/streaming-dashboard-ux'
  },
  {
    title: 'Modern test strategy for component-driven teams',
    date: 'May 2025',
    link: 'https://dev.to/epritesh/test-strategy'
  },
  {
    title: 'Avoiding the state machine anti-pattern trap',
    date: 'Jan 2025',
    link: 'https://dev.to/epritesh/state-machines'
  }
]

const certifications = [
  {
    title: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services',
    year: '2024'
  },
  {
    title: 'Google Cloud Professional Cloud Developer',
    issuer: 'Google Cloud',
    year: '2023'
  }
]

function classNames(...values) {
  return values.filter(Boolean).join(' ')
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  const rootClasses = classNames(
    'min-h-screen transition-colors duration-500',
    isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
  )

  const cardClasses = classNames(
    'rounded-2xl border p-6 transition',
    isDarkMode
      ? 'border-slate-800 bg-slate-900/80 hover:border-brand-cyan/40'
      : 'border-slate-200 bg-white hover:border-brand-indigo/40'
  )

  const accentBorder = isDarkMode
    ? 'border-slate-800 hover:border-brand-cyan/60'
    : 'border-slate-300 hover:border-brand-indigo/60'

  return (
    <div className={rootClasses}>
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={classNames(
            'absolute top-[-10rem] right-[-6rem] w-[28rem] h-[28rem] rounded-full blur-3xl opacity-40',
            isDarkMode ? 'bg-brand-cyan/60' : 'bg-brand-indigo/40'
          )}
        />
        <div
          className={classNames(
            'absolute bottom-[-8rem] left-[-4rem] w-[26rem] h-[26rem] rounded-full blur-3xl opacity-40',
            isDarkMode ? 'bg-brand-purple/60' : 'bg-brand-cyan/40'
          )}
        />
      </div>

      <header className="relative z-10 border-b border-white/5">
        <div className="container mx-auto px-6 py-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-brand-cyan font-semibold">
              <Code2 size={16} /> Pritesh · Software Engineer
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mt-3 max-w-xl leading-tight">
              Building fast, resilient product experiences for data-heavy teams.
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-400">
              I partner with product, design, and platform teams to deliver thoughtful developer platforms, observability tools, and delightful frontend systems.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="px-5 py-2.5 rounded-full bg-brand-cyan text-slate-950 font-medium shadow hover:-translate-y-0.5 transition-transform"
                href="mailto:epritesh@gmail.com"
              >
                Book a pairing session
              </a>
              <a
                className={classNames('px-5 py-2.5 rounded-full border font-medium transition-colors', accentBorder)}
                href="https://github.com/epritesh"
                target="_blank"
                rel="noreferrer"
              >
                View GitHub
              </a>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4">
            <button
              onClick={() => setIsDarkMode((prev) => !prev)}
              className={classNames('p-3 rounded-full border transition', accentBorder)}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div
              className={classNames(
                'rounded-2xl border px-5 py-4 text-sm backdrop-blur',
                isDarkMode ? 'border-slate-800 bg-white/5' : 'border-white/70 bg-white/60'
              )}
            >
              <div className="font-semibold text-sm text-brand-cyan">Availability</div>
              <div>Accepting part-time consulting for DX tooling & data viz.</div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-16 space-y-20">
        <section>
          <h2 className="section-title">Impact Snapshots</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[{
              title: '42% faster builds',
              detail: 'Re-architected modular build pipeline with Vite + PNPM workspaces.'
            }, {
              title: '99.95% uptime',
              detail: 'Rolled out synthetic monitoring with GitOps rollbacks and incident runbooks.'
            }, {
              title: 'Mentored 12 devs',
              detail: 'Facilitated weekly architecture reviews and pairing rotations.'
            }].map((card) => (
              <div key={card.title} className={classNames(cardClasses, 'shadow-sm')}>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-400">{card.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Selected Projects</h2>
          <div className="grid gap-6">
            {primaryProjects.map((project) => (
              <div key={project.title} className={classNames(cardClasses, 'flex flex-col md:flex-row md:items-start md:justify-between gap-6')}>
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={classNames(
                          'px-3 py-1 rounded-full text-xs font-medium',
                          isDarkMode ? 'bg-slate-800 text-slate-100' : 'bg-slate-100 text-slate-700'
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="self-start inline-flex items-center gap-2 text-sm font-medium text-brand-cyan hover:underline"
                >
                  Explore repo <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Expertise</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {skillDomains.map((domain) => (
              <div key={domain.title} className={cardClasses}>
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-brand-cyan/10 text-brand-cyan p-2 w-fit">
                    <domain.icon size={22} />
                  </div>
                  <h3 className="text-xl font-semibold">{domain.title}</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  {domain.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Recent Roles</h2>
          <div className="space-y-6">
            {timeline.map((entry) => (
              <div key={entry.role} className={cardClasses}>
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-slate-400">
                  <span className="inline-flex items-center gap-2 font-semibold text-brand-cyan">
                    <Calendar size={14} /> {entry.period}
                  </span>
                  <span>{entry.role}</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  {entry.bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 className="section-title">Learning Log</h2>
            <a
              href="https://dev.to/epritesh"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-cyan hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              All posts <ExternalLink size={16} />
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {learningLog.map((post) => (
              <a
                key={post.title}
                href={post.link}
                target="_blank"
                rel="noreferrer"
                className={classNames(cardClasses, 'hover:-translate-y-1')}
              >
                <div className="text-xs uppercase tracking-widest text-brand-cyan">{post.date}</div>
                <h3 className="text-lg font-semibold mt-3">{post.title}</h3>
                <span className="inline-flex items-center gap-2 text-sm text-brand-cyan mt-4">
                  Read <ExternalLink size={14} />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Credentials</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className={classNames('rounded-2xl border p-5 flex items-center gap-3', isDarkMode ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white')}
              >
                <div className="p-2 rounded-xl bg-brand-cyan/10 text-brand-cyan">
                  <Award size={20} />
                </div>
                <div>
                  <div className="font-semibold">{cert.title}</div>
                  <div className="text-xs text-slate-400">{cert.issuer} · {cert.year}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div
            className={classNames(
              'rounded-2xl border p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6',
              isDarkMode
                ? 'border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950'
                : 'border-slate-200 bg-gradient-to-r from-white via-white to-slate-100'
            )}
          >
            <div>
              <h2 className="text-2xl font-semibold">Let’s ship something together.</h2>
              <p className="mt-3 text-sm text-slate-400 max-w-xl">
                I love helping teams untangle complex UX flows, harden their build pipelines, and level up developer experience. If you have a challenge in that space, reach out.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-cyan text-slate-950 font-medium shadow"
                href="mailto:epritesh@gmail.com"
              >
                <Mail size={16} /> Email me
              </a>
              <a
                className={classNames('inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-medium transition', accentBorder)}
                href="https://www.linkedin.com/in/epritesh/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={16} /> Connect
              </a>
              <a
                className={classNames('inline-flex items-center gap-2 px-5 py-2.5 rounded-full border font-medium transition', accentBorder)}
                href="https://github.com/epritesh"
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="container mx-auto px-6 text-sm text-slate-500">
          Built with React, Vite, and TailwindCSS. Deployed on Vercel.
        </div>
      </footer>
    </div>
  )
}

export default App
