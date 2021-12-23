import { useRef } from "react";

import { ThreeEvent, useFrame } from "@react-three/fiber";

interface BoxProps {
  position: [number, number, number];
  active: boolean;
  hovering: boolean;
  onPointerOver: (e: ThreeEvent<PointerEvent>) => void;
  onPointerOut: (e: ThreeEvent<PointerEvent>) => void;
  onClick: (e: ThreeEvent<MouseEvent>) => void;
}

export default function Box({ position, active, hovering, onPointerOver, onPointerOut, onClick }: BoxProps) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));

  return (
    <mesh
      ref={ref}
      position={position}
      scale={active ? 1.5 : 1}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovering ? "hotpink" : "orange"} />
    </mesh>
  );
}
