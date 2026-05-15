import Link from 'next/link'

const nav = [
  { label: 'About',    href: '/about'    },
  { label: 'Services', href: '/services' },
  { label: 'Academy',  href: '/academy'  },
  { label: 'Insights', href: '/insights' },
  { label: 'FAQ',      href: '/faq'      },
  { label: 'Contact',  href: '/contact'  },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-[var(--bg-soft)]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-[var(--cyan)] to-[var(--indigo)] flex items-center justify-center text-xs font-black text-[var(--bg)]">
                T
              </span>
              <span className="font-bold text-[15px] tracking-tight text-white">
                Tenda <span className="text-[var(--cyan)]">Analytics</span>
              </span>
            </Link>
            <p className="text-[13px] text-[var(--dim)] leading-relaxed">
              Operational intelligence for African businesses. From guesswork to clarity.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-16 gap-y-3">
            {nav.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[13px] text-[var(--mute)] hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div>
            <p className="text-[13px] font-bold text-white mb-3">Ready to start?</p>
            <a
              href="https://calendly.com/tendaafrika/30min"
              target="_blank"
              rel="noopener"
              className="px-5 py-2.5 rounded-full text-[13px] font-bold text-white bg-gradient-to-r from-[var(--cyan)] to-[var(--indigo)] hover:shadow-[0_0_20px_rgba(0,209,255,0.35)] transition-shadow"
            >
              Book a call
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-white/5">
          <p className="text-[12px] text-[var(--dim)]">
            © {new Date().getFullYear()} Tenda Analytics. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="text-[12px] text-[var(--dim)] hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms"   className="text-[12px] text-[var(--dim)] hover:text-white transition-colors">Terms</Link>
            <a
              href="https://www.linkedin.com/company/tenda-analytics"
              target="_blank"
              rel="noopener"
              className="text-[12px] text-[var(--dim)] hover:text-[var(--cyan)] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
