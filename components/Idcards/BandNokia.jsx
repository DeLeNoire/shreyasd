import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
import { useGLTF, useTexture, ContactShadows } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { Environment } from '@react-three/drei'

extend({ MeshLineGeometry, MeshLineMaterial })
useGLTF.preload('/Nokia/NokiaId.glb')

// Placeholder tag texture; you can replace with the Nokia tag when available
useTexture.preload('/NokiaTag.png')

export default function NokiaId() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 13], fov: 25 }}
      dpr={[1, 2]}
      style={{ background: 'transparent' }}
      gl={{
        alpha: true,
        toneMapping: THREE.NoToneMapping,
        outputEncoding: THREE.sRGBEncoding,
      }}
      onCreated={(state) => {
        state.gl.toneMappingExposure = 1
      }}
    >
      {/* Ambient base */}
 <ambientLight intensity={0.045} />

{/* Key light */}
<directionalLight
  castShadow
  position={[4, 6, 6]}
  intensity={0.1}
  color={0xffffff}
/>

{/* Soft fill */}
<directionalLight
  position={[4, 3, 3]}
  intensity={0.35}
  color={0xffffff}
/>

{/* Rim light (subtle!) */}
<directionalLight
  position={[0, 4, -8]}
  intensity={1.4}
  color={0xbfd9ff}
/>

<hemisphereLight
  skyColor={0xffffff}
  groundColor={0xf0f0ff}
  intensity={0.15}
/>

      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <BandNokia />
      </Physics>

      <Environment preset="studio" />
    </Canvas>
  )
}



function BandNokia({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef()
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3()
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 }
  const gltf = useGLTF('/Nokia/NokiaId.glb')
  useEffect(() => {
  gltf.scene.traverse((obj) => {
    if (obj.isMesh && obj.material) {
      obj.material = obj.material.clone()

      // Satin / anodized finish
      obj.material.roughness = 1.5
      obj.material.metalness = 2.45

      // Reflection strength
      obj.material.envMapIntensity = 0.08

      obj.material.needsUpdate = true
    }
  })
}, [gltf])

  const texture = useTexture('/NokiaTag.png')
  const { width, height } = useThree((state) => state.size)
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]))
  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  // Attach the card above the band but oriented horizontally: use Z as the up-anchor
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 0, 1.45]])

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
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })
      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      band.current.geometry.setPoints(curve.getPoints(32))
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
          {/* collider swapped so card is wider than tall (horizontal) */}
          <CuboidCollider args={[1.125, 0.8, 0.01]} />
          <group
            scale={2.25}
            rotation={[Math.PI / 2, 0, 0]}
            position={[0, 0, -0.65]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}
          >
            {/* Render the Nokia model as the card. scene primitive preserves the model hierarchy and materials. */}
            <primitive object={gltf.scene} castShadow receiveShadow />
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
