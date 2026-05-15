'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const tick = () => {
      dot.style.transform  = `translate(${mx}px, ${my}px)`
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(tick)
    }

    const onEnter = () => {
      ring.classList.add('scale-150', 'opacity-30')
    }
    const onLeave = () => {
      ring.classList.remove('scale-150', 'opacity-30')
    }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    raf = requestAnimationFrame(tick)

    document.documentElement.classList.add('custom-cursor-active')

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.documentElement.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--cyan)]"
        style={{ willChange: 'transform' }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--cyan)] opacity-60 transition-[transform,opacity] duration-300"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
