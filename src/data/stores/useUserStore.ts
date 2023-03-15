import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { API_URL } from "../http";
import { UserState } from "../models/state/UserState";
import AuthService from "../services/AuthService";
import FileService from "../services/FileService";
import FolderService from "../services/FolderService";

export const useUserStore = create<UserState>()(
  devtools((set, get) => ({
    userData: null,
    isAuth: false,
    isLoading: false,
    userFiles: [],
    userFolders: [],

    // User methods
    setUserData: (userData) => {
      set({ userData: userData });
    },

    // Loading/Auth sets
    setLoading: (bool) => {
      set({ isLoading: bool });
    },

    setAuth: (bool: boolean) => set({ isAuth: bool }),

    // Folder methods
    addFolder: async (
      folderName: string,
      userId: number,
      parentId: number,
      path: string
    ) => {
      const newFolder = await FolderService.createFolder(
        folderName,
        userId,
        parentId,
        path
      );
      const { userFolders } = get();
      set({ userFolders: [...userFolders, newFolder.data] });
    },

    // add cascade delete to children folders and files or just sinc
    deleteFolder: async (folderId: number) => {
      const response = await FolderService.deleteFolder(folderId);
      if (response.status == 204) {
        const { userFolders } = get();
        const filteredFolders = userFolders.filter((folder) => {
          return folder.id !== folderId;
        });
        set({ userFolders: filteredFolders });
      } else {
        console.log("Delete Failed");
      }
    },

    updateFolder: async (
      folderName: string,
      view: string,
      folderId: number
    ) => {
      const response = await FolderService.updateFolder(
        folderName,
        view,
        folderId
      );
      const { userFolders } = get();
      const [updatedFolder] = userFolders.filter(
        (folder) => folder.id == folderId
      );
      updatedFolder.folderName = folderName;
      updatedFolder.view = view;
      const filteredFolders = userFolders.filter((folder) => {
        return folder.id !== folderId;
      });
      set({
        userFolders: [...filteredFolders, updatedFolder],
      });
    },

    // File methods
    addFile: async (folderId: number, file: any) => {
      const newFile = await FileService.createFile(folderId, file);
      const { userFiles } = get();
      set({ userFiles: [...userFiles, newFile.data] });
    },

    deleteFile: async (fileId: number) => {
      const response = await FileService.deleteFile(fileId);
      if (response.status == 200) {
        const { userFiles } = get();
        const filteredFiles = userFiles.filter((folder) => {
          return folder.id !== fileId;
        });
        set({ userFiles: filteredFiles });
      } else {
        console.log("Delete Failed");
      }
    },

    updateFile: async (originalName: string, view: string, fileId: number) => {
      const response = await FileService.updateFile(originalName, view, fileId);
      const { userFiles } = get();
      const [updatedFile] = userFiles.filter((folder) => folder.id == fileId);
      updatedFile.originalName = originalName;
      updatedFile.view = view;
      const filteredFiles = userFiles.filter((folder) => {
        return folder.id !== fileId;
      });
      set({
        userFiles: [...filteredFiles, updatedFile],
      });
    },

    getFile: async (fileId: number) => {
      const response = await FileService.getFile(fileId);
      return response;
    },

    // Auth methods
    login: async () => {
      try {
        set({ isLoading: true });
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
        set({ isLoading: false, isAuth: false });
        console.log(e);
      }
    },

    checkAuth: async () => {
      try {
        set({ isLoading: true });
        const response = await axios.get(`${API_URL}/auth/refresh`, {
          withCredentials: true,
        });
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
        set({ isLoading: false, isAuth: false });
        console.log(e);
        localStorage.removeItem("token");
      }
    },

    logout: async () => {
      await AuthService.logout();
      localStorage.removeItem("token");
      set({ isAuth: false, userData: null });
    },
  }))
);
