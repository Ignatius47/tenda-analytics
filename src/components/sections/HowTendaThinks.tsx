'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    n: '01',
    color: 'var(--cyan)',
    title: 'Connect your data',
    body: 'We connect your POS, ecommerce, booking and inventory tools into one source of truth — so you finally see what is really happening across your whole business.',
    icon: '🔌',
  },
  {
    n: '02',
    color: 'var(--indigo)',
    title: 'Agree the right KPIs',
    body: 'Together we pick the 3–5 numbers that actually drive your business — revenue, margin, stock health, customer growth — and build simple dashboards around them.',
    icon: '🎯',
  },
  {
    n: '03',
    color: 'var(--purple)',
    title: 'Analyse and act',
    body: 'We run weekly cadences on your data, surfacing the decisions that matter — what to reprice, who to re-engage, where the margin leak is — before you even ask.',
    icon: '🔍',
  },
  {
    n: '04',
    color: 'var(--emerald)',
    title: 'Execute and optimise',
    body: 'Recommendations turn into campaigns, pricing changes, and system improvements. We track every action so your numbers move in the right direction, every month.',
    icon: '⚡',
  },
]

export function HowTendaThinks() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad relative z-10">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,209,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            className="text-[11px] font-bold uppercase tracking-[3px] text-[var(--emerald)] mb-4"
          >
            How Tenda Thinks
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2rem,5vw,3.8rem)] font-black tracking-tight text-white mb-4"
          >
            Four steps to<br />
            <span className="gradient-text-emerald">operational clarity.</span>
          </motion.h2>
        </div>

        {/* Steps — alternating layout on desktop */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center gap-8 ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex-col`}
                >
                  {/* Content */}
                  <div className="flex-1 glass rounded-2xl p-7 group hover:-translate-y-1 transition-transform duration-300"
                    style={{ border: `1px solid ${step.color}20` }}>
                    <div
                      className="absolute top-0 left-10 right-10 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }}
                    />
                    <div className="flex items-start gap-4 mb-3">
                      <span className="text-2xl">{step.icon}</span>
                      <span className="font-black text-[13px] tracking-[1px]" style={{ color: step.color }}>
                        STEP {step.n}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-2 tracking-tight">{step.title}</h3>
                    <p className="text-[var(--mute)] text-[15px] leading-relaxed">{step.body}</p>
                  </div>

                  {/* Centre node */}
                  <div
                    className="hidden lg:flex w-10 h-10 rounded-full flex-shrink-0 items-center justify-center text-sm font-black"
                    style={{
                      background: `${step.color}20`,
                      border: `2px solid ${step.color}`,
                      boxShadow: `0 0 16px ${step.color}40`,
                      color: step.color,
                    }}
                  >
                    {i + 1}
                  </div>

                  {/* Empty flex-1 to keep symmetry */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
