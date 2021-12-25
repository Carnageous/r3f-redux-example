import * as hdf5 from "h5wasm";

export function makeid(length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function reshapeArray(array: any[], dimension: number) {
  const tmp = [];
  for (let i = 0; i < array.length; i += dimension) {
    tmp.push(array.slice(i, i + dimension));
  }
  return tmp;
}

export async function loadHdf5(path: string) {
  try {
    const fileId = makeid(16);

    const res = await fetch(path);
    const ab = await res.arrayBuffer();

    hdf5.FS.writeFile(fileId, new Uint8Array(ab));

    let f = new hdf5.File(fileId, "r");

    return f;
  } catch (error) {
    console.log("Loading HDF5 file failed:", error);
  }
}
