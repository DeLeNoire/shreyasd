import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer, ContactShadows } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { DotsBackground } from '../magicui/DotsBackground'
import InfineraId from './BandInfinera'
import { Band } from './Band'

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload('/shreyastest.glb')
useTexture.preload('/tag/mnnit.png')

export default function MnnitId({ onNext, onPrev, theme = 'dark' }: { onNext?: (() => void) | null; onPrev?: (() => void) | null; theme?: 'dark' | 'light' }) {
  // Cube component
  const Cube = ({ variant = 'default', label = '', className = '' }: any) => {
    const isDark = theme === 'dark'
    return (
      <div className={`relative ${isDark ? 'bg-[#111111] border-[#2a2a2a]' : 'bg-white border-[#e5e5e5]'} border rounded-lg overflow-hidden ${className}`}>
        {variant === 'grid-9' && (
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 p-1 gap-0.5">
            {[...Array(9)].map((_, i) => (
              <div key={i} className={`rounded-sm ${i === 7 ? 'bg-[#ff3b3b] animate-pulse' : 'bg-[#1f1f1f]'}`} />
            ))}
          </div>
        )}
        {variant === 'dots-17' && (
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 p-2 gap-1">
            {[...Array(17)].map((_, i) => (
              <div key={i} className={`rounded-full ${i === 8 ? 'bg-[#ff3b3b] animate-rotate' : 'bg-[#2a2a2a]'}`} style={{ width: '6px', height: '6px', margin: 'auto' }} />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Main content area with left cube, canvas, right cube */}
      <div style={{ width: '100%', height: 'calc(100% - 140px)', display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'stretch' }}>
        
        {/* Canvas in center */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', minWidth: 0, maxWidth: '100%' }}>
          <div style={{ width: '100%', maxWidth: '100%', height: '100%', minWidth: 0, background: theme === 'dark' ? '#111111' : 'linear-gradient(180deg, #f6f6f6 0%, #ffffff 100%)', borderRadius: '16px', overflow: 'hidden' }}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 13], fov: 25 }}
          dpr={[1, 2]}
          style={{ background: theme === 'dark' ? '#111111' : 'transparent', width: '100%', height: '100%' }}
          gl={{ alpha: true }}
        >
          {/* Lights */}
          <ambientLight intensity={0.55} />
          <directionalLight position={[-4, 6, 4]} intensity={0.9} />
          <directionalLight position={[5, 2, 6]} intensity={0.35} />
          <hemisphereLight intensity={0.12} />

          {/* Dots Background */}
          <DotsBackground theme={theme} />

          {/* 3D world */}
          <Physics interpolate gravity={[0, -40, 0]}>
            <Band />
          </Physics>

          <ContactShadows position={[0, -3.2, 0]} />
        </Canvas>
        </div>
        </div>
        
      </div>


      {/* Navigation + Text below the canvas */}
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          // marginTop: '1.5rem',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        {/* Text */}
        <div>
          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#4c0013',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '0.4rem',
            }}
          >
            National Institute of Technology - Allahabad
          </h1>

          <p style={{ fontSize: '1.1rem', opacity: 0.7, margin: 0, marginBottom: '0.5rem' }}>
            Bachelor of Technology • Information Technology
          </p>
          <em style={{ fontSize: '0.9rem', display: 'block', marginTop: '0.5rem', lineHeight: '1.5' }}>
            Powered by poor sleep • curiosity • and caffeine in my veins
          </em>
        </div>
      </div>
    </div>
  )
}
