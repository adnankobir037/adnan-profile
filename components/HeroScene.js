"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const FLOOR_COUNT = 7;
const FLOOR_HEIGHT = 0.48;

function ConstructionModel({ progress }) {
  const building = useRef();
  const crane = useRef();
  const floorRefs = useRef([]);
  const smoothProgress = useRef(0.18);
  const floorGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(2.15, FLOOR_HEIGHT, 1.65)),
    [],
  );
  const columnGeometry = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.045, FLOOR_HEIGHT, 0.045)),
    [],
  );
  const amberMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#fbbf24", transparent: true, opacity: 0.88 }),
    [],
  );
  const mutedMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#64748b", transparent: true, opacity: 0.5 }),
    [],
  );
  const craneMast = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.08, 0.75, 0.08)),
    [],
  );
  const craneArm = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(3.2, 0.055, 0.055)),
    [],
  );
  const craneCounterArm = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(1.05, 0.045, 0.045)),
    [],
  );
  const craneCable = useMemo(
    () => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.025, 0.72, 0.025)),
    [],
  );

  useFrame((state, delta) => {
    const target = Math.max(0.18, Math.min(1, 0.18 + progress * 0.82));
    smoothProgress.current = THREE.MathUtils.damp(
      smoothProgress.current,
      target,
      1.2,
      delta,
    );
    if (building.current) {
      building.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.12) * 0.09;
    }
    if (crane.current) {
      crane.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
    floorRefs.current.forEach((floor, index) => {
      if (!floor) return;
      const local = THREE.MathUtils.clamp(
        (smoothProgress.current * FLOOR_COUNT - index) * 1.6,
        0.04,
        1,
      );
      floor.scale.y = local;
      floor.position.y =
        index * FLOOR_HEIGHT - (1 - local) * FLOOR_HEIGHT * 0.5;
    });
  });

  return (
    <group ref={building} position={[0, -1.35, 0]}>
      <gridHelper
        args={[7, 14, "#64748b", "#334155"]}
        position={[0, -0.07, 0]}
      />
      <group>
        {Array.from({ length: FLOOR_COUNT }, (_, index) => (
          <group
            key={index}
            ref={(node) => {
              floorRefs.current[index] = node;
            }}
            position={[0, index * FLOOR_HEIGHT, 0]}
          >
            <lineSegments
              geometry={floorGeometry}
              material={index < 2 ? amberMaterial : mutedMaterial}
              position={[0, FLOOR_HEIGHT / 2, 0]}
            />
            {[-1, 1].flatMap((x) =>
              [-1, 1].map((z) => (
                <lineSegments
                  key={`${x}-${z}`}
                  geometry={columnGeometry}
                  material={amberMaterial}
                  position={[x * 1.05, FLOOR_HEIGHT / 2, z * 0.8]}
                />
              )),
            )}
          </group>
        ))}
      </group>
      <group ref={crane} position={[0.15, FLOOR_COUNT * FLOOR_HEIGHT + 0.1, 0]}>
        <lineSegments geometry={craneMast} material={amberMaterial} position={[0, 0.35, 0]} />
        <lineSegments geometry={craneArm} material={amberMaterial} position={[1.2, 0.72, 0]} />
        <lineSegments geometry={craneCounterArm} material={mutedMaterial} position={[-0.5, 0.72, 0]} />
        <lineSegments geometry={craneCable} material={mutedMaterial} position={[2.35, 0.34, 0]} />
      </group>
    </group>
  );
}

export default function HeroScene({ progress = 0 }) {
  return (
    <div className="h-[320px] w-full sm:h-[430px]">
      <Canvas
        camera={{ position: [5, 4, 7], fov: 34 }}
        dpr={typeof window !== "undefined" && window.innerWidth < 640 ? 1 : [1, 1.4]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <ambientLight intensity={0.9} />
        <ConstructionModel progress={progress} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.22}
          minPolarAngle={Math.PI / 3.6}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
