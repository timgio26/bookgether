import { create } from "zustand";

type Store = {
  user: string | null;
  logout: () => void;
  login: () => void;
};

export const useStore = create<Store>()((set) => ({
  user: localStorage.getItem("user"),
  logout: () => set(() => ({ user: null })),
  login: () => set(() => ({ user: localStorage.getItem("user") })),
}));
