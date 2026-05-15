'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const panels = [
  {
    id: 'revenue',
    label: 'Revenue Intelligence',
    metric: 'KSh 4.2M',
    sub: '+23% vs last month',
    color: 'var(--cyan)',
    bars: [40, 55, 48, 70, 65, 82, 90, 78, 95],
    w: 'col-span-2',
  },
  {
    id: 'margin',
    label: 'Gross Margin',
    metric: '44.1%',
    sub: '↑ 3.2pts since onboarding',
    color: 'var(--emerald)',
    w: 'col-span-1',
  },
  {
    id: 'cohort',
    label: 'Customer Retention',
    metric: '68%',
    sub: '90-day repeat rate',
    color: 'var(--indigo)',
    w: 'col-span-1',
  },
  {
    id: 'stock',
    label: 'Inventory Health',
    metric: '94.8%',
    sub: '7 SKUs flagged for reorder',
    color: 'var(--purple)',
    bars: [70, 80, 92, 88, 95, 98, 95],
    w: 'col-span-2',
  },
]

function MiniBar({ h, color }: { h: number; color: string }) {
  return (
    <motion.div
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-3 rounded-sm origin-bottom flex-shrink-0"
      style={{ height: `${h * 0.8}px`, background: color, opacity: 0.7 }}
    />
  )
}

function Panel({ p, i }: { p: typeof panels[0]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`glass rounded-2xl p-6 relative overflow-hidden ${p.w}`}
      style={{ border: `1px solid ${p.color}20` }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />

      <p className="text-[11px] font-bold uppercase tracking-[2px] mb-2" style={{ color: p.color }}>{p.label}</p>
      <p className="text-[2.2rem] font-black tracking-tight text-white leading-none mb-1 font-mono">{p.metric}</p>
      <p className="text-[12px] text-[var(--dim)]">{p.sub}</p>

      {p.bars && (
        <div className="flex items-end gap-1 mt-4 h-20">
          {p.bars.map((h, j) => <MiniBar key={j} h={h} color={p.color} />)}
        </div>
      )}

      {/* Glow */}
      <div
        className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${p.color}15, transparent 70%)`, filter: 'blur(20px)' }}
      />
    </motion.div>
  )
}

export function IntelligenceWall() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="text-[11px] font-bold uppercase tracking-[3px] text-[var(--indigo)] mb-4"
          >
            Intelligence Wall
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,5vw,3.8rem)] font-black tracking-tight text-white mb-4"
          >
            Every number that matters,<br />
            <span className="gradient-text-cyan">alive and in one place.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[var(--mute)] max-w-xl mx-auto text-[clamp(0.95rem,1.4vw,1.1rem)]"
          >
            Tenda builds a live operating view of your business — from POS to ecommerce to inventory — so you always know what&apos;s happening right now.
          </motion.p>
        </div>

        {/* Dashboard panels grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {panels.map((p, i) => (
            <Panel key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
