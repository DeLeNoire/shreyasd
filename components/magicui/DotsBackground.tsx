import { useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'

export function DotsBackground() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useEffect(() => {
    if (!meshRef.current) return

    const vertexShader = `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;
      
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      
      void main() {
        vec2 uv = vUv;
        float scale = 50.0;
        vec2 gridUv = floor(uv * scale) / scale;
        
        // Dot rendering
        float dotSize = 0.05;
        vec2 distToDot = fract(uv * scale) - 0.5;
        float dist = length(distToDot);
        
        float opacity = smoothstep(dotSize + 0.01, dotSize - 0.01, dist);
        
        // Radial gradient fade from center
        vec2 centerDist = uv - 0.6;
        float radialFade = 1.0 - length(centerDist) * 1.2;
        radialFade = clamp(radialFade, 0.0, 1.0);
        
        opacity *= radialFade * 0.45;
        
        vec3 dotColor = vec3(0.90, 0.89, 0.87);
        gl_FragColor = vec4(dotColor, opacity);
      }
    `

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: true,
      depthWrite: false,
    })

    meshRef.current.material = material
  }, [])

  return (
    <mesh ref={meshRef} position={[0, 0, -20]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
    </mesh>
  )
}
