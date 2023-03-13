import axios from "axios";
import { create } from "zustand";
import { API_URL } from "../http";
import AuthService from "../services/AuthService";
import FileService from "../services/FileService";
import FolderService from "../services/FolderService";

export const useUserStore = create(
    (set, get) => ({
      userData: null,
      isAuth: false,
      userFiles: [],
      userFolders: [],

// add types
      setUserData: (userData: any) => {
        set({ userData: userData });
      },

      fetchFolders:async () => {
        const { userData } = get();
        const response = await FolderService.getFoldersByUser(userData.id);
        set({userFolders: response.data});
    },

    addFolder: async (folderName, userId, parentId) => {
      const newFolder = await FolderService.createFolder(folderName, userId, parentId);
      const { userFolders } = get();
      set({ userFolders: [...userFolders, newFolder.data] });
    },

    fetchFiles: (userFiles: any) => {
      set({ userFiles: userFiles });
    },

      setAuth: (bool: boolean) => set({ isAuth: bool }),

      login : async () => {
        const googleResponse = await AuthService.googleLogin();
        console.log(googleResponse);
        localStorage.setItem('token', googleResponse.data.token);
        set({userData : googleResponse.data.user});


        const response = await FolderService.getFoldersByUser(googleResponse.data.user.id);
        set({userFolders: response.data});

        const fileResponse = await FileService.getFoldersByUser(googleResponse.data.user.id);
        set({userFiles: fileResponse.data});

        set({isAuth: true});
      },

      checkAuth: async () => {
        try {
          const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true});
          console.log(response);
          localStorage.setItem('token', response.data.token);

          set({userData : response.data.user});

          const folderResponse = await FolderService.getFoldersByUser(response.data.user.id);
          set({userFolders: folderResponse.data});
  
          const fileResponse = await FileService.getFoldersByUser(response.data.user.id);
          set({userFiles: fileResponse.data});

          set({isAuth: true});
        } catch (e){
          
        console.log("googleResponse");
          console.log(e);
        }
      },

      logout : async () => {}
    })
);
