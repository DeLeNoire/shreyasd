import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer, ContactShadows, Html } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import InfineraId from './BandInfinera'
import { Band } from './Band'

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload('/shreyastest.glb')
useTexture.preload('/tag/mnnit.png')

function CanvasTextHUD({ title, subtitle }) {
  return (
    <Html
      center
      position={[0, 0, -20]}   
      transform
      zIndexRange={[0, -5]}  
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
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
          {title}
        </h1>

        <p style={{ fontSize: '1.1rem', opacity: 0.7 }}>
          {subtitle}
        </p>
      </div>
    </Html>
  )
}


export default function MnnitId() {
  return (
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

        {/* HUD text BELOW the model */}
        <CanvasTextHUD
          title="MNNIT Allahabad"
          subtitle="Bachelor of Technology • Information Technology"
        />
      </Canvas>
    </div>
  )
}
