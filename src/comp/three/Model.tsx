import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import { Gltf, CameraControls, Html, useProgress, useGLTF } from '@react-three/drei'

// import { Canvas, useFrame } from "react-three-fiber"
// import { Html, ContactShadows, Environment, useGLTF, OrbitControls, useProgress } from "@react-three/drei"


interface ModelProps {
  src?: string
}

export default function Model ({ src }: ModelProps) {
  const ref = useRef<any>(null)

  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { scene } = useGLTF(src ?? '')

  // Animate model
  useFrame((state) => {
    if (!ref.current) return

    const t = state.clock.getElapsedTime()
    ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  return (
    <primitive object={scene} ref={ref} />
  )
}