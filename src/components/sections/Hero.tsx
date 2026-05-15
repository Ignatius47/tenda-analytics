'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const DataField = dynamic(
  () => import('@/components/three/DataField').then(m => m.DataField),
  { ssr: false }
)

/* ── Floating metric card ─────────────────────────────────────── */
interface CardProps {
  label: string
  value: string
  meta: string
  trend?: string
  delay?: number
  className?: string
}

function FloatCard({ label, value, meta, trend, delay = 0, className = '' }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute hidden lg:block glass rounded-2xl px-4 py-3 pointer-events-none z-10 ${className}`}
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        animation: `float-card ${6 + delay}s ease-in-out ${delay}s infinite`,
      }}
    >
      <style jsx>{`
        @keyframes float-card {
          0%,100% { transform: translateY(0) }
          50%      { transform: translateY(-10px) }
        }
      `}</style>
      <p className="text-[10px] font-bold uppercase tracking-[2px] text-[var(--cyan)] mb-0.5">{label}</p>
      <p className="text-lg font-black text-white tracking-tight leading-none">{value}</p>
      <p className="text-[11px] text-[var(--dim)] mt-0.5">{meta}</p>
      {trend && (
        <span className="inline-block mt-1 text-[10px] font-bold text-[var(--emerald)]">{trend}</span>
      )}
    </motion.div>
  )
}

/* ── Scroll indicator ─────────────────────────────────────────── */
function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.6 }}
      transition={{ delay: 2 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-[10px] font-bold uppercase tracking-[3px] text-[var(--dim)]">Scroll</span>
      <div className="w-px h-10 bg-gradient-to-b from-[var(--cyan)] to-transparent animate-pulse" />
    </motion.div>
  )
}

/* ── Main hero ────────────────────────────────────────────────── */
const words = ['See', 'what', 'your', 'business', "can’t", 'see', 'yet.']

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '5rem' }}
    >
      {/* 3D particle background */}
      <Suspense fallback={null}>
        <DataField />
      </Suspense>

      {/* Radial gradient overlays for depth */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(108,99,255,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
      />

      {/* Floating metric cards */}
      <FloatCard label="Revenue"  value="KSh 2.4M"  meta="+18% this month" trend="↑ Growing" delay={0.8}  className="top-[22%] left-[6%]" />
      <FloatCard label="Margin"   value="42.8%"      meta="Target: 40%"                         delay={1.2}  className="top-[18%] right-[7%]" />
      <FloatCard label="Customers" value="3,847"     meta="↑ 7% week-on-week"                   delay={1.6}  className="bottom-[24%] left-[8%]" />
      <FloatCard label="Stock"    value="94%"         meta="12 SKUs need reorder"                delay={2.0}  className="bottom-[22%] right-[6%]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full border border-[rgba(0,209,255,0.2)] bg-[rgba(0,209,255,0.05)]"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)] animate-pulse"
            style={{ boxShadow: '0 0 8px var(--cyan)' }}
          />
          <span className="text-[11px] font-bold uppercase tracking-[2.5px] text-[var(--cyan)]">
            Retail Intelligence · Built for Africa
          </span>
        </motion.div>

        {/* Headline — word-by-word stagger */}
        <h1 className="text-[clamp(2.8rem,8vw,7rem)] font-black leading-[1.0] tracking-[-0.04em] mb-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.3 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`inline-block mr-[0.22em] ${
                (i === 0 || i === 6)
                  ? 'gradient-text-cyan'
                  : 'text-white'
              }`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(1rem,1.8vw,1.25rem)] text-[var(--mute)] max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Tenda Analytics gives African retail and service businesses a live view of what&apos;s really happening — stock, margin, customers, campaigns — so every decision is made on data, not instinct.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#book-call"
            className="group relative px-7 py-3.5 rounded-full font-bold text-[15px] text-[var(--bg)] overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, var(--cyan) 0%, var(--indigo) 100%)',
              boxShadow: '0 4px 24px rgba(0,209,255,0.3)',
            }}
          >
            <span className="relative z-10">Book a strategy call</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, var(--indigo) 0%, var(--purple) 100%)' }}
            />
          </a>
          <a
            href="/services"
            className="px-7 py-3.5 rounded-full font-bold text-[15px] text-white border border-white/10 hover:border-[rgba(0,209,255,0.35)] hover:bg-[rgba(0,209,255,0.05)] transition-all duration-300"
          >
            See how it works
          </a>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12 text-[12px] text-[var(--dim)] font-medium"
        >
          {['500+ operators served', 'Free consultation', 'Results in 30 days'].map(t => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-[var(--emerald)]" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      <ScrollCue />
    </section>
  )
}
