import dynamic from 'next/dynamic'
import { useState, useEffect, useRef, Suspense, lazy } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Gltf, CameraControls, Html, useProgress, useGLTF, CycleRaycast } from '@react-three/drei'
import Loader3D from '@/src/comp/three/Loader3D'

const Model = dynamic(
  () => import("@/src/comp/three/Model"),
  { suspense: true }
);

// import Model from '@/src/comp/three/Model'
// const Model = lazy(() => import('@/src/comp/three/Model'));

import styles from '@/styles/ModelDisplay.module.scss'

// const modelFile = '/models/UF.glTF'
// const modelFile = '/assets/models/toyota_4runner_mk4_stock.glb'
const modelFile = '/assets/models/UF.glTF'

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress()
  console.log('progress', progress);
  return <Html center>{loaded} / {progress} % loaded of {total}</Html>
}

function FPOBox(props: ThreeElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += delta))

  const debugClick = (evt:any) => {
    console.log('debugClick', evt)
  }
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={debugClick}
      // onClick={(event) => setActive(!active)}
      // onPointerOver={(event) => setHover(true)}
      // onPointerOut={(event) => setHover(false)}
      >
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

  const cameraProps = {
    far: 14000,
    fov: 75, 
    near: 0.1, 
    position: [0, 0, 5]
  }

  const debugClick = (hits:any, cycle: any) => {
    console.log('debugClick', objects)
    return null
  }

  return (
    <div className={styles.ModuleDisplayContainer}>ss
      <div className={styles.CanvasElement}>
        <Canvas camera={{ fov: 75, near: 0.1, far: 4000, position: [0, 0, 5] }}>
          <ambientLight intensity={0.2}/>
          <CameraControls />
  
          {/* <PerspectiveCamera makeDefault {...cameraProps} /> */}
          <pointLight position={[10, 10, 10]} />
          
          <Suspense fallback={<Loader />}>
            <Model src={modelFile} />
            {/* <Gltf src={modelFile} receiveShadow castShadow /> */}
            {/* <Thing /> */}
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
