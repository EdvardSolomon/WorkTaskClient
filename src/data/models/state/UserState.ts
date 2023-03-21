import { FileData } from "./FileData";
import { FolderData } from "./FolderData";
import { PermissionData } from "./PermissionData";
import { UserData } from "./UserData";

export interface UserState {
  userData: null | UserData;
  currentFolder : null | FolderData,
  permissions: [] | PermissionData,
  isAuth: boolean;
  isLoading: boolean;
  userFiles: Array<FileData>;
  userFolders: Array<FolderData>;
  setUserData: (userData: UserData) => void;
  setLoading: (bool: boolean) => void;
  addFolder: (folderName: string, userId: number, parentId: number) => void;
  deleteFolder: (folderId: number) => void;
  updateFolder: (folderName: string, view: string, folderId: number) => void;
  fetchFolder: (folderId: number) => void;
  setAuth: (bool: boolean) => void;
  // file : any - need type
  addFile: (folderId: number, file: any) => void;
  deleteFile: (fileId: number) => void;
  updateFile: (originalName: string, view: string, fileId: number) => void;
  getFile: (fileId: number) => void;
  login: () => void;
  checkAuth: () => void;
  logout: () => void;
}
