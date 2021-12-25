import { PointMaterial } from "@react-three/drei";
import { useEffect, useState } from "react";
import { loadHdf5, reshapeArray } from "utils";

export default function Pointcloud() {
  const [file, setFile] = useState<any>();
  const [points, setPoints] = useState([]);
  const [colors, setColors] = useState<number[]>([]);

  useEffect(() => {
    loadHdf5("./assets/hdf5/1.hdf5").then((f) => {
      setFile(f);
    });
  }, []);

  useEffect(() => {
    if (file) {
      const rows: { [idx: string]: any } = {};
      const fkeys = file.keys();

      fkeys.forEach((key: string) => {
        if (key === "points") {
          const dataset = file.get(key);

          const cols = [];
          for (let index = 0; index < dataset.value.length; index++) {
            cols.push(0.5);
          }
          setColors(cols);
          setPoints(dataset.value);
          // const dim = dataset.shape[1] || 1;

          // rows[key] = reshapeArray(dataset.value, dim);
        }
      });
    }
  }, [file, setFile]);

  useEffect(() => {
    console.log(points);
    console.log(colors);
  }, [colors, points]);

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
        <bufferAttribute attachObject={["attributes", "color"]} count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <PointMaterial />
    </points>
  );
}
