
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
    title: 'Dev Journal',
    description:
      'A markdown-powered notebook I built to log daily lessons, useful code snippets, and questions for mentors.',
    tags: ['React', 'Markdown', 'LocalStorage'],
    link: 'https://github.com/epritesh/dev-journal'
  },
  {
    title: 'Weather Dashboard',
    description:
      'Fetches live OpenWeather data, shows responsive cards, and helped me learn data fetching, loaders, and error states.',
    tags: ['Vite', 'TailwindCSS', 'REST APIs'],
    link: 'https://github.com/epritesh/weather-dashboard'
  },
  {
    title: 'Focus Timer',
    description:
      'A Pomodoro-style timer with session tracking. Great practice for React state, custom hooks, and accessibility basics.',
    tags: ['React', 'Hooks', 'Accessibility'],
    link: 'https://github.com/epritesh/focus-timer'
  }
]

const skillDomains = [
  {
    icon: Cpu,
    title: 'Frontend Foundations',
    items: ['Semantic HTML', 'Modern CSS', 'Responsive layouts', 'JavaScript fundamentals']
  },
  {
    icon: Cloud,
    title: 'React Basics',
    items: ['Hooks & state', 'Component composition', 'Client-side routing', 'Working with APIs']
  },
  {
    icon: Layers,
    title: 'Backend Curiosity',
    items: ['Node.js fundamentals', 'Express REST endpoints', 'Supabase & Firebase basics']
  },
  {
    icon: Rocket,
    title: 'Career Skills',
    items: ['Pair programming', 'Writing learning notes', 'Asking good questions', 'Planning learning goals']
  }
]

const timeline = [
  {
    period: '2024 — Present',
    role: 'Self-Taught Frontend Learner',
    bullets: [
      'Working through The Odin Project and Scrimba Frontend Developer Path.',
      'Building project-based learning goals and sharing write-ups on Dev.to.',
      'Taking part in community code reviews and Discord study sessions.'
    ]
  }
]

const learningLog = [
  {
    title: 'What I learned rebuilding my portfolio with Vite',
    date: 'Sep 2025',
    link: 'https://dev.to/epritesh/beginner-portfolio-lessons'
  },
  {
    title: 'React hooks finally make sense',
    date: 'Jul 2025',
    link: 'https://dev.to/epritesh/hooks-clicked'
  },
  {
    title: 'CSS layout tricks from 30 days of practice',
    date: 'May 2025',
    link: 'https://dev.to/epritesh/css-layout-tricks'
  }
]

const certifications = [
  {
    title: 'Scrimba Frontend Developer Career Path',
    issuer: 'Scrimba',
    year: 'In progress'
  },
  {
    title: 'The Odin Project - Foundations',
    issuer: 'The Odin Project',
    year: '2024'
  }
]

const highlightCards = [
  {
    title: '6 projects shipped',
    detail: 'Personal practice apps deployed to Vercel and iterated from feedback.'
  },
  {
    title: '120-day streak',
    detail: 'Committed code or notes every day to build consistency and muscle memory.'
  },
  {
    title: 'First OSS contribution',
    detail: 'Fixed a documentation typo and added examples to an open-source React component library.'
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
              <Code2 size={16} /> Pritesh · Junior Developer in Training
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold mt-3 max-w-xl leading-tight">
              Learning to build friendly, reliable web experiences one project at a time.
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-400">
              I am an aspiring frontend developer focused on React, modern CSS, and collaborative learning. I document what I learn, seek feedback often, and enjoy pairing with other beginners.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                className="px-5 py-2.5 rounded-full bg-brand-cyan text-slate-950 font-medium shadow hover:-translate-y-0.5 transition-transform"
                href="mailto:epritesh@gmail.com"
              >
                Say hello
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
              <div className="font-semibold text-sm text-brand-cyan">Goal</div>
              <div>Seeking mentorship, internships, or junior-friendly teams.</div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-6 py-16 space-y-20">
        <section>
          <h2 className="section-title">Learning Wins</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {highlightCards.map((card) => (
              <div key={card.title} className={classNames(cardClasses, 'shadow-sm')}>
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="mt-3 text-sm text-slate-400">{card.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Practice Projects</h2>
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
                  View code <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="section-title">Skills In Progress</h2>
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
          <h2 className="section-title">Current Journey</h2>
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
            <h2 className="section-title">Learning Notes</h2>
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
          <h2 className="section-title">Learning Milestones</h2>
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
              <h2 className="text-2xl font-semibold">Let’s learn and build together.</h2>
              <p className="mt-3 text-sm text-slate-400 max-w-xl">
                I am looking for mentorship, code reviews, and junior-friendly opportunities. If you have advice, project ideas, or need a motivated teammate, I would love to chat.
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
          Built while learning React, Vite, and TailwindCSS. Deployed on Vercel.
        </div>
      </footer>
    </div>
  )
}

export default App
