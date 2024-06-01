import { create } from "zustand";
import Cookies from "js-cookie";

export const kegiatanIDStore = create((set) => ({
  kegiatanID: Cookies.get("kegiatanID") || "660bb7ea285c3316e6c93ec7",
  setKegiatanID: (newID: any) => {
    // Update the Zustand state
    set({ kegiatanID: newID });

    // Update the cookie
    Cookies.set("kegiatanID", newID, { expires: 7 }); // Expires in 7 days
  },
}));

export const userIDStore = create((set, get) => ({
  userID: "65fd03eacbed6186259b1a5e",
}));
