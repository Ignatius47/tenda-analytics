'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const testimonials = [
  {
    quote: 'Tenda transformed the way we use data. We went from gut-feel decisions to confident, insight-led strategies in under a month.',
    name:  'Sarah K.',
    role:  'Head of Growth, RetailCo',
    metric: '+40% revenue',
    color:  'var(--cyan)',
  },
  {
    quote: 'The BI dashboards they built have saved our team 15 hours a week. Enterprise-grade quality without the enterprise price tag.',
    name:  'James M.',
    role:  'CEO, FinServ Ltd',
    metric: '15 hrs/week saved',
    color:  'var(--indigo)',
  },
  {
    quote: 'Finally a partner who speaks both business and data fluently. Their advisory work directly contributed to our 40% revenue uplift.',
    name:  'Amara D.',
    role:  'CMO, E-Commerce Brand',
    metric: '+127% ROAS',
    color:  'var(--purple)',
  },
]

const stats = [
  { value: '500+', label: 'Operators served',    color: 'var(--cyan)'    },
  { value: '3×',   label: 'Faster decisions',    color: 'var(--indigo)'  },
  { value: '40%',  label: 'Avg revenue uplift',  color: 'var(--emerald)' },
  { value: '28',   label: 'Countries reached',   color: 'var(--purple)'  },
]

export function SocialProof() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad relative z-10 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 60% at 80% 50%, rgba(108,99,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Stats row */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-center glass rounded-2xl py-8 px-4"
              style={{ border: `1px solid ${s.color}15` }}
            >
              <div className="text-[2.5rem] font-black tracking-tight font-mono mb-1" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-[13px] text-[var(--dim)] font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-bold uppercase tracking-[3px] text-[var(--cyan)] mb-4"
          >
            Operator Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,5vw,3.8rem)] font-black tracking-tight text-white"
          >
            Businesses that chose<br />
            <span className="gradient-text-cyan">clarity over guesswork.</span>
          </motion.h2>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6 flex flex-col group hover:-translate-y-1 transition-transform duration-300"
              style={{ border: `1px solid ${t.color}18` }}
            >
              <div
                className="inline-block px-3 py-1 rounded-full text-[11px] font-black mb-4 self-start"
                style={{ background: `${t.color}15`, color: t.color }}
              >
                {t.metric}
              </div>
              <p className="text-[var(--mute)] text-[14px] leading-relaxed flex-1 mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{ background: `${t.color}20`, color: t.color }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">{t.name}</p>
                  <p className="text-[11px] text-[var(--dim)]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
