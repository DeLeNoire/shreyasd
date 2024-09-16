import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import InfineraId from './BandInfinera'
import { Band } from './Band'

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload('/shreyastest.glb')
useTexture.preload('/tag/mnnit.png')

export default function MnnitId() {
  
  return (
   
    <Canvas camera={{ position: [0, 0, 13], fov: 25 }} >
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
    </Canvas>
     
  )
}

