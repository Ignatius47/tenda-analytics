'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const articles = [
  {
    cat:   'Data Privacy',
    date:  'March 2026',
    title: 'Outsmarting the M-Pesa Privacy Curve: The Tenda POV',
    body:  'Safaricom is rolling out data-minimization features that mask phone numbers on M-Pesa transactions. Retailers must move to permission-based systems now.',
    href:  'https://www.linkedin.com/pulse/outsmarting-mpesa-privacy-curve-tenda-pov-tenda-analytics-16aff/?published=t',
    color: 'var(--cyan)',
    tag:   'Critical Read',
  },
  {
    cat:   'Marketing AI',
    date:  'April 2026',
    title: 'How AI Assistants Are Quietly Rewriting the Marketing Funnel',
    body:  "AI is changing how people search, compare, and choose products. Your brand needs to be in the model's answer, not just in the search results.",
    href:  'https://www.linkedin.com/pulse/how-ai-assistants-quietly-rewriting-marketing-funnel-jocelyn-muoki-6j2wf/',
    color: 'var(--indigo)',
    tag:   'Deep Dive',
  },
  {
    cat:   'Retail Numbers',
    date:  'March 2026',
    title: 'Busy but Underpriced: The Quiet Margin Killers',
    body:  'Small costs like Glovo bags and delivery commissions are invisible leaks. Here is how to spot where your hard work is losing its value.',
    href:  'https://www.linkedin.com/pulse/busy-underpriced-how-small-costs-like-glovos-bag-quietly-hjtuf/',
    color: 'var(--purple)',
    tag:   'Case Study',
  },
  {
    cat:   'Retail Ops',
    date:  'May 2025',
    title: 'How Denri Africa is Disrupting Fashion Retail',
    body:  'Modern African branding is not just about the logo — it is about the data behind the supply chain and customer experience.',
    href:  'https://www.linkedin.com/pulse/how-denri-africa-disrupting-fashion-retail-modern-african-muoki-3nxbf/',
    color: 'var(--emerald)',
    tag:   'Featured',
  },
]

export function InsightsJournal() {
  return (
    <section className="section-pad relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[11px] font-bold uppercase tracking-[3px] text-[var(--indigo)] mb-3"
            >
              Tenda Insights
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2rem,4vw,3.5rem)] font-black tracking-tight text-white"
            >
              The Journal:<br />
              <span className="gradient-text-cyan">Operational Intelligence.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-[var(--cyan)] font-bold text-[14px] hover:gap-3 transition-all duration-300"
            >
              View all insights
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Articles grid — featured + 3 smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured (first article — spans 2 cols) */}
          <motion.a
            href={articles[0].href}
            target="_blank"
            rel="noopener"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 glass rounded-2xl p-7 flex flex-col group hover:-translate-y-1 transition-transform duration-300"
            style={{ border: `1px solid ${articles[0].color}20` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                style={{ background: `${articles[0].color}15`, color: articles[0].color }}
              >
                {articles[0].tag}
              </span>
              <span className="text-[11px] text-[var(--dim)]">{articles[0].cat} · {articles[0].date}</span>
            </div>
            <h3 className="text-xl font-black text-white tracking-tight mb-3 group-hover:text-[var(--cyan)] transition-colors">
              {articles[0].title}
            </h3>
            <p className="text-[var(--mute)] text-[14px] leading-relaxed flex-1 mb-4">{articles[0].body}</p>
            <span className="text-[var(--cyan)] text-[13px] font-bold flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
              Read full insight →
            </span>
          </motion.a>

          {/* Smaller articles stack */}
          <div className="flex flex-col gap-5">
            {articles.slice(1, 3).map((a, i) => (
              <motion.a
                key={a.title}
                href={a.href}
                target="_blank"
                rel="noopener"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: (i + 1) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 glass rounded-2xl p-5 group hover:-translate-y-1 transition-transform duration-300"
                style={{ border: `1px solid ${a.color}18` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider"
                    style={{ background: `${a.color}15`, color: a.color }}
                  >
                    {a.tag}
                  </span>
                  <span className="text-[10px] text-[var(--dim)]">{a.cat}</span>
                </div>
                <h3 className="text-[15px] font-bold text-white tracking-tight mb-2 group-hover:text-[var(--cyan)] transition-colors line-clamp-2">
                  {a.title}
                </h3>
                <p className="text-[var(--dim)] text-[12px] leading-relaxed line-clamp-2">{a.body}</p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <motion.a
          href={articles[3].href}
          target="_blank"
          rel="noopener"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-6 glass rounded-2xl p-5 mt-5 group hover:-translate-y-0.5 transition-transform duration-300"
          style={{ border: `1px solid ${articles[3].color}18` }}
        >
          <div>
            <p className="text-[10px] text-[var(--dim)] mb-1">{articles[3].cat} · {articles[3].date}</p>
            <h3 className="text-[15px] font-bold text-white group-hover:text-[var(--emerald)] transition-colors">{articles[3].title}</h3>
          </div>
          <span
            className="px-3 py-1.5 rounded-full text-[11px] font-black flex-shrink-0"
            style={{ background: `${articles[3].color}15`, color: articles[3].color }}
          >
            {articles[3].tag}
          </span>
        </motion.a>
      </div>
    </section>
  )
}
