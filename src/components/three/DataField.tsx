'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ── Particle mesh ────────────────────────────────────────────── */
function Particles({ count = 1800 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)
  const { mouse } = useThree()

  const [positions, colors] = useMemo(() => {
    const pos   = new Float32Array(count * 3)
    const col   = new Float32Array(count * 3)

    // Palette: cyan, indigo, purple, white
    const palette = [
      new THREE.Color('#00D1FF'),
      new THREE.Color('#6C63FF'),
      new THREE.Color('#9B5CFF'),
      new THREE.Color('#ffffff'),
    ]

    for (let i = 0; i < count; i++) {
      const r     = 8 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)

      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55
      pos[i * 3 + 2] = r * Math.cos(phi)

      const c = palette[Math.floor(Math.random() * palette.length)]
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.035 + mouse.x * 0.15
    meshRef.current.rotation.x = mouse.y * -0.08
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ── Flowing connection lines ────────────────────────────────── */
function DataLines() {
  const linesRef = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const geo   = new THREE.BufferGeometry()
    const verts = []
    const lineCount = 120

    for (let i = 0; i < lineCount; i++) {
      const x1 = (Math.random() - 0.5) * 20
      const y1 = (Math.random() - 0.5) * 10
      const z1 = (Math.random() - 0.5) * 20
      verts.push(x1, y1, z1)
      verts.push(x1 + (Math.random() - 0.5) * 4, y1 + (Math.random() - 0.5) * 2, z1 + (Math.random() - 0.5) * 4)
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    if (!linesRef.current) return
    linesRef.current.rotation.y = clock.getElapsedTime() * 0.02
  })

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial color="#6C63FF" transparent opacity={0.12} depthWrite={false} />
    </lineSegments>
  )
}

/* ── Canvas wrapper ──────────────────────────────────────────── */
export function DataField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 16], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      className="!absolute inset-0 z-0"
    >
      <Particles />
      <DataLines />
    </Canvas>
  )
}
