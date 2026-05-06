import { useRef, useMemo, Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { TextureLoader, Mesh, AdditiveBlending, BackSide, Color } from 'three'

/* ──────────────────────────────────────────────
   Realistic 3D Earth with atmosphere glow,
   animated stat labels around the globe.
   Uses NASA Blue Marble texture for realism.
   ────────────────────────────────────────────── */

// Vertex shader for atmosphere glow
const atmosphereVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// Fragment shader for atmosphere glow
const atmosphereFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity * 0.8;
  }
`

function EarthSphere() {
  const meshRef = useRef<Mesh>(null!)
  const [textureLoaded, setTextureLoaded] = useState(false)

  // Use NASA's classic Blue Marble earth texture from Wikimedia (public domain)
  const earthTexture = useLoader(
    TextureLoader,
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/1280px-Blue_Marble_2002.png',
  )

  useEffect(() => {
    if (earthTexture) setTextureLoaded(true)
  }, [earthTexture])

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06
    }
  })

  return (
    <mesh ref={meshRef} rotation={[0.15, 0, 0.1]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshPhongMaterial
        map={earthTexture}
        specular={new Color('#222222')}
        shininess={25}
        transparent={!textureLoaded}
        opacity={textureLoaded ? 1 : 0.3}
      />
    </mesh>
  )
}

/* Fallback earth for when texture hasn't loaded yet */
function FallbackEarth() {
  const meshRef = useRef<Mesh>(null!)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.06
    }
  })

  return (
    <mesh ref={meshRef} rotation={[0.15, 0, 0.1]}>
      <sphereGeometry args={[2, 48, 48]} />
      <meshPhongMaterial
        color={new Color('#1a3a5c')}
        emissive={new Color('#0a1628')}
        specular={new Color('#222222')}
        shininess={15}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

function AtmosphereGlow() {
  return (
    <mesh scale={[1.15, 1.15, 1.15]}>
      <sphereGeometry args={[2, 64, 64]} />
      <shaderMaterial
        vertexShader={atmosphereVertexShader}
        fragmentShader={atmosphereFragmentShader}
        blending={AdditiveBlending}
        side={BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

/* Subtle inner atmosphere glow */
function InnerGlow() {
  return (
    <mesh scale={[1.02, 1.02, 1.02]}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial
        color={new Color('#4488cc')}
        transparent
        opacity={0.04}
        side={BackSide}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

/* Orbiting data point dots */
function OrbitingDots() {
  const groupRef = useRef<any>(null!)

  const dots = useMemo(() => {
    const positions: [number, number, number][] = []
    const seed = 42
    for (let i = 0; i < 14; i++) {
      // Deterministic "random" using sin-based hash
      const t = i * 7.31 + seed
      const phi = Math.acos(2 * (Math.sin(t) * 0.5 + 0.5) - 1)
      const theta = (Math.sin(t * 1.7) * 0.5 + 0.5) * Math.PI * 2
      const r = 2.06
      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ])
    }
    return positions
  }, [])

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.06
    }
  })

  return (
    <group ref={groupRef} rotation={[0.15, 0, 0.1]}>
      {dots.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial
            color={new Color(i % 3 === 0 ? '#a3e635' : i % 3 === 1 ? '#8b5cf6' : '#06b6d4')}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  )
}

/* Camera auto-positioning */
function CameraSetup() {
  const { camera } = useThree()
  useEffect(() => {
    camera.position.set(0, 0.3, 4.8)
    camera.lookAt(0, 0, 0)
  }, [camera])
  return null
}

function EarthScene() {
  return (
    <>
      <CameraSetup />
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-4, -1, -3]} intensity={0.35} color="#6699cc" />
      <pointLight position={[0, 0, 6]} intensity={0.3} color="#8b5cf6" />

      <Suspense fallback={<FallbackEarth />}>
        <EarthSphere />
      </Suspense>
      <AtmosphereGlow />
      <InnerGlow />
      <OrbitingDots />
    </>
  )
}

/* ── Stat label data for the floating overlays ── */
const FLOATING_STATS = [
  { value: '23 min', label: 'avg refocus time', pos: 'top-left' as const },
  { value: '40%', label: 'productivity lost daily', pos: 'top-right' as const },
  { value: '9.4', label: 'tools used daily', pos: 'bottom-left' as const },
  { value: '$10,400', label: 'lost per dev/year', pos: 'bottom-right' as const },
]

export default function Earth3D() {
  return (
    <div className="earth3d-container">
      <div className="earth3d-canvas-wrap">
        <Canvas
          camera={{ position: [0, 0.3, 4.8], fov: 45 }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0)
          }}
        >
          <EarthScene />
        </Canvas>
      </div>

      {/* Floating animated stat cards around the globe */}
      {FLOATING_STATS.map((stat) => (
        <div key={stat.pos} className={`earth3d-stat earth3d-stat-${stat.pos}`}>
          <span className="earth3d-stat-value">{stat.value}</span>
          <span className="earth3d-stat-label">{stat.label}</span>
        </div>
      ))}

      {/* Ambient glow behind the globe */}
      <div className="earth3d-glow" />
    </div>
  )
}
