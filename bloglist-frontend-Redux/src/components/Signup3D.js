import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas, extend, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Environment } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Loader from './3DLoader'

extend({ OrbitControls })

const WorldMap = () => {
  const boltRef = useRef()
  const gltf = useLoader(GLTFLoader, 'old_world_map.glb')
  useEffect(() => {
    if (boltRef.current) {
      // boltRef.current.rotation.z = Math.PI / 12
      //  boltRef.current.rotation.y = Math.PI / 6
      //boltRef.current.rotation.x = Math.PI / 9
      boltRef.current.rotation.x = Math.PI / 6
    }
  }, [])
  /*
   useFrame(() => {
    if (boltRef.current) {
      // Rotate the bolt
        // boltRef.current.rotation.x += 0.002
        boltRef.current.position.y += 0.002
    //  boltRef.current.rotation.z += 0.005
    }
  })
*/
  return (
    /*<mesh ref={boltRef}>
       Create a custom bolt geometry 
      <torusGeometry args={[1, 0.4, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>*/
    <primitive
      object={gltf.scene}
      ref={boltRef}
      scale={0.8}
      position={[0, 0, 0]}
    />
  )
}

const Bolt = () => {
  const boltRef = useRef()
  const gltf = useLoader(GLTFLoader, 'lightning_bolt.glb')
  /*useEffect(() => {
    if (boltRef.current) {
      // boltRef.current.rotation.z = Math.PI / 12
      //  boltRef.current.rotation.y = Math.PI / 6
      //boltRef.current.rotation.x = Math.PI / 9
     // boltRef.current.rotation.x = Math.PI / 2
    }
  }, [])*/
  /*
   useFrame(() => {
    if (boltRef.current) {
      // Rotate the bolt
        // boltRef.current.rotation.x += 0.002
        boltRef.current.position.y += 0.002
    //  boltRef.current.rotation.z += 0.005
    }
  })
*/
  return (
    /*<mesh ref={boltRef}>
       Create a custom bolt geometry 
      <torusGeometry args={[1, 0.4, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>*/
    <primitive
      object={gltf.scene}
      ref={boltRef}
      scale={15}
      position={[0, 60, 25]}
    />
  )
}

const WorldScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 25, 250] }}
      style={{ width: '100%', height: '300px' }}
    >
      <ambientLight intensity={2} />
      <spotLight intensity={10} position={[0, 60, 25]} />
      {/*<pointLight position={[0, 60, 25]} /> */}
      <Suspense fallback={<Loader />}>
        <WorldMap />
        <Bolt />

        <OrbitControls
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        <Environment preset="sunset" background />
      </Suspense>
    </Canvas>
  )
}

export default WorldScene
