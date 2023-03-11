import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      tokens: {
        access_token: "",
        refresh_token: "",
      },
      userData: null,
      loggedIn: false,
      userFiles: [],
      userFolders: [],

      setAccesToken: (token: string) => {
        const { tokens }: any = get();
        tokens.access_token = token;
        set({ tokens: tokens });
      },
      setRefreshToken: (token: string) => {
        const { tokens }: any = get();
        tokens.refresh_token = token;
        set({ tokens: tokens });
      },
      setUserData: (userData: any) => {
        set({ userData: userData });
      },
      setUserFolders: (userFolders: any) => {
        set({ userFolders: userFolders });
      },
      addFolder: (newFolder) => {
        const { userFolders } = get();

        set({ userFolders: [...userFolders, newFolder] });
      },
      setUserFiles: (userFiles: any) => {
        set({ userFiles: userFiles });
      },
      toogleLoggedIn: () => set((prev: any) => ({ loggedIn: !prev.loggedIn })),
      logout: () => set({}, true),
    }),
    {
      name: "userData",
      getStorage: () => localStorage,
    }
  )
);
