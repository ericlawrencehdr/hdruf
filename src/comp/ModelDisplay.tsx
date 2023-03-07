import { useState, useEffect, useRef, Suspense } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Gltf, CameraControls, Html, useProgress, useGLTF } from '@react-three/drei'
import Loader3D from '@/src/comp/three/Loader3D'

import styles from '@/styles/ModelDisplay.module.scss'

// const modelFile = '/models/UF.glTF'
const modelFile = '/models/toyota_4runner_mk4_stock.glb'

function Loader(a, b, c) {
  const { active, progress, errors, item, loaded, total } = useProgress()
  console.log('progress', progress);
  useEffect(() => {
    console.log('a', typeof a)
    console.log('b', typeof b)
    console.log('c', typeof c)
  }, [a, b, c])
  return <Html center>{loaded} / {progress} % loaded of {total}</Html>
}

function Thing () {
  const { nodes } = useGLTF(
    // 'https://threejs.org/examples/models/gltf/MaterialsVariantsShoe/glTF/MaterialsVariantsShoe.gltf'
    modelFile
  )

  useEffect(() => {
    console.log('nodes', nodes)
  }, [nodes])
  
  return <primitive object={nodes['root']} />
  return <Html>loaded</Html>
}

function FPOBox(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

interface ModelDisplayProps {
  title?: string
  children?: any
  modelURL?: string
  disablePadding?: boolean
}

export default function ModelDisplay ({
  children,
  title,
  disablePadding
}: ModelDisplayProps): JSX.Element {
  return (
    <div className={styles.ModuleDisplayContainer}>ss
      <div className={styles.CanvasElement}>
        <Canvas>
          <ambientLight />
          <CameraControls />
          <pointLight position={[10, 10, 10]} />
          
          <Suspense fallback={<Loader />}>
            {/* <Gltf src={modelFile} receiveShadow castShadow /> */}
            <Thing />
          </Suspense>
          {/* <FPOBox position={[1.2, 0, 0]} /> */}
        </Canvas>
      </div>
      <div className={styles.UIElement}>
        {modelFile}
        {children}
      </div>
    </div>
  )
}
