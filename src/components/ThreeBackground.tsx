"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Points } from "@react-three/drei";
import type { Mesh, Points as ThreePoints } from "three";

function FloatingSphere({ position, color, size }: {
  position: [number, number, number];
  color: string;
  size: number;
}) {
  const meshRef = useRef<Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <MeshDistortMaterial color={color} transparent opacity={0.15} wireframe distort={0.2} speed={2} />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, color, size }: {
  position: [number, number, number];
  color: string;
  size: number;
}) {
  const meshRef = useRef<Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.08;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, size * 0.4, 16, 32]} />
        <MeshDistortMaterial color={color} transparent opacity={0.12} wireframe distort={0.15} speed={1.5} />
      </mesh>
    </Float>
  );
}

function FloatingIcosahedron({ position, color, size }: {
  position: [number, number, number];
  color: string;
  size: number;
}) {
  const meshRef = useRef<Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <MeshDistortMaterial color={color} transparent opacity={0.1} wireframe distort={0.25} speed={2.5} />
      </mesh>
    </Float>
  );
}

function Particles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<ThreePoints>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 30; // eslint-disable-line react-hooks/purity
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <Points
      ref={pointsRef as any}
      limit={count}
      positions={positions}
      sizes={new Float32Array([0.03])}
      colors={new Float32Array([0.38, 0.65, 0.98])}
    >
      <pointsMaterial size={0.03} color="#60a5fa" transparent opacity={0.6} sizeAttenuation />
    </Points>
  );
}

function GridFloor() {
  return (
    <gridHelper
      args={[20, 40, "#1a1a3e", "#1a1a3e"]}
      position={[0, -5, 0]}
    />
  );
}

function CameraController() {
  useFrame((state, delta) => {
    const cam = state.camera;
    const p = state.pointer;
    const tx = p.x * 0.5;
    const ty = -p.y * 0.5;
    cam.position.x += (tx - cam.position.x) * Math.min(delta * 2, 0.1);
    cam.position.y += (ty - cam.position.y) * Math.min(delta * 2, 0.1);
    cam.lookAt(0, 0, 0);
  });

  return null;
}

function Scene() {
  return (
    <>
      <CameraController />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#60a5fa" />
      <pointLight position={[-10, -5, -10]} intensity={0.3} color="#a78bfa" />
      <directionalLight position={[0, 5, 5]} intensity={0.3} />

      <Particles count={300} />
      <GridFloor />

      <FloatingSphere position={[-4, 1, -2]} color="#60a5fa" size={0.8} />
      <FloatingTorus position={[3, -1, -3]} color="#a78bfa" size={0.6} />
      <FloatingIcosahedron position={[-2, -2, -4]} color="#f472b6" size={0.5} />
      <FloatingSphere position={[4, 2, -1]} color="#34d399" size={0.7} />
      <FloatingIcosahedron position={[0, 3, -5]} color="#fbbf24" size={0.4} />
      <FloatingTorus position={[-3, -3, -6]} color="#60a5fa" size={0.9} />
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
