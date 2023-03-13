import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../http";
import AuthService from "../services/AuthService";
import FileService from "../services/FileService";
import FolderService from "../services/FolderService";

export const useUserStore = create((set, get) => ({
  userData: {
    createdAt: "",
    email: "",
    firstName: "",
    id: 0,
    lastName: "",
    role: "",
    updatedAt: "",
  },
  isAuth: false,
  isLoading: false,
  userFiles: [],
  userFolders: [],

  // add types
  setUserData: (userData: any) => {
    set({ userData: userData });
  },

  setLoading: (bool: boolean) => {
    set({ isLoading: bool });
  },

  fetchFolders: async () => {
    const { userData } = get();
    const response = await FolderService.getFoldersByUser(userData.id);
    set({ userFolders: response.data });
  },

  addFolder: async (folderName: string, userId: number, parentId: number) => {
    const newFolder = await FolderService.createFolder(
      folderName,
      userId,
      parentId
    );
    const { userFolders } = get();
    set({ userFolders: [...userFolders, newFolder.data] });
  },

  fetchFiles: (userFiles: any) => {
    set({ userFiles: userFiles });
  },

  addFile: async (folderId: number, file: any) => {
    const newFile = await FileService.createFile(folderId, file);
    const { userFiles } = get();
    set({ userFiles: [...userFiles, newFile.data] });
  },

  setAuth: (bool: boolean) => set({ isAuth: bool }),

  login: async () => {
    try {
      const googleResponse = await AuthService.googleLogin();
      localStorage.setItem("token", googleResponse.data.token);
      set({ userData: googleResponse.data.user });

      const response = await FolderService.getFoldersByUser(
        googleResponse.data.user.id
      );
      set({ userFolders: response.data });

      const fileResponse = await FileService.getFilesByUser(
        googleResponse.data.user.id
      );
      set({ userFiles: fileResponse.data });

      set({ isLoading: false, isAuth: true });
    } catch (e) {
      console.log(e);
    }
  },

  checkAuth: async () => {
    try {
      const response = await axios.get(`${API_URL}/auth/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem("token", response.data.token);

      set({ userData: response.data.user });

      const folderResponse = await FolderService.getFoldersByUser(
        response.data.user.id
      );
      set({ userFolders: folderResponse.data });

      const fileResponse = await FileService.getFilesByUser(
        response.data.user.id
      );
      set({ userFiles: fileResponse.data });

      set({ isLoading: false, isAuth: true });
    } catch (e) {
      console.log(e);
    }
  },

  logout: async () => {
    const response = await AuthService.logout();
    console.log(response);
    localStorage.removeItem("token");
    set({ isAuth: false, userData: null });
  },
}));
