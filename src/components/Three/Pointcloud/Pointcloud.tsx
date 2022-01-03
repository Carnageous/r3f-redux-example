import { PointMaterial, Points } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { loadHdf5, reshapeArray } from "utils";

export default function Pointcloud() {
  const [file, setFile] = useState<any>();
  const [points, setPoints] = useState([]);
  const [colors, setColors] = useState<number[]>([]);

  const pointsRef = useRef<any>();
  const meshRef = useRef<any>();

  useEffect(() => {
    loadHdf5("./assets/hdf5/1.hdf5").then((f) => {
      setFile(f);
    });
  }, []);

  useEffect(() => {
    if (file) {
      const fkeys = file.keys();

      fkeys.forEach((key: string) => {
        if (key === "points") {
          const dataset = file.get(key);

          const cols = Array(dataset.value.length).fill(0.5);
          // for (let index = 0; index < dataset.value.length; index++) {
          //   cols.push(0.5);
          // }
          setPoints(dataset.value);
          setColors(cols);

          console.log(pointsRef.current);
          console.log(meshRef.current);

          if (pointsRef.current) {
            pointsRef.current.setDrawRange(0, 200);
          }

          // const dim = dataset.shape[1] || 1;

          // rows[key] = reshapeArray(dataset.value, dim);
        }
      });
    }
  }, [file, setFile]);

  return (
    <points ref={meshRef}>
      <bufferGeometry ref={pointsRef} attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
        {/* <bufferAttribute attachObject={["attributes", "color"]} count={colors.length / 3} array={colors} itemSize={3} /> */}
      </bufferGeometry>
      <PointMaterial />
    </points>
    // <Points positions={points} colors={colors}>
    //   <pointsMaterial />
    // </Points>
  );
}
