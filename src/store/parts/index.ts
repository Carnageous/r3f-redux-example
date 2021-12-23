import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Part } from "types/part";
import type { RootState } from "../store";

interface PartsState {
  activePart: string | null;
  hoveringPart: string | null;
  parts: { [id: string]: Part };
}

// Define the initial state using that type
const initialState: PartsState = {
  activePart: null,
  hoveringPart: null,
  parts: {
    "1": { name: "Part 1", id: "1" },
    "2": { name: "Part 2", id: "2" },
    "3": { name: "Part 3", id: "3" },
    "4": { name: "Part 4", id: "4" },
    "5": { name: "Part 5", id: "5" },
  },
};

export const partsSlice = createSlice({
  name: "parts",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Part>) => {
      state.parts[action.payload.id] = action.payload;
    },
    remove: (state, action: PayloadAction<string>) => {
      delete state.parts[action.payload];
    },
    setActive: (state, action: PayloadAction<string | null>) => {
      state.activePart = action.payload;
    },
    setHover: (state, action: PayloadAction<string | null>) => {
      state.hoveringPart = action.payload;
    },
  },
});

export const { add, remove, setActive, setHover } = partsSlice.actions;

export const selectParts = (state: RootState) => state.parts.parts;

export default partsSlice.reducer;
