'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function FinalCTA() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad relative z-10 overflow-hidden" id="book-call">
      {/* Glow blobs */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,209,255,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(155,92,255,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />

      <div ref={ref} className="max-w-4xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-[11px] font-bold uppercase tracking-[3px] text-[var(--emerald)] mb-5"
        >
          Ready to see clearly?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(2.4rem,6vw,5rem)] font-black tracking-[-0.04em] text-white leading-[1.0] mb-6"
        >
          Your business already has<br />
          <span className="gradient-text-cyan">the answers.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(1rem,1.8vw,1.2rem)] text-[var(--mute)] max-w-xl mx-auto mb-10"
        >
          Tenda reveals them. Book a free 30-minute strategy call and we&apos;ll show you exactly where your biggest opportunities are hiding.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="https://calendly.com/tendaafrika/30min"
            target="_blank"
            rel="noopener"
            className="group relative px-9 py-4 rounded-full font-black text-[16px] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--cyan) 0%, var(--indigo) 60%, var(--purple) 100%)',
              boxShadow: '0 8px 40px rgba(0,209,255,0.35), 0 2px 0 rgba(255,255,255,0.15) inset',
              color: '#fff',
            }}
          >
            Book a free strategy call
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: 'linear-gradient(135deg, var(--indigo) 0%, var(--purple) 100%)' }}
            />
          </a>

          <a
            href="/services"
            className="px-8 py-4 rounded-full font-bold text-[15px] text-white border border-white/10 hover:border-[rgba(0,209,255,0.35)] hover:bg-[rgba(0,209,255,0.05)] transition-all duration-300"
          >
            Explore services
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-6 text-[12px] text-[var(--dim)]"
        >
          No commitment. No jargon. Just clarity.
        </motion.p>
      </div>
    </section>
  )
}
