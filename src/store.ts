import { create } from "zustand";

type Store = {
  user: string | null;
  profile: string | null
  logout: () => void;
  login: () => void;
  setprofile: () => void;
  // clearprofile:()=>void
};

export const useStore = create<Store>()((set) => ({
  user: localStorage.getItem("user"),
  profile:localStorage.getItem("profile"),
  logout: () =>set(() => ({ user: null, profile: null })),
  login: () => set(() => ({ user: localStorage.getItem("user") })),
  setprofile: () => set(() => ({ profile: localStorage.getItem("profile") })),
}));
