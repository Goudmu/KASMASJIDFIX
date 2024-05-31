import { create } from "zustand";

export const kegiatanIDStore = create((set) => ({
  kegiatanID: "660bb7ea285c3316e6c93ec7",
  setKegiatanID: (newID: any) => set({ kegiatanID: newID }),
}));

export const userIDStore = create((set, get) => ({
  userID: "65fd03eacbed6186259b1a5e",
}));
