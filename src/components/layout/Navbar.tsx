'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const links = [
  { label: 'About',    href: '/about'    },
  { label: 'Services', href: '/services' },
  { label: 'Academy',  href: '/academy'  },
  { label: 'Insights', href: '/insights' },
  { label: 'FAQ',      href: '/faq'      },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(5,8,22,0.85)] backdrop-blur-xl border-b border-white/5 shadow-[0_1px_40px_rgba(0,0,0,0.6)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--cyan)] to-[var(--indigo)] flex items-center justify-center text-xs font-black text-[var(--bg)] group-hover:shadow-[0_0_16px_rgba(0,209,255,0.5)] transition-shadow duration-300">
              T
            </span>
            <span className="font-bold text-[15px] tracking-tight text-white">
              Tenda <span className="text-[var(--cyan)]">Analytics</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] font-medium text-[var(--mute)] hover:text-white transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--cyan)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="text-[13px] font-semibold text-[var(--mute)] hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/#book-call"
              className="px-4 py-2 text-[13px] font-bold rounded-full bg-gradient-to-r from-[var(--cyan)] to-[var(--indigo)] text-white hover:shadow-[0_0_24px_rgba(0,209,255,0.4)] transition-shadow duration-300"
            >
              Book a call
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            onClick={() => setOpen(v => !v)}
            aria-label="Menu"
          >
            <span className={`w-5 h-px bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[3px]' : ''}`} />
            <span className={`w-5 h-px bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-px bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[3px]' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[rgba(5,8,22,0.97)] backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-bold text-white hover:text-[var(--cyan)] transition-colors"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                href="/#book-call"
                onClick={() => setOpen(false)}
                className="mt-4 px-8 py-3 font-bold rounded-full bg-gradient-to-r from-[var(--cyan)] to-[var(--indigo)] text-white"
              >
                Book a call
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
