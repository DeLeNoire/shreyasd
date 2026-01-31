
import { Canvas, extend} from "@react-three/fiber";
import {SpotLight, useGLTF,useTexture, ContactShadows} from "@react-three/drei";
import {Physics,} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { BallCollider, CuboidCollider, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload("/InfineraCard.glb");
useTexture.preload("/InfineraTag.png");

export default function InfineraId() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 13], fov: 25 }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
    >
      {/* subtle ambient for visibility */}
      <ambientLight intensity={0.45} />
      {/* warm key light */}
      <directionalLight color={0xfff1e0} position={[3, 5, 3]} intensity={7.8} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      {/* cool rim */}
      <directionalLight color={0x8fbfff} position={[9, 10, 35]} intensity={0.3} />
      <hemisphereLight skyColor={0xffffff} groundColor={0xddddff} intensity={0.08} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
      <ContactShadows position={[0, -3.2, 0]} opacity={0.35} scale={4} blur={2} far={4} />
    </Canvas>
  );
}



function Band({ maxSpeed = 50, minSpeed = 10 }) {
    const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef() // prettier-ignore
    const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
    const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }
    const { nodes, materials } = useGLTF('/InfineraIdCard.glb')
    const texture = useTexture('/InfineraTag.png')
    const { width, height } = useThree((state) => state.size)
    const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
    const [dragged, drag] = useState(false)
    const [hovered, hover] = useState(false)
  
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
    useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]) // prettier-ignore
  
    useEffect(() => {
      if (hovered) {
        document.body.style.cursor = dragged ? 'grabbing' : 'grab'
        return () => void (document.body.style.cursor = 'auto')
      }
    }, [hovered, dragged])
  
    useFrame((state, delta) => {
      if (dragged) {
        vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
        dir.copy(vec).sub(state.camera.position).normalize()
        vec.add(dir.multiplyScalar(state.camera.position.length()))
        ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
        card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
      }
      if (fixed.current) {
        // Fix most of the jitter when over pulling the card
        ;[j1, j2].forEach((ref) => {
          if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
          const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
          ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
        })
        // Calculate catmul curve
        curve.points[0].copy(j3.current.translation())
        curve.points[1].copy(j2.current.lerped)
        curve.points[2].copy(j1.current.lerped)
        curve.points[3].copy(fixed.current.translation())
        band.current.geometry.setPoints(curve.getPoints(32))
        // Tilt it back towards the screen
        ang.copy(card.current.angvel())
        rot.copy(card.current.rotation())
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
      }
    })
  
    curve.curveType = 'chordal'
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  
    return (
      <>
        <group position={[0, 4, 0]}>
          <RigidBody ref={fixed} {...segmentProps} type="fixed" />
          <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
            <CuboidCollider args={[0.8, 1.125, 0.01]} />
            <group
              scale={2.25}
              position={[0, -1.2, -0.05]}
              onPointerOver={() => hover(true)}
              onPointerOut={() => hover(false)}
              onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
              onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
              <mesh geometry={nodes.card.geometry} castShadow receiveShadow>
                <meshPhysicalMaterial map={materials.base.map} map-anisotropy={16} clearcoat={1} clearcoatRoughness={0.15} roughness={0.3} metalness={0.5} />
              </mesh>
              <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} castShadow receiveShadow />
              <mesh geometry={nodes.clamp.geometry} material={materials.metal} castShadow receiveShadow />
            </group>
          </RigidBody>
        </group>
        <mesh ref={band}>
          <meshLineGeometry />
          <meshLineMaterial color="white" depthTest={false} resolution={[width, height]} useMap map={texture} repeat={[-3, 1]} lineWidth={1} />
        </mesh>
      </>
    )
  }