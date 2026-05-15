import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CustomCursor } from '@/components/ui/CustomCursor'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tenda Analytics — Retail Intelligence for African Businesses',
  description:
    'Tenda Analytics helps African retail and service brands turn messy data into daily decisions that grow revenue, protect margin, and win loyal customers.',
  keywords: ['analytics', 'Africa', 'retail', 'BI', 'data', 'Nairobi', 'Kenya'],
  openGraph: {
    title: 'Tenda Analytics — Retail Intelligence for African Businesses',
    description:
      'From guesswork to clarity. Real-time business intelligence built for African operators.',
    url: 'https://tendaanalytics.com',
    siteName: 'Tenda Analytics',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tenda Analytics',
    description: 'Retail intelligence for African businesses.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
