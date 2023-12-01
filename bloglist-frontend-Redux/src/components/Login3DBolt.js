import React, { useRef, Suspense, useEffect } from 'react'
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Loader from './3DLoader'

extend({ OrbitControls })

const World = () => {
  const boltRef = useRef()
  const gltf = useLoader(GLTFLoader, 'black_world_test.glb')
  /* useEffect(() => {
    if (boltRef.current) {
      boltRef.current.rotation.x = Math.PI / 2
    }
  }, [])*/

  useFrame(() => {
    if (boltRef.current) {
      // Rotate the bolt
      // boltRef.current.rotation.x += 0.002
      boltRef.current.rotation.y += 0.002
      // boltRef.current.rotation.z += 0.005
    }
  })

  return (
    /*<mesh ref={boltRef}>
       Create a custom bolt geometry 
      <torusGeometry args={[1, 0.4, 32, 32]} />
      <meshStandardMaterial color="yellow" />
    </mesh>*/
    <primitive object={gltf.scene} ref={boltRef} scale={2.5} />
  )
}

const Bolt = () => {
  const boltRef = useRef()
  const gltf = useLoader(GLTFLoader, 'ZAPP_FIRST.glb')
  useEffect(() => {
    if (boltRef.current) {
      // boltRef.current.rotation.z = Math.PI / 12
      //  boltRef.current.rotation.y = Math.PI / 6
      //boltRef.current.rotation.x = Math.PI / 9
      boltRef.current.rotation.x = Math.PI / 2
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
      scale={25}
      position={[0, 0, 5]}
    />
  )
}

const BoltScene = () => {
  return (
    <Canvas camera={{ position: [6, 6, 5] }} style={{ width: '500px' }}>
      <ambientLight intensity={7} />
      <spotLight intensity={10} />
      <pointLight position={[7, 7, 5]} />
      <Suspense fallback={<Loader />}>
        <World />
        <Bolt />
        <OrbitControls
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Suspense>
    </Canvas>
  )
}

export default BoltScene
