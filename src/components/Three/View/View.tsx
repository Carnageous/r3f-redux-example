import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Cloud, GizmoHelper, GizmoViewport, OrbitControls, Sky, Stats } from "@react-three/drei";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { setActive, setHover } from "store/parts";
import Box from "../Box/Box";

import "./View.scss";
import Pointcloud from "../Pointcloud/Pointcloud";

export default function View(): JSX.Element {
  const parts = useAppSelector((state) => state.parts.parts);
  const activePart = useAppSelector((state) => state.parts.activePart);
  const hoveringPart = useAppSelector((state) => state.parts.hoveringPart);

  const dispatch = useAppDispatch();

  const setActivePart = (partId: string | null) => {
    dispatch(setActive(partId));
  };

  const setHoveringPart = (partId: string | null) => {
    dispatch(setHover(partId));
  };

  const boxes = useMemo(() => {
    return Object.values(parts).map((part, idx) => (
      <Box
        position={[idx * 2, 0, 0]}
        key={part.id}
        onPointerOver={() => setHoveringPart(part.id)}
        onPointerOut={() => setHoveringPart(null)}
        onClick={() => setActivePart(activePart === part.id ? null : part.id)}
        active={activePart === part.id}
        hovering={hoveringPart === part.id}
      />
    ));
  }, [parts, activePart, hoveringPart]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Canvas className="view">
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <Pointcloud />

        <OrbitControls makeDefault />
        <GizmoHelper
          alignment="bottom-right" // widget alignment within scene
          margin={[80, 80]} // widget margins (X, Y)
        >
          <GizmoViewport axisColors={["red", "green", "blue"]} labelColor="black" />
          {/* alternative: <GizmoViewcube /> */}
        </GizmoHelper>

        {/* Random stuff */}
        <Stats showPanel={0} className="stats" />
        {/* <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} /> */}
        {/* <Cloud opacity={0.7} speed={0.4} width={10} depth={1.5} segments={20} /> */}
      </Canvas>
    </Suspense>
  );
}
