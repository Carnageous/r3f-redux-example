import { useEffect, useState } from "react";
import { loadHdf5, reshapeArray } from "utils";

export default function Pointcloud() {
  const [file, setFile] = useState<any>();

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
        const dataset = file.get(key);
        const dim = dataset.shape[1] || 1;
        rows[key] = reshapeArray(dataset.value, dim);
      });
      console.log(rows);
      console.log(fkeys);
    }
  }, [file, setFile]);

  return <mesh></mesh>;
}
