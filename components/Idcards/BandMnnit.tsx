import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer, ContactShadows } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import InfineraId from './BandInfinera'
import { Band } from './Band'

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload('/shreyastest.glb')
useTexture.preload('/tag/mnnit.png')

export default function MnnitId() {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ width: '100%', height: '100%' }}>
        <Canvas
          shadows
          camera={{ position: [0, 0, 13], fov: 25 }}
          dpr={[1, 2]}
          style={{ background: 'transparent' }}
          gl={{ alpha: true }}
        >
          {/* Lights */}
          <ambientLight intensity={0.55} />
          <directionalLight position={[-4, 6, 4]} intensity={0.9} />
          <directionalLight position={[5, 2, 6]} intensity={0.35} />
          <hemisphereLight intensity={0.12} />

          {/* 3D world */}
          <Physics interpolate gravity={[0, -40, 0]}>
            <Band />
          </Physics>

          <ContactShadows position={[0, -3.2, 0]} />
        </Canvas>
      </div>

      {/* Text below the canvas */}
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          marginTop: '1.5rem',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#b62222ff',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '0.4rem',
          }}
        >
          National Institute of Technology - Allahabad
        </h1>

        <p style={{ fontSize: '1.1rem', opacity: 0.7 }}>
          Bachelor of Technology • Information Technology
        </p>
      </div>
    </div>
  )
}
