'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const leaks = [
  { icon: '📦', label: 'Dead stock',        value: '-14%',  color: 'var(--purple)', desc: 'Tied up in slow-moving SKUs' },
  { icon: '📉', label: 'Margin erosion',    value: '-8%',   color: 'var(--cyan)',   desc: 'Hidden delivery & ops costs' },
  { icon: '👻', label: 'Ghost customers',   value: '2,100', color: 'var(--indigo)', desc: 'Lapsed buyers never re-engaged' },
  { icon: '🎯', label: 'Wasted campaigns',  value: '37%',   color: 'var(--purple)', desc: 'Budget with zero attribution' },
  { icon: '⚡', label: 'Pricing gaps',      value: '-11%',  color: 'var(--emerald)',desc: 'Underpriced high-demand SKUs' },
  { icon: '🔄', label: 'Reorder failures',  value: '58',    color: 'var(--cyan)',   desc: 'Stockouts per month avg' },
]

function LeakCard({ item, i }: { item: typeof leaks[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-2xl p-5 group hover:-translate-y-1 transition-transform duration-300"
      style={{ border: `1px solid ${item.color}22` }}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-2xl">{item.icon}</span>
        <span
          className="font-black text-xl tracking-tight font-mono"
          style={{ color: item.color }}
        >
          {item.value}
        </span>
      </div>
      <p className="font-bold text-white text-[14px] mb-1">{item.label}</p>
      <p className="text-[12px] text-[var(--dim)]">{item.desc}</p>
      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
      />
    </motion.div>
  )
}

export function VisibilityProblem() {
  const titleRef = useRef<HTMLDivElement>(null)
  const inView   = useInView(titleRef, { once: true, margin: '-80px' })

  return (
    <section className="section-pad relative z-10 overflow-hidden">
      {/* Background orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(155,92,255,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold uppercase tracking-[3px] text-[var(--purple)] mb-4"
          >
            The Visibility Problem
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.2rem,5vw,4rem)] font-black tracking-tight text-white mb-5"
          >
            Your business is leaking money<br />
            <span className="gradient-text-cyan">in places you can't see.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[var(--mute)] text-[clamp(0.95rem,1.4vw,1.1rem)] max-w-xl mx-auto"
          >
            Every African operator we've worked with had the same problem — their data was scattered, invisible, or overwhelming. By the time they could act, the damage was done.
          </motion.p>
        </div>

        {/* Leak grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {leaks.map((item, i) => (
            <LeakCard key={item.label} item={item} i={i} />
          ))}
        </div>

        {/* CTA bridge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-[var(--mute)] text-[15px] mb-5">
            Tenda maps every leak, in real time, across every channel.
          </p>
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-[var(--cyan)] font-bold text-[14px] hover:gap-3 transition-all duration-300"
          >
            See how we fix it
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
