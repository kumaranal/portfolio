import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A slowly rotating node network — a stand-in for the distributed systems
 * this site is about. Auto-rotates, drifts toward the pointer, and goes
 * fully static under prefers-reduced-motion.
 */

const PRIMARY_HSL: [number, number, number] = [195 / 360, 0.48, 0.46];
const ACCENT_HSL: [number, number, number] = [16 / 360, 0.55, 0.5];

function buildNodePositions(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere distribution — even spread, no clustering at poles.
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = ((1 + Math.sqrt(5)) * Math.PI) * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    positions[i * 3] = x * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = z * radius;
  }
  return positions;
}

function buildEdgePositions(nodePositions: Float32Array, nodeCount: number, edgeCount: number, maxDist: number) {
  const points: number[] = [];
  const get = (i: number) => new THREE.Vector3(
    nodePositions[i * 3],
    nodePositions[i * 3 + 1],
    nodePositions[i * 3 + 2],
  );
  let added = 0;
  let attempts = 0;
  while (added < edgeCount && attempts < edgeCount * 20) {
    attempts++;
    const a = Math.floor(Math.random() * nodeCount);
    const b = Math.floor(Math.random() * nodeCount);
    if (a === b) continue;
    const pa = get(a);
    const pb = get(b);
    if (pa.distanceTo(pb) > maxDist) continue;
    points.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
    added++;
  }
  return new Float32Array(points);
}

const NodeNetwork = ({ reducedMotion, dense }: { reducedMotion: boolean; dense: boolean }) => {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const nodeCount = dense ? 90 : 52;
  const radius = 2.15;

  const nodePositions = useMemo(() => buildNodePositions(nodeCount, radius), [nodeCount]);
  const edgePositions = useMemo(
    () => buildEdgePositions(nodePositions, nodeCount, dense ? 70 : 40, radius * 0.85),
    [nodePositions, nodeCount, dense],
  );

  const primaryColor = useMemo(() => new THREE.Color().setHSL(...PRIMARY_HSL), []);
  const accentColor = useMemo(() => new THREE.Color().setHSL(...ACCENT_HSL), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    if (reducedMotion) return;

    groupRef.current.rotation.y += delta * 0.075;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.22,
      0.04,
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -pointer.x * 0.12,
      0.04,
    );
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.05;
      innerRef.current.rotation.x += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.3, -0.4, 0]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edgePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={primaryColor} transparent opacity={0.28} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={primaryColor}
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>

      <group ref={innerRef}>
        <mesh>
          <icosahedronGeometry args={[1.15, 1]} />
          <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.22} />
        </mesh>
      </group>
    </group>
  );
};

const HeroScene = () => {
  const reducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const dense = useMemo(
    () => typeof window !== "undefined" && window.innerWidth >= 768,
    [],
  );

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.6]}
      frameloop={reducedMotion ? "demand" : "always"}
      camera={{ position: [0, 0, 5.4], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <NodeNetwork reducedMotion={reducedMotion} dense={dense} />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
