import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  MeshDistortMaterial,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";
import { scrollSignal } from "../lib/scrollSignal";

/**
 * The 3D centerpiece. A faceted, distorting core wrapped in a slow wireframe shell,
 * floating in a field of sparks. Everything samples the render-free scrollSignal each
 * frame: pointer tilts the core, scroll velocity pumps the distortion + spin, and
 * scroll progress slides the whole rig up and out as you leave the hero.
 */
function CoreRig() {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  // Smoothed velocity so distortion eases in/out instead of snapping.
  const vel = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    const { pointerX, pointerY, velocity, progress } = scrollSignal;
    vel.current += (Math.min(Math.abs(velocity), 40) / 40 - vel.current) * 0.08;

    // Pointer parallax tilt.
    group.current.rotation.y +=
      (pointerX * 0.5 - group.current.rotation.y) * 0.05;
    group.current.rotation.x +=
      (-pointerY * 0.35 - group.current.rotation.x) * 0.05;

    // Drift the rig upward + shrink as the hero scrolls away.
    group.current.position.y = progress * 4.5;
    const s = 1 - Math.min(progress, 0.6) * 0.5;
    group.current.scale.setScalar(s);

    // Continuous spin, accelerated by scroll velocity.
    const spin = delta * (0.15 + vel.current * 1.6);
    if (core.current) core.current.rotation.y += spin;
    if (shell.current) {
      shell.current.rotation.y -= spin * 0.6;
      shell.current.rotation.x += spin * 0.3;
    }

    // Pump the distortion material with velocity.
    const mat = core.current?.material as
      | (THREE.Material & { distort?: number })
      | undefined;
    if (mat && typeof mat.distort === "number") {
      mat.distort = 0.28 + vel.current * 0.5;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
        <Icosahedron ref={core} args={[1.25, 6]}>
          <MeshDistortMaterial
            color="#7c5cff"
            emissive="#2a1a6e"
            emissiveIntensity={0.5}
            roughness={0.18}
            metalness={0.85}
            distort={0.3}
            speed={2.2}
          />
        </Icosahedron>

        <Icosahedron ref={shell} args={[1.9, 1]}>
          <meshBasicMaterial color="#18c8ff" wireframe transparent opacity={0.16} />
        </Icosahedron>
      </Float>

      <Sparkles
        count={60}
        scale={7}
        size={2.5}
        speed={0.3}
        color="#9d8bff"
        opacity={0.7}
      />
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={60} color="#18c8ff" />
      <pointLight position={[-5, -3, 2]} intensity={45} color="#ff5cc8" />
      <pointLight position={[0, 3, -5]} intensity={30} color="#7c5cff" />
    </>
  );
}

export default function HeroCanvas() {
  // Cap DPR so high-density displays don't melt; the scene is purely decorative.
  const dpr = useMemo<[number, number]>(() => [1, 1.8], []);
  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6], fov: 42 }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <Lights />
        <CoreRig />
        <fog attach="fog" args={["#060509", 6, 14]} />
      </Suspense>
    </Canvas>
  );
}
