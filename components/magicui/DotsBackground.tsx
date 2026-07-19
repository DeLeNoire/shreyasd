import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMemo, useRef } from 'react'
 
type Props = {
  /** name of the 3D object to track in the scene */
  target?: string
  /** how far dots are pushed out of the circle (uv units) */
  strength?: number
  /** radius of the round influence (aspect-corrected uv units) */
  radius?: number
  /** theme for the dot field */
  theme?: 'dark' | 'light'
}

export function DotsBackground({ target = 'card', strength = 0.06, radius = 0.24, theme = 'dark' }: Props) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport, camera, scene, raycaster } = useThree()
 
  const cardRef = useRef<THREE.Object3D | null>(null)
  const impact = useRef(new THREE.Vector2(0.5, 0.62))   // eased card position (uv)
  const prev = useRef(new THREE.Vector2(0.5, 0.62))
  const vel = useRef(new THREE.Vector2())
  const tmp = useMemo(() => new THREE.Vector3(), [])
  const ndc = useMemo(() => new THREE.Vector2(), [])
 
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthTest: true,
      depthWrite: false,
      uniforms: {
        uImpact: { value: new THREE.Vector2(0.5, 0.62) },
        uVel: { value: new THREE.Vector2() },
        uSpeed: { value: 0 },
        uTime: { value: 0 },
        uActive: { value: 0 },
        uStrength: { value: strength },
        uRadius: { value: radius },
        uAspect: { value: 1 },
        uTheme: { value: theme === 'dark' ? 1 : 0 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec2  uImpact;
        uniform vec2  uVel;
        uniform float uSpeed;
        uniform float uTime;
        uniform float uActive;
        uniform float uStrength;
        uniform float uRadius;
        uniform float uAspect;
        uniform float uTheme;
        varying vec2  vUv;
 
        void main() {
          vec2 uv = vUv;
 
          // aspect-corrected space so the field stays perfectly round on screen
          vec2 auv = vec2(uv.x * uAspect, uv.y);
          vec2 ap  = vec2(uImpact.x * uAspect, uImpact.y);
 
          float rimGlow = 0.0;
 
          if (uActive > 0.5) {
            // radius gently breathes at rest, and swells while the card moves
            float r = uRadius * (1.0 + uSpeed * 0.9 + 0.05 * sin(uTime * 1.6));
 
            vec2  to  = auv - ap;
            float d   = length(to);
            vec2  dir = d > 1e-4 ? to / d : vec2(0.0);
            float infl = smoothstep(r, 0.0, d);              // round core push
 
            // outward ripple that only appears while the card is moving
            float ripple = sin(d * 42.0 - uTime * 7.0) * exp(-d * 9.0) * uSpeed;
 
            // trailing smear behind the direction of travel
            vec2  apT  = ap - uVel * vec2(uAspect, 1.0) * 26.0;
            float dT   = length(auv - apT);
            float inflT = smoothstep(r * 0.85, 0.0, dT) * uSpeed;
 
            float push = infl * uStrength
                       + ripple * uStrength * 0.6
                       + inflT * uStrength * 0.5;
 
            auv -= dir * push;
            uv   = vec2(auv.x / uAspect, auv.y);
 
            rimGlow = infl * 0.7 + max(ripple, 0.0) * 1.3 * uSpeed + inflT * 0.5;
          }
 
          // --- dot grid ------------------------------------------------
          float scale = 50.0;
          float dotSize = 0.06;
          vec2 distToDot = fract(uv * scale) - 0.5;
          float dist = length(distToDot);
          float opacity = smoothstep(dotSize + 0.01, dotSize - 0.01, dist);
          opacity *= 1.0 + rimGlow;
 
          // radial fade from upper-right, kept subtle
          vec2 centerDist = uv - 0.6;
          float radialFade = clamp(1.0 - length(centerDist) * 1.2, 0.0, 1.0);
          opacity *= radialFade * 0.3;

          vec3 dotColor = uTheme > 0.5
            ? vec3(0.86, 0.86, 0.88)
            : vec3(0.42, 0.20, 0.14);
          float opacityScale = uTheme > 0.5 ? 0.6 : 0.9;

          gl_FragColor = vec4(dotColor, opacity * opacityScale);
        }
      `,
    })
  }, [strength, radius, theme])
 
  useFrame((state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return
    const u = material.uniforms
 
    // (re)acquire the tracked object if needed
    if (!cardRef.current || !cardRef.current.parent) {
      cardRef.current = scene.getObjectByName(target) || null
    }
 
    if (cardRef.current) {
      // card world position -> screen (NDC) -> uv on this plane
      cardRef.current.getWorldPosition(tmp).project(camera)
      ndc.set(tmp.x, tmp.y)
      raycaster.setFromCamera(ndc, camera)
      const hit = raycaster.intersectObject(mesh, false)[0]
      if (hit && hit.uv) {
        prev.current.copy(impact.current)
        impact.current.lerp(hit.uv, 0.3)                 // smooth follow
        vel.current.subVectors(impact.current, prev.current)
      }
      u.uActive.value = 1
    } else {
      u.uActive.value = 0
    }
 
    const speed = Math.min(vel.current.length() * 34, 1)
    u.uSpeed.value += (speed - u.uSpeed.value) * 0.15     // eased speed
    ;(u.uImpact.value as THREE.Vector2).copy(impact.current)
    ;(u.uVel.value as THREE.Vector2).copy(vel.current)
    u.uTime.value += delta
    u.uAspect.value = viewport.width / viewport.height
    u.uTheme.value = theme === 'dark' ? 1 : 0
  })
 
  return (
    <mesh ref={meshRef} position={[0, 0, -20]} material={material}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
    </mesh>
  )
}