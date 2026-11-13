
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

function Shelf({ x, z, rotation = 0 }) {
  const books = Array.from({ length: 13 }, (_, i) => i);

  return (
    <group position={[x, 0, z]} rotation={[0, rotation, 0]}>
      {/* بالای قفسه */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[5.8, 0.16, 0.65]} />
        <meshStandardMaterial color="#4b1a2b" roughness={0.35} />
      </mesh>

      {/* پایین قفسه */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[5.8, 0.2, 0.7]} />
        <meshStandardMaterial color="#4b1a2b" roughness={0.35} />
      </mesh>

      {/* ستون‌های کناری */}
      {[-2.8, 2.8].map((v) => (
        <mesh key={v} position={[v, 1.15, 0]}>
          <boxGeometry args={[0.16, 2.2, 0.7]} />
          <meshStandardMaterial color="#6e3440" roughness={0.3} />
        </mesh>
      ))}

      {/* طبقه‌های قفسه */}
      {[0.8, 1.5].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <boxGeometry args={[5.65, 0.1, 0.65]} />
          <meshStandardMaterial
            color="#8c5b3d"
            metalness={0.12}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* ردیف اول کتاب‌ها */}
      {books.map((i) => (
        <mesh
          key={i}
          position={[-2.48 + i * 0.39, 0.53 + (i % 3) * 0.015, 0.03]}
          rotation={[0, 0, i % 2 ? 0.035 : -0.035]}
        >
          <boxGeometry args={[0.31, 0.95 + (i % 4) * 0.08, 0.43]} />
          <meshStandardMaterial
            color={["#641d31", "#9a6a36", "#2f3b35", "#7a3440", "#c0a06a"][i % 5]}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* ردیف دوم کتاب‌ها */}
      {books.map((i) => (
        <mesh
          key={`b${i}`}
          position={[-2.48 + i * 0.39, 1.18, 0.03]}
        >
          <boxGeometry args={[0.31, 0.8 + (i % 4) * 0.07, 0.43]} />
          <meshStandardMaterial
            color={["#7c3441", "#bd965a", "#3c4940", "#5c182c"][i % 4]}
            roughness={0.45}
          />
        </mesh>
      ))}
    </group>
  );
}

function Room({ progress }) {
  const rig = useRef();

  useFrame((state, delta) => {
    if (!rig.current) return;

    const p = progress.current;
    const targetZ = 7.5 - p * 12.5;

    rig.current.position.z = THREE.MathUtils.damp(
      rig.current.position.z,
      targetZ,
      2.2,
      delta
    );

    rig.current.position.y = THREE.MathUtils.damp(
      rig.current.position.y,
      2.2 + Math.sin(p * Math.PI) * 0.3,
      2,
      delta
    );

    rig.current.rotation.y = THREE.MathUtils.damp(
      rig.current.rotation.y,
      Math.sin(p * Math.PI * 1.4) * 0.11,
      2,
      delta
    );
  });

  return (
    <group ref={rig} position={[0, 2.2, 7.5]}>
      {/* کف فروشگاه */}
      <mesh
        position={[0, -2.25, -3]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#241018" roughness={0.82} />
      </mesh>

      {/* سقف */}
      <mesh position={[0, 4.2, -8]}>
        <boxGeometry args={[22, 0.3, 18]} />
        <meshStandardMaterial color="#351724" roughness={0.8} />
      </mesh>

      {/* قفسه‌های فروشگاه */}
      <Shelf x={-6.1} z={-4} />
      <Shelf x={6.1} z={-4} />
      <Shelf x={-6.1} z={-11} />
      <Shelf x={6.1} z={-11} />

      {/* دیوار انتهایی */}
      <mesh position={[0, 1.5, -13]}>
        <boxGeometry args={[7, 3, 0.3]} />
        <meshStandardMaterial color="#501d2d" roughness={0.45} />
      </mesh>

      {/* قاب طلایی دیوار */}
      <mesh position={[0, 1.5, -12.78]}>
        <boxGeometry args={[5.8, 2.1, 0.08]} />
        <meshStandardMaterial
          color="#c09b60"
          emissive="#6d3c24"
          emissiveIntensity={0.45}
        />
      </mesh>

      {/* کتاب شناور */}
      <Float
        speed={1.1}
        rotationIntensity={0.12}
        floatIntensity={0.25}
      >
        <group
          position={[0, 1.2, -5]}
          rotation={[0.08, 0.18, -0.12]}
        >
          <mesh>
            <boxGeometry args={[1.35, 0.22, 1.8]} />
            <meshStandardMaterial
              color="#a16a3c"
              roughness={0.45}
            />
          </mesh>

          <mesh position={[0, 0.13, 0]}>
            <boxGeometry args={[1.28, 0.035, 1.72]} />
            <meshStandardMaterial color="#e2d0a6" />
          </mesh>
        </group>
      </Float>

      {/* نورپردازی */}
      <pointLight
        position={[-4, 3, -5]}
        color="#d7a45e"
        intensity={35}
        distance={12}
      />

      <pointLight
        position={[4, 3, -10]}
        color="#a74756"
        intensity={22}
        distance={12}
      />
    </group>
  );
}

export default function BookstoreScene({ progress }) {
  return (
    <div className="scene-canvas">
      <Canvas
        camera={{ position: [0, 2.2, 7.5], fov: 48 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#190910"]} />

        <fog attach="fog" args={["#190910", 9, 28]} />

        <ambientLight intensity={1.1} />

        <directionalLight
          position={[0, 8, 4]}
          intensity={2.4}
          color="#f5d7a0"
        />

        <Room progress={progress} />

        <Environment preset="warehouse" />

        <ContactShadows
          position={[0, -0.04, 0]}
          opacity={0.35}
          scale={24}
          blur={3}
        />
      </Canvas>
    </div>
  );
}
